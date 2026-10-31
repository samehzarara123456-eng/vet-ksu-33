const GAS_URL = 'https://script.google.com/macros/s/AKfycbyjiraRf1PCiLeuZBA_S3jzR9-lVec5GExE_UHp7A69VhTkzHYOVa-ZL-__mkh6H4zr/exec';
const DB_NAME = 'vet33_bg_sw_db_v10';
const STORE_NAME = 'state';
const CACHE_NAME = 'vet33-pwa-cache-v11';
const APP_SHELL = ['./', './index.html', './manifest.json', './favicon.svg', './icon-192.svg', './icon-512.svg'];
const RUNTIME_CDN_HOSTS = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const NEVER_CACHE_HOSTS = ['script.google.com', 'script.googleusercontent.com', 'googleusercontent.com', 'drive.google.com', 'drive.usercontent.google.com', 'docs.google.com', 't.me', 'telegram.org', 'corsproxy.io'];
const NL = String.fromCharCode(10);
const ICON_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="42" fill="#0f172a"/><rect x="16" y="16" width="160" height="160" rx="32" fill="#10b981" fill-opacity="0.18" stroke="#f59e0b" stroke-width="6"/><text x="96" y="118" font-family="Arial,sans-serif" font-size="68" font-weight="900" fill="#fbbf24" text-anchor="middle">33</text></svg>');

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

function isHostMatch(hostname, list) {
  return list.some(h => hostname === h || hostname.endsWith('.' + h));
}

// Network-first for the app itself (always shows the latest GitHub version when online),
// falls back to the cached copy when offline or when the network is very slow.
async function networkFirst(req, fallbackUrl, timeoutMs = 5000) {
  const cache = await caches.open(CACHE_NAME);
  const networkPromise = fetch(req).then((res) => {
    if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  });
  const cachedPromise = cache.match(req, { ignoreSearch: true })
    .then(r => r || (fallbackUrl ? cache.match(fallbackUrl) : undefined))
    .catch(() => undefined);
  try {
    return await new Promise((resolve, reject) => {
      let settled = false;
      const timer = setTimeout(async () => {
        const cached = await cachedPromise;
        if (cached && !settled) { settled = true; resolve(cached); }
      }, timeoutMs);
      networkPromise.then((res) => {
        if (!settled) { settled = true; clearTimeout(timer); resolve(res); }
      }).catch(async (err) => {
        clearTimeout(timer);
        const cached = await cachedPromise;
        if (!settled) { settled = true; if (cached) resolve(cached); else reject(err); }
      });
    });
  } catch (e) {
    return Response.error();
  }
}

// Stale-while-revalidate for pinned CDN libraries (Tailwind, Three.js, Lucide, Google Fonts).
async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {});
    return res;
  }).catch(() => null);
  if (cached) return cached;
  const res = await networkPromise;
  return res || Response.error();
}

async function fetchSwWithTimeout(url, options = {}, timeoutMs = 12000) {
  if (typeof AbortController === 'undefined') {
    return fetch(url, options);
  }
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, Object.assign({}, options, { signal: ctrl.signal }));
  } finally {
    clearTimeout(id);
  }
}

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
    const clean = Array.from(new Set((ids || []).filter(Boolean)));
    const db = await openSwDb();
    await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(clean, 'notifiedIds');
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {}
}

async function mergeSwNotifiedIds(newIds) {
  if (!Array.isArray(newIds) || newIds.length === 0) return;
  const existing = (await getSwNotifiedIds()) || [];
  const merged = Array.from(new Set([...existing, ...newIds.filter(Boolean)]));
  await setSwNotifiedIds(merged);
}

async function showSwNotificationSafe(title, options) {
  const fullOptions = Object.assign({
    dir: 'rtl',
    lang: 'ar',
    icon: ICON_SVG,
    badge: ICON_SVG,
    renotify: true,
    requireInteraction: true,
    vibrate: [300, 100, 300, 100, 400]
  }, options || {});
  try {
    await self.registration.showNotification(title, fullOptions);
    return true;
  } catch (err1) {
    try {
      await self.registration.showNotification(title, {
        body: fullOptions.body || '',
        dir: 'rtl',
        lang: 'ar',
        tag: fullOptions.tag || ('vet33-' + Date.now()),
        data: fullOptions.data || {}
      });
      return true;
    } catch (err2) {
      return false;
    }
  }
}

