/**
 * Seniors 2027 VET-KSU 33 — Google Apps Script Two-Way Real-time Drive Synchronization
 * المكتبة الرقمية لمقررات الفرقة الرابعة - طب بيطري كفر الشيخ
 * 
 * الميزات المدمجة (Two-Way Sync):
 * 1. عند إضافة أي ملف في مجلد جوجل درايف (داخل المجلدات أو في المجلد الرئيسي) يظهر فوراً في التطبيق في نفس المسار.
 * 2. عند حذف أي ملف من مجلد جوجل درايف يتم حذفه فوراً من التطبيق وقاعدة البيانات.
 * 3. عند حذف أي ملف من التطبيق يتم حذفه ونقله لسلة مهملات جوجل درايف (Trash) تلقائياً.
 */

const FOLDER_NAME = 'VET_KSU_33_Library';
const DB_FILE_NAME = 'vet33_database.json';
const SYS_PUSH_SUBS_ID = '_sys_push_subs_v1';

// المقررات الثمانية المعتمدة
const SUBJECT_CONFIG = {
  batna: {
    folderName: '1. الباطنة',
    displayName: 'الباطنة',
    fullName: 'الأمراض الباطنة الإكلينيكية (Internal Medicine)',
    doctor: 'قسم طب الحيوان (باطنه)',
    keywords: ['باطن', 'باطنه', 'internal', 'medicine']
  },
  tawleed: {
    folderName: '2. التوليد',
    displayName: 'التوليد',
    fullName: 'التوليد والتناسل والتلقيح الاصطناعي (Theriogenology)',
    doctor: 'قسم التوليد والتناسل',
    keywords: ['توليد', 'ولاد', 'ولاده', 'تناسل', 'therio', 'obste']
  },
  geraha: {
    folderName: '3. الجراحة',
    displayName: 'الجراحة',
    fullName: 'الجراحة والتخدير والأشعة (Surgery & Radiology)',
    doctor: 'قسم الجراحة والتخدير والأشعة',
    keywords: ['جراح', 'جراحه', 'تخدير', 'اشع', 'اشعه', 'surg']
  },
  dawagen: {
    folderName: '4. الدواجن',
    displayName: 'الدواجن',
    fullName: 'أمراض الدواجن والأرانب (Poultry Diseases)',
    doctor: 'قسم أمراض الدواجن',
    keywords: ['دواجن', 'فراخ', 'ارانب', 'poult']
  },
  seha: {
    folderName: '5. الصحة',
    displayName: 'الصحة',
    fullName: 'الصحة والطب الوقائي ورعاية الحيوان (Animal Hygiene)',
    doctor: 'قسم الصحة والطب الوقائي',
    keywords: ['صح', 'صحه', 'hygiene', 'وقائ', 'بيئ', 'رعاي']
  },
  lahma: {
    folderName: '6. اللحوم',
    displayName: 'اللحوم',
    fullName: 'الرقابة الصحية على اللحوم ومنتجاتها (Meat Hygiene)',
    doctor: 'قسم مراقبة الأغذية (اللحوم)',
    keywords: ['لحم', 'لحمه', 'لحوم', 'meat']
  },
  moshtaraka: {
    folderName: '7. المشتركة',
    displayName: 'المشتركة',
    fullName: 'الأمراض المشتركة (Zoonoses)',
    doctor: 'قسم الأمراض المشتركة',
    keywords: ['مشترك', 'مشتركه', 'zoon']
  },
  moadya: {
    folderName: '8. المعدية',
    displayName: 'المعدية',
    fullName: 'الأمراض المعدية والوبائية (Infectious Diseases)',
    doctor: 'قسم الأمراض المعدية',
    keywords: ['معدي', 'معديه', 'وبائ', 'وبائيه', 'infect']
  }
};

function normalizeArabic(text) {
  if (!text) return '';
  return String(text).toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME);
}

