const GAS_URL = 'https://script.google.com/macros/s/AKfycbxjlsN__9eXZvIuGLMJW0rCcpCiggFIdzdatlVXKuAy-34wGQN4b0k2iNSkP1SBI8S54A/exec';
const DB_NAME = 'vet33_bg_sw_db_v10';
const STORE_NAME = 'state';
const CACHE_NAME = 'vet33-pwa-cache-v43';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './assets/icons/favicon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/app-icon.png'
];
const REQUIRED_APP_SHELL = [
  './index.html',
  './css/style.css',
  './js/app.js'
];
const RUNTIME_CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const NEVER_CACHE_HOSTS = ['script.google.com', 'script.googleusercontent.com', 'googleusercontent.com', 'drive.google.com', 'drive.usercontent.google.com', 'docs.google.com', 't.me', 'telegram.org'];
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

function isHostMatch(hostname, list) {
  const host = String(hostname || '').toLowerCase();
  if (!host) return false;
  return list.some(h => {
    const target = String(h).toLowerCase();
    return host === target || host.endsWith('.' + target);
  });
}

function getScopeBaseUrl() {
  const rawScope = (self.registration && self.registration.scope) ? self.registration.scope : self.location.href;
  try {
    return new URL('./', rawScope).href;
  } catch (e) {
    return self.location.origin + '/';
  }
}

function resolveScopeUrl(relPath) {
  try {
    return new URL(relPath, getScopeBaseUrl()).href;
  } catch (e) {
    return relPath;
  }
}

function getCleanSameOriginCacheKey(reqUrl) {
  try {
    const u = new URL(reqUrl, getScopeBaseUrl());
    return u.origin + u.pathname;
  } catch (e) {
    return reqUrl;
  }
}

function isCacheableSameOriginResponse(res) {
  if (!res || !res.ok || res.status !== 200 || res.redirected) return false;
  return res.type !== 'opaque' && res.type !== 'opaqueredirect' && res.type !== 'error';
}

function isCacheableCdnResponse(res) {
  if (!res) return false;
  if (res.type === 'opaque') return true;
  return Boolean(res.ok && res.status === 200 && res.type !== 'opaqueredirect' && res.type !== 'error');
}

async function safeCachePut(cache, key, res) {
  if (!cache || !res) return;
  let cloned;
  try {
    cloned = res.clone();
  } catch (e) {
    return;
  }
  try {
    await cache.put(key, cloned);
  } catch (e) {}
}

// Network-first for the app itself (always shows the latest GitHub version when online),
// falls back to the cached copy when offline, when the server returns an error, or when the network is slow.
async function networkFirst(req, fallbackUrl, timeoutMs = 2500, waitUntilFn = null) {
  const cache = await caches.open(CACHE_NAME).catch(() => null);
  const reqUrl = typeof req === 'string' ? req : req.url;
  const cacheKey = getCleanSameOriginCacheKey(reqUrl);

  const cachedPromise = (async () => {
    if (!cache) return undefined;
    try {
      const exact = await cache.match(cacheKey);
      if (exact) return exact;
      const byReq = await cache.match(req, { ignoreSearch: true });
      if (byReq) return byReq;
      if (fallbackUrl) {
        const fbMatch = await cache.match(resolveScopeUrl(fallbackUrl));
        if (fbMatch) return fbMatch;
        const rootMatch = await cache.match(resolveScopeUrl('./'));
        if (rootMatch) return rootMatch;
      }
    } catch (e) {}
    return undefined;
  })();

  let putDonePromise = Promise.resolve();
  const networkResultPromise = fetch(req).then((res) => {
    if (cache && isCacheableSameOriginResponse(res)) {
      const puts = [safeCachePut(cache, cacheKey, res)];
      if (fallbackUrl) {
        const scopeRoot = resolveScopeUrl('./');
        const fbUrl = resolveScopeUrl(fallbackUrl);
        if (cacheKey === scopeRoot && fbUrl !== cacheKey) {
          puts.push(safeCachePut(cache, fbUrl, res));
        } else if (cacheKey === fbUrl && scopeRoot !== cacheKey) {
          puts.push(safeCachePut(cache, scopeRoot, res));
        }
      }
      putDonePromise = Promise.all(puts).then(() => undefined);
    }
    return { ok: true, res };
  }).catch((err) => ({ ok: false, err }));

  const bgWork = networkResultPromise.then(() => putDonePromise).catch(() => {});
  if (typeof waitUntilFn === 'function') {
    try { waitUntilFn(bgWork); } catch (e) {}
  }

  return await new Promise((resolve) => {
    let settled = false;
    let timer = null;

    const finish = (response) => {
      if (settled) return;
      settled = true;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      resolve(response || Response.error());
    };

    timer = setTimeout(() => {
      timer = null;
      cachedPromise.then((cached) => {
        if (cached && !settled) {
          finish(cached);
        }
      });
    }, timeoutMs);

    networkResultPromise.then(async (result) => {
      if (settled) return;
      if (result.ok && result.res) {
        const shouldPreferCache = result.res.status >= 500 || (Boolean(fallbackUrl) && !result.res.ok);
        if (shouldPreferCache) {
          const cached = await cachedPromise;
          if (cached) {
            finish(cached);
            return;
          }
        }
        finish(result.res);
      } else {
        const cached = await cachedPromise;
        finish(cached || Response.error());
      }
    });
  });
}

