/**
 * ============================================================================
 * Seniors 2027 VET-KSU 33 Old List — Google Apps Script (GasCode.gs)
 * نظام المزامنة الثنائية الكامل (Two-Way Sync) بين الموقع ومجلد Google Drive
 * ============================================================================
 *
 * المجلد الرئيسي المربوط: VET_KSU_33_Library
 * معرف المجلد (Folder ID): 1MtIe4RbnJhA7tacObKWYD8nlRHz9QJtx
 *
 * الوظائف المدعومة تلقائياً:
 * 1. إضافة أي ملف في مجلد Google Drive -> يظهر تلقائياً في الموقع في نفس المادة والقسم ورقم المحاضرة/السكشن.
 * 2. تعديل أي ملف (أو تغيير اسمه أو نقله) في Google Drive -> يتحدث تلقائياً في الموقع.
 * 3. حذف أي ملف من مجلد Google Drive -> يحذف تلقائياً من الموقع.
 * 4. إضافة/رفع ملف من الموقع -> يُرفع تلقائياً داخل المجلد المخصص له في Google Drive.
 * 5. تعديل أو نقل ملف من الموقع -> يتعدل اسمه أو يُنقل لمجلده الجديد في Google Drive.
 * 6. حذف ملف من الموقع -> يُحذف (ينقل إلى المهملات) من مجلد Google Drive فوراً.
 */

var CONFIG = {
  ROOT_FOLDER_ID: '1MtIe4RbnJhA7tacObKWYD8nlRHz9QJtx',
  ROOT_FOLDER_NAME: 'VET_KSU_33_Library',
  DB_FILE_NAME: 'vet_ksu_33_db.json',
  SYS_PUSH_SUBS_ID: '_sys_push_subs_v1',
  SYS_ABOUT_CONTENT_ID: '_sys_about_content_v1',
  SYNC_THROTTLE_MS: 45000,
  CACHE_TTL_SEC: 21600,
  CACHE_CHUNK_SIZE: 45000,
  CACHE_CHUNK_BYTES: 85000,
  CACHE_MAX_CHUNKS: 40,
  VAPID_PUBLIC_KEY: 'BBe2gBt8gJLkBd1A18PTct2lU5Z7hvEIYHCZsJGpoAxbE87icx-JptMv6X_MreSsSy_msKURSS-bgmbxlt3YJpA',
  VAPID_PRIVATE_D_B64URL: 'B1wi3aQnb-RLzcd1QiW9REM_TVITkBf6yAKz8iQyADo',
  ADMIN_HASHES: ['0643799174995559', 'ea9b3768d5fb77e8', 'ce67dfc0bfb928fe', 'c1acda7163742c9b', '2afb2a3e63add4dc']
};

/**
 * قائمة المقررات الثمانية المطابقة تماماً لملف js/app.js ومجلدات Google Drive
 */
var SUBJECTS_CONFIG = [
  {
    id: 'batna',
    folderName: 'باطنه',
    displayName: 'الباطنة',
    doctor: 'قسم طب الحيوان (باطنه)',
    aliases: ['باطنة', 'باطنه', 'الباطنة', 'الباطنه', 'batna', 'medicine']
  },
  {
    id: 'tawleed',
    folderName: 'توليد',
    displayName: 'التوليد',
    doctor: 'قسم التوليد والتناسل',
    aliases: ['توليد', 'التوليد', 'ولادة', 'ولاده', 'الولادة', 'tawleed', 'theriogenology', 'obstetrics']
  },
  {
    id: 'geraha',
    folderName: 'جراحه',
    displayName: 'الجراحة',
    doctor: 'قسم الجراحة والتخدير والأشعة',
    aliases: ['جراحة', 'جراحه', 'الجراحة', 'الجراحه', 'geraha', 'surgery']
  },
  {
    id: 'dawagen',
    folderName: 'دواجن',
    displayName: 'الدواجن',
    doctor: 'قسم أمراض الدواجن',
    aliases: ['دواجن', 'الدواجن', 'dawagen', 'poultry']
  },
  {
    id: 'seha',
    folderName: 'صحه',
    displayName: 'الصحة',
    doctor: 'قسم الصحة والطب الوقائي',
    aliases: ['صحة', 'صحه', 'الصحة', 'الصحه', 'seha', 'hygiene']
  },
  {
    id: 'lahma',
    folderName: 'لحمه',
    displayName: 'اللحوم',
    doctor: 'قسم مراقبة الأغذية (اللحوم)',
    aliases: ['لحوم', 'اللحوم', 'لحمة', 'لحمه', 'اللحمة', 'اللحمه', 'رقابة', 'lahma', 'meat']
  },
  {
    id: 'moshtaraka',
    folderName: 'مشتركه',
    displayName: 'المشتركة',
    doctor: 'قسم الأمراض المشتركة',
    aliases: ['مشتركة', 'مشتركه', 'المشتركة', 'المشتركه', 'moshtaraka', 'zoonoses']
  },
  {
    id: 'moadya',
    folderName: 'معديه',
    displayName: 'المعدية',
    doctor: 'قسم الأمراض المعدية',
    aliases: ['معدية', 'معديه', 'المعدية', 'المعديه', 'moadya', 'infectious']
  }
];

/**
 * ============================================================================
 * 1. استقبال طلبات القراءة والمزامنة (GET) من الموقع ومن الـ Service Worker
 * ============================================================================
 */
function isSystemRecordServer_(rec) {
  return Boolean(rec && (
    rec.id === CONFIG.SYS_PUSH_SUBS_ID ||
    rec.id === CONFIG.SYS_ABOUT_CONTENT_ID ||
    rec.isSystemMeta ||
    String(rec.id || '').indexOf('_sys_') === 0
  ));
}

function hasStudyFilesServer_(filesArr) {
  if (!Array.isArray(filesArr)) return false;
  for (let i = 0; i < filesArr.length; i++) {
    if (filesArr[i] && filesArr[i].id && !isSystemRecordServer_(filesArr[i])) {
      return true;
    }
  }
  return false;
}

function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const forceScan = String(params.force || '') === 'true';
    const explicitSync = String(params.explicit || '') === 'true';

    // المسار السريع الفوري (Fast-Path): عند فتح الموقع (force=false) نرجع قاعدة البيانات فوراً من الذاكرة السريعة (CacheService / JSON) في أقل من 0.1 ثانية دون انتظار فحص 80 مجلداً
    if (!forceScan) {
      const fastDb = readDatabaseState(null, false);
      if (fastDb && hasStudyFilesServer_(fastDb.files)) {
        return jsonResponse({
          ok: true,
          status: 'success',
          fastCached: true,
          syncedAt: new Date().toISOString(),
          files: fastDb.files,
          folders: fastDb.folders || []
        });
      }
    }

    const props = PropertiesService.getScriptProperties();
    const lastScanMs = Number(props.getProperty('LAST_DRIVE_SCAN_MS') || 0);
    const nowMs = Date.now();

    let syncResult = null;
    if (!explicitSync && (nowMs - lastScanMs < CONFIG.SYNC_THROTTLE_MS)) {
      const cachedDb = readDatabaseState(null, false);
      if (hasStudyFilesServer_(cachedDb.files)) {
        syncResult = cachedDb;
      }
    }

    let shouldTriggerPushWakeup = false;
    if (!syncResult) {
      const lock = LockService.getScriptLock();
      // انتظار خفيف (600ms فقط بدلاً من 15 ثانية) حتى لا يتجمد أي مستخدم أثناء مسح الخلفية
      if (lock.tryLock(600)) {
        try {
          // إعادة فحص مهلة التهدئة بعد الحصول على القفل لمنع مسح مكرر عند تزامن عدة طلبات
          const latestScanMs = Number(props.getProperty('LAST_DRIVE_SCAN_MS') || 0);
          if (!explicitSync && (Date.now() - latestScanMs < CONFIG.SYNC_THROTTLE_MS)) {
            const freshDb = readDatabaseState(null, false);
            if (hasStudyFilesServer_(freshDb.files)) {
              syncResult = freshDb;
            }
          }
          if (!syncResult) {
            const coreResult = syncDriveWithDatabaseCore_();
            syncResult = { files: coreResult.files, folders: coreResult.folders };
            shouldTriggerPushWakeup = coreResult.newlyAddedCount > 0;
            try { props.setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (pe) {}
          }
        } finally {
          lock.releaseLock();
        }
      } else {
        syncResult = readDatabaseState(null, false);
      }
    }

    // إرسال إشعار Web Push خارج القفل حتى تستجيب الهواتف المستيقظة فوراً دون انتظار أو تداخل
    if (shouldTriggerPushWakeup) {
      try { handlePushWakeup([]); } catch (pushErr) {}
    }

    return jsonResponse({
      ok: true,
      status: 'success',
      syncedAt: new Date().toISOString(),
      files: syncResult.files || [],
      folders: syncResult.folders || []
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      status: 'error',
      error: err.toString(),
      message: err.toString()
    });
  }
}

/**
 * ============================================================================
 * 2. استقبال طلبات الإضافة والتعديل والحذف والإشعارات (POST) من الموقع
 * ============================================================================
 */
