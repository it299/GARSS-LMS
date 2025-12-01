
import { Course, User, DashboardStats, SiteConfig } from '../types';

// Mock data simulating Totar LMS backend
let MOCK_COURSES: Course[] = [
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

let MOCK_SITE_CONFIG: SiteConfig = {
    hero: {
        title: 'نعلمهم لغة العصر.. ليبنو المستقبل',
        subtitle: 'دورات متخصصة في البرمجة، الذكاء الاصطناعي، والروبوتكس للأطفال من عمر 6 إلى 15 سنة.',
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
        { id: 't1', name: 'أم عبدالله', role: 'ولية أمر', comment: 'منصة رائعة جداً، لاحظت تطور كبير في تفكير ابني المنطقي.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Parent1' }
    ],
    faq: [
        { id: 'f1', question: 'هل الدورات مسجلة أم مباشرة؟', answer: 'معظم الدورات مسجلة ومتاحة في أي وقت.' }
    ]
};

let currentUser: User | null = null;

export const TotarService = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
        }, 800);
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
        }, 800);
    });
  },

  createUser: async (userData: any): Promise<User> => {
      return new Promise((resolve) => {
          setTimeout(() => {
               const newUser: User = {
                id: 'u' + Date.now(),
                name: userData.name,
                email: userData.email,
                role: userData.role || 'student',
                permissions: userData.role === 'admin' ? userData.permissions : [],
                age: 10,
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

  getSiteConfig: async (): Promise<SiteConfig> => {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_SITE_CONFIG), 300));
  },

  updateSiteConfig: async (config: SiteConfig): Promise<SiteConfig> => {
      return new Promise(resolve => {
          MOCK_SITE_CONFIG = config;
          resolve(config);
      });
  }
};
