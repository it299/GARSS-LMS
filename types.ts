
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  age?: number;
  avatar: string;
  level: number;
  points: number;
  bio?: string;
  enrolledCourseIds: string[];
  status?: 'active' | 'banned';
  joinDate?: Date;
  preferences: {
    notifications: boolean;
    soundEffects: boolean;
    publicProfile: boolean;
  };
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'reading';
  content: string; // URL or text
  duration: string;
  completed: boolean;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  type: 'course' | 'path';
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  price: number;
  level: 'mubtadi' | 'mutawasit' | 'mutaqadim';
  instructor?: string;
  rating?: number;
  progress: number;
  modules: Module[];
  color: string;
  coursesInPath?: string[];
  studentsCount?: number;
  revenue?: number;
  status?: 'published' | 'draft';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeNow: number;
}

// --- Dynamic Site Configuration ---
export interface SiteConfig {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    image: string; // For background or side image
  };
  stats: {
    students: string;
    courses: string;
    partners: string;
    satisfaction: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string; // Icon name reference
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string; // e.g., Parent, Student
    comment: string;
    avatar: string;
  }>;
  faq: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}
