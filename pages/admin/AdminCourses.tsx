
import React, { useEffect, useState } from 'react';
import { Course, Module, Lesson } from '../../types';
import { TotarService } from '../../services/totarService';
import { Search, Plus, Edit, Trash2, Image, DollarSign, Layers, FileText, Video, X, ChevronDown, Check } from 'lucide-react';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Current Course being edited
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  // Form State for New Course
  const [formData, setFormData] = useState<Partial<Course>>({
      title: '', description: '', price: 0, category: 'برمجة', level: 'mubtadi', type: 'course', image: 'https://picsum.photos/400/250'
  });

  // State for Lesson creation
  const [newLessonData, setNewLessonData] = useState({ title: '', type: 'video', content: '', duration: '10 د' });
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const fetchCourses = async () => {
    const data = await TotarService.getAllCoursesAndPaths();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
      if(window.confirm('حذف هذه الدورة سيخفيها من الموقع. هل أنت متأكد؟')) {
          await TotarService.deleteCourse(id);
          fetchCourses();
      }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const newCourse: Course = {
          ...formData as Course,
          id: 'c' + Date.now(),
          modules: [],
          progress: 0,
          color: 'bg-gray-100',
          status: 'published'
      };
      await TotarService.createCourse(newCourse);
      setIsModalOpen(false);
      setLoading(false);
      fetchCourses();
      setFormData({ title: '', description: '', price: 0, category: 'برمجة', level: 'mubtadi', type: 'course', image: 'https://picsum.photos/400/250' });
  };

  // --- CONTENT MANAGEMENT FUNCTIONS ---
  const openContentManager = (course: Course) => {
      setCurrentCourse(JSON.parse(JSON.stringify(course))); // Deep copy
      setIsContentModalOpen(true);
  };

  const addModule = () => {
      if (!currentCourse) return;
      const newModule: Module = {
          id: 'm' + Date.now(),
          title: 'وحدة جديدة',
          lessons: []
      };
      setCurrentCourse({
          ...currentCourse,
          modules: [...currentCourse.modules, newModule]
      });
  };

  const deleteModule = (moduleId: string) => {
      if (!currentCourse) return;
      setCurrentCourse({
          ...currentCourse,
          modules: currentCourse.modules.filter(m => m.id !== moduleId)
      });
  };

  const addLesson = (moduleId: string) => {
      if (!currentCourse) return;
      const newLesson: Lesson = {
          id: 'l' + Date.now(),
          title: newLessonData.title || 'درس جديد',
          type: newLessonData.type as any,
          content: newLessonData.content || '#',
          duration: newLessonData.duration,
          completed: false
      };
      
      const updatedModules = currentCourse.modules.map(m => {
          if (m.id === moduleId) {
              return { ...m, lessons: [...m.lessons, newLesson] };
          }
          return m;
      });

      setCurrentCourse({ ...currentCourse, modules: updatedModules });
      setNewLessonData({ title: '', type: 'video', content: '', duration: '10 د' });
      setActiveModuleId(null);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
      if (!currentCourse) return;
      const updatedModules = currentCourse.modules.map(m => {
          if (m.id === moduleId) {
              return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
          }
          return m;
      });
      setCurrentCourse({ ...currentCourse, modules: updatedModules });
  };

  const saveContentChanges = async () => {
      if (!currentCourse) return;
      setLoading(true);
      await TotarService.updateCourse(currentCourse);
      setIsContentModalOpen(false);
      setLoading(false);
      fetchCourses();
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 font-heading">إدارة الدورات والمسارات</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gharas-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-gharas-700 transition-colors"
          >
              <Plus size={20} /> إضافة دورة جديدة
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="h-40 relative">
                      <img src={course.image} className="w-full h-full object-cover" alt="" />
                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                          {course.category}
                      </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-800 mb-2 font-heading">{course.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
                      
                      <button 
                        onClick={() => openContentManager(course)}
                        className="w-full mb-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 flex items-center justify-center gap-2"
                      >
                          <Layers size={16} /> إدارة المحتوى والدروس
                      </button>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="font-bold text-gharas-600">{course.price} ر.س</span>
                          <div className="flex gap-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg">
                                  <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(course.id)}
                                className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"
                              >
                                  <Trash2 size={16} />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Add Metadata Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">إضافة دورة جديدة</h2>
                  <form onSubmit={handleSaveCourse} className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">عنوان الدورة</label>
                          <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gharas-500 outline-none" placeholder="مثال: مقدمة في بايثون" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">السعر (ر.س)</label>
                            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gharas-500 outline-none" placeholder="0" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">التصنيف</label>
                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gharas-500 outline-none">
                                <option value="برمجة">برمجة</option>
                                <option value="ذكاء اصطناعي">ذكاء اصطناعي</option>
                                <option value="تصميم">تصميم</option>
                                <option value="علوم">علوم</option>
                            </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الوصف المختصر</label>
                          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gharas-500 outline-none" placeholder="وصف يجذب الطلاب..." />
                      </div>

                      <div className="flex gap-3 pt-4">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200">إلغاء</button>
                          <button type="submit" disabled={loading} className="flex-1 py-3 font-bold text-white bg-gharas-600 rounded-xl hover:bg-gharas-700">{loading ? 'جاري الحفظ...' : 'حفظ الدورة'}</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* CONTENT MANAGEMENT MODAL */}
      {isContentModalOpen && currentCourse && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-3xl">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">إدارة محتوى: {currentCourse.title}</h2>
                        <p className="text-sm text-gray-500">قم بإضافة الوحدات والدروس وروابط الفيديو هنا.</p>
                      </div>
                      <button onClick={() => setIsContentModalOpen(false)} className="text-gray-400 hover:text-red-500"><X /></button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                      <div className="space-y-6">
                          {currentCourse.modules.map((module) => (
                              <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                  <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                      <input 
                                        value={module.title}
                                        onChange={(e) => {
                                            const updated = currentCourse.modules.map(m => m.id === module.id ? {...m, title: e.target.value} : m);
                                            setCurrentCourse({...currentCourse, modules: updated});
                                        }}
                                        className="bg-transparent font-bold text-gray-800 border-none outline-none focus:ring-0 w-1/2"
                                      />
                                      <div className="flex items-center gap-2">
                                         <button 
                                            onClick={() => deleteModule(module.id)}
                                            className="text-red-400 hover:bg-red-50 p-1 rounded"
                                         >
                                             <Trash2 size={16} />
                                         </button>
                                      </div>
                                  </div>
                                  
                                  <div className="p-4 space-y-2">
                                      {module.lessons.map(lesson => (
                                          <div key={lesson.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 group">
                                              {lesson.type === 'video' ? <Video size={16} className="text-blue-500" /> : <FileText size={16} className="text-orange-500" />}
                                              <div className="flex-1">
                                                  <p className="font-bold text-sm text-gray-700">{lesson.title}</p>
                                                  <p className="text-xs text-gray-400 truncate max-w-[200px] dir-ltr text-left">{lesson.content}</p>
                                              </div>
                                              <button 
                                                onClick={() => deleteLesson(module.id, lesson.id)}
                                                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                              >
                                                  <X size={16} />
                                              </button>
                                          </div>
                                      ))}

                                      {/* Add Lesson Form */}
                                      {activeModuleId === module.id ? (
                                          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-fade-in">
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                  <input 
                                                    placeholder="عنوان الدرس" 
                                                    value={newLessonData.title}
                                                    onChange={e => setNewLessonData({...newLessonData, title: e.target.value})}
                                                    className="p-2 rounded-lg border border-blue-200 outline-none text-sm"
                                                  />
                                                  <select 
                                                    value={newLessonData.type}
                                                    onChange={e => setNewLessonData({...newLessonData, type: e.target.value})}
                                                    className="p-2 rounded-lg border border-blue-200 outline-none text-sm"
                                                  >
                                                      <option value="video">فيديو (YouTube/MP4)</option>
                                                      <option value="reading">قراءة</option>
                                                  </select>
                                              </div>
                                              <input 
                                                placeholder={newLessonData.type === 'video' ? "رابط الفيديو (YouTube Link)" : "محتوى النص"}
                                                value={newLessonData.content}
                                                onChange={e => setNewLessonData({...newLessonData, content: e.target.value})}
                                                className="w-full p-2 rounded-lg border border-blue-200 outline-none text-sm mb-3 dir-ltr"
                                              />
                                              <div className="flex gap-2">
                                                  <button onClick={() => addLesson(module.id)} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700">إضافة</button>
                                                  <button onClick={() => setActiveModuleId(null)} className="text-gray-500 px-4 py-1.5 text-sm font-bold hover:bg-gray-200 rounded-lg">إلغاء</button>
                                              </div>
                                          </div>
                                      ) : (
                                          <button 
                                            onClick={() => setActiveModuleId(module.id)}
                                            className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm font-bold hover:bg-gray-50 hover:border-gray-400 flex items-center justify-center gap-2"
                                          >
                                              <Plus size={16} /> إضافة درس جديد
                                          </button>
                                      )}
                                  </div>
                              </div>
                          ))}

                          <button 
                            onClick={addModule}
                            className="w-full py-4 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gharas-400 flex items-center justify-center gap-2 transition-all"
                          >
                              <Plus size={20} /> إضافة وحدة جديدة
                          </button>
                      </div>
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-white rounded-b-3xl flex justify-end gap-3">
                      <button onClick={() => setIsContentModalOpen(false)} className="px-6 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200">إلغاء</button>
                      <button 
                        onClick={saveContentChanges}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-gharas-600 text-white font-bold hover:bg-gharas-700 shadow-lg flex items-center gap-2"
                      >
                          {loading ? 'جاري الحفظ...' : <><Check size={20} /> حفظ التغييرات</>}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminCourses;
