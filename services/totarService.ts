
import { Course, User, DashboardStats, SiteConfig } from '../types';

// Mock data simulating Totar LMS backend
let MOCK_COURSES: Course[] = [
  // --- TECH COURSES ---
  {
    id: 'tech1',
    type: 'course',
    title: 'المبرمج الصغير (Scratch)',
    description: 'اصنع ألعابك وقصصك التفاعلية بنفسك باستخدام المكعبات البرمجية.',
    longDescription: 'دورة تأسيسية ممتعة جداً للأطفال من عمر 6-9 سنوات. سنتعلم أساسيات التفكير المنطقي والبرمجة باستخدام منصة سكراتش العالمية. بنهاية الدورة سيقوم الطفل ببرمجة لعبة كاملة.',
    image: 'https://picsum.photos/seed/scratch/400/250',
    category: 'برمجة',
    price: 250,
    level: 'mubtadi',
    rating: 4.8,
    instructor: 'أ. سارة التقنية',
    progress: 0,
    color: 'bg-orange-100',
    studentsCount: 120,
    revenue: 30000,
    status: 'published',
    modules: [
      {
        id: 'm1',
        title: 'عالم سكراتش',
        lessons: [
          { id: 'l1', title: 'مقدمة في سكراتش', type: 'video', content: 'https://www.youtube.com/watch?v=kMTeZAAJ-5o', duration: '10 د', completed: false },
          { id: 'l2', title: 'الأصوات والخلفيات', type: 'reading', content: 'في هذا الدرس سنتعلم كيف نضيف أصواتاً ممتعة للعبة...', duration: '5 د', completed: false },
        ]
      }
    ]
  },
  {
    id: 'tech2',
    type: 'course',
    title: 'لغة بايثون للأبطال',
    description: 'ابدأ رحلة البرمجة الحقيقية وتحدث لغة الكمبيوتر.',
    longDescription: 'بايثون هي لغة المستقبل. في هذه الدورة سننتقل من المكعبات إلى كتابة الأكواد الحقيقية بطريقة مبسطة. مناسبة للأطفال من 10-14 سنة.',
    image: 'https://picsum.photos/seed/python/400/250',
    category: 'برمجة',
    price: 350,
    level: 'mutawasit',
    rating: 4.9,
    instructor: 'م. أحمد كود',
    progress: 0,
    color: 'bg-blue-100',
    studentsCount: 85,
    revenue: 29750,
    status: 'published',
    modules: []
  },
  {
    id: 'tech3',
    type: 'course',
    title: 'الذكاء الاصطناعي للأطفال',
    description: 'كيف تفكر الآلات؟ وكيف نعلم الكمبيوتر؟ اكتشف السر.',
    longDescription: 'مقدمة في تعلم الآلة (Machine Learning) للأطفال. سنستخدم أدوات بصرية لتدريب نماذج ذكاء اصطناعي يمكنها التعرف على الصور والأصوات.',
    image: 'https://picsum.photos/seed/ai/400/250',
    category: 'ذكاء اصطناعي',
    price: 400,
    level: 'mutawasit',
    rating: 5.0,
    progress: 0,
    color: 'bg-purple-100',
    status: 'published',
    modules: []
  },
  {
    id: 'path1',
    type: 'path',
    title: 'مسار مبرمج المستقبل',
    description: 'رحلة شاملة من الصفر حتى الاحتراف في عالم البرمجة.',
    longDescription: 'يبدأ هذا المسار بتأسيس المنطق البرمجي عبر سكراتش، ثم ينتقل لبناء المواقع، وينتهي بلغة بايثون القوية. يوفر هذا المسار 20% من سعر الدورات منفصلة.',
    image: 'https://picsum.photos/seed/path1/400/250',
    category: 'مسار تعليمي',
    price: 750, // Discounted from 250+300+350 = 900
    level: 'mutawasit',
    rating: 5.0,
    instructor: 'نخبة من المدربين',
    progress: 0,
    color: 'bg-gradient-to-r from-blue-100 to-purple-100',
    coursesInPath: ['tech1', 'tech4', 'tech2'], // Scratch -> HTML -> Python
    status: 'published',
    modules: [] // Modules are aggregated from children in UI logic
  }
];