// Stale-while-revalidate for pinned CDN libraries (Lucide, Google Fonts).
async function staleWhileRevalidate(req, waitUntilFn = null) {
  const cache = await caches.open(CACHE_NAME).catch(() => null);
  const cached = cache ? await cache.match(req).catch(() => undefined) : undefined;
  let putDonePromise = Promise.resolve();
  const networkPromise = fetch(req).then((res) => {
    if (cache && isCacheableCdnResponse(res)) {
      putDonePromise = safeCachePut(cache, req, res);
    }
    return res;
  }).catch(() => null);

  if (typeof waitUntilFn === 'function') {
    try { waitUntilFn(networkPromise.then(() => putDonePromise).catch(() => {})); } catch (e) {}
  }

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

function normalizeIdList(ids) {
  if (!Array.isArray(ids)) return [];
  const seen = new Set();
  const out = [];
  for (const raw of ids) {
    if (raw === null || raw === undefined) continue;
    const str = String(raw).trim();
    if (!str || seen.has(str)) continue;
    seen.add(str);
    out.push(str);
  }
  return out;
}

let idbWriteChain = Promise.resolve();
function runSerializedIdbOp(fn) {
  const next = idbWriteChain.then(fn, fn);
  idbWriteChain = next.catch(() => {});
  return next;
}

function openSwDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    let req;
    try {
      req = indexedDB.open(DB_NAME, 1);
    } catch (err) {
      reject(err);
      return;
    }
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      db.onversionchange = () => {
        try { db.close(); } catch (e) {}
      };
      resolve(db);
    };
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
    req.onblocked = () => reject(new Error('IndexedDB open blocked'));
  });
}

async function getSwNotifiedIds() {
  let db = null;
  try {
    db = await openSwDb();
    return await new Promise((resolve) => {
      let settled = false;
      let result = null;
      const finish = (val) => {
        if (settled) return;
        settled = true;
        resolve(val);
      };
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('notifiedIds');
      req.onsuccess = () => {
        result = Array.isArray(req.result) ? normalizeIdList(req.result) : null;
      };
      req.onerror = () => finish(null);
      tx.oncomplete = () => finish(result);
      tx.onerror = () => finish(null);
      tx.onabort = () => finish(null);
    });
  } catch (e) {
    return null;
  } finally {
    if (db) {
      try { db.close(); } catch (e) {}
    }
  }
}

async function setSwNotifiedIds(ids) {
  return runSerializedIdbOp(async () => {
    let db = null;
    const clean = normalizeIdList(ids);
    try {
      db = await openSwDb();
      return await new Promise((resolve) => {
        let settled = false;
        const finish = (ok) => {
          if (settled) return;
          settled = true;
          resolve(ok);
        };
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const req = tx.objectStore(STORE_NAME).put(clean, 'notifiedIds');
        req.onerror = () => finish(false);
        tx.oncomplete = () => finish(true);
        tx.onerror = () => finish(false);
        tx.onabort = () => finish(false);
      });
    } catch (e) {
      return false;
    } finally {
      if (db) {
        try { db.close(); } catch (e) {}
      }
    }
  });
}

