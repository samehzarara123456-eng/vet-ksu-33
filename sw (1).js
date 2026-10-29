const GAS_URL = 'https://script.google.com/macros/s/AKfycbyjiraRf1PCiLeuZBA_S3jzR9-lVec5GExE_UHp7A69VhTkzHYOVa-ZL-__mkh6H4zr/exec';
const NTFY_TOPIC = 'vet_ksu_33_seniors_2027_push_v7';
const NTFY_SSE_URL = 'https://ntfy.sh/' + NTFY_TOPIC + '/json';
const NTFY_POLL_URL = 'https://ntfy.sh/' + NTFY_TOPIC + '/json?poll=1&since=30m';
const DB_NAME = 'vet33_bg_sw_db_v6';
const STORE_NAME = 'state';
const CACHE_NAME = 'vet33-pwa-cache-v7';
const NL = String.fromCharCode(10);

const SUBJECT_NAMES = {
  batna: 'باطنه',
  tawleed: 'توليد',
  geraha: 'جراحه',
  dawagen: 'دواجن',
  seha: 'صحه',
  lahma: 'لحمه',
  moshtaraka: 'مشتركه',
  moadya: 'معديه'
};

const NOTIF_ICON_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="42" fill="#0f172a"/><rect x="16" y="16" width="160" height="160" rx="32" fill="#10b981" fill-opacity="0.2" stroke="#f59e0b" stroke-width="6"/><text x="96" y="118" font-family="Arial,sans-serif" font-size="68" font-weight="900" fill="#fbbf24" text-anchor="middle">33</text></svg>');

function openSwDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE_NAME)) {
        req.result.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getSwNotifiedIds() {
  try {
    const db = await openSwDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('notifiedIds');
      req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

async function setSwNotifiedIds(ids) {
  try {
    if (!Array.isArray(ids)) return;
    const db = await openSwDb();
    await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(Array.from(new Set(ids)), 'notifiedIds');
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {}
}

async function showSwNotificationSafe(title, options) {
  const fullOptions = Object.assign({
    dir: 'rtl',
    lang: 'ar',
    icon: NOTIF_ICON_SVG,
    badge: NOTIF_ICON_SVG,
    vibrate: [300, 100, 300, 100, 400],
    renotify: true,
    requireInteraction: true
  }, options || {});
  try {
    await self.registration.showNotification(title, fullOptions);
    return true;
  } catch (err1) {
    try {
      await self.registration.showNotification(title, {
        body: (options && options.body) ? options.body : '',
        dir: 'rtl',
        lang: 'ar'
      });
      return true;
    } catch (err2) {
      return false;
    }
  }
}

async function notifyForNewFileObject(file) {
  if (!file || !file.id) return false;
  let notifiedIds = (await getSwNotifiedIds()) || [];
  if (notifiedIds.includes(file.id)) return false;
  notifiedIds.push(file.id);
  await setSwNotifiedIds(notifiedIds);

  const subName = SUBJECT_NAMES[file.subject] || file.subject || 'المقررات';
  const unitName = file.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
  const pubDate = file.dateAdded || 'الآن';
  const cleanTitle = String(file.title || '').replace(/^(المصدر|شرح|تلخيص|خريطه ذهنية|خريطة ذهنية)\s*[:\-]\s*/i, '') || file.title || 'ملف دراسي جديد';
  const title = '🔔 تم نشر (' + (file.format || 'ملف') + ') جديد — ' + subName;
  const body = cleanTitle + NL + 'المسار: ' + subName + ' > ' + file.category + ' > ' + unitName + ' ' + file.folderNum + NL + 'تاريخ النشر: ' + pubDate;
  return await showSwNotificationSafe(title, {
    body: body,
    tag: 'vet33-file-' + file.id,
    data: {
      fileId: file.id,
      subject: file.subject,
      category: file.category,
      folderNum: file.folderNum
    }
  });
}

async function checkNtfyRelayInBackground() {
  try {
    const res = await fetch(NTFY_POLL_URL + '&_t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) return;
    const text = await res.text();
    const lines = text.split(NL).filter(Boolean);
    for (const line of lines) {
      try {
        const pkt = JSON.parse(line);
        if (pkt && pkt.event === 'message' && pkt.message) {
          const inner = JSON.parse(pkt.message);
          if (inner && inner.type === 'NEW_VET33_FILE' && inner.file) {
            await notifyForNewFileObject(inner.file);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

async function checkDriveInBackground() {
  try {
    await checkNtfyRelayInBackground();
    const res = await fetch(GAS_URL + '?t=' + Date.now(), {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    });
    const data = await res.json();
    const remoteFiles = Array.isArray(data) ? data : (Array.isArray(data.files) ? data.files : null);
    if (!Array.isArray(remoteFiles)) return;

    let notifiedIds = await getSwNotifiedIds();
    if (notifiedIds === null) {
      if (remoteFiles.length > 1) {
        await setSwNotifiedIds(remoteFiles.slice(1).map(f => f.id));
        notifiedIds = remoteFiles.slice(1).map(f => f.id);
      } else {
        notifiedIds = [];
        await setSwNotifiedIds([]);
      }
    }

    const newFiles = remoteFiles.filter(f => f && f.id && !notifiedIds.includes(f.id));
    if (newFiles.length > 0) {
      for (const file of newFiles.slice(0, 3).reverse()) {
        await notifyForNewFileObject(file);
      }
      const allIds = Array.from(new Set([...notifiedIds, ...remoteFiles.map(f => f.id)]));
      await setSwNotifiedIds(allIds);
    }
  } catch (err) {}
}

let activeWatchPromise = null;
let sseAbortController = null;

async function listenNtfyStream(signal) {
  try {
    const res = await fetch(NTFY_SSE_URL, { cache: 'no-store', signal });
    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (!signal.aborted) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split(NL);
      buffer = parts.pop() || '';
      for (const line of parts) {
        if (!line.trim()) continue;
        try {
          const pkt = JSON.parse(line);
          if (pkt && pkt.event === 'message' && pkt.message) {
            const inner = JSON.parse(pkt.message);
            if (inner && inner.type === 'NEW_VET33_FILE' && inner.file) {
              await notifyForNewFileObject(inner.file);
            } else {
              await checkDriveInBackground();
            }
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

async function scheduleBackgroundSyncTags() {
  try {
    if (self.registration && 'sync' in self.registration) {
      await self.registration.sync.register('vet33-sync-now');
      await self.registration.sync.register('vet33-bg-watch-' + (Date.now() % 3));
    }
  } catch (e) {}
  try {
    if (self.registration && 'periodicSync' in self.registration) {
      await self.registration.periodicSync.register('vet33-bg-sync', { minInterval: 60 * 1000 });
    }
  } catch (e) {}
}

function runBackgroundWatchSession(maxDurationMs = 150000) {
  if (activeWatchPromise) return activeWatchPromise;
  activeWatchPromise = (async () => {
    const startTime = Date.now();
    if (sseAbortController) {
      try { sseAbortController.abort(); } catch (e) {}
    }
    sseAbortController = new AbortController();
    listenNtfyStream(sseAbortController.signal);
    await checkDriveInBackground();
    while (Date.now() - startTime < maxDurationMs) {
      await new Promise(r => setTimeout(r, 12000));
      await checkDriveInBackground();
    }
    try { sseAbortController.abort(); } catch (e) {}
    await scheduleBackgroundSyncTags();
  })().finally(() => {
    activeWatchPromise = null;
  });
  return activeWatchPromise;
}

let swInterval = null;
function startSwLoop() {
  if (swInterval) clearInterval(swInterval);
  swInterval = setInterval(() => {
    checkDriveInBackground();
  }, 12000);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(['./']).catch(() => {})).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    startSwLoop();
    await scheduleBackgroundSyncTags();
    await runBackgroundWatchSession(150000);
  })());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url || '';
  if (event.request.method !== 'GET' || url.includes('script.google.com') || url.includes('ntfy.sh')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(r => r || caches.match('./')))
  );
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'INIT_SW') {
    startSwLoop();
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds)) {
        await setSwNotifiedIds(msg.notifiedIds);
      }
      await scheduleBackgroundSyncTags();
      await runBackgroundWatchSession(150000);
    })());
  } else if (msg.type === 'CHECK_NOW' || msg.type === 'CLIENT_CLOSING') {
    startSwLoop();
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds)) {
        await setSwNotifiedIds(msg.notifiedIds);
      }
      await scheduleBackgroundSyncTags();
      await runBackgroundWatchSession(165000);
    })());
  } else if (msg.type === 'SCHEDULE_DELAYED_TEST') {
    const delayMs = Number(msg.delayMs) || 8000;
    event.waitUntil((async () => {
      await new Promise(r => setTimeout(r, delayMs));
      await showSwNotificationSafe(
        msg.title || '🔔 إشعار الخلفية يعمل بنجاح — VET-KSU 33',
        {
          body: msg.body || ('وصل هذا الإشعار من الخلفية بعد إغلاق المتصفح!' + NL + 'الخدمة متصلة بقاعدة بيانات Google Drive.'),
          tag: 'vet33-bg-test-' + Date.now(),
          data: msg.data || {}
        }
      );
      await runBackgroundWatchSession(120000);
    })());
  } else if (msg.type === 'SHOW_NOTIFICATION' && msg.title) {
    event.waitUntil(showSwNotificationSafe(msg.title, msg.options || {}));
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-')) {
    event.waitUntil(runBackgroundWatchSession(150000));
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-')) {
    event.waitUntil((async () => {
      await runBackgroundWatchSession(155000);
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      if (clients.length === 0 && !event.lastChance) {
        throw new Error('keep-background-sync-scheduled');
      }
    })());
  }
});

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    if (event.data) {
      try {
        const payload = event.data.json();
        if (payload && payload.file) {
          await notifyForNewFileObject(payload.file);
          return;
        }
        if (payload && payload.title) {
          await showSwNotificationSafe(payload.title, payload.options || { body: payload.body || '', dir: 'rtl', lang: 'ar' });
          return;
        }
      } catch (e) {}
    }
    await checkDriveInBackground();
    await runBackgroundWatchSession(120000);
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  event.waitUntil((async () => {
    const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windowClients) {
      if ('focus' in client) {
        await client.focus();
        client.postMessage({ type: 'OPEN_FILE_FROM_NOTIF', data });
        return;
      }
    }
    if (self.clients.openWindow) {
      const baseScope = (self.registration && self.registration.scope) ? self.registration.scope : self.location.origin + '/';
      const targetUrl = new URL(baseScope);
      if (data && data.fileId) {
        targetUrl.searchParams.set('notifFileId', data.fileId);
        if (data.subject) targetUrl.searchParams.set('notifSub', data.subject);
        if (data.category) targetUrl.searchParams.set('notifCat', data.category);
        if (data.folderNum) targetUrl.searchParams.set('notifNum', String(data.folderNum));
      }
      await self.clients.openWindow(targetUrl.href);
    }
  })());
});