const MOCK_USERS: User[] = [
    {
        id: 'u1',
        name: 'أحمد البطل',
        email: 'ahmed@gharas.sa',
        role: 'student',
        permissions: [],
        age: 10,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        level: 3,
        points: 1500,
        enrolledCourseIds: ['tech1'],
        status: 'active',
        joinDate: new Date('2023-01-15'),
        preferences: { notifications: true, soundEffects: true, publicProfile: false }
    },
    {
        id: 'admin1',
        name: 'مدير النظام',
        email: 'admin@gharas.sa',
        role: 'admin',
        permissions: ['manage_users', 'manage_courses', 'manage_content', 'view_reports'],
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        level: 99,
        points: 0,
        enrolledCourseIds: [],
        status: 'active',
        joinDate: new Date('2022-01-01'),
        preferences: { notifications: true, soundEffects: false, publicProfile: false }
    }
];

// --- CMS DATA ---
let MOCK_SITE_CONFIG: SiteConfig = {
    hero: {
        title: 'نعلمهم لغة العصر.. ليبنو المستقبل',
        subtitle: 'دورات متخصصة في البرمجة، الذكاء الاصطناعي، والروبوتكس للأطفال من عمر 6 إلى 15 سنة. منهج تفاعلي، شهادات معتمدة، ومتعة لا تنتهي!',
        ctaText: 'ابدأ رحلة التعلم',
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop'
    },
    stats: {
        students: '+10k',
        courses: '+50',
        partners: '+15',
        satisfaction: '99%'
    },
    features: [
        { title: 'تفاعلية بالكامل', description: 'ليست مجرد فيديوهات، بل تمارين ومشاريع عملية.', icon: 'Monitor' },
        { title: 'بيئة آمنة', description: 'محتوى مراقب ومناسب للقيم والثقافة المحلية.', icon: 'Shield' },
        { title: 'تعليم ممتع', description: 'نستخدم التلعيب (Gamification) لجذب الطفل.', icon: 'Smile' },
        { title: 'مرتبط بـ Totar', description: 'شهادات وتقارير أداء متزامنة مع نظام مدرستك.', icon: 'CheckCircle' }
    ],
    testimonials: [
        { id: 't1', name: 'أم عبدالله', role: 'ولية أمر', comment: 'منصة رائعة جداً، لاحظت تطور كبير في تفكير ابني المنطقي بعد دورة سكراتش.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Parent1' },
        { id: 't2', name: 'أ. محمد الغامدي', role: 'معلم حاسب', comment: 'المناهج مصممة باحترافية وتناسب المدارس السعودية بشكل ممتاز.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher1' },
        { id: 't3', name: 'لانا', role: 'طالبة (11 سنة)', comment: 'أحببت غرس لأنني صممت لعبتي الخاصة وشاركتها مع صديقاتي!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lana' }
    ],
    faq: [
        { id: 'f1', question: 'هل الدورات مسجلة أم مباشرة؟', answer: 'معظم الدورات مسجلة ومتاحة في أي وقت، لكن لدينا جلسات مباشرة أسبوعية مع المعلمين.' },
        { id: 'f2', question: 'هل يحصل الطفل على شهادة؟', answer: 'نعم، جميع الدورات تمنح شهادة إتمام معتمدة من المنصة ويمكن ربطها بنظام Totar LMS.' },
        { id: 'f3', question: 'ما هو العمر المناسب؟', answer: 'نستهدف الأطفال من عمر 6 سنوات وحتى 15 سنة، مع مستويات تناسب كل فئة عمرية.' }
    ]
};

let currentUser: User | null = null;