function doPost(e) {
  let lock = null;
  let shouldTriggerPushWakeup = false;
  let pendingResponse = null;
  try {
    const rawBody = (e && e.postData && typeof e.postData.contents === 'string') ? e.postData.contents : '{}';
    if (rawBody.length > 48 * 1024 * 1024) {
      return jsonResponse({
        ok: false,
        status: 'error',
        error: 'حجم الملف يتجاوز الحد الأقصى المسموح به للرفع المباشر من الموقع (~35 ميجابايت). يرجى رفع الملفات الكبيرة مباشرة إلى مجلد المادة في تطبيق Google Drive وستظهر في الموقع تلقائياً.',
        message: 'حجم الملف يتجاوز الحد الأقصى للرفع المباشر (35MB). ارفعه مباشرة في تطبيق Google Drive.'
      });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody || '{}');
    } catch (parseErr) {
      return jsonResponse({
        ok: false,
        status: 'error',
        error: 'صيغة البيانات المرسلة غير صالحة (JSON).',
        message: 'صيغة البيانات المرسلة غير صالحة (JSON).'
      });
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return jsonResponse({
        ok: false,
        status: 'error',
        error: 'بيانات الطلب يجب أن تكون كائن JSON صالحاً.',
        message: 'بيانات الطلب يجب أن تكون كائن JSON صالحاً.'
      });
    }

    const action = String(payload.action || '').trim();

    // أ-1) التحقق من كود المسؤول عبر الخادم (لا يحتاج لقفل)
    if (action === 'verify_admin') {
      const isOk = verifyAdminPasscodeServer(payload.passcode || payload.adminToken || '');
      return jsonResponse({ ok: isOk, status: isOk ? 'success' : 'unauthorized' });
    }

    // أ-3) إرسال إشعارات Web Push بالتوازي دون حجز قفل القراءة (حتى تستجيب الهواتف المستيقظة فوراً عبر doGet)
    if (action === 'push_wakeup') {
      if (!verifyAdminAuthPayload(payload)) {
        return jsonResponse({ ok: false, status: 'unauthorized', error: 'غير مصرح بإرسال الإشعارات إلا لمسؤولي الدفعة' });
      }
      const pushResult = handlePushWakeup(payload.targets || []);
      return jsonResponse({
        ok: true,
        pushedCount: pushResult.pushedCount,
        removedExpiredCount: pushResult.removedExpiredCount,
        expiredEndpoints: pushResult.expiredEndpoints
      });
    }

    // باقي العمليات تعدل ملف قاعدة البيانات لذا نستخدم قفل السكربت بأمان
    lock = LockService.getScriptLock();
    lock.waitLock(30000);

    // أ-2) زيادة عداد التحميلات بشكل خفيف وآمن دون إعادة مسح شجرة Drive (متاح لجميع الطلاب)
    if (action === 'increment_download') {
      const updatedState = handleIncrementDownloadCount(payload.id || payload.fileId || '');
      return jsonResponse({
        ok: true,
        status: 'success',
        files: updatedState.files,
        folders: updatedState.folders
      });
    }

    // ب) حفظ ملف جديد أو تعديل ملف حالي أو حفظ سجلات النظام (_sys_push_subs_v1 / _sys_about_content_v1)
    if (action === 'save' || action === 'upload' || action === 'uploadFile' || action === 'addFile' || action === 'updateFile' || action === 'save_about') {
      const rawIncoming = (payload.file && typeof payload.file === 'object' && !Array.isArray(payload.file))
        ? payload.file
        : ((payload.item && typeof payload.item === 'object' && !Array.isArray(payload.item)) ? payload.item : {});
      const incomingItem = Object.assign({}, rawIncoming);

      // حفظ محتوى قسم About يتطلب دائماً صلاحية المسؤول ولا يُعامل أبداً كملف دراسي
      if (action === 'save_about') {
        if (!verifyAdminAuthPayload(payload)) {
          return jsonResponse({
            ok: false,
            status: 'unauthorized',
            error: 'غير مصرح بتعديل محتوى قسم About إلا لمسؤولي الدفعة'
          });
        }
        incomingItem.id = CONFIG.SYS_ABOUT_CONTENT_ID;
        incomingItem.isSystemMeta = true;
        if (!incomingItem.aboutContent && payload.aboutContent && typeof payload.aboutContent === 'object') {
          incomingItem.aboutContent = payload.aboutContent;
        }
        const updatedAboutState = saveSystemMetaRecord(incomingItem);
        return jsonResponse({
          ok: true,
          status: 'success',
          files: updatedAboutState.files,
          folders: updatedAboutState.folders
        });
      }

      // حفظ سجل اشتراكات إشعارات الطلاب (_sys_push_subs_v1) متاح لتسجيل هواتف الطلاب مع تحقق وتنقية صارمة
      if (incomingItem.id === CONFIG.SYS_PUSH_SUBS_ID) {
        const updatedState = saveSystemMetaRecord(incomingItem);
        return jsonResponse({
          ok: true,
          status: 'success',
          files: updatedState.files,
          folders: updatedState.folders
        });
      }

      // جميع عمليات النشر والتعديل وتحديث سجلات النظام تتطلب التحقق من صلاحية المسؤول على الخادم
      if (!verifyAdminAuthPayload(payload)) {
        return jsonResponse({
          ok: false,
          status: 'unauthorized',
          error: 'غير مصرح بالنشر أو التعديل إلا لمسؤولي الدفعة'
        });
      }

      if (incomingItem.id === CONFIG.SYS_ABOUT_CONTENT_ID || incomingItem.isSystemMeta || String(incomingItem.id || '').indexOf('_sys_') === 0) {
        const updatedState = saveSystemMetaRecord(incomingItem);
        return jsonResponse({
          ok: true,
          status: 'success',
          files: updatedState.files,
          folders: updatedState.folders
        });
      }

      // تمرير المعرفات العليا إن لم تكن موجودة داخل كائن الملف (للتوافق مع action='updateFile' للملفات المدارة فقط)
      if (!incomingItem.id && payload.id) {
        incomingItem.id = String(payload.id).trim();
      }
      if (!incomingItem.driveFileId && payload.driveFileId && (!incomingItem.id || String(incomingItem.id).indexOf('drive_') === 0)) {
        incomingItem.driveFileId = String(payload.driveFileId).trim();
      }

      // إضافة أو تعديل ملف دراسي ورفعه/تحديثه في مجلد Google Drive المخصص بشكل فوري وسريع
      const uploadObj = (payload.fileUpload && typeof payload.fileUpload === 'object')
        ? payload.fileUpload
        : (payload.base64 ? {
          base64: payload.base64,
          fileName: payload.fileName || payload.name || 'file.pdf',
          mimeType: payload.mimeType || payload.type || 'application/pdf'
        } : null);
      const saveResult = handleSaveStudyFileFromSite(incomingItem, uploadObj);
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e2) {}
      return jsonResponse({
        ok: true,
        status: 'success',
        file: saveResult.file,
        files: saveResult.files,
        folders: saveResult.folders
      });
    }

    // ج) حذف ملف من الموقع -> يحذف فوراً من مجلد Google Drive ومن قاعدة البيانات (محمي بصلاحية المسؤول)
    if (action === 'delete' || action === 'deleteFile') {
      if (!verifyAdminAuthPayload(payload)) {
        return jsonResponse({
          ok: false,
          status: 'unauthorized',
          error: 'غير مصرح بحذف الملفات إلا لمسؤولي الدفعة'
        });
      }
      const deleteResult = handleDeleteStudyFileFromSite(payload);
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e3) {}
      return jsonResponse({
        ok: true,
        status: 'success',
        deleted: deleteResult.deleted,
        files: deleteResult.files,
        folders: deleteResult.folders
      });
    }

    // د) مزامنة شاملة صريحة عبر POST
    if (action === '' || action === 'sync') {
      const coreResult = syncDriveWithDatabaseCore_();
      shouldTriggerPushWakeup = coreResult.newlyAddedCount > 0;
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e4) {}
      pendingResponse = {
        ok: true,
        status: 'success',
        files: coreResult.files,
        folders: coreResult.folders
      };
    } else {
      return jsonResponse({
        ok: false,
        status: 'error',
        error: 'إجراء غير مدعوم: ' + action,
        message: 'إجراء غير مدعوم: ' + action
      });
    }
  } catch (err) {
    return jsonResponse({
      ok: false,
      status: 'error',
      error: err.toString(),
      message: err.toString()
    });
  } finally {
    if (lock) {
      try { lock.releaseLock(); } catch (e5) {}
      lock = null;
    }
  }

  // إرسال إشعار Web Push بعد تحرير قفل السكربت بالكامل
  if (shouldTriggerPushWakeup) {
    try { handlePushWakeup([]); } catch (pushErr) {}
  }

  return jsonResponse(pendingResponse);
}

/**
 * ============================================================================
 * 3. محرك المزامنة الثنائية الشامل بين شجرة مجلدات Google Drive وملف JSON
 * ============================================================================
 */
function syncDriveWithDatabase() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return readDatabaseState(null, false);
  }
  let coreResult = null;
  try {
    coreResult = syncDriveWithDatabaseCore_();
    try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (pe) {}
  } finally {
    try { lock.releaseLock(); } catch (le) {}
  }

  // إرسال إشعار Web Push خارج قفل السكربت لمنع التعارض أو حجب استجابة الهواتف
  if (coreResult && coreResult.newlyAddedCount > 0) {
    try {
      handlePushWakeup([]);
    } catch (pushErr) {}
  }

  return {
    files: coreResult ? coreResult.files : [],
    folders: coreResult ? coreResult.folders : []
  };
}

function syncDriveWithDatabaseCore_() {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder, true, true);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];
  const existingFolders = Array.isArray(dbState.folders) ? dbState.folders : [];

  // الاحتفاظ بسجلات النظام (مع منع تكرار نفس المعرف)
  const sysById = {};
  existingFiles.forEach(f => {
    if (f && f.id && isSystemRecordServer_(f)) {
      sysById[f.id] = f;
    }
  });
  const systemRecords = Object.keys(sysById).map(k => sysById[k]);

  // فهرسة السجلات الحالية حسب driveFileId وحسب كونها ملفات خارجية مضافة من الموقع
  const dbByDriveId = {};
  const externalOnlyRecords = [];
  const seenExternalIds = {};

  existingFiles.forEach(item => {
    if (!item || !item.id || isSystemRecordServer_(item)) return;
    const isManagedDriveRecord = String(item.id).indexOf('drive_') === 0 || Boolean(item.driveFileId);
    const dId = item.driveFileId || (String(item.id).indexOf('drive_') === 0 ? extractDriveIdFromRecord(item) : '');
    if (isManagedDriveRecord && dId) {
      item.driveFileId = dId;
      dbByDriveId[dId] = item;
    } else if (!seenExternalIds[item.id]) {
      // أي سجل أضافه المسؤول من الموقع كرابط خارجي (تيليجرام، درايف خارجي، يوتيوب...) أو بدون ملف مرفوع يبقى محفوظاً حتى يحذفه المسؤول
      seenExternalIds[item.id] = true;
      externalOnlyRecords.push(item);
    }
  });

  // مسح شجرة مجلدات Google Drive بالكامل مع تمرير الفهرس الحالي لتسريع قراءة الملفات غير المعدلة
  const scanOutput = scanEntireDriveTree(rootFolder, dbByDriveId);
  const discoveredDriveFiles = scanOutput.driveFiles; // كل الملفات الموجودة فعلياً الآن في المجلد
  const discoveredFolders = scanOutput.folders;       // كل مجلدات المحاضرات/السكاشن الموجودة فعلياً

  const syncedStudyFiles = [];
  const newlyAddedInDrive = [];
  const hadPreviousStudyFiles = Object.keys(dbByDriveId).length > 0 || externalOnlyRecords.length > 0;
  const seenDriveIds = {};

  discoveredDriveFiles.forEach(dFile => {
    if (!dFile || !dFile.driveFileId || seenDriveIds[dFile.driveFileId]) return;
    seenDriveIds[dFile.driveFileId] = true;
    const prev = dbByDriveId[dFile.driveFileId];

    if (!prev) {
      // 1) ملف جديد أُضيف في مجلد Google Drive -> يضاف تلقائياً للموقع في نفس مكانه المخصص
      const newDriveRecord = {
        id: 'drive_' + dFile.driveFileId,
        driveFileId: dFile.driveFileId,
        title: dFile.cleanTitle,
        originalFileName: dFile.fileName,
        driveObservedName: dFile.fileName,
        driveModifiedTime: dFile.modifiedTimeMs,
        subject: dFile.subjectId,
        category: dFile.categoryName,
        folderNum: dFile.folderNum,
        format: dFile.format,
        doctor: dFile.doctor,
        externalUrl: dFile.viewUrl,
        fileUrl: dFile.viewUrl,
        driveUrl: dFile.viewUrl,
        downloadUrl: dFile.downloadUrl,
        previewUrl: dFile.previewUrl,
        size: dFile.sizeFormatted,
        date: dFile.dateFormatted,
        dateAdded: dFile.dateFormatted,
        downloads: 0,
        downloadsCount: 0,
        viewsCount: 0,
        description: '',
        keypoints: [],
        clinicalNote: '',
        pages: null,
        term: 'الترم الاول'
      };
      syncedStudyFiles.push(newDriveRecord);
      if (hadPreviousStudyFiles) {
        newlyAddedInDrive.push(newDriveRecord);
      }
    } else {
      // 2) ملف موجود مسبقاً: نتحقق هل تم تعديله أو تغيير اسمه أو نقله داخل Google Drive
      const nameChangedInDrive = (prev.driveObservedName && prev.driveObservedName !== dFile.fileName) ||
                                 (!prev.driveObservedName && prev.originalFileName && prev.originalFileName !== dFile.fileName);
      const contentModifiedInDrive = prev.driveModifiedTime && prev.driveModifiedTime !== dFile.modifiedTimeMs;
      const subjectChangedInDrive = prev.subject && prev.subject !== dFile.subjectId;

      // المكان الفعلي في مجلد Google Drive هو المرجع دائماً للمادة والقسم ورقم المحاضرة
      const updatedRecord = Object.assign({}, prev, {
        driveFileId: dFile.driveFileId,
        subject: dFile.subjectId,
        category: dFile.categoryName,
        folderNum: dFile.folderNum,
        externalUrl: dFile.viewUrl,
        fileUrl: dFile.viewUrl,
        driveUrl: dFile.viewUrl,
        downloadUrl: dFile.downloadUrl,
        previewUrl: dFile.previewUrl,
        size: dFile.sizeFormatted,
        originalFileName: dFile.fileName,
        driveObservedName: dFile.fileName,
        driveModifiedTime: dFile.modifiedTimeMs
      });

      // إذا نُقل الملف لمادة أخرى ولم يكن له اسم دكتور مخصص، نحدث اسم القسم الافتراضي تلقائياً
      if (subjectChangedInDrive) {
        const prevSubCfg = getSubjectConfigById(prev.subject);
        if (!prev.doctor || (prevSubCfg && prev.doctor === prevSubCfg.doctor)) {
          updatedRecord.doctor = dFile.doctor;
        }
      }

      const normDriveName = normalizeArabic(dFile.fileName);
      const isExplicitSourceName = normDriveName.indexOf('تفريغ') !== -1 || normDriveName.indexOf('مصدر') !== -1;

      // إذا قام المستخدم بتغيير اسم الملف في Google Drive نحدث عنوانه وصيغته تلقائياً
      if (nameChangedInDrive) {
        updatedRecord.title = dFile.cleanTitle;
        updatedRecord.format = dFile.format;
        updatedRecord.date = dFile.dateFormatted;
        delete updatedRecord.adminFormat;
        delete updatedRecord.explicitAdminFormat;
      } else if (contentModifiedInDrive) {
        updatedRecord.date = dFile.dateFormatted;
        if (prev.explicitAdminFormat) {
          updatedRecord.format = normalizeStudyFormatServer_(prev.format || prev.adminFormat || dFile.format);
        } else if (!prev.adminFormat || (prev.adminFormat === 'المصدر' && dFile.format !== 'المصدر' && !isExplicitSourceName)) {
          updatedRecord.format = dFile.format;
        }
      } else if (prev.explicitAdminFormat) {
        // احترام اختيار المسؤول الصريح للصيغة عند التعديل من الموقع
        updatedRecord.format = normalizeStudyFormatServer_(prev.format || prev.adminFormat || 'المصدر');
      } else if (prev.adminFormat && !(prev.adminFormat === 'المصدر' && dFile.format !== 'المصدر' && !isExplicitSourceName)) {
        // الحفاظ على الصيغة التي اختارها المسؤول صراحة من الموقع مع تصحيح الملفات التي تُركت على خيار "المصدر" الافتراضي بالخطأ رغم أن اسمها صريح
        updatedRecord.format = normalizeStudyFormatServer_(prev.adminFormat);
      } else if (prev.adminFormat === 'المصدر' && dFile.format !== 'المصدر' && !isExplicitSourceName) {
        updatedRecord.format = dFile.format;
        updatedRecord.adminFormat = dFile.format;
      } else if (prev.format === 'المصدر' && dFile.format !== 'المصدر' && !isExplicitSourceName) {
        // تصحيح تلقائي لأي ملفات قديمة كانت مصنفة كـ "المصدر" بالخطأ
        updatedRecord.format = dFile.format;
      } else if (prev.format === 'شرح' && dFile.format === 'المصدر' && normDriveName.indexOf('تفريغ') !== -1) {
        // تصحيح تصنيف ملفات "التفريغ" لتكون ضمن "المصدر"
        updatedRecord.format = 'المصدر';
      } else {
        updatedRecord.format = normalizeStudyFormatServer_(updatedRecord.format || dFile.format);
      }

      syncedStudyFiles.push(updatedRecord);
    }
  });

  // 3) أي ملف كان له driveFileId ولم يعد موجوداً في المجلد (تم حذفه من Google Drive)
  // يتم استبعاده تلقائياً من syncedStudyFiles وبذلك يُحذف من الموقع فوراً.

  // دمج الملفات المزامنة + روابط التيليجرام الخارجية
  const allStudyFiles = syncedStudyFiles.concat(externalOnlyRecords);

  // ترتيب الملفات من الأحدث للأقدم
  allStudyFiles.sort((a, b) => {
    const tA = Number(a.driveModifiedTime) || 0;
    const tB = Number(b.driveModifiedTime) || 0;
    return tB - tA;
  });

  // توحيد قائمة المجلدات بحيث تغطي المجلدات المكتشفة في Drive + مجلدات الروابط الخارجية أو الملفات المباشرة بدون تكرار
  const finalFolders = reconcileFoldersListServer_(discoveredFolders, allStudyFiles, existingFolders);
  const finalFilesArray = allStudyFiles.concat(systemRecords);

  // حفظ التحديث في ملف vet_ksu_33_db.json داخل المجلد الرئيسي
  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: finalFilesArray,
    folders: finalFolders
  });

  return {
    files: finalFilesArray,
    folders: finalFolders,
    newlyAddedCount: newlyAddedInDrive.length
  };
}