async function mergeSwNotifiedIds(newIds) {
  const incoming = normalizeIdList(newIds);
  if (incoming.length === 0) return (await getSwNotifiedIds()) || [];
  return runSerializedIdbOp(async () => {
    let db = null;
    try {
      db = await openSwDb();
      return await new Promise((resolve) => {
        let settled = false;
        let merged = incoming;
        const finish = (val) => {
          if (settled) return;
          settled = true;
          resolve(val);
        };
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get('notifiedIds');
        getReq.onsuccess = () => {
          const existing = Array.isArray(getReq.result) ? normalizeIdList(getReq.result) : [];
          merged = normalizeIdList(existing.concat(incoming));
          try {
            const putReq = store.put(merged, 'notifiedIds');
            putReq.onerror = () => finish(merged);
          } catch (e) {
            finish(merged);
          }
        };
        getReq.onerror = () => finish(merged);
        tx.oncomplete = () => finish(merged);
        tx.onerror = () => finish(merged);
        tx.onabort = () => finish(merged);
      });
    } catch (e) {
      return incoming;
    } finally {
      if (db) {
        try { db.close(); } catch (e) {}
      }
    }
  });
}

async function getInScopeWindowClients() {
  if (!self.clients || typeof self.clients.matchAll !== 'function') return [];
  const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  let scopeParsed;
  try {
    scopeParsed = new URL(getScopeBaseUrl());
  } catch (e) {
    return allClients;
  }
  const scopePath = scopeParsed.pathname;
  const scopePathNoSlash = scopePath.endsWith('/') && scopePath.length > 1 ? scopePath.slice(0, -1) : scopePath;

  return allClients.filter((client) => {
    if (!client || typeof client.url !== 'string') return false;
    try {
      const clientUrl = new URL(client.url);
      if (clientUrl.origin !== scopeParsed.origin) return false;
      return clientUrl.pathname.startsWith(scopePath) || clientUrl.pathname === scopePathNoSlash;
    } catch (e) {
      return false;
    }
  });
}

async function showSwNotificationSafe(title, options) {
  if (!self.registration || typeof self.registration.showNotification !== 'function') {
    return false;
  }
  const safeTitle = (title !== undefined && title !== null && String(title).trim())
    ? String(title).trim()
    : 'VET-KSU 33';
  const rawOptions = (options && typeof options === 'object') ? options : {};
  const safeTag = rawOptions.tag ? String(rawOptions.tag) : ('vet33-notif-' + Date.now());
  const defaultIcon = resolveScopeUrl('./assets/icons/icon-192.png');
  const defaultBadge = resolveScopeUrl('./assets/icons/favicon.png');
  const resolvedIcon = rawOptions.icon ? resolveScopeUrl(String(rawOptions.icon)) : defaultIcon;
  const resolvedBadge = rawOptions.badge ? resolveScopeUrl(String(rawOptions.badge)) : defaultBadge;
  const safeData = (rawOptions.data && typeof rawOptions.data === 'object') ? rawOptions.data : {};

  const fullOptions = Object.assign({
    dir: 'rtl',
    lang: 'ar',
    renotify: true,
    requireInteraction: true,
    vibrate: [300, 100, 300, 100, 400]
  }, rawOptions, {
    icon: resolvedIcon,
    badge: resolvedBadge,
    tag: safeTag,
    data: safeData
  });

  try {
    await self.registration.showNotification(safeTitle, fullOptions);
    return true;
  } catch (err1) {
    try {
      await self.registration.showNotification(safeTitle, {
        body: fullOptions.body ? String(fullOptions.body) : '',
        dir: 'rtl',
        lang: 'ar',
        icon: defaultIcon,
        tag: safeTag,
        data: safeData
      });
      return true;
    } catch (err2) {
      try {
        await self.registration.showNotification(safeTitle, {
          body: fullOptions.body ? String(fullOptions.body) : '',
          dir: 'rtl',
          lang: 'ar',
          data: safeData
        });
        return true;
      } catch (err3) {
        return false;
      }
    }
  }
}

let activeCheckPromise = null;
let isCheckingDrive = false;
let lastSwCheckMs = 0;
const SW_CHECK_COOLDOWN_MS = 25000; // 25s cooldown for routine background checks

