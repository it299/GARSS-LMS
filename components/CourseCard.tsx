import React from 'react';
import { Course } from '../types';
import { PlayCircle, Award, Star, Book, Layers } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isEnrolled = false }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className={`group bg-white rounded-3xl border-2 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full ${
        course.type === 'path' ? 'border-playful-purple/30 hover:border-playful-purple' : 'border-gray-100 hover:border-gharas-300'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
          {course.type === 'path' ? <Layers size={12} className="text-playful-purple" /> : <Book size={12} className="text-gharas-500" />}
          {course.category}
        </div>
        
        {!isEnrolled && (
          <div className="absolute bottom-4 left-4 bg-gharas-600 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-md">
            {course.price} ر.س
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-2">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500 font-bold">{course.rating || '4.5'}</span>
            <span className="text-gray-300 mx-1">|</span>
            <span className="text-xs text-gray-400">{course.level === 'mubtadi' ? 'مبتدئ' : course.level === 'mutawasit' ? 'متوسط' : 'متقدم'}</span>
        </div>

        <h3 className="text-xl font-heading font-bold text-gray-800 mb-2 group-hover:text-gharas-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-2">
          {course.description}
        </p>
        
        <div className="mt-auto">
          {isEnrolled ? (
            <>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-500">التقدم</span>
                <span className="text-sm font-bold text-gharas-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gharas-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </>
          ) : (
             <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                     {course.instructor && (
                         <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">بواسطة: {course.instructor}</span>
                     )}
                </div>
                <button className={`text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${course.type === 'path' ? 'text-playful-purple' : 'text-gharas-600'}`}>
                    التفاصيل <PlayCircle size={16} />
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;