function getOrCreateSubfolder(parent, name) {
  const folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

function readDb(folder) {
  const files = folder.getFilesByName(DB_FILE_NAME);
  if (!files.hasNext()) return [];
  try {
    return JSON.parse(files.next().getBlob().getDataAsString('UTF-8') || '[]');
  } catch (e) {
    return [];
  }
}

function writeDb(folder, data) {
  const files = folder.getFilesByName(DB_FILE_NAME);
  const content = JSON.stringify(data, null, 2);
  if (files.hasNext()) {
    files.next().setContent(content);
  } else {
    folder.createFile(DB_FILE_NAME, content, MimeType.PLAIN_TEXT);
  }
}

// دالة فحص المجلدات واستخراج المسار الهرمي للملف
function resolveHierarchy(file, chain, fileName) {
  const normFile = normalizeArabic(fileName);
  let subject = null;
  let category = null;
  let folderNum = null;
  
  // استثناء المجلد الرئيسي من السلسلة
  const folderNames = chain.filter(f => f !== FOLDER_NAME);
  
  // 1. تحديد المادة من أسماء المجلدات
  for (let i = 0; i < folderNames.length; i++) {
    const fNorm = normalizeArabic(folderNames[i]);
    const subKeys = Object.keys(SUBJECT_CONFIG);
    for (let k = 0; k < subKeys.length; k++) {
      const key = subKeys[k];
      const kws = SUBJECT_CONFIG[key].keywords;
      if (kws.some(kw => fNorm.indexOf(kw) !== -1)) {
        subject = key;
        break;
      }
    }
    if (subject) break;
  }
  
  // 2. إذا لم تحدد المادة من المجلدات، يتم تحديدها من اسم الملف
  if (!subject) {
    const subKeys = Object.keys(SUBJECT_CONFIG);
    for (let k = 0; k < subKeys.length; k++) {
      const key = subKeys[k];
      const kws = SUBJECT_CONFIG[key].keywords;
      if (kws.some(kw => normFile.indexOf(kw) !== -1)) {
        subject = key;
        break;
      }
    }
  }
  
  if (!subject) {
    return { isAcademic: false };
  }
  
  // 3. تحديد القسم (محاضرات / سكاشن)
  for (let i = 0; i < folderNames.length; i++) {
    const fNorm = normalizeArabic(folderNames[i]);
    if (fNorm.indexOf('سكشن') !== -1 || fNorm.indexOf('سكاشن') !== -1 || fNorm.indexOf('عملي') !== -1 || fNorm.indexOf('sec') !== -1) {
      category = 'سكاشن';
      break;
    } else if (fNorm.indexOf('محاضر') !== -1 || fNorm.indexOf('نظري') !== -1 || fNorm.indexOf('lec') !== -1) {
      category = 'محاضرات';
      break;
    }
  }
  if (!category) {
    if (normFile.indexOf('سكشن') !== -1 || normFile.indexOf('سكاشن') !== -1 || normFile.indexOf('عملي') !== -1) {
      category = 'سكاشن';
    } else {
      category = 'محاضرات';
    }
  }
  
  // 4. تحديد رقم المحاضرة أو السكشن
  // استثناء مجلد المادة من فحص الأرقام
  const unitFolders = folderNames.filter(f => {
    const fn = normalizeArabic(f);
    return !Object.values(SUBJECT_CONFIG).some(conf => conf.keywords.some(kw => fn.indexOf(kw) !== -1));
  });
  
  for (let i = unitFolders.length - 1; i >= 0; i--) {
    const m = unitFolders[i].match(/(?:محاضرة|محاضره|سكشن|lec|sec|unit)?\s*(\d+)/i);
    if (m && m[1]) {
      folderNum = parseInt(m[1], 10);
      break;
    }
  }
  if (folderNum === null) {
    const m = fileName.match(/(?:محاضرة|محاضره|سكشن|lec|sec|unit)?\s*(\d+)/i);
    if (m && m[1]) {
      folderNum = parseInt(m[1], 10);
    } else {
      folderNum = 1;
    }
  }
  
  // 5. تحديد نوع الملف (المصدر / شرح / تلخيص / خريطة ذهنية)
  let format = 'المصدر';
  if (normFile.indexOf('شرح') !== -1 || normFile.indexOf('تفريغ') !== -1 || normFile.indexOf('note') !== -1) {
    format = 'شرح';
  } else if (normFile.indexOf('تلخيص') !== -1 || normFile.indexOf('ملخص') !== -1 || normFile.indexOf('summary') !== -1) {
    format = 'تلخيص';
  } else if (normFile.indexOf('خريطه') !== -1 || normFile.indexOf('ذهنيه') !== -1 || normFile.indexOf('mindmap') !== -1) {
    format = 'خريطه ذهنية';
  }
  
  return {
    isAcademic: true,
    subject: subject,
    category: category,
    folderNum: folderNum,
    format: format
  };
}

// دالة فحص وتجميع جميع الملفات داخل مجلد الدرايف مع مساراتها
function scanDriveFolderRecursively(folder, currentChain, fileMap) {
  const chain = currentChain.concat([folder.getName()]);
  const files = folder.getFiles();
  while (files.hasNext()) {
    const f = files.next();
    if (!f.isTrashed()) {
      fileMap[f.getId()] = {
        file: f,
        parentFolder: folder,
        chain: chain
      };
    }
  }
  const subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    const sub = subFolders.next();
    if (!sub.isTrashed()) {
      scanDriveFolderRecursively(sub, chain, fileMap);
    }
  }
}

