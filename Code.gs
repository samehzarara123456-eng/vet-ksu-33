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
  CACHE_CHUNK_SIZE: 85000,
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
    aliases: ['توليد', 'التوليد', 'ولادة', 'ولاده', 'الولادة', 'tawleed', 'obstetrics']
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
function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const forceScan = String(params.force || '') === 'true';
    const explicitSync = String(params.explicit || '') === 'true';

    // المسار السريع الفوري (Fast-Path): عند فتح الموقع (force=false) نرجع قاعدة البيانات فوراً من الذاكرة السريعة (CacheService / JSON) في أقل من 0.1 ثانية دون انتظار فحص 80 مجلداً
    if (!forceScan) {
      const fastDb = readDatabaseState(null, false);
      if (fastDb && Array.isArray(fastDb.files) && fastDb.files.length > 0) {
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
      if (Array.isArray(cachedDb.files) && cachedDb.files.length > 0) {
        syncResult = cachedDb;
      }
    }

    if (!syncResult) {
      const lock = LockService.getScriptLock();
      // انتظار خفيف (600ms فقط بدلاً من 15 ثانية) حتى لا يتجمد أي مستخدم أثناء مسح الخلفية
      if (lock.tryLock(600)) {
        try {
          syncResult = syncDriveWithDatabase();
          props.setProperty('LAST_DRIVE_SCAN_MS', String(Date.now()));
        } finally {
          lock.releaseLock();
        }
      } else {
        syncResult = readDatabaseState(null, false);
      }
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
  try {
    const rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    if (rawBody.length > 48 * 1024 * 1024) {
      return jsonResponse({
        ok: false,
        status: 'error',
        error: 'حجم الملف يتجاوز الحد الأقصى المسموح به للرفع المباشر من الموقع (~35 ميجابايت). يرجى رفع الملفات الكبيرة مباشرة إلى مجلد المادة في تطبيق Google Drive وستظهر في الموقع تلقائياً.',
        message: 'حجم الملف يتجاوز الحد الأقصى للرفع المباشر (35MB). ارفعه مباشرة في تطبيق Google Drive.'
      });
    }
    const payload = JSON.parse(rawBody);
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
      const incomingItem = payload.file || payload.item || {};

      // حفظ سجل اشتراكات إشعارات الطلاب (_sys_push_subs_v1) متاح لتسجيل هواتف الطلاب
      if (incomingItem.id === CONFIG.SYS_PUSH_SUBS_ID && action !== 'save_about') {
        const updatedState = saveSystemMetaRecord(incomingItem);
        return jsonResponse({
          ok: true,
          status: 'success',
          files: updatedState.files,
          folders: updatedState.folders
        });
      }

      // جميع عمليات النشر والتعديل وتحديث محتوى About تتطلب التحقق من صلاحية المسؤول على الخادم
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

      // إضافة أو تعديل ملف دراسي ورفعه/تحديثه في مجلد Google Drive المخصص بشكل فوري وسريع
      const uploadObj = payload.fileUpload || (payload.base64 ? {
        base64: payload.base64,
        fileName: payload.fileName || payload.name || 'file.pdf',
        mimeType: payload.mimeType || payload.type || 'application/pdf'
      } : null);
      const saveResult = handleSaveStudyFileFromSite(incomingItem, uploadObj);
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e) {}
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
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e) {}
      return jsonResponse({
        ok: true,
        status: 'success',
        deleted: deleteResult.deleted,
        files: deleteResult.files,
        folders: deleteResult.folders
      });
    }

    // الافتراضي: إجراء مزامنة شاملة
    const syncResult = syncDriveWithDatabase();
    try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e) {}
    return jsonResponse({
      ok: true,
      status: 'success',
      files: syncResult.files,
      folders: syncResult.folders
    });

  } catch (err) {
    return jsonResponse({
      ok: false,
      status: 'error',
      error: err.toString(),
      message: err.toString()
    });
  } finally {
    if (lock) {
      try { lock.releaseLock(); } catch (e) {}
    }
  }
}

/**
 * ============================================================================
 * 3. محرك المزامنة الثنائية الشامل بين شجرة مجلدات Google Drive وملف JSON
 * ============================================================================
 */