/**
 * ============================================================================
 * 4. مسح الهيكل الرباعي لمجلد Google Drive (VET_KSU_33_Library)
 * ============================================================================
 */
function scanEntireDriveTree(rootFolder, dbByDriveId) {
  const driveFiles = [];
  const folders = [];
  const seenFolderKeys = {};
  const usedSubjectFolderIds = {};
  const knownMap = dbByDriveId || {};

  const rootSubfolders = getSubfoldersList(rootFolder);

  SUBJECTS_CONFIG.forEach(subConfig => {
    const availableSubFolders = rootSubfolders.filter(f => !usedSubjectFolderIds[f.getId()]);
    const subjectFolder = findFolderByAliases(availableSubFolders, subConfig.aliases);
    if (!subjectFolder) return;
    usedSubjectFolderIds[subjectFolder.getId()] = true;

    const categoryFolders = getSubfoldersList(subjectFolder);
    const usedCatFolderIds = {};

    // 1. مسح قسمي "محاضرات" و "سكاشن"
    ['محاضرات', 'سكاشن'].forEach(categoryName => {
      const catAliases = categoryName === 'محاضرات'
        ? ['محاضرات', 'المحاضرات', 'محاضره', 'محاضرة', 'lectures']
        : ['سكاشن', 'السكاشن', 'سكشن', 'عملي', 'sections'];

      const availableCatFolders = categoryFolders.filter(f => !usedCatFolderIds[f.getId()]);
      const catFolder = findFolderByAliases(availableCatFolders, catAliases);
      if (!catFolder) return;
      usedCatFolderIds[catFolder.getId()] = true;

      // أ) مسح مجلدات المحاضرات/السكاشن المرقمة أو المدمجة (مثل: محاضرة 1، محاضرة 8-10، سكشن 1...)
      const numberedFolders = getSubfoldersList(catFolder);
      const unitSingular = categoryName === 'محاضرات' ? 'محاضرة' : 'سكشن';
      numberedFolders.forEach((numFolder, idx) => {
        const rawFolderName = String(numFolder.getName() || '').trim();
        const folderNum = extractFolderNumber(rawFolderName) || normalizeFolderNumServer(rawFolderName) || (idx + 1);
        const normalizedFolderName = !/^(?:ال)?(?:محاضرات|محاضرة|محاضره|سكاشن|سكشن)/i.test(rawFolderName)
          ? (unitSingular + ' ' + folderNum)
          : rawFolderName;

        const filesInNumFolder = getFilesList(numFolder);
        // لا نضيف المجلد الفارغ تماماً من الملفات حتى لا يظهر كبطاقة فارغة ("غير مضاف") بعد حذف ملفاته
        if (filesInNumFolder.length > 0) {
          const flKey = subConfig.id + '|' + categoryName + '|' + String(normalizeFolderNumServer(folderNum));
          if (!seenFolderKeys[flKey]) {
            seenFolderKeys[flKey] = true;
            folders.push({
              id: numFolder.getId(),
              subject: subConfig.id,
              category: categoryName,
              folderNum: folderNum,
              name: normalizedFolderName
            });
          }
        }

        filesInNumFolder.forEach(file => {
          driveFiles.push(buildScannedDriveFileObject(file, subConfig, categoryName, folderNum, knownMap));
        });
      });

      // ب) مسح أي ملفات وُضعت مباشرة داخل مجلد "محاضرات" أو "سكاشن" بدون مجلد رقمي فرعي
      const directCatFiles = getFilesList(catFolder);
      directCatFiles.forEach(file => {
        const inferredNum = extractFolderNumber(file.getName()) || 1;
        driveFiles.push(buildScannedDriveFileObject(file, subConfig, categoryName, inferredNum, knownMap));
      });
    });

    // 2. مسح أي ملفات وُضعت مباشرة داخل مجلد المادة نفسه (مثل: "محاضرة 1 باطنة تلخيص.pdf")
    const directSubjFiles = getFilesList(subjectFolder);
    directSubjFiles.forEach(file => {
      const fName = file.getName();
      const normFName = normalizeArabic(fName);
      const inferredCategory = (
        normFName.indexOf('سكشن') !== -1 ||
        normFName.indexOf('سكاشن') !== -1 ||
        normFName.indexOf('عملي') !== -1 ||
        /\bsections?\b/.test(normFName)
      ) ? 'سكاشن' : 'محاضرات';
      const inferredNum = extractFolderNumber(fName) || 1;
      driveFiles.push(buildScannedDriveFileObject(file, subConfig, inferredCategory, inferredNum, knownMap));
    });
  });

  folders.sort(compareFolderObjectsServer_);
  return {
    driveFiles: driveFiles,
    folders: folders
  };
}

/**
 * تحويل ملف Google Drive إلى كائن بيانات متوافق مع الموقع (مع إعادة استخدام بيانات الملفات غير المعدلة لتسريع المسح)
 */
function buildScannedDriveFileObject(file, subConfig, categoryName, folderNum, knownMap) {
  const fileId = file.getId();
  const fileName = String(file.getName() || '');
  const lastUpdated = file.getLastUpdated() || new Date();
  const modifiedTimeMs = lastUpdated.getTime();
  const detectedFormat = detectStudyFormat(fileName);
  const normalizedNum = normalizeFolderNumServer(folderNum) || 1;
  const prev = knownMap ? knownMap[fileId] : null;

  if (prev && prev.driveModifiedTime === modifiedTimeMs && prev.driveObservedName === fileName && prev.size) {
    return {
      driveFileId: fileId,
      fileName: fileName,
      cleanTitle: stripExtension(fileName),
      mimeType: prev.mimeType || 'application/pdf',
      subjectId: subConfig.id,
      categoryName: categoryName,
      folderNum: normalizedNum,
      format: detectedFormat,
      doctor: subConfig.doctor,
      sizeFormatted: prev.size,
      dateFormatted: prev.date || Utilities.formatDate(lastUpdated, 'Africa/Cairo', 'yyyy/MM/dd'),
      modifiedTimeMs: modifiedTimeMs,
      viewUrl: 'https://drive.google.com/file/d/' + fileId + '/view',
      previewUrl: 'https://drive.google.com/file/d/' + fileId + '/preview',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=' + fileId
    };
  }

  const mimeType = String(file.getMimeType() || '');
  const sizeBytes = file.getSize();
  const ext = getFileExtension(fileName).toUpperCase() || (mimeType.indexOf('pdf') !== -1 ? 'PDF' : (mimeType.indexOf('image') !== -1 ? 'PNG' : 'FILE'));

  return {
    driveFileId: fileId,
    fileName: fileName,
    cleanTitle: stripExtension(fileName),
    mimeType: mimeType || 'application/octet-stream',
    subjectId: subConfig.id,
    categoryName: categoryName,
    folderNum: normalizedNum,
    format: detectedFormat,
    doctor: subConfig.doctor,
    sizeFormatted: ext + ' • ' + formatBytes(sizeBytes),
    dateFormatted: Utilities.formatDate(lastUpdated, 'Africa/Cairo', 'yyyy/MM/dd'),
    modifiedTimeMs: modifiedTimeMs,
    viewUrl: 'https://drive.google.com/file/d/' + fileId + '/view',
    previewUrl: 'https://drive.google.com/file/d/' + fileId + '/preview',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=' + fileId
  };
}

/**
 * ============================================================================
 * 5. عمليات الموقع -> Google Drive (إضافة، رفع، تعديل، نقل، حذف)
 * ============================================================================
 */

function normalizeStudyFormatServer_(fmt) {
  const raw = String(fmt || '').trim();
  if (!raw) return 'المصدر';
  if (raw === 'خريطة ذهنية' || raw === 'خريطه ذهنية' || raw === 'خريطه ذهنيه' || raw === 'خريطة ذهنيه') {
    return 'خريطه ذهنية';
  }
  if (raw === 'شرح' || raw === 'تلخيص' || raw === 'المصدر') {
    return raw;
  }
  return detectStudyFormat(raw);
}

function normalizeCategoryServer_(cat) {
  const norm = normalizeArabic(cat);
  if (norm === 'سكاشن' || norm === 'السكاشن' || norm === 'سكشن' || norm === 'عملي' || norm === 'sections' || norm === 'section') {
    return 'سكاشن';
  }
  return 'محاضرات';
}

function getFolderDepthUnderRoot_(folder, rootFolderId, maxDepth) {
  const limit = maxDepth || 5;
  if (!folder || !rootFolderId) return -1;
  try {
    if (folder.getId() === rootFolderId) return 0;
  } catch (e) {
    return -1;
  }
  let frontier = [folder];
  const visited = {};
  for (let depth = 1; depth <= limit; depth++) {
    const nextFrontier = [];
    for (let i = 0; i < frontier.length; i++) {
      let pIter;
      try {
        pIter = frontier[i].getParents();
      } catch (e) {
        continue;
      }
      while (pIter.hasNext()) {
        const p = pIter.next();
        const pId = p.getId();
        if (pId === rootFolderId) return depth;
        if (!visited[pId]) {
          visited[pId] = true;
          nextFrontier.push(p);
        }
      }
    }
    if (nextFrontier.length === 0) break;
    frontier = nextFrontier;
  }
  return -1;
}

function isFileInsideLibraryRoot_(file, rootFolderId) {
  if (!file || !rootFolderId) return false;
  try {
    const pIter = file.getParents();
    while (pIter.hasNext()) {
      const p = pIter.next();
      const depth = getFolderDepthUnderRoot_(p, rootFolderId, 4);
      if (depth >= 0 && depth <= 4) return true;
    }
  } catch (e) {}
  return false;
}

function trashEmptyTopicFoldersOnly_(parentFolders, rootFolderId) {
  if (!Array.isArray(parentFolders) || !rootFolderId) return;
  parentFolders.forEach(pFolder => {
    try {
      if (!pFolder || pFolder.isTrashed()) return;
      // نحذف فقط مجلدات المحاضرات/السكاشن المرقمة في المستوى الثالث (Root -> Subject -> Category -> TopicFolder)
      // ولا نحذف أبداً المجلد الرئيسي (0) أو مجلد المادة (1) أو مجلد القسم (2) أو أي مجلد خارج المكتبة (-1)
      if (getFolderDepthUnderRoot_(pFolder, rootFolderId, 5) !== 3) return;
      const remFiles = getFilesList(pFolder);
      const remSubfolders = getSubfoldersList(pFolder);
      if (remFiles.length === 0 && remSubfolders.length === 0) {
        pFolder.setTrashed(true);
      }
    } catch (cleanFolderErr) {}
  });
}

