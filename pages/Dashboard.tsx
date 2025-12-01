import React, { useEffect, useState } from 'react';
import { Course, User } from '../types';
import { TotarService } from '../services/totarService';
import CourseCard from '../components/CourseCard';
import { Trophy, Star, TrendingUp, BookOpen, Crown, Zap } from 'lucide-react';

interface DashboardProps {
  user: User;
  onSelectCourse: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCourse }) => {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      // Only fetch enrolled courses
      const data = await TotarService.getMyCourses(user.enrolledCourseIds);
      setMyCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-kid-purple to-kid-blue rounded-[3rem] p-8 md:p-12 mb-12 shadow-pop-lg shadow-blue-200 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex items-center justify-between">
              <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-black mb-2">أهلاً يا بطل! {user.name} 👋</h1>
                  <p className="text-xl font-bold opacity-90">جاهز تكمل مغامرتك اليوم؟</p>
              </div>
              <div className="hidden md:block text-8xl animate-bounce-slow">🚀</div>
          </div>
      </div>

      {/* Stats Section - Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Points Card */}
        <div className="bg-white border-4 border-kid-yellow rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-kid-yellow rounded-full opacity-20 group-hover:scale-125 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-bold">نقاطك الذهبية</span>
                <div className="bg-kid-yellow text-white p-2 rounded-xl shadow-sm rotate-3">
                    <Star size={24} fill="white" />
                </div>
            </div>
            <h3 className="text-5xl font-heading font-black text-gray-800">{user.points}</h3>
          </div>
        </div>

        {/* Level Card */}
        <div className="bg-white border-4 border-kid-green rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-kid-green rounded-full opacity-20 group-hover:scale-125 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-bold">المستوى</span>
                <div className="bg-kid-green text-white p-2 rounded-xl shadow-sm -rotate-3">
                    <Zap size={24} fill="white" />
                </div>
            </div>
            <h3 className="text-5xl font-heading font-black text-gray-800">{user.level}</h3>
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-white border-4 border-kid-orange rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-kid-orange rounded-full opacity-20 group-hover:scale-125 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-bold">التختيم</span>
                <div className="bg-kid-orange text-white p-2 rounded-xl shadow-sm rotate-6">
                    <Trophy size={24} fill="white" />
                </div>
            </div>
            <h3 className="text-5xl font-heading font-black text-gray-800">
               {myCourses.filter(c => c.progress === 100).length} <span className="text-lg text-gray-400 font-bold">دورة</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
          <div className="w-4 h-10 bg-kid-blue rounded-full"></div>
          <h2 className="text-3xl font-heading font-black text-gray-800">
            دروسي المسجلة 📚
          </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map(i => (
                <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-[2.5rem]"></div>
            ))}
        </div>
      ) : myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map(course => (
            <CourseCard key={course.id} course={course} onClick={onSelectCourse} isEnrolled={true} />
          ))}
        </div>
      ) : (
          <div className="text-center py-16 bg-white rounded-[3rem] border-4 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <BookOpen size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-700 mb-2">لسه ما سجلت في أي دورة؟ 😲</h3>
              <p className="text-gray-500 font-bold mb-6">روح تصفح الدورات واختار اللي يعجبك!</p>
              <button className="px-8 py-3 bg-kid-blue text-white rounded-2xl font-bold shadow-pop hover:bg-blue-600 transition-colors">
                  تصفح الكتالوج
              </button>
          </div>
      )}
    </div>
  );
};

export default Dashboard;