// دالة التأكد من وجود الملف داخل هيكل منظم في الدرايف
function ensureFileInOrganizedFolder(file, rootFolder, meta) {
  try {
    const subConf = SUBJECT_CONFIG[meta.subject];
    const subFolder = getOrCreateSubfolder(rootFolder, subConf.folderName);
    const catFolder = getOrCreateSubfolder(subFolder, meta.category);
    const unitPrefix = meta.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
    const targetFolder = getOrCreateSubfolder(catFolder, unitPrefix + ' ' + meta.folderNum);
    
    const parents = file.getParents();
    let alreadyInside = false;
    while (parents.hasNext()) {
      if (parents.next().getId() === targetFolder.getId()) {
        alreadyInside = true;
        break;
      }
    }
    if (!alreadyInside) {
      if (typeof file.moveTo === 'function') {
        file.moveTo(targetFolder);
      } else {
        targetFolder.addFile(file);
      }
    }
  } catch (e) {
    Logger.log('Organize move error: ' + e.message);
  }
}

// المحرك الرئيسي للمزامنة الثنائية (Two-Way Sync Engine)
function syncDriveWithDb(rootFolder) {
  const dbData = readDb(rootFolder);
  const sysRecord = dbData.find(item => item && (item.id === SYS_PUSH_SUBS_ID || item.isSystemMeta));
  
  // 1. تجميع كل الملفات الفعلية الموجودة في درايف حالياً
  const driveFileMap = {};
  scanDriveFolderRecursively(rootFolder, [], driveFileMap);
  
  const updatedList = [];
  const existingIds = new Set();
  
  // 2. الشرط الثاني: عند حذف أي ملف من درايف، يتم استبعاده وحذفه من التطبيق وقاعدة البيانات
  for (let i = 0; i < dbData.length; i++) {
    const rec = dbData[i];
    if (rec.id === SYS_PUSH_SUBS_ID || rec.isSystemMeta) continue;
    
    const fileId = rec.driveFileId || rec.id;
    if (driveFileMap[fileId]) {
      // الملف ما زال موجوداً في درايف: يتم الإبقاء عليه وتحديث مساره
      const driveInfo = driveFileMap[fileId];
      const meta = resolveHierarchy(driveInfo.file, driveInfo.chain, driveInfo.file.getName());
      if (meta.isAcademic) {
        rec.subject = meta.subject;
        rec.category = meta.category;
        rec.folderNum = meta.folderNum;
        rec.format = meta.format;
        rec.doctor = SUBJECT_CONFIG[meta.subject].doctor;
        rec.size = formatBytes(driveInfo.file.getSize());
        rec.externalUrl = driveInfo.file.getUrl();
        rec.fileUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
        updatedList.push(rec);
        existingIds.add(fileId);
      }
    }
    // إذا لم يكن موجوداً في driveFileMap -> يعني أنه حُذف من جوجل درايف، فلا نضيفه لقاعدة البيانات!
  }
  
  // 3. الشرط الأول: عند إضافة أي ملف في مجلد درايف، يتم التعرف عليه وإضافته للتطبيق في نفس المسار
  const driveIds = Object.keys(driveFileMap);
  for (let j = 0; j < driveIds.length; j++) {
    const fId = driveIds[j];
    if (!existingIds.has(fId)) {
      const driveInfo = driveFileMap[fId];
      const f = driveInfo.file;
      const fName = f.getName();
      if (fName === DB_FILE_NAME) continue;
      
      const meta = resolveHierarchy(f, driveInfo.chain, fName);
      if (meta.isAcademic) {
        // التأكد من مشاركة الملف
        try {
          f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        } catch (e) {}
        
        // نقل الملف للمجلد المنظم إن كان في مجلد عام
        ensureFileInOrganizedFolder(f, rootFolder, meta);
        
        const subConf = SUBJECT_CONFIG[meta.subject];
        const newEntry = {
          id: fId,
          driveFileId: fId,
          title: fName.replace(/\.[^/.]+$/, ''),
          subject: meta.subject,
          category: meta.category,
          folderNum: meta.folderNum,
          format: meta.format,
          doctor: subConf.doctor,
          dateAdded: Utilities.formatDate(f.getDateCreated(), 'GMT+2', 'dd MMM yyyy'),
          downloads: 0,
          downloadsCount: 0,
          viewsCount: 0,
          size: formatBytes(f.getSize()),
          externalUrl: f.getUrl(),
          driveUrl: f.getUrl(),
          fileUrl: 'https://drive.google.com/uc?export=download&id=' + fId,
          description: 'ملف (' + meta.format + ') خاص بـ ' + (meta.category === 'محاضرات' ? 'المحاضرة' : 'السكشن') + ' رقم (' + meta.folderNum + ') في مقرر ' + subConf.fullName + '.',
          keypoints: [meta.format + ' معتمد لـ ' + (meta.category === 'محاضرات' ? 'المحاضرة' : 'السكشن') + ' رقم (' + meta.folderNum + ')'],
          clinicalNote: '',
          isCompleted: false,
          isSaved: false,
          term: 'الترم الاول'
        };
        updatedList.unshift(newEntry);
        existingIds.add(fId);
      }
    }
  }
  
  // 4. حفظ قاعدة البيانات المحدثة المتطابقة تماماً مع درايف
  const finalDatabase = [];
  if (sysRecord) {
    finalDatabase.push(sysRecord);
  } else {
    finalDatabase.push({ id: SYS_PUSH_SUBS_ID, isSystemMeta: true, title: 'System Push Subscriptions', subs: [] });
  }
  for (let k = 0; k < updatedList.length; k++) {
    finalDatabase.push(updatedList[k]);
  }
  writeDb(rootFolder, finalDatabase);
  return updatedList;
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return 'PDF • معتمد';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// دالة التشغيل اليدوي للتنظيم الفوري
function organizeAndSyncLibrary() {
  const root = getOrCreateFolder();
  const list = syncDriveWithDb(root);
  Logger.log('تمت المزامنة الثنائية بنجاح! عدد الملفات الأكاديمية: ' + list.length);
  return { ok: true, count: list.length, files: list };
}

// نقطة الاتصال GET: تقوم بالمزامنة اللحظية مع درايف وإرجاع أحدث قائمة للموقع
function doGet(e) {
  const folder = getOrCreateFolder();
  // مزامنة فورية مع درايف عند كل طلب من الموقع
  const syncedFiles = syncDriveWithDb(folder);
  return ContentService.createTextOutput(JSON.stringify({ ok: true, files: syncedFiles }))
    .setMimeType(ContentService.MimeType.JSON);
}

// نقطة الاتصال POST: لحفظ وتعديل وحذف الملفات
function doPost(e) {
  const folder = getOrCreateFolder();
  let files = readDb(folder);
  let body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (body.action === 'sync') {
    const list = syncDriveWithDb(folder);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, files: list }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // رفع أو نشر ملف جديد من الموقع
  if (body.action === 'save' && body.item) {
    if (body.fileUpload && body.fileUpload.base64) {
      const bytes = Utilities.base64Decode(body.fileUpload.base64);
      const blob = Utilities.newBlob(bytes, body.fileUpload.mimeType, body.fileUpload.name);
      const driveFile = folder.createFile(blob);
      driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      body.item.externalUrl = driveFile.getUrl();
      body.item.driveFileId = driveFile.getId();
    }
    const idx = files.findIndex(f => f.id === body.item.id);
    if (idx >= 0) files[idx] = body.item; else files.unshift(body.item);
    writeDb(folder, files);
  } 
  // الشرط الثالث: عند حذف ملف من التطبيق يتم حذفه ونقله لسلة مهملات جوجل درايف
  else if (body.action === 'delete' && body.id) {
    try {
      const driveFile = DriveApp.getFileById(body.id);
      if (driveFile) {
        driveFile.setTrashed(true); // نقل الملف الفعلي في درايف لسلة المهملات
      }
    } catch (trashErr) {
      Logger.log("Drive trash error: " + trashErr.message);
    }
    files = files.filter(f => f.id !== body.id && f.driveFileId !== body.id);
    writeDb(folder, files);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ ok: true, files: files }))
    .setMimeType(ContentService.MimeType.JSON);
}

// دالة لإنشاء مؤقت فحص آلي في الخلفية كل 5 دقائق
function setupAutoSyncTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'organizeAndSyncLibrary') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('organizeAndSyncLibrary')
    .timeBased()
    .everyMinutes(5)
    .create();
  Logger.log('تم تفعيل مؤقت المزامنة التلقائية كل 5 دقائق بنجاح!');
}