function compareFolderObjectsServer_(a, b) {
  const sA = String((a && a.subject) || '');
  const sB = String((b && b.subject) || '');
  if (sA !== sB) return sA < sB ? -1 : 1;
  const cA = String((a && a.category) || '');
  const cB = String((b && b.category) || '');
  if (cA !== cB) return cA < cB ? -1 : 1;
  return compareFolderNumsServer(a && a.folderNum, b && b.folderNum);
}

function reconcileFoldersListServer_(primaryFolders, studyFiles, fallbackFolders) {
  const byKey = {};
  const fallbackByKey = {};

  (Array.isArray(fallbackFolders) ? fallbackFolders : []).forEach(fl => {
    if (!fl || !fl.subject || !fl.category) return;
    const normNum = normalizeFolderNumServer(fl.folderNum);
    if (normNum === null || normNum === undefined || String(normNum) === '') return;
    const key = fl.subject + '|' + fl.category + '|' + String(normNum);
    if (!fallbackByKey[key]) {
      fallbackByKey[key] = fl;
    }
  });

  (Array.isArray(primaryFolders) ? primaryFolders : []).forEach(fl => {
    if (!fl || !fl.subject || !fl.category) return;
    const normNum = normalizeFolderNumServer(fl.folderNum);
    if (normNum === null || normNum === undefined || String(normNum) === '') return;
    const key = fl.subject + '|' + fl.category + '|' + String(normNum);
    if (!byKey[key]) {
      byKey[key] = {
        id: fl.id,
        subject: fl.subject,
        category: fl.category,
        folderNum: normNum,
        name: fl.name || ((fl.category === 'محاضرات' ? 'محاضرة ' : 'سكشن ') + normNum)
      };
    }
  });

  (Array.isArray(studyFiles) ? studyFiles : []).forEach(sf => {
    if (!sf || isSystemRecordServer_(sf) || !sf.subject || !sf.category) return;
    const normNum = normalizeFolderNumServer(sf.folderNum);
    if (normNum === null || normNum === undefined || String(normNum) === '') return;
    const key = sf.subject + '|' + sf.category + '|' + String(normNum);
    if (!byKey[key]) {
      const prevFl = fallbackByKey[key];
      const unitSingular = sf.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
      byKey[key] = {
        id: (prevFl && prevFl.id) ? prevFl.id : ('virtual_' + sf.subject + '_' + (sf.category === 'سكاشن' ? 'sec' : 'lec') + '_' + String(normNum)),
        subject: sf.subject,
        category: sf.category,
        folderNum: normNum,
        name: (prevFl && prevFl.name) ? prevFl.name : (unitSingular + ' ' + normNum)
      };
    }
  });

  // إبقاء المجلدات التي تحتوي فعلياً على ملفات دراسية فقط حتى لا تظهر بطاقات فارغة
  const activeStudyKeys = {};
  (Array.isArray(studyFiles) ? studyFiles : []).forEach(sf => {
    if (!sf || isSystemRecordServer_(sf) || !sf.subject || !sf.category) return;
    const normNum = normalizeFolderNumServer(sf.folderNum);
    if (normNum === null || normNum === undefined || String(normNum) === '') return;
    activeStudyKeys[sf.subject + '|' + sf.category + '|' + String(normNum)] = true;
  });

  const result = [];
  Object.keys(byKey).forEach(key => {
    if (activeStudyKeys[key]) {
      result.push(byKey[key]);
    }
  });
  result.sort(compareFolderObjectsServer_);
  return result;
}

function hasActiveFileWithName_(folder, fileName, excludeDriveFileId) {
  const iter = folder.getFilesByName(fileName);
  while (iter.hasNext()) {
    const f = iter.next();
    if (!f.isTrashed() && (!excludeDriveFileId || f.getId() !== excludeDriveFileId)) {
      return true;
    }
  }
  return false;
}

/**
 * حفظ أو رفع أو تعديل ملف دراسي قادم من الموقع في المكان المخصص داخل Google Drive
 */
function handleSaveStudyFileFromSite(item, fileUpload) {
  const rootFolder = getRootFolder();
  const rootFolderId = rootFolder.getId();
  const dbState = readDatabaseState(rootFolder, true, true);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];

  // تنقية نسخة من المدخلات لمنع تسريب أي حقول حساسة أو مؤقتة داخل قاعدة البيانات العامة
  const cleanItem = Object.assign({}, item || {});
  delete cleanItem.adminToken;
  delete cleanItem.passcode;
  delete cleanItem.isPendingUpload;

  const subjectId = cleanItem.subject || 'batna';
  const subConfig = getSubjectConfigById(subjectId);
  const categoryName = normalizeCategoryServer_(cleanItem.category);
  const folderNum = normalizeFolderNumServer(cleanItem.folderNum) || 1;
  let format = normalizeStudyFormatServer_(cleanItem.format || 'المصدر');

  // البحث عن السجل المسبق قبل اتخاذ قرار تعديل الصيغة أو استبدال ملف Drive
  let existingIndex = -1;
  let existingRecord = null;
  const incomingId = cleanItem.id ? String(cleanItem.id).trim() : '';
  const explicitDriveId = cleanItem.driveFileId
    ? String(cleanItem.driveFileId).trim()
    : (incomingId.indexOf('drive_') === 0 ? incomingId.replace(/^drive_/, '') : '');

  for (let i = 0; i < existingFiles.length; i++) {
    const f = existingFiles[i];
    if (!f || isSystemRecordServer_(f)) continue;
    if ((incomingId && f.id === incomingId) || (explicitDriveId && f.driveFileId === explicitDriveId)) {
      existingIndex = i;
      existingRecord = f;
      break;
    }
  }

  const isEditingExisting = Boolean(existingRecord);
  const existingIsManagedDrive = Boolean(
    existingRecord && (existingRecord.driveFileId || String(existingRecord.id || '').indexOf('drive_') === 0)
  );
  let managedDriveId = '';
  if (isEditingExisting) {
    if (existingIsManagedDrive) {
      managedDriveId = String(existingRecord.driveFileId || String(existingRecord.id || '').replace(/^drive_/, '')).trim();
    } else {
      // السجل الموجود رابط خارجي (ليس ملفاً مداراً داخل مكتبة Drive)، فلا نربطه بمعرف Drive مدار
      delete cleanItem.driveFileId;
    }
  } else {
    managedDriveId = explicitDriveId;
  }

  // عند رفع/إضافة ملف جديد فقط: إذا نسي المسؤول تغيير الصيغة عن "المصدر" وكان اسم الملف صريحاً نصححها تلقائياً
  // أما عند تعديل سجل موجود فنحترم اختيار المسؤول الصريح للصيغة دون تجاوز
  if (!isEditingExisting) {
    const checkNameForFmt = String((fileUpload && (fileUpload.fileName || fileUpload.name)) || cleanItem.title || '');
    const normCheckName = normalizeArabic(checkNameForFmt);
    const autoDetectedFmt = detectStudyFormat(checkNameForFmt);
    if (format === 'المصدر' && autoDetectedFmt !== 'المصدر' && normCheckName.indexOf('تفريغ') === -1 && normCheckName.indexOf('مصدر') === -1) {
      format = autoDetectedFmt;
    }
  }

  let targetTopicFolder = null;
  let driveFile = null;
  const hasUploadPayload = Boolean(fileUpload && typeof fileUpload.base64 === 'string' && fileUpload.base64.trim() !== '');

  // حالة 1: تم رفع ملف فعلي جديد من الجهاز عبر الموقع
  if (hasUploadPayload) {
    // فك تشفير الملف والتحقق منه أولاً قبل إنشاء أي مجلد أو حذف أي ملف سابق (لمنع فقدان البيانات عند فشل الرفع)
    const cleanBase64 = String(fileUpload.base64).replace(/^data:[^,]*;base64,/i, '').replace(/\s+/g, '');
    if (!cleanBase64) {
      throw new Error('بيانات الملف المرفوع (Base64) فارغة أو غير صالحة.');
    }
    let decodedBytes;
    try {
      decodedBytes = Utilities.base64Decode(cleanBase64);
    } catch (b64Err) {
      throw new Error('فشل فك تشفير الملف المرفوع، يرجى إعادة المحاولة.');
    }
    if (!decodedBytes || decodedBytes.length === 0) {
      throw new Error('الملف المرفوع فارغ ولا يمكن حفظه.');
    }

    targetTopicFolder = getOrCreateNumberedTopicFolder(rootFolder, subConfig, categoryName, folderNum);

    const origName = String(fileUpload.fileName || fileUpload.name || 'file.pdf').trim();
    const ext = getFileExtension(origName) || 'pdf';
    let finalDriveFileName = buildDriveFileName(cleanItem.title, origName, subConfig, categoryName, folderNum, format, ext);

    // منع تصادم الأسماء مع ملفات أخرى غير الملف الذي يتم استبداله
    const excludeId = (existingRecord && existingRecord.driveFileId) ? existingRecord.driveFileId : '';
    if (hasActiveFileWithName_(targetTopicFolder, finalDriveFileName, excludeId)) {
      let counter = 2;
      const baseNoExt = stripExtension(finalDriveFileName);
      const cleanExt = String(ext || 'pdf').replace(/^\./, '');
      while (hasActiveFileWithName_(targetTopicFolder, finalDriveFileName, excludeId)) {
        finalDriveFileName = baseNoExt + ' (' + counter + ').' + cleanExt;
        counter++;
      }
    }

    const mimeType = fileUpload.mimeType || fileUpload.type || 'application/pdf';
    const blob = Utilities.newBlob(decodedBytes, mimeType, finalDriveFileName);

    // إنشاء الملف الجديد أولاً، وبعد نجاح الإنشاء فقط نحذف الملف القديم بأمان
    driveFile = targetTopicFolder.createFile(blob);
    try {
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {}

    if (existingRecord && existingRecord.driveFileId && existingRecord.driveFileId !== driveFile.getId()) {
      try {
        const oldFile = DriveApp.getFileById(existingRecord.driveFileId);
        if (!oldFile.isTrashed() && oldFile.getName() !== CONFIG.DB_FILE_NAME && isFileInsideLibraryRoot_(oldFile, rootFolderId)) {
          const oldParents = [];
          const oldPIter = oldFile.getParents();
          while (oldPIter.hasNext()) {
            oldParents.push(oldPIter.next());
          }
          oldFile.setTrashed(true);
          trashEmptyTopicFoldersOnly_(oldParents, rootFolderId);
        }
      } catch (oldTrashErr) {}
    }
  }
  // حالة 2: تعديل بيانات ملف مُدار موجود أصلاً داخل مكتبة Google Drive (تغيير عنوانه أو نقله لمحاضرة/مادة أخرى)
  else if (managedDriveId) {
    let existingDriveFile = null;
    try {
      existingDriveFile = DriveApp.getFileById(managedDriveId);
    } catch (getErr) {
      existingDriveFile = null;
    }

    if (!existingDriveFile || existingDriveFile.isTrashed()) {
      throw new Error('الملف غير موجود في Google Drive أو تم حذفه مسبقاً.');
    }
    if (existingDriveFile.getName() === CONFIG.DB_FILE_NAME || !isFileInsideLibraryRoot_(existingDriveFile, rootFolderId)) {
      throw new Error('لا يمكن نقل أو تعديل ملف غير موجود داخل مجلد المكتبة المعتمد.');
    }

    driveFile = existingDriveFile;
    targetTopicFolder = getOrCreateNumberedTopicFolder(rootFolder, subConfig, categoryName, folderNum);

    // نقل الملف إلى المجلد الجديد إذا تغيرت المادة أو القسم أو رقم المحاضرة مع تنظيف المجلد القديم إذا فرغ
    const moveRes = moveFileToFolderIfNeeded(driveFile, targetTopicFolder);
    if (moveRes && moveRes.moved && Array.isArray(moveRes.oldParents) && moveRes.oldParents.length > 0) {
      trashEmptyTopicFoldersOnly_(moveRes.oldParents, rootFolderId);
    }

    // تحديث اسم الملف في Google Drive إذا تم تعديل العنوان أو الصيغة في الموقع
    const currentName = driveFile.getName();
    const ext = getFileExtension(currentName) || 'pdf';
    const desiredName = buildDriveFileName(cleanItem.title, currentName, subConfig, categoryName, folderNum, format, ext);
    if (desiredName && desiredName !== currentName) {
      driveFile.setName(desiredName);
    }
  }

  const nowFormatted = Utilities.formatDate(new Date(), 'Africa/Cairo', 'yyyy/MM/dd');
  const preservedDownloads = Math.max(
    Number(existingRecord && existingRecord.downloads) || 0,
    Number(existingRecord && existingRecord.downloadsCount) || 0,
    Number(cleanItem.downloads) || 0
  );

  const finalRecord = Object.assign({}, existingRecord || {}, cleanItem, {
    id: (existingRecord && existingRecord.id) || incomingId || ('file_' + Date.now() + '_' + Math.floor(Math.random() * 1e9).toString(36)),
    subject: subConfig.id,
    category: categoryName,
    folderNum: folderNum,
    format: format,
    adminFormat: format,
    explicitAdminFormat: isEditingExisting ? true : Boolean(cleanItem.explicitAdminFormat),
    doctor: cleanItem.doctor || subConfig.doctor,
    date: cleanItem.date || nowFormatted,
    dateAdded: (existingRecord && existingRecord.dateAdded) || cleanItem.dateAdded || nowFormatted,
    downloads: preservedDownloads,
    downloadsCount: preservedDownloads,
    viewsCount: Number((existingRecord && existingRecord.viewsCount) || cleanItem.viewsCount) || 0,
    driveModifiedTime: (existingRecord && existingRecord.driveModifiedTime) ? existingRecord.driveModifiedTime : Date.now(),
    term: 'الترم الاول'
  });

  if (driveFile) {
    const dId = driveFile.getId();
    const dName = driveFile.getName();
    const extUpper = (getFileExtension(dName) || 'PDF').toUpperCase();
    finalRecord.id = 'drive_' + dId;
    finalRecord.driveFileId = dId;
    finalRecord.title = stripExtension(dName);
    finalRecord.originalFileName = dName;
    finalRecord.driveObservedName = dName;
    finalRecord.driveModifiedTime = (driveFile.getLastUpdated() || new Date()).getTime();
    finalRecord.size = extUpper + ' • ' + formatBytes(driveFile.getSize());
    finalRecord.externalUrl = 'https://drive.google.com/file/d/' + dId + '/view';
    finalRecord.fileUrl = 'https://drive.google.com/file/d/' + dId + '/view';
    finalRecord.driveUrl = 'https://drive.google.com/file/d/' + dId + '/view';
    finalRecord.previewUrl = 'https://drive.google.com/file/d/' + dId + '/preview';
    finalRecord.downloadUrl = 'https://drive.google.com/uc?export=download&id=' + dId;
  }

  if (existingIndex !== -1) {
    existingFiles[existingIndex] = finalRecord;
  } else {
    existingFiles.unshift(finalRecord);
  }

  const baseFolders = Array.isArray(dbState.folders) ? dbState.folders.slice() : [];
  if (targetTopicFolder) {
    const tFolderId = targetTopicFolder.getId();
    const unitSingular = categoryName === 'محاضرات' ? 'محاضرة' : 'سكشن';
    const filteredBase = baseFolders.filter(fl => !(fl && fl.subject === subConfig.id && fl.category === categoryName && String(normalizeFolderNumServer(fl.folderNum)) === String(folderNum)));
    filteredBase.push({
      id: tFolderId,
      subject: subConfig.id,
      category: categoryName,
      folderNum: folderNum,
      name: unitSingular + ' ' + folderNum
    });
    baseFolders.length = 0;
    filteredBase.forEach(fl => baseFolders.push(fl));
  }

  const studyFilesOnly = existingFiles.filter(f => f && !isSystemRecordServer_(f));
  const updatedFolders = reconcileFoldersListServer_(baseFolders, studyFilesOnly, baseFolders);

  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: existingFiles,
    folders: updatedFolders
  });

  return {
    file: finalRecord,
    files: existingFiles,
    folders: updatedFolders
  };
}