let isCheckingDrive = false;
async function checkDriveInBackground(forceNotifyLatestIfUnseeded = false) {
  if (isCheckingDrive) return;
  isCheckingDrive = true;
  try {
    const res = await fetchSwWithTimeout(GAS_URL + '?t=' + Date.now(), {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    }, 12000);
    const data = await res.json();
    const rawFiles = Array.isArray(data) ? data : (Array.isArray(data.files) ? data.files : null);
    if (!Array.isArray(rawFiles)) return;

    const remoteFiles = rawFiles.filter(f => f && f.id && !f.isSystemMeta && !String(f.id).startsWith('_sys_'));
    let notifiedIds = await getSwNotifiedIds();

    if (!notifiedIds) {
      if (forceNotifyLatestIfUnseeded && remoteFiles.length > 0) {
        notifiedIds = remoteFiles.slice(1).map(f => f.id);
      } else {
        await setSwNotifiedIds(remoteFiles.map(f => f.id));
        return;
      }
    }

    const newFiles = remoteFiles.filter(f => f && f.id && !notifiedIds.includes(f.id));
    if (newFiles.length > 0) {
      const updated = Array.from(new Set([...notifiedIds, ...newFiles.map(f => f.id)]));
      await setSwNotifiedIds(updated);

      for (const file of newFiles.slice(0, 3).reverse()) {
        const subName = SUBJECT_NAMES[file.subject] || file.subject || 'المقررات';
        const unitName = file.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
        const pubDate = file.dateAdded || 'الآن';
        const cleanTitle = String(file.title || '').replace(/^(المصدر|شرح|تلخيص|خريطه ذهنية|خريطة ذهنية)\s*[:\-]\s*/i, '');
        const title = '🔔 تم نشر (' + (file.format || 'ملف') + ') جديد — ' + subName;
        const body = cleanTitle + NL + 'المسار: ' + subName + ' > ' + file.category + ' > ' + unitName + ' ' + file.folderNum + NL + 'تاريخ النشر: ' + pubDate;
        await showSwNotificationSafe(title, {
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

      const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clientsList) {
        client.postMessage({ type: 'SW_DETECTED_NEW_FILES', notifiedIds: updated });
      }
    }
  } catch (err) {
  } finally {
    isCheckingDrive = false;
  }
}

let activeLoopPromise = null;
function scheduleNextSyncWakeup() {
  setTimeout(async () => {
    try {
      if (self.registration && 'sync' in self.registration) {
        await self.registration.sync.register('vet33-sync-' + Date.now());
      }
    } catch (e) {
      runBackgroundKeepAliveLoop(10, 12000);
    }
  }, 250);
}

function runBackgroundKeepAliveLoop(cycles = 11, intervalMs = 12000) {
  if (activeLoopPromise) return activeLoopPromise;
  const loopTask = () => new Promise((resolve) => {
    let count = 0;
    const timer = setInterval(async () => {
      count++;
      await checkDriveInBackground(false);
      if (count >= cycles) {
        clearInterval(timer);
        activeLoopPromise = null;
        scheduleNextSyncWakeup();
        resolve();
      }
    }, intervalMs);
  });
  if (self.navigator && self.navigator.locks && typeof self.navigator.locks.request === 'function') {
    activeLoopPromise = self.navigator.locks.request('vet33_sw_bg_lock', { mode: 'shared' }, loopTask).catch(() => loopTask());
  } else {
    activeLoopPromise = loopTask();
  }
  return activeLoopPromise;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(APP_SHELL.map(u => cache.add(new Request(u, { cache: 'reload' }))));
    } catch (e) {}
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    } catch (e) {}
    await self.clients.claim();
    scheduleNextSyncWakeup();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Google Drive database (Apps Script), Drive files and Telegram links must ALWAYS stay live.
  if (isHostMatch(url.hostname, NEVER_CACHE_HOSTS)) return;

  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/sw.js')) return;
    if (req.mode === 'navigate') {
      event.respondWith(networkFirst(req, './index.html'));
    } else {
      event.respondWith(networkFirst(req));
    }
    return;
  }

  if (RUNTIME_CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(req));
  }
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'INIT_SW') {
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      scheduleNextSyncWakeup();
    })());
  } else if (msg.type === 'PAGE_HIDDEN') {
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(11, 12000);
    })());
  } else if (msg.type === 'CHECK_NOW') {
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(11, 12000);
    })());
  } else if (msg.type === 'SHOW_NOTIFICATION' && msg.title) {
    event.waitUntil(showSwNotificationSafe(msg.title, msg.options || {}));
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-bg-sync')) {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(11, 12000);
    })());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-sync')) {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(11, 12000);
    })());
  }
});

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let handledPayload = false;
    if (event.data) {
      try {
        const payload = event.data.json();
        if (payload && payload.title) {
          if (payload.fileId) {
            await mergeSwNotifiedIds([payload.fileId]);
          }
          await showSwNotificationSafe(payload.title, payload.options || { body: payload.body || '', data: payload.data || {} });
          handledPayload = true;
        }
      } catch (e) {}
    }
    if (!handledPayload) {
      await checkDriveInBackground(true);
    }
    await runBackgroundKeepAliveLoop(11, 12000);
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
      const targetUrl = data.fileId ? ('./#file=' + encodeURIComponent(data.fileId)) : './';
      await self.clients.openWindow(targetUrl);
    }
  })());
});