async function notifyForStudyFileSw(file) {
  if (!file || typeof file !== 'object') return false;
  const subName = SUBJECT_NAMES[file.subject] || file.subject || 'المقررات';
  const category = (file.category && String(file.category).trim()) ? String(file.category).trim() : '';
  const unitName = category === 'سكاشن' ? 'سكشن' : 'محاضرة';
  const hasFolderNum = file.folderNum !== undefined && file.folderNum !== null && String(file.folderNum).trim() !== '';
  const pubDate = (file.dateAdded && String(file.dateAdded).trim())
    ? String(file.dateAdded).trim()
    : ((file.date && String(file.date).trim()) ? String(file.date).trim() : 'الآن');
  const rawTitle = String(file.title || '').trim();
  const strippedTitle = rawTitle.replace(/^(المصدر|شرح|تلخيص|خريطه ذهنية|خريطة ذهنية)\s*[:\-]\s*/i, '').trim();
  const cleanTitle = strippedTitle || rawTitle || 'ملف دراسي جديد';
  const fmtLabel = (file.format && String(file.format).trim()) ? String(file.format).trim() : 'ملف';
  const title = '🔔 تم نشر (' + fmtLabel + ') جديد — ' + subName;

  let pathLine = 'المسار: ' + subName;
  if (category) pathLine += ' > ' + category;
  if (hasFolderNum) pathLine += ' > ' + unitName + ' ' + String(file.folderNum).trim();
  const body = cleanTitle + NL + pathLine + NL + 'تاريخ النشر: ' + pubDate;

  const safeFileId = (file.id !== undefined && file.id !== null && String(file.id).trim() !== '')
    ? String(file.id).trim()
    : '';
  return await showSwNotificationSafe(title, {
    body: body,
    tag: safeFileId ? ('vet33-file-' + safeFileId) : ('vet33-notif-' + Date.now()),
    data: {
      fileId: safeFileId,
      subject: file.subject || '',
      category: category,
      folderNum: hasFolderNum ? file.folderNum : ''
    }
  });
}

function extractDrivePayload(data) {
  if (!data || typeof data !== 'object') return null;
  if (!Array.isArray(data) && (data.ok === false || data.status === 'error')) return null;

  if (Array.isArray(data)) {
    return { files: data, folders: [] };
  }
  if (Array.isArray(data.files)) {
    return {
      files: data.files,
      folders: Array.isArray(data.folders) ? data.folders : []
    };
  }
  if (data.data && typeof data.data === 'object' && Array.isArray(data.data.files)) {
    return {
      files: data.data.files,
      folders: Array.isArray(data.data.folders) ? data.data.folders : []
    };
  }
  return null;
}

async function checkDriveInBackground(isFromPushWakeup = false) {
  const now = Date.now();
  if (!isFromPushWakeup) {
    if (activeCheckPromise) return activeCheckPromise;
    if (now - lastSwCheckMs < SW_CHECK_COOLDOWN_MS) return false;
  }

  const prevPromise = activeCheckPromise;
  const myPromise = (async () => {
    if (prevPromise) {
      try { await prevPromise; } catch (e) {}
    }
    isCheckingDrive = true;
    lastSwCheckMs = Date.now();
    let shownNotification = false;
    let newestRemoteFile = null;

    try {
      const res = await fetchSwWithTimeout(GAS_URL + '?action=sync&force=false&t=' + Date.now(), {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store'
      }, 14000);
      if (!res || !res.ok) {
        throw new Error('GAS HTTP error: ' + (res ? res.status : 'none'));
      }
      const data = await res.json();
      const extracted = extractDrivePayload(data);
      if (!extracted) return false;

      const rawFiles = extracted.files;
      const rawFolders = extracted.folders;
      const remoteFiles = rawFiles.filter(f => f && f.id && !f.isSystemMeta && !String(f.id).startsWith('_sys_'));

      // Sort a copy by driveModifiedTime descending (stable on ties) so newest detection is always accurate
      const sortedRemoteFiles = remoteFiles
        .map((f, idx) => ({ f, idx, t: Number(f.driveModifiedTime) || 0 }))
        .sort((a, b) => (b.t - a.t) || (a.idx - b.idx))
        .map(item => item.f);

      newestRemoteFile = sortedRemoteFiles[0] || null;

      try {
        const scopedClients = await getInScopeWindowClients();
        for (const client of scopedClients) {
          try {
            client.postMessage({
              type: 'SW_DRIVE_DATA',
              files: rawFiles,
              folders: rawFolders
            });
          } catch (postErr) {}
        }
      } catch (e) {}

      if (sortedRemoteFiles.length === 0) {
        return false;
      }

      let notifiedIds = await getSwNotifiedIds();
      let seedOlderIds = [];

      if (!notifiedIds) {
        const isNewestVeryRecent = newestRemoteFile && newestRemoteFile.driveModifiedTime && (Date.now() - Number(newestRemoteFile.driveModifiedTime) < 15 * 60 * 1000);
        if (isFromPushWakeup || isNewestVeryRecent) {
          seedOlderIds = sortedRemoteFiles.slice(1).map(f => String(f.id));
          notifiedIds = seedOlderIds;
        } else {
          await mergeSwNotifiedIds(sortedRemoteFiles.map(f => String(f.id)));
          return false;
        }
      }

      const notifiedSet = new Set(notifiedIds.map(String));
      const newFiles = sortedRemoteFiles.filter(f => f && f.id && !notifiedSet.has(String(f.id)));

      if (newFiles.length > 0) {
        const idsToPersist = seedOlderIds.concat(newFiles.map(f => String(f.id)));
        const updated = await mergeSwNotifiedIds(idsToPersist);

        for (const file of newFiles.slice(0, 3).reverse()) {
          const ok = await notifyForStudyFileSw(file);
          if (ok) shownNotification = true;
        }

        try {
          const clientsList = await getInScopeWindowClients();
          for (const client of clientsList) {
            try {
              client.postMessage({ type: 'SW_DETECTED_NEW_FILES', notifiedIds: updated });
            } catch (postErr) {}
          }
        } catch (e) {}
      } else if (seedOlderIds.length > 0) {
        await mergeSwNotifiedIds(seedOlderIds);
      }
    } catch (err) {
      // Handled in finally when push wakeup requires a visible notification
    } finally {
      if (isFromPushWakeup && !shownNotification) {
        try {
          const clientsList = await getInScopeWindowClients();
          const anyVisible = clientsList.some(c => c && c.visibilityState === 'visible');
          if (!anyVisible) {
            if (newestRemoteFile) {
              shownNotification = await notifyForStudyFileSw(newestRemoteFile);
            } else {
              shownNotification = await showSwNotificationSafe('🔔 تحديث جديد في مكتبة VET-KSU 33', {
                body: 'تتوفر تحديثات جديدة في المكتبة — اضغط للفتح والمزامنة.',
                tag: 'vet33-push-wakeup',
                data: {}
              });
            }
          }
        } catch (fallbackErr) {}
      }
      if (activeCheckPromise === myPromise) {
        activeCheckPromise = null;
        isCheckingDrive = false;
      }
    }
    return shownNotification;
  })();

  activeCheckPromise = myPromise;
  return myPromise;
}