/**
 * حذف ملف من الموقع -> يحذفه فوراً من مجلد Google Drive ومن ملف قاعدة البيانات
 */
function handleDeleteStudyFileFromSite(payload) {
  const targetId = String((payload && (payload.id || payload.fileId)) || '').trim();
  let driveIdToTrash = String((payload && payload.driveFileId) || '').trim();

  if (!driveIdToTrash && targetId.indexOf('drive_') === 0) {
    driveIdToTrash = targetId.replace(/^drive_/, '');
  }

  if (!targetId && !driveIdToTrash) {
    throw new Error('معرف الملف المطلوب حذفه غير صالح.');
  }

  // منع حذف سجلات النظام الداخلية بأي شكل
  if (targetId === CONFIG.SYS_PUSH_SUBS_ID || targetId === CONFIG.SYS_ABOUT_CONTENT_ID || targetId.indexOf('_sys_') === 0) {
    throw new Error('لا يمكن حذف سجلات النظام الداخلية.');
  }

  const rootFolder = getRootFolder();
  const rootFolderId = rootFolder.getId();
  const dbState = readDatabaseState(rootFolder, true, true);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];

  // البحث عن السجل في قاعدة البيانات لاستخراج driveFileId فقط إن كان ملفاً مداراً داخل المكتبة
  const remainingFiles = [];
  let matchedManagedDriveRecord = false;
  existingFiles.forEach(f => {
    if (!f) return;
    if (isSystemRecordServer_(f)) {
      remainingFiles.push(f);
      return;
    }
    const isMatch = (targetId && f.id === targetId) ||
                    (driveIdToTrash && f.driveFileId === driveIdToTrash) ||
                    (targetId && f.driveFileId === targetId);
    if (isMatch) {
      if (f.driveFileId || String(f.id || '').indexOf('drive_') === 0) {
        matchedManagedDriveRecord = true;
        if (!driveIdToTrash && f.driveFileId) {
          driveIdToTrash = String(f.driveFileId).trim();
        }
        if (!driveIdToTrash && String(f.id || '').indexOf('drive_') === 0) {
          driveIdToTrash = String(f.id).replace(/^drive_/, '').trim();
        }
      }
    } else {
      remainingFiles.push(f);
    }
  });

  // حماية المجلد الرئيسي وملف قاعدة البيانات والملفات الخارجية من الحذف في Google Drive
  let savedDbFileId = '';
  try { savedDbFileId = PropertiesService.getScriptProperties().getProperty('DB_FILE_ID') || ''; } catch (pe) {}
  const isProtectedId = driveIdToTrash === rootFolderId || driveIdToTrash === CONFIG.ROOT_FOLDER_ID || (savedDbFileId && driveIdToTrash === savedDbFileId);

  let trashedInDrive = false;
  if (driveIdToTrash && !isProtectedId && (matchedManagedDriveRecord || Boolean(payload && payload.driveFileId))) {
    try {
      const file = DriveApp.getFileById(driveIdToTrash);
      if (file && !file.isTrashed() && file.getName() !== CONFIG.DB_FILE_NAME && isFileInsideLibraryRoot_(file, rootFolderId)) {
        const parentFolders = [];
        const pIter = file.getParents();
        while (pIter.hasNext()) {
          parentFolders.push(pIter.next());
        }
        file.setTrashed(true);
        trashedInDrive = true;

        // تنظيف مجلد المحاضرة/السكشن المرقم (المستوى 3 فقط) إذا أصبح فارغاً تماماً — دون المساس أبداً بمجلد المادة أو القسم
        trashEmptyTopicFoldersOnly_(parentFolders, rootFolderId);
      }
    } catch (e) {}
  }

  const existingFolders = Array.isArray(dbState.folders) ? dbState.folders : [];
  const studyRemaining = remainingFiles.filter(rf => rf && !isSystemRecordServer_(rf));
  const remainingFolders = reconcileFoldersListServer_(existingFolders, studyRemaining, existingFolders);

  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: remainingFiles,
    folders: remainingFolders
  });

  return {
    deleted: {
      id: targetId,
      driveFileId: driveIdToTrash,
      trashedInDrive: trashedInDrive
    },
    files: remainingFiles,
    folders: remainingFolders
  };
}

/**
 * ============================================================================
 * 6. دوال مساعدة لإدارة المجلدات والتسمية والتصنيف الذكي
 * ============================================================================
 */

function getRootFolder() {
  try {
    return DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID);
  } catch (e) {
    const iter = DriveApp.getFoldersByName(CONFIG.ROOT_FOLDER_NAME);
    if (iter.hasNext()) return iter.next();
    throw new Error('تعذر الوصول إلى المجلد الرئيسي VET_KSU_33_Library. تأكد من صلاحيات الحساب.');
  }
}

function getOrCreateNumberedTopicFolder(rootFolder, subConfig, categoryName, folderNum) {
  // 1. مجلد المادة
  const rootSubfolders = getSubfoldersList(rootFolder);
  let subjectFolder = findFolderByAliases(rootSubfolders, subConfig.aliases);
  if (!subjectFolder) {
    subjectFolder = rootFolder.createFolder(subConfig.folderName);
  }

  // 2. مجلد القسم (محاضرات أو سكاشن)
  const categoryFolders = getSubfoldersList(subjectFolder);
  const catAliases = categoryName === 'محاضرات'
    ? ['محاضرات', 'المحاضرات', 'محاضره', 'محاضرة', 'lectures']
    : ['سكاشن', 'السكاشن', 'سكشن', 'عملي', 'sections'];

  let catFolder = findFolderByAliases(categoryFolders, catAliases);
  if (!catFolder) {
    catFolder = subjectFolder.createFolder(categoryName);
  }

  // 3. مجلد المحاضرة أو السكشن المرقم أو المدمج (مثلاً: "محاضرة 1" أو "محاضرة 8-10" أو "سكشن 1")
  const numberedFolders = getSubfoldersList(catFolder);
  const targetNum = normalizeFolderNumServer(folderNum) || 1;
  for (let i = 0; i < numberedFolders.length; i++) {
    const rawName = numberedFolders[i].getName();
    const fNum = extractFolderNumber(rawName) || normalizeFolderNumServer(rawName);
    if (String(fNum) === String(targetNum)) {
      return numberedFolders[i];
    }
  }

  const unitSingular = categoryName === 'محاضرات' ? 'محاضرة' : 'سكشن';
  return catFolder.createFolder(unitSingular + ' ' + targetNum);
}

function moveFileToFolderIfNeeded(file, targetFolder) {
  const parents = file.getParents();
  const oldParents = [];
  let alreadyInTarget = false;
  while (parents.hasNext()) {
    const p = parents.next();
    if (p.getId() === targetFolder.getId()) {
      alreadyInTarget = true;
    } else {
      oldParents.push(p);
    }
  }
  if (!alreadyInTarget) {
    file.moveTo(targetFolder);
    return { moved: true, oldParents: oldParents };
  }
  return { moved: false, oldParents: [] };
}

