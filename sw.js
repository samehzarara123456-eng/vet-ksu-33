const GAS_URL = 'https://script.google.com/macros/s/AKfycbyjiraRf1PCiLeuZBA_S3jzR9-lVec5GExE_UHp7A69VhTkzHYOVa-ZL-__mkh6H4zr/exec';
const DB_NAME = 'vet33_bg_sw_db';
const STORE_NAME = 'state';

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

function openSwDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
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
    const db = await openSwDb();
    await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(ids, 'notifiedIds');
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {}
}

async function checkDriveInBackground() {
  try {
    const res = await fetch(GAS_URL + '?t=' + Date.now(), { redirect: 'follow' });
    const data = await res.json();
    const remoteFiles = Array.isArray(data) ? data : (Array.isArray(data.files) ? data.files : null);
    if (!Array.isArray(remoteFiles)) return;

    let notifiedIds = await getSwNotifiedIds();
    if (!notifiedIds) {
      await setSwNotifiedIds(remoteFiles.map(f => f.id));
      return;
    }

    const newFiles = remoteFiles.filter(f => f && f.id && !notifiedIds.includes(f.id));
    if (newFiles.length > 0) {
      const updated = Array.from(new Set([...notifiedIds, ...newFiles.map(f => f.id)]));
      await setSwNotifiedIds(updated);

      for (const file of newFiles.slice(0, 3).reverse()) {
        const subName = SUBJECT_NAMES[file.subject] || file.subject || 'المقررات';
        const unitName = file.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
        const pubDate = file.dateAdded || 'الآن';
        const title = '🔔 تم نشر (' + (file.format || 'ملف') + ') جديد — ' + subName;
        const body = (file.title || '') + '
المسار: ' + subName + ' > ' + file.category + ' > ' + unitName + ' ' + file.folderNum + '
تاريخ النشر: ' + pubDate;
        await self.registration.showNotification(title, {
          body: body,
          dir: 'rtl',
          lang: 'ar',
          tag: 'vet33-file-' + file.id,
          renotify: true,
          requireInteraction: true,
          vibrate: [300, 100, 300, 100, 400],
          data: {
            fileId: file.id,
            subject: file.subject,
            category: file.category,
            folderNum: file.folderNum
          }
        });
      }
    }
  } catch (err) {}
}

let swInterval = null;
function startSwLoop() {
  if (swInterval) clearInterval(swInterval);
  swInterval = setInterval(() => {
    checkDriveInBackground();
  }, 20000);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    startSwLoop();
    await checkDriveInBackground();
  })());
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'INIT_SW') {
    if (Array.isArray(msg.notifiedIds)) {
      setSwNotifiedIds(msg.notifiedIds);
    }
    startSwLoop();
  } else if (msg.type === 'CHECK_NOW') {
    event.waitUntil(checkDriveInBackground());
  } else if (msg.type === 'SHOW_NOTIFICATION' && msg.title) {
    event.waitUntil(self.registration.showNotification(msg.title, msg.options || {}));
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'vet33-bg-sync') {
    event.waitUntil(checkDriveInBackground());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'vet33-sync-now') {
    event.waitUntil(checkDriveInBackground());
  }
});

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    if (event.data) {
      try {
        const payload = event.data.json();
        if (payload && payload.title) {
          await self.registration.showNotification(payload.title, payload.options || { body: payload.body || '', dir: 'rtl', lang: 'ar' });
          return;
        }
      } catch (e) {}
    }
    await checkDriveInBackground();
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
      await self.clients.openWindow('./');
    }
  })());
});