// Single lightweight background check helper (replaces infinite 12s polling loop to preserve Google Apps Script quotas)
function scheduleNextSyncWakeup() {
  // Rely on Web Push and Periodic Background Sync events instead of recursive sync loops
}

async function runBackgroundKeepAliveLoop() {
  await checkDriveInBackground(false);
}

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const fetchAndCache = async (relUrl) => {
    const absUrl = resolveScopeUrl(relUrl);
    const res = await fetch(new Request(absUrl, { cache: 'reload' }));
    if (!isCacheableSameOriginResponse(res)) {
      throw new Error('Precache failed for ' + relUrl + ' (status ' + (res ? res.status : 'none') + ')');
    }
    await cache.put(absUrl, res);
  };

  const requiredSet = new Set(REQUIRED_APP_SHELL);
  const optionalList = APP_SHELL.filter(u => !requiredSet.has(u));

  // Core app shell must succeed so a broken partial install never replaces a working previous cache
  await Promise.all(REQUIRED_APP_SHELL.map(fetchAndCache));
  await Promise.allSettled(optionalList.map(fetchAndCache));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    await precacheAppShell();
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    } catch (e) {}
    if (self.clients && typeof self.clients.claim === 'function') {
      await self.clients.claim();
    }
    scheduleNextSyncWakeup();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (!req || req.method !== 'GET') return;
  if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
  if (req.headers && req.headers.has('range')) return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Google Drive database (Apps Script), Drive files and Telegram links must ALWAYS stay live.
  if (isHostMatch(url.hostname, NEVER_CACHE_HOSTS)) return;

  const waitUntilFn = typeof event.waitUntil === 'function' ? (p) => event.waitUntil(p) : null;

  if (url.origin === self.location.origin) {
    const lowerPath = url.pathname.toLowerCase();
    let swPathname = '';
    try { swPathname = new URL(self.location.href).pathname.toLowerCase(); } catch (e) {}
    if (lowerPath === swPathname || lowerPath.endsWith('/sw.js')) return;
    // Do not intercept or cache mp4 video stream requests
    if (lowerPath.endsWith('.mp4')) return;
    if (req.mode === 'navigate') {
      event.respondWith(networkFirst(req, './index.html', 2500, waitUntilFn));
    } else {
      event.respondWith(networkFirst(req, null, 2500, waitUntilFn));
    }
    return;
  }

  if (RUNTIME_CDN_HOSTS.includes(url.hostname.toLowerCase())) {
    event.respondWith(staleWhileRevalidate(req, waitUntilFn));
  }
});