export const TotarService = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Hardcoded admin for demo
            if (email === 'admin@gharas.sa' && password === 'admin123') {
                const admin = MOCK_USERS.find(u => u.role === 'admin')!;
                currentUser = admin;
                resolve(admin);
                return;
            }

            const foundUser = MOCK_USERS.find(u => u.email === email);
            if (foundUser) {
                currentUser = foundUser;
                resolve(foundUser);
            } else {
                reject(new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة'));
            }
        }, 1000);
    });
  },

  register: async (data: any): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUser: User = {
                id: 'u' + Date.now(),
                name: data.name,
                email: data.email,
                role: 'student',
                permissions: [],
                age: parseInt(data.age),
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
                points: 0,
                level: 1,
                enrolledCourseIds: [],
                status: 'active',
                joinDate: new Date(),
                preferences: {
                    notifications: true,
                    soundEffects: true,
                    publicProfile: false
                }
            };
            MOCK_USERS.push(newUser);
            currentUser = newUser;
            resolve(newUser);
        }, 1000);
    });
  },

  // NEW: Create User by Admin with Permissions
  createUser: async (userData: any): Promise<User> => {
      return new Promise((resolve) => {
          setTimeout(() => {
               const newUser: User = {
                id: 'u' + Date.now(),
                name: userData.name,
                email: userData.email,
                role: userData.role || 'student',
                permissions: userData.role === 'admin' ? userData.permissions : [],
                age: 10, // default
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
                points: 0,
                level: 1,
                enrolledCourseIds: [],
                status: 'active',
                joinDate: new Date(),
                preferences: { notifications: true, soundEffects: true, publicProfile: false }
            };
            MOCK_USERS.push(newUser);
            resolve(newUser);
          }, 500);
      });
  },

  updateProfile: async (updates: Partial<User>): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (currentUser) {
                const updated = { ...currentUser, ...updates };
                // Update in mock db
                const index = MOCK_USERS.findIndex(u => u.id === currentUser?.id);
                if (index !== -1) MOCK_USERS[index] = updated;
                currentUser = updated;
                resolve(updated);
            }
        }, 500);
    });
  },

  getAllCoursesAndPaths: async (): Promise<Course[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_COURSES), 300));
  },

  getMyCourses: async (courseIds: string[]): Promise<Course[]> => {
    return new Promise((resolve) => {
        const myCourses = MOCK_COURSES.filter(c => courseIds.includes(c.id));
        resolve(myCourses);
    });
  },

  getCourseById: async (id: string): Promise<Course | undefined> => {
    return new Promise((resolve) => {
        resolve(MOCK_COURSES.find(c => c.id === id));
    });
  },

  enrollInCourse: async (courseId: string): Promise<boolean> => {
     return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  },

  syncProgress: async (courseId: string, progress: number): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  },

  // --- ADMIN FUNCTIONS ---
  getDashboardStats: async (): Promise<DashboardStats> => {
      return new Promise(resolve => {
          setTimeout(() => {
              const totalRevenue = MOCK_COURSES.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
              resolve({
                  totalUsers: MOCK_USERS.length,
                  totalCourses: MOCK_COURSES.length,
                  totalRevenue: totalRevenue,
                  activeNow: 45
              });
          }, 300);
      });
  },

  getAllUsers: async (): Promise<User[]> => {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_USERS), 400));
  },

  deleteUser: async (userId: string): Promise<boolean> => {
      return new Promise(resolve => {
          const idx = MOCK_USERS.findIndex(u => u.id === userId);
          if (idx !== -1) MOCK_USERS.splice(idx, 1);
          resolve(true);
      });
  },

  createCourse: async (course: Course): Promise<Course> => {
      return new Promise(resolve => {
          MOCK_COURSES.push(course);
          resolve(course);
      });
  },

  deleteCourse: async (courseId: string): Promise<boolean> => {
       return new Promise(resolve => {
          const idx = MOCK_COURSES.findIndex(c => c.id === courseId);
          if (idx !== -1) MOCK_COURSES.splice(idx, 1);
          resolve(true);
      });
  },

  updateCourse: async (course: Course): Promise<Course> => {
      return new Promise(resolve => {
          const idx = MOCK_COURSES.findIndex(c => c.id === course.id);
          if (idx !== -1) MOCK_COURSES[idx] = course;
          resolve(course);
      });
  },

  // --- SITE CONFIG CMS FUNCTIONS ---
  getSiteConfig: async (): Promise<SiteConfig> => {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_SITE_CONFIG), 300));
  },

  updateSiteConfig: async (config: SiteConfig): Promise<SiteConfig> => {
      return new Promise(resolve => {
          setTimeout(() => {
              MOCK_SITE_CONFIG = config;
              resolve(config);
          }, 500);
      });
  }
};