function escapeRegExpServer_(str) {
  return String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildDriveFileName(customTitle, originalFileName, subConfig, categoryName, folderNum, format, ext) {
  const cleanExt = String(ext || 'pdf').replace(/^\.+/, '').replace(/[^a-zA-Z0-9]/g, '') || 'pdf';
  const baseOriginal = stripExtension(originalFileName || '');
  let baseTitle = String(customTitle || '').trim();

  // إزالة العناوين التلقائية العامة إن وجدت
  const genericPattern = new RegExp('^' + escapeRegExpServer_(format) + '\\s*-\\s*' + escapeRegExpServer_(categoryName));
  if (!baseTitle || genericPattern.test(baseTitle)) {
    baseTitle = baseOriginal || ((categoryName === 'محاضرات' ? 'محاضرة ' : 'سكشن ') + folderNum + ' ' + subConfig.folderName + ' ' + format);
  } else {
    baseTitle = stripExtension(baseTitle);
  }

  // تنقية الأحرف غير المناسبة لأسماء الملفات
  baseTitle = baseTitle.replace(/[\\/\0\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!baseTitle) {
    baseTitle = (categoryName === 'محاضرات' ? 'محاضرة ' : 'سكشن ') + folderNum + ' ' + subConfig.folderName;
  }

  // التأكد من تضمين نوع الملف (شرح / تلخيص / خريطة ذهنية) في الاسم ليسهل التعرف عليه في Drive والموقع
  const currentDetected = detectStudyFormat(baseTitle);
  if (format !== 'المصدر' && currentDetected !== format) {
    baseTitle = baseTitle + ' - ' + format;
  }

  return baseTitle + '.' + cleanExt;
}

/**
 * تصنيف صيغة الملف تلقائياً إلى إحدى الصيغ الأربع المعتمدة في الموقع:
 * 'المصدر' | 'شرح' | 'تلخيص' | 'خريطه ذهنية'
 */
function detectStudyFormat(fileName) {
  const norm = normalizeArabic(fileName);
  if (
    norm.indexOf('خريط') !== -1 ||
    norm.indexOf('خرائط') !== -1 ||
    norm.indexOf('خرايط') !== -1 ||
    norm.indexOf('ذهني') !== -1 ||
    norm.indexOf('زهني') !== -1 ||
    /\bmind\s*map\b/.test(norm) ||
    /\bmindmap\b/.test(norm) ||
    /\bmind\b/.test(norm)
  ) {
    return 'خريطه ذهنية';
  }
  if (
    /تلخي+ص/.test(norm) ||
    norm.indexOf('ملخص') !== -1 ||
    norm.indexOf('مختصر') !== -1 ||
    /\bsummary\b/.test(norm)
  ) {
    return 'تلخيص';
  }
  if (
    norm.indexOf('شرح') !== -1 ||
    norm.indexOf('تفصيلي') !== -1 ||
    /\b(?:explanation|explain)\b/.test(norm)
  ) {
    return 'شرح';
  }
  return 'المصدر';
}

function hashAdminPasscodeServer(inputStr) {
  const salted = 'vet_ksu_33_salt_2027::' + String(inputStr || '').trim().toLowerCase() + '::seniors';
  let h1 = 0x811c9dc5;
  let h2 = 5381;
  for (let i = 0; i < salted.length; i++) {
    const c = salted.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193) >>> 0;
    h2 = ((Math.imul(h2, 33) + c) >>> 0);
  }
  return ('00000000' + h1.toString(16)).slice(-8) + ('00000000' + h2.toString(16)).slice(-8);
}

function verifyAdminPasscodeServer(passcode) {
  const clean = String(passcode || '').trim().toLowerCase();
  if (!clean) return false;
  if (CONFIG.ADMIN_HASHES && CONFIG.ADMIN_HASHES.indexOf(clean) !== -1) return true;
  const computedHash = hashAdminPasscodeServer(clean);
  if (CONFIG.ADMIN_HASHES && CONFIG.ADMIN_HASHES.indexOf(computedHash) !== -1) return true;
  return false;
}

function verifyAdminAuthPayload(payload) {
  if (!payload || typeof payload !== 'object') return false;
  const candidate = payload.adminToken ||
    payload.passcode ||
    (payload.file && payload.file.adminToken) ||
    (payload.item && payload.item.adminToken) ||
    '';
  return verifyAdminPasscodeServer(candidate);
}

function handleIncrementDownloadCount(targetId) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder, true, true);
  const files = Array.isArray(dbState.files) ? dbState.files : [];
  const cleanId = String(targetId || '').trim();
  let found = false;
  if (cleanId && cleanId.indexOf('_sys_') !== 0) {
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f || isSystemRecordServer_(f)) continue;
      if (f.id === cleanId || f.driveFileId === cleanId) {
        const nextCount = Math.max(Number(f.downloads) || 0, Number(f.downloadsCount) || 0) + 1;
        f.downloads = nextCount;
        f.downloadsCount = nextCount;
        found = true;
        break;
      }
    }
    if (found) {
      writeDatabaseState(rootFolder, {
        ok: true,
        updatedAt: new Date().toISOString(),
        files: files,
        folders: dbState.folders || []
      });
    }
  }
  return {
    files: files,
    folders: dbState.folders || []
  };
}

function getSubjectConfigById(subId) {
  const raw = String(subId || '').trim();
  for (let i = 0; i < SUBJECTS_CONFIG.length; i++) {
    if (SUBJECTS_CONFIG[i].id === raw) return SUBJECTS_CONFIG[i];
  }
  const norm = normalizeArabic(raw);
  if (norm) {
    for (let i = 0; i < SUBJECTS_CONFIG.length; i++) {
      const aliases = SUBJECTS_CONFIG[i].aliases || [];
      for (let j = 0; j < aliases.length; j++) {
        if (normalizeArabic(aliases[j]) === norm) {
          return SUBJECTS_CONFIG[i];
        }
      }
    }
  }
  return SUBJECTS_CONFIG[0];
}

function getSubfoldersList(parentFolder) {
  const list = [];
  const iter = parentFolder.getFolders();
  while (iter.hasNext()) {
    const f = iter.next();
    if (!f.isTrashed()) list.push(f);
  }
  return list;
}

function getFilesList(parentFolder) {
  const list = [];
  const iter = parentFolder.getFiles();
  while (iter.hasNext()) {
    const f = iter.next();
    if (!f.isTrashed() && f.getName() !== CONFIG.DB_FILE_NAME) {
      list.push(f);
    }
  }
  return list;
}

function findFolderByAliases(foldersList, aliases) {
  const normAliases = (aliases || []).map(a => normalizeArabic(a)).filter(Boolean);

  // تطابق تام أولاً
  for (let i = 0; i < foldersList.length; i++) {
    const fNameNorm = normalizeArabic(foldersList[i].getName());
    if (!fNameNorm) continue;
    if (normAliases.indexOf(fNameNorm) !== -1) {
      return foldersList[i];
    }
  }

  // تطابق جزئي ثانياً (مع منع المطابقات الخاطئة لأسماء مجلدات قصيرة جداً أو فارغة)
  for (let i = 0; i < foldersList.length; i++) {
    const fNameNorm = normalizeArabic(foldersList[i].getName());
    if (!fNameNorm) continue;
    for (let j = 0; j < normAliases.length; j++) {
      const alias = normAliases[j];
      if (fNameNorm.indexOf(alias) !== -1) {
        return foldersList[i];
      }
      if (fNameNorm.length >= 3 && alias.indexOf(fNameNorm) !== -1) {
        return foldersList[i];
      }
    }
  }
  return null;
}

function normalizeArabic(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeFolderNumServer(val) {
  if (val === null || val === undefined) return null;
  const s0 = String(val)
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .trim();
  let s = s0.replace(/^(?:ال)?(?:محاضرات|محاضرة|محاضره|سكاشن|سكشن|مجلد|عملي|lectures?|sections?|lec\.?|sec\.?)\s*(?:رقم\s*)?/i, '').trim();
  s = s.replace(/(\d+)\s*[-–—]\s*(?=\d)/g, '$1-');
  if (!s) return null;
  if (/^\d+$/.test(s)) {
    const n = parseInt(s, 10);
    return n >= 1 ? n : s;
  }
  return s;
}

function compareFolderNumsServer(a, b) {
  const sa = String(normalizeFolderNumServer(a) || '');
  const sb = String(normalizeFolderNumServer(b) || '');
  const ma = sa.match(/(\d+)/);
  const mb = sb.match(/(\d+)/);
  const na = ma ? parseInt(ma[1], 10) : 999999;
  const nb = mb ? parseInt(mb[1], 10) : 999999;
  if (na !== nb) return na - nb;
  try {
    return sa.localeCompare(sb, 'ar', { numeric: true });
  } catch (e) {
    return sa.localeCompare(sb, 'ar');
  }
}

function extractFolderNumber(str) {
  const s = String(str || '')
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .trim();
  if (!s) return null;
  // أولوية للرقم أو النطاق المسبوق بكلمة محاضرة/سكشن حتى لا يلتقط تواريخ مثل 2026-11-19
  const labeledMatch = s.match(/(?:ال)?(?:محاضرات|محاضرة|محاضره|سكاشن|سكشن|مجلد|عملي|lectures?|sections?|lec\.?|sec\.?)\s*(?:رقم\s*)?(\d{1,3}(?:\s*(?:[-–—+,،/&]|و|إلى|الى)\s*\d{1,3})*)/i);
  if (labeledMatch && labeledMatch[1]) {
    const numVal = normalizeFolderNumServer(labeledMatch[1]);
    if (numVal !== null && numVal !== '0') return numVal;
  }
  // دعم المحاضرات المدمجة مثل 8-10 أو 8 و 9 أو 8،9 (مع تجنب التواريخ الرباعية YYYY-MM-DD)
  const rangeMatch = s.match(/(?:^|[^\d])(\d{1,3}\s*(?:[-–—+,،/&]|و|إلى|الى)\s*\d{1,3}(?:\s*(?:[-–—+,،/&]|و|إلى|الى)\s*\d{1,3})*)(?=$|[^\d])/);
  if (rangeMatch && rangeMatch[1]) {
    const rangeVal = normalizeFolderNumServer(rangeMatch[1]);
    if (rangeVal !== null && rangeVal !== '0') return rangeVal;
  }
  const m = s.match(/(\d+)/);
  if (m && m[1]) {
    const parsed = parseInt(m[1], 10);
    return parsed >= 1 ? parsed : null;
  }
  return null;
}

function stripExtension(fileName) {
  const s = String(fileName || '').trim();
  return s.replace(/^(.+?)\.([a-zA-Z][a-zA-Z0-9]{0,5}|7z)$/, '$1').trim();
}

function getFileExtension(fileName) {
  const s = String(fileName || '').trim();
  const m = s.match(/^.+?\.([a-zA-Z][a-zA-Z0-9]{0,5}|7z)$/);
  return m ? m[1].toLowerCase() : '';
}

function formatBytes(bytes) {
  const b = Number(bytes) || 0;
  if (b <= 0) return '0 KB';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(sizes.length - 1, Math.max(0, Math.floor(Math.log(b) / Math.log(k))));
  return parseFloat((b / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function extractDriveIdFromRecord(rec) {
  if (!rec) return '';
  if (rec.driveFileId) return String(rec.driveFileId);
  if (rec.id && String(rec.id).indexOf('drive_') === 0) {
    return String(rec.id).replace(/^drive_/, '');
  }
  const url = rec.fileUrl || rec.driveUrl || rec.externalUrl || rec.downloadUrl || '';
  const m1 = String(url).match(/\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]{10,})/);
  if (m1 && m1[1]) return m1[1];
  const m2 = String(url).match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (m2 && m2[1]) return m2[1];
  return '';
}

function splitStringByUtf8BytesServer_(str, maxBytes) {
  const s = String(str || '');
  const limit = maxBytes || CONFIG.CACHE_CHUNK_BYTES || 85000;
  const chunks = [];
  let start = 0;
  let byteCount = 0;

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    let charBytes = 1;
    let step = 1;

    if (code <= 0x7F) {
      charBytes = 1;
    } else if (code <= 0x7FF) {
      charBytes = 2;
    } else if (code >= 0xD800 && code <= 0xDBFF && (i + 1) < s.length) {
      const next = s.charCodeAt(i + 1);
      if (next >= 0xDC00 && next <= 0xDFFF) {
        charBytes = 4;
        step = 2;
      } else {
        charBytes = 3;
      }
    } else {
      charBytes = 3;
    }

    if (byteCount + charBytes > limit && i > start) {
      chunks.push(s.slice(start, i));
      start = i;
      byteCount = 0;
    }
    byteCount += charBytes;
    if (step === 2) i++;
  }

  if (start < s.length) {
    chunks.push(s.slice(start));
  }
  return chunks;
}

function invalidateDbMemoryCache_() {
  try {
    CacheService.getScriptCache().remove('VET33_DB_META_V2');
  } catch (e) {}
}

function readDbFromMemoryCache() {
  try {
    const cache = CacheService.getScriptCache();
    const metaStr = cache.get('VET33_DB_META_V2');
    if (!metaStr) return null;
    const meta = JSON.parse(metaStr);
    const count = Number(meta && meta.chunks) || 0;
    const ver = (meta && typeof meta.ver === 'string') ? meta.ver : '';
    if (count <= 0 || count > (CONFIG.CACHE_MAX_CHUNKS || 40)) return null;
    const keyPrefix = ver ? ('VET33_DB_C_' + ver + '_') : 'VET33_DB_CHUNK_';
    const keys = [];
    for (let i = 0; i < count; i++) {
      keys.push(keyPrefix + i);
    }
    const map = cache.getAll(keys);
    let raw = '';
    for (let i = 0; i < count; i++) {
      const part = map[keyPrefix + i];
      if (typeof part !== 'string') return null;
      raw += part;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        files: Array.isArray(parsed.files) ? parsed.files : [],
        folders: Array.isArray(parsed.folders) ? parsed.folders : []
      };
    }
  } catch (e) {}
  return null;
}

function writeDbToMemoryCache(jsonStr) {
  try {
    if (!jsonStr) {
      invalidateDbMemoryCache_();
      return false;
    }
    const cache = CacheService.getScriptCache();
    const maxBytes = CONFIG.CACHE_CHUNK_BYTES || 85000;
    const maxChunks = CONFIG.CACHE_MAX_CHUNKS || 40;
    const chunks = splitStringByUtf8BytesServer_(jsonStr, maxBytes);
    if (chunks.length === 0 || chunks.length > maxChunks) {
      // إبطال الكاش القديم فوراً إذا تجاوز حجم قاعدة البيانات الحد المسموح حتى لا تُعرض بيانات قديمة
      invalidateDbMemoryCache_();
      return false;
    }

    const ttl = CONFIG.CACHE_TTL_SEC || 21600;
    const ver = Date.now().toString(36) + '_' + Math.floor(Math.random() * 1e6).toString(36);
    const chunkPayload = {};
    for (let i = 0; i < chunks.length; i++) {
      chunkPayload['VET33_DB_C_' + ver + '_' + i] = chunks[i];
    }
    // كتابة الأجزاء المرَقّمة أولاً ثم تحديث مؤشر النسخة ذرياً لمنع القراءة المختلطة (torn reads)
    cache.putAll(chunkPayload, ttl);
    cache.put('VET33_DB_META_V2', JSON.stringify({
      ver: ver,
      chunks: chunks.length,
      updatedAt: Date.now()
    }), ttl);
    return true;
  } catch (e) {
    invalidateDbMemoryCache_();
    return false;
  }
}

