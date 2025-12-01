
import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { ArrowRight, Clock, Award, Star, BookOpen, Layers, Check, ShoppingCart, Lock, PlayCircle, FileText } from 'lucide-react';
import { TotarService } from '../services/totarService';

interface CourseDetailProps {
  courseId: string | null;
  onBack: () => void;
  onEnroll: (course: Course) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onBack, onEnroll }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
        if (!courseId) return;
        const c = await TotarService.getCourseById(courseId);
        if (c) setCourse(c);
        setLoading(false);
    };
    fetch();
  }, [courseId]);

  if (loading || !course) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-gharas-500 rounded-full border-t-transparent"></div></div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-[300px] lg:h-[400px] w-full">
        <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
        <div className="absolute top-6 right-6">
            <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
                <ArrowRight size={24} />
            </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.type === 'path' ? 'bg-playful-purple text-white' : 'bg-gharas-500 text-white'}`}>
                        {course.category}
                    </span>
                    {course.type === 'path' && <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">مسار شامل</span>}
                </div>
                <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-4">{course.title}</h1>
                <p className="text-gray-200 text-lg max-w-2xl line-clamp-2">{course.description}</p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-heading">عن {course.type === 'path' ? 'المسار' : 'الدورة'}</h2>
                <p className="text-gray-600 leading-8 text-lg">
                    {course.longDescription || course.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Clock className="mx-auto mb-2 text-blue-500" />
                        <span className="block text-sm text-gray-400 font-bold">المدة</span>
                        <span className="font-bold text-gray-800">10 ساعات</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Award className="mx-auto mb-2 text-yellow-500" />
                        <span className="block text-sm text-gray-400 font-bold">الشهادة</span>
                        <span className="font-bold text-gray-800">معتمدة</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Star className="mx-auto mb-2 text-orange-500" />
                        <span className="block text-sm text-gray-400 font-bold">التقييم</span>
                        <span className="font-bold text-gray-800">{course.rating || 4.8}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl text-center">
                        <Layers className="mx-auto mb-2 text-purple-500" />
                        <span className="block text-sm text-gray-400 font-bold">المستوى</span>
                        <span className="font-bold text-gray-800">{course.level === 'mubtadi' ? 'مبتدئ' : 'متوسط'}</span>
                    </div>
                </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">محتوى الدورة</h2>
                <div className="space-y-6">
                    {course.modules && course.modules.length > 0 ? (
                        course.modules.map((module) => (
                            <div key={module.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">{module.title}</h3>
                                    <span className="text-xs text-gray-500">{module.lessons.length} دروس</span>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {module.lessons.map(lesson => (
                                        <div key={lesson.id} className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                                             <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 ml-4">
                                                {lesson.type === 'video' ? <PlayCircle size={16} /> : <FileText size={16} />}
                                             </div>
                                             <div className="flex-1">
                                                 <p className="font-medium text-gray-700 text-sm">{lesson.title}</p>
                                             </div>
                                             <div className="flex items-center gap-2">
                                                 <span className="text-xs text-gray-400 font-bold">{lesson.duration}</span>
                                                 <Lock size={14} className="text-gray-300" />
                                             </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <BookOpen className="mx-auto text-gray-300 mb-2" size={32} />
                            <p className="text-gray-500 font-bold">لم يتم إضافة محتوى لهذه الدورة بعد.</p>
                            <p className="text-sm text-gray-400">سيقوم المدرب بإضافة الدروس قريباً.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Sidebar - Sticky Card */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-3xl shadow-xl border border-gharas-100">
                <div className="text-3xl font-bold text-gharas-600 mb-2 font-heading">
                    {course.price} <span className="text-sm text-gray-400 font-sans">ريال سعودي</span>
                </div>
                <div className="text-gray-400 text-sm mb-6 line-through decoration-red-400 decoration-2">
                    {Math.round(course.price * 1.3)} ريال
                </div>

                <button 
                    onClick={() => onEnroll(course)}
                    className="w-full bg-gharas-600 hover:bg-gharas-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-gharas-200 transition-all transform hover:scale-105 mb-4 flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={20} />
                    اشترك الآن
                </button>

                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span>وصول مدى الحياة للمحتوى</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span>شهادة إتمام من Totar LMS</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span>دعم مباشر من المرشد الذكي</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span>تمارين عملية ومشاريع</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
