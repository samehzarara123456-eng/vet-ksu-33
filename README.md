# Seniors 2027 VET-KSU 33 Old List 🐾
### المكتبة الرقمية للمحاضرات والسكاشن — كلية الطب البيطري جامعة كفر الشيخ

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-emerald?style=for-the-badge&logo=github)](https://samehzarara123456-eng.github.io/vet-ksu-33/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready%20%26%20Installable-amber?style=for-the-badge&logo=pwa)](https://samehzarara123456-eng.github.io/vet-ksu-33/)
[![Database](https://img.shields.io/badge/Database-Google%20Drive-blue?style=for-the-badge&logo=googledrive)](https://drive.google.com)

منصة وتطبيق ويب تقدمي (PWA) مصمم خصيصاً لطلاب دفعة **Seniors 2027 (الفرقة الخامسة - اللائحة القديمة)** بكلية الطب البيطري - جامعة كفر الشيخ، لتنظيم وتصفح وتحميل المحاضرات والسكاشن والملخصات والخرائط الذهنية لجميع المقررات الدراسية الثمانية بسهولة وسرعة، مع دعم العمل بدون إنترنت (Offline Mode).

---

## 🌐 الرابط المباشر للمنصة (Live Website)
**[https://samehzarara123456-eng.github.io/vet-ksu-33/](https://samehzarara123456-eng.github.io/vet-ksu-33/)**

---

## 📚 المقررات الدراسية الثمانية (Subjects)
تم تنظيم المقررات بنفس الترتيب الأكاديمي المعتمد:
1. **الأمراض الباطنة الإكلينيكية (Internal Medicine)** — قسم طب الحيوان (`batna`)
2. **التوليد والتناسل والتلقيح الاصطناعي (Theriogenology)** — قسم التوليد والتناسل (`tawleed`)
3. **الجراحة والتخدير والأشعة (Surgery & Radiology)** — قسم الجراحة والتخدير والأشعة (`geraha`)
4. **أمراض الدواجن والأرانب (Poultry Diseases)** — قسم أمراض الدواجن (`dawagen`)
5. **الصحة والطب الوقائي ورعاية الحيوان (Animal Hygiene)** — قسم الصحة والطب الوقائي (`seha`)
6. **الرقابة الصحية على اللحوم ومنتجاتها (Meat Hygiene)** — قسم مراقبة الأغذية (`lahma`)
7. **الأمراض المشتركة (Zoonoses)** — قسم الأمراض المشتركة (`moshtaraka`)
8. **الأمراض المعدية والوبائية (Infectious Diseases)** — قسم الأمراض المعدية (`moadya`)

---

## ⚙️ بنية النظام وقاعدة البيانات (System Architecture)
- **استضافة الواجهة**: مستودع GitHub عبر GitHub Pages.
- **قاعدة البيانات السحابية**: مجلد Google Drive باسم `VET_KSU_33_Library` يحتوي على ملف قاعدة البيانات `vet33_database.json` ومجلدات الملفات المرفوعة.
- **وسيط المزامنة والـ API**: خادم سحابي خفيف بدون خادم (Serverless) عبر **Google Apps Script** (`Code.gs`) يتولى عمليات القراءة (`doGet`) والحفظ والرفع والحذف (`doPost`).
- **المزامنة والعمل بدون اتصال (Offline-First)**:
  - يقوم الـ Service Worker (`sw.js`) بحفظ هيكل المنصة في الكاش المحلي (`vet33-pwa-cache-v11`).
  - يتم تخزين بيانات المقررات في الذاكرة المحلية (`localStorage`) تلقائياً.
  - يستطيع الطلاب تصفح والبحث في جميع الملفات حتى عند ضعف أو انقطاع شبكة الهاتف داخل الكلية أو المستشفى.

---

## 📱 تثبيت التطبيق على الهاتف (PWA Installation)
- **أجهزة أندرويد (Android)**:
  1. افتح الرابط في متصفح Google Chrome.
  2. اضغط على زر **تثبيت التطبيق** في أعلى الصفحة، أو من قائمة الخيارات (⋮) اختر **"إضافة إلى الشاشة الرئيسية" (Install App / Add to Home screen)**.
- **أجهزة آبل (iOS / iPhone)**:
  1. افتح الرابط في متصفح Safari.
  2. اضغط على زر المشاركة (Share) في الأسفل.
  3. اختر **"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)**.

---

## 🛡️ دليل المشرفين ومسؤولي الدفعة (Admin Gate)
- للدخول إلى وضع المسؤول، اضغط على زر **"بوابة المسؤولين"** وأدخل كود الدخول السري المخصص للدفعة.
- يوفر وضع المسؤول:
  - رفع ونشر ملفات جديدة وحفظها مباشرة في مجلد Google Drive.
  - تعديل وحذف الملفات القائمة مع مزامنتها الفورية في `vet33_database.json`.
  - إرسال إشعارات فورية لهواتف الطلاب المسجلين بالمنصة.

---

## 📂 محتويات المستودع (Repository Structure)
```text
├── index.html          # الصفحة الرئيسية للمنصة والتطبيق (HTML5 + TailwindCSS + Three.js)
├── sw.js               # مشغل الخدمة (Service Worker v11) للكاش الأوفلاين والإشعارات
├── manifest.json       # إعدادات تطبيق الويب التقدمي (PWA Manifest)
├── favicon.svg         # أيقونة الموقع للمتصفح
├── icon-192.svg        # أيقونة التطبيق بدقة 192x192
├── icon-512.svg        # أيقونة التطبيق بدقة 512x512
└── README.md           # الدليل التوثيقي للمشروع
```

---

<p align="center">
  <b>صنع بكل فخر لخدمة أطباء بيطري كفر الشيخ المستقبلين 🎓</b><br>
  Seniors 2027 — VET-KSU 33
</p>