function healDatabaseRecordsInPlace(filesArr) {
  if (!Array.isArray(filesArr)) return filesArr;
  filesArr.forEach(rf => {
    if (!rf || isSystemRecordServer_(rf)) return;
    if (rf.format === 'خريطة ذهنية' || rf.format === 'خريطه ذهنيه' || rf.format === 'خريطة ذهنيه') {
      rf.format = 'خريطه ذهنية';
    }
    if (rf.explicitAdminFormat) return;
    const checkName = String(rf.originalFileName || rf.title || '');
    const normName = normalizeArabic(checkName);
    const detected = detectStudyFormat(checkName);
    if (rf.format === 'المصدر' && detected !== 'المصدر' && normName.indexOf('تفريغ') === -1 && normName.indexOf('مصدر') === -1) {
      rf.format = detected;
      rf.adminFormat = detected;
    }
  });
  return filesArr;
}

function readDatabaseState(rootFolder, skipMemoryCache, strictDriveRead) {
  if (!skipMemoryCache) {
    const memCached = readDbFromMemoryCache();
    if (memCached && Array.isArray(memCached.files) && memCached.files.length > 0) {
      healDatabaseRecordsInPlace(memCached.files);
      return memCached;
    }
  }
  try {
    const props = PropertiesService.getScriptProperties();
    const savedDbFileId = props.getProperty('DB_FILE_ID') || '';
    let dbFile = null;

    if (savedDbFileId) {
      try {
        const directFile = DriveApp.getFileById(savedDbFileId);
        if (directFile && !directFile.isTrashed()) {
          dbFile = directFile;
        }
      } catch (idErr) {
        dbFile = null;
      }
    }

    if (!dbFile) {
      const folder = rootFolder || getRootFolder();
      const iter = folder.getFilesByName(CONFIG.DB_FILE_NAME);
      while (iter.hasNext()) {
        const cand = iter.next();
        if (!cand.isTrashed()) {
          dbFile = cand;
          try { props.setProperty('DB_FILE_ID', cand.getId()); } catch (pe) {}
          break;
        }
      }
    }

    if (!dbFile) {
      return { files: [], folders: [] };
    }

    const raw = dbFile.getBlob().getDataAsString('UTF-8');
    if (!raw || !raw.trim()) {
      return { files: [], folders: [] };
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      healDatabaseRecordsInPlace(parsed);
      writeDbToMemoryCache(JSON.stringify({ ok: true, files: parsed, folders: [] }));
      return { files: parsed, folders: [] };
    }
    if (parsed && typeof parsed === 'object') {
      const filesList = Array.isArray(parsed.files) ? healDatabaseRecordsInPlace(parsed.files) : [];
      const foldersList = Array.isArray(parsed.folders) ? parsed.folders : [];
      writeDbToMemoryCache(JSON.stringify({ ok: true, files: filesList, folders: foldersList }));
      return {
        files: filesList,
        folders: foldersList
      };
    }

    if (strictDriveRead) {
      throw new Error('بنية ملف قاعدة البيانات vet_ksu_33_db.json غير صالحة.');
    }
  } catch (e) {
    if (strictDriveRead) {
      throw new Error('تعذر قراءة ملف قاعدة البيانات من Google Drive بأمان: ' + e.toString());
    }
  }
  return { files: [], folders: [] };
}

function writeDatabaseState(rootFolder, stateObj) {
  if (stateObj && Array.isArray(stateObj.files)) {
    healDatabaseRecordsInPlace(stateObj.files);
  }
  const prettyJsonStr = JSON.stringify(stateObj, null, 2);
  const compactCacheJson = JSON.stringify({
    ok: true,
    files: (stateObj && Array.isArray(stateObj.files)) ? stateObj.files : [],
    folders: (stateObj && Array.isArray(stateObj.folders)) ? stateObj.folders : []
  });

  const props = PropertiesService.getScriptProperties();
  const savedDbFileId = props.getProperty('DB_FILE_ID') || '';
  let wroteToDrive = false;

  if (savedDbFileId) {
    try {
      const directFile = DriveApp.getFileById(savedDbFileId);
      if (directFile && !directFile.isTrashed()) {
        directFile.setContent(prettyJsonStr);
        wroteToDrive = true;
      }
    } catch (e) {}
  }

  if (!wroteToDrive) {
    const folder = rootFolder || getRootFolder();
    const iter = folder.getFilesByName(CONFIG.DB_FILE_NAME);
    let primaryFile = null;
    const duplicates = [];
    while (iter.hasNext()) {
      const cand = iter.next();
      if (cand.isTrashed()) continue;
      if (!primaryFile) {
        primaryFile = cand;
      } else {
        duplicates.push(cand);
      }
    }

    if (primaryFile) {
      primaryFile.setContent(prettyJsonStr);
      try { props.setProperty('DB_FILE_ID', primaryFile.getId()); } catch (pe) {}
      duplicates.forEach(dup => {
        try { dup.setTrashed(true); } catch (de) {}
      });
    } else {
      const created = folder.createFile(CONFIG.DB_FILE_NAME, prettyJsonStr, MimeType.PLAIN_TEXT);
      try { props.setProperty('DB_FILE_ID', created.getId()); } catch (pe) {}
    }
  }

  // تحديث الذاكرة السريعة بالصيغة المضغوطة فقط بعد نجاح الكتابة الفعلية إلى Google Drive
  writeDbToMemoryCache(compactCacheJson);
}

function isValidPushEndpointServer_(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length < 12 || trimmed.length > 2048) return false;
  return /^https:\/\/[^\s"'<>]+$/i.test(trimmed);
}

function sanitizePushKeysServer_(incomingKeys, existingKeys) {
  const result = {};
  const prev = (existingKeys && typeof existingKeys === 'object') ? existingKeys : {};
  const inc = (incomingKeys && typeof incomingKeys === 'object') ? incomingKeys : {};
  const p256dh = (typeof inc.p256dh === 'string' && inc.p256dh.trim()) ? inc.p256dh.trim().slice(0, 512) : (typeof prev.p256dh === 'string' ? prev.p256dh : '');
  const auth = (typeof inc.auth === 'string' && inc.auth.trim()) ? inc.auth.trim().slice(0, 512) : (typeof prev.auth === 'string' ? prev.auth : '');
  if (p256dh) result.p256dh = p256dh;
  if (auth) result.auth = auth;
  return result;
}

function saveSystemMetaRecord(sysItem) {
  if (!sysItem || typeof sysItem !== 'object' || !sysItem.id || typeof sysItem.id !== 'string') {
    throw new Error('معرف سجل النظام غير صالح.');
  }
  const cleanSysId = sysItem.id.trim();
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder, true, true);
  const files = Array.isArray(dbState.files) ? dbState.files : [];
  const prevRec = files.find(f => f && f.id === cleanSysId);
  const filtered = files.filter(f => f && f.id !== cleanSysId);

  let recordToSave = null;

  if (cleanSysId === CONFIG.SYS_PUSH_SUBS_ID) {
    const prevSubs = (prevRec && Array.isArray(prevRec.subs)) ? prevRec.subs : [];
    const incomingSubs = Array.isArray(sysItem.subs) ? sysItem.subs : [];
    const byEndpoint = {};
    prevSubs.concat(incomingSubs).forEach(s => {
      if (!s || !isValidPushEndpointServer_(s.endpoint)) return;
      const ep = s.endpoint.trim();
      const prevEntry = byEndpoint[ep];
      const ts = Number(s.updatedAt);
      const validTs = (isFinite(ts) && ts > 0) ? ts : Date.now();
      byEndpoint[ep] = {
        endpoint: ep,
        keys: sanitizePushKeysServer_(s.keys, prevEntry && prevEntry.keys),
        updatedAt: prevEntry ? Math.max(prevEntry.updatedAt || 0, validTs) : validTs
      };
    });
    const mergedSubs = Object.keys(byEndpoint)
      .map(k => byEndpoint[k])
      .sort((a, b) => (a.updatedAt || 0) - (b.updatedAt || 0))
      .slice(-500);
    recordToSave = {
      id: CONFIG.SYS_PUSH_SUBS_ID,
      isSystemMeta: true,
      title: 'System Push Subscriptions',
      subs: mergedSubs
    };
  } else if (cleanSysId === CONFIG.SYS_ABOUT_CONTENT_ID) {
    if (!sysItem.aboutContent || typeof sysItem.aboutContent !== 'object' || Array.isArray(sysItem.aboutContent)) {
      throw new Error('محتوى قسم About المرسل غير صالح.');
    }
    const prevAbout = (prevRec && prevRec.aboutContent && typeof prevRec.aboutContent === 'object') ? prevRec.aboutContent : {};
    const sanitizedAbout = Object.assign({}, prevAbout);
    Object.keys(sysItem.aboutContent).forEach(k => {
      if (typeof sysItem.aboutContent[k] === 'string') {
        sanitizedAbout[k] = sysItem.aboutContent[k].slice(0, 4000);
      }
    });
    recordToSave = {
      id: CONFIG.SYS_ABOUT_CONTENT_ID,
      isSystemMeta: true,
      title: 'System About Content',
      aboutContent: sanitizedAbout
    };
  } else {
    recordToSave = Object.assign({}, prevRec || {}, sysItem, {
      id: cleanSysId,
      isSystemMeta: true
    });
    delete recordToSave.adminToken;
    delete recordToSave.passcode;
  }

  filtered.push(recordToSave);
  const newState = {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: filtered,
    folders: dbState.folders || []
  };
  writeDatabaseState(rootFolder, newState);
  return newState;
}

/**
 * توقيع VAPID JWT (ES256 / P-256) مباشرة داخل الخادم لحماية المفتاح الخاص من الظهور في الواجهة الأمامية
 */
