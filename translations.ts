
export const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      courses: 'الدورات',
      paths: 'المسارات',
      tutor: 'المرشد الذكي',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      login: 'دخول',
      logout: 'خروج',
      start: 'ابدأ رحلتك الآن! 🚀',
      welcome: 'أهلاً',
      points: 'نقطة'
    },
    home: {
      heroTitle: 'اغرس المعرفة، واحصد المستقبل',
      heroSubtitle: 'تعلم البرمجة والذكاء الاصطناعي وأنت تلعب! حصص ممتعة، جوائز رائعة، وأصدقاء جدد.',
      ctaStart: 'انطلق الآن!',
      ctaLeaderboard: 'لوحة الأبطال',
      featuresTitle: 'لماذا يحب الأطفال غرس؟',
      statsStudents: 'بطل وبطلة',
      statsCourses: 'مغامرة تعليمية',
      statsPartners: 'شريك نجاح',
      statsSatisfaction: 'أحبونا',
      learningMethod: 'طريقة التعلم',
      testimonials: 'أصدقاء غرس',
      faq: 'عندك سؤال؟',
      faqTitle: 'الأسئلة الشائعة',
      footerRights: 'جميع الحقوق محفوظة لمنصة غرس التعليمية'
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما',
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      back: 'عودة',
      next: 'التالي',
      prev: 'السابق',
      search: 'بحث...',
      filter: 'تصفية',
      all: 'الكل',
      price: 'ر.س',
      level: 'المستوى',
      duration: 'المدة',
      rating: 'التقييم',
      student: 'طالب',
      admin: 'مدير'
    }
  },
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      paths: 'Paths',
      tutor: 'AI Tutor',
      profile: 'Profile',
      settings: 'Settings',
      login: 'Login',
      logout: 'Logout',
      start: 'Start Journey! 🚀',
      welcome: 'Hello',
      points: 'pts'
    },
    home: {
      heroTitle: 'Plant Knowledge, Harvest the Future',
      heroSubtitle: 'Learn coding and AI while playing! Fun lessons, great rewards, and new friends.',
      ctaStart: 'Start Now!',
      ctaLeaderboard: 'Leaderboard',
      featuresTitle: 'Why Kids Love Gharas?',
      statsStudents: 'Heroes',
      statsCourses: 'Adventures',
      statsPartners: 'Partners',
      statsSatisfaction: 'Love Us',
      learningMethod: 'Learning Method',
      testimonials: 'Gharas Friends',
      faq: 'Got Questions?',
      faqTitle: 'FAQ',
      footerRights: 'All rights reserved to Gharas Platform'
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      back: 'Back',
      next: 'Next',
      prev: 'Previous',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      price: 'SAR',
      level: 'Level',
      duration: 'Duration',
      rating: 'Rating',
      student: 'Student',
      admin: 'Admin'
    }
  }
};

export type Language = 'ar' | 'en';
export type TranslationKeys = typeof translations.ar;
