
import React, { useState } from 'react';
import { Course, Module, Lesson } from '../types';
import { ArrowRight, Play, CheckCircle, FileText, Lock, AlertCircle } from 'lucide-react';
import { TotarService } from '../services/totarService';

interface LessonViewProps {
  course: Course;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ course, onBack }) => {
  const [activeModule, setActiveModule] = useState<Module | null>(course.modules[0] || null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(course.modules[0]?.lessons[0] || null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLessonSelect = (module: Module, lesson: Lesson) => {
    setActiveModule(module);
    setActiveLesson(lesson);
    setIsCompleted(lesson.completed);
  };

  const handleComplete = async () => {
    if (!activeLesson) return;
    setIsCompleted(true);
    await TotarService.syncProgress(course.id, Math.min(course.progress + 10, 100));
  };

  const getYouTubeEmbedUrl = (url: string) => {
    try {
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    } catch (e) {
        return url;
    }
  };

  const renderContent = () => {
      if (!activeLesson) return null;

      if (activeLesson.type === 'video') {
          const embedUrl = getYouTubeEmbedUrl(activeLesson.content);
          const isYouTube = embedUrl.includes('youtube.com/embed');

          return (
             <div className="w-full h-full bg-black flex items-center justify-center">
                 {isYouTube ? (
                     <iframe 
                        width="100%" 
                        height="100%" 
                        src={embedUrl} 
                        title={activeLesson.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     ></iframe>
                 ) : activeLesson.content.endsWith('.mp4') || activeLesson.content.endsWith('.webm') ? (
                     <video controls className="w-full h-full" autoPlay>
                         <source src={activeLesson.content} type="video/mp4" />
                         متصفحك لا يدعم تشغيل الفيديو.
                     </video>
                 ) : (
                     <div className="text-center text-white p-6">
                         <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
                         <p>رابط الفيديو غير مدعوم أو غير صحيح.</p>
                         <a href={activeLesson.content} target="_blank" rel="noreferrer" className="text-blue-400 underline mt-2 block">فتح الرابط في نافذة جديدة</a>
                     </div>
                 )}
             </div>
          );
      }

      return (
          <div className="w-full h-full p-10 bg-orange-50 overflow-y-auto">
             <div className="max-w-2xl mx-auto">
                <FileText size={64} className="text-playful-orange mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeLesson.title}</h3>
                <div className="prose prose-lg text-gray-600">
                    <p>{activeLesson.content}</p>
                </div>
             </div>
          </div>
      );
  };

  if (!activeModule || !activeLesson) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center mt-10">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Lock size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">لا يوجد محتوى في هذه الدورة بعد! 🛠️</h2>
        <p className="text-gray-500 mb-6">يقوم المعلم بإعداد الدروس الرائعة، عد لاحقاً.</p>
        <button onClick={onBack} className="bg-gharas-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-gharas-700">العودة للوحة التحكم</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Sidebar - Course Content */}
      <div className="w-full lg:w-80 border-l border-gray-100 bg-gray-50 flex flex-col h-1/3 lg:h-full overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-white shadow-sm z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gharas-600 transition-colors mb-4 font-bold text-sm"
          >
            <ArrowRight size={16} />
            عودة للدورات
          </button>
          <h2 className="font-heading font-bold text-lg text-gray-800 leading-tight line-clamp-2">{course.title}</h2>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gharas-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.modules.map(module => (
            <div key={module.id}>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3 pr-2 border-r-4 border-gharas-300 mr-1">{module.title}</h3>
              <div className="space-y-1">
                {module.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(module, lesson)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-right transition-all ${
                      activeLesson.id === lesson.id
                        ? 'bg-white shadow-md text-gharas-700 border border-gray-100 ring-2 ring-gharas-100'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                     <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                         lesson.completed 
                           ? 'bg-green-100 text-green-600' 
                           : activeLesson.id === lesson.id 
                              ? 'bg-gharas-600 text-white' 
                              : 'bg-gray-200 text-gray-400'
                     }`}>
                         {lesson.completed ? <CheckCircle size={14} /> : (lesson.type === 'video' ? <Play size={10} fill="currentColor" /> : <FileText size={12} />)}
                     </div>
                     <span className="text-sm font-medium line-clamp-1 flex-1">{lesson.title}</span>
                     <span className="text-[10px] text-gray-400 bg-gray-50 px-1 rounded">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-2/3 lg:h-full overflow-hidden bg-black lg:bg-white">
         <div className="flex-1 lg:p-10 bg-slate-100 flex items-center justify-center">
             <div className="w-full max-w-5xl aspect-video bg-black rounded-none lg:rounded-3xl overflow-hidden shadow-2xl relative">
                  {renderContent()}
             </div>
         </div>
         
         {/* Controls Footer */}
         <div className="bg-white p-4 border-t border-gray-100 flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-800 hidden md:block">{activeLesson.title}</h1>
              <div className="flex gap-3 w-full md:w-auto justify-between">
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50">
                    السابق
                </button>
                
                {!isCompleted ? (
                    <button 
                        onClick={handleComplete}
                        className="px-6 py-2 bg-gharas-600 text-white text-sm font-bold rounded-lg hover:bg-gharas-700 flex items-center gap-2"
                    >
                        <CheckCircle size={16} />
                        أكملت الدرس
                    </button>
                ) : (
                    <button disabled className="px-6 py-2 bg-green-50 text-green-600 text-sm font-bold rounded-lg cursor-default flex items-center gap-2 border border-green-100">
                        <CheckCircle size={16} />
                        تم الإكمال
                    </button>
                )}

                <button className="px-4 py-2 rounded-lg bg-playful-blue text-white text-sm font-bold hover:bg-blue-600">
                    التالي
                </button>
              </div>
         </div>
      </div>
    </div>
  );
};

export default LessonView;