function syncDriveWithDatabase() {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];

  // الاحتفاظ بسجلات النظام (مثل اشتراكات إشعارات Web Push)
  const systemRecords = existingFiles.filter(f => f && (f.id === CONFIG.SYS_PUSH_SUBS_ID || f.isSystemMeta || String(f.id).indexOf('_sys_') === 0));

  // فهرسة السجلات الحالية حسب driveFileId وحسب كونها ملفات خارجية مضافة من الموقع
  const dbByDriveId = {};
  const externalOnlyRecords = [];

  existingFiles.forEach(item => {
    if (!item || !item.id || item.isSystemMeta || String(item.id).indexOf('_sys_') === 0) return;
    const isManagedDriveRecord = String(item.id).indexOf('drive_') === 0 || Boolean(item.driveFileId);
    const dId = item.driveFileId || (String(item.id).indexOf('drive_') === 0 ? extractDriveIdFromRecord(item) : '');
    if (isManagedDriveRecord && dId) {
      item.driveFileId = dId;
      dbByDriveId[dId] = item;
    } else {
      // أي سجل أضافه المسؤول من الموقع كرابط خارجي (تيليجرام، درايف خارجي، يوتيوب...) أو بدون ملف مرفوع يبقى محفوظاً حتى يحذفه المسؤول
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

      // إذا قام المستخدم بتعديل اسم الملف أو استبداله في Google Drive، نحدث عنوانه وصيغته على الموقع تلقائياً
      if (nameChangedInDrive || contentModifiedInDrive) {
        updatedRecord.title = dFile.cleanTitle;
        updatedRecord.format = dFile.format;
        updatedRecord.date = dFile.dateFormatted;
        delete updatedRecord.adminFormat;
      } else if (prev.adminFormat && !(prev.adminFormat === 'المصدر' && dFile.format !== 'المصدر' && normalizeArabic(dFile.fileName).indexOf('تفريغ') === -1 && normalizeArabic(dFile.fileName).indexOf('مصدر') === -1)) {
        // الحفاظ على الصيغة التي اختارها المسؤول صراحة من الموقع مع تصحيح الملفات التي تُركت على خيار "المصدر" الافتراضي بالخطأ رغم أن اسمها صريح (مثل "محاضرة 12 معدية شرح.pdf")
        updatedRecord.format = prev.adminFormat;
      } else if (prev.adminFormat === 'المصدر' && dFile.format !== 'المصدر') {
        updatedRecord.format = dFile.format;
        updatedRecord.adminFormat = dFile.format;
      } else if (prev.format === 'المصدر' && dFile.format !== 'المصدر') {
        // تصحيح تلقائي لأي ملفات قديمة كانت مصنفة كـ "المصدر" بالخطأ (مثل "محاضرة 2 باطنة تلخييص.pdf")
        updatedRecord.format = dFile.format;
      } else if (prev.format === 'شرح' && dFile.format === 'المصدر' && normalizeArabic(dFile.fileName).indexOf('تفريغ') !== -1) {
        // تصحيح تصنيف ملفات "التفريغ" لتكون ضمن "المصدر"
        updatedRecord.format = 'المصدر';
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
    const tA = a.driveModifiedTime || 0;
    const tB = b.driveModifiedTime || 0;
    return tB - tA;
  });

  const finalFilesArray = allStudyFiles.concat(systemRecords);

  // حفظ التحديث في ملف vet_ksu_33_db.json داخل المجلد الرئيسي
  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: finalFilesArray,
    folders: discoveredFolders
  });

  // إذا اكتُشف ملف جديد أُضيف مباشرة داخل Google Drive، نرسل إشعار Web Push تلقائياً لجميع المشتركين
  if (newlyAddedInDrive.length > 0) {
    try {
      handlePushWakeup([]);
    } catch (pushErr) {}
  }

  return {
    files: finalFilesArray,
    folders: discoveredFolders
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
  const knownMap = dbByDriveId || {};

  const rootSubfolders = getSubfoldersList(rootFolder);

  SUBJECTS_CONFIG.forEach(subConfig => {
    const subjectFolder = findFolderByAliases(rootSubfolders, subConfig.aliases);
    if (!subjectFolder) return;

    const categoryFolders = getSubfoldersList(subjectFolder);

    // 1. مسح قسمي "محاضرات" و "سكاشن"
    ['محاضرات', 'سكاشن'].forEach(categoryName => {
      const catAliases = categoryName === 'محاضرات'
        ? ['محاضرات', 'المحاضرات', 'محاضره', 'محاضرة', 'lectures']
        : ['سكاشن', 'السكاشن', 'سكشن', 'عملي', 'sections'];

      const catFolder = findFolderByAliases(categoryFolders, catAliases);
      if (!catFolder) return;

      // أ) مسح مجلدات المحاضرات/السكاشن المرقمة أو المدمجة (مثل: محاضرة 1، محاضرة 8-10، سكشن 1...)
      const numberedFolders = getSubfoldersList(catFolder);
      const unitSingular = categoryName === 'محاضرات' ? 'محاضرة' : 'سكشن';
      numberedFolders.forEach((numFolder, idx) => {
        const rawFolderName = String(numFolder.getName() || '').trim();
        const folderNum = extractFolderNumber(rawFolderName) || normalizeFolderNumServer(rawFolderName) || (idx + 1);
        const normalizedFolderName = !/^(?:محاضرات|محاضرة|محاضره|سكاشن|سكشن)/i.test(rawFolderName)
          ? (unitSingular + ' ' + folderNum)
          : rawFolderName;

        const filesInNumFolder = getFilesList(numFolder);
        // لا نضيف المجلد الفارغ تماماً من الملفات حتى لا يظهر كبطاقة فارغة ("غير مضاف") بعد حذف ملفاته
        if (filesInNumFolder.length > 0) {
          folders.push({
            id: numFolder.getId(),
            subject: subConfig.id,
            category: categoryName,
            folderNum: folderNum,
            name: normalizedFolderName
          });
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
      const inferredCategory = (fName.indexOf('سكشن') !== -1 || fName.indexOf('سكاشن') !== -1 || fName.indexOf('عملي') !== -1)
        ? 'سكاشن'
        : 'محاضرات';
      const inferredNum = extractFolderNumber(fName) || 1;
      driveFiles.push(buildScannedDriveFileObject(file, subConfig, inferredCategory, inferredNum, knownMap));
    });
  });

  folders.sort((a, b) => compareFolderNumsServer(a.folderNum, b.folderNum));
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
  const fileName = file.getName();
  const lastUpdated = file.getLastUpdated();
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

  const mimeType = file.getMimeType();
  const sizeBytes = file.getSize();
  const ext = getFileExtension(fileName).toUpperCase() || (mimeType.indexOf('pdf') !== -1 ? 'PDF' : (mimeType.indexOf('image') !== -1 ? 'PNG' : 'FILE'));

  return {
    driveFileId: fileId,
    fileName: fileName,
    cleanTitle: stripExtension(fileName),
    mimeType: mimeType,
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

/**
 * حفظ أو رفع أو تعديل ملف دراسي قادم من الموقع في المكان المخصص داخل Google Drive
 */
function handleSaveStudyFileFromSite(item, fileUpload) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];

  const subjectId = item.subject || 'batna';
  const subConfig = getSubjectConfigById(subjectId);
  const categoryName = (item.category === 'سكاشن') ? 'سكاشن' : 'محاضرات';
  const folderNum = normalizeFolderNumServer(item.folderNum) || 1;
  let format = item.format || 'المصدر';
  // إذا نسي المسؤول تغيير الصيغة عن "المصدر" وكان اسم الملف صريحاً (شرح / تلخيص / خريطة ذهنية) نصححها تلقائياً
  const checkNameForFmt = String((fileUpload && (fileUpload.fileName || fileUpload.name)) || item.title || '');
  const autoDetectedFmt = detectStudyFormat(checkNameForFmt);
  if (format === 'المصدر' && autoDetectedFmt !== 'المصدر' && normalizeArabic(checkNameForFmt).indexOf('تفريغ') === -1 && normalizeArabic(checkNameForFmt).indexOf('مصدر') === -1) {
    format = autoDetectedFmt;
  }

  // الوصول إلى المجلد المخصص (أو إنشاؤه تلقائياً):
  // VET_KSU_33_Library -> [المادة] -> [محاضرات أو سكاشن] -> [محاضرة X أو سكشن X]
  const targetTopicFolder = getOrCreateNumberedTopicFolder(rootFolder, subConfig, categoryName, folderNum);

  let existingIndex = -1;
  let existingRecord = null;
  const targetDriveId = item.driveFileId || extractDriveIdFromRecord(item);

  for (let i = 0; i < existingFiles.length; i++) {
    const f = existingFiles[i];
    if (!f) continue;
    if (f.id === item.id || (targetDriveId && f.driveFileId === targetDriveId)) {
      existingIndex = i;
      existingRecord = f;
      break;
    }
  }

  let driveFile = null;

  // حالة 1: تم رفع ملف فعلي جديد من الجهاز عبر الموقع
  if (fileUpload && fileUpload.base64) {
    // إذا كان تعديلاً لملف سابق على Drive، نحذف الملف القديم أولاً لمنع التكرار
    if (existingRecord && existingRecord.driveFileId) {
      try {
        DriveApp.getFileById(existingRecord.driveFileId).setTrashed(true);
      } catch (e) {}
    }

    const origName = String(fileUpload.fileName || fileUpload.name || 'file.pdf').trim();
    const ext = getFileExtension(origName) || 'pdf';
    let finalDriveFileName = buildDriveFileName(item.title, origName, subConfig, categoryName, folderNum, format, ext);

    // إذا كان رفعاً لملف جديد تماماً وكان هناك ملف بنفس الاسم في نفس المجلد، نضيف رقماً مميزاً بدلاً من حذف الملف السابق بالخطأ
    if (!existingRecord) {
      let counter = 2;
      const baseNoExt = stripExtension(finalDriveFileName);
      const cleanExt = String(ext || 'pdf').replace(/^\./, '');
      while (targetTopicFolder.getFilesByName(finalDriveFileName).hasNext()) {
        finalDriveFileName = baseNoExt + ' (' + counter + ').' + cleanExt;
        counter++;
      }
    }

    const cleanBase64 = String(fileUpload.base64).replace(/^data:[^;]+;base64,/, '');
    const decodedBytes = Utilities.base64Decode(cleanBase64);
    const mimeType = fileUpload.mimeType || fileUpload.type || 'application/pdf';
    const blob = Utilities.newBlob(decodedBytes, mimeType, finalDriveFileName);

    driveFile = targetTopicFolder.createFile(blob);
    try {
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}
  }
  // حالة 2: تعديل بيانات ملف موجود أصلاً في Google Drive (تغيير عنوانه أو نقله لمحاضرة/مادة أخرى)
  else if (targetDriveId) {
    try {
      driveFile = DriveApp.getFileById(targetDriveId);
      // نقل الملف إلى المجلد الجديد إذا تغيرت المادة أو القسم أو رقم المحاضرة
      moveFileToFolderIfNeeded(driveFile, targetTopicFolder);

      // تحديث اسم الملف في Google Drive إذا تم تعديل العنوان أو الصيغة في الموقع
      const currentName = driveFile.getName();
      const ext = getFileExtension(currentName) || 'pdf';
      const desiredName = buildDriveFileName(item.title, currentName, subConfig, categoryName, folderNum, format, ext);
      if (desiredName && desiredName !== currentName) {
        driveFile.setName(desiredName);
      }
    } catch (e) {}
  }

  const nowFormatted = Utilities.formatDate(new Date(), 'Africa/Cairo', 'yyyy/MM/dd');

  const finalRecord = Object.assign({}, existingRecord || {}, item, {
    subject: subConfig.id,
    category: categoryName,
    folderNum: folderNum,
    format: format,
    adminFormat: format,
    doctor: item.doctor || subConfig.doctor,
    date: item.date || nowFormatted,
    dateAdded: item.dateAdded || nowFormatted,
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
    finalRecord.driveModifiedTime = driveFile.getLastUpdated().getTime();
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

  const existingFolders = Array.isArray(dbState.folders) ? dbState.folders : [];
  if (targetTopicFolder) {
    const tFolderId = targetTopicFolder.getId();
    const hasFolder = existingFolders.some(fl => fl && (fl.id === tFolderId || (fl.subject === subConfig.id && fl.category === categoryName && String(normalizeFolderNumServer(fl.folderNum)) === String(folderNum))));
    if (!hasFolder) {
      const unitSingular = categoryName === 'محاضرات' ? 'محاضرة' : 'سكشن';
      existingFolders.push({
        id: tFolderId,
        subject: subConfig.id,
        category: categoryName,
        folderNum: folderNum,
        name: unitSingular + ' ' + folderNum
      });
      existingFolders.sort((a, b) => compareFolderNumsServer(a.folderNum, b.folderNum));
    }
  }

  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: existingFiles,
    folders: existingFolders
  });

  return {
    file: finalRecord,
    files: existingFiles,
    folders: existingFolders
  };
}

/**
 * حذف ملف من الموقع -> يحذفه فوراً من مجلد Google Drive ومن ملف قاعدة البيانات
 */
function handleDeleteStudyFileFromSite(payload) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const existingFiles = Array.isArray(dbState.files) ? dbState.files : [];

  const targetId = String(payload.id || payload.fileId || '').trim();
  let driveIdToTrash = String(payload.driveFileId || '').trim();

  if (!driveIdToTrash && targetId.indexOf('drive_') === 0) {
    driveIdToTrash = targetId.replace(/^drive_/, '');
  }

  // البحث عن السجل في قاعدة البيانات لاستخراج driveFileId إن لم يُرسل صراحة
  const remainingFiles = [];
  existingFiles.forEach(f => {
    if (!f) return;
    const isMatch = (targetId && f.id === targetId) ||
                    (driveIdToTrash && f.driveFileId === driveIdToTrash) ||
                    (targetId && f.driveFileId === targetId);
    if (isMatch) {
      if (!driveIdToTrash && f.driveFileId) {
        driveIdToTrash = f.driveFileId;
      }
      if (!driveIdToTrash) {
        driveIdToTrash = extractDriveIdFromRecord(f);
      }
    } else {
      remainingFiles.push(f);
    }
  });

  let trashedInDrive = false;
  if (driveIdToTrash) {
    try {
      const file = DriveApp.getFileById(driveIdToTrash);
      const parentFolders = [];
      const pIter = file.getParents();
      while (pIter.hasNext()) {
        parentFolders.push(pIter.next());
      }
      file.setTrashed(true);
      trashedInDrive = true;

      // إذا أصبح مجلد المحاضرة/السكشن المرقم فارغاً تماماً بعد حذف الملف، ننقله للمهملات تلقائياً
      parentFolders.forEach(pFolder => {
        try {
          if (pFolder.getId() !== CONFIG.ROOT_FOLDER_ID) {
            const remFiles = getFilesList(pFolder);
            const remSubfolders = getSubfoldersList(pFolder);
            if (remFiles.length === 0 && remSubfolders.length === 0) {
              pFolder.setTrashed(true);
            }
          }
        } catch (cleanFolderErr) {}
      });
    } catch (e) {
      try {
        const folder = DriveApp.getFolderById(driveIdToTrash);
        folder.setTrashed(true);
        trashedInDrive = true;
      } catch (e2) {}
    }
  }

  const existingFolders = Array.isArray(dbState.folders) ? dbState.folders : [];
  const remainingFolders = existingFolders.filter(fl => {
    if (!fl) return false;
    return remainingFiles.some(rf => rf && !rf.isSystemMeta && rf.subject === fl.subject && rf.category === fl.category && String(normalizeFolderNumServer(rf.folderNum)) === String(normalizeFolderNumServer(fl.folderNum)));
  });

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
  try {
    const parents = file.getParents();
    let alreadyInTarget = false;
    while (parents.hasNext()) {
      const p = parents.next();
      if (p.getId() === targetFolder.getId()) {
        alreadyInTarget = true;
        break;
      }
    }
    if (!alreadyInTarget) {
      file.moveTo(targetFolder);
    }
  } catch (e) {}
}

function buildDriveFileName(customTitle, originalFileName, subConfig, categoryName, folderNum, format, ext) {
  const cleanExt = String(ext || 'pdf').replace(/^\./, '');
  const baseOriginal = stripExtension(originalFileName || '');
  let baseTitle = String(customTitle || '').trim();

  // إزالة العناوين التلقائية العامة إن وجدت
  const genericPattern = new RegExp('^' + format + '\\s*-\\s*' + categoryName);
  if (!baseTitle || genericPattern.test(baseTitle)) {
    baseTitle = baseOriginal || ((categoryName === 'محاضرات' ? 'محاضرة ' : 'سكشن ') + folderNum + ' ' + subConfig.folderName + ' ' + format);
  } else {
    baseTitle = stripExtension(baseTitle);
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
  if (norm.indexOf('خريطه') !== -1 || norm.indexOf('ذهنيه') !== -1 || norm.indexOf('زهنيه') !== -1 || norm.indexOf('mind') !== -1 || norm.indexOf('map') !== -1) {
    return 'خريطه ذهنية';
  }
  if (/تلخي+ص/.test(norm) || norm.indexOf('ملخص') !== -1 || norm.indexOf('مختصر') !== -1 || norm.indexOf('summary') !== -1) {
    return 'تلخيص';
  }
  if (norm.indexOf('شرح') !== -1 || norm.indexOf('تفصيلي') !== -1 || norm.indexOf('explain') !== -1 || norm.indexOf('note') !== -1) {
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
  if (!payload) return false;
  const candidate = payload.adminToken || payload.passcode || (payload.file && payload.file.adminToken) || '';
  return verifyAdminPasscodeServer(candidate);
}

function handleIncrementDownloadCount(targetId) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const files = Array.isArray(dbState.files) ? dbState.files : [];
  const cleanId = String(targetId || '').trim();
  if (cleanId) {
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f && (f.id === cleanId || f.driveFileId === cleanId)) {
        f.downloads = (Number(f.downloads) || 0) + 1;
        f.downloadsCount = f.downloads;
        break;
      }
    }
    writeDatabaseState(rootFolder, {
      ok: true,
      updatedAt: new Date().toISOString(),
      files: files,
      folders: dbState.folders || []
    });
  }
  return {
    files: files,
    folders: dbState.folders || []
  };
}

function getSubjectConfigById(subId) {
  for (let i = 0; i < SUBJECTS_CONFIG.length; i++) {
    if (SUBJECTS_CONFIG[i].id === subId) return SUBJECTS_CONFIG[i];
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
  const normAliases = aliases.map(a => normalizeArabic(a));

  // تطابق تام أولاً
  for (let i = 0; i < foldersList.length; i++) {
    const fNameNorm = normalizeArabic(foldersList[i].getName());
    if (normAliases.indexOf(fNameNorm) !== -1) {
      return foldersList[i];
    }
  }

  // تطابق جزئي ثانياً
  for (let i = 0; i < foldersList.length; i++) {
    const fNameNorm = normalizeArabic(foldersList[i].getName());
    for (let j = 0; j < normAliases.length; j++) {
      if (fNameNorm.indexOf(normAliases[j]) !== -1 || normAliases[j].indexOf(fNameNorm) !== -1) {
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
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '')
    .replace(/\s+/g, ' ');
}

function normalizeFolderNumServer(val) {
  if (val === null || val === undefined) return null;
  const s0 = String(val).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  let s = s0.replace(/^(?:محاضرات|محاضرة|محاضره|سكاشن|سكشن|مجلد|عملي|lecture|section)\s*/i, '').trim();
  s = s.replace(/(\d+)\s*[-–—]\s*(\d+)/g, '$1-$2');
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
  return sa.localeCompare(sb, 'ar');
}

function extractFolderNumber(str) {
  const s = String(str || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  if (!s) return null;
  // دعم المحاضرات المدمجة مثل 8-10 أو 8 و 9 أو 8،9
  const rangeMatch = s.match(/(\d+\s*(?:[-–—+,،/&]|و|إلى|الى)\s*\d+(?:\s*(?:[-–—+,،/&]|و|إلى|الى)\s*\d+)*)/);
  if (rangeMatch && rangeMatch[1]) {
    return normalizeFolderNumServer(rangeMatch[1]);
  }
  const m = s.match(/(\d+)/);
  if (m && m[1]) {
    return parseInt(m[1], 10);
  }
  return null;
}

function stripExtension(fileName) {
  return String(fileName || '').replace(/\.[^/.]+$/, '').trim();
}

function getFileExtension(fileName) {
  const m = String(fileName || '').match(/\.([^.]+)$/);
  return m ? m[1].toLowerCase() : '';
}

function formatBytes(bytes) {
  const b = Number(bytes) || 0;
  if (b === 0) return '0 KB';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(b) / Math.log(k));
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

function readDbFromMemoryCache() {
  try {
    const cache = CacheService.getScriptCache();
    const metaStr = cache.get('VET33_DB_META_V2');
    if (!metaStr) return null;
    const meta = JSON.parse(metaStr);
    const count = Number(meta && meta.chunks) || 0;
    if (count <= 0) return null;
    const keys = [];
    for (let i = 0; i < count; i++) {
      keys.push('VET33_DB_CHUNK_' + i);
    }
    const map = cache.getAll(keys);
    let raw = '';
    for (let i = 0; i < count; i++) {
      const part = map['VET33_DB_CHUNK_' + i];
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
    if (!jsonStr) return;
    const cache = CacheService.getScriptCache();
    const chunkSize = CONFIG.CACHE_CHUNK_SIZE || 85000;
    const totalChunks = Math.ceil(jsonStr.length / chunkSize);
    if (totalChunks > 25) return;
    const payload = {};
    for (let i = 0; i < totalChunks; i++) {
      payload['VET33_DB_CHUNK_' + i] = jsonStr.substr(i * chunkSize, chunkSize);
    }
    payload['VET33_DB_META_V2'] = JSON.stringify({
      chunks: totalChunks,
      updatedAt: Date.now()
    });
    cache.putAll(payload, CONFIG.CACHE_TTL_SEC || 21600);
  } catch (e) {}
}

function healDatabaseRecordsInPlace(filesArr) {
  if (!Array.isArray(filesArr)) return filesArr;
  filesArr.forEach(rf => {
    if (!rf || rf.isSystemMeta || String(rf.id || '').indexOf('_sys_') === 0) return;
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

function readDatabaseState(rootFolder, skipMemoryCache) {
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
    let raw = '';

    if (savedDbFileId) {
      try {
        const directFile = DriveApp.getFileById(savedDbFileId);
        if (!directFile.isTrashed()) {
          raw = directFile.getBlob().getDataAsString('UTF-8');
        }
      } catch (idErr) {
        raw = '';
      }
    }

    if (!raw) {
      const folder = rootFolder || getRootFolder();
      const iter = folder.getFilesByName(CONFIG.DB_FILE_NAME);
      if (iter.hasNext()) {
        const f = iter.next();
        try { props.setProperty('DB_FILE_ID', f.getId()); } catch (pe) {}
        raw = f.getBlob().getDataAsString('UTF-8');
      }
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        healDatabaseRecordsInPlace(parsed);
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
    }
  } catch (e) {}
  return { files: [], folders: [] };
}

function writeDatabaseState(rootFolder, stateObj) {
  if (stateObj && Array.isArray(stateObj.files)) {
    healDatabaseRecordsInPlace(stateObj.files);
  }
  const jsonStr = JSON.stringify(stateObj, null, 2);
  writeDbToMemoryCache(jsonStr);

  const props = PropertiesService.getScriptProperties();
  const savedDbFileId = props.getProperty('DB_FILE_ID') || '';
  if (savedDbFileId) {
    try {
      const directFile = DriveApp.getFileById(savedDbFileId);
      if (!directFile.isTrashed()) {
        directFile.setContent(jsonStr);
        return;
      }
    } catch (e) {}
  }

  const folder = rootFolder || getRootFolder();
  const iter = folder.getFilesByName(CONFIG.DB_FILE_NAME);
  if (iter.hasNext()) {
    const file = iter.next();
    file.setContent(jsonStr);
    try { props.setProperty('DB_FILE_ID', file.getId()); } catch (pe) {}
    while (iter.hasNext()) {
      iter.next().setTrashed(true);
    }
  } else {
    const created = folder.createFile(CONFIG.DB_FILE_NAME, jsonStr, MimeType.PLAIN_TEXT);
    try { props.setProperty('DB_FILE_ID', created.getId()); } catch (pe) {}
  }
}

function saveSystemMetaRecord(sysItem) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const files = Array.isArray(dbState.files) ? dbState.files : [];
  const prevRec = files.find(f => f && f.id === sysItem.id);
  const filtered = files.filter(f => f && f.id !== sysItem.id);

  if (sysItem.id === CONFIG.SYS_PUSH_SUBS_ID) {
    const prevSubs = (prevRec && Array.isArray(prevRec.subs)) ? prevRec.subs : [];
    const incomingSubs = Array.isArray(sysItem.subs) ? sysItem.subs : [];
    const byEndpoint = {};
    prevSubs.concat(incomingSubs).forEach(s => {
      if (s && s.endpoint && typeof s.endpoint === 'string') {
        byEndpoint[s.endpoint] = {
          endpoint: s.endpoint,
          keys: s.keys || (byEndpoint[s.endpoint] && byEndpoint[s.endpoint].keys) || {},
          updatedAt: s.updatedAt || Date.now()
        };
      }
    });
    sysItem.subs = Object.keys(byEndpoint).map(k => byEndpoint[k]).slice(-500);
  }

  sysItem.isSystemMeta = true;
  filtered.push(sysItem);
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
function createServerVapidHeaders(endpointUrl) {
  try {
    const m = String(endpointUrl || '').match(/^(https:\/\/[^\/]+)/i);
    if (!m) return null;
    const aud = m[1];
    const exp = Math.floor(Date.now() / 1000) + (12 * 3600);
    const headerJson = JSON.stringify({ typ: 'JWT', alg: 'ES256' });
    const payloadJson = JSON.stringify({ aud: aud, exp: exp, sub: 'mailto:vetksu33@gmail.com' });
    const headerB64 = Utilities.base64EncodeWebSafe(Utilities.newBlob(headerJson).getBytes()).replace(/=+$/, '');
    const payloadB64 = Utilities.base64EncodeWebSafe(Utilities.newBlob(payloadJson).getBytes()).replace(/=+$/, '');
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
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substr(i, 2), 16);
    bytes.push(v > 127 ? v - 256 : v);
  }
  return bytes;
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
    return mod(t, m);
  }
  function ptAdd(p1, p2) {
    if (!p1) return p2;
    if (!p2) return p1;
    const x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
    if (x1 === x2) {
      if (mod(y1 + y2, P) === ZERO) return null;
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

  const dBytes = Utilities.base64DecodeWebSafe(dB64Url);
  const d = BigInt('0x' + bytesToHexServer(dBytes));
  const zBytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, unsignedToken);
  const z = BigInt('0x' + bytesToHexServer(zBytes));
  const kBytes = Utilities.computeHmacSha256Signature(unsignedToken, dB64Url);
  const k = (BigInt('0x' + bytesToHexServer(kBytes)) % (N - ONE)) + ONE;

  const pt = ptMul(k);
  const r = mod(pt[0], N);
  const s = mod(modInv(k, N) * (z + r * d), N);
  const sigHex = r.toString(16).padStart(64, '0') + s.toString(16).padStart(64, '0');
  return Utilities.base64EncodeWebSafe(hexToBytesServer(sigHex)).replace(/=+$/, '');
}

function handlePushWakeup(targets) {
  let effectiveTargets = Array.isArray(targets) ? targets : [];
  // دمج الأهداف المرسلة مع الاشتراكات المحفوظة في قاعدة البيانات لضمان عدم تفويت أي هاتف مشترك
  try {
    const rootFolder = getRootFolder();
    const dbState = readDatabaseState(rootFolder);
    const sysSub = (dbState.files || []).find(f => f && f.id === CONFIG.SYS_PUSH_SUBS_ID);
    if (sysSub && Array.isArray(sysSub.subs)) {
      const byEp = {};
      sysSub.subs.forEach(s => { if (s && s.endpoint) byEp[s.endpoint] = s; });
      effectiveTargets.forEach(t => { if (t && t.endpoint) byEp[t.endpoint] = Object.assign({}, byEp[t.endpoint] || {}, t); });
      effectiveTargets = Object.keys(byEp).map(k => byEp[k]);
    }
  } catch (e) {}

  if (effectiveTargets.length === 0) {
    return { pushedCount: 0, removedExpiredCount: 0, expiredEndpoints: [] };
  }

  let successCount = 0;
  const expiredEndpoints = [];
  const preparedTargets = [];
  const batchRequests1 = [];

  effectiveTargets.forEach(t => {
    if (!t || !t.endpoint) return;
    const signedHdrs = (!t.authorization && !t.webPushAuth) ? createServerVapidHeaders(t.endpoint) : null;
    const vapidAuth = t.authorization || (signedHdrs ? signedHdrs.vapid : '');
    const webPushAuth = t.webPushAuth || (signedHdrs ? signedHdrs.webPush : '');
    const cryptoKey = t.cryptoKey || (signedHdrs ? signedHdrs.cryptoKey : '');
    const isLegacyFcm = String(t.endpoint).indexOf('/fcm/send/') !== -1;

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
      endpoint: t.endpoint,
      vapidAuth: vapidAuth,
      webPushAuth: webPushAuth,
      cryptoKey: cryptoKey,
      usedLegacyFirst: Boolean(isLegacyFcm && webPushAuth && cryptoKey)
    });

    batchRequests1.push({
      url: t.endpoint,
      method: 'post',
      headers: headers1,
      payload: '',
      muteHttpExceptions: true
    });
  });

  // إرسال الدفعة الأولى بالتوازي لجميع الهواتف في وقت واحد (أسرع بـ 20 مرة من الإرسال التسلسلي)
  let responses1 = [];
  try {
    responses1 = UrlFetchApp.fetchAll(batchRequests1);
  } catch (batchErr) {
    responses1 = batchRequests1.map(req => {
      try { return UrlFetchApp.fetch(req.url, req); } catch (e) { return null; }
    });
  }

  const retryTargets = [];
  const retryRequests = [];

  for (let i = 0; i < preparedTargets.length; i++) {
    const pt = preparedTargets[i];
    const res = responses1[i];
    const code = res ? res.getResponseCode() : 0;

    if (code >= 200 && code < 300) {
      successCount++;
    } else if (code === 404 || code === 410) {
      expiredEndpoints.push(pt.endpoint);
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
    try {
      const responses2 = UrlFetchApp.fetchAll(retryRequests);
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
    } catch (retryErr) {}
  }

  // حذف الاشتراكات المنتهية الصلاحية (404 أو 410 Gone) من سجل _sys_push_subs_v1 في vet_ksu_33_db.json
  if (expiredEndpoints.length > 0) {
    try {
      const rootFolder = getRootFolder();
      const dbState = readDatabaseState(rootFolder);
      const files = Array.isArray(dbState.files) ? dbState.files : [];
      let changed = false;

      for (let i = 0; i < files.length; i++) {
        const rec = files[i];
        if (rec && rec.id === CONFIG.SYS_PUSH_SUBS_ID && Array.isArray(rec.subs)) {
          const beforeLen = rec.subs.length;
          rec.subs = rec.subs.filter(s => s && s.endpoint && expiredEndpoints.indexOf(s.endpoint) === -1);
          if (rec.subs.length !== beforeLen) {
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
    } catch (cleanErr) {}
  }

  return {
    pushedCount: successCount,
    removedExpiredCount: expiredEndpoints.length,
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