self.addEventListener('message', (event) => {
  const msg = (event && event.data && typeof event.data === 'object') ? event.data : {};
  const wait = (p) => (typeof event.waitUntil === 'function' ? event.waitUntil(p) : p);

  if (msg.type === 'SKIP_WAITING') {
    wait(self.skipWaiting());
  } else if (msg.type === 'INIT_SW') {
    wait((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      scheduleNextSyncWakeup();
    })());
  } else if (msg.type === 'PAGE_HIDDEN') {
    wait((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await checkDriveInBackground(false);
    })());
  } else if (msg.type === 'CHECK_NOW') {
    wait((async () => {
      if (Array.isArray(msg.notifiedIds) && msg.notifiedIds.length > 0) {
        await mergeSwNotifiedIds(msg.notifiedIds);
      }
      await checkDriveInBackground(false);
    })());
  } else if (msg.type === 'SHOW_NOTIFICATION' && msg.title) {
    wait(showSwNotificationSafe(msg.title, msg.options || {}));
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-bg-sync')) {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
    })());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag && event.tag.startsWith('vet33-sync')) {
    event.waitUntil((async () => {
      await checkDriveInBackground(false);
    })());
  }
});

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let handledPayload = false;
    if (event.data) {
      try {
        let payload = null;
        const rawText = typeof event.data.text === 'function' ? event.data.text() : '';
        if (rawText && rawText.trim()) {
          try {
            payload = JSON.parse(rawText);
          } catch (parseErr) {
            payload = null;
          }
        } else if (typeof event.data.json === 'function') {
          try { payload = event.data.json(); } catch (jsonErr) { payload = null; }
        }

        if (payload && typeof payload === 'object' && payload.title) {
          const rawOpts = (payload.options && typeof payload.options === 'object') ? payload.options : {};
          const mergedData = Object.assign(
            {},
            (payload.data && typeof payload.data === 'object') ? payload.data : {},
            (rawOpts.data && typeof rawOpts.data === 'object') ? rawOpts.data : {}
          );
          const fileId = payload.fileId || mergedData.fileId;
          if (fileId) {
            mergedData.fileId = String(fileId);
            await mergeSwNotifiedIds([mergedData.fileId]);
          }
          const notifOpts = Object.assign(
            { body: payload.body ? String(payload.body) : '' },
            rawOpts,
            { data: mergedData }
          );
          handledPayload = await showSwNotificationSafe(payload.title, notifOpts);
        }
      } catch (e) {}
    }
    if (!handledPayload) {
      await checkDriveInBackground(true);
    }
  })());
});

self.addEventListener('notificationclick', (event) => {
  if (event.notification && typeof event.notification.close === 'function') {
    event.notification.close();
  }
  const rawData = event.notification && event.notification.data;
  const data = (rawData && typeof rawData === 'object') ? rawData : {};

  event.waitUntil((async () => {
    const scopedClients = await getInScopeWindowClients();
    scopedClients.sort((a, b) => {
      const score = (c) => (c && c.focused ? 2 : (c && c.visibilityState === 'visible' ? 1 : 0));
      return score(b) - score(a);
    });

    for (const client of scopedClients) {
      if (client && typeof client.focus === 'function') {
        try {
          const focusedClient = await client.focus();
          const targetClient = focusedClient || client;
          try {
            targetClient.postMessage({ type: 'OPEN_FILE_FROM_NOTIF', data });
          } catch (postErr) {}
          return;
        } catch (focusErr) {
          // Try next matching window client if focus fails
        }
      }
    }

    if (self.clients && typeof self.clients.openWindow === 'function') {
      const baseUrl = getScopeBaseUrl();
      const fileIdStr = (data.fileId !== undefined && data.fileId !== null && String(data.fileId).trim() !== '')
        ? String(data.fileId).trim()
        : '';
      const targetUrl = fileIdStr
        ? (baseUrl + '#file=' + encodeURIComponent(fileIdStr))
        : baseUrl;
      try {
        await self.clients.openWindow(targetUrl);
      } catch (openErr) {}
    }
  })());
});