function extractPushOriginServer_(endpointUrl) {
  const m = String(endpointUrl || '').trim().match(/^(https:\/\/[^\/?#\s]+)/i);
  return m ? m[1].toLowerCase() : '';
}

function createServerVapidHeaders(endpointUrl) {
  try {
    const aud = extractPushOriginServer_(endpointUrl);
    if (!aud) return null;
    const exp = Math.floor(Date.now() / 1000) + (12 * 3600);
    const headerJson = JSON.stringify({ typ: 'JWT', alg: 'ES256' });
    const payloadJson = JSON.stringify({ aud: aud, exp: exp, sub: 'mailto:vetksu33@gmail.com' });
    const headerB64 = Utilities.base64EncodeWebSafe(Utilities.newBlob(headerJson, 'application/json').getBytes()).replace(/=+$/, '');
    const payloadB64 = Utilities.base64EncodeWebSafe(Utilities.newBlob(payloadJson, 'application/json').getBytes()).replace(/=+$/, '');
    const unsignedToken = headerB64 + '.' + payloadB64;

    const sigB64 = signP256EcdsaJwtServer(unsignedToken, CONFIG.VAPID_PRIVATE_D_B64URL);
    if (!sigB64) return null;
    const jwt = unsignedToken + '.' + sigB64;
    return {
      vapid: 'vapid t=' + jwt + ', k=' + CONFIG.VAPID_PUBLIC_KEY,
      webPush: 'WebPush ' + jwt,
      cryptoKey: 'p256ecdsa=' + CONFIG.VAPID_PUBLIC_KEY
    };
  } catch (e) {
    return null;
  }
}

function bytesToHexServer(bytes) {
  return bytes.map(function(b) {
    return ('0' + ((b & 0xFF).toString(16))).slice(-2);
  }).join('');
}

function hexToBytesServer(hex) {
  let cleanHex = String(hex || '').trim();
  if (cleanHex.length % 2 !== 0) {
    cleanHex = '0' + cleanHex;
  }
  const bytes = [];
  for (let i = 0; i < cleanHex.length; i += 2) {
    const v = parseInt(cleanHex.substr(i, 2), 16);
    bytes.push(v > 127 ? v - 256 : v);
  }
  return bytes;
}

function padBase64UrlServer_(b64url) {
  const s = String(b64url || '').trim().replace(/=+$/, '');
  const pad = (4 - (s.length % 4)) % 4;
  return s + (pad === 1 ? '=' : (pad === 2 ? '==' : (pad === 3 ? '===' : '')));
}

function signP256EcdsaJwtServer(unsignedToken, dB64Url) {
  const ZERO = BigInt(0);
  const ONE = BigInt(1);
  const TWO = BigInt(2);
  const THREE = BigInt(3);
  const P = BigInt('0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff');
  const N = BigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551');
  const A = P - THREE;
  const Gx = BigInt('0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296');
  const Gy = BigInt('0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5');

  function mod(a, m) {
    const r = a % m;
    return r >= ZERO ? r : r + m;
  }
  function modInv(a, m) {
    let t = ZERO, newT = ONE;
    let r = m, newR = mod(a, m);
    while (newR !== ZERO) {
      const q = r / newR;
      const tmpT = t - q * newT; t = newT; newT = tmpT;
      const tmpR = r - q * newR; r = newR; newR = tmpR;
    }
    if (r !== ONE) {
      throw new Error('Modular inverse does not exist');
    }
    return mod(t, m);
  }
  function ptAdd(p1, p2) {
    if (!p1) return p2;
    if (!p2) return p1;
    const x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
    if (x1 === x2) {
      if (mod(y1 + y2, P) === ZERO || mod(TWO * y1, P) === ZERO) return null;
      const lam = mod((THREE * x1 * x1 + A) * modInv(TWO * y1, P), P);
      const x3 = mod(lam * lam - TWO * x1, P);
      return [x3, mod(lam * (x1 - x3) - y1, P)];
    }
    const lam = mod((y2 - y1) * modInv(x2 - x1, P), P);
    const x3 = mod(lam * lam - x1 - x2, P);
    return [x3, mod(lam * (x1 - x3) - y1, P)];
  }
  function ptMul(k) {
    let res = null, addend = [Gx, Gy], n = k;
    while (n > ZERO) {
      if ((n & ONE) === ONE) res = ptAdd(res, addend);
      addend = ptAdd(addend, addend);
      n = n >> ONE;
    }
    return res;
  }

  const dBytes = Utilities.base64DecodeWebSafe(padBase64UrlServer_(dB64Url));
  if (!dBytes || dBytes.length === 0) return null;
  const d = BigInt('0x' + bytesToHexServer(dBytes));
  if (d <= ZERO || d >= N) return null;

  const tokenCharset = (Utilities.Charset && Utilities.Charset.UTF_8) ? Utilities.Charset.UTF_8 : undefined;
  const zBytes = tokenCharset
    ? Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(unsignedToken || ''), tokenCharset)
    : Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(unsignedToken || ''));
  const z = BigInt('0x' + bytesToHexServer(zBytes));

  // توليد nonce حتمي مطابق لمعيار RFC 6979 القسم 3.2 (HMAC-SHA256) مع إعادة المحاولة عند r === 0 أو s === 0
  const xOctets = hexToBytesServer(d.toString(16).padStart(64, '0'));
  const h1Octets = hexToBytesServer(mod(z, N).toString(16).padStart(64, '0'));
  let V = [];
  let K = [];
  for (let i = 0; i < 32; i++) {
    V.push(1);
    K.push(0);
  }
  K = Utilities.computeHmacSha256Signature(V.concat([0], xOctets, h1Octets), K);
  V = Utilities.computeHmacSha256Signature(V, K);
  K = Utilities.computeHmacSha256Signature(V.concat([1], xOctets, h1Octets), K);
  V = Utilities.computeHmacSha256Signature(V, K);

  for (let attempt = 0; attempt < 100; attempt++) {
    V = Utilities.computeHmacSha256Signature(V, K);
    const k = BigInt('0x' + bytesToHexServer(V));
    if (k >= ONE && k < N) {
      const pt = ptMul(k);
      if (pt) {
        const r = mod(pt[0], N);
        if (r !== ZERO) {
          const s = mod(modInv(k, N) * (z + r * d), N);
          if (s !== ZERO) {
            const sigHex = r.toString(16).padStart(64, '0') + s.toString(16).padStart(64, '0');
            return Utilities.base64EncodeWebSafe(hexToBytesServer(sigHex)).replace(/=+$/, '');
          }
        }
      }
    }
    K = Utilities.computeHmacSha256Signature(V.concat([0]), K);
    V = Utilities.computeHmacSha256Signature(V, K);
  }
  return null;
}

function executeFetchAllChunkedServer_(requests, chunkSize) {
  const size = chunkSize || 50;
  const allResponses = [];
  for (let offset = 0; offset < requests.length; offset += size) {
    const batch = requests.slice(offset, offset + size);
    let batchResponses;
    try {
      batchResponses = UrlFetchApp.fetchAll(batch);
    } catch (batchErr) {
      batchResponses = batch.map(req => {
        try { return UrlFetchApp.fetch(req.url, req); } catch (e) { return null; }
      });
    }
    for (let i = 0; i < batchResponses.length; i++) {
      allResponses.push(batchResponses[i]);
    }
  }
  return allResponses;
}

function handlePushWakeup(targets) {
  let effectiveTargets = Array.isArray(targets) ? targets : [];
  // دمج الأهداف المرسلة مع الاشتراكات المحفوظة في قاعدة البيانات لضمان عدم تفويت أي هاتف مشترك
  try {
    const rootFolder = getRootFolder();
    const dbState = readDatabaseState(rootFolder, false);
    const sysSub = (dbState.files || []).find(f => f && f.id === CONFIG.SYS_PUSH_SUBS_ID);
    if (sysSub && Array.isArray(sysSub.subs)) {
      const byEp = {};
      sysSub.subs.forEach(s => {
        if (s && isValidPushEndpointServer_(s.endpoint)) {
          byEp[s.endpoint.trim()] = s;
        }
      });
      effectiveTargets.forEach(t => {
        if (t && isValidPushEndpointServer_(t.endpoint)) {
          const ep = t.endpoint.trim();
          byEp[ep] = Object.assign({}, byEp[ep] || {}, t, { endpoint: ep });
        }
      });
      effectiveTargets = Object.keys(byEp).map(k => byEp[k]);
    } else {
      effectiveTargets = effectiveTargets.filter(t => t && isValidPushEndpointServer_(t.endpoint));
    }
  } catch (e) {
    effectiveTargets = effectiveTargets.filter(t => t && isValidPushEndpointServer_(t.endpoint));
  }

  if (effectiveTargets.length === 0) {
    return { pushedCount: 0, removedExpiredCount: 0, expiredEndpoints: [] };
  }

  let successCount = 0;
  const expiredEndpoints = [];
  const preparedTargets = [];
  const batchRequests1 = [];
  // تخزين ترويسات VAPID مؤقتاً لكل مضيف (origin) خلال نفس الدفعة لتسريع الإرسال وتجنب تكرار التوقيع لمئات الهواتف
  const vapidHeadersByOrigin = {};

  effectiveTargets.forEach(t => {
    if (!t || !isValidPushEndpointServer_(t.endpoint)) return;
    const ep = t.endpoint.trim();
    let signedHdrs = null;
    if (!t.authorization && !t.webPushAuth) {
      const origin = extractPushOriginServer_(ep);
      if (!origin) return;
      if (!Object.prototype.hasOwnProperty.call(vapidHeadersByOrigin, origin)) {
        vapidHeadersByOrigin[origin] = createServerVapidHeaders(origin);
      }
      signedHdrs = vapidHeadersByOrigin[origin];
    }

    const vapidAuth = t.authorization || (signedHdrs ? signedHdrs.vapid : '');
    const webPushAuth = t.webPushAuth || (signedHdrs ? signedHdrs.webPush : '');
    const cryptoKey = t.cryptoKey || (signedHdrs ? signedHdrs.cryptoKey : '');
    if (!vapidAuth && !webPushAuth) return;

    const isLegacyFcm = ep.indexOf('/fcm/send/') !== -1;

    const headers1 = {
      'TTL': '86400',
      'Urgency': 'high'
    };
    if (isLegacyFcm && webPushAuth && cryptoKey) {
      headers1['Authorization'] = webPushAuth;
      headers1['Crypto-Key'] = cryptoKey;
    } else if (vapidAuth) {
      headers1['Authorization'] = vapidAuth;
    } else if (webPushAuth) {
      headers1['Authorization'] = webPushAuth;
      if (cryptoKey) headers1['Crypto-Key'] = cryptoKey;
    }

    preparedTargets.push({
      endpoint: ep,
      vapidAuth: vapidAuth,
      webPushAuth: webPushAuth,
      cryptoKey: cryptoKey,
      usedLegacyFirst: Boolean(isLegacyFcm && webPushAuth && cryptoKey)
    });

    batchRequests1.push({
      url: ep,
      method: 'post',
      headers: headers1,
      payload: '',
      muteHttpExceptions: true
    });
  });

  if (batchRequests1.length === 0) {
    return { pushedCount: 0, removedExpiredCount: 0, expiredEndpoints: [] };
  }

  // إرسال الدفعة الأولى بالتوازي على دفعات آمنة (50 طلباً في كل دفعة)
  const responses1 = executeFetchAllChunkedServer_(batchRequests1, 50);

  const retryTargets = [];
  const retryRequests = [];

  for (let i = 0; i < preparedTargets.length; i++) {
    const pt = preparedTargets[i];
    const res = responses1[i];
    const code = res ? res.getResponseCode() : 0;

    if (code >= 200 && code < 300) {
      successCount++;
    } else if (code === 404 || code === 410) {
      if (expiredEndpoints.indexOf(pt.endpoint) === -1) {
        expiredEndpoints.push(pt.endpoint);
      }
    } else {
      // تجهيز محاولة بديلة فورية بالصيغة الثانية لترويسة VAPID
      const altHeaders = {
        'TTL': '86400',
        'Urgency': 'high'
      };
      if (pt.usedLegacyFirst && pt.vapidAuth) {
        altHeaders['Authorization'] = pt.vapidAuth;
        retryTargets.push(pt);
        retryRequests.push({
          url: pt.endpoint,
          method: 'post',
          headers: altHeaders,
          payload: '',
          muteHttpExceptions: true
        });
      } else if (!pt.usedLegacyFirst && pt.webPushAuth && pt.cryptoKey) {
        altHeaders['Authorization'] = pt.webPushAuth;
        altHeaders['Crypto-Key'] = pt.cryptoKey;
        retryTargets.push(pt);
        retryRequests.push({
          url: pt.endpoint,
          method: 'post',
          headers: altHeaders,
          payload: '',
          muteHttpExceptions: true
        });
      }
    }
  }

  if (retryRequests.length > 0) {
    const responses2 = executeFetchAllChunkedServer_(retryRequests, 50);
    for (let j = 0; j < retryTargets.length; j++) {
      const r2 = responses2[j];
      const c2 = r2 ? r2.getResponseCode() : 0;
      if (c2 >= 200 && c2 < 300) {
        successCount++;
      } else if (c2 === 404 || c2 === 410) {
        if (expiredEndpoints.indexOf(retryTargets[j].endpoint) === -1) {
          expiredEndpoints.push(retryTargets[j].endpoint);
        }
      }
    }
  }

  // حذف الاشتراكات المنتهية الصلاحية (404 أو 410 Gone) من سجل _sys_push_subs_v1 باستخدام قفل السكربت لمنع التضارب
  let actualRemovedCount = 0;
  if (expiredEndpoints.length > 0) {
    const cleanLock = LockService.getScriptLock();
    if (cleanLock.tryLock(15000)) {
      try {
        const rootFolder = getRootFolder();
        const dbState = readDatabaseState(rootFolder, true, true);
        const files = Array.isArray(dbState.files) ? dbState.files : [];
        let changed = false;

        for (let i = 0; i < files.length; i++) {
          const rec = files[i];
          if (rec && rec.id === CONFIG.SYS_PUSH_SUBS_ID && Array.isArray(rec.subs)) {
            const beforeLen = rec.subs.length;
            rec.subs = rec.subs.filter(s => s && s.endpoint && expiredEndpoints.indexOf(s.endpoint) === -1);
            if (rec.subs.length !== beforeLen) {
              actualRemovedCount += (beforeLen - rec.subs.length);
              changed = true;
            }
          }
        }

        if (changed) {
          writeDatabaseState(rootFolder, {
            ok: true,
            updatedAt: new Date().toISOString(),
            files: files,
            folders: dbState.folders || []
          });
        }
      } catch (cleanErr) {
      } finally {
        try { cleanLock.releaseLock(); } catch (le) {}
      }
    }
  }

  return {
    pushedCount: successCount,
    removedExpiredCount: actualRemovedCount,
    expiredEndpoints: expiredEndpoints
  };
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * شغل هذه الدالة مرة واحدة فقط من محرر Google Apps Script لتفعيل المزامنة الخلفية التلقائية كل 5 دقائق
 */
function setupAutoSyncTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'syncDriveWithDatabase') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('syncDriveWithDatabase')
    .timeBased()
    .everyMinutes(5)
    .create();
}