import React, { useEffect, useState } from 'react';
import { Course, User } from '../types';
import { TotarService } from '../services/totarService';
import CourseCard from '../components/CourseCard';
import { Trophy, Star, TrendingUp, BookOpen } from 'lucide-react';

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
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-gharas-500 to-gharas-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gharas-100 font-bold mb-1">إجمالي النقاط</p>
            <h3 className="text-4xl font-heading font-bold">{user.points}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Star size={32} className="text-yellow-300 fill-yellow-300" />
          </div>
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-bold mb-1">المستوى الحالي</p>
            <h3 className="text-4xl font-heading font-bold text-gray-800">{user.level}</h3>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl">
            <TrendingUp size={32} className="text-playful-blue" />
          </div>
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-bold mb-1">الدورات المكتملة</p>
            <h3 className="text-4xl font-heading font-bold text-gray-800">
               {myCourses.filter(c => c.progress === 100).length}
            </h3>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl">
            <Trophy size={32} className="text-playful-orange" />
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-gharas-500 rounded-full inline-block"></span>
        دروسي المسجلة
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map(i => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
        </div>
      ) : myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map(course => (
            <CourseCard key={course.id} course={course} onClick={onSelectCourse} isEnrolled={true} />
          ))}
        </div>
      ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">ليس لديك دورات بعد</h3>
              <p className="text-gray-400">تصفح الكتالوج وابدأ رحلة التعلم!</p>
          </div>
      )}
    </div>
  );
};

export default Dashboard;