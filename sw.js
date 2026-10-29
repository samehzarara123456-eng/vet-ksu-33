const GAS_URL = 'https://script.google.com/macros/s/AKfycbyjiraRf1PCiLeuZBA_S3jzR9-lVec5GExE_UHp7A69VhTkzHYOVa-ZL-__mkh6H4zr/exec';
const DB_NAME = 'vet33_bg_sw_db_v7';
const STORE_NAME = 'state';
const CACHE_NAME = 'vet33-pwa-cache-v7';
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

const MANIFEST_JSON = JSON.stringify({
  name: 'Seniors 2027 VET-KSU 33 Old List',
  short_name: 'VET-KSU 33',
  description: 'المكتبة الرقمية للمحاضرات والسكاشن - طب بيطري كفر الشيخ',
  lang: 'ar',
  dir: 'rtl',
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: '#050914',
  theme_color: '#050914',
  icons: [
    { src: ICON_SVG, sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
    { src: ICON_SVG, sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
  ]
});

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
    const res = await fetch(GAS_URL + '?t=' + Date.now(), {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    });
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
function runBackgroundKeepAliveLoop(cycles = 10, intervalMs = 12000) {
  if (activeLoopPromise) return activeLoopPromise;
  activeLoopPromise = new Promise((resolve) => {
    let count = 0;
    const timer = setInterval(async () => {
      count++;
      await checkDriveInBackground(false);
      if (count >= cycles) {
        clearInterval(timer);
        activeLoopPromise = null;
        try {
          if (self.registration && 'sync' in self.registration) {
            await self.registration.sync.register('vet33-sync-now');
          }
        } catch (e) {}
        resolve();
      }
    }, intervalMs);
  });
  return activeLoopPromise;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(['./']);
    } catch (e) {}
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    await checkDriveInBackground(false);
    await runBackgroundKeepAliveLoop(8, 12000);
  })());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/manifest.json') || url.pathname.endsWith('/manifest.webmanifest')) {
    event.respondWith(new Response(MANIFEST_JSON, {
      status: 200,
      headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' }
    }));
    return;
  }
  if (event.request.method !== 'GET' || url.href.includes('script.google.com') || url.href.includes('googleusercontent.com')) {
    return;
  }
  event.respondWith((async () => {
    try {
      const netRes = await fetch(event.request);
      if (netRes && netRes.status === 200 && url.origin === self.location.origin) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, netRes.clone());
      }
      return netRes;
    } catch (err) {
      const cached = await caches.match(event.request);
      return cached || Response.error();
    }
  })());
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'INIT_SW') {
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await runBackgroundKeepAliveLoop(10, 12000);
    })());
  } else if (msg.type === 'CHECK_NOW' || msg.type === 'PAGE_HIDDEN') {
    event.waitUntil((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(12, 12000);
    })());
  } else if (msg.type === 'SHOW_NOTIFICATION' && msg.title) {
    event.waitUntil(showSwNotificationSafe(msg.title, msg.options || {}));
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'vet33-bg-sync') {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(10, 12000);
    })());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-sync')) {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
      await runBackgroundKeepAliveLoop(12, 12000);
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
