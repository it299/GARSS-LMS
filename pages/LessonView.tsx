
import React, { useState, useEffect } from 'react';
import { Course, Module, Lesson } from '../types';
import { ArrowRight, Play, CheckCircle, FileText, Lock, AlertCircle, ExternalLink } from 'lucide-react';
import { TotarService } from '../services/totarService';

interface LessonViewProps {
  course: Course;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ course, onBack }) => {
  const [activeModule, setActiveModule] = useState<Module | null>(course.modules[0] || null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(course.modules[0]?.lessons[0] || null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Update state if course changes or is loaded
  useEffect(() => {
    if (course && course.modules.length > 0) {
        if (!activeModule) setActiveModule(course.modules[0]);
        if (!activeLesson) setActiveLesson(course.modules[0].lessons[0]);
    }
  }, [course]);

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

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderVideoPlayer = (lesson: Lesson) => {
      const videoId = getYouTubeId(lesson.content);

      if (videoId) {
          return (
             <iframe 
                key={lesson.id}
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&modestbranding=1`}
                title={lesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full absolute inset-0"
             ></iframe>
          );
      }
      
      // Direct video file (MP4, etc.)
      if (lesson.content.match(/\.(mp4|webm|ogg)$/i)) {
          return (
             <video key={lesson.id} controls className="w-full h-full max-h-full bg-black" autoPlay>
                 <source src={lesson.content} />
                 متصفحك لا يدعم تشغيل الفيديو.
             </video>
          );
      }

      // Fallback
      return (
         <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center bg-gray-900">
             <AlertCircle size={64} className="mb-4 text-gray-500" />
             <h3 className="text-xl font-bold mb-2">نوع الفيديو غير مدعوم أو الرابط خارجي</h3>
             <a 
                href={lesson.content} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
             >
                <ExternalLink size={18} />
                فتح الرابط في نافذة جديدة
             </a>
         </div>
       );
  };

  if (!activeModule || !activeLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-lg border-4 border-gray-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 animate-pulse">
                <Lock size={40} />
            </div>
            <h2 className="text-3xl font-heading font-black text-gray-800 mb-4">لا يوجد محتوى بعد! 🚧</h2>
            <p className="text-gray-500 font-bold text-lg mb-8">لم يتم إضافة دروس لهذه الدورة حتى الآن.</p>
            <button 
                onClick={onBack} 
                className="bg-gharas-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gharas-700 shadow-lg transition-transform hover:-translate-y-1"
            >
                العودة
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      {/* Sidebar - Course Content */}
      <div className="w-full lg:w-96 border-l border-gray-200 bg-white flex flex-col h-[40vh] lg:h-full shadow-xl z-20 relative order-2 lg:order-1">
        <div className="p-5 border-b border-gray-100 bg-white">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gharas-600 transition-colors mb-4 font-bold text-sm bg-gray-50 w-fit px-3 py-1.5 rounded-lg"
          >
            <ArrowRight size={16} />
            خروج من الفصل
          </button>
          <h2 className="font-heading font-black text-xl text-gray-800 leading-tight line-clamp-2">{course.title}</h2>
          <div className="mt-4 flex items-center gap-3">
             <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gharas-500 h-full rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
             </div>
             <span className="text-xs font-black text-gharas-600">{course.progress}%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {course.modules.map(module => (
            <div key={module.id}>
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-black mb-3 px-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gharas-300"></span>
                  {module.title}
              </h3>
              <div className="space-y-2">
                {module.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(module, lesson)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl text-right transition-all duration-200 border-2 ${
                      activeLesson.id === lesson.id
                        ? 'bg-blue-50 border-kid-blue shadow-sm'
                        : 'border-transparent hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors border-2 ${
                         lesson.completed 
                           ? 'bg-green-100 text-green-600 border-green-200' 
                           : activeLesson.id === lesson.id 
                              ? 'bg-kid-blue text-white border-blue-400' 
                              : 'bg-gray-100 text-gray-400 border-gray-200'
                     }`}>
                         {lesson.completed ? <CheckCircle size={16} strokeWidth={3} /> : (lesson.type === 'video' ? <Play size={14} fill="currentColor" /> : <FileText size={14} />)}
                     </div>
                     <div className="flex-1 min-w-0">
                         <p className={`text-sm font-bold truncate ${activeLesson.id === lesson.id ? 'text-gray-900' : 'text-gray-600'}`}>
                             {lesson.title}
                         </p>
                     </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-[60vh] lg:h-full bg-black relative order-1 lg:order-2">
         <div className="flex-1 bg-black flex items-center justify-center overflow-hidden relative">
             {activeLesson.type === 'video' ? (
                renderVideoPlayer(activeLesson)
             ) : (
                <div key={activeLesson.id} className="w-full h-full p-8 bg-orange-50 overflow-y-auto">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-orange-100 min-h-full">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div className="bg-orange-100 p-3 rounded-2xl text-orange-500">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-3xl font-heading font-black text-gray-800">{activeLesson.title}</h3>
                        </div>
                        <div className="prose prose-lg text-gray-600 leading-loose font-medium">
                            {activeLesson.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
             )}
         </div>
         
         {/* Controls Footer */}
         <div className="bg-white p-4 border-t border-gray-100 flex items-center justify-between shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30">
              <div className="hidden md:block">
                  <h1 className="text-lg font-black text-gray-800">{activeLesson.title}</h1>
                  <p className="text-sm text-gray-400 font-bold">{activeModule.title}</p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto justify-between md:justify-end">
                <button 
                    onClick={handleComplete}
                    disabled={isCompleted}
                    className={`px-6 py-3 text-sm font-bold rounded-xl flex items-center gap-2 transition-all ${isCompleted ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gharas-600 text-white hover:bg-gharas-700 shadow-lg'}`}
                >
                    <CheckCircle size={18} />
                    {isCompleted ? 'مكتمل' : 'أكملت الدرس'}
                </button>
              </div>
         </div>
      </div>
    </div>
  );
};

export default LessonView;
