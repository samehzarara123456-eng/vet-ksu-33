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
---
1.باطنة
2.توليد
3.جراحة
4.دواجن
5.صحة
6.لحوم
7.مشتركة
8.معدية
## ⚙️ بنية النظام وقاعدة البيانات (System Architecture)
- **استضافة الواجهة**: مستودع GitHub عبر GitHub Pages.
- **قاعدة البيانات السحابية**: مجلد Google Drive باسم `VET_KSU_33_Library` يحتوي على ملف قاعدة البيانات `vet33_database.json` ومجلدات الملفات المرفوعة.
- **وسيط المزامنة والـ API**: خادم سحابي خفيف بدون خادم (Serverless) عبر **Google Apps Script** (`Code.gs`) يتولى عمليات القراءة (`doGet`) والحفظ والرفع والحذف (`doPost`).
- **المزامنة والعمل بدون اتصال (Offline-First)**:
  - يقوم الـ Service Worker (`sw.js`) بحفظ هيكل المنصة في الكاش المحلي (`vet33-pwa-cache-v30`).
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

## 📂 محتويات المستودع وهيكل المشروع (Repository Structure)
```text
├── assets/
│   ├── icons/            # أيقونات المتصفح والتطبيق (Favicon, App Icon, PWA Icons)
│   ├── images/           # خلفيات المنصة الرسمية (bg.jpg)
│   └── videos/           # مقاطع الفيديو الترحيبية (1031.mp4)
├── css/
│   └── style.css         # التنسيقات المخصصة والمؤثرات السيبرانية الزجاجية
├── js/
│   └── app.js            # المنطق البرمجي، قاعدة البيانات، والتحكم في الواجهة
├── index.html            # الهيكل البنائي الرئيسي للمنصة (HTML5 نظيف ومنظم)
├── sw.js                 # مشغل الخدمة (Service Worker v33) للكاش والأوفلاين
├── manifest.json         # إعدادات تطبيق الويب التقدمي (PWA Manifest)
└── README.md             # الدليل التوثيقي الشامل للمشروع
```

---

<p align="center">
  <b>صنع بكل فخر لخدمة أطباء بيطري كفر الشيخ المستقبلين 🎓</b><br>
  Seniors 2027 — VET-KSU 33
</p>
