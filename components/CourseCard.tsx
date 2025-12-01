import React from 'react';
import { Course } from '../types';
import { PlayCircle, Star, Book, Layers } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isEnrolled = false }) => {
  // Map categories to colors
  const getColor = (cat: string) => {
      switch(cat) {
          case 'برمجة': return 'border-kid-blue shadow-blue-200';
          case 'ذكاء اصطناعي': return 'border-kid-purple shadow-purple-200';
          case 'تصميم': return 'border-kid-pink shadow-pink-200';
          default: return 'border-gharas-400 shadow-green-200';
      }
  };

  const borderColor = getColor(course.category);

  return (
    <div 
      onClick={() => onClick(course)}
      className={`group bg-white rounded-[2.5rem] border-4 ${borderColor} overflow-hidden shadow-pop hover:shadow-pop-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full relative`}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden m-3 rounded-[2rem]">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-black text-gray-800 shadow-md flex items-center gap-2 border-2 border-gray-100">
          {course.type === 'path' ? <Layers size={16} className="text-kid-purple" /> : <Book size={16} className="text-kid-blue" />}
          {course.category}
        </div>
        
        {!isEnrolled && (
          <div className="absolute bottom-3 left-3 bg-kid-yellow text-gray-900 px-4 py-2 rounded-2xl text-lg font-black shadow-pop border-2 border-white transform rotate-2">
            {course.price} 💰
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 pt-2 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
            <div className="flex bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-700 font-black mr-1">{course.rating || '5.0'}</span>
            </div>
            <span className="text-sm font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                {course.level === 'mubtadi' ? '🐣 مبتدئ' : course.level === 'mutawasit' ? '🦁 متوسط' : '🚀 متقدم'}
            </span>
        </div>

        <h3 className="text-2xl font-heading font-black text-gray-800 mb-3 group-hover:text-gharas-600 transition-colors leading-tight">
          {course.title}
        </h3>
        
        {/* Progress Bar or Action */}
        <div className="mt-auto pt-4">
          {isEnrolled ? (
            <div className="bg-gray-50 p-3 rounded-2xl border-2 border-gray-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black text-gray-500">مستواك</span>
                <span className="text-sm font-black text-kid-green">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
                <div 
                  className="bg-gradient-to-r from-kid-green to-kid-lime h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${course.progress}%` }}
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                </div>
              </div>
            </div>
          ) : (
             <div className="flex items-center justify-between">
                <div className="flex -space-x-2 space-x-reverse overflow-hidden px-2">
                     {[1,2,3].map(i => (
                         <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.id}${i}`} alt="" />
                         </div>
                     ))}
                     <span className="text-xs font-bold text-gray-400 self-center mr-2">+100 طالب</span>
                </div>
                <button className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-pop transition-all group-hover:scale-110 ${course.type === 'path' ? 'bg-kid-purple border-purple-300 text-white' : 'bg-kid-blue border-blue-300 text-white'}`}>
                    <PlayCircle size={28} fill="currentColor" className="text-white/20" />
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;