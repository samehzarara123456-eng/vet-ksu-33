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
  SYNC_THROTTLE_MS: 30000
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
    const props = PropertiesService.getScriptProperties();
    const lastScanMs = Number(props.getProperty('LAST_DRIVE_SCAN_MS') || 0);
    const nowMs = Date.now();

    let syncResult = null;
    if (!forceScan && (nowMs - lastScanMs < CONFIG.SYNC_THROTTLE_MS)) {
      const rootFolder = getRootFolder();
      const cachedDb = readDatabaseState(rootFolder);
      if (Array.isArray(cachedDb.files) && cachedDb.files.length > 0) {
        syncResult = cachedDb;
      }
    }

    if (!syncResult) {
      const lock = LockService.getScriptLock();
      if (lock.tryLock(15000)) {
        try {
          syncResult = syncDriveWithDatabase();
          props.setProperty('LAST_DRIVE_SCAN_MS', String(Date.now()));
        } finally {
          lock.releaseLock();
        }
      } else {
        const rootFolder = getRootFolder();
        syncResult = readDatabaseState(rootFolder);
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
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

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

    // أ) إرسال إشعارات Web Push للهواتف المشتركة وتنظيف الاشتراكات المنتهية (404 / 410)
    if (action === 'push_wakeup') {
      const pushResult = handlePushWakeup(payload.targets || []);
      return jsonResponse({
        ok: true,
        pushedCount: pushResult.pushedCount,
        removedExpiredCount: pushResult.removedExpiredCount,
        expiredEndpoints: pushResult.expiredEndpoints
      });
    }

    // أ-2) التحقق من كود المسؤول عبر الخادم
    if (action === 'verify_admin') {
      const isOk = verifyAdminPasscodeServer(payload.passcode || '');
      return jsonResponse({ ok: isOk, status: isOk ? 'success' : 'unauthorized' });
    }

    // أ-3) زيادة عداد التحميلات بشكل خفيف وآمن دون إعادة مسح شجرة Drive
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

      // حفظ سجلات النظام (اشتراكات الإشعارات أو محتوى قسم عن المنصة)
      if (incomingItem.id === CONFIG.SYS_PUSH_SUBS_ID || incomingItem.id === CONFIG.SYS_ABOUT_CONTENT_ID || incomingItem.isSystemMeta || String(incomingItem.id || '').indexOf('_sys_') === 0) {
        const updatedState = saveSystemMetaRecord(incomingItem);
        return jsonResponse({
          ok: true,
          status: 'success',
          files: updatedState.files,
          folders: updatedState.folders
        });
      }

      // إضافة أو تعديل ملف دراسي ورفعه/تحديثه في مجلد Google Drive المخصص
      const uploadObj = payload.fileUpload || (payload.base64 ? {
        base64: payload.base64,
        fileName: payload.fileName || payload.name || 'file.pdf',
        mimeType: payload.mimeType || payload.type || 'application/pdf'
      } : null);
      const savedFile = handleSaveStudyFileFromSite(incomingItem, uploadObj);
      const syncResult = syncDriveWithDatabase();
      try { PropertiesService.getScriptProperties().setProperty('LAST_DRIVE_SCAN_MS', String(Date.now())); } catch (e) {}
      return jsonResponse({
        ok: true,
        status: 'success',
        file: savedFile,
        files: syncResult.files,
        folders: syncResult.folders
      });
    }

    // ج) حذف ملف من الموقع -> يحذف فوراً من مجلد Google Drive ومن قاعدة البيانات
    if (action === 'delete' || action === 'deleteFile') {
      const deletedInfo = handleDeleteStudyFileFromSite(payload);
      const syncResult = syncDriveWithDatabase();
      return jsonResponse({
        ok: true,
        status: 'success',
        deleted: deletedInfo,
        files: syncResult.files,
        folders: syncResult.folders
      });
    }

    // الافتراضي: إجراء مزامنة شاملة
    const syncResult = syncDriveWithDatabase();
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
    lock.releaseLock();
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

  // مسح شجرة مجلدات Google Drive بالكامل
  const scanOutput = scanEntireDriveTree(rootFolder);
  const discoveredDriveFiles = scanOutput.driveFiles; // كل الملفات الموجودة فعلياً الآن في المجلد
  const discoveredFolders = scanOutput.folders;       // كل مجلدات المحاضرات/السكاشن الموجودة فعلياً

  const syncedStudyFiles = [];
  const seenDriveIds = {};

  discoveredDriveFiles.forEach(dFile => {
    seenDriveIds[dFile.driveFileId] = true;
    const prev = dbByDriveId[dFile.driveFileId];

    if (!prev) {
      // 1) ملف جديد أُضيف في مجلد Google Drive -> يضاف تلقائياً للموقع في نفس مكانه المخصص
      syncedStudyFiles.push({
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
      });
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
function scanEntireDriveTree(rootFolder) {
  const driveFiles = [];
  const folders = [];

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

      // أ) مسح مجلدات المحاضرات/السكاشن المرقمة (مثل: محاضرة 1، محاضرة 2، سكشن 1...)
      const numberedFolders = getSubfoldersList(catFolder);
      numberedFolders.forEach((numFolder, idx) => {
        const folderNum = extractFolderNumber(numFolder.getName()) || (idx + 1);

        folders.push({
          id: numFolder.getId(),
          subject: subConfig.id,
          category: categoryName,
          folderNum: folderNum,
          name: numFolder.getName()
        });

        const filesInNumFolder = getFilesList(numFolder);
        filesInNumFolder.forEach(file => {
          driveFiles.push(buildScannedDriveFileObject(file, subConfig, categoryName, folderNum));
        });
      });

      // ب) مسح أي ملفات وُضعت مباشرة داخل مجلد "محاضرات" أو "سكاشن" بدون مجلد رقمي فرعي
      const directCatFiles = getFilesList(catFolder);
      directCatFiles.forEach(file => {
        const inferredNum = extractFolderNumber(file.getName()) || 1;
        driveFiles.push(buildScannedDriveFileObject(file, subConfig, categoryName, inferredNum));
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
      driveFiles.push(buildScannedDriveFileObject(file, subConfig, inferredCategory, inferredNum));
    });
  });

  folders.sort((a, b) => (Number(a.folderNum) || 0) - (Number(b.folderNum) || 0));
  return {
    driveFiles: driveFiles,
    folders: folders
  };
}

/**
 * تحويل ملف Google Drive إلى كائن بيانات متوافق مع الموقع
 */
function buildScannedDriveFileObject(file, subConfig, categoryName, folderNum) {
  const fileId = file.getId();
  const fileName = file.getName();
  const mimeType = file.getMimeType();
  const sizeBytes = file.getSize();
  const ext = getFileExtension(fileName).toUpperCase() || (mimeType.indexOf('pdf') !== -1 ? 'PDF' : (mimeType.indexOf('image') !== -1 ? 'PNG' : 'FILE'));
  const detectedFormat = detectStudyFormat(fileName);
  const lastUpdated = file.getLastUpdated();

  return {
    driveFileId: fileId,
    fileName: fileName,
    cleanTitle: stripExtension(fileName),
    mimeType: mimeType,
    subjectId: subConfig.id,
    categoryName: categoryName,
    folderNum: Number(folderNum) || 1,
    format: detectedFormat,
    doctor: subConfig.doctor,
    sizeFormatted: ext + ' • ' + formatBytes(sizeBytes),
    dateFormatted: Utilities.formatDate(lastUpdated, 'Africa/Cairo', 'yyyy/MM/dd'),
    modifiedTimeMs: lastUpdated.getTime(),
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
  const folderNum = Number(item.folderNum) || 1;
  const format = item.format || 'المصدر';

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
    doctor: item.doctor || subConfig.doctor,
    date: item.date || nowFormatted,
    dateAdded: item.dateAdded || nowFormatted,
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

  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: existingFiles,
    folders: dbState.folders || []
  });

  return finalRecord;
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
      file.setTrashed(true);
      trashedInDrive = true;
    } catch (e) {
      try {
        const folder = DriveApp.getFolderById(driveIdToTrash);
        folder.setTrashed(true);
        trashedInDrive = true;
      } catch (e2) {}
    }
  }

  writeDatabaseState(rootFolder, {
    ok: true,
    updatedAt: new Date().toISOString(),
    files: remainingFiles,
    folders: dbState.folders || []
  });

  return {
    id: targetId,
    driveFileId: driveIdToTrash,
    trashedInDrive: trashedInDrive
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

  // 3. مجلد المحاضرة أو السكشن المرقم (مثلاً: "محاضرة 1" أو "سكشن 1")
  const numberedFolders = getSubfoldersList(catFolder);
  const targetNum = Number(folderNum) || 1;
  for (let i = 0; i < numberedFolders.length; i++) {
    const fNum = extractFolderNumber(numberedFolders[i].getName());
    if (fNum === targetNum) {
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
  if (norm.indexOf('شرح') !== -1 || norm.indexOf('تفصيلي') !== -1 || norm.indexOf('تفريغ') !== -1 || norm.indexOf('مفرغ') !== -1 || norm.indexOf('explain') !== -1 || norm.indexOf('note') !== -1) {
    return 'شرح';
  }
  return 'المصدر';
}

function verifyAdminPasscodeServer(passcode) {
  const allowed = ['33', 'vet33', '2027', 'vetksu33', 'admin'];
  const clean = String(passcode || '').trim().toLowerCase();
  return allowed.indexOf(clean) !== -1;
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

function extractFolderNumber(str) {
  const s = String(str || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const m = s.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
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

function readDatabaseState(rootFolder) {
  try {
    const iter = rootFolder.getFilesByName(CONFIG.DB_FILE_NAME);
    if (iter.hasNext()) {
      const raw = iter.next().getBlob().getDataAsString('UTF-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return { files: parsed, folders: [] };
      }
      if (parsed && typeof parsed === 'object') {
        return {
          files: Array.isArray(parsed.files) ? parsed.files : [],
          folders: Array.isArray(parsed.folders) ? parsed.folders : []
        };
      }
    }
  } catch (e) {}
  return { files: [], folders: [] };
}

function writeDatabaseState(rootFolder, stateObj) {
  const jsonStr = JSON.stringify(stateObj, null, 2);
  const iter = rootFolder.getFilesByName(CONFIG.DB_FILE_NAME);
  if (iter.hasNext()) {
    const file = iter.next();
    file.setContent(jsonStr);
    while (iter.hasNext()) {
      iter.next().setTrashed(true);
    }
  } else {
    rootFolder.createFile(CONFIG.DB_FILE_NAME, jsonStr, MimeType.PLAIN_TEXT);
  }
}

function saveSystemMetaRecord(sysItem) {
  const rootFolder = getRootFolder();
  const dbState = readDatabaseState(rootFolder);
  const files = Array.isArray(dbState.files) ? dbState.files : [];
  const filtered = files.filter(f => f && f.id !== sysItem.id);
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

function handlePushWakeup(targets) {
  if (!Array.isArray(targets)) {
    return { pushedCount: 0, removedExpiredCount: 0, expiredEndpoints: [] };
  }
  let successCount = 0;
  const expiredEndpoints = [];

  targets.forEach(t => {
    if (!t || !t.endpoint) return;
    try {
      const headers = {
        'TTL': '86400',
        'Urgency': 'high',
        'Authorization': t.authorization || t.webPushAuth || ''
      };
      if (t.cryptoKey && !t.authorization) {
        headers['Crypto-Key'] = t.cryptoKey;
      }
      const res = UrlFetchApp.fetch(t.endpoint, {
        method: 'post',
        headers: headers,
        payload: '',
        muteHttpExceptions: true
      });
      const code = res.getResponseCode();
      if (code >= 200 && code < 300) {
        successCount++;
      } else if (code === 404 || code === 410) {
        expiredEndpoints.push(t.endpoint);
      }
    } catch (e) {}
  });

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