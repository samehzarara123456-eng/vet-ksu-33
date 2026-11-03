// 1. Exact 8 Subjects Ordered Identically to the User's Screenshots (1Data)
    const ORDERED_SUBJECTS = [
      {
        id: 'batna',
        folderName: 'باطنه',
        displayName: 'الباطنة',
        fullName: 'الأمراض الباطنة الإكلينيكية (Internal Medicine)',
        dateModified: '23 Sept 6:51 pm',
        doctor: 'قسم طب الحيوان (باطنه)',
        icon: 'stethoscope',
        accent: 'cyan',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'tawleed',
        folderName: 'توليد',
        displayName: 'التوليد',
        fullName: 'التوليد والتناسل والتلقيح الاصطناعي (Theriogenology)',
        dateModified: '23 Sept 6:49 pm',
        doctor: 'قسم التوليد والتناسل',
        icon: 'heart-pulse',
        accent: 'amber',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'geraha',
        folderName: 'جراحه',
        displayName: 'الجراحة',
        fullName: 'الجراحة والتخدير والأشعة (Surgery & Radiology)',
        dateModified: '23 Sept 6:51 pm',
        doctor: 'قسم الجراحة والتخدير والأشعة',
        icon: 'scissors',
        accent: 'rose',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'dawagen',
        folderName: 'دواجن',
        displayName: 'الدواجن',
        fullName: 'أمراض الدواجن والأرانب (Poultry Diseases)',
        dateModified: '23 Sept 6:51 pm',
        doctor: 'قسم أمراض الدواجن',
        icon: 'feather',
        accent: 'orange',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'seha',
        folderName: 'صحه',
        displayName: 'الصحة',
        fullName: 'الصحة والطب الوقائي ورعاية الحيوان (Animal Hygiene)',
        dateModified: '23 Sept 6:49 pm',
        doctor: 'قسم الصحة والطب الوقائي',
        icon: 'shield-check',
        accent: 'emerald',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'lahma',
        folderName: 'لحمه',
        displayName: 'اللحوم',
        fullName: 'الرقابة الصحية على اللحوم ومنتجاتها (Meat Hygiene)',
        dateModified: '23 Sept 6:49 pm',
        doctor: 'قسم مراقبة الأغذية (اللحوم)',
        icon: 'beef',
        accent: 'rose',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'moshtaraka',
        folderName: 'مشتركه',
        displayName: 'المشتركة',
        fullName: 'الأمراض المشتركة (Zoonoses)',
        dateModified: '23 Sept 6:49 pm',
        doctor: 'قسم الأمراض المشتركة',
        icon: 'globe-2',
        accent: 'indigo',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      },
      {
        id: 'moadya',
        folderName: 'معديه',
        displayName: 'المعدية',
        fullName: 'الأمراض المعدية والوبائية (Infectious Diseases)',
        dateModified: '23 Sept 6:50 pm',
        doctor: 'قسم الأمراض المعدية',
        icon: 'shield-alert',
        accent: 'purple',
        topics: { 'محاضرات': [], 'سكاشن': [] }
      }
    ];

    const INITIAL_FILES_SNAPSHOT = [
      {
            "id": "file_1793610702359_56s2s82n1",
            "title": "محاضرة 5 باطنه المصدر",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 5,
            "format": "المصدر",
            "adminFormat": "المصدر",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://t.me/c/4313130172/26",
            "fileUrl": "https://t.me/c/4313130172/26",
            "driveUrl": "https://t.me/c/4313130172/26",
            "description": "ملف (المصدر) خاص بـ المحاضرة رقم (5) في مقرر الأمراض الباطنة الإكلينيكية (Internal Medicine).",
            "keypoints": [
                  "المصدر معتمد لـ المحاضرة رقم (5)"
            ],
            "clinicalNote": "",
            "pages": null,
            "size": "PDF • جديد",
            "date": "2026/11/02",
            "dateAdded": "2026/11/02",
            "driveModifiedTime": 1793610704955,
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "isCompleted": false,
            "isSaved": false,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf",
            "title": "محاضرة 5 باطنة تفريغ",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 5,
            "format": "المصدر",
            "adminFormat": "المصدر",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf/view",
            "fileUrl": "https://drive.google.com/file/d/1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf/view",
            "driveUrl": "https://drive.google.com/file/d/1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf/view",
            "description": "ملف (المصدر) خاص بـ المحاضرة رقم (5) في مقرر الأمراض الباطنة الإكلينيكية (Internal Medicine).",
            "keypoints": [
                  "المصدر معتمد لـ المحاضرة رقم (5)"
            ],
            "clinicalNote": "",
            "pages": null,
            "size": "PDF • 785.5 KB",
            "date": "2026/11/02",
            "dateAdded": "2026/11/02",
            "driveModifiedTime": 1793610394084,
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "isCompleted": false,
            "isSaved": false,
            "term": "الترم الاول",
            "driveFileId": "1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf",
            "originalFileName": "محاضرة 5 باطنة تفريغ.pdf",
            "driveObservedName": "محاضرة 5 باطنة تفريغ.pdf",
            "previewUrl": "https://drive.google.com/file/d/1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf/preview",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1arTB0ufyAY2K7u9-0jkDvH6u8koh-gaf"
      },
      {
            "id": "drive_1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ",
            "title": "محاضة 4 باطنة تفريغ",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "المصدر",
            "adminFormat": "المصدر",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ/view",
            "fileUrl": "https://drive.google.com/file/d/1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ/view",
            "driveUrl": "https://drive.google.com/file/d/1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ/view",
            "description": "ملف (المصدر) خاص بـ المحاضرة رقم (4) في مقرر الأمراض الباطنة الإكلينيكية (Internal Medicine).",
            "keypoints": [
                  "المصدر معتمد لـ المحاضرة رقم (4)"
            ],
            "clinicalNote": "",
            "pages": null,
            "size": "PDF • 732 KB",
            "date": "2026/11/02",
            "dateAdded": "2026/11/02",
            "driveModifiedTime": 1793610325919,
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "isCompleted": false,
            "isSaved": false,
            "term": "الترم الاول",
            "driveFileId": "1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ",
            "originalFileName": "محاضة 4 باطنة تفريغ.pdf",
            "driveObservedName": "محاضة 4 باطنة تفريغ.pdf",
            "previewUrl": "https://drive.google.com/file/d/1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ/preview",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1NlGzNUCxkVehgb1u4dJQnRpsSYjWQJoQ"
      },
      {
            "id": "file_1793609428381_pp8jjmlz0",
            "title": "محاضرة 4 باطنه المصدر",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "المصدر",
            "adminFormat": "المصدر",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://t.me/c/4313130172/22",
            "fileUrl": "https://t.me/c/4313130172/22",
            "driveUrl": "https://t.me/c/4313130172/22",
            "description": "ملف (المصدر) خاص بـ المحاضرة رقم (4) في مقرر الأمراض الباطنة الإكلينيكية (Internal Medicine).",
            "keypoints": [
                  "المصدر معتمد لـ المحاضرة رقم (4)"
            ],
            "clinicalNote": "",
            "pages": null,
            "size": "PDF • جديد",
            "date": "2026/11/02",
            "dateAdded": "2026/11/02",
            "driveModifiedTime": 1793609432199,
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "isCompleted": false,
            "isSaved": false,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1EKcknahbR9hZfP8222ONKxaHIV2iPS0_",
            "driveFileId": "1EKcknahbR9hZfP8222ONKxaHIV2iPS0_",
            "title": "محاضرة 1 صحة تلخيص",
            "originalFileName": "محاضرة 1 صحة تلخيص.pdf",
            "driveObservedName": "محاضرة 1 صحة تلخيص.pdf",
            "driveModifiedTime": 1793531770076,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1EKcknahbR9hZfP8222ONKxaHIV2iPS0_/view",
            "fileUrl": "https://drive.google.com/file/d/1EKcknahbR9hZfP8222ONKxaHIV2iPS0_/view",
            "driveUrl": "https://drive.google.com/file/d/1EKcknahbR9hZfP8222ONKxaHIV2iPS0_/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1EKcknahbR9hZfP8222ONKxaHIV2iPS0_",
            "previewUrl": "https://drive.google.com/file/d/1EKcknahbR9hZfP8222ONKxaHIV2iPS0_/preview",
            "size": "PDF • 306.5 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5",
            "driveFileId": "1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5",
            "title": "محاضرة 4 صحة تفريغ",
            "originalFileName": "محاضرة 4 صحة تفريغ.pdf",
            "driveObservedName": "محاضرة 4 صحة تفريغ.pdf",
            "driveModifiedTime": 1793529162312,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "المصدر",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5/view",
            "fileUrl": "https://drive.google.com/file/d/1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5/view",
            "driveUrl": "https://drive.google.com/file/d/1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5",
            "previewUrl": "https://drive.google.com/file/d/1neaU9I3RehfYZXfN47M7DAdU1VWP6QH5/preview",
            "size": "PDF • 750 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh",
            "driveFileId": "1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh",
            "title": "محاضرة 1 لحمة خريطة ذهنية",
            "originalFileName": "محاضرة 1 لحمة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 1 لحمة خريطة ذهنية.png",
            "driveModifiedTime": 1793528441692,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh/view",
            "fileUrl": "https://drive.google.com/file/d/1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh/view",
            "driveUrl": "https://drive.google.com/file/d/1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh",
            "previewUrl": "https://drive.google.com/file/d/1eF3LtCh2cfyJthAgnAyb7BmGLny-6fXh/preview",
            "size": "PNG • 2.5 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_",
            "driveFileId": "1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_",
            "title": "محاضرة 2 صحة تلخيص",
            "originalFileName": "محاضرة 2 صحة تلخيص.pdf",
            "driveObservedName": "محاضرة 2 صحة تلخيص.pdf",
            "driveModifiedTime": 1793526208863,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "تلخيص",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_/view",
            "fileUrl": "https://drive.google.com/file/d/1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_/view",
            "driveUrl": "https://drive.google.com/file/d/1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_",
            "previewUrl": "https://drive.google.com/file/d/1aHCQHdTcDWK_6MTAzp6TcjO81f3MYl1_/preview",
            "size": "PDF • 333 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi",
            "driveFileId": "1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi",
            "title": "محاضرة 3 صحة تلخيص",
            "originalFileName": "محاضرة 3 صحة تلخيص.pdf",
            "driveObservedName": "محاضرة 3 صحة تلخيص.pdf",
            "driveModifiedTime": 1793526207781,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "تلخيص",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi/view",
            "fileUrl": "https://drive.google.com/file/d/1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi/view",
            "driveUrl": "https://drive.google.com/file/d/1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi",
            "previewUrl": "https://drive.google.com/file/d/1HRC7eh7BDgNlScGY90RnlPMakgr5nQJi/preview",
            "size": "PDF • 221.2 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi",
            "driveFileId": "1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi",
            "title": "محاضرة 3 صحة خريطة ذهنية",
            "originalFileName": "محاضرة 3 صحة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 3 صحة خريطة ذهنية.png",
            "driveModifiedTime": 1793526206792,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "خريطه ذهنية",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi/view",
            "fileUrl": "https://drive.google.com/file/d/1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi/view",
            "driveUrl": "https://drive.google.com/file/d/1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi",
            "previewUrl": "https://drive.google.com/file/d/1bRgDSp36Wzdwj82dfW4rzK4y1N9EviHi/preview",
            "size": "PNG • 4.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa",
            "driveFileId": "18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa",
            "title": "محاضرة 2 صحة خريطة زهنية",
            "originalFileName": "محاضرة 2 صحة خريطة زهنية.png",
            "driveObservedName": "محاضرة 2 صحة خريطة زهنية.png",
            "driveModifiedTime": 1793526205759,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "خريطه ذهنية",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa/view",
            "fileUrl": "https://drive.google.com/file/d/18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa/view",
            "driveUrl": "https://drive.google.com/file/d/18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa",
            "previewUrl": "https://drive.google.com/file/d/18EZOZL8uskyb6GjnIsNUcKzO64hcuUNa/preview",
            "size": "PNG • 4.5 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2",
            "driveFileId": "1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2",
            "title": "محاضرة 1 صحة خريطة ذهنية",
            "originalFileName": "محاضرة 1 صحة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 1 صحة خريطة ذهنية.png",
            "driveModifiedTime": 1793526204706,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2/view",
            "fileUrl": "https://drive.google.com/file/d/1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2/view",
            "driveUrl": "https://drive.google.com/file/d/1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2",
            "previewUrl": "https://drive.google.com/file/d/1YN1XMDON8uGW0UufUEk3eD1l4ueDyUr2/preview",
            "size": "PNG • 6 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_138l5lP1nplUgLmuGrTRlosgZy5tBBXVn",
            "driveFileId": "138l5lP1nplUgLmuGrTRlosgZy5tBBXVn",
            "title": "محاضرة 2 لحمة خريطة ذهنية",
            "originalFileName": "محاضرة 2 لحمة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 2 لحمة خريطة ذهنية.png",
            "driveModifiedTime": 1793526203676,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "خريطه ذهنية",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/138l5lP1nplUgLmuGrTRlosgZy5tBBXVn/view",
            "fileUrl": "https://drive.google.com/file/d/138l5lP1nplUgLmuGrTRlosgZy5tBBXVn/view",
            "driveUrl": "https://drive.google.com/file/d/138l5lP1nplUgLmuGrTRlosgZy5tBBXVn/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=138l5lP1nplUgLmuGrTRlosgZy5tBBXVn",
            "previewUrl": "https://drive.google.com/file/d/138l5lP1nplUgLmuGrTRlosgZy5tBBXVn/preview",
            "size": "PNG • 1.7 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm",
            "driveFileId": "1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm",
            "title": "محاضرة 4 صحة خريطة ذهنية",
            "originalFileName": "محاضرة 4 صحة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 4 صحة خريطة ذهنية.png",
            "driveModifiedTime": 1793526201441,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "خريطه ذهنية",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm/view",
            "fileUrl": "https://drive.google.com/file/d/1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm/view",
            "driveUrl": "https://drive.google.com/file/d/1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm",
            "previewUrl": "https://drive.google.com/file/d/1PAoXwz0I8_4PF3ivNm-68_Lr6yVDJ6wm/preview",
            "size": "PNG • 5.6 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1y7EUBY6IEGotmsvzEtArkxOcItpshc71",
            "driveFileId": "1y7EUBY6IEGotmsvzEtArkxOcItpshc71",
            "title": "محاضرة 4 لحمة خريطة ذهنية",
            "originalFileName": "محاضرة 4 لحمة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 4 لحمة خريطة ذهنية.png",
            "driveModifiedTime": 1793526200433,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "خريطه ذهنية",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1y7EUBY6IEGotmsvzEtArkxOcItpshc71/view",
            "fileUrl": "https://drive.google.com/file/d/1y7EUBY6IEGotmsvzEtArkxOcItpshc71/view",
            "driveUrl": "https://drive.google.com/file/d/1y7EUBY6IEGotmsvzEtArkxOcItpshc71/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1y7EUBY6IEGotmsvzEtArkxOcItpshc71",
            "previewUrl": "https://drive.google.com/file/d/1y7EUBY6IEGotmsvzEtArkxOcItpshc71/preview",
            "size": "PNG • 7.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY",
            "driveFileId": "1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY",
            "title": "محاضرة 3 لحمة خريطة ذهنية",
            "originalFileName": "محاضرة 3 لحمة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 3 لحمة خريطة ذهنية.png",
            "driveModifiedTime": 1793526199344,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "خريطه ذهنية",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY/view",
            "fileUrl": "https://drive.google.com/file/d/1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY/view",
            "driveUrl": "https://drive.google.com/file/d/1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY",
            "previewUrl": "https://drive.google.com/file/d/1rOCOOi8hgAYKR__4M9wIezcaVBA8J9oY/preview",
            "size": "PNG • 2.2 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk",
            "driveFileId": "1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk",
            "title": "محاضرة 1 باطنة خريطة ذهنية",
            "originalFileName": "محاضرة 1 باطنة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 1 باطنة خريطة ذهنية.png",
            "driveModifiedTime": 1793526177127,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk/view",
            "fileUrl": "https://drive.google.com/file/d/1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk/view",
            "driveUrl": "https://drive.google.com/file/d/1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk",
            "previewUrl": "https://drive.google.com/file/d/1mieCvb8sthZc7hVOJfcd0kpEd4q1R-Gk/preview",
            "size": "PNG • 7.4 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc",
            "driveFileId": "1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc",
            "title": "محاضرة 2 باطنة خريطة ذهنية",
            "originalFileName": "محاضرة 2 باطنة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 2 باطنة خريطة ذهنية.png",
            "driveModifiedTime": 1793526176067,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "خريطه ذهنية",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc/view",
            "fileUrl": "https://drive.google.com/file/d/1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc/view",
            "driveUrl": "https://drive.google.com/file/d/1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc",
            "previewUrl": "https://drive.google.com/file/d/1MYhyc7SjEzNU_V9Ca581MVvv18UNpOMc/preview",
            "size": "PNG • 7.2 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl",
            "driveFileId": "1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl",
            "title": "محاضرة 3 باطنة خريطة ذهنية",
            "originalFileName": "محاضرة 3 باطنة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 3 باطنة خريطة ذهنية.png",
            "driveModifiedTime": 1793526175042,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "خريطه ذهنية",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl/view",
            "fileUrl": "https://drive.google.com/file/d/1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl/view",
            "driveUrl": "https://drive.google.com/file/d/1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl",
            "previewUrl": "https://drive.google.com/file/d/1b8njhdV2ak22ewY0PEDQHxGV3WUOg3gl/preview",
            "size": "PNG • 9.6 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4",
            "driveFileId": "1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4",
            "title": "محاضرة 1 توليد خريطة ذهنية",
            "originalFileName": "محاضرة 1 توليد خريطة ذهنية.png",
            "driveObservedName": "محاضرة 1 توليد خريطة ذهنية.png",
            "driveModifiedTime": 1793526103064,
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم التوليد والتناسل",
            "externalUrl": "https://drive.google.com/file/d/1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4/view",
            "fileUrl": "https://drive.google.com/file/d/1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4/view",
            "driveUrl": "https://drive.google.com/file/d/1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4",
            "previewUrl": "https://drive.google.com/file/d/1Ht1ELHgipGP6oC8ps-O7H4I1dc-VBRV4/preview",
            "size": "PNG • 6.7 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC",
            "driveFileId": "1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC",
            "title": "محاضرة 1 جراحة خريطة ذهنية",
            "originalFileName": "محاضرة 1 جراحة خريطة ذهنية.png",
            "driveObservedName": "محاضرة 1 جراحة خريطة ذهنية.png",
            "driveModifiedTime": 1793524292372,
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم الجراحة والتخدير والأشعة",
            "externalUrl": "https://drive.google.com/file/d/1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC/view",
            "fileUrl": "https://drive.google.com/file/d/1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC/view",
            "driveUrl": "https://drive.google.com/file/d/1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC",
            "previewUrl": "https://drive.google.com/file/d/1XI1yBwZZ5lwB6ZzwsGjf3vJDYuKXjqwC/preview",
            "size": "PNG • 6.3 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_10OgozUaTkRGcNmCHVpyEERVF87_O4jgj",
            "driveFileId": "10OgozUaTkRGcNmCHVpyEERVF87_O4jgj",
            "title": "محاضرة 1 دواجن شرح",
            "originalFileName": "محاضرة 1 دواجن شرح.pdf",
            "driveObservedName": "محاضرة 1 دواجن شرح.pdf",
            "driveModifiedTime": 1793523047474,
            "subject": "dawagen",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم أمراض الدواجن",
            "externalUrl": "https://drive.google.com/file/d/10OgozUaTkRGcNmCHVpyEERVF87_O4jgj/view",
            "fileUrl": "https://drive.google.com/file/d/10OgozUaTkRGcNmCHVpyEERVF87_O4jgj/view",
            "driveUrl": "https://drive.google.com/file/d/10OgozUaTkRGcNmCHVpyEERVF87_O4jgj/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=10OgozUaTkRGcNmCHVpyEERVF87_O4jgj",
            "previewUrl": "https://drive.google.com/file/d/10OgozUaTkRGcNmCHVpyEERVF87_O4jgj/preview",
            "size": "PDF • 665.4 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY",
            "driveFileId": "1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY",
            "title": "محاضرة 1 دواجن تلخيص",
            "originalFileName": "محاضرة 1 دواجن تلخيص.pdf",
            "driveObservedName": "محاضرة 1 دواجن تلخيص.pdf",
            "driveModifiedTime": 1793523046750,
            "subject": "dawagen",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم أمراض الدواجن",
            "externalUrl": "https://drive.google.com/file/d/1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY/view",
            "fileUrl": "https://drive.google.com/file/d/1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY/view",
            "driveUrl": "https://drive.google.com/file/d/1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY",
            "previewUrl": "https://drive.google.com/file/d/1qdsRhfyeLxxQtnEr-3D0uiB0rF17JaIY/preview",
            "size": "PDF • 300.1 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1YGc3kzEwifotOxMH0u94HIn_zMG27cPy",
            "driveFileId": "1YGc3kzEwifotOxMH0u94HIn_zMG27cPy",
            "title": "محاضرة 1 صحة شرح",
            "originalFileName": "محاضرة 1 صحة شرح.pdf",
            "driveObservedName": "محاضرة 1 صحة شرح.pdf",
            "driveModifiedTime": 1793523044478,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1YGc3kzEwifotOxMH0u94HIn_zMG27cPy/view",
            "fileUrl": "https://drive.google.com/file/d/1YGc3kzEwifotOxMH0u94HIn_zMG27cPy/view",
            "driveUrl": "https://drive.google.com/file/d/1YGc3kzEwifotOxMH0u94HIn_zMG27cPy/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1YGc3kzEwifotOxMH0u94HIn_zMG27cPy",
            "previewUrl": "https://drive.google.com/file/d/1YGc3kzEwifotOxMH0u94HIn_zMG27cPy/preview",
            "size": "PDF • 16.6 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2",
            "driveFileId": "1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2",
            "title": "محاضرة 2 صحة شرح",
            "originalFileName": "محاضرة 2 صحة شرح.pdf",
            "driveObservedName": "محاضرة 2 صحة شرح.pdf",
            "driveModifiedTime": 1793523041513,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "شرح",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2/view",
            "fileUrl": "https://drive.google.com/file/d/1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2/view",
            "driveUrl": "https://drive.google.com/file/d/1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2",
            "previewUrl": "https://drive.google.com/file/d/1Rfg5NMNlXB8tmQ9I-uxWLoYMtL_wCNb2/preview",
            "size": "PDF • 12.5 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB",
            "driveFileId": "1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB",
            "title": "محاضرة 3 صحة شرح",
            "originalFileName": "محاضرة 3 صحة شرح.pdf",
            "driveObservedName": "محاضرة 3 صحة شرح.pdf",
            "driveModifiedTime": 1793523038171,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "شرح",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB/view",
            "fileUrl": "https://drive.google.com/file/d/1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB/view",
            "driveUrl": "https://drive.google.com/file/d/1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB",
            "previewUrl": "https://drive.google.com/file/d/1tOqeDcI4QeZGbac6v8LzA53vMi0i3IqB/preview",
            "size": "PDF • 14.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu",
            "driveFileId": "13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu",
            "title": "محاضره 1 لحمه شرح",
            "originalFileName": "محاضره 1 لحمه شرح.pdf",
            "driveObservedName": "محاضره 1 لحمه شرح.pdf",
            "driveModifiedTime": 1793523034221,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu/view",
            "fileUrl": "https://drive.google.com/file/d/13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu/view",
            "driveUrl": "https://drive.google.com/file/d/13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu",
            "previewUrl": "https://drive.google.com/file/d/13dn4tqEdMkUW3aqE2Vx-lOwOBhWPUpfu/preview",
            "size": "PDF • 2 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe",
            "driveFileId": "1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe",
            "title": "محاضره 1 جراحه شرح",
            "originalFileName": "محاضره 1 جراحه شرح.pdf",
            "driveObservedName": "محاضره 1 جراحه شرح.pdf",
            "driveModifiedTime": 1793523031902,
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم الجراحة والتخدير والأشعة",
            "externalUrl": "https://drive.google.com/file/d/1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe/view",
            "fileUrl": "https://drive.google.com/file/d/1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe/view",
            "driveUrl": "https://drive.google.com/file/d/1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe",
            "previewUrl": "https://drive.google.com/file/d/1eGQ6orZfX8g2EkgxhpdpemeFpk6di1xe/preview",
            "size": "PDF • 12 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF",
            "driveFileId": "1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF",
            "title": "محاضره 1 جراحه تلخيص",
            "originalFileName": "محاضره 1 جراحه تلخيص.pdf",
            "driveObservedName": "محاضره 1 جراحه تلخيص.pdf",
            "driveModifiedTime": 1793523031146,
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم الجراحة والتخدير والأشعة",
            "externalUrl": "https://drive.google.com/file/d/1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF/view",
            "fileUrl": "https://drive.google.com/file/d/1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF/view",
            "driveUrl": "https://drive.google.com/file/d/1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF",
            "previewUrl": "https://drive.google.com/file/d/1E1xNTPQQzwtpkf3zgYOCjb2N7PFFlKBF/preview",
            "size": "PDF • 418 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD",
            "driveFileId": "1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD",
            "title": "محاضرة 1 معدية شرح",
            "originalFileName": "محاضرة 1 معدية شرح.pdf",
            "driveObservedName": "محاضرة 1 معدية شرح.pdf",
            "driveModifiedTime": 1793523029574,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD/view",
            "fileUrl": "https://drive.google.com/file/d/1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD/view",
            "driveUrl": "https://drive.google.com/file/d/1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD",
            "previewUrl": "https://drive.google.com/file/d/1AfVaJJLyIwJNfuXLawblkiiJz6Xl-fRD/preview",
            "size": "PDF • 1.9 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC",
            "driveFileId": "1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC",
            "title": "محاضرة 1معدية تلخيص",
            "originalFileName": "محاضرة 1معدية تلخيص.pdf",
            "driveObservedName": "محاضرة 1معدية تلخيص.pdf",
            "driveModifiedTime": 1793523028876,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC/view",
            "fileUrl": "https://drive.google.com/file/d/1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC/view",
            "driveUrl": "https://drive.google.com/file/d/1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC",
            "previewUrl": "https://drive.google.com/file/d/1O70YiliS-BxaZOqpz7vNZI2B3KAPEEXC/preview",
            "size": "PDF • 260.7 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q",
            "driveFileId": "1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q",
            "title": "محاضرة_1_معدية_خريطة_ذهنية",
            "originalFileName": "محاضرة_1_معدية_خريطة_ذهنية.png",
            "driveObservedName": "محاضرة_1_معدية_خريطة_ذهنية.png",
            "driveModifiedTime": 1793523028132,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "خريطه ذهنية",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q/view",
            "fileUrl": "https://drive.google.com/file/d/1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q/view",
            "driveUrl": "https://drive.google.com/file/d/1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q",
            "previewUrl": "https://drive.google.com/file/d/1pe7teA0w2Dvs3gIwkfZ-QNUA-9kru36q/preview",
            "size": "PNG • 4.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz",
            "driveFileId": "1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz",
            "title": "محاضرة 3 معدية شرح",
            "originalFileName": "محاضرة 3 معدية شرح.pdf",
            "driveObservedName": "محاضرة 3 معدية شرح.pdf",
            "driveModifiedTime": 1793523026457,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "شرح",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz/view",
            "fileUrl": "https://drive.google.com/file/d/1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz/view",
            "driveUrl": "https://drive.google.com/file/d/1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz",
            "previewUrl": "https://drive.google.com/file/d/1ieBT8_adCtksOKfmKdfPYwsrTk35K2hz/preview",
            "size": "PDF • 619.4 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH",
            "driveFileId": "1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH",
            "title": "محاضرة 3 معدية تلخيص",
            "originalFileName": "محاضرة 3 معدية تلخيص.pdf",
            "driveObservedName": "محاضرة 3 معدية تلخيص.pdf",
            "driveModifiedTime": 1793523025807,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "تلخيص",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH/view",
            "fileUrl": "https://drive.google.com/file/d/1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH/view",
            "driveUrl": "https://drive.google.com/file/d/1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH",
            "previewUrl": "https://drive.google.com/file/d/1Mq4QlJlpxRGXbsk1qwzVFb1gXIgBGvDH/preview",
            "size": "PDF • 237 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1wtcho-pJydagz-mm9hWxUR044fv-WYP0",
            "driveFileId": "1wtcho-pJydagz-mm9hWxUR044fv-WYP0",
            "title": "محاضرة_3_معدية_خريطة_ذهنية",
            "originalFileName": "محاضرة_3_معدية_خريطة_ذهنية.png",
            "driveObservedName": "محاضرة_3_معدية_خريطة_ذهنية.png",
            "driveModifiedTime": 1793523025090,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "خريطه ذهنية",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1wtcho-pJydagz-mm9hWxUR044fv-WYP0/view",
            "fileUrl": "https://drive.google.com/file/d/1wtcho-pJydagz-mm9hWxUR044fv-WYP0/view",
            "driveUrl": "https://drive.google.com/file/d/1wtcho-pJydagz-mm9hWxUR044fv-WYP0/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1wtcho-pJydagz-mm9hWxUR044fv-WYP0",
            "previewUrl": "https://drive.google.com/file/d/1wtcho-pJydagz-mm9hWxUR044fv-WYP0/preview",
            "size": "PNG • 3.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV",
            "driveFileId": "1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV",
            "title": "محاضرة 5 معدية شرح",
            "originalFileName": "محاضرة 5 معدية شرح.pdf",
            "driveObservedName": "محاضرة 5 معدية شرح.pdf",
            "driveModifiedTime": 1793523023060,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 5,
            "format": "شرح",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV/view",
            "fileUrl": "https://drive.google.com/file/d/1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV/view",
            "driveUrl": "https://drive.google.com/file/d/1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV",
            "previewUrl": "https://drive.google.com/file/d/1LlVbb6zEAGUJQ9l5Ml70UyKmyOP2PgJV/preview",
            "size": "PDF • 3.4 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff",
            "driveFileId": "1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff",
            "title": "محاضرة 5 معدية تلخيص",
            "originalFileName": "محاضرة 5 معدية تلخيص.pdf",
            "driveObservedName": "محاضرة 5 معدية تلخيص.pdf",
            "driveModifiedTime": 1793523022349,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 5,
            "format": "تلخيص",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff/view",
            "fileUrl": "https://drive.google.com/file/d/1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff/view",
            "driveUrl": "https://drive.google.com/file/d/1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff",
            "previewUrl": "https://drive.google.com/file/d/1r5G0XgK15pGHB9StxdjWX1YeEO-0t9Ff/preview",
            "size": "PDF • 287.7 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3",
            "driveFileId": "1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3",
            "title": "محاضرة_5_معدية_خريطة_ذهنية",
            "originalFileName": "محاضرة_5_معدية_خريطة_ذهنية.png",
            "driveObservedName": "محاضرة_5_معدية_خريطة_ذهنية.png",
            "driveModifiedTime": 1793523021637,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 5,
            "format": "خريطه ذهنية",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3/view",
            "fileUrl": "https://drive.google.com/file/d/1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3/view",
            "driveUrl": "https://drive.google.com/file/d/1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3",
            "previewUrl": "https://drive.google.com/file/d/1tAxE2dZdwvo-OekPFv-G6tGmHqHdrhM3/preview",
            "size": "PNG • 5.9 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE",
            "driveFileId": "1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE",
            "title": "محاضرة 3 لحمه شرح",
            "originalFileName": "محاضرة 3 لحمه شرح.pdf",
            "driveObservedName": "محاضرة 3 لحمه شرح.pdf",
            "driveModifiedTime": 1793523019891,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "شرح",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE/view",
            "fileUrl": "https://drive.google.com/file/d/1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE/view",
            "driveUrl": "https://drive.google.com/file/d/1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE",
            "previewUrl": "https://drive.google.com/file/d/1XnpWl_UWTrSmSeDJxLKwIKPWUElCK2FE/preview",
            "size": "PDF • 687.8 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF",
            "driveFileId": "1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF",
            "title": "محاضرة 4 لحمة شرح",
            "originalFileName": "محاضرة 4 لحمة شرح.pdf",
            "driveObservedName": "محاضرة 4 لحمة شرح.pdf",
            "driveModifiedTime": 1793523017020,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "شرح",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF/view",
            "fileUrl": "https://drive.google.com/file/d/1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF/view",
            "driveUrl": "https://drive.google.com/file/d/1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF",
            "previewUrl": "https://drive.google.com/file/d/1ZVvcZwW370aCmMpCCPq75P9IVnBCrUbF/preview",
            "size": "PDF • 1.1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s",
            "driveFileId": "1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s",
            "title": "محاضرة 7 معدية شرح",
            "originalFileName": "محاضرة 7 معدية شرح.pdf",
            "driveObservedName": "محاضرة 7 معدية شرح.pdf",
            "driveModifiedTime": 1793523013924,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 7,
            "format": "شرح",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s/view",
            "fileUrl": "https://drive.google.com/file/d/1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s/view",
            "driveUrl": "https://drive.google.com/file/d/1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s",
            "previewUrl": "https://drive.google.com/file/d/1P_DK5fqENxk3Ivs8rWI4Udl7_0M0NO4s/preview",
            "size": "PDF • 4.3 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1msclPh38-p4hZkzLe8z4jpFhD7l7wT33",
            "driveFileId": "1msclPh38-p4hZkzLe8z4jpFhD7l7wT33",
            "title": "محاضرة 7 معدية تلخيص",
            "originalFileName": "محاضرة 7 معدية تلخيص.pdf",
            "driveObservedName": "محاضرة 7 معدية تلخيص.pdf",
            "driveModifiedTime": 1793523013224,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 7,
            "format": "تلخيص",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1msclPh38-p4hZkzLe8z4jpFhD7l7wT33/view",
            "fileUrl": "https://drive.google.com/file/d/1msclPh38-p4hZkzLe8z4jpFhD7l7wT33/view",
            "driveUrl": "https://drive.google.com/file/d/1msclPh38-p4hZkzLe8z4jpFhD7l7wT33/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1msclPh38-p4hZkzLe8z4jpFhD7l7wT33",
            "previewUrl": "https://drive.google.com/file/d/1msclPh38-p4hZkzLe8z4jpFhD7l7wT33/preview",
            "size": "PDF • 330.8 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl",
            "driveFileId": "1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl",
            "title": "محاضرة_7_معدية_خريطه_ذهنيه",
            "originalFileName": "محاضرة_7_معدية_خريطه_ذهنيه.png",
            "driveObservedName": "محاضرة_7_معدية_خريطه_ذهنيه.png",
            "driveModifiedTime": 1793523012558,
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 7,
            "format": "خريطه ذهنية",
            "doctor": "قسم الأمراض المعدية",
            "externalUrl": "https://drive.google.com/file/d/1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl/view",
            "fileUrl": "https://drive.google.com/file/d/1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl/view",
            "driveUrl": "https://drive.google.com/file/d/1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl",
            "previewUrl": "https://drive.google.com/file/d/1l-vL_hv5GL_45pTqgz4VhU-jvriqnOMl/preview",
            "size": "PNG • 5 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K",
            "driveFileId": "1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K",
            "title": "محاضرة 4 صحة شرح",
            "originalFileName": "محاضرة 4 صحة شرح.pdf",
            "driveObservedName": "محاضرة 4 صحة شرح.pdf",
            "driveModifiedTime": 1793523010208,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "شرح",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K/view",
            "fileUrl": "https://drive.google.com/file/d/1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K/view",
            "driveUrl": "https://drive.google.com/file/d/1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K",
            "previewUrl": "https://drive.google.com/file/d/1u4V2p-g3eTe1mBEPtX5lS3eifwnsZQ_K/preview",
            "size": "PDF • 2.4 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K",
            "driveFileId": "1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K",
            "title": "محاضرة 4 صحة تلخيص",
            "originalFileName": "محاضرة 4 صحة تلخيص.pdf",
            "driveObservedName": "محاضرة 4 صحة تلخيص.pdf",
            "driveModifiedTime": 1793523008454,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "تلخيص",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K/view",
            "fileUrl": "https://drive.google.com/file/d/1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K/view",
            "driveUrl": "https://drive.google.com/file/d/1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K",
            "previewUrl": "https://drive.google.com/file/d/1TsZ6fEJcbuNZAuOe2MIRuJFCe4I4g5_K/preview",
            "size": "PDF • 273.8 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_",
            "driveFileId": "10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_",
            "title": "محاضره 2 لحمة شرح",
            "originalFileName": "محاضره 2 لحمة شرح.pdf",
            "driveObservedName": "محاضره 2 لحمة شرح.pdf",
            "driveModifiedTime": 1793523004185,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "شرح",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_/view",
            "fileUrl": "https://drive.google.com/file/d/10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_/view",
            "driveUrl": "https://drive.google.com/file/d/10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_",
            "previewUrl": "https://drive.google.com/file/d/10WOTOBLA87a8GXiGcEkobfYpOXW_MPn_/preview",
            "size": "PDF • 651.9 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D",
            "driveFileId": "1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D",
            "title": "محاضرة 2 لحمة تلخيص",
            "originalFileName": "محاضرة 2 لحمة تلخيص.pdf",
            "driveObservedName": "محاضرة 2 لحمة تلخيص.pdf",
            "driveModifiedTime": 1793523003419,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "تلخيص",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D/view",
            "fileUrl": "https://drive.google.com/file/d/1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D/view",
            "driveUrl": "https://drive.google.com/file/d/1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D",
            "previewUrl": "https://drive.google.com/file/d/1RuO0jLXAbdU3u5CjaTiYfdJc34o7oU8D/preview",
            "size": "PDF • 178.1 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt",
            "driveFileId": "1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt",
            "title": "محاضره 1 لحمة تلخيص",
            "originalFileName": "محاضره 1 لحمة تلخيص.pdf",
            "driveObservedName": "محاضره 1 لحمة تلخيص.pdf",
            "driveModifiedTime": 1793523001998,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt/view",
            "fileUrl": "https://drive.google.com/file/d/1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt/view",
            "driveUrl": "https://drive.google.com/file/d/1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt",
            "previewUrl": "https://drive.google.com/file/d/1eeQ__6P80z6xAuDTZki1gBnsTfJRzKgt/preview",
            "size": "PDF • 206.2 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63",
            "driveFileId": "1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63",
            "title": "محاضرة 3 لحمة تلخيص",
            "originalFileName": "محاضرة 3 لحمة تلخيص.pdf",
            "driveObservedName": "محاضرة 3 لحمة تلخيص.pdf",
            "driveModifiedTime": 1793523000725,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "تلخيص",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63/view",
            "fileUrl": "https://drive.google.com/file/d/1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63/view",
            "driveUrl": "https://drive.google.com/file/d/1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63",
            "previewUrl": "https://drive.google.com/file/d/1GXNWUwVCSy1l0gxyK44Dn7ljQkRjHs63/preview",
            "size": "PDF • 179.6 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k",
            "driveFileId": "1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k",
            "title": "محاضرة 4 لحمة تلخيص",
            "originalFileName": "محاضرة 4 لحمة تلخيص.pdf",
            "driveObservedName": "محاضرة 4 لحمة تلخيص.pdf",
            "driveModifiedTime": 1793522999820,
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "تلخيص",
            "doctor": "قسم مراقبة الأغذية (اللحوم)",
            "externalUrl": "https://drive.google.com/file/d/1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k/view",
            "fileUrl": "https://drive.google.com/file/d/1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k/view",
            "driveUrl": "https://drive.google.com/file/d/1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k",
            "previewUrl": "https://drive.google.com/file/d/1-kKBNPj4MsHjM6ZPKrDlZBTiJBlFqh2k/preview",
            "size": "PDF • 283.8 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1zba87A2vB_o_J3l3EjunokOXFr7qvXJH",
            "driveFileId": "1zba87A2vB_o_J3l3EjunokOXFr7qvXJH",
            "title": "محاضرة 1 باطنة شرح",
            "originalFileName": "محاضرة 1 باطنة شرح.pdf",
            "driveObservedName": "محاضرة 1 باطنة شرح.pdf",
            "driveModifiedTime": 1793522997613,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1zba87A2vB_o_J3l3EjunokOXFr7qvXJH/view",
            "fileUrl": "https://drive.google.com/file/d/1zba87A2vB_o_J3l3EjunokOXFr7qvXJH/view",
            "driveUrl": "https://drive.google.com/file/d/1zba87A2vB_o_J3l3EjunokOXFr7qvXJH/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1zba87A2vB_o_J3l3EjunokOXFr7qvXJH",
            "previewUrl": "https://drive.google.com/file/d/1zba87A2vB_o_J3l3EjunokOXFr7qvXJH/preview",
            "size": "PDF • 921.7 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ",
            "driveFileId": "1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ",
            "title": "محاضرة 1 باطنة تلخيص",
            "originalFileName": "محاضرة 1 باطنة تلخيص.pdf",
            "driveObservedName": "محاضرة 1 باطنة تلخيص.pdf",
            "driveModifiedTime": 1793522996799,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ/view",
            "fileUrl": "https://drive.google.com/file/d/1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ/view",
            "driveUrl": "https://drive.google.com/file/d/1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ",
            "previewUrl": "https://drive.google.com/file/d/1lniZPbQWBmgOXb3fjvv-56CcwSGOvTfQ/preview",
            "size": "PDF • 317.4 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd",
            "driveFileId": "1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd",
            "title": "محاضره 2 باطنة شرح",
            "originalFileName": "محاضره 2 باطنة شرح.pdf",
            "driveObservedName": "محاضره 2 باطنة شرح.pdf",
            "driveModifiedTime": 1793522995608,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "شرح",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd/view",
            "fileUrl": "https://drive.google.com/file/d/1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd/view",
            "driveUrl": "https://drive.google.com/file/d/1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd",
            "previewUrl": "https://drive.google.com/file/d/1xsrXkZVGDQ0kgGxmFfU8JNNBM3cWFSwd/preview",
            "size": "PDF • 1 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd",
            "driveFileId": "1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd",
            "title": "محاضرة 2 باطنة تلخييص",
            "originalFileName": "محاضرة 2 باطنة تلخييص.pdf",
            "driveObservedName": "محاضرة 2 باطنة تلخييص.pdf",
            "driveModifiedTime": 1793522994862,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "تلخيص",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd/view",
            "fileUrl": "https://drive.google.com/file/d/1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd/view",
            "driveUrl": "https://drive.google.com/file/d/1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd",
            "previewUrl": "https://drive.google.com/file/d/1NX5V1nCtq71TIFQWa5RvKL8ZOwdTqUKd/preview",
            "size": "PDF • 351.4 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo",
            "driveFileId": "1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo",
            "title": "محاضرة 3 باطنه شرح",
            "originalFileName": "محاضرة 3 باطنه شرح.pdf",
            "driveObservedName": "محاضرة 3 باطنه شرح.pdf",
            "driveModifiedTime": 1793522993067,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "شرح",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo/view",
            "fileUrl": "https://drive.google.com/file/d/1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo/view",
            "driveUrl": "https://drive.google.com/file/d/1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo",
            "previewUrl": "https://drive.google.com/file/d/1jx6cE6pp4u20vMl5ley41AUX6Q7zorWo/preview",
            "size": "PDF • 1.2 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz",
            "driveFileId": "18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz",
            "title": "محاضرة 3 باطنة تلخيص",
            "originalFileName": "محاضرة 3 باطنة تلخيص.pdf",
            "driveObservedName": "محاضرة 3 باطنة تلخيص.pdf",
            "driveModifiedTime": 1793522992298,
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 3,
            "format": "تلخيص",
            "doctor": "قسم طب الحيوان (باطنه)",
            "externalUrl": "https://drive.google.com/file/d/18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz/view",
            "fileUrl": "https://drive.google.com/file/d/18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz/view",
            "driveUrl": "https://drive.google.com/file/d/18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz",
            "previewUrl": "https://drive.google.com/file/d/18o9E2u8KvS0pcuU8uWGiL6uaaFSfaEAz/preview",
            "size": "PDF • 335.4 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM",
            "driveFileId": "1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM",
            "title": "محاضرة 1 ولادة شرح",
            "originalFileName": "محاضرة 1 ولادة شرح.pdf",
            "driveObservedName": "محاضرة 1 ولادة شرح.pdf",
            "driveModifiedTime": 1793522990361,
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "شرح",
            "doctor": "قسم التوليد والتناسل",
            "externalUrl": "https://drive.google.com/file/d/1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM/view",
            "fileUrl": "https://drive.google.com/file/d/1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM/view",
            "driveUrl": "https://drive.google.com/file/d/1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM",
            "previewUrl": "https://drive.google.com/file/d/1Y6Wf4whuAp5Tgl5rnj5IfAyzy9wRDYhM/preview",
            "size": "PDF • 4.4 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y",
            "driveFileId": "1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y",
            "title": "محاضرة 1 ولادة تلخيص",
            "originalFileName": "محاضرة 1 ولادة تلخيص.pdf",
            "driveObservedName": "محاضرة 1 ولادة تلخيص.pdf",
            "driveModifiedTime": 1793522989568,
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 1,
            "format": "تلخيص",
            "doctor": "قسم التوليد والتناسل",
            "externalUrl": "https://drive.google.com/file/d/1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y/view",
            "fileUrl": "https://drive.google.com/file/d/1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y/view",
            "driveUrl": "https://drive.google.com/file/d/1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y",
            "previewUrl": "https://drive.google.com/file/d/1Y5v60Li7bx5bpfY_ok06LBTyNWjBp09y/preview",
            "size": "PDF • 321.9 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV",
            "driveFileId": "1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV",
            "title": "محاضرة 2 ولادة شرح",
            "originalFileName": "محاضرة 2 ولادة شرح.pdf",
            "driveObservedName": "محاضرة 2 ولادة شرح.pdf",
            "driveModifiedTime": 1793522987672,
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "شرح",
            "doctor": "قسم التوليد والتناسل",
            "externalUrl": "https://drive.google.com/file/d/1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV/view",
            "fileUrl": "https://drive.google.com/file/d/1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV/view",
            "driveUrl": "https://drive.google.com/file/d/1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV",
            "previewUrl": "https://drive.google.com/file/d/1kiI8_VaSLam9FpI9jzr-msrL6IcK5BMV/preview",
            "size": "PDF • 7.4 MB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx",
            "driveFileId": "1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx",
            "title": "محاضره 2 ولادة تلخيص",
            "originalFileName": "محاضره 2 ولادة تلخيص.pdf",
            "driveObservedName": "محاضره 2 ولادة تلخيص.pdf",
            "driveModifiedTime": 1793522956070,
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "تلخيص",
            "doctor": "قسم التوليد والتناسل",
            "externalUrl": "https://drive.google.com/file/d/1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx/view",
            "fileUrl": "https://drive.google.com/file/d/1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx/view",
            "driveUrl": "https://drive.google.com/file/d/1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx",
            "previewUrl": "https://drive.google.com/file/d/1De9t0TtnTqc-ZW5XJ625IhJ9smbEm1Xx/preview",
            "size": "PDF • 272.1 KB",
            "date": "2026/11/01",
            "dateAdded": "2026/11/01",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6",
            "driveFileId": "1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6",
            "title": "محاضرة 4 صحة",
            "originalFileName": "محاضرة 4 صحة.mp4",
            "driveObservedName": "محاضرة 4 صحة.mp4",
            "driveModifiedTime": 1793359657492,
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "format": "المصدر",
            "doctor": "قسم الصحة والطب الوقائي",
            "externalUrl": "https://drive.google.com/file/d/1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6/view",
            "fileUrl": "https://drive.google.com/file/d/1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6/view",
            "driveUrl": "https://drive.google.com/file/d/1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6",
            "previewUrl": "https://drive.google.com/file/d/1d8WczFEUgLCPkIlG3otYa9X3OV1ye8d6/preview",
            "size": "MP4 • 95.9 MB",
            "date": "2026/10/30",
            "dateAdded": "2026/10/30",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      },
      {
            "id": "drive_1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h",
            "driveFileId": "1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h",
            "title": "محاضرة 2 جراحة شرح",
            "originalFileName": "محاضرة 2 جراحة شرح.pdf",
            "driveObservedName": "محاضرة 2 جراحة شرح.pdf",
            "driveModifiedTime": 1793288627848,
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 2,
            "format": "شرح",
            "doctor": "قسم الجراحة والتخدير والأشعة",
            "externalUrl": "https://drive.google.com/file/d/1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h/view",
            "fileUrl": "https://drive.google.com/file/d/1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h/view",
            "driveUrl": "https://drive.google.com/file/d/1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h/view",
            "downloadUrl": "https://drive.google.com/uc?export=download&id=1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h",
            "previewUrl": "https://drive.google.com/file/d/1PTev_4kJeFdcG-qDEFx7hhFInhm-Nn7h/preview",
            "size": "PDF • 2.6 MB",
            "date": "2026/10/29",
            "dateAdded": "2026/10/29",
            "downloads": 0,
            "downloadsCount": 0,
            "viewsCount": 0,
            "description": "",
            "keypoints": [],
            "clinicalNote": "",
            "pages": null,
            "term": "الترم الاول"
      }
];

    const INITIAL_FOLDERS_SNAPSHOT = [
      {
            "id": "1i-BQetFNrN1Kk0TpBRDxHyxoCzpPyqRV",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1B0SG1otu_U0VSmcZ2F6yGiJUnTy7JVip",
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1lwAGqrqr9WPLyz3TsX0Rokq0YhPRg69u",
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1WUlkARtDcJFBpxjuKIbHSDoiJNp8KgDi",
            "subject": "dawagen",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1-k-otZoBkR0L7dugXXg_sDMRZ0yA7G2w",
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1ph3Keg2qNfP7O0pKr3w80sOZdbp31OGY",
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1pH_DSrS2NmdYLlGdfINsgS8gu-SotLbi",
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 1,
            "name": "محاضرة 1"
      },
      {
            "id": "1IL7E8lOlehjF4_AliHJCyqTtrA_ylpi8",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 2,
            "name": "محاضرة 2"
      },
      {
            "id": "1j62fLNaZth3wyNnQ0skVDWVDwFJjgSQL",
            "subject": "tawleed",
            "category": "محاضرات",
            "folderNum": 2,
            "name": "محاضرة 2"
      },
      {
            "id": "1m_WXnySRIKrK3yBH-hBHpUdGR5R0Xom8",
            "subject": "geraha",
            "category": "محاضرات",
            "folderNum": 2,
            "name": "محاضرة 2"
      },
      {
            "id": "19k84bhCyaLAZUm59NzvHbL4-dBVx21Ty",
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 2,
            "name": "محاضرة 2"
      },
      {
            "id": "1IKJRAhtnjQ8g26ITZn2StJsbenL87fZ1",
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 2,
            "name": "محاضرة 2"
      },
      {
            "id": "15YNsLqFjMfnLcMgt3xrpWTWTVTK1hbxs",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 3,
            "name": "محاضرة 3"
      },
      {
            "id": "1Rehynq0X-P8vFJt8TM4HPRC1z_zgvOQ0",
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 3,
            "name": "محاضرة 3"
      },
      {
            "id": "14d8SWLhDndVTKD8arMRzJ4La3zEGUJND",
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 3,
            "name": "محاضرة 3"
      },
      {
            "id": "19MO8t-njqUVpmSCuG8gzfI7qcttmcLay",
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 3,
            "name": "محاضرة 3"
      },
      {
            "id": "1eurtzGymo0yOK5YgVFA4JCWTn6-k1GJN",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 4,
            "name": "محاضرة 4"
      },
      {
            "id": "13grCKf32-APVkqXn_J48T-N_OetuOy2S",
            "subject": "seha",
            "category": "محاضرات",
            "folderNum": 4,
            "name": "محاضرة 4"
      },
      {
            "id": "1tyGy3XJMoEYxf0MDdj1DzFbyKLL1KaUh",
            "subject": "lahma",
            "category": "محاضرات",
            "folderNum": 4,
            "name": "محاضرة 4"
      },
      {
            "id": "1Pe0FSUsQ_W1b2myFB0rrQnkNWRvqgnsl",
            "subject": "batna",
            "category": "محاضرات",
            "folderNum": 5,
            "name": "محاضرة 5"
      },
      {
            "id": "1ZertboYonhbOpfKUL2AQ8vPFuUck7_Nj",
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 5,
            "name": "محاضرة 5"
      },
      {
            "id": "1wFIub58Mlumb9oRN4GgUg_yvbgNFp6-V",
            "subject": "moadya",
            "category": "محاضرات",
            "folderNum": 7,
            "name": "محاضرة 7"
      }
];

    function generateDefaultFilesDatabase() {
      return INITIAL_FILES_SNAPSHOT.map(f => Object.assign({}, f));
    }

    function generateDefaultFoldersDatabase() {
      return INITIAL_FOLDERS_SNAPSHOT.map(fl => Object.assign({}, fl));
    }

    // Google Apps Script Web App URL (Connected to Google Drive Database)
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjlsN__9eXZvIuGLMJW0rCcpCiggFIdzdatlVXKuAy-34wGQN4b0k2iNSkP1SBI8S54A/exec';

    // 3. Application State Management (Connected to Google Drive + Local Cache Fallback)
    const appState = {
      currentView: 'explorer',
      previousHierarchy: null,
      files: [],
      folders: [],
      savedIds: [],
      completedIds: [],
      seenNotificationIds: [],
      notifiedPushFileIds: [],
      knownFileIdsOnLoad: new Set(),
      hasInitializedRemote: false,
      currentSubject: null,
      currentCategory: null,
      currentFolderNum: null,
      onlySavedFilter: false,
      searchQuery: '',
      layoutMode: 'grid',
      isAdmin: false,
      adminName: 'مسؤول الدفعة',
      adminToken: '',
      is3DEnabled: true,
      
      activePreviewId: null,
      uploadedFileCache: {},
      pendingDownloadsMap: {},
      lastRenderedSignature: '',
      isHandlingPopState: false,
      isSyncing: false,
      deletedFileIds: new Set()
    };

    // Expose appState on window for test harness and global availability
    if (typeof window !== 'undefined') {
      window.appState = appState;
    }

    // Play a gentle notification chime using Web Audio API
    function playNotificationChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } catch (e) {}
    }

    const ADMIN_PASSCODE_HASHES = ["0643799174995559", "ea9b3768d5fb77e8", "ce67dfc0bfb928fe", "c1acda7163742c9b", "2afb2a3e63add4dc"];
    const VAPID_PUBLIC_KEY = 'BBe2gBt8gJLkBd1A18PTct2lU5Z7hvEIYHCZsJGpoAxbE87icx-JptMv6X_MreSsSy_msKURSS-bgmbxlt3YJpA';
    const VAPID_KEY_ENC = 'eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6IkY3YUFHM3lBa3VRRjNVRFh3OU55M2FWVGxudUc4UWhnY0ptd2thbWdERnMiLCJ5IjoiRTg3aWN4LUpwdE12NlhfTXJlU3NTeV9tc0tVUlNTLWJnbWJ4bHQzWUpwQSIsImQiOiJCMXdpM2FRbmItUkx6Y2QxUWlXOVJFTV9UVklUa0JmNnlBS3o4aVF5QURvIiwiZXh0Ijp0cnVlfQ==';
    function getVapidJwk() { try { return JSON.parse(window.atob(VAPID_KEY_ENC)); } catch (e) { return null; } }
    const SYS_PUSH_SUBS_ID = '_sys_push_subs_v1';
    const SYS_ABOUT_CONTENT_ID = '_sys_about_content_v1';

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function uint8ArrayToBase64Url(bytes) {
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    async function createVapidHeaders(endpointUrl) {
      try {
        const urlObj = new URL(endpointUrl);
        const aud = urlObj.origin;
        const exp = Math.floor(Date.now() / 1000) + (12 * 3600);
        const enc = new TextEncoder();
        const headerB64 = uint8ArrayToBase64Url(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
        const payloadB64 = uint8ArrayToBase64Url(enc.encode(JSON.stringify({ aud: aud, exp: exp, sub: 'mailto:vetksu33@gmail.com' })));
        const unsignedToken = headerB64 + '.' + payloadB64;
        const key = await crypto.subtle.importKey(
          'jwk',
          getVapidJwk(),
          { name: 'ECDSA', namedCurve: 'P-256' },
          false,
          ['sign']
        );
        const sigBuf = await crypto.subtle.sign(
          { name: 'ECDSA', hash: { name: 'SHA-256' } },
          key,
          enc.encode(unsignedToken)
        );
        const jwt = unsignedToken + '.' + uint8ArrayToBase64Url(new Uint8Array(sigBuf));
        return {
          vapid: 'vapid t=' + jwt + ', k=' + VAPID_PUBLIC_KEY,
          webPush: 'WebPush ' + jwt,
          cryptoKey: 'p256ecdsa=' + VAPID_PUBLIC_KEY
        };
      } catch (e) {
        return null;
      }
    }

    // Helper for Issue #4: Reliably post message to active Service Worker even on first visit when controller is null
    async function postMessageToServiceWorker(msg) {
      try {
        if (!('serviceWorker' in navigator)) return;
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(msg);
          return;
        }
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.active) {
          reg.active.postMessage(msg);
        }
      } catch (e) {}
    }

    let isSubscribingPush = false;
    async function subscribeAndSaveWebPush(reg, forceSync = false) {
      if (isSubscribingPush && !forceSync) return null;
      if (!('serviceWorker' in navigator)) return null;
      isSubscribingPush = true;
      try {
        if (!reg) {
          reg = await navigator.serviceWorker.getRegistration();
        }
        if (!reg || !('pushManager' in reg)) return null;
        let sub = await reg.pushManager.getSubscription();
        if (!sub) {
          try {
            sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
          } catch (subErr) {
            // If a stale subscription with old options exists, unsubscribe and retry cleanly
            try {
              const oldSub = await reg.pushManager.getSubscription();
              if (oldSub) await oldSub.unsubscribe();
              sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
              });
            } catch (retryErr) {}
          }
        }
        if (sub) {
          const subJson = sub.toJSON ? sub.toJSON() : JSON.parse(JSON.stringify(sub));
          if (subJson && subJson.endpoint) {
            appState.currentDevicePushEndpoint = subJson.endpoint;
            const existingEndpoints = Array.isArray(appState.pushSubscriptions) ? appState.pushSubscriptions : [];
            const alreadyInList = existingEndpoints.some(s => s && s.endpoint === subJson.endpoint);
            let lastSyncedEp = '';
            try { lastSyncedEp = localStorage.getItem('vet33_push_sub_synced_ep') || ''; } catch (e) {}

            if (forceSync || !alreadyInList || lastSyncedEp !== subJson.endpoint) {
              const filtered = existingEndpoints.filter(s => s && s.endpoint && s.endpoint !== subJson.endpoint);
              const merged = [...filtered, {
                endpoint: subJson.endpoint,
                keys: subJson.keys || {},
                updatedAt: Date.now()
              }].slice(-400);
              appState.pushSubscriptions = merged;
              const sysRecord = {
                id: SYS_PUSH_SUBS_ID,
                isSystemMeta: true,
                title: 'System Push Subscriptions',
                subs: merged
              };
              fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'save', item: sysRecord, file: sysRecord })
              })
                .then(r => r.json())
                .then(d => {
                  if (d && (d.ok || d.status === 'success')) {
                    try { localStorage.setItem('vet33_push_sub_synced_ep', subJson.endpoint); } catch (e) {}
                  }
                })
                .catch(() => {});
            }
          }
        }
        return sub;
      } catch (e) {
        return null;
      } finally {
        isSubscribingPush = false;
      }
    }

    async function triggerBackgroundPushForAllSubscribers(newFile) {
      try {
        // Ensure current device subscription is also registered if notifications are granted
        if ('Notification' in window && Notification.permission === 'granted' && (!appState.pushSubscriptions || appState.pushSubscriptions.length === 0)) {
          await subscribeAndSaveWebPush(null);
        }
        const subs = Array.isArray(appState.pushSubscriptions) ? appState.pushSubscriptions : [];
        const pushTargets = [];
        for (const s of subs) {
          if (!s || !s.endpoint) continue;
          const hdrs = await createVapidHeaders(s.endpoint);
          pushTargets.push({
            endpoint: s.endpoint,
            authorization: hdrs ? hdrs.vapid : '',
            webPushAuth: hdrs ? hdrs.webPush : '',
            cryptoKey: hdrs ? hdrs.cryptoKey : ''
          });
        }
        // Dispatch via GAS_WEB_APP_URL server backend (even if pushTargets is empty, server can read _sys_push_subs_v1 directly)
        fetch(GAS_WEB_APP_URL, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'push_wakeup',
            passcode: 'vetksu33',
            adminToken: appState.adminToken || ADMIN_PASSCODE_HASHES[0],
            fileId: newFile ? newFile.id : '',
            targets: pushTargets
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data && Array.isArray(data.expiredEndpoints) && data.expiredEndpoints.length > 0) {
              appState.pushSubscriptions = (appState.pushSubscriptions || []).filter(
                s => s && s.endpoint && !data.expiredEndpoints.includes(s.endpoint)
              );
            }
          })
          .catch(() => {});
      } catch (e) {}
    }


    let deferredPwaPrompt = null;

    // Ensure valid same-origin manifest.json link (never overwrite with blob: on HTTPS!)
    function initDynamicPwaManifest() {
      try {
        const existingLink = document.querySelector('link[rel="manifest"]');
        if (existingLink && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
          return;
        }
        const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="42" fill="#0f172a"/><rect x="16" y="16" width="160" height="160" rx="32" fill="#10b981" fill-opacity="0.18" stroke="#f59e0b" stroke-width="6"/><text x="96" y="118" font-family="Arial,sans-serif" font-size="68" font-weight="900" fill="#fbbf24" text-anchor="middle">33</text></svg>`;
        const iconDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(iconSvg);
        const manifest = {
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
            { src: iconDataUrl, sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
            { src: iconDataUrl, sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
          ]
        };
        const dataUri = 'data:application/manifest+json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifest));
        if (existingLink) {
          existingLink.href = dataUri;
        } else {
          const link = document.createElement('link');
          link.rel = 'manifest';
          link.href = dataUri;
          document.head.appendChild(link);
        }
      } catch (e) {}
    }

    // Wait for a ServiceWorkerRegistration to have an active worker (up to timeoutMs)
    async function waitForRegistrationActive(reg, timeoutMs = 4500) {
      if (!reg) return null;
      if (reg.active) return reg;

      const worker = reg.installing || reg.waiting;
      if (worker) {
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, timeoutMs);
          worker.addEventListener('statechange', () => {
            if (worker.state === 'activated' || worker.state === 'redundant') {
              clearTimeout(timer);
              resolve();
            }
          });
        });
      }
      return reg.active ? reg : null;
    }

    // Register ./sw.js Service Worker (with cache-busting v=33) and activate background sync + Web Push
    async function registerBackgroundServiceWorker() {
      if (!('serviceWorker' in navigator)) return null;
      if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
        return null;
      }

      try {
        let reg = await navigator.serviceWorker.register('./sw.js?v=40', {
          scope: './',
          updateViaCache: 'none'
        });
        try { await reg.update(); } catch (uErr) {}
        reg = await waitForRegistrationActive(reg, 4500);

        if (reg && reg.active) {
          if (appState.notifiedPushFileIds && appState.notifiedPushFileIds.length > 0) {
            reg.active.postMessage({
              type: 'INIT_SW',
              notifiedIds: appState.notifiedPushFileIds
            });
          }
          if ('periodicSync' in reg) {
            try { await reg.periodicSync.register('vet33-bg-sync', { minInterval: 60 * 1000 }); } catch (e) {}
          }
          if ('sync' in reg) {
            try { await reg.sync.register('vet33-sync-' + Date.now()); } catch (e) {}
          }
          if ('Notification' in window && Notification.permission === 'granted') {
            await subscribeAndSaveWebPush(reg);
          }
          return reg;
        }
      } catch (err) {
        console.warn('SW registration failed:', err);
      }

      try {
        const existing = await navigator.serviceWorker.getRegistration();
        return await waitForRegistrationActive(existing, 2500);
      } catch (e2) {
        return null;
      }
    }

    // Keep background lock when supported without any AudioContext oscillator (prevents audio ducking & media indicator on phones)
    function startMobileBackgroundKeepAlive() {
      try {
        if ('locks' in navigator && navigator.locks && typeof navigator.locks.request === 'function') {
          navigator.locks.request('vet33_bg_notif_lock', { mode: 'shared' }, () => new Promise(() => {}));
        }
      } catch (e) {}
    }


    function markFileAsPushNotified(fileId) {
      if (!fileId) return;
      if (!appState.notifiedPushFileIds.includes(fileId)) {
        appState.notifiedPushFileIds.push(fileId);
        saveAppState();
      }
      appState.knownFileIdsOnLoad.add(fileId);
      postMessageToServiceWorker({
        type: 'INIT_SW',
        notifiedIds: appState.notifiedPushFileIds
      });
    }

    // Show a real notification in the phone's system status bar (Android & iOS / Desktop)
    async function showSystemDeviceNotification(title, body, file) {
      if (!('Notification' in window) || Notification.permission !== 'granted') {
        return false;
      }

      const notifTag = file && file.id ? `vet33-file-${file.id}` : `vet33-test-${Date.now()}`;
      const notifOptions = {
        body: body,
        dir: 'rtl',
        lang: 'ar',
        icon: './assets/icons/icon-192.png',
        badge: './assets/icons/favicon.png',
        tag: notifTag,
        renotify: true,
        requireInteraction: true,
        vibrate: [300, 100, 300, 100, 400],
        data: file ? {
          fileId: file.id,
          subject: file.subject,
          category: file.category,
          folderNum: file.folderNum
        } : {}
      };

      // 1. Primary path for Android / iOS PWA: ServiceWorkerRegistration.showNotification()
      try {
        if ('serviceWorker' in navigator) {
          let reg = await navigator.serviceWorker.getRegistration();
          if (!reg || !reg.active) {
            reg = await registerBackgroundServiceWorker();
          }
          if (reg && reg.active && typeof reg.showNotification === 'function') {
            try {
              await reg.showNotification(title, notifOptions);
              return true;
            } catch (optErr) {
              // Retry with minimal options if device rejects vibrate/tag
              await reg.showNotification(title, { body: body, dir: 'rtl', lang: 'ar' });
              return true;
            }
          }
        }
      } catch (swErr) {
        console.warn('SW showNotification error:', swErr);
      }

      // 2. Fallback path: Standard Notification constructor (works on Desktop; throws Illegal constructor on Android if sw.js is missing)
      try {
        const n = new Notification(title, { body: body, dir: 'rtl', lang: 'ar' });
        n.onclick = () => {
          window.focus();
          if (file) {
            navigateToHierarchy(file.subject, file.category, Number(file.folderNum));
            openPreviewModal(file.id);
          }
        };
        return true;
      } catch (err) {
        showToast('تنبيه للهاتف: يرجى التأكد من رفع النسخة المحدثة من ملف (sw.js) بجانب (index.html) على الاستضافة ثم تحديث الصفحة.', 'warning');
        return false;
      }
    }

    // Send Browser / Device Notification + In-App Alert Banner when a new file is published
    async function sendUserNotificationForFile(file, isFromCurrentAdmin = false) {
      if (!file) return;
      appState.knownFileIdsOnLoad.add(file.id);
      const sub = getSubjectObj(file.subject);
      const unitName = file.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
      const pubDate = file.dateAdded || 'الآن';
      const notifTitle = `🔔 تم نشر (${file.format}) جديد — ${sub.folderName}`;
      const notifBody = `${getCleanFileTitle(file)}
المسار: ${sub.folderName} > ${file.category} > ${unitName} ${file.folderNum}
تاريخ النشر: ${pubDate}`;

      playNotificationChime();
      showToast(`${notifTitle} (${pubDate})`, 'success');

      const didPushToPhone = await showSystemDeviceNotification(notifTitle, notifBody, file);
      if (didPushToPhone) {
        markFileAsPushNotified(file.id);
      }
      updateNotificationsUI();
    }

    // Request Browser / Phone Notification Permission (Calls Notification.requestPermission FIRST to preserve mobile user gesture!)
    async function requestBrowserNotificationPermission() {
      if (location.protocol === 'file:' || location.protocol === 'content:') {
        showToast('أنت تفتح الموقع كملف محلي من الهاتف؛ لكي تظهر الإشعارات في شريط الهاتف الخارجي يجب فتح الموقع عبر رابط ويب (https).', 'warning');
        return;
      }
      if (!('Notification' in window)) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || '');
        if (isIOS) {
          showToast('على أجهزة iPhone: لتفعيل الإشعارات اضغط على زر المشاركة (Share) في Safari ثم اختر "إضافة إلى الصفحة الرئيسية / Add to Home Screen" وافتح التطبيق منها.', 'warning');
        } else {
          showToast('متصفحك الحالي لا يدعم إشعارات الهاتف الخارجية (افتح الرابط في متصفح Chrome أو أضف الموقع للشاشة الرئيسية).', 'warning');
        }
        return;
      }
      try {
        // MUST be called first synchronously inside user tap on mobile browsers
        const perm = await Notification.requestPermission();
        startMobileBackgroundKeepAlive();
        const reg = await registerBackgroundServiceWorker();
        syncBrowserNotifButton();

        if (perm === 'granted') {
          await subscribeAndSaveWebPush(reg, true);
          const pendingFiles = (appState.files || []).filter(f => f && f.id && !appState.notifiedPushFileIds.includes(f.id));
          let pushedAny = false;
          if (pendingFiles.length > 0) {
            for (const pf of pendingFiles.slice(0, 2).reverse()) {
              const ok = await showSystemDeviceNotification(
                `🔔 تم نشر (${pf.format}) جديد — ${getSubjectObj(pf.subject).folderName}`,
                `${getCleanFileTitle(pf)}
تاريخ النشر: ${pf.dateAdded || 'الآن'}`,
                pf
              );
              if (ok) {
                markFileAsPushNotified(pf.id);
                pushedAny = true;
              }
            }
          }
          if (!pushedAny) {
            pushedAny = await showSystemDeviceNotification(
              '🔔 إشعارات الهاتف مفعلة — Seniors 2027 VET-KSU',
              'تصلك الآن إشعارات المحاضرات والسكاشن الجديدة في شريط إشعارات الهاتف العلوي!',
              null
            );
          }
          if (pushedAny) {
            showToast('تم إرسال الإشعار إلى شريط إشعارات هاتفك العلوي بنجاح! اسحب شريط الهاتف لترى الإشعار.', 'success');
          }
        } else if (perm === 'denied') {
          showToast('تم حظر الإشعارات من إعدادات المتصفح! اضغط على علامة القفل بجوار الرابط في المتصفح وفعّل "الإشعارات / Notifications".', 'warning');
        } else {
          showToast('يرجى الضغط على "سماح / Allow" لتصلك الإشعارات في شريط الهاتف.', 'info');
        }
      } catch (e) {
        showToast('تعذر طلب إذن الإشعارات، تأكد من فتح الموقع عبر رابط https في متصفح Chrome.', 'warning');
      }
    }

    function syncBrowserNotifButton() {
      const btnText = document.getElementById('browser-notif-btn-text');
      const btn = document.getElementById('enable-browser-notif-btn');
      const banner = document.getElementById('phone-notif-banner');
      const isGranted = ('Notification' in window && Notification.permission === 'granted');

      if (btnText && btn) {
        if (isGranted) {
          btnText.textContent = 'إشعارات الهاتف مفعلة ✓';
          btn.className = 'px-2.5 py-1.5 rounded-xl bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-[11px] font-extrabold flex items-center gap-1 transition whitespace-nowrap';
        } else {
          btnText.textContent = 'تفعيل إشعارات الهاتف';
        }
      }

      if (banner) {
        banner.classList.toggle('hidden', isGranted);
      }
    }

    // Helper: Escape HTML special characters to prevent Stored / DOM XSS vulnerabilities
    function escapeHTML(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // Render Notifications Center List & Unread Badge
    function updateNotificationsUI() {
      const badge = document.getElementById('notif-unread-badge');
      const listEl = document.getElementById('notifications-list');
      const totalLabel = document.getElementById('notifications-total-label');
      if (!badge || !listEl || !totalLabel) return;

      const allFiles = Array.isArray(appState.files) ? appState.files : [];
      const unreadFiles = allFiles.filter(f => !appState.seenNotificationIds.includes(f.id));

      if (unreadFiles.length > 0) {
        badge.textContent = unreadFiles.length > 99 ? '99+' : String(unreadFiles.length);
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }

      totalLabel.textContent = `${allFiles.length} إشعار منشور`;

      if (allFiles.length === 0) {
        listEl.innerHTML = `
          <div class="text-center py-10 px-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-800/90 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 text-amber-400">
              <i data-lucide="bell-off" class="w-6 h-6"></i>
            </div>
            <p class="text-sm font-extrabold text-white mb-1">لا توجد إشعارات منشورة حتى الآن</p>
            <p class="text-xs text-slate-400">عند قيام المسؤول بنشر أي ملف جديد سيظهر هنا فوراً مع تاريخ ووقت النشر.</p>
          </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
      }

      listEl.innerHTML = allFiles.map(file => {
        const sub = getSubjectObj(file.subject);
        const fmt = getFormatVisuals(file.format);
        const isUnread = !appState.seenNotificationIds.includes(file.id);
        const unitLabel = file.category === 'محاضرات' ? 'محاضرة' : 'سكشن';
        const dateStr = file.dateAdded || 'بتاريخ اليوم';

        return `
          <div data-notif-file-id="${escapeHTML(file.id)}" class="notif-item p-3.5 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${isUnread ? 'bg-amber-500/10 border-amber-500/45 hover:bg-amber-500/15' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}">
            <div class="flex items-start gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${fmt.badgeClass}">
                <i data-lucide="${fmt.icon}" class="w-5 h-5"></i>
              </div>
              <div class="min-w-0 space-y-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  ${isUnread ? `<span class="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">جديد</span>` : ''}
                  <span class="px-2 py-0.5 rounded-lg bg-slate-800 text-amber-300 text-[10px] font-extrabold">${escapeHTML(sub.folderName)} • ${escapeHTML(file.category)} (${unitLabel} ${escapeHTML(file.folderNum)})</span>
                  <span class="px-2 py-0.5 rounded-lg border text-[10px] font-extrabold ${fmt.badgeClass}">${escapeHTML(fmt.label)}</span>
                </div>
                <h4 class="text-xs sm:text-sm font-black text-white truncate">${escapeHTML(getCleanFileTitle(file))}</h4>
                <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-semibold">
                  <span class="flex items-center gap-1 text-emerald-300">
                    <i data-lucide="calendar-clock" class="w-3.5 h-3.5"></i>
                    <span>تاريخ النشر: <strong dir="ltr">${escapeHTML(dateStr)}</strong></span>
                  </span>
                  <span>•</span>
                  <span dir="ltr">${escapeHTML(file.size || '')}</span>
                </div>
              </div>
            </div>
            <div class="shrink-0 flex items-center self-center">
              <span class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-[11px] font-extrabold transition flex items-center gap-1 whitespace-nowrap">
                <span>فتح</span>
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
              </span>
            </div>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.notif-item').forEach(el => {
        el.addEventListener('click', () => {
          const fId = el.getAttribute('data-notif-file-id');
          const targetFile = appState.files.find(f => f.id === fId);
          if (!targetFile) return;
          if (!appState.seenNotificationIds.includes(fId)) {
            appState.seenNotificationIds.push(fId);
            saveAppState();
          }
          document.getElementById('notifications-modal').classList.add('hidden');
          appState.onlySavedFilter = false;
          appState.searchQuery = '';
          navigateToHierarchy(targetFile.subject, targetFile.category, Number(targetFile.folderNum));
          openPreviewModal(targetFile.id);
          updateNotificationsUI();
        });
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function setCloudSyncStatus(state, label) {
      const dot = document.getElementById('cloud-sync-dot');
      const icon = document.getElementById('cloud-sync-icon');
      const text = document.getElementById('cloud-sync-text');
      if (!dot || !icon || !text) return;

      text.textContent = label || 'مزامنة Drive';
      if (state === 'syncing') {
        dot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-ping';
        icon.classList.add('animate-spin');
      } else if (state === 'error') {
        dot.className = 'w-2 h-2 rounded-full bg-rose-400';
        icon.classList.remove('animate-spin');
      } else {
        dot.className = 'w-2 h-2 rounded-full bg-emerald-400';
        icon.classList.remove('animate-spin');
      }
    }

    const MAX_DIRECT_UPLOAD_BYTES = 35 * 1024 * 1024; // ~35 MB max before Base64 (+33%) due to Google Apps Script 50 MB doPost limit

    function readFileAsBase64(fileObj) {
      return new Promise((resolve, reject) => {
        if (fileObj && fileObj.size > MAX_DIRECT_UPLOAD_BYTES) {
          const sizeMb = (fileObj.size / (1024 * 1024)).toFixed(1);
          const limitErr = new Error(`حجم الملف (${sizeMb} ميجابايت) يتجاوز الحد الأقصى للرفع المباشر من الموقع (35 ميجابايت). يرجى رفعه مباشرة من تطبيق Google Drive داخل مجلد المادة وسيظهر تلقائياً.`);
          limitErr.code = 'FILE_TOO_LARGE';
          reject(limitErr);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const result = String(reader.result || '');
          const cleanBase64 = result.includes(',') ? result.split(',')[1] : result;
          const mime = fileObj.type || 'application/octet-stream';
          resolve({
            name: fileObj.name,
            fileName: fileObj.name,
            mimeType: mime,
            type: mime,
            base64: cleanBase64,
            data: cleanBase64,
            dataUrl: result
          });
        };
        reader.onerror = () => reject(new Error('فشل قراءة الملف المرفوع'));
        reader.readAsDataURL(fileObj);
      });
    }

    async function fetchWithTimeout(url, options = {}, timeoutMs = 14000) {
      if (typeof AbortController === 'undefined') {
        return fetch(url, options);
      }
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        return await fetch(url, Object.assign({}, options, { signal: ctrl.signal }));
      } finally {
        clearTimeout(timer);
      }
    }

    function checkPendingNotificationHash() {
      try {
        if (location.hash && location.hash.startsWith('#file=')) {
          const fId = decodeURIComponent(location.hash.replace('#file=', '').trim());
          if (!fId) return;
          const target = (appState.files || []).find(f => f && f.id === fId);
          if (target) {
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', location.pathname + location.search);
            } else {
              location.hash = '';
            }
            navigateToHierarchy(target.subject, target.category, Number(target.folderNum));
            openPreviewModal(target.id);
          }
        }
      } catch (e) {}
    }


    // Map subjects between Version 1 Code.gs (medicine, obstetrics...) and app.js (batna, tawleed...)
    const DRIVE_SUBJECT_TO_APP_ID = {
      'medicine': 'batna', 'الباطنة': 'batna', 'باطنة': 'batna', 'باطنه': 'batna', 'batna': 'batna',
      'obstetrics': 'tawleed', 'التوليد': 'tawleed', 'توليد': 'tawleed', 'ولادة': 'tawleed', 'ولاده': 'tawleed', 'tawleed': 'tawleed',
      'surgery': 'geraha', 'الجراحة': 'geraha', 'جراحة': 'geraha', 'جراحه': 'geraha', 'geraha': 'geraha',
      'poultry': 'dawagen', 'الدواجن': 'dawagen', 'دواجن': 'dawagen', 'dawagen': 'dawagen',
      'hygiene': 'seha', 'الصحة': 'seha', 'صحة': 'seha', 'صحه': 'seha', 'seha': 'seha',
      'meat': 'lahma', 'اللحوم': 'lahma', 'لحوم': 'lahma', 'لحمة': 'lahma', 'لحمه': 'lahma', 'lahma': 'lahma',
      'zoonoses': 'moshtaraka', 'المشتركة': 'moshtaraka', 'مشتركة': 'moshtaraka', 'مشتركه': 'moshtaraka', 'moshtaraka': 'moshtaraka',
      'infectious': 'moadya', 'المعدية': 'moadya', 'معدية': 'moadya', 'معديه': 'moadya', 'moadya': 'moadya'
    };

    function normalizeArabicSearch(str) {
      return String(str || '')
        .toLowerCase()
        .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[\u064B-\u065F_\-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function detectAppFormatFromDriveFile(f) {
      const raw = normalizeArabicSearch((f && (f.format || f.badge || f.type || '')) + ' ' + (f && (f.name || f.title || '')));
      if (raw.includes('خريط') || raw.includes('ذهني') || raw.includes('زهني') || raw.includes('mindmap') || raw.includes('mind')) {
        return 'خريطه ذهنية';
      }
      if (/تلخي+ص/.test(raw) || raw.includes('ملخص') || raw.includes('مختصر') || raw.includes('summary')) {
        return 'تلخيص';
      }
      if (raw.includes('شرح') || raw.includes('تفصيلي') || raw.includes('explanation') || raw.includes('explain')) {
        return 'شرح';
      }
      return 'المصدر';
    }

    function extractNumFromAnyString(str) {
      const s = String(str || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
      const m = s.match(/(\d+)/);
      return m ? parseInt(m[1], 10) : null;
    }

    function normalizeDriveApiPayload(apiResponse) {
      if (!apiResponse) return { files: null, folders: [] };

      // Case 1: Direct array of files
      if (Array.isArray(apiResponse)) {
        return { files: apiResponse, folders: [] };
      }

      // Case 2: Version 2 GasCode response ({ ok: true, files: [...], folders: [...] })
      if (Array.isArray(apiResponse.files)) {
        return {
          files: apiResponse.files,
          folders: Array.isArray(apiResponse.folders) ? apiResponse.folders : []
        };
      }

      // Case 3: Version 1 Code.gs response ({ status: 'success', ok: true, data: { subjects: [...] } })
      const dbData = apiResponse.data || apiResponse;
      if (dbData && Array.isArray(dbData.subjects)) {
        const mappedFiles = [];
        const mappedFolders = [];
        const existingMap = {};
        (appState.files || []).forEach(ef => {
          if (ef && ef.id) existingMap[ef.id] = ef;
          if (ef && ef.driveFileId) existingMap[ef.driveFileId] = ef;
        });

        dbData.subjects.forEach(subj => {
          const appSubId = DRIVE_SUBJECT_TO_APP_ID[subj.id] || DRIVE_SUBJECT_TO_APP_ID[subj.name] || DRIVE_SUBJECT_TO_APP_ID[subj.driveName] || 'batna';
          const subObj = getSubjectObj(appSubId);

          const processTopicsList = (topicsArr, categoryAr) => {
            if (!Array.isArray(topicsArr)) return;
            topicsArr.forEach((topic, tIdx) => {
              const isDirectBucket = String(topic.id || '').endsWith('_direct') || Number(topic.number) === 999;
              const topicNum = !isDirectBucket ? (Number(topic.number) || extractNumFromAnyString(topic.name) || (tIdx + 1)) : null;

              if (!isDirectBucket && topicNum) {
                mappedFolders.push({
                  id: topic.folderId || topic.id,
                  subject: appSubId,
                  category: categoryAr,
                  folderNum: topicNum,
                  name: topic.name || `${categoryAr === 'محاضرات' ? 'محاضرة' : 'سكشن'} ${topicNum}`
                });
              }

              if (Array.isArray(topic.files)) {
                topic.files.forEach(df => {
                  const dId = df.driveFileId || df.id;
                  if (!dId) return;
                  const fNum = topicNum || extractNumFromAnyString(df.name || df.title) || 1;
                  const fmt = detectAppFormatFromDriveFile(df);
                  const extUpper = String(df.extension || (df.name ? df.name.split('.').pop() : 'PDF') || 'PDF').toUpperCase();
                  const sizeLabel = df.sizeFormatted ? `${extUpper} • ${df.sizeFormatted}` : extUpper;
                  const dateIso = df.updatedAt || df.createdAt || new Date().toISOString();
                  let dateStr = '';
                  try {
                    const dObj = new Date(dateIso); dateStr = `${dObj.getFullYear()}/${String(dObj.getMonth() + 1).padStart(2, '0')}/${String(dObj.getDate()).padStart(2, '0')}`;
                  } catch (e) {
                    dateStr = dateIso.slice(0, 10);
                  }
                  const prev = existingMap[dId] || existingMap['drive_' + dId] || {};
                  const cleanRawTitle = String(df.title || df.name || '').replace(/\.[^/.]+$/, '').replace(/\s*-\s*(المصدر|شرح|تلخيص|خريطه ذهنية|خريطة ذهنية)$/i, '').trim();

                  mappedFiles.push({
                    id: 'drive_' + dId,
                    driveFileId: dId,
                    title: cleanRawTitle || df.title || df.name,
                    originalFileName: df.name || df.title,
                    driveModifiedTime: new Date(dateIso).getTime() || Date.now(),
                    subject: appSubId,
                    category: categoryAr,
                    folderNum: Number(fNum) || 1,
                    format: fmt,
                    doctor: prev.doctor || subObj.doctor || 'أعضاء هيئة التدريس',
                    externalUrl: df.viewUrl || ('https://drive.google.com/file/d/' + dId + '/view'),
                    fileUrl: df.viewUrl || ('https://drive.google.com/file/d/' + dId + '/view'),
                    driveUrl: df.viewUrl || ('https://drive.google.com/file/d/' + dId + '/view'),
                    previewUrl: df.previewUrl || ('https://drive.google.com/file/d/' + dId + '/preview'),
                    downloadUrl: df.downloadUrl || ('https://drive.google.com/uc?export=download&id=' + dId),
                    size: sizeLabel,
                    date: dateStr,
                    dateAdded: dateStr,
                    downloads: Number(prev.downloads) || 0,
                    downloadsCount: Number(prev.downloadsCount) || 0,
                    viewsCount: Number(prev.viewsCount) || 0,
                    description: prev.description || '',
                    keypoints: Array.isArray(prev.keypoints) ? prev.keypoints : [],
                    clinicalNote: prev.clinicalNote || '',
                    pages: prev.pages || null,
                    term: 'الترم الاول'
                  });
                });
              }
            });
          };

          processTopicsList(subj.lectures, 'محاضرات');
          processTopicsList(subj.sections, 'سكاشن');
        });

        mappedFiles.sort((a, b) => (b.driveModifiedTime || 0) - (a.driveModifiedTime || 0));
        return { files: mappedFiles, folders: mappedFolders };
      }

      return { files: null, folders: [] };
    }

    // Helper for Issue #7: Preserve optimistic local download increments while background sync is in-flight
    function recordPendingDownloadIncrement(file) {
      if (!file || !file.id) return;
      if (!appState.pendingDownloadsMap) appState.pendingDownloadsMap = {};
      const count = Number(file.downloads) || 0;
      const entry = { count: count, expiresAt: Date.now() + 60000 };
      appState.pendingDownloadsMap[file.id] = entry;
      if (file.driveFileId) {
        appState.pendingDownloadsMap[file.driveFileId] = entry;
      }
    }

    function reconcileRemoteDownloadsWithPending(remoteFiles) {
      if (!Array.isArray(remoteFiles) || !appState.pendingDownloadsMap) return;
      const now = Date.now();
      remoteFiles.forEach(rf => {
        if (!rf || !rf.id) return;
        const pById = appState.pendingDownloadsMap[rf.id];
        const pByDrive = rf.driveFileId ? appState.pendingDownloadsMap[rf.driveFileId] : null;
        const pending = pById || pByDrive;
        if (!pending) return;
        if (now > pending.expiresAt || (Number(rf.downloads) || 0) >= pending.count) {
          delete appState.pendingDownloadsMap[rf.id];
          if (rf.driveFileId) delete appState.pendingDownloadsMap[rf.driveFileId];
        } else {
          rf.downloads = Math.max(Number(rf.downloads) || 0, pending.count);
          rf.downloadsCount = rf.downloads;
        }
      });
    }

    // Helper for Issue #5: Migrate temporary `file_<timestamp>` ID to permanent `drive_<driveFileId>` ID
    function migrateTemporaryFileId(oldTempId, newPermanentId) {
      if (!oldTempId || !newPermanentId || oldTempId === newPermanentId) return;

      loadSavedFilesFromStorage();
      if (appState.savedIds.includes(oldTempId)) {
        appState.savedIds = Array.from(new Set(appState.savedIds.map(id => id === oldTempId ? newPermanentId : id)));
        saveSavedFilesToStorage();
      }

      loadCompletedFilesFromStorage();
      if (appState.completedIds.includes(oldTempId)) {
        appState.completedIds = Array.from(new Set(appState.completedIds.map(id => id === oldTempId ? newPermanentId : id)));
        saveCompletedFilesToStorage();
      }

      if (Array.isArray(appState.seenNotificationIds) && appState.seenNotificationIds.includes(oldTempId)) {
        appState.seenNotificationIds = Array.from(new Set(appState.seenNotificationIds.map(id => id === oldTempId ? newPermanentId : id)));
      }

      if (Array.isArray(appState.notifiedPushFileIds) && appState.notifiedPushFileIds.includes(oldTempId)) {
        appState.notifiedPushFileIds = Array.from(new Set(appState.notifiedPushFileIds.map(id => id === oldTempId ? newPermanentId : id)));
      }

      if (appState.activePreviewId === oldTempId) {
        appState.activePreviewId = newPermanentId;
      }

      if (appState.uploadedFileCache && appState.uploadedFileCache[oldTempId]) {
        appState.uploadedFileCache[newPermanentId] = appState.uploadedFileCache[oldTempId];
        delete appState.uploadedFileCache[oldTempId];
      }

      if (appState.pendingDownloadsMap && appState.pendingDownloadsMap[oldTempId]) {
        appState.pendingDownloadsMap[newPermanentId] = appState.pendingDownloadsMap[oldTempId];
        delete appState.pendingDownloadsMap[oldTempId];
      }
    }

    // Helper for Issue #3: Compute a deterministic signature of files & folders so 15s polling skips DOM rebuilds when unchanged
    function computeDatabaseSignature(files, folders, aboutContent) {
      const fPart = (Array.isArray(files) ? files : []).map(f => {
        if (!f) return '';
        return [
          f.id,
          f.driveFileId || '',
          f.title || '',
          f.subject || '',
          f.category || '',
          f.folderNum || '',
          f.format || '',
          f.doctor || '',
          f.size || '',
          f.date || '',
          f.driveModifiedTime || 0,
          f.downloads || 0,
          f.externalUrl || f.fileUrl || '',
          f.description || '',
          (f.keypoints || []).join(','),
          f.clinicalNote || ''
        ].join('|');
      }).join(';;');

      const flPart = (Array.isArray(folders) ? folders : []).map(fl => {
        if (!fl) return '';
        return `${fl.id || ''}:${fl.subject || ''}:${fl.category || ''}:${fl.folderNum || ''}:${fl.name || ''}`;
      }).join(';;');

      const abtPart = aboutContent ? JSON.stringify(aboutContent) : '';
      return `${fPart}###${flPart}###${abtPart}`;
    }

    let initialSyncRetryCount = 0;
    let hasScheduledDeepDriveScan = false;

    function applyNormalizedRemoteDatabase(normalized, silent = true) {
      if (!normalized || !Array.isArray(normalized.files)) return false;
      const rawRemoteList = normalized.files;
      const nextFolders = (Array.isArray(normalized.folders) && normalized.folders.length > 0)
        ? normalized.folders
        : (appState.folders && appState.folders.length > 0 ? appState.folders : generateDefaultFoldersDatabase());

      const sysSubEntry = rawRemoteList.find(rf => rf && rf.id === SYS_PUSH_SUBS_ID);
      if (sysSubEntry && Array.isArray(sysSubEntry.subs)) {
        appState.pushSubscriptions = sysSubEntry.subs;
      }
      const sysAboutEntry = rawRemoteList.find(rf => rf && rf.id === SYS_ABOUT_CONTENT_ID);
      let nextAboutContent = appState.aboutContent;
      if (sysAboutEntry && sysAboutEntry.aboutContent && typeof sysAboutEntry.aboutContent === 'object') {
        nextAboutContent = { ...DEFAULT_ABOUT_CONTENT, ...sysAboutEntry.aboutContent };
      }

      const remoteFiles = rawRemoteList.filter(rf => {
        if (!rf || !rf.id || rf.isSystemMeta || String(rf.id).startsWith('_sys_')) return false;
        if (appState.deletedFileIds && (appState.deletedFileIds.has(rf.id) || (rf.driveFileId && appState.deletedFileIds.has(rf.driveFileId)))) return false;
        if (!rf.adminFormat) {
          const inferredFmt = detectAppFormatFromDriveFile({ name: rf.originalFileName || rf.title || '' });
          if (rf.format === 'المصدر' && inferredFmt !== 'المصدر') {
            rf.format = inferredFmt;
          }
        }
        return true;
      });

      reconcileRemoteDownloadsWithPending(remoteFiles);

      let wasSeededBefore = false;
      try {
        wasSeededBefore = Boolean(localStorage.getItem('ksu_vet33_pushed_seeded_v2'));
      } catch (e) {}

      if (!wasSeededBefore || appState.notifiedPushFileIds.length === 0) {
        appState.notifiedPushFileIds = Array.from(new Set([...(appState.notifiedPushFileIds || []), ...remoteFiles.map(rf => rf.id)]));
        try { localStorage.setItem('ksu_vet33_pushed_seeded_v2', '1'); } catch (e) {}
      }

      const unnotifiedFiles = [];
      remoteFiles.forEach(rf => {
        if (rf && rf.id) {
          appState.knownFileIdsOnLoad.add(rf.id);
          if (!appState.notifiedPushFileIds.includes(rf.id)) {
            unnotifiedFiles.push(rf);
          }
        }
      });

      const newSignature = computeDatabaseSignature(remoteFiles, nextFolders, nextAboutContent);
      const isFirstRemoteSync = !appState.hasInitializedRemote;
      const hasDataChanged = isFirstRemoteSync || (newSignature !== appState.lastRenderedSignature);

      const pendingLocalUploads = (appState.files || []).filter(f => f && f.isPendingUpload);
      const mergedRemoteFiles = [...pendingLocalUploads, ...remoteFiles.filter(rf => !pendingLocalUploads.some(p => p.id === rf.id))];

      appState.folders = nextFolders;
      appState.aboutContent = nextAboutContent;
      appState.files = mergedRemoteFiles;
      appState.hasInitializedRemote = true;

      if (hasDataChanged) {
        appState.lastRenderedSignature = newSignature;
        saveAppState();
      }

      // Render UI immediately before any notification or push subscription logic
      if (hasDataChanged || !silent) {
        renderQuickSubjectBar();
        renderBreadcrumbBar();
        renderExplorerContent();
        updateLibraryCounters();
        updateNotificationsUI();
      }

      checkPendingNotificationHash();
      setCloudSyncStatus('online', `متصل (${remoteFiles.length})`);
      if (!silent) {
        showToast(`تمت المزامنة مع Google Drive بنجاح (${remoteFiles.length} ملف)`, 'success');
      }

      if ('Notification' in window && Notification.permission === 'granted') {
        subscribeAndSaveWebPush(null);
      }

      if (unnotifiedFiles.length > 0) {
        appState.notifiedPushFileIds = Array.from(new Set([...appState.notifiedPushFileIds, ...unnotifiedFiles.map(nf => nf.id)]));
        try { localStorage.setItem('ksu_vet33_pushed_seeded_v2', '1'); } catch (e) {}
        saveAppState();
        postMessageToServiceWorker({
          type: 'INIT_SW',
          notifiedIds: appState.notifiedPushFileIds
        });
        unnotifiedFiles.slice(0, 3).reverse().forEach(nf => {
          sendUserNotificationForFile(nf, false);
        });
      } else if (isFirstRemoteSync && appState.notifiedPushFileIds.length > 0) {
        postMessageToServiceWorker({
          type: 'INIT_SW',
          notifiedIds: appState.notifiedPushFileIds
        });
      }

      return true;
    }

    async function fetchDatabaseFromDrive(silent = false, forceDriveScan = false) {
      if (appState.isSavingAction) return;
      if (appState.isSyncing) {
        appState.pendingSyncAfterCurrent = {
          silent: silent && (appState.pendingSyncAfterCurrent ? appState.pendingSyncAfterCurrent.silent : true),
          forceDriveScan: forceDriveScan || (appState.pendingSyncAfterCurrent ? appState.pendingSyncAfterCurrent.forceDriveScan : false)
        };
        return;
      }
      appState.isSyncing = true;
      if (!silent) {
        setCloudSyncStatus('syncing', 'جاري الجلب...');
      }
      try {
        // Use fast cached DB read (force=false) on initial load so files appear in <0.5s without waiting for a 20s Drive tree scan
        const forceFlag = (!silent || forceDriveScan) ? 'true' : 'false';
        const timeoutMs = forceFlag === 'true' ? 25000 : 12000;
        const res = await fetchWithTimeout(GAS_WEB_APP_URL + '?action=sync&force=' + forceFlag + '&t=' + Date.now(), {
          method: 'GET',
          redirect: 'follow'
        }, timeoutMs);
        const data = await res.json();
        const normalized = normalizeDriveApiPayload(data);
        if (normalized && Array.isArray(normalized.files)) {
          initialSyncRetryCount = 0;
          applyNormalizedRemoteDatabase(normalized, silent);

          // Schedule a one-time silent background deep scan (force=true) 6s after fast initial load
          if (!hasScheduledDeepDriveScan && forceFlag === 'false') {
            hasScheduledDeepDriveScan = true;
            setTimeout(() => {
              fetchDatabaseFromDrive(true, true);
            }, 6000);
          }
        } else {
          setCloudSyncStatus('online', 'متصل بـ Drive');
        }
      } catch (err) {
        // Fallback: Try local vet_ksu_33_db.json if remote failed on first load
        if (!appState.hasInitializedRemote) {
          try {
            const localRes = await fetch('./vet_ksu_33_db.json?t=' + Date.now());
            if (localRes && localRes.ok) {
              const localData = await localRes.json();
              const localNorm = normalizeDriveApiPayload(localData);
              if (localNorm && Array.isArray(localNorm.files) && localNorm.files.length > 0) {
                applyNormalizedRemoteDatabase(localNorm, true);
              }
            }
          } catch (localErr) {}

          // Automatic retry on weak mobile connection
          if (initialSyncRetryCount < 3) {
            initialSyncRetryCount++;
            setTimeout(() => {
              fetchDatabaseFromDrive(true, false);
            }, 2500 * initialSyncRetryCount);
          }
        }
        setCloudSyncStatus('error', 'وضع محلي');
        if (!silent) {
          showToast('تعذر الاتصال بـ Google Drive حالياً، يتم العرض من الذاكرة المحلية.', 'warning');
        }
      } finally {
        appState.isSyncing = false;
        if (appState.pendingSyncAfterCurrent) {
          const nextReq = appState.pendingSyncAfterCurrent;
          appState.pendingSyncAfterCurrent = null;
          setTimeout(() => {
            fetchDatabaseFromDrive(nextReq.silent, nextReq.forceDriveScan);
          }, 250);
        }
      }
    }

    async function syncActionToDrive(payload) {
      appState.isSavingAction = true;
      const statusMsg = payload && (payload.action === 'delete' || payload.action === 'deleteFile') ? 'جاري الحذف...' : 'جاري الحفظ...';
      setCloudSyncStatus('syncing', statusMsg);
      const enrichedPayload = Object.assign({}, payload || {});
      if (appState.isAdmin) {
        enrichedPayload.adminToken = appState.adminToken || ADMIN_PASSCODE_HASHES[0];
        enrichedPayload.passcode = 'vetksu33';
      }
      const tempOutgoingId = (enrichedPayload.file && enrichedPayload.file.id) || (enrichedPayload.item && enrichedPayload.item.id) || '';
      const isHeavyUpload = Boolean(enrichedPayload.fileUpload || enrichedPayload.base64);
      const timeoutMs = isHeavyUpload ? 90000 : 35000;
      try {
        const res = await fetchWithTimeout(GAS_WEB_APP_URL, {
          method: 'POST',
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(enrichedPayload)
        }, timeoutMs);
        const data = await res.json();
        if (data && (data.ok || data.status === 'success')) {
          // Issue #5 Fix: If server assigned a new permanent `drive_<id>` to a newly uploaded file, migrate its temporary ID in savedIds & completedIds first
          if (tempOutgoingId && data.file && data.file.id && tempOutgoingId !== data.file.id) {
            migrateTemporaryFileId(tempOutgoingId, data.file.id);
          }

          const normalized = normalizeDriveApiPayload(data);
          if (Array.isArray(normalized.folders)) {
            appState.folders = normalized.folders;
          }
          if (Array.isArray(normalized.files)) {
            const sysSubEntry = normalized.files.find(rf => rf && rf.id === SYS_PUSH_SUBS_ID);
            if (sysSubEntry && Array.isArray(sysSubEntry.subs)) {
              appState.pushSubscriptions = sysSubEntry.subs;
            }
            const sysAboutEntry = normalized.files.find(rf => rf && rf.id === SYS_ABOUT_CONTENT_ID);
            if (sysAboutEntry && sysAboutEntry.aboutContent && typeof sysAboutEntry.aboutContent === 'object') {
              appState.aboutContent = { ...DEFAULT_ABOUT_CONTENT, ...sysAboutEntry.aboutContent };
            }
            const remoteFiles = normalized.files.filter(rf => {
              if (!rf || !rf.id || rf.isSystemMeta || String(rf.id).startsWith('_sys_')) return false;
              if (appState.deletedFileIds && (appState.deletedFileIds.has(rf.id) || (rf.driveFileId && appState.deletedFileIds.has(rf.driveFileId)))) return false;
              return true;
            });
            reconcileRemoteDownloadsWithPending(remoteFiles);
            appState.files = remoteFiles;
            appState.lastRenderedSignature = computeDatabaseSignature(appState.files, appState.folders, appState.aboutContent);
            saveAppState();
            renderQuickSubjectBar();
            renderBreadcrumbBar();
            renderExplorerContent();
            updateLibraryCounters();
            updateNotificationsUI();
          }
          setCloudSyncStatus('online', `متصل (${appState.files.length})`);
          return { ok: true, data };
        }
        setCloudSyncStatus('error', 'خطأ في الحفظ');
        return { ok: false, error: (data && data.error) || 'Unknown error' };
      } catch (err) {
        setCloudSyncStatus('error', 'حُفظ محلياً');
        return { ok: false, error: err.message };
      } finally {
        appState.isSavingAction = false;
      }
    }

    function safeParseArray(raw, fallback = []) {
      if (!raw) return fallback;
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : fallback;
      } catch (e) {
        return fallback;
      }
    }

    const DEFAULT_ABOUT_CONTENT = {
      "greeting": "بسم الله الرحمن الرحيم",
      "verse": "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
      "modelNote": "دي داتا معموله باقوي نماذج الذكاء الاصطناعي من google (gemini argon 4).",
      "typesHeading": "عبارة عن 4 أنواع :",
      "sourceDesc": "ودا الملف الي انا بعته للذكاء الاصطناعي (argon 4) والمصدر  دا يإما تبيض او داتا دكتور المادة او ممكن يكون تفريغ لريكورد باستخدام الذكاء الاصطناعي بردو.",
      "explainDesc": "ودا شرح مفصل جدا للمصدر باللغه العاميه (الشرح بيكون فيه بعض المعلومات الي متذكرتش في المصدر عشان تزود الفهم فقط).",
      "summaryDesc": "ودا تلخيص للمصدر من غير اي زيادة او نقص في المعلومات الي اتذكرت في المصدر ، بيجمعلك كل معلومه اتذكرت في المصدر فقط بشكل ملخص جدا ومنظم.",
      "mindmapDesc": "ودي نفس الكلام الي موجود في التلخيص بس علي هيئة تفريعات عشان تربط المعلومات ببعضها.",
      "aiNoteTitle": "بالنسبه للناس الي بتخاف ان الذكاء الاصطناعي يغلط او يهلوس :",
      "aiNoteDesc": "الداتا دي مفيهاش اي هلوسه او اخطاء( تكاد تكون منعدمه) وتقدر تقارن بين المصدر الاصلي وبين الحجات الي الذكاء الاصطناعي عملها ومش هتلاقي اخطاء نهائيا ان شاء الله."
};

    // Safely load and normalize saved IDs from localStorage (dual-key: primary 'vet33_saved_files_v1', fallback 'ksu_vet33_saved_v4')
    function loadSavedFilesFromStorage() {
      try {
        const raw = localStorage.getItem('vet33_saved_files_v1') || localStorage.getItem('ksu_vet33_saved_v4');
        if (raw) {
          const parsed = safeParseArray(raw, []);
          const ids = parsed.map(item => (item && typeof item === 'object' && item.id ? item.id : item));
          appState.savedIds = Array.from(new Set(ids.filter(id => typeof id === 'string' || typeof id === 'number')));
        } else {
          appState.savedIds = [];
        }
      } catch (e) {
        appState.savedIds = [];
      }
      return appState.savedIds;
    }

    // Persist saved IDs to both primary and legacy keys
    function saveSavedFilesToStorage() {
      try {
        const uniqueIds = Array.from(new Set((appState.savedIds || []).filter(Boolean)));
        appState.savedIds = uniqueIds;
        const json = JSON.stringify(uniqueIds);
        localStorage.setItem('vet33_saved_files_v1', json);
        localStorage.setItem('ksu_vet33_saved_v4', json);
      } catch (e) {}
    }

    // Safely load and normalize completed / studied IDs from localStorage (dual-key: primary 'vet33_completed_files_v1', fallback 'ksu_vet33_completed_v4')
    function loadCompletedFilesFromStorage() {
      try {
        const raw = localStorage.getItem('vet33_completed_files_v1') || localStorage.getItem('ksu_vet33_completed_v4');
        if (raw) {
          const parsed = safeParseArray(raw, []);
          const ids = parsed.map(item => (item && typeof item === 'object' && item.id ? item.id : item));
          appState.completedIds = Array.from(new Set(ids.filter(id => typeof id === 'string' || typeof id === 'number')));
        } else {
          appState.completedIds = [];
        }
      } catch (e) {
        appState.completedIds = [];
      }
      return appState.completedIds;
    }

    // Persist completed IDs to both primary and legacy keys
    function saveCompletedFilesToStorage() {
      try {
        const uniqueIds = Array.from(new Set((appState.completedIds || []).filter(Boolean)));
        appState.completedIds = uniqueIds;
        const json = JSON.stringify(uniqueIds);
        localStorage.setItem('vet33_completed_files_v1', json);
        localStorage.setItem('ksu_vet33_completed_v4', json);
      } catch (e) {}
    }

    // Toggle saved / bookmarked state for a file
    function toggleFileSave(fileId) {
      if (!fileId) return;
      loadSavedFilesFromStorage();
      const index = appState.savedIds.indexOf(fileId);
      const isSaved = index === -1;
      if (isSaved) {
        appState.savedIds.push(fileId);
        showToast('تمت إضافة الملف إلى مكتبتك المحفوظة ✓', 'success');
      } else {
        appState.savedIds.splice(index, 1);
        showToast('تمت إزالة الملف من مكتبتك المحفوظة', 'info');
      }
      saveSavedFilesToStorage();
      updateLibraryCounters();
      updateSavedButtonsVisualState();

      if (appState.currentView === 'saved' || appState.onlySavedFilter) {
        renderExplorerContent();
      } else {
        updateSaveButtonsUI(fileId, isSaved);
      }
    }

    // Surgically update bookmark button classes and icon fill across the DOM
    function updateSaveButtonsUI(fileId, isSaved) {
      const buttons = document.querySelectorAll(`[data-file-action="toggle-save"][data-file-id="${fileId}"], [data-file-action="toggle-save"][data-id="${fileId}"]`);
      buttons.forEach(btn => {
        btn.className = `p-2 rounded-xl ${isSaved ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-amber-300 border border-slate-700'} transition`;
        btn.title = isSaved ? 'إزالة من المحفوظات' : 'حفظ في مكتبتي';
        const icon = btn.querySelector('[data-lucide="bookmark"]') || btn.querySelector('svg');
        if (icon) {
          if (isSaved) {
            icon.classList.add('fill-current');
          } else {
            icon.classList.remove('fill-current');
          }
        }
      });
    }

    // Toggle completed / studied state for a file
    function toggleFileComplete(fileId) {
      if (!fileId) return;
      loadCompletedFilesFromStorage();
      const index = appState.completedIds.indexOf(fileId);
      const isCompleted = index === -1;
      if (isCompleted) {
        appState.completedIds.push(fileId);
        showToast('رائع! تم تحديد الملف كمذاكر ✓', 'success');
      } else {
        appState.completedIds.splice(index, 1);
        showToast('تم إلغاء تحديد المذاكرة للملف', 'info');
      }
      saveCompletedFilesToStorage();
      updateLibraryCounters();
      updateCompleteButtonsUI(fileId, isCompleted);

      // Issue #6 Fix: If currently viewing Subject cards (Level 1), Category cards (Level 2), or Numbered Folder cards (Level 3),
      // re-render the explorer cards so their progress percentage bars (%) update immediately
      const isViewingFolderOrSubjectCards =
        appState.currentView === 'explorer' &&
        !appState.onlySavedFilter &&
        appState.searchQuery.trim() === '' &&
        (!appState.currentSubject || !appState.currentCategory || appState.currentFolderNum === null);
      if (isViewingFolderOrSubjectCards) {
        renderExplorerContent();
      }

      if (appState.activePreviewId === fileId) {
        syncModalCompleteUI(isCompleted);
      }
    }

    // Surgically update completed status styling across the DOM
    function updateCompleteButtonsUI(fileId, isCompleted) {
      const buttons = document.querySelectorAll(`[data-file-action="toggle-complete"][data-file-id="${fileId}"], [data-file-action="toggle-complete"][data-id="${fileId}"]`);
      buttons.forEach(btn => {
        btn.className = `p-2 rounded-xl ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-emerald-300 border border-slate-700'} transition`;
        btn.title = isCompleted ? 'تمت المذاكرة' : 'تحديد كمذاكر';
      });

      const articles = document.querySelectorAll(`article[data-file-id="${fileId}"]`);
      articles.forEach(art => {
        if (isCompleted) {
          art.classList.remove('border-slate-800');
          art.classList.add('border-emerald-500/50');
        } else {
          art.classList.remove('border-emerald-500/50');
          art.classList.add('border-slate-800');
        }
      });
    }

    // Synchronize UI styling of layout buttons (#layout-grid-btn and #layout-list-btn)
    function syncLayoutButtonsUI() {
      const gridBtn = document.getElementById('layout-grid-btn');
      const listBtn = document.getElementById('layout-list-btn');
      if (!gridBtn || !listBtn) return;

      const isGrid = appState.layoutMode === 'grid';
      const activeClasses = ['bg-amber-500', 'text-slate-950', 'font-extrabold'];
      const inactiveClasses = ['text-slate-400', 'hover:text-white', 'font-bold'];

      if (isGrid) {
        gridBtn.classList.remove(...inactiveClasses);
        gridBtn.classList.add(...activeClasses);

        listBtn.classList.remove(...activeClasses);
        listBtn.classList.add(...inactiveClasses);
      } else {
        listBtn.classList.remove(...inactiveClasses);
        listBtn.classList.add(...activeClasses);

        gridBtn.classList.remove(...activeClasses);
        gridBtn.classList.add(...inactiveClasses);
      }
    }

    function loadAppState() {
      try {
        localStorage.removeItem('ksu_vet33_files_v1');
        localStorage.removeItem('ksu_vet33_files_v2');
        localStorage.removeItem('ksu_vet33_files_v3');
        localStorage.removeItem('ksu_vet33_files_v4');
        localStorage.removeItem('ksu_vet33_saved_v3');
        localStorage.removeItem('ksu_vet33_completed_v3');

        const storedFiles = safeParseArray(localStorage.getItem('ksu_vet33_files_v5'), [])
          .filter(rf => rf && rf.id && !rf.isSystemMeta && !String(rf.id).startsWith('_sys_'));
        appState.files = storedFiles.length > 0 ? storedFiles : generateDefaultFilesDatabase();

        const storedFolders = safeParseArray(localStorage.getItem('ksu_vet33_folders_v5'), []);
        appState.folders = storedFolders.length > 0 ? storedFolders : generateDefaultFoldersDatabase();
        loadSavedFilesFromStorage();
        loadCompletedFilesFromStorage();
        appState.seenNotificationIds = safeParseArray(localStorage.getItem('ksu_vet33_seen_notifs_v4'), []);

        const storedLayout = localStorage.getItem('ksu_vet33_layout_v1');
        if (storedLayout === 'grid' || storedLayout === 'list') {
          appState.layoutMode = storedLayout;
        }

        const storedPushed = localStorage.getItem('ksu_vet33_pushed_ids_v4');
        if (storedPushed) {
          appState.notifiedPushFileIds = safeParseArray(storedPushed, []);
        } else {
          appState.notifiedPushFileIds = [];
        }

        const storedAbout = localStorage.getItem('ksu_vet33_about_content_v1');
        appState.aboutContent = storedAbout ? { ...DEFAULT_ABOUT_CONTENT, ...JSON.parse(storedAbout) } : { ...DEFAULT_ABOUT_CONTENT };

        // Load Admin Session (vet33_admin_session_v1 and legacy ksu_vet33_admin_session_v4)
        try {
          const rawAdminSession = localStorage.getItem('vet33_admin_session_v1') || localStorage.getItem('ksu_vet33_admin_session_v4');
          if (rawAdminSession) {
            const parsedSession = JSON.parse(rawAdminSession);
            if (parsedSession && (parsedSession.isAdmin === true || parsedSession === true)) {
              appState.isAdmin = true;
              appState.adminToken = parsedSession.adminToken || ADMIN_PASSCODE_HASHES[0];
              if (parsedSession.adminName && typeof parsedSession.adminName === 'string') {
                appState.adminName = parsedSession.adminName;
              }
            } else {
              appState.isAdmin = false;
            }
          } else {
            appState.isAdmin = false;
          }
        } catch (adminParseErr) {
          // Robust recovery from corrupted non-JSON admin session data
          appState.isAdmin = false;
        }
      } catch (e) {
        appState.files = generateDefaultFilesDatabase();
        appState.folders = generateDefaultFoldersDatabase();
        appState.savedIds = [];
        appState.completedIds = [];
        appState.seenNotificationIds = [];
        appState.notifiedPushFileIds = [];
        appState.aboutContent = { ...DEFAULT_ABOUT_CONTENT };
        appState.isAdmin = false;
      }
    }

    function saveAppState() {
      try {
        if (Array.isArray(appState.files) && (appState.files.length > 0 || appState.hasInitializedRemote)) {
          localStorage.setItem('ksu_vet33_files_v5', JSON.stringify(appState.files));
        }
        if (Array.isArray(appState.folders) && (appState.folders.length > 0 || appState.hasInitializedRemote)) {
          localStorage.setItem('ksu_vet33_folders_v5', JSON.stringify(appState.folders));
        }
        saveSavedFilesToStorage();
        saveCompletedFilesToStorage();
        localStorage.setItem('ksu_vet33_seen_notifs_v4', JSON.stringify(appState.seenNotificationIds));
        localStorage.setItem('ksu_vet33_pushed_ids_v4', JSON.stringify(appState.notifiedPushFileIds));
        try {
          localStorage.setItem('ksu_vet33_layout_v1', appState.layoutMode);
        } catch (e) {}
        if (appState.aboutContent) {
          localStorage.setItem('ksu_vet33_about_content_v1', JSON.stringify(appState.aboutContent));
        }

        // Persist Admin Session dual-key
        try {
          if (appState.isAdmin) {
            const sessionPayload = JSON.stringify({
              isAdmin: true,
              adminName: appState.adminName || 'مسؤول الدفعة',
              adminToken: appState.adminToken || ADMIN_PASSCODE_HASHES[0],
              timestamp: Date.now()
            });
            localStorage.setItem('vet33_admin_session_v1', sessionPayload);
            localStorage.setItem('ksu_vet33_admin_session_v4', sessionPayload);
          } else {
            localStorage.removeItem('vet33_admin_session_v1');
            localStorage.removeItem('ksu_vet33_admin_session_v4');
          }
        } catch (adminSaveErr) {}
      } catch (e) {}
    }

    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const colors = {
        success: 'border-emerald-500/50 bg-slate-900/95 text-emerald-300',
        warning: 'border-amber-500/50 bg-slate-900/95 text-amber-300',
        info: 'border-cyan-500/50 bg-slate-900/95 text-cyan-300'
      };

      const toast = document.createElement('div');
      toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 text-xs font-bold ${colors[type] || colors.success}`;
      toast.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-current shrink-0 animate-ping"></span>
        <span class="flex-1 leading-relaxed">${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    // 4. Custom Static Background Image (Three.js 3D canvas animation removed per user request)
        // 3D Perspective Cyber-Grid & Ambient Light Canvas Engine (60 FPS)
    function initThreeBackground() {
      // Static background mode: animated canvas and render loops completely removed per user request.
      const canvas = document.getElementById('bg-canvas');
      if (canvas) canvas.remove();
    }
    // =====================================================================
    // STAGE 5B: HIERARCHICAL FOLDER EXPLORER, FORMAT STYLING & CONTROLLERS
    // =====================================================================

    function getSubjectObj(subId) {
      return ORDERED_SUBJECTS.find(s => s.id === subId) || ORDERED_SUBJECTS[0];
    }

    // Visual Styling Helper for the 4 File Formats: المصدر , شرح , تلخيص , خريطه ذهنية
    function getFormatVisuals(formatName) {
      const f = String(formatName || 'المصدر').trim();
      if (f === 'شرح') {
        return {
          label: 'شرح',
          icon: 'book-open-check',
          badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
        };
      }
      if (f === 'تلخيص') {
        return {
          label: 'تلخيص',
          icon: 'file-check-2',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      }
      if (f === 'خريطه ذهنية') {
        return {
          label: 'خريطه ذهنية',
          icon: 'git-fork',
          badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        };
      }
      return {
        label: 'المصدر',
        icon: 'file-text',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      };
    }

    function updateLibraryCounters() {
      loadSavedFilesFromStorage();
      const allFolders = Array.isArray(appState.folders) ? appState.folders : [];
      const lecturesCount = new Set([
        ...appState.files.filter(f => f.category === 'محاضرات').map(f => `${f.subject}-${Number(f.folderNum)}`),
        ...allFolders.filter(fl => fl.category === 'محاضرات').map(fl => `${fl.subject}-${Number(fl.folderNum)}`)
      ]).size;
      const sectionsCount = new Set([
        ...appState.files.filter(f => f.category === 'سكاشن').map(f => `${f.subject}-${Number(f.folderNum)}`),
        ...allFolders.filter(fl => fl.category === 'سكاشن').map(fl => `${fl.subject}-${Number(fl.folderNum)}`)
      ]).size;
      const statFilesEl = document.getElementById('stat-files-count');
      if (statFilesEl) statFilesEl.textContent = appState.files.length;
      const statSubjectsEl = document.getElementById('stat-subjects-count');
      if (statSubjectsEl) statSubjectsEl.textContent = ORDERED_SUBJECTS.length;
      document.getElementById('stat-lectures-count').textContent = lecturesCount;
      document.getElementById('stat-sections-count').textContent = sectionsCount;
      document.getElementById('saved-count-badge').textContent = appState.savedIds.length;
      const sidebarSavedBadge = document.getElementById('sidebar-saved-badge');
      if (sidebarSavedBadge) sidebarSavedBadge.textContent = appState.savedIds.length;

      const total = appState.files.length || 1;
      const done = appState.completedIds.filter(id => appState.files.some(f => f.id === id)).length;
      const pct = Math.min(100, Math.round((done / total) * 100));
      document.getElementById('study-progress-text').textContent = `${pct}%`;
    }

    // Attach 3D Tilt Effect to Cards (Desktop Fine Pointer Only — Resets cleanly on Touch Screens)
    function attach3DTiltListeners() {
      const isTouchDevice = Boolean(
        (window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches) ||
        ('ontouchstart' in window && (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches))
      );

      document.querySelectorAll('.card-3d').forEach(card => {
        const resetTilt = () => {
          card.style.transform = '';
        };

        if (isTouchDevice) {
          card.addEventListener('touchend', resetTilt, { passive: true });
          card.addEventListener('touchcancel', resetTilt, { passive: true });
          return;
        }

        card.addEventListener('mousemove', (e) => {
          if (!appState.is3DEnabled) return;
          if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
        });

        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('touchend', resetTilt, { passive: true });
        card.addEventListener('touchcancel', resetTilt, { passive: true });
      });
    }

    // Quick Access Sidebar Open / Close / Toggle Controllers
    function openQuickSidebar() {
      const sidebar = document.getElementById('quick-access-sidebar');
      const edgeTab = document.getElementById('sidebar-edge-tab');
      const backdrop = document.getElementById('sidebar-backdrop');
      renderQuickSubjectBar();
      updateLibraryCounters();
      if (sidebar) sidebar.classList.add('sidebar-open');
      if (edgeTab) edgeTab.classList.add('tab-hidden');
      if (backdrop) backdrop.classList.remove('hidden');
      if (window.innerWidth < 1024) {
        document.body.classList.add('overflow-hidden');
      }
    }

    function closeQuickSidebar() {
      const sidebar = document.getElementById('quick-access-sidebar');
      const edgeTab = document.getElementById('sidebar-edge-tab');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar) sidebar.classList.remove('sidebar-open');
      if (edgeTab) edgeTab.classList.remove('tab-hidden');
      if (backdrop) backdrop.classList.add('hidden');
      const anyModalOpen = ['preview-modal', 'publish-modal', 'admin-login-modal', 'notifications-modal', 'about-modal'].some(id => {
        const el = document.getElementById(id);
        return el && !el.classList.contains('hidden');
      });
      if (!anyModalOpen) {
        document.body.classList.remove('overflow-hidden');
        document.body.style.overflow = '';
      }
    }

    function toggleQuickSidebar() {
      const sidebar = document.getElementById('quick-access-sidebar');
      if (sidebar && sidebar.classList.contains('sidebar-open')) {
        closeQuickSidebar();
      } else {
        openQuickSidebar();
      }
    }

    // Render Quick Access Sidebar (With Home Screen Button, Root Level, and 8 Subjects)
    function renderQuickSubjectBar() {
      const bar = document.getElementById('quick-subject-bar');
      if (!bar) return;

      const isRootActive = !appState.currentSubject && !appState.onlySavedFilter && !appState.searchQuery.trim();
      const totalFilesCount = appState.files.length;

      // 1. Dedicated Home Screen Button (زر الشاشة الرئيسية - يرفع لأعلى الصفحة الرئيسية)
      const homeItem = `
        <button type="button" id="sidebar-home-btn" class="quick-nav-btn w-full p-2 rounded-2xl border text-xs font-black transition flex items-center justify-between gap-2 group bg-emerald-950/35 hover:bg-emerald-900/50 text-emerald-300 border-emerald-500/35">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 bg-emerald-500/20 text-emerald-400 group-hover:scale-105 transition">
              <i data-lucide="home" class="w-4 h-4"></i>
            </div>
            <span class="truncate font-black">الشاشة الرئيسية</span>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-lg font-black shrink-0 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">الرئيسية</span>
        </button>
      `;

      // 2. Root All-Files Folder (الترم الاول - الكل)
      const rootItem = `
        <button type="button" data-quick-sub="root" class="quick-sub-btn w-full p-2 rounded-2xl border text-xs font-extrabold transition flex items-center justify-between gap-2 group ${isRootActive ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20' : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border-slate-800/80'}">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${isRootActive ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-400 group-hover:scale-105 transition'}">
              <i data-lucide="layers" class="w-4 h-4"></i>
            </div>
            <span class="truncate">الترم الأول (كل المقررات)</span>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-lg font-black shrink-0 ${isRootActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400 border border-slate-700/60'}">${totalFilesCount} ملف</span>
        </button>
      `;

      // 3. The 8 Subjects in Exact Order
      const subjectItems = ORDERED_SUBJECTS.map(sub => {
        const isActive = appState.currentSubject === sub.id && !appState.onlySavedFilter && !appState.searchQuery.trim();
        const subFiles = appState.files.filter(f => f.subject === sub.id);
        const fileCount = subFiles.length;
        const iconName = sub.icon || 'folder';
        const label = sub.displayName || sub.folderName;

        return `
          <button type="button" data-quick-sub="${sub.id}" class="quick-sub-btn w-full p-2 rounded-2xl border text-xs font-extrabold transition flex items-center justify-between gap-2 group ${isActive ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20' : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border-slate-800/80'}">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-400 group-hover:scale-105 transition'}">
                <i data-lucide="${iconName}" class="w-4 h-4"></i>
              </div>
              <span class="truncate">${label}</span>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ${isActive ? 'bg-slate-950/20 text-slate-950' : (fileCount > 0 ? 'bg-slate-800 text-amber-300 border border-amber-500/30' : 'bg-slate-800/70 text-slate-400 border border-slate-700/60')}">${fileCount} ملف</span>
          </button>
        `;
      }).join('');

      bar.innerHTML = homeItem + rootItem + subjectItems;

      // Attach Home Button Listener
      const homeBtn = document.getElementById('sidebar-home-btn');
      if (homeBtn) {
        homeBtn.addEventListener('click', () => {
          appState.onlySavedFilter = false;
          appState.searchQuery = '';
          const sInput = document.getElementById('search-input');
          if (sInput) sInput.value = '';
          const cBtn = document.getElementById('clear-search-btn');
          if (cBtn) cBtn.classList.add('hidden');
          closeQuickSidebar();
          navigateToHierarchy(null, null, null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // Attach Subject Buttons Listeners
      bar.querySelectorAll('.quick-sub-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-quick-sub');
          appState.onlySavedFilter = false;
          appState.searchQuery = '';
          const sInput = document.getElementById('search-input');
          if (sInput) sInput.value = '';
          const cBtn = document.getElementById('clear-search-btn');
          if (cBtn) cBtn.classList.add('hidden');

          closeQuickSidebar();
          if (target === 'root') {
            navigateToHierarchy(null, null, null);
          } else {
            navigateToHierarchy(target, null, null);
          }
          const ws = document.getElementById('main-workspace');
          if (ws && target !== 'root') {
            ws.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Build a serializable snapshot of the current navigation state for History API
    function getCurrentHistoryStateSnapshot(extra = {}) {
      return Object.assign({
        vet33Nav: true,
        view: appState.currentView || 'explorer',
        onlySavedFilter: Boolean(appState.onlySavedFilter),
        subject: appState.currentSubject || null,
        category: appState.currentCategory || null,
        folderNum: appState.currentFolderNum !== null && appState.currentFolderNum !== undefined ? Number(appState.currentFolderNum) : null
      }, extra);
    }

    function pushNavigationHistoryState(extra = {}) {
      if (appState.isHandlingPopState) return;
      try {
        if (window.history && typeof window.history.pushState === 'function') {
          const nextState = getCurrentHistoryStateSnapshot(extra);
          const cur = window.history.state;
          const isSame = cur &&
            cur.vet33Nav &&
            cur.view === nextState.view &&
            cur.onlySavedFilter === nextState.onlySavedFilter &&
            cur.subject === nextState.subject &&
            cur.category === nextState.category &&
            cur.folderNum === nextState.folderNum &&
            Boolean(cur.modalOpen) === Boolean(nextState.modalOpen);
          if (!isSame) {
            window.history.pushState(nextState, '', location.pathname + location.search);
          }
        }
      } catch (e) {}
    }

    // Navigate to Specific Hierarchy Level (1Data -> Subject -> Category -> FolderNum)
    function navigateToHierarchy(subjectId, categoryName, folderNum, skipHistory = false) {
      const normalizedFolder = folderNum !== null && folderNum !== undefined ? Number(folderNum) : null;
      appState.currentView = 'explorer';
      appState.onlySavedFilter = false;
      appState.previousHierarchy = null;
      appState.currentSubject = subjectId || null;
      appState.currentCategory = categoryName || null;
      appState.currentFolderNum = normalizedFolder;
      document.title = 'Seniors 2027 VET-KSU 33 Old List | مكتبة المحاضرات والسكاشن';

      if (!skipHistory) {
        pushNavigationHistoryState();
      }

      renderQuickSubjectBar();
      renderBreadcrumbBar();
      renderExplorerContent();
      updateSavedButtonsVisualState();
    }

    // Step Back One Level in Folder Hierarchy
    function stepBackHierarchy(fromPopState = false) {
      if (appState.currentView === 'saved' || appState.onlySavedFilter || appState.searchQuery.trim() !== '') {
        appState.currentView = 'explorer';
        appState.onlySavedFilter = false;
        if (appState.previousHierarchy) {
          appState.currentSubject = appState.previousHierarchy.subject || null;
          appState.currentCategory = appState.previousHierarchy.category || null;
          appState.currentFolderNum = appState.previousHierarchy.folderNum !== null && appState.previousHierarchy.folderNum !== undefined
            ? Number(appState.previousHierarchy.folderNum)
            : null;
          appState.previousHierarchy = null;
        }
        appState.searchQuery = '';
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
        const cBtn = document.getElementById('clear-search-btn');
        if (cBtn) cBtn.classList.add('hidden');
        document.title = 'Seniors 2027 VET-KSU 33 Old List | مكتبة المحاضرات والسكاشن';
        if (!fromPopState) {
          pushNavigationHistoryState();
        }
        renderQuickSubjectBar();
        renderBreadcrumbBar();
        renderExplorerContent();
        updateSavedButtonsVisualState();
        return;
      }

      if (appState.currentFolderNum !== null) {
        navigateToHierarchy(appState.currentSubject, appState.currentCategory, null, fromPopState);
      } else if (appState.currentCategory !== null) {
        navigateToHierarchy(appState.currentSubject, null, null, fromPopState);
      } else if (appState.currentSubject !== null) {
        navigateToHierarchy(null, null, null, fromPopState);
      }
    }

    // Visual feedback for saved view toggle buttons
    function updateSavedButtonsVisualState() {
      const isSaved = appState.currentView === 'saved';
      const headerBtn = document.getElementById('header-saved-btn');
      const sidebarBtn = document.getElementById('sidebar-saved-btn');

      if (headerBtn) {
        headerBtn.classList.toggle('bg-cyan-500/25', isSaved);
        headerBtn.classList.toggle('border-cyan-400', isSaved);
        headerBtn.classList.toggle('shadow-cyan-500/30', isSaved);
      }
      if (sidebarBtn) {
        sidebarBtn.classList.toggle('bg-cyan-900/60', isSaved);
        sidebarBtn.classList.toggle('border-cyan-400', isSaved);
      }
    }

    // Toggle Saved / Bookmarked Files View (F01)
    function toggleSavedView() {
      loadSavedFilesFromStorage();

      if (appState.currentView === 'saved') {
        appState.currentView = 'explorer';
        appState.onlySavedFilter = false;

        if (appState.previousHierarchy) {
          appState.currentSubject = appState.previousHierarchy.subject;
          appState.currentCategory = appState.previousHierarchy.category;
          appState.currentFolderNum = appState.previousHierarchy.folderNum;
          appState.previousHierarchy = null;
        }
        document.title = 'Seniors 2027 VET-KSU 33 Old List | مكتبة المحاضرات والسكاشن';
      } else {
        appState.previousHierarchy = {
          subject: appState.currentSubject,
          category: appState.currentCategory,
          folderNum: appState.currentFolderNum
        };
        appState.currentView = 'saved';
        appState.onlySavedFilter = true;

        appState.searchQuery = '';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        const clearBtn = document.getElementById('clear-search-btn');
        if (clearBtn) clearBtn.classList.add('hidden');
        document.title = 'الملفات المحفوظة | Seniors 2027 VET-KSU 33 Old List';
      }

      pushNavigationHistoryState();
      renderQuickSubjectBar();
      renderBreadcrumbBar();
      renderExplorerContent();
      updateLibraryCounters();
      updateSavedButtonsVisualState();
    }

    function navigateToFolder(subjectId, categoryName, folderNum) {
      navigateToHierarchy(subjectId, categoryName, folderNum);
    }

    // Export navigation and control helpers to window
    if (typeof window !== 'undefined') {
      window.appState = appState;
      window.toggleSavedView = toggleSavedView;
      window.navigateToFolder = navigateToFolder;
      window.navigateToHierarchy = navigateToHierarchy;
      window.openQuickSidebar = openQuickSidebar;
      window.closeQuickSidebar = closeQuickSidebar;
      window.updateLibraryCounters = updateLibraryCounters;
      window.openPreviewModal = openPreviewModal;
      window.closePreviewModal = closePreviewModal;
      window.triggerFileDownload = triggerFileDownload;
      window.toggleFileComplete = toggleFileComplete;
      window.toggleFileSave = toggleFileSave;
      window.openPublishModal = openPublishModal;
      window.closePublishModal = closePublishModal;
      window.handlePublishSubmit = handlePublishSubmit;
      window.openAdminModal = openAdminModal;
      window.closeAdminModal = closeAdminModal;
      window.handleAdminLogin = handleAdminLogin;
      window.handleAdminLogout = handleAdminLogout;
      window.syncAdminUI = syncAdminUI;
      window.closeNotificationsModal = closeNotificationsModal;
      window.loadCompletedFilesFromStorage = loadCompletedFilesFromStorage;
      window.saveCompletedFilesToStorage = saveCompletedFilesToStorage;
      window.loadSavedFilesFromStorage = loadSavedFilesFromStorage;
      window.saveSavedFilesToStorage = saveSavedFilesToStorage;
    }

    // Render Interactive Breadcrumb Trail
    function renderBreadcrumbBar() {
      const bar = document.getElementById('breadcrumb-bar');
      const backBtn = document.getElementById('step-back-btn');
      if (!bar) return;

      const isSaved = appState.currentView === 'saved' || appState.onlySavedFilter;
      const isDeep = appState.currentSubject !== null || isSaved || appState.searchQuery.trim() !== '';
      if (backBtn) {
        backBtn.classList.toggle('hidden', !isDeep);
        backBtn.classList.toggle('flex', isDeep);
      }

      // Show the Hero / Explanation card ONLY on the main (root) home page
      const heroSection = document.getElementById('hero-banner-section');
      if (heroSection) {
        heroSection.classList.toggle('hidden', isDeep);
      }

      const crumbs = [
        {
          label: 'الترم الاول',
          icon: 'folder',
          active: !isSaved && !appState.currentSubject && !appState.searchQuery.trim(),
          onClick: () => {
            appState.currentView = 'explorer';
            appState.onlySavedFilter = false;
            appState.previousHierarchy = null;
            appState.searchQuery = '';
            const sInput = document.getElementById('search-input');
            if (sInput) sInput.value = '';
            const cBtn = document.getElementById('clear-search-btn');
            if (cBtn) cBtn.classList.add('hidden');
            navigateToHierarchy(null, null, null);
          }
        }
      ];

      if (isSaved) {
        crumbs.push({
          label: 'الملفات المحفوظة',
          icon: 'bookmark',
          active: true,
          onClick: () => {}
        });
      } else if (appState.searchQuery.trim() !== '') {
        crumbs.push({
          label: `بحث: "${appState.searchQuery.trim()}"`,
          icon: 'search',
          active: true,
          onClick: () => {}
        });
      } else {
        if (appState.currentSubject) {
          const sub = getSubjectObj(appState.currentSubject);
          crumbs.push({
            label: sub.folderName,
            icon: 'folder-open',
            active: !appState.currentCategory,
            onClick: () => navigateToHierarchy(appState.currentSubject, null, null)
          });
        }
        if (appState.currentCategory) {
          crumbs.push({
            label: appState.currentCategory,
            icon: 'folder-open',
            active: appState.currentFolderNum === null,
            onClick: () => navigateToHierarchy(appState.currentSubject, appState.currentCategory, null)
          });
        }
        if (appState.currentFolderNum !== null) {
          crumbs.push({
            label: String(appState.currentFolderNum),
            icon: 'folder-open',
            active: true,
            onClick: () => {}
          });
        }
      }

      bar.innerHTML = crumbs.map((c, i) => `
        <button type="button" data-crumb-idx="${i}" class="crumb-btn px-2 py-1 rounded-xl font-extrabold transition flex items-center gap-1 whitespace-nowrap ${c.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}">
          <i data-lucide="${c.icon}" class="w-3.5 h-3.5 ${c.active ? 'text-emerald-400' : 'text-amber-400'}"></i>
          <span>${c.label}</span>
        </button>
        ${i < crumbs.length - 1 ? `<i data-lucide="chevron-left" class="w-3.5 h-3.5 text-slate-600 shrink-0"></i>` : ''}
      `).join('');

      bar.querySelectorAll('.crumb-btn').forEach(btn => {
        const idx = Number(btn.getAttribute('data-crumb-idx'));
        btn.addEventListener('click', () => crumbs[idx].onClick());
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // High-Fidelity SVG Icons for Subject Cards (Cap, Microscope, File) matching user specification
    const SUBJECT_CARD_ICONS = {
      cap: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#94a3b8" fill="#1e293b"/><path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#94a3b8"/><circle cx="22" cy="16" r="1.5" fill="#f59e0b" stroke="#f59e0b"/></svg>`,
      microscope: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8" stroke="#64748b"/><path d="M3 22h18" stroke="#64748b"/><path d="M14 22a7 7 0 1 0 0-14h-1" stroke="#cbd5e1"/><path d="m9 14 3-3" stroke="#f8fafc"/><path d="m12 11 3 3" stroke="#f8fafc"/><rect x="7" y="3" width="6" height="10" rx="1" transform="rotate(45 10 8)" fill="#f8fafc" stroke="#94a3b8"/></svg>`,
      file: `<svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" fill="#ffffff" stroke="#94a3b8"/><path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="#94a3b8" fill="#e2e8f0"/><path d="M10 13h4M8 17h8" stroke="#475569"/></svg>`
    };

    // Helper: Build Cyber Subject Card according to the user's design
    function buildSubjectCardHTML(sub, isList = false) {
      const subFiles = appState.files.filter(f => f.subject === sub.id);
      const subFilesCount = subFiles.length;

      const subFolders = (Array.isArray(appState.folders) ? appState.folders : []).filter(fl => fl.subject === sub.id);
      const subLecturesCount = new Set([
        ...subFiles.filter(f => f.category === 'محاضرات').map(f => Number(f.folderNum)),
        ...subFolders.filter(fl => fl.category === 'محاضرات').map(fl => Number(fl.folderNum))
      ]).size;

      const subSectionsCount = new Set([
        ...subFiles.filter(f => f.category === 'سكاشن').map(f => Number(f.folderNum)),
        ...subFolders.filter(fl => fl.category === 'سكاشن').map(fl => Number(fl.folderNum))
      ]).size;

      const subDoneFiles = subFiles.filter(f => appState.completedIds.includes(f.id)).length;
      const subProgressPct = subFilesCount > 0 ? Math.round((subDoneFiles / subFilesCount) * 100) : 0;

      const title = sub.displayName || sub.folderName;

      if (isList) {
        return `
          <div data-open-subject="${sub.id}" class="card-3d subject-card-cyber p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 cursor-pointer group">
            <div class="card-3d-inner flex items-center gap-3 min-w-0 md:w-3/12">
              <div class="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-inner">
                <i data-lucide="${sub.icon || 'folder'}" class="w-5 h-5"></i>
              </div>
              <div class="min-w-0">
                <h3 class="subject-cyber-title text-base sm:text-lg font-black truncate">${title}</h3>
                <p class="text-[11px] text-slate-400 truncate">${sub.fullName.split('(')[0].trim()}</p>
              </div>
            </div>

            <div class="card-3d-inner grid grid-cols-3 gap-1.5 sm:gap-2 md:w-5/12">
              <div data-sub-category="محاضرات" data-sub-id="${sub.id}" class="subject-pill px-1.5 sm:px-2 py-1.5 flex items-center justify-between gap-1 cursor-pointer hover:border-cyan-400 transition" title="تصفح محاضرات ${title}">
                <div class="flex items-center gap-1 shrink-0">
                  ${SUBJECT_CARD_ICONS.cap}
                  <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">محاضرات</span>
                </div>
                <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subLecturesCount}</span>
              </div>

              <div data-sub-category="سكاشن" data-sub-id="${sub.id}" class="subject-pill px-1.5 sm:px-2 py-1.5 flex items-center justify-between gap-1 cursor-pointer hover:border-cyan-400 transition" title="تصفح سكاشن ${title}">
                <div class="flex items-center gap-1 shrink-0">
                  ${SUBJECT_CARD_ICONS.microscope}
                  <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">سكاشن</span>
                </div>
                <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subSectionsCount}</span>
              </div>

              <div class="subject-pill px-1.5 sm:px-2 py-1.5 flex items-center justify-between gap-1" title="إجمالي ملفات ${title}">
                <div class="flex items-center gap-1 shrink-0">
                  ${SUBJECT_CARD_ICONS.file}
                  <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">ملفات</span>
                </div>
                <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subFilesCount}</span>
              </div>
            </div>

            <div class="card-3d-inner flex items-center gap-3 md:w-4/12">
              <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap">
                <span>إنجاز المادة: </span>
                <span class="font-black text-cyan-300">%${subProgressPct}</span>
              </div>
              <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
                <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${subProgressPct}%;"></div>
              </div>
              <div class="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:-translate-x-1 transition-transform">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div data-open-subject="${sub.id}" class="card-3d subject-card-cyber px-3 sm:px-3.5 py-4 flex flex-col justify-between gap-3 cursor-pointer group">
          <div class="card-3d-inner flex items-center justify-between">
            <h3 class="subject-cyber-title text-xl sm:text-2xl font-black tracking-wide truncate">
              ${title}
            </h3>
            ${sub.doctor ? `
              <span class="text-[10px] font-bold text-cyan-400/80 bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded-lg truncate max-w-[130px] hidden sm:inline-block shadow-sm">
                ${sub.doctor.replace('قسم ', '')}
              </span>
            ` : ''}
          </div>

          <div class="card-3d-inner grid grid-cols-3 gap-1 sm:gap-1.5">
            <div data-sub-category="محاضرات" data-sub-id="${sub.id}" class="subject-pill px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-1 cursor-pointer hover:border-cyan-400 transition" title="تصفح محاضرات ${title}">
              <div class="flex items-center gap-1 shrink-0">
                ${SUBJECT_CARD_ICONS.cap}
                <span class="text-white font-bold text-[10.5px] sm:text-xs whitespace-nowrap">محاضرات</span>
              </div>
              <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subLecturesCount}</span>
            </div>

            <div data-sub-category="سكاشن" data-sub-id="${sub.id}" class="subject-pill px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-1 cursor-pointer hover:border-cyan-400 transition" title="تصفح سكاشن ${title}">
              <div class="flex items-center gap-1 shrink-0">
                ${SUBJECT_CARD_ICONS.microscope}
                <span class="text-white font-bold text-[10.5px] sm:text-xs whitespace-nowrap">سكاشن</span>
              </div>
              <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subSectionsCount}</span>
            </div>

            <div class="subject-pill px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-1" title="إجمالي ملفات ${title}">
              <div class="flex items-center gap-1 shrink-0">
                ${SUBJECT_CARD_ICONS.file}
                <span class="text-white font-bold text-[10.5px] sm:text-xs whitespace-nowrap">ملفات</span>
              </div>
              <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${subFilesCount}</span>
            </div>
          </div>

          <div class="card-3d-inner w-full h-px bg-cyan-900/50 my-0.5"></div>

          <div class="card-3d-inner flex items-center justify-between gap-2.5">
            <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap shrink-0">
              <span>إنجاز المادة: </span>
              <span class="font-black text-cyan-300">%${subProgressPct}</span>
            </div>
            <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
              <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${subProgressPct}%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Helper: Build Cyber Category Card ("محاضرات" or "سكاشن")
    function buildCategoryCardHTML({ category, subjectObj, files, isList = false }) {
      const catFolders = (Array.isArray(appState.folders) ? appState.folders : []).filter(
        fl => fl.subject === (subjectObj && subjectObj.id) && fl.category === category
      );
      const folderNums = [...new Set([
        ...files.map(f => Number(f.folderNum)),
        ...catFolders.map(fl => Number(fl.folderNum))
      ])];
      const folderCount = folderNums.length;
      const totalFiles = files.length;
      const doneCount = files.filter(f => appState.completedIds.includes(f.id)).length;
      const progressPct = totalFiles > 0 ? Math.round((doneCount / totalFiles) * 100) : 0;
      const isLectures = category === 'محاضرات';
      const iconSvg = isLectures ? SUBJECT_CARD_ICONS.cap : SUBJECT_CARD_ICONS.microscope;
      const unitLabel = isLectures ? 'محاضرات' : 'سكاشن';

      if (isList) {
        return `
          <div data-open-category="${category}" class="card-3d subject-card-cyber p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 cursor-pointer group">
            <div class="card-3d-inner flex items-center gap-3 min-w-0 md:w-3/12">
              <div class="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-inner">
                ${iconSvg}
              </div>
              <div class="min-w-0">
                <h3 class="subject-cyber-title text-base sm:text-lg font-black truncate">${category}</h3>
              </div>
            </div>

            <div class="card-3d-inner grid grid-cols-2 gap-2 md:w-5/12">
              <div class="subject-pill px-2 sm:px-2.5 py-1.5 flex items-center justify-between gap-1" title="عدد مجلدات ${unitLabel}">
                <div class="flex items-center gap-1 shrink-0">
                  ${iconSvg}
                  <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">${unitLabel}</span>
                </div>
                <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${folderCount}</span>
              </div>

              <div class="subject-pill px-2 sm:px-2.5 py-1.5 flex items-center justify-between gap-1" title="إجمالي ملفات ${category}">
                <div class="flex items-center gap-1 shrink-0">
                  ${SUBJECT_CARD_ICONS.file}
                  <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">ملفات</span>
                </div>
                <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${totalFiles}</span>
              </div>
            </div>

            <div class="card-3d-inner flex items-center gap-3 md:w-4/12">
              <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap">
                <span>إنجاز ${category}: </span>
                <span class="font-black text-cyan-300">%${progressPct}</span>
              </div>
              <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
                <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${progressPct}%;"></div>
              </div>
              <div class="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:-translate-x-1 transition-transform">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div data-open-category="${category}" class="card-3d subject-card-cyber px-4 sm:px-5 py-4 sm:py-5 flex flex-col justify-between gap-3.5 cursor-pointer group">
          <div class="card-3d-inner flex items-center justify-between">
            <h3 class="subject-cyber-title text-2xl sm:text-[26px] font-black tracking-wide truncate">
              ${category}
            </h3>
          </div>

          <div class="card-3d-inner grid grid-cols-2 gap-2 sm:gap-3">
            <div class="subject-pill px-2.5 sm:px-3 py-2 flex items-center justify-between gap-1" title="عدد مجلدات ${unitLabel}">
              <div class="flex items-center gap-1.5 shrink-0">
                ${iconSvg}
                <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">${unitLabel}</span>
              </div>
              <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${folderCount}</span>
            </div>

            <div class="subject-pill px-2.5 sm:px-3 py-2 flex items-center justify-between gap-1" title="إجمالي ملفات ${category}">
              <div class="flex items-center gap-1.5 shrink-0">
                ${SUBJECT_CARD_ICONS.file}
                <span class="text-white font-bold text-[11px] sm:text-xs whitespace-nowrap">ملفات</span>
              </div>
              <span class="text-amber-400 font-black text-xs sm:text-sm leading-none shrink-0">${totalFiles}</span>
            </div>
          </div>

          <div class="card-3d-inner w-full h-px bg-cyan-900/50 my-0.5"></div>

          <div class="card-3d-inner flex items-center justify-between gap-3">
            <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap shrink-0">
              <span>إنجاز ${category}: </span>
              <span class="font-black text-cyan-300">%${progressPct}</span>
            </div>
            <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
              <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Helper: Build Cyber Numbered Folder Card ("محاضرة 1", "محاضرة 2" or "سكشن 1"...)
    function buildNumberedFolderCardHTML({ num, category, subjectObj, filesInNum, isList = false }) {
      const unitSingular = category === 'محاضرات' ? 'محاضرة' : 'سكشن';
      const iconSvg = category === 'محاضرات' ? SUBJECT_CARD_ICONS.cap : SUBJECT_CARD_ICONS.microscope;
      const totalFiles = filesInNum.length;
      const doneCount = filesInNum.filter(f => appState.completedIds.includes(f.id)).length;
      const progressPct = totalFiles > 0 ? Math.round((doneCount / totalFiles) * 100) : 0;

      let countSource = 0;
      let countExplain = 0;
      let countSummary = 0;
      let countMindmap = 0;

      filesInNum.forEach(f => {
        const fmt = String(f.format || 'المصدر').trim().toLowerCase();
        if (fmt.includes('شرح')) {
          countExplain++;
        } else if (fmt.includes('تلخيص')) {
          countSummary++;
        } else if (fmt.includes('خريط')) {
          countMindmap++;
        } else {
          countSource++;
        }
      });

      const typeItems = [
        {
          key: 'source',
          label: 'المصدر',
          count: countSource,
          dotColor: 'bg-blue-400',
          dotShadow: 'shadow-[0_0_8px_rgba(96,165,250,0.8)]',
          dotDim: 'bg-blue-400/40',
          textColor: 'text-blue-300'
        },
        {
          key: 'explain',
          label: 'الشرح',
          count: countExplain,
          dotColor: 'bg-emerald-400',
          dotShadow: 'shadow-[0_0_8px_rgba(52,211,153,0.8)]',
          dotDim: 'bg-emerald-400/40',
          textColor: 'text-emerald-300'
        },
        {
          key: 'summary',
          label: 'التلخيص',
          count: countSummary,
          dotColor: 'bg-amber-400',
          dotShadow: 'shadow-[0_0_8px_rgba(251,191,36,0.8)]',
          dotDim: 'bg-amber-400/40',
          textColor: 'text-amber-300'
        },
        {
          key: 'mindmap',
          label: 'خريطة ذهنية',
          count: countMindmap,
          dotColor: 'bg-purple-400',
          dotShadow: 'shadow-[0_0_8px_rgba(192,132,252,0.8)]',
          dotDim: 'bg-purple-400/40',
          textColor: 'text-purple-300'
        }
      ];

      const renderTypePill = (item) => {
        if (item.count > 0) {
          return `
            <div class="subject-pill px-2 py-1.5 sm:px-2.5 sm:py-2 flex items-center justify-between gap-1" title="${item.label}: ${item.count} ملف">
              <div class="flex items-center gap-1.5 shrink-0 min-w-0">
                <span class="w-2 h-2 rounded-full ${item.dotColor} ${item.dotShadow} shrink-0"></span>
                <span class="text-white font-bold text-[10.5px] sm:text-xs truncate">${item.label}</span>
              </div>
              <span class="${item.textColor} font-black text-[10.5px] sm:text-xs whitespace-nowrap shrink-0">${item.count} ملف</span>
            </div>
          `;
        }
        return `
          <div class="px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-[0.85rem] border border-dashed border-cyan-800/40 bg-slate-900/40 flex items-center justify-between gap-1 select-none transition" title="${item.label}: غير مضاف">
            <div class="flex items-center gap-1.5 shrink-0 min-w-0">
              <span class="w-2 h-2 rounded-full ${item.dotDim} shrink-0"></span>
              <span class="text-slate-400/80 font-medium text-[10.5px] sm:text-xs truncate">${item.label}</span>
            </div>
            <span class="text-slate-500 font-bold text-[10px] sm:text-[10.5px] whitespace-nowrap shrink-0">غير مضاف</span>
          </div>
        `;
      };

      if (isList) {
        return `
          <div data-open-foldernum="${num}" class="card-3d subject-card-cyber p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 cursor-pointer group">
            <div class="card-3d-inner flex items-center gap-3 min-w-0 md:w-3/12">
              <div class="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-inner">
                ${iconSvg}
              </div>
              <div class="min-w-0">
                <h3 class="subject-cyber-title text-base sm:text-lg font-black truncate">${unitSingular} ${num}</h3>
              </div>
            </div>

            <div class="card-3d-inner grid grid-cols-2 gap-1.5 sm:gap-2 md:w-6/12">
              ${typeItems.map(renderTypePill).join('')}
            </div>

            <div class="card-3d-inner flex items-center gap-3 md:w-3/12">
              <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap">
                <span>إنجاز: </span>
                <span class="font-black text-cyan-300">%${progressPct}</span>
              </div>
              <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
                <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${progressPct}%;"></div>
              </div>
              <div class="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:-translate-x-1 transition-transform">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div data-open-foldernum="${num}" class="card-3d subject-card-cyber px-3 sm:px-3.5 py-4 flex flex-col justify-between gap-3 cursor-pointer group">
          <div class="card-3d-inner flex items-center justify-between">
            <h3 class="subject-cyber-title text-xl sm:text-2xl font-black tracking-wide truncate">
              ${unitSingular} ${num}
            </h3>
          </div>

          <div class="card-3d-inner grid grid-cols-2 gap-1.5 sm:gap-2">
            ${typeItems.map(renderTypePill).join('')}
          </div>

          <div class="card-3d-inner w-full h-px bg-cyan-900/50 my-0.5"></div>

          <div class="card-3d-inner flex items-center justify-between gap-2.5">
            <div class="subject-progress-text text-xs sm:text-sm font-black whitespace-nowrap shrink-0">
              <span>إنجاز ${unitSingular}: </span>
              <span class="font-black text-cyan-300">%${progressPct}</span>
            </div>
            <div class="flex-1 h-2 bg-[#041a2a] border border-cyan-900/80 rounded-full overflow-hidden p-[1px]">
              <div class="h-full bg-gradient-to-l from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.7)]" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Helper: Build a 3D Folder Card
    function buildFolderCardHTML({ title, subtitle, timestamp, itemCountLabel, badgeText, dataAttrs }) {
      if (appState.layoutMode === 'list') {
        return `
          <div ${dataAttrs} class="card-3d glass-panel rounded-2xl p-3.5 sm:p-4 border border-slate-800 hover:border-amber-500/50 cursor-pointer flex items-center justify-between gap-3 transition">
            <div class="card-3d-inner flex items-center gap-3.5 min-w-0">
              <div class="folder-3d-icon"></div>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h4 class="text-base sm:text-lg font-black text-white truncate">${title}</h4>
                  ${badgeText ? `<span class="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] font-bold whitespace-nowrap">${badgeText}</span>` : ''}
                </div>
                <p class="text-xs text-slate-400 truncate mt-0.5">${subtitle}</p>
                <span class="text-[11px] text-slate-500 font-semibold block mt-0.5" dir="ltr">${timestamp}</span>
              </div>
            </div>
            <div class="card-3d-inner flex items-center gap-2.5 shrink-0">
              <span class="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-extrabold text-slate-200 whitespace-nowrap" dir="ltr">${itemCountLabel}</span>
              <div class="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div ${dataAttrs} class="card-3d glass-panel rounded-3xl p-5 border border-slate-800 hover:border-amber-500/60 cursor-pointer flex flex-col justify-between gap-4 transition group">
          <div class="card-3d-inner flex items-start justify-between gap-3">
            <div class="folder-3d-icon"></div>
            <span class="px-3 py-1 rounded-xl bg-slate-900/95 border border-amber-500/30 text-xs font-extrabold text-amber-300 shadow whitespace-nowrap" dir="ltr">
              ${itemCountLabel}
            </span>
          </div>

          <div class="card-3d-inner space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <h4 class="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition">${title}</h4>
              ${badgeText ? `<span class="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold whitespace-nowrap">${badgeText}</span>` : ''}
            </div>
            <p class="text-xs text-slate-300 font-medium line-clamp-1">${subtitle}</p>
          </div>

          <div class="card-3d-inner pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span dir="ltr">${timestamp}</span>
            <span class="text-amber-400 font-extrabold flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
              <span>فتح المجلد</span>
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>
      `;
    }

    // Helper: Strip leading format prefix (e.g. "شرح: ", "تلخيص: ", "المصدر: ", "خريطه ذهنية: ") from file title
    function getCleanFileTitle(file) {
      let t = String(file?.title || '').replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();
      t = t.replace(/^(المصدر|شرح|تلخيص|خريطه ذهنية|خريطة ذهنية)\s*[:\-]\s*/i, '');
      return t || String(file?.title || '');
    }

    // Helper: Detect if description/keypoints/clinicalNote were auto-generated placeholders from older uploads
    function getCleanOptionalFields(file) {
      const sub = getSubjectObj(file.subject);
      const unitName = file.category === 'محاضرات' ? 'المحاضرة' : 'السكشن';
      const autoDesc = `ملف (${file.format}) خاص بـ ${unitName} رقم (${file.folderNum}) في مقرر ${sub.fullName}.`;
      const autoKp = `${file.format} معتمد لـ ${unitName} رقم (${file.folderNum}) في مقرر ${sub.folderName}`;
      const autoNote = `راجع ملف (${file.format}) جيداً قبل الامتحان.`;

      const rawDesc = String(file.description || '').trim();
      const description = (rawDesc && rawDesc !== autoDesc) ? rawDesc : '';

      const rawKps = Array.isArray(file.keypoints) ? file.keypoints.map(k => String(k || '').trim()).filter(Boolean) : [];
      const keypoints = rawKps.filter(k => k !== autoKp);

      const rawNote = String(file.clinicalNote || '').trim();
      const clinicalNote = (rawNote && rawNote !== autoNote) ? rawNote : '';

      return { description, keypoints, clinicalNote };
    }

    // Helper: Build File Card HTML inside Numbered Folder (Supports both Grid & Compact List Modes)
    function buildFileCardHTML(file, showFullPath = false) {
      const sub = getSubjectObj(file.subject);
      const isSaved = appState.savedIds.includes(file.id);
      const isCompleted = appState.completedIds.includes(file.id);
      const fmt = getFormatVisuals(file.format);

      if (appState.layoutMode === 'list') {
        return `
          <article class="card-3d glass-panel rounded-2xl p-3.5 sm:p-4 border ${isCompleted ? 'border-emerald-500/50' : 'border-slate-800'} flex flex-col md:flex-row md:items-center justify-between gap-3" data-file-id="${file.id}">
            <div class="card-3d-inner flex items-start sm:items-center gap-3 min-w-0 flex-1">
              <div class="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${fmt.badgeClass}">
                <i data-lucide="${fmt.icon}" class="w-5 h-5"></i>
              </div>
              <div class="min-w-0 flex-1 space-y-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded-lg border text-[11px] font-extrabold ${fmt.badgeClass}">${fmt.label}</span>
                  <span class="px-2 py-0.5 rounded-lg bg-slate-900 text-amber-300 border border-slate-700 text-[10.5px] font-extrabold">${showFullPath ? `${sub.displayName || sub.folderName} • ` : ''}${file.category} > مجلد ${file.folderNum}</span>
                  <span class="text-[11px] text-cyan-300 font-bold" dir="ltr">${file.size} • <span id="card-dl-${file.id}">${file.downloads}</span> DL</span>
                </div>
                <h4 class="text-sm sm:text-base font-black text-white truncate hover:text-amber-300 transition cursor-pointer" data-file-action="preview" data-id="${escapeHTML(file.id)}" data-file-id="${escapeHTML(file.id)}">
                  ${escapeHTML(getCleanFileTitle(file))}
                </h4>
              </div>
            </div>
            <div class="card-3d-inner flex flex-wrap items-center justify-end gap-1.5 shrink-0">
              <button type="button" data-file-action="toggle-save" data-id="${file.id}" data-file-id="${file.id}" class="p-2 rounded-xl ${isSaved ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-amber-300 border border-slate-700'} transition" title="${isSaved ? 'إزالة من المحفوظات' : 'حفظ في مكتبتي'}">
                <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-current' : ''}"></i>
              </button>
              <button type="button" data-file-action="toggle-complete" data-id="${file.id}" data-file-id="${file.id}" class="p-2 rounded-xl ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-emerald-300 border border-slate-700'} transition" title="${isCompleted ? 'تمت المذاكرة' : 'تحديد كمذاكر'}">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              </button>
              <button type="button" data-file-action="preview" data-id="${file.id}" data-file-id="${file.id}" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-extrabold flex items-center gap-1.5 transition">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>معاينة</span>
              </button>
              <button type="button" data-file-action="download" data-id="${file.id}" data-file-id="${file.id}" class="btn-3d py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold flex items-center gap-1.5">
                <i data-lucide="download-cloud" class="w-4 h-4"></i>
                <span>تحميل</span>
              </button>
              ${appState.isAdmin ? `
                <button type="button" data-file-action="edit" data-id="${file.id}" data-file-id="${file.id}" class="px-2.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/40 text-[11px] font-bold">تعديل</button>
                <button type="button" data-file-action="delete" data-id="${file.id}" data-file-id="${file.id}" class="px-2.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border border-rose-500/40 text-[11px] font-bold">حذف</button>
              ` : ''}
            </div>
          </article>
        `;
      }

      return `
        <article class="card-3d glass-panel rounded-3xl p-4 sm:p-5 border ${isCompleted ? 'border-emerald-500/50' : 'border-slate-800'} flex flex-col justify-between gap-4 h-full" data-file-id="${file.id}">
          <div class="card-3d-inner space-y-3">
            
            <!-- Top Row: File Format Badge (المصدر / شرح / تلخيص / خريطه ذهنية) & Bookmark / Studied Toggles -->
            <div class="flex items-start justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 ${fmt.badgeClass}">
                  <i data-lucide="${fmt.icon}" class="w-3.5 h-3.5"></i>
                  <span>${fmt.label}</span>
                </span>
                <span class="px-2.5 py-1 rounded-xl bg-slate-900 text-amber-300 border border-slate-700 text-[11px] font-extrabold">
                  ${file.category} > مجلد ${file.folderNum}
                </span>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button type="button" data-file-action="toggle-save" data-id="${file.id}" data-file-id="${file.id}" class="p-2 rounded-xl ${isSaved ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-amber-300 border border-slate-700'} transition" title="${isSaved ? 'إزالة من المحفوظات' : 'حفظ في مكتبتي'}">
                  <i data-lucide="bookmark" class="w-4 h-4 ${isSaved ? 'fill-current' : ''}"></i>
                </button>
                <button type="button" data-file-action="toggle-complete" data-id="${file.id}" data-file-id="${file.id}" class="p-2 rounded-xl ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800/80 text-slate-400 hover:text-emerald-300 border border-slate-700'} transition" title="${isCompleted ? 'تمت المذاكرة' : 'تحديد كمذاكر'}">
                  <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            ${showFullPath ? `
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-amber-500/25 text-[11px] font-extrabold text-amber-300">
                <i data-lucide="folder-tree" class="w-3.5 h-3.5"></i>
                <span>الترم الاول > ${sub.displayName || sub.folderName} > ${file.category} > ${file.folderNum}</span>
              </div>
            ` : ''}

            <h4 class="text-sm sm:text-base font-black text-white leading-snug hover:text-amber-300 transition cursor-pointer" data-file-action="preview" data-id="${escapeHTML(file.id)}" data-file-id="${escapeHTML(file.id)}">
              ${escapeHTML(getCleanFileTitle(file))}
            </h4>

            ${getCleanOptionalFields(file).description ? `
              <p class="text-xs text-slate-300 leading-relaxed line-clamp-2">
                ${escapeHTML(getCleanOptionalFields(file).description)}
              </p>
            ` : ''}
          </div>

          <div class="card-3d-inner pt-3 border-t border-slate-800/90 space-y-3">
            <div class="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span class="truncate">${escapeHTML(file.doctor || '')}</span>
              <span class="shrink-0 font-bold text-cyan-300" dir="ltr">${file.size} • <span id="card-dl-${file.id}">${file.downloads}</span> DL</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button type="button" data-file-action="preview" data-id="${file.id}" data-file-id="${file.id}" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-extrabold flex items-center justify-center gap-1.5 transition">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>معاينة</span>
              </button>
              <button type="button" data-file-action="download" data-id="${file.id}" data-file-id="${file.id}" class="btn-3d py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5">
                <i data-lucide="download-cloud" class="w-4 h-4"></i>
                <span>تحميل</span>
              </button>
            </div>

            ${appState.isAdmin ? `
              <div class="flex items-center justify-between gap-2 pt-2 border-t border-amber-500/30">
                <span class="text-[10px] font-bold text-amber-400">تحكم المسؤول:</span>
                <div class="flex items-center gap-1.5">
                  <button type="button" data-file-action="edit" data-id="${file.id}" data-file-id="${file.id}" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/40 text-[11px] font-bold">تعديل</button>
                  <button type="button" data-file-action="delete" data-id="${file.id}" data-file-id="${file.id}" class="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border border-rose-500/40 text-[11px] font-bold">حذف</button>
                </div>
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }

    // Main Render Engine for the 4-Level Folder Hierarchy
    function renderExplorerContent() {
      const grid = document.getElementById('explorer-grid');
      const emptyState = document.getElementById('empty-state');
      const heading = document.getElementById('explorer-heading');
      const countBadge = document.getElementById('explorer-count-badge');
      if (!grid) return;

      emptyState.classList.add('hidden');
      const isList = appState.layoutMode === 'list';

      // CASE A: Global Search Mode or Saved Bookmarks Mode
      const isSavedMode = appState.currentView === 'saved' || appState.onlySavedFilter;
      const q = normalizeArabicSearch(appState.searchQuery);
      if (q !== '' || isSavedMode) {
        if (isSavedMode) loadSavedFilesFromStorage();
        const qTokens = q.split(' ').filter(Boolean);
        const matchedFiles = appState.files.filter(f => {
          if (isSavedMode && !appState.savedIds.includes(f.id)) return false;
          if (qTokens.length > 0) {
            const sub = getSubjectObj(f.subject);
            const hay = normalizeArabicSearch(`${sub.folderName} ${sub.displayName || ''} ${sub.fullName} ${f.category} ${f.folderNum} ${f.format} ${f.title} ${f.originalFileName || ''} ${f.description} ${(f.keypoints || []).join(' ')}`);
            if (!qTokens.every(tok => hay.includes(tok))) return false;
          }
          return true;
        });

        if (isSavedMode && q) {
          heading.textContent = `بحث في المحفوظات: "${appState.searchQuery.trim()}"`;
        } else if (isSavedMode) {
          heading.textContent = 'الملفات المحفوظة';
        } else {
          heading.textContent = `نتائج البحث: "${appState.searchQuery.trim()}"`;
        }
        countBadge.textContent = `${matchedFiles.length} ملف`;

        grid.className = isList
          ? 'grid grid-cols-1 gap-3.5 perspective-container'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-container';

        if (matchedFiles.length === 0) {
          grid.innerHTML = '';
          emptyState.classList.remove('hidden');
          const emptyTitle = emptyState.querySelector('h4');
          const emptyDesc = emptyState.querySelector('p');
          if (isSavedMode) {
            if (emptyTitle) emptyTitle.textContent = 'لا توجد ملفات محفوظة حالياً';
            if (emptyDesc) emptyDesc.textContent = 'يمكنك حفظ أي ملف عبر الضغط على أيقونة الإشارة المرجعية (Bookmark) داخل بطاقات الملفات.';
          } else {
            if (emptyTitle) emptyTitle.textContent = 'لا توجد ملفات أو مجلدات مطابقة';
            if (emptyDesc) emptyDesc.textContent = 'يمكنك العودة إلى مقررات الترم الاول لتصفح جميع المقررات الثمانية.';
          }
          return;
        }

        grid.innerHTML = matchedFiles.map(f => buildFileCardHTML(f, true)).join('');
        if (typeof lucide !== 'undefined') lucide.createIcons();
        attach3DTiltListeners();
        updateLibraryCounters();
        return;
      }

      // CASE B: LEVEL 1 — Root -> Show the 8 Ordered Subject Cards (Styled to User Specification)
      if (!appState.currentSubject) {
        heading.textContent = 'مقررات الترم الاول';
        countBadge.textContent = '8 مقررات دراسية';

        grid.className = isList
          ? 'grid grid-cols-1 gap-3.5 perspective-container'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 perspective-container';

        grid.innerHTML = ORDERED_SUBJECTS.map(sub => buildSubjectCardHTML(sub, isList)).join('');

        grid.querySelectorAll('[data-open-subject]').forEach(el => {
          el.addEventListener('click', (e) => {
            const pill = e.target.closest('[data-sub-category]');
            if (pill) {
              const cat = pill.getAttribute('data-sub-category');
              const subId = pill.getAttribute('data-sub-id') || el.getAttribute('data-open-subject');
              navigateToHierarchy(subId, cat, null);
              return;
            }
            navigateToHierarchy(el.getAttribute('data-open-subject'), null, null);
          });
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        attach3DTiltListeners();
        updateLibraryCounters();
        return;
      }

      // CASE C: LEVEL 2 — Inside a Subject -> Show `سكاشن` & `محاضرات` (Styled like Subject Cards)
      const currentSubObj = getSubjectObj(appState.currentSubject);
      if (!appState.currentCategory) {
        heading.textContent = `مجلد مقرر: ${currentSubObj.displayName || currentSubObj.folderName}`;
        countBadge.textContent = 'قسمان (محاضرات • سكاشن)';

        grid.className = isList
          ? 'grid grid-cols-1 gap-3.5 perspective-container'
          : 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl perspective-container';

        const secFiles = appState.files.filter(f => f.subject === currentSubObj.id && f.category === 'سكاشن');
        const lecFiles = appState.files.filter(f => f.subject === currentSubObj.id && f.category === 'محاضرات');

        grid.innerHTML = [
          buildCategoryCardHTML({
            category: 'محاضرات',
            subjectObj: currentSubObj,
            files: lecFiles,
            isList
          }),
          buildCategoryCardHTML({
            category: 'سكاشن',
            subjectObj: currentSubObj,
            files: secFiles,
            isList
          })
        ].join('');

        grid.querySelectorAll('[data-open-category]').forEach(el => {
          el.addEventListener('click', () => {
            navigateToHierarchy(currentSubObj.id, el.getAttribute('data-open-category'), null);
          });
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        attach3DTiltListeners();
        updateLibraryCounters();
        return;
      }

      // CASE D: LEVEL 3 — Inside `سكاشن` or `محاضرات` -> Show Numbered Folders `1`, `2`, `3`... (Styled like Subject Cards)
      if (appState.currentFolderNum === null) {
        const unitSingular = appState.currentCategory === 'محاضرات' ? 'محاضرة' : 'سكشن';
        heading.textContent = `${currentSubObj.displayName || currentSubObj.folderName} > ${appState.currentCategory}`;

        const catFiles = appState.files.filter(
          f => f.subject === currentSubObj.id && f.category === appState.currentCategory
        );
        const catFolders = (Array.isArray(appState.folders) ? appState.folders : []).filter(
          fl => fl.subject === currentSubObj.id && fl.category === appState.currentCategory
        );
        const folderNumbers = [...new Set([
          ...catFiles.map(f => Number(f.folderNum)),
          ...catFolders.map(fl => Number(fl.folderNum))
        ])].filter(n => !isNaN(n) && n >= 1).sort((a, b) => a - b);

        const unitPlural = appState.currentCategory === 'محاضرات' ? 'محاضرات' : 'سكاشن';
        countBadge.textContent = `${folderNumbers.length} ${unitPlural} • ${catFiles.length} ملف`;

        grid.className = isList
          ? 'grid grid-cols-1 gap-3.5 perspective-container'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 perspective-container';

        if (folderNumbers.length === 0) {
          grid.innerHTML = '';
          emptyState.classList.remove('hidden');
          return;
        }

        grid.innerHTML = folderNumbers.map(num => {
          const filesInNum = catFiles.filter(f => Number(f.folderNum) === num);
          return buildNumberedFolderCardHTML({
            num,
            category: appState.currentCategory,
            subjectObj: currentSubObj,
            filesInNum,
            isList
          });
        }).join('');

        grid.querySelectorAll('[data-open-foldernum]').forEach(el => {
          el.addEventListener('click', () => {
            navigateToHierarchy(currentSubObj.id, appState.currentCategory, Number(el.getAttribute('data-open-foldernum')));
          });
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        attach3DTiltListeners();
        updateLibraryCounters();
        return;
      }

      // CASE E: LEVEL 4 — Inside Numbered Folder -> Show Files
      const folderFiles = appState.files.filter(
        f => f.subject === currentSubObj.id &&
             f.category === appState.currentCategory &&
             Number(f.folderNum) === Number(appState.currentFolderNum)
      );

      heading.textContent = `${currentSubObj.folderName} > ${appState.currentCategory} > مجلد (${appState.currentFolderNum})`;
      const level4Types = [...new Set(folderFiles.map(f => String(f.format || 'المصدر').trim()))].join(' • ');
      countBadge.textContent = level4Types ? `${folderFiles.length} ملفات (${level4Types})` : `${folderFiles.length} ملفات`;

      grid.className = isList
        ? 'grid grid-cols-1 gap-3.5 perspective-container'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-container';

      if (folderFiles.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      grid.innerHTML = folderFiles.map(f => buildFileCardHTML(f, false)).join('');
      if (typeof lucide !== 'undefined') lucide.createIcons();
      attach3DTiltListeners();
      updateLibraryCounters();
    }

    // Helper: Convert any Google Drive sharing URL or file ID to a direct download / open URL
    // Extract a Google Drive file ID from any common Drive link format:
    // /file/d/{ID}/view, /file/u/0/d/{ID}, open?id={ID}, uc?id={ID}, drive.usercontent.google.com/download?id={ID}
    function extractDriveFileId(url) {
      if (!url) return '';
      try {
        const u = new URL(url);
        if (!/(^|\.)drive\.google\.com$/.test(u.hostname) && !/(^|\.)drive\.usercontent\.google\.com$/.test(u.hostname)) {
          return '';
        }
        const m = u.pathname.match(/\/file\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]{10,})/);
        if (m && m[1]) return m[1];
        const idParam = u.searchParams.get('id');
        if (idParam && /^[a-zA-Z0-9_-]{10,}$/.test(idParam)) return idParam;
      } catch (e) {}
      return '';
    }

    function resolveDriveUrl(file) {
      const extUrl = String(file.externalUrl || '').trim();
      if (extUrl && (extUrl.includes('t.me/') || extUrl.includes('telegram.'))) {
        return extUrl.startsWith('http') ? extUrl : ('https://' + extUrl);
      }
      const rawUrl = String(
        file.downloadUrl || file.fileUrl || file.driveUrl || file.webContentLink || file.url || extUrl || ''
      ).trim();
      if (file.driveFileId) {
        return 'https://drive.google.com/uc?export=download&id=' + file.driveFileId;
      }
      if (!rawUrl) return '';
      const normalized = rawUrl.startsWith('http') || rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')
        ? rawUrl
        : ('https://' + rawUrl);
      const driveId = extractDriveFileId(normalized);
      if (driveId) {
        return 'https://drive.google.com/uc?export=download&id=' + driveId;
      }
      return normalized;
    }

    // Trigger Real Download of a File
    function triggerFileDownload(file) {
      file.downloads = (Number(file.downloads) || 0) + 1;
      file.downloadsCount = file.downloads;
      recordPendingDownloadIncrement(file);
      appState.lastRenderedSignature = computeDatabaseSignature(appState.files, appState.folders, appState.aboutContent);
      saveAppState();

      const cardDl = document.getElementById(`card-dl-${file.id}`);
      if (cardDl) cardDl.textContent = file.downloads;
      const previewDl = document.getElementById('preview-downloads');
      if (previewDl && appState.activePreviewId === file.id) {
        previewDl.textContent = `${file.downloads} تحميل`;
      }

      // 1. Priority: Direct Google Drive URL or External Link (Telegram / Drive)
      const cloudUrl = resolveDriveUrl(file);
      if (cloudUrl) {
        fetch(GAS_WEB_APP_URL, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'increment_download', id: file.id }) }).catch(() => {});
        window.open(cloudUrl, '_blank', 'noopener');
        const isTelegram = cloudUrl.includes('t.me/') || cloudUrl.includes('telegram.');
        showToast(isTelegram ? 'جاري فتح رابط التيليجرام للملف الأصلي...' : 'جاري فتح وتحميل الملف الأصلي...', 'success');
        return;
      }

      // 2. Embedded Base64 file stored inside JSON database
      if (file.fileDataUrl || file.fileBase64) {
        const mime = file.fileMimeType || 'application/octet-stream';
        const href = file.fileDataUrl || ('data:' + mime + ';base64,' + file.fileBase64);
        const a = document.createElement('a');
        a.href = href;
        a.download = file.originalFileName || (file.title + '.pdf');
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast('تم تحميل الملف الأصلي بنجاح!', 'success');
        return;
      }

      // 3. Local session cache (same device right after upload)
      if (appState.uploadedFileCache[file.id]) {
        const cached = appState.uploadedFileCache[file.id];
        const a = document.createElement('a');
        a.href = cached.url;
        a.download = cached.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast(`تم تحميل الملف الأصلي: ${cached.name}`, 'success');
        return;
      }

      showToast('تنبيه: هذا السجل لا يحتوي على رابط ملف مرفوع بعد.', 'warning');
    }

    function syncModalCompleteUI(isCompleted) {
      const compText = document.getElementById('modal-complete-text');
      if (compText) {
        compText.textContent = isCompleted ? 'تمت المذاكرة ✓' : 'تحديد كمذاكر';
      }
    }

    // Open File Preview Modal
    function openPreviewModal(fileId) {
      if (!fileId) return;
      const file = appState.files.find(f => f.id === fileId);
      if (!file) return;

      appState.activePreviewId = file.id;
      const sub = getSubjectObj(file.subject);
      const fmt = getFormatVisuals(file.format);

      document.getElementById('preview-badges').innerHTML = `
        <span class="px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1 ${fmt.badgeClass}">
          <i data-lucide="${fmt.icon}" class="w-3.5 h-3.5"></i>
          <span>${fmt.label}</span>
        </span>
        <span class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold">${sub.folderName}</span>
        <span class="px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-300 text-xs font-extrabold">${file.category} > ${file.folderNum}</span>
      `;
      document.getElementById('preview-title').textContent = getCleanFileTitle(file);
      document.getElementById('preview-folder-path').textContent = `الترم الاول > ${sub.displayName || sub.folderName} > ${file.category} > ${file.folderNum}`;
      document.getElementById('preview-doctor').textContent = file.doctor;
      document.getElementById('preview-meta').textContent = `${file.format} • ${file.size}`;
      document.getElementById('preview-downloads').textContent = `${file.downloads} تحميل`;

      const cleanOpt = getCleanOptionalFields(file);

      const descBox = document.getElementById('preview-description-box');
      if (cleanOpt.description) {
        descBox.classList.remove('hidden');
        document.getElementById('preview-description').textContent = cleanOpt.description;
      } else {
        descBox.classList.add('hidden');
        document.getElementById('preview-description').textContent = '';
      }

      const kpBox = document.getElementById('preview-keypoints-box');
      const kpList = document.getElementById('preview-keypoints');
      if (cleanOpt.keypoints.length > 0) {
        kpBox.classList.remove('hidden');
        kpList.innerHTML = cleanOpt.keypoints.map(kp => `<li class="leading-relaxed">${escapeHTML(kp)}</li>`).join('');
      } else {
        kpBox.classList.add('hidden');
        kpList.innerHTML = '';
      }

      const noteBox = document.getElementById('preview-clinical-note-box');
      if (cleanOpt.clinicalNote) {
        noteBox.classList.remove('hidden');
        document.getElementById('preview-clinical-note').textContent = cleanOpt.clinicalNote;
      } else {
        noteBox.classList.add('hidden');
        document.getElementById('preview-clinical-note').textContent = '';
      }

      const extBtn = document.getElementById('modal-external-link-btn');
      const cloudViewUrl = file.externalUrl || file.fileUrl || file.driveUrl || file.downloadUrl || '';
      if (cloudViewUrl) {
        extBtn.classList.remove('hidden');
        extBtn.onclick = () => window.open(cloudViewUrl, '_blank', 'noopener');
      } else {
        extBtn.classList.add('hidden');
      }

      // Inject live Google Drive preview iframe inside modal when Drive file is available
      const modalBody = document.querySelector('#preview-modal .modal-body-scroll');
      let drivePreviewContainer = document.getElementById('preview-drive-embed-box');
      const driveId = file.driveFileId || extractDriveFileId(cloudViewUrl);
      if (modalBody) {
        if (!drivePreviewContainer) {
          drivePreviewContainer = document.createElement('div');
          drivePreviewContainer.id = 'preview-drive-embed-box';
          drivePreviewContainer.className = 'rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90';
          modalBody.appendChild(drivePreviewContainer);
        }
        if (driveId) {
          drivePreviewContainer.classList.remove('hidden');
          const isImageFile =
            file.format === 'خريطه ذهنية' ||
            /\b(PNG|JPG|JPEG|WEBP|GIF)\b/i.test(String(file.size || '')) ||
            /\.(png|jpe?g|webp|gif)$/i.test(String(file.originalFileName || ''));

          if (isImageFile) {
            const safeDriveId = encodeURIComponent(driveId);
            const highResImgUrl = `https://drive.google.com/thumbnail?id=${safeDriveId}&sz=w2400`;
            drivePreviewContainer.innerHTML = `
              <div class="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-300 font-extrabold">
                <span>معاينة الخريطة الذهنية / الصورة (اسحب للتمرير أو كَبّر القراءة)</span>
                <div class="flex items-center gap-1.5">
                  <button type="button" id="preview-img-zoom-out" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-black" title="تصغير">−</button>
                  <button type="button" id="preview-img-zoom-reset" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-[11px] font-black" title="إعادة ضبط الحجم">100%</button>
                  <button type="button" id="preview-img-zoom-in" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-black" title="تكبير">+</button>
                  <a href="https://drive.google.com/file/d/${safeDriveId}/view" target="_blank" rel="noopener" class="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:underline">نافذة كاملة ↗</a>
                </div>
              </div>
              <div id="preview-img-scroll-wrap" class="w-full h-[380px] sm:h-[460px] overflow-auto bg-slate-950 flex items-center justify-center p-2">
                <img id="preview-zoomable-img" src="${highResImgUrl}" alt="${escapeHTML(getCleanFileTitle(file))}" class="max-w-full max-h-full object-contain transition-transform duration-200" style="transform-origin: center center;" />
              </div>
            `;
            let currentZoom = 1;
            const imgEl = document.getElementById('preview-zoomable-img');
            const resetBtn = document.getElementById('preview-img-zoom-reset');
            const applyZoom = (z) => {
              currentZoom = Math.min(4, Math.max(0.5, Number(z.toFixed(2))));
              if (imgEl) {
                if (currentZoom === 1) {
                  imgEl.style.maxWidth = '100%';
                  imgEl.style.maxHeight = '100%';
                  imgEl.style.width = 'auto';
                } else {
                  imgEl.style.maxWidth = 'none';
                  imgEl.style.maxHeight = 'none';
                  imgEl.style.width = `${Math.round(currentZoom * 100)}%`;
                }
              }
              if (resetBtn) resetBtn.textContent = `${Math.round(currentZoom * 100)}%`;
            };
            const zIn = document.getElementById('preview-img-zoom-in');
            const zOut = document.getElementById('preview-img-zoom-out');
            if (zIn) zIn.onclick = () => applyZoom(currentZoom + 0.35);
            if (zOut) zOut.onclick = () => applyZoom(currentZoom - 0.35);
            if (resetBtn) resetBtn.onclick = () => applyZoom(1);
            if (imgEl) {
              imgEl.onerror = () => {
                const wrap = document.getElementById('preview-img-scroll-wrap');
                if (wrap) {
                  wrap.innerHTML = `<iframe src="https://drive.google.com/file/d/${safeDriveId}/preview" class="w-full h-full border-0" allow="autoplay"></iframe>`;
                }
              };
            }
          } else {
            drivePreviewContainer.innerHTML = `
              <div class="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-amber-300 font-extrabold">
                <span>معاينة مباشرة من Google Drive</span>
                <a href="https://drive.google.com/file/d/${encodeURIComponent(driveId)}/view" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">فتح في نافذة كاملة ↗</a>
              </div>
              <iframe src="https://drive.google.com/file/d/${encodeURIComponent(driveId)}/preview" class="w-full h-[380px] sm:h-[460px] border-0" allow="autoplay"></iframe>
            `;
          }
        } else {
          drivePreviewContainer.classList.add('hidden');
          drivePreviewContainer.innerHTML = '';
        }
      }

      const isCompleted = appState.completedIds.includes(file.id);
      syncModalCompleteUI(isCompleted);

      document.body.classList.add('overflow-hidden');
      document.getElementById('preview-modal').classList.remove('hidden');
      pushNavigationHistoryState({ modalOpen: 'preview', previewFileId: file.id });
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Close File Preview Modal & Clean Up
    function closePreviewModal() {
      const modal = document.getElementById('preview-modal');
      if (!modal) return;
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
      appState.activePreviewId = null;

      // Clean up any dynamic media/iframes if injected
      const iframes = modal.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try { iframe.src = 'about:blank'; } catch (e) {}
      });
    }

    // =====================================================================
    // ABOUT SECTION & FORMATS GUIDE CONTROLLER (EDITABLE BY ADMIN)
    // =====================================================================
    function renderAboutView() {
      const container = document.getElementById('about-view-container');
      if (!container) return;
      const c = appState.aboutContent || DEFAULT_ABOUT_CONTENT;

      container.innerHTML = `
        <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 border border-amber-500/30 space-y-1.5">
          <p class="font-bold text-amber-300 text-xs sm:text-sm">${escapeHTML(c.greeting)}</p>
          <p class="font-extrabold text-white text-xs sm:text-sm leading-relaxed">${escapeHTML(c.verse)}</p>
          <p class="text-slate-300 text-xs pt-0.5">${escapeHTML(c.modelNote)}</p>
        </div>

        <div class="space-y-2.5">
          <p class="font-black text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
            <i data-lucide="layers" class="w-4 h-4 text-amber-400"></i>
            <span>${escapeHTML(c.typesHeading)}</span>
          </p>

          <div class="grid grid-cols-1 gap-2.5">
            <div class="p-3 rounded-xl bg-slate-900/70 border border-emerald-500/30 flex items-start gap-2.5">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black shrink-0 whitespace-nowrap">[المصدر]</span>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHTML(c.sourceDesc)}</p>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/70 border border-cyan-500/30 flex items-start gap-2.5">
              <span class="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black shrink-0 whitespace-nowrap">[الشرح]</span>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHTML(c.explainDesc)}</p>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/70 border border-amber-500/30 flex items-start gap-2.5">
              <span class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black shrink-0 whitespace-nowrap">[التلخيص]</span>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHTML(c.summaryDesc)}</p>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/70 border border-purple-500/30 flex items-start gap-2.5">
              <span class="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black shrink-0 whitespace-nowrap">[الخريطه الذهنية]</span>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHTML(c.mindmapDesc)}</p>
            </div>
          </div>
        </div>

        <div class="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5">
          <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
          <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            <strong class="text-emerald-300 font-extrabold">${escapeHTML(c.aiNoteTitle)}</strong> ${escapeHTML(c.aiNoteDesc)}
          </p>
        </div>
      `;

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function fillAboutEditForm() {
      const c = appState.aboutContent || DEFAULT_ABOUT_CONTENT;
      document.getElementById('edit-about-greeting').value = c.greeting || '';
      document.getElementById('edit-about-verse').value = c.verse || '';
      document.getElementById('edit-about-model-note').value = c.modelNote || '';
      document.getElementById('edit-about-source').value = c.sourceDesc || '';
      document.getElementById('edit-about-explain').value = c.explainDesc || '';
      document.getElementById('edit-about-summary').value = c.summaryDesc || '';
      document.getElementById('edit-about-mindmap').value = c.mindmapDesc || '';
      document.getElementById('edit-about-ai-title').value = c.aiNoteTitle || '';
      document.getElementById('edit-about-ai-desc').value = c.aiNoteDesc || '';
    }

    function toggleAboutEditMode(isEditing) {
      const viewEl = document.getElementById('about-view-container');
      const formEl = document.getElementById('about-edit-form');
      const editBtnText = document.getElementById('about-edit-btn-text');

      if (isEditing) {
        fillAboutEditForm();
        viewEl.classList.add('hidden');
        formEl.classList.remove('hidden');
        if (editBtnText) editBtnText.textContent = 'معاينة العرض';
      } else {
        viewEl.classList.remove('hidden');
        formEl.classList.add('hidden');
        if (editBtnText) editBtnText.textContent = 'تعديل المحتوى';
      }
    }

    function openAboutModal() {
      const modal = document.getElementById('about-modal');
      if (!modal) return;
      toggleAboutEditMode(false);
      renderAboutView();
      const editBtn = document.getElementById('about-admin-edit-btn');
      if (editBtn) {
        editBtn.classList.toggle('hidden', !appState.isAdmin);
        editBtn.classList.toggle('inline-flex', appState.isAdmin);
      }
      modal.classList.remove('hidden');
    }

    function closeAboutModal() {
      const modal = document.getElementById('about-modal');
      if (modal) modal.classList.add('hidden');
    }

    // Sync Admin Mode Controls (Clean Single-Line Mobile Labels)
    function syncAdminUI() {
      const statusBar = document.getElementById('admin-status-bar');
      const inlineAddBtn = document.getElementById('inline-admin-add-btn');
      const adminBtnText = document.getElementById('admin-btn-text');
      const welcomeName = document.getElementById('admin-welcome-name');
      const aboutEditBtn = document.getElementById('about-admin-edit-btn');
      const headerPubBtn = document.getElementById('header-publish-btn');
      const sidebarPubBtn = document.getElementById('sidebar-publish-btn');
      const breadcrumbPubBtn = document.getElementById('breadcrumb-publish-btn');

      if (aboutEditBtn) {
        aboutEditBtn.classList.toggle('hidden', !appState.isAdmin);
        aboutEditBtn.classList.toggle('inline-flex', appState.isAdmin);
      }
      if (headerPubBtn) {
        headerPubBtn.classList.toggle('hidden', !appState.isAdmin);
        headerPubBtn.classList.toggle('inline-flex', appState.isAdmin);
      }
      if (sidebarPubBtn) {
        sidebarPubBtn.classList.toggle('hidden', !appState.isAdmin);
        sidebarPubBtn.classList.toggle('flex', appState.isAdmin);
      }
      if (breadcrumbPubBtn) {
        breadcrumbPubBtn.classList.toggle('hidden', !appState.isAdmin);
        breadcrumbPubBtn.classList.toggle('inline-flex', appState.isAdmin);
      }

      if (appState.isAdmin) {
        if (statusBar) statusBar.classList.remove('hidden');
        if (inlineAddBtn) {
          inlineAddBtn.classList.remove('hidden');
          inlineAddBtn.classList.add('flex');
        }
        if (adminBtnText) adminBtnText.textContent = 'المسؤول نشط';
        if (welcomeName) welcomeName.textContent = `مرحباً (${appState.adminName}) — صلاحيات النشر والتعديل مفعلة`;
      } else {
        if (statusBar) statusBar.classList.add('hidden');
        if (inlineAddBtn) {
          inlineAddBtn.classList.add('hidden');
          inlineAddBtn.classList.remove('flex');
        }
        if (adminBtnText) adminBtnText.textContent = 'بوابة المسؤولين';
      }

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      renderExplorerContent();
    }

    // Admin Modal & Gate Management (Feature F07 - Hashed Passcode Verification)
    function hashAdminPasscode(inputStr) {
      const salted = 'vet_ksu_33_salt_2027::' + String(inputStr || '').trim().toLowerCase() + '::seniors';
      let h1 = 0x811c9dc5;
      let h2 = 5381;
      for (let i = 0; i < salted.length; i++) {
        const c = salted.charCodeAt(i);
        h1 ^= c;
        h1 = Math.imul(h1, 0x01000193) >>> 0;
        h2 = ((Math.imul(h2, 33) + c) >>> 0);
      }
      return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
    }
    function isValidAdminPasscode(code) {
      return ADMIN_PASSCODE_HASHES.includes(hashAdminPasscode(code));
    }

    function openAdminModal() {
      const modal = document.getElementById('admin-login-modal');
      if (!modal) return;

      const errorMsg = document.getElementById('admin-login-error');
      if (errorMsg) errorMsg.classList.add('hidden');

      const passInput = document.getElementById('admin-passcode-input');
      if (passInput) {
        passInput.value = '';
        passInput.classList.remove('border-rose-500');
      }

      const nameInput = document.getElementById('admin-name-input');
      if (nameInput && !nameInput.value) {
        nameInput.value = appState.adminName || 'مسؤول الدفعة';
      }

      modal.classList.remove('hidden');
      setTimeout(() => {
        if (passInput) passInput.focus();
      }, 50);
    }

    function closeAdminModal() {
      const modal = document.getElementById('admin-login-modal');
      if (modal) modal.classList.add('hidden');

      const errorMsg = document.getElementById('admin-login-error');
      if (errorMsg) errorMsg.classList.add('hidden');

      const passInput = document.getElementById('admin-passcode-input');
      if (passInput) {
        passInput.value = '';
        passInput.classList.remove('border-rose-500');
      }
    }

    function handleAdminLogin(e) {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      const passInput = document.getElementById('admin-passcode-input');
      const errorMsg = document.getElementById('admin-login-error');
      const nameInput = document.getElementById('admin-name-input');

      const rawPasscode = passInput ? passInput.value.trim() : '';
      const enteredPasscode = rawPasscode.toLowerCase();

      if (!isValidAdminPasscode(enteredPasscode)) {
        if (errorMsg) errorMsg.classList.remove('hidden');
        if (passInput) {
          passInput.classList.add('border-rose-500');
          passInput.focus();
        }
        showToast('كلمة المرور غير صحيحة!', 'warning');
        return false;
      }

      // Valid passcode
      if (errorMsg) errorMsg.classList.add('hidden');
      if (passInput) passInput.classList.remove('border-rose-500');

      const enteredName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'مسؤول الدفعة';
      appState.isAdmin = true;
      appState.adminName = enteredName;
      appState.adminToken = hashAdminPasscode(enteredPasscode);

      saveAppState();
      closeAdminModal();
      syncAdminUI();
      showToast('تم تسجيل الدخول كمسؤول بنجاح', 'success');
      return true;
    }

    function handleAdminLogout() {
      appState.isAdmin = false;
      appState.adminName = 'مسؤول الدفعة';
      appState.adminToken = '';

      saveAppState();

      closePublishModal();
      if (typeof toggleAboutEditMode === 'function') toggleAboutEditMode(false);

      syncAdminUI();
      showToast('تم تسجيل خروج المسؤول بنجاح ✓', 'info');
    }

    // Open Admin Publish / Edit Modal (Feature F08)
    function openPublishModal(editFile = null) {
      const form = document.getElementById('publish-form');
      if (form) form.reset();

      const modalTitle = document.getElementById('publish-modal-title');
      const submitLabel = document.getElementById('publish-submit-label');
      const editItemId = document.getElementById('edit-item-id');

      if (editFile) {
        if (modalTitle) modalTitle.textContent = 'تعديل بيانات الملف الدراسي';
        if (submitLabel) submitLabel.textContent = 'حفظ التعديلات';
        if (editItemId) editItemId.value = editFile.id;

        const subEl = document.getElementById('pub-subject') || document.getElementById('publish-subject-select');
        if (subEl && editFile.subject) subEl.value = editFile.subject;

        const catEl = document.getElementById('pub-category') || document.getElementById('publish-category-select');
        if (catEl && editFile.category) catEl.value = editFile.category;

        const folderEl = document.getElementById('pub-folder-num');
        if (folderEl && editFile.folderNum !== undefined) folderEl.value = editFile.folderNum;

        const validFormats = ['المصدر', 'شرح', 'تلخيص', 'خريطه ذهنية'];
        const fmtEl = document.getElementById('pub-format');
        if (fmtEl) {
          fmtEl.value = validFormats.includes(editFile.format) ? editFile.format : 'المصدر';
        }

        const titleEl = document.getElementById('pub-title') || document.getElementById('publish-title-input');
        if (titleEl) titleEl.value = getCleanFileTitle(editFile);

        const docEl = document.getElementById('pub-doctor') || document.getElementById('publish-doctor-input');
        if (docEl) docEl.value = editFile.doctor || '';

        const urlEl = document.getElementById('pub-external-url') || document.getElementById('publish-url-input');
        if (urlEl) urlEl.value = editFile.externalUrl || editFile.fileUrl || editFile.driveUrl || '';

        const cleanEditOpt = getCleanOptionalFields(editFile);
        const descEl = document.getElementById('pub-description');
        if (descEl) descEl.value = cleanEditOpt.description || '';

        const kpEl = document.getElementById('pub-keypoints');
        if (kpEl) kpEl.value = (cleanEditOpt.keypoints || []).join('\n');

        const noteEl = document.getElementById('pub-note');
        if (noteEl) noteEl.value = cleanEditOpt.clinicalNote || '';

        const pagesEl = document.getElementById('pub-pages');
        if (pagesEl) pagesEl.value = editFile.pages || '';
      } else {
        if (modalTitle) modalTitle.textContent = 'نشر ملف جديد داخل المكتبة';
        if (submitLabel) submitLabel.textContent = 'نشر الملف الآن';
        if (editItemId) editItemId.value = '';

        if (appState.currentSubject) {
          const subEl = document.getElementById('pub-subject') || document.getElementById('publish-subject-select');
          if (subEl) subEl.value = appState.currentSubject;
        }
        if (appState.currentCategory) {
          const catEl = document.getElementById('pub-category') || document.getElementById('publish-category-select');
          if (catEl) catEl.value = appState.currentCategory;
        }
        if (appState.currentFolderNum !== null && appState.currentFolderNum !== undefined) {
          const folderEl = document.getElementById('pub-folder-num');
          if (folderEl) folderEl.value = appState.currentFolderNum;
        }
      }

      const modal = document.getElementById('publish-modal');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        document.body.style.overflow = 'hidden';
      }
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }

    // Close Admin Publish / Edit Modal (Feature F08)
    function closePublishModal() {
      const modal = document.getElementById('publish-modal');
      if (modal) {
        modal.classList.add('hidden');
      }
      document.body.classList.remove('overflow-hidden');
      document.body.style.overflow = '';

      const form = document.getElementById('publish-form');
      if (form) form.reset();

      const editItemId = document.getElementById('edit-item-id');
      if (editItemId) editItemId.value = '';
    }

    // Handle Publish / Edit Form Submission with Two-Way Google Drive Folder Upload (Feature F08)
    async function handlePublishSubmit(e) {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      const editItemId = document.getElementById('edit-item-id');
      const editId = editItemId ? editItemId.value.trim() : '';

      const subEl = document.getElementById('pub-subject') || document.getElementById('publish-subject-select');
      const catEl = document.getElementById('pub-category') || document.getElementById('publish-category-select');
      const folderEl = document.getElementById('pub-folder-num');
      const fmtEl = document.getElementById('pub-format');
      const titleEl = document.getElementById('pub-title') || document.getElementById('publish-title-input');
      const docEl = document.getElementById('pub-doctor') || document.getElementById('publish-doctor-input');
      const urlEl = document.getElementById('pub-external-url') || document.getElementById('publish-url-input');
      const fileInputEl = document.getElementById('pub-file-upload');
      const descEl = document.getElementById('pub-description');
      const kpEl = document.getElementById('pub-keypoints');
      const noteEl = document.getElementById('pub-note');
      const pagesEl = document.getElementById('pub-pages');
      const submitBtn = document.getElementById('publish-submit-btn');
      const submitLabel = document.getElementById('publish-submit-label');

      const subject = subEl ? subEl.value : '';
      const category = catEl ? catEl.value : '';
      const rawFolder = folderEl ? folderEl.value.trim() : '';
      const parsedFolder = parseInt(rawFolder, 10);
      const folderNum = (rawFolder !== '' && !isNaN(parsedFolder) && parsedFolder >= 1) ? parsedFolder : null;
      const format = fmtEl ? fmtEl.value : 'المصدر';

      if (!subject || !category || !folderNum || !format) {
        showToast('يرجى ملء جميع الحقول الإجبارية (*)', 'warning');
        return;
      }

      const subObj = getSubjectObj(subject);
      const unitSingular = category === 'محاضرات' ? 'محاضرة' : 'سكشن';
      const uploadedFileObj = (fileInputEl && fileInputEl.files && fileInputEl.files[0]) ? fileInputEl.files[0] : null;
      const rawTitle = titleEl ? titleEl.value.trim() : '';
      const uploadedCleanName = uploadedFileObj ? uploadedFileObj.name.replace(/\.[^/.]+$/, '').trim() : '';
      const finalTitle = rawTitle || uploadedCleanName || `${unitSingular} ${folderNum} ${subObj.folderName} ${format}`;
      const doctor = docEl ? docEl.value.trim() : '';
      const externalUrl = urlEl ? urlEl.value.trim() : '';
      const description = descEl ? descEl.value.trim() : '';
      const keypoints = kpEl ? kpEl.value.split('\n').map(s => s.trim()).filter(Boolean) : [];
      const note = noteEl ? noteEl.value.trim() : '';
      const pages = pagesEl && pagesEl.value ? (parseInt(pagesEl.value, 10) || null) : null;

      let fileUploadPayload = null;
      if (uploadedFileObj) {
        if (uploadedFileObj.size > MAX_DIRECT_UPLOAD_BYTES) {
          const sizeMb = (uploadedFileObj.size / (1024 * 1024)).toFixed(1);
          showToast(`حجم الملف (${sizeMb} MB) يتجاوز الحد الأقصى للرفع المباشر من الموقع (35 MB). يرجى رفعه مباشرة من تطبيق Google Drive في مجلد المادة وسيظهر تلقائياً.`, 'warning');
          return;
        }
        try {
          if (submitBtn) submitBtn.disabled = true;
          if (submitLabel) submitLabel.textContent = 'جاري تجهيز ورفع الملف إلى Google Drive...';
          fileUploadPayload = await readFileAsBase64(uploadedFileObj);
        } catch (readErr) {
          if (submitBtn) submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = editId ? 'حفظ التعديلات' : 'نشر الملف الآن';
          showToast((readErr && readErr.message) ? readErr.message : 'تعذر قراءة الملف المرفوع من الجهاز', 'warning');
          return;
        }
      }

      let targetFile = null;
      let oldDriveFileIdToTrash = '';

      const nowStdDate = (() => {
        const d = new Date();
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
      })();

      if (editId) {
        targetFile = appState.files.find(f => f.id === editId);
        if (targetFile) {
          oldDriveFileIdToTrash = targetFile.driveFileId || extractDriveFileId(targetFile.fileUrl || targetFile.driveUrl || '');
          targetFile.subject = subject;
          targetFile.category = category;
          targetFile.folderNum = folderNum;
          targetFile.format = format;
          targetFile.adminFormat = format;
          targetFile.title = finalTitle;
          // السماح للمسؤول بتعديل أو مسح الحقول الاختيارية (اسم المحاضر، الرابط الخارجي، عدد الصفحات)
          targetFile.doctor = doctor || (subObj?.doctor || 'أعضاء هيئة التدريس');
          if (externalUrl) {
            targetFile.externalUrl = externalUrl;
            if (!targetFile.driveFileId) {
              targetFile.fileUrl = externalUrl;
              targetFile.driveUrl = externalUrl;
            }
          } else if (!targetFile.driveFileId) {
            targetFile.externalUrl = '';
            targetFile.fileUrl = '';
            targetFile.driveUrl = '';
          }
          targetFile.description = description;
          targetFile.keypoints = keypoints;
          targetFile.clinicalNote = note;
          targetFile.pages = pages;
        }
      } else {
        const newId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const extUpper = uploadedFileObj ? (uploadedFileObj.name.split('.').pop() || 'PDF').toUpperCase() : 'PDF';
        const sizeKb = uploadedFileObj ? (uploadedFileObj.size >= 1048576 ? (uploadedFileObj.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(uploadedFileObj.size / 1024)) + ' KB') : 'جديد';
        targetFile = {
          id: newId,
          title: finalTitle,
          subject: subject,
          category: category,
          folderNum: folderNum,
          format: format,
          adminFormat: format,
          doctor: doctor || (subObj?.doctor || 'أعضاء هيئة التدريس'),
          externalUrl: externalUrl || '',
          fileUrl: externalUrl || '',
          driveUrl: externalUrl || '',
          description: description || `ملف (${format}) خاص بـ ${category === 'محاضرات' ? 'المحاضرة' : 'السكشن'} رقم (${folderNum}) في مقرر ${subObj?.fullName || subject}.`,
          keypoints: keypoints.length > 0 ? keypoints : [`${format} معتمد لـ ${category === 'محاضرات' ? 'المحاضرة' : 'السكشن'} رقم (${folderNum})`],
          clinicalNote: note || '',
          pages: pages || null,
          size: `${extUpper} • ${sizeKb}`,
          date: nowStdDate,
          dateAdded: nowStdDate,
          driveModifiedTime: Date.now(),
          downloads: 0,
          downloadsCount: 0,
          viewsCount: 0,
          isCompleted: false,
          isSaved: false,
          term: 'الترم الاول'
        };
        targetFile.isPendingUpload = true;
        if (fileUploadPayload) {
          appState.uploadedFileCache[newId] = {
            url: fileUploadPayload.dataUrl,
            name: uploadedFileObj.name
          };
        }
        appState.files.unshift(targetFile);
        markFileAsPushNotified(newId);
      }

      saveAppState();
      updateLibraryCounters();
      renderQuickSubjectBar();
      renderBreadcrumbBar();
      renderExplorerContent();
      updateNotificationsUI();

      if (submitBtn) submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = editId ? 'حفظ التعديلات' : 'نشر الملف الآن';
      closePublishModal();

      if (fileUploadPayload) {
        showToast('جاري رفع الملف إلى مجلد Google Drive المخصص...', 'info');
      } else if (editId) {
        showToast('تم تحديث بيانات الملف وجاري مزامنة Google Drive ✓', 'success');
      } else {
        showToast('تم حفظ ونشر المادة وجاري مزامنة Google Drive...', 'info');
      }

      if (targetFile) {
        try {
          const ext = uploadedFileObj
            ? (uploadedFileObj.name.split('.').pop() || 'pdf').toLowerCase()
            : ((targetFile.originalFileName && targetFile.originalFileName.includes('.')) ? targetFile.originalFileName.split('.').pop().toLowerCase() : 'pdf');

          let driveFileName = finalTitle.replace(/\.[^/.]+$/, '').trim();
          const detectedNow = detectAppFormatFromDriveFile({ name: driveFileName });
          if (format !== 'المصدر' && detectedNow !== format) {
            driveFileName = `${driveFileName} - ${format}`;
          }
          driveFileName = `${driveFileName}.${ext}`;

          const cleanFileRecordForServer = Object.assign({}, targetFile);
          delete cleanFileRecordForServer.isPendingUpload;

          if (fileUploadPayload) {
            // Send only 1 clean copy of base64 (prevents 4x request size bloat & timeout)
            const compactUpload = {
              fileName: driveFileName,
              name: driveFileName,
              mimeType: fileUploadPayload.mimeType,
              type: fileUploadPayload.mimeType,
              base64: fileUploadPayload.base64
            };
            const syncRes = await syncActionToDrive({
              action: 'uploadFile',
              subjectId: subject,
              subjectName: subObj.displayName || subObj.folderName,
              category: category === 'سكاشن' ? 'sections' : 'lectures',
              topicName: `${unitSingular} ${folderNum}`,
              file: cleanFileRecordForServer,
              fileUpload: compactUpload
            });
            delete targetFile.isPendingUpload;
            if (syncRes && syncRes.ok) {
              const finalSyncedFile = (syncRes.data && syncRes.data.file) ? syncRes.data.file : targetFile;
              if (targetFile.id && finalSyncedFile.id && targetFile.id !== finalSyncedFile.id) {
                migrateTemporaryFileId(targetFile.id, finalSyncedFile.id);
              }
              markFileAsPushNotified(finalSyncedFile.id);
              if (!editId) {
                sendUserNotificationForFile(finalSyncedFile, true);
              }
              triggerBackgroundPushForAllSubscribers(finalSyncedFile);
              showToast('تم رفع الملف إلى المجلد المخصص في Google Drive وإرسال الإشعارات بنجاح ✓', 'success');
            } else {
              showToast((syncRes && syncRes.error) ? `تنبيه: ${syncRes.error}` : 'تعذر إكمال الرفع للسحابة، تأكد من تحديث نشر Code.gs', 'warning');
            }
          } else if (editId && oldDriveFileIdToTrash) {
            const syncRes = await syncActionToDrive({
              action: 'updateFile',
              driveFileId: oldDriveFileIdToTrash,
              id: editId,
              newName: driveFileName,
              file: cleanFileRecordForServer
            });
            if (syncRes && syncRes.ok) {
              showToast('تم تحديث اسم وبيانات الملف في Google Drive بنجاح ✓', 'success');
            }
          } else {
            const syncRes = await syncActionToDrive({
              action: 'save',
              file: cleanFileRecordForServer
            });
            delete targetFile.isPendingUpload;
            if (syncRes && syncRes.ok) {
              const finalSyncedFile = (syncRes.data && syncRes.data.file) ? syncRes.data.file : targetFile;
              if (targetFile.id && finalSyncedFile.id && targetFile.id !== finalSyncedFile.id) {
                migrateTemporaryFileId(targetFile.id, finalSyncedFile.id);
              }
              markFileAsPushNotified(finalSyncedFile.id);
              if (!editId) {
                sendUserNotificationForFile(finalSyncedFile, true);
                triggerBackgroundPushForAllSubscribers(finalSyncedFile);
              }
              showToast('تم حفظ ونشر الملف في Google Drive وإرسال الإشعارات بنجاح ✓', 'success');
            } else {
              showToast((syncRes && syncRes.error) ? `تنبيه: ${syncRes.error}` : 'تعذر الحفظ في السحابة حالياً', 'warning');
            }
          }
        } catch (e) {
          delete targetFile.isPendingUpload;
        }
      }
    }

    function closeNotificationsModal() {
      const modal = document.getElementById('notifications-modal');
      if (modal) modal.classList.add('hidden');
    }


    // ==========================================================================
    // FULL-SCREEN INTRO VIDEO CONTROLLER (1031.mp4)
    // ==========================================================================
    function initIntroVideo() {
      const overlay = document.getElementById('intro-video-overlay');
      const video = document.getElementById('intro-video');
      const skipBtn = document.getElementById('intro-skip-btn');
      const headerIntroBtn = document.getElementById('header-intro-video-btn');
      const sidebarIntroBtn = document.getElementById('sidebar-intro-video-btn');

      if (!overlay || !video) return;

      let isClosing = false;
      let isClosed = false;
      let fallbackTimer = null;

      // Clears any pending safety fallback timers safely
      function clearSafetyTimer() {
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
      }

      // Idempotent and race-condition safe dismissal function
      function closeIntroVideo() {
        try { sessionStorage.setItem('vet33_intro_seen', '1'); } catch (e) {}
        if (isClosing || isClosed) return;
        isClosing = true;
        clearSafetyTimer();

        // Immediately unblock user interaction with underlying page
        overlay.style.pointerEvents = 'none';
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('overflow-hidden');

        // Smooth visual exit transition
        overlay.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.04)';

        setTimeout(() => {
          try {
            video.pause();
          } catch (e) {}

          // Enforce display: none via both classes and inline styles to beat specificity
          overlay.classList.add('intro-hidden', 'hidden');
          overlay.style.display = 'none';
          overlay.setAttribute('aria-hidden', 'true');
          overlay.style.opacity = '0';
          overlay.style.transform = '';
          overlay.style.pointerEvents = 'none';

          isClosing = false;
          isClosed = true;
        }, 650);
      }

      function playIntroVideo(userInitiated) {
        clearSafetyTimer();
        isClosing = false;
        isClosed = false;

        // Reset display state
        overlay.style.display = 'flex';
        overlay.classList.remove('intro-hidden', 'hidden');
        overlay.classList.add('active');
        overlay.removeAttribute('aria-hidden');
        overlay.style.pointerEvents = 'auto';
        overlay.style.opacity = '1';
        overlay.style.transform = 'none';
        overlay.style.transition = 'opacity 0.3s ease-out';

        try {
          video.currentTime = 0;
        } catch (e) {}

        // 3-Second Safety Fallback Timer:
        // Guarantees overlay will dismiss if video stalls, fails to buffer, or hangs
        fallbackTimer = setTimeout(() => {
          console.warn('Intro video 3-second safety fallback triggered; dismissing overlay.');
          closeIntroVideo();
        }, 3000);

        if (userInitiated) {
          // Explicit click by user -> unmuted audio allowed by browser policies
          video.muted = false;
          const p = video.play();
          if (p !== undefined) {
            p.catch(() => {
              video.muted = true;
              video.play().catch(err => {
                console.warn('User-initiated intro video play failed:', err);
                closeIntroVideo();
              });
            });
          }
        } else {
          // Automatic launch on site open: try unmuted, fallback to muted if blocked
          video.muted = false;
          const p = video.play();
          if (p !== undefined) {
            p.catch(() => {
              // Browser autoplay policy blocked unmuted sound -> play muted
              video.muted = true;
              video.play().catch(err => {
                console.warn('Intro video autoplay prevented:', err);
                // If autoplay is completely blocked, dismiss immediately so user can see app
                closeIntroVideo();
              });
            });
          }
        }
      }

      // Clear the startup safety timer as soon as the video actually begins playing so it plays its full 5.83s duration
      video.addEventListener('playing', () => {
        clearSafetyTimer();
      });
      video.addEventListener('timeupdate', () => {
        if (video.currentTime > 0.1) clearSafetyTimer();
      });

      // Event 1: Normal completion
      video.addEventListener('ended', () => {
        closeIntroVideo();
      });

      // Event 2: Media loading or decoding error (offline, missing file, corrupt stream)
      video.addEventListener('error', (e) => {
        console.warn('Intro video error encountered:', video.error || e);
        closeIntroVideo();
      });

      // Event 3: Network stall (data stopped arriving)
      video.addEventListener('stalled', () => {
        console.warn('Intro video stream stalled; triggering dismissal.');
        closeIntroVideo();
      });

      // Event 4: Buffer waiting timeout
      video.addEventListener('waiting', () => {
        setTimeout(() => {
          if (video.readyState < 3 && !isClosed) {
            closeIntroVideo();
          }
        }, 1500);
      });

      // Skip button
      if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeIntroVideo();
        });
      }

      // Tap video to toggle sound or play/pause
      video.addEventListener('click', () => {
        if (video.muted) {
          video.muted = false;
        } else {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      });

      // Keyboard Esc to skip
      window.addEventListener('keydown', (e) => {
        if (!isClosed && (e.key === 'Escape' || e.key === 'Esc')) {
          closeIntroVideo();
        }
      });

      // Header Replay Button
      if (headerIntroBtn) {
        headerIntroBtn.addEventListener('click', () => playIntroVideo(true));
      }

      // Sidebar Replay Button
      if (sidebarIntroBtn) {
        sidebarIntroBtn.addEventListener('click', () => {
          if (typeof closeQuickSidebar === 'function') closeQuickSidebar();
          playIntroVideo(true);
        });
      }

      // Issue #2 Fix: Do not force-play intro video on page refresh within the same session or when opening a notification (#file=...)
      let hasSeenInSession = false;
      try {
        hasSeenInSession = sessionStorage.getItem('vet33_intro_seen') === '1';
      } catch (e) {}
      const isOpeningNotificationFile = Boolean(location.hash && location.hash.startsWith('#file='));

      if (hasSeenInSession || isOpeningNotificationFile) {
        clearSafetyTimer();
        try { video.pause(); } catch (e) {}
        overlay.classList.add('intro-hidden', 'hidden');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.classList.remove('overflow-hidden');
        isClosed = true;
      } else {
        try { sessionStorage.setItem('vet33_intro_seen', '1'); } catch (e) {}
        playIntroVideo(false);
      }
    }

    // Initialize All Listeners
    window.addEventListener('DOMContentLoaded', () => {
      initIntroVideo();
      loadAppState();
      appState.lastRenderedSignature = computeDatabaseSignature(appState.files, appState.folders, appState.aboutContent);
      try {
        if (window.history && typeof window.history.replaceState === 'function') {
          window.history.replaceState(getCurrentHistoryStateSnapshot(), '', location.pathname + location.search + location.hash);
        }
      } catch (e) {}
      syncAdminUI();
      renderQuickSubjectBar();
      renderBreadcrumbBar();
      renderExplorerContent();
      updateLibraryCounters();
      updateNotificationsUI();
      initThreeBackground();
      fetchDatabaseFromDrive(true, false);

      // Issue #1 Fix: Listen to phone/browser Back button (popstate) to close open modals or step back to parent folder
      window.addEventListener('popstate', (e) => {
        appState.isHandlingPopState = true;
        try {
          // 1. If any modal or mobile sidebar is open, close it first without leaving the current folder
          const prevModal = document.getElementById('preview-modal');
          if (prevModal && !prevModal.classList.contains('hidden')) {
            closePreviewModal();
            return;
          }
          const pubModal = document.getElementById('publish-modal');
          if (pubModal && !pubModal.classList.contains('hidden')) {
            closePublishModal();
            return;
          }
          const admModal = document.getElementById('admin-login-modal');
          if (admModal && !admModal.classList.contains('hidden')) {
            closeAdminModal();
            return;
          }
          const ntfModal = document.getElementById('notifications-modal');
          if (ntfModal && !ntfModal.classList.contains('hidden')) {
            closeNotificationsModal();
            return;
          }
          const abtModal = document.getElementById('about-modal');
          if (abtModal && !abtModal.classList.contains('hidden')) {
            closeAboutModal();
            return;
          }
          const qSidebar = document.getElementById('quick-access-sidebar');
          if (qSidebar && qSidebar.classList.contains('sidebar-open')) {
            closeQuickSidebar();
            return;
          }

          // 2. Restore hierarchy state from popstate event or step back one level
          const st = e.state;
          if (st && st.vet33Nav) {
            if (st.view === 'saved' || st.onlySavedFilter) {
              appState.currentView = 'saved';
              appState.onlySavedFilter = true;
              appState.searchQuery = '';
              document.title = 'الملفات المحفوظة | Seniors 2027 VET-KSU 33 Old List';
              renderQuickSubjectBar();
              renderBreadcrumbBar();
              renderExplorerContent();
              updateLibraryCounters();
              updateSavedButtonsVisualState();
            } else {
              navigateToHierarchy(st.subject || null, st.category || null, st.folderNum !== undefined ? st.folderNum : null, true);
            }
          } else if (appState.currentSubject !== null || appState.currentView === 'saved' || appState.onlySavedFilter || appState.searchQuery.trim() !== '') {
            stepBackHierarchy(true);
          }
        } finally {
          appState.isHandlingPopState = false;
        }
      });

      // Issue #11 Fix: Validate file size immediately when selected in the publish form
      const pubFileUploadEl = document.getElementById('pub-file-upload');
      if (pubFileUploadEl) {
        pubFileUploadEl.addEventListener('change', (e) => {
          const fObj = e.target.files && e.target.files[0];
          if (fObj && fObj.size > MAX_DIRECT_UPLOAD_BYTES) {
            const sizeMb = (fObj.size / (1024 * 1024)).toFixed(1);
            showToast(`حجم الملف (${sizeMb} MB) أكبر من الحد المسموح للرفع من المتصفح (35 MB). يرجى رفعه مباشرة من تطبيق Google Drive في مجلد المادة.`, 'warning');
            e.target.value = '';
          }
        });
      }

      const cloudSyncBtn = document.getElementById('cloud-sync-btn');
      if (cloudSyncBtn) {
        cloudSyncBtn.addEventListener('click', () => fetchDatabaseFromDrive(false));
      }

      const goRoot = () => {
        appState.currentView = 'explorer';
        appState.onlySavedFilter = false;
        appState.previousHierarchy = null;
        appState.searchQuery = '';
        const sInput = document.getElementById('search-input');
        if (sInput) sInput.value = '';
        const cBtn = document.getElementById('clear-search-btn');
        if (cBtn) cBtn.classList.add('hidden');
        navigateToHierarchy(null, null, null);
      };

      document.getElementById('brand-logo-btn').addEventListener('click', goRoot);
      const hRoot = document.getElementById('header-root-btn');
      if (hRoot) hRoot.addEventListener('click', goRoot);
      const fRoot = document.getElementById('footer-root-link');
      if (fRoot) fRoot.addEventListener('click', goRoot);
      const emptyReset = document.getElementById('empty-reset-btn');
      if (emptyReset) emptyReset.addEventListener('click', goRoot);

      // Search Bar & Clear Button Event Listeners (F03)
      const searchInput = document.getElementById('search-input');
      const clearSearchBtn = document.getElementById('clear-search-btn');
      let searchDebounceTimer = null;

      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const rawVal = e.target.value;
          const query = rawVal.trim();

          // Toggle Clear button visibility based on raw input length
          if (clearSearchBtn) {
            if (rawVal.length > 0) {
              clearSearchBtn.classList.remove('hidden');
            } else {
              clearSearchBtn.classList.add('hidden');
            }
          }

          // Synchronously update appState.searchQuery for instant state assertions
          appState.searchQuery = query;

          // Debounce rendering by 50ms to prevent DOM thrashing
          clearTimeout(searchDebounceTimer);
          searchDebounceTimer = setTimeout(() => {
            renderBreadcrumbBar();
            renderQuickSubjectBar();
            renderExplorerContent();
          }, 50);
        });

        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            clearTimeout(searchDebounceTimer);
            appState.searchQuery = searchInput.value.trim();
            renderBreadcrumbBar();
            renderQuickSubjectBar();
            renderExplorerContent();
            if (appState.searchQuery && window.innerWidth < 1024) {
              closeQuickSidebar();
            }
          } else if (e.key === 'Escape') {
            if (searchInput.value.length > 0) {
              e.stopPropagation();
              clearTimeout(searchDebounceTimer);
              searchInput.value = '';
              if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
              appState.searchQuery = '';
              renderBreadcrumbBar();
              renderQuickSubjectBar();
              renderExplorerContent();
            }
          }
        });
      }

      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
          clearTimeout(searchDebounceTimer);
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
          }
          clearSearchBtn.classList.add('hidden');
          appState.searchQuery = '';
          renderBreadcrumbBar();
          renderQuickSubjectBar();
          renderExplorerContent();
        });
      }

      // View Layout Switcher (Grid / List) Event Listeners (F04)
      const layoutGridBtn = document.getElementById('layout-grid-btn');
      const layoutListBtn = document.getElementById('layout-list-btn');

      if (layoutGridBtn) {
        layoutGridBtn.addEventListener('click', () => {
          if (appState.layoutMode === 'grid') return;
          appState.layoutMode = 'grid';
          saveAppState();
          syncLayoutButtonsUI();
          renderExplorerContent();
        });
      }

      if (layoutListBtn) {
        layoutListBtn.addEventListener('click', () => {
          if (appState.layoutMode === 'list') return;
          appState.layoutMode = 'list';
          saveAppState();
          syncLayoutButtonsUI();
          renderExplorerContent();
        });
      }

      // Initial UI synchronization of layout switcher buttons
      syncLayoutButtonsUI();

      // About Section & Modal Listeners
      const headerAboutBtn = document.getElementById('header-about-btn');
      if (headerAboutBtn) headerAboutBtn.addEventListener('click', openAboutModal);

      const heroAboutBtn = document.getElementById('hero-open-about-btn');
      if (heroAboutBtn) heroAboutBtn.addEventListener('click', openAboutModal);

      const footerAboutLink = document.getElementById('footer-about-link');
      if (footerAboutLink) footerAboutLink.addEventListener('click', openAboutModal);

      const closeAboutBtn = document.getElementById('close-about-modal-btn');
      if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeAboutModal);

      const aboutModal = document.getElementById('about-modal');
      if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
          if (e.target === aboutModal) closeAboutModal();
        });
      }

      const adminEditAboutBtn = document.getElementById('about-admin-edit-btn');
      if (adminEditAboutBtn) {
        adminEditAboutBtn.addEventListener('click', () => {
          if (!appState.isAdmin) return;
          const isCurrentlyEditing = !document.getElementById('about-edit-form').classList.contains('hidden');
          toggleAboutEditMode(!isCurrentlyEditing);
        });
      }

      const cancelAboutEditBtn = document.getElementById('cancel-about-edit-btn');
      if (cancelAboutEditBtn) {
        cancelAboutEditBtn.addEventListener('click', () => toggleAboutEditMode(false));
      }

      const resetAboutDefaultsBtn = document.getElementById('reset-about-defaults-btn');
      if (resetAboutDefaultsBtn) {
        resetAboutDefaultsBtn.addEventListener('click', () => {
          if (!confirm('هل تريد استعادة النصوص الأصلية لقسم About؟')) return;
          appState.aboutContent = { ...DEFAULT_ABOUT_CONTENT };
          saveAppState();
          fillAboutEditForm();
          toggleAboutEditMode(false);
          renderAboutView();
          syncActionToDrive({
            action: 'save_about',
            item: {
              id: SYS_ABOUT_CONTENT_ID,
              isSystemMeta: true,
              title: 'System About Content',
              aboutContent: appState.aboutContent
            }
          }).catch(() => {});
          showToast('تمت استعادة النصوص الأصلية ومزامنتها بنجاح!', 'info');
        });
      }

      const aboutEditForm = document.getElementById('about-edit-form');
      if (aboutEditForm) {
        aboutEditForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!appState.isAdmin) {
            showToast('التعديل متاح فقط لمسؤولي الدفعة!', 'warning');
            return;
          }
          appState.aboutContent = {
            greeting: document.getElementById('edit-about-greeting').value.trim() || DEFAULT_ABOUT_CONTENT.greeting,
            verse: document.getElementById('edit-about-verse').value.trim() || DEFAULT_ABOUT_CONTENT.verse,
            modelNote: document.getElementById('edit-about-model-note').value.trim() || DEFAULT_ABOUT_CONTENT.modelNote,
            typesHeading: DEFAULT_ABOUT_CONTENT.typesHeading,
            sourceDesc: document.getElementById('edit-about-source').value.trim() || DEFAULT_ABOUT_CONTENT.sourceDesc,
            explainDesc: document.getElementById('edit-about-explain').value.trim() || DEFAULT_ABOUT_CONTENT.explainDesc,
            summaryDesc: document.getElementById('edit-about-summary').value.trim() || DEFAULT_ABOUT_CONTENT.summaryDesc,
            mindmapDesc: document.getElementById('edit-about-mindmap').value.trim() || DEFAULT_ABOUT_CONTENT.mindmapDesc,
            aiNoteTitle: document.getElementById('edit-about-ai-title').value.trim() || DEFAULT_ABOUT_CONTENT.aiNoteTitle,
            aiNoteDesc: document.getElementById('edit-about-ai-desc').value.trim() || DEFAULT_ABOUT_CONTENT.aiNoteDesc
          };
          saveAppState();
          toggleAboutEditMode(false);
          renderAboutView();
          syncActionToDrive({
            action: 'save_about',
            item: {
              id: SYS_ABOUT_CONTENT_ID,
              isSystemMeta: true,
              title: 'System About Content',
              aboutContent: appState.aboutContent
            }
          }).catch(() => {});
          showToast('تم حفظ ومزامنة محتوى قسم About لجميع الطلاب بنجاح!', 'success');
        });
      }

      document.getElementById('step-back-btn').addEventListener('click', stepBackHierarchy);

      // Notifications Center Modal Listeners
      const notifModal = document.getElementById('notifications-modal');
      const notifBtn = document.getElementById('notifications-btn');
      if (notifBtn && notifModal) {
        notifBtn.addEventListener('click', () => {
          updateNotificationsUI();
          syncBrowserNotifButton();
          notifModal.classList.remove('hidden');
        });
      }
      document.getElementById('close-notifications-modal-btn').addEventListener('click', () => {
        closeNotificationsModal();
      });
      if (notifModal) {
        notifModal.addEventListener('click', (e) => {
          if (e.target === notifModal || !e.target.closest('.modal-card-scroll, .glass-panel')) {
            closeNotificationsModal();
          }
        });
      }
      document.getElementById('enable-browser-notif-btn').addEventListener('click', () => {
        requestBrowserNotificationPermission();
      });
      const testPhoneNotifBtn = document.getElementById('test-phone-notif-btn');
      if (testPhoneNotifBtn) {
        testPhoneNotifBtn.addEventListener('click', async () => {
          if (!('Notification' in window) || Notification.permission !== 'granted') {
            await requestBrowserNotificationPermission();
            return;
          }
          await registerBackgroundServiceWorker();
          const latestFile = (appState.files && appState.files.length > 0) ? appState.files[0] : null;
          const ok = await showSystemDeviceNotification(
            latestFile ? `🔔 (${latestFile.format}) — ${getSubjectObj(latestFile.subject).folderName}` : '🔔 تجربة إشعار الهاتف — VET-KSU 33',
            latestFile ? `${getCleanFileTitle(latestFile)}
تاريخ النشر: ${latestFile.dateAdded || 'الآن'}` : 'هذا إشعار تجريبي في شريط إشعارات الهاتف العلوي!',
            latestFile
          );
          if (ok) {
            playNotificationChime();
            showToast('تم إرسال الإشعار لشريط إشعارات الهاتف العلوي بنجاح ✓', 'success');
          }
        });
      }
      document.getElementById('mark-all-read-btn').addEventListener('click', () => {
        appState.seenNotificationIds = appState.files.map(f => f.id);
        saveAppState();
        updateNotificationsUI();
        showToast('تم تحديد جميع الإشعارات كمقروءة ✓', 'info');
      });

      initDynamicPwaManifest();
      syncBrowserNotifButton();
      registerBackgroundServiceWorker();
      updateNotificationsUI();

      if ('Notification' in window && Notification.permission === 'granted') {
        document.addEventListener('click', () => startMobileBackgroundKeepAlive(), { once: true });
      }

      const bannerEnableBtn = document.getElementById('banner-enable-phone-notif-btn');
      if (bannerEnableBtn) {
        bannerEnableBtn.addEventListener('click', () => {
          requestBrowserNotificationPermission();
        });
      }

      const dismissBannerBtn = document.getElementById('dismiss-phone-notif-banner-btn');
      if (dismissBannerBtn) {
        dismissBannerBtn.addEventListener('click', () => {
          document.getElementById('phone-notif-banner').classList.add('hidden');
        });
      }

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPwaPrompt = e;
        const pwaBtn = document.getElementById('pwa-install-btn');
        if (pwaBtn) {
          pwaBtn.classList.remove('hidden');
          pwaBtn.classList.add('flex');
        }
      });

      const pwaInstallBtn = document.getElementById('pwa-install-btn');
      if (pwaInstallBtn) {
        pwaInstallBtn.addEventListener('click', async () => {
          if (!deferredPwaPrompt) return;
          deferredPwaPrompt.prompt();
          await deferredPwaPrompt.userChoice;
          deferredPwaPrompt = null;
          pwaInstallBtn.classList.add('hidden');
        });
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          const msg = event.data || {};
          if (msg.type === 'OPEN_FILE_FROM_NOTIF' && msg.data) {
            const d = msg.data;
            if (d.subject && d.category && d.folderNum) {
              navigateToHierarchy(d.subject, d.category, Number(d.folderNum));
            }
            if (d.fileId) {
              openPreviewModal(d.fileId);
            }
          } else if (msg.type === 'SW_DRIVE_DATA' && Array.isArray(msg.files) && msg.files.length > 0) {
            applyNormalizedRemoteDatabase({ files: msg.files, folders: msg.folders || [] }, true);
          } else if (msg.type === 'SW_DETECTED_NEW_FILES' && Array.isArray(msg.notifiedIds)) {
            appState.notifiedPushFileIds = Array.from(new Set([...appState.notifiedPushFileIds, ...msg.notifiedIds]));
            saveAppState();
            fetchDatabaseFromDrive(true, false);
          }
        });
      }

      // Check URL hash if opened from a background notification click (#file=...)
      setTimeout(() => {
        if (location.hash && location.hash.startsWith('#file=')) {
          const fId = decodeURIComponent(location.hash.replace('#file=', ''));
          const target = appState.files.find(f => f.id === fId);
          if (target) {
            navigateToHierarchy(target.subject, target.category, Number(target.folderNum));
            openPreviewModal(target.id);
          }
        }
      }, 1200);

      // Use a Web Worker timer (30s matching server throttle) when tab is visible to protect GAS daily quotas
      try {
        const workerBlob = new Blob([
          "setInterval(() => postMessage('tick'), 30000);"
        ], { type: "application/javascript" });
        const bgWorker = new Worker(URL.createObjectURL(workerBlob));
        bgWorker.onmessage = () => {
          if (document.visibilityState === 'visible') {
            fetchDatabaseFromDrive(true);
          }
        };
      } catch (workerErr) {
        setInterval(() => {
          if (document.visibilityState === 'visible') {
            fetchDatabaseFromDrive(true);
          }
        }, 30000);
      }

      // Hand off monitoring to Service Worker when tab is hidden or browser is closing
      const handoffToServiceWorker = async () => {
        try {
          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.getRegistration();
            if (reg && reg.active) {
              reg.active.postMessage({
                type: 'PAGE_HIDDEN',
                notifiedIds: appState.notifiedPushFileIds
              });
              if ('sync' in reg) {
                try { await reg.sync.register('vet33-sync-' + Date.now()); } catch (e) {}
              }
            }
          }
        } catch (e) {}
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          fetchDatabaseFromDrive(true);
        } else {
          handoffToServiceWorker();
        }
      });
      window.addEventListener('pagehide', handoffToServiceWorker);
      window.addEventListener('beforeunload', handoffToServiceWorker);
      window.addEventListener('focus', () => {
        fetchDatabaseFromDrive(true);
      });
      window.addEventListener('online', () => {
        fetchDatabaseFromDrive(true);
      });

      // Quick Access Sidebar Listeners (Edge tab, Header button, Hide button, Backdrop, Esc)
      const edgeTab = document.getElementById('sidebar-edge-tab');
      if (edgeTab) edgeTab.addEventListener('click', toggleQuickSidebar);

      const toggleBtn = document.getElementById('sidebar-toggle-btn');
      if (toggleBtn) toggleBtn.addEventListener('click', toggleQuickSidebar);

      const hideBtn = document.getElementById('sidebar-hide-btn');
      if (hideBtn) hideBtn.addEventListener('click', closeQuickSidebar);

      const oldCloseBtn = document.getElementById('sidebar-close-btn');
      if (oldCloseBtn) oldCloseBtn.addEventListener('click', closeQuickSidebar);

      const sidebarBackdrop = document.getElementById('sidebar-backdrop');
      if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeQuickSidebar);

      // Saved View Buttons & Links (F01)
      const headerSavedBtn = document.getElementById('header-saved-btn');
      if (headerSavedBtn) {
        headerSavedBtn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleSavedView();
        });
      }

      const sidebarSavedBtn = document.getElementById('sidebar-saved-btn');
      if (sidebarSavedBtn) {
        sidebarSavedBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.innerWidth < 1024) closeQuickSidebar();
          toggleSavedView();
        });
      }

      const footerSavedLink = document.getElementById('footer-saved-link');
      if (footerSavedLink) {
        footerSavedLink.addEventListener('click', (e) => {
          e.preventDefault();
          toggleSavedView();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // File Card Action Event Delegation (F05)
      initFileCardActionDelegation();

      // Preview Modal Listeners (F06)
      const previewModal = document.getElementById('preview-modal');
      const closePreviewModalBtn = document.getElementById('close-preview-modal-btn');
      if (closePreviewModalBtn) {
        closePreviewModalBtn.addEventListener('click', closePreviewModal);
      }

      if (previewModal) {
        previewModal.addEventListener('click', (e) => {
          if (e.target === previewModal || !e.target.closest('.modal-card-scroll, .glass-panel')) {
            closePreviewModal();
          }
        });
      }

      const modalDownloadBtn = document.getElementById('modal-download-btn');
      if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', () => {
          if (appState.activePreviewId) {
            const file = appState.files.find(f => f.id === appState.activePreviewId);
            if (file) triggerFileDownload(file);
          }
        });
      }

      const modalCompleteBtn = document.getElementById('modal-complete-btn');
      if (modalCompleteBtn) {
        modalCompleteBtn.addEventListener('click', () => {
          if (appState.activePreviewId) {
            toggleFileComplete(appState.activePreviewId);
          }
        });
      }

      const modalShareBtn = document.getElementById('modal-share-btn');
      if (modalShareBtn) {
        modalShareBtn.addEventListener('click', async () => {
          if (!appState.activePreviewId) return;
          const file = appState.files.find(f => f.id === appState.activePreviewId);
          if (!file) return;

          const shareTitle = getCleanFileTitle(file);
          const shareUrl = file.externalUrl || file.fileUrl || file.driveUrl || window.location.href;

          try {
            if (navigator.share && typeof navigator.share === 'function') {
              try {
                await navigator.share({
                  title: shareTitle,
                  text: shareTitle,
                  url: shareUrl
                });
                showToast('تمت مشاركة رابط الملف بنجاح ✓', 'success');
                return;
              } catch (shareErr) {
                if (shareErr.name === 'AbortError') return;
              }
            }

            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
              try {
                await navigator.clipboard.writeText(shareUrl);
                showToast('تم نسخ رابط الملف إلى الحافظة بنجاح ✓', 'success');
                return;
              } catch (clipErr) {}
            }

            const ta = document.createElement('textarea');
            ta.value = shareUrl;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('تم نسخ الرابط بنجاح ✓', 'success');
          } catch (e) {
            showToast('رابط الملف: ' + shareUrl, 'info');
          }
        });
      }

      // Admin Gate & Authentication Listeners (Feature F07)
      const adminAccessBtn = document.getElementById('admin-access-btn');
      if (adminAccessBtn) {
        adminAccessBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openAdminModal();
        });
      }

      const footerAdminLink = document.getElementById('footer-admin-link');
      if (footerAdminLink) {
        footerAdminLink.addEventListener('click', (e) => {
          e.preventDefault();
          openAdminModal();
        });
      }

      const closeAdminLoginBtn = document.getElementById('close-admin-login-btn');
      if (closeAdminLoginBtn) {
        closeAdminLoginBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeAdminModal();
        });
      }

      const adminLoginModal = document.getElementById('admin-login-modal');
      if (adminLoginModal) {
        adminLoginModal.addEventListener('click', (e) => {
          if (e.target === adminLoginModal || !e.target.closest('.modal-card-scroll, .glass-panel')) {
            closeAdminModal();
          }
        });
      }

      const adminLoginForm = document.getElementById('admin-login-form');
      if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
      }

      const adminLogoutBtn = document.getElementById('admin-logout-btn');
      if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleAdminLogout();
        });
      }

      // Publish Buttons Click Listeners (Admin Mode)
      const bindPublishClick = (btnId, closeSidebar = false) => {
        const btn = document.getElementById(btnId);
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!appState.isAdmin) {
              openAdminModal();
              return;
            }
            openPublishModal();
            if (closeSidebar && typeof closeQuickSidebar === 'function') {
              closeQuickSidebar();
            }
          });
        }
      };

      bindPublishClick('admin-publish-btn');
      bindPublishClick('header-publish-btn');
      bindPublishClick('sidebar-publish-btn', true);
      bindPublishClick('breadcrumb-publish-btn');
      bindPublishClick('inline-admin-add-btn');

      // Publish & Edit Modal Listeners (Feature F08)
      const publishModal = document.getElementById('publish-modal');
      const closePublishModalBtn = document.getElementById('close-publish-modal-btn');
      if (closePublishModalBtn) {
        closePublishModalBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closePublishModal();
        });
      }

      const cancelPublishBtn = document.getElementById('cancel-publish-btn');
      if (cancelPublishBtn) {
        cancelPublishBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closePublishModal();
        });
      }

      if (publishModal) {
        publishModal.addEventListener('click', (e) => {
          if (e.target === publishModal || !e.target.closest('.modal-card-scroll, .glass-panel')) {
            closePublishModal();
          }
        });
      }

      const publishForm = document.getElementById('publish-form');
      if (publishForm) {
        publishForm.addEventListener('submit', handlePublishSubmit);
      }

      // Unified Escape Key Listener across modals and sidebar
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          const prevModal = document.getElementById('preview-modal');
          if (prevModal && !prevModal.classList.contains('hidden')) {
            closePreviewModal();
            return;
          }

          const pubModal = document.getElementById('publish-modal');
          if (pubModal && !pubModal.classList.contains('hidden')) {
            closePublishModal();
            return;
          }

          const admModal = document.getElementById('admin-login-modal');
          if (admModal && !admModal.classList.contains('hidden')) {
            closeAdminModal();
            return;
          }

          const ntfModal = document.getElementById('notifications-modal');
          if (ntfModal && !ntfModal.classList.contains('hidden')) {
            closeNotificationsModal();
            return;
          }

          const abtModal = document.getElementById('about-modal');
          if (abtModal && !abtModal.classList.contains('hidden')) {
            closeAboutModal();
            return;
          }

          const qSidebar = document.getElementById('quick-access-sidebar');
          if (qSidebar && qSidebar.classList.contains('sidebar-open')) {
            closeQuickSidebar();
            return;
          } else {
            closeQuickSidebar();
            return;
          }
        }
      });
    });

    // Delegated Event Engine for File Card Actions (#explorer-grid)
    function initFileCardActionDelegation() {
      const grid = document.getElementById('explorer-grid');
      if (!grid) return;

      grid.addEventListener('click', (e) => {
        const actionEl = e.target.closest('[data-file-action]');
        if (!actionEl) return;

        e.preventDefault();
        e.stopPropagation();

        const action = actionEl.getAttribute('data-file-action');
        const fileId = actionEl.getAttribute('data-file-id') ||
                       actionEl.getAttribute('data-id') ||
                       actionEl.closest('[data-file-id]')?.getAttribute('data-file-id');

        if (!fileId) return;

        switch (action) {
          case 'preview':
            openPreviewModal(fileId);
            break;

          case 'download': {
            const file = appState.files.find(f => f.id === fileId);
            if (file) {
              triggerFileDownload(file);
            } else {
              showToast('تعذر العثور على بيانات الملف', 'warning');
            }
            break;
          }

          case 'toggle-save':
            toggleFileSave(fileId);
            break;

          case 'toggle-complete':
            toggleFileComplete(fileId);
            break;

          case 'edit': {
            if (!appState.isAdmin) {
              showToast('التعديل متاح فقط للمسؤولين', 'warning');
              return;
            }
            const file = appState.files.find(f => f.id === fileId);
            if (file) {
              openPublishModal(file);
            }
            break;
          }

          case 'delete': {
            if (!appState.isAdmin) {
              showToast('الحذف متاح فقط للمسؤولين', 'warning');
              return;
            }
            const file = appState.files.find(f => f.id === fileId);
            if (!file) return;

            const confirmed = window.confirm(`هل أنت متأكد من حذف الملف "${getCleanFileTitle(file)}" نهائياً؟`);
            if (!confirmed) return;

            // Track deleted ID so background pollings never bring it back
            if (!appState.deletedFileIds) appState.deletedFileIds = new Set();
            appState.deletedFileIds.add(fileId);
            if (file.driveFileId) appState.deletedFileIds.add(file.driveFileId);

            // Immediate optimistic UI removal
            appState.files = appState.files.filter(f => f.id !== fileId);
            appState.savedIds = appState.savedIds.filter(id => id !== fileId);
            appState.completedIds = appState.completedIds.filter(id => id !== fileId);
            saveAppState();
            renderExplorerContent();
            updateLibraryCounters();
            showToast('جاري حذف الملف نهائياً من Google Drive...', 'info');

            // Send persistent deletion command to Google Drive cloud backend (including clean driveFileId)
            const cleanDriveId = file.driveFileId || (String(fileId).startsWith('drive_') ? String(fileId).replace(/^drive_/, '') : extractDriveFileId(file.fileUrl || file.driveUrl || file.externalUrl || ''));
            syncActionToDrive({
              action: 'deleteFile',
              id: fileId,
              driveFileId: cleanDriveId
            }).then(res => {
              if (res && res.ok) {
                showToast('تم حذف الملف نهائياً من Google Drive ✓', 'success');
              } else {
                showToast('تم الحذف محلياً وسيتم المزامنة لاحقاً', 'warning');
              }
            }).catch(syncErr => {
              console.error('Delete sync error:', syncErr);
              showToast('تم الحذف محلياً (تعذر الاتصال بالسحابة)', 'warning');
            });
            break;
          }
        }
      });
    }
