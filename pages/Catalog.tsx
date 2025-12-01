import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { TotarService } from '../services/totarService';
import CourseCard from '../components/CourseCard';
import { Search, Filter, Layers, Book } from 'lucide-react';

interface CatalogProps {
  type: 'all' | 'courses' | 'paths';
  onSelectCourse: (course: Course) => void;
}

const Catalog: React.FC<CatalogProps> = ({ type, onSelectCourse }) => {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allData = await TotarService.getAllCoursesAndPaths();
      let filteredData = allData;
      
      if (type === 'courses') {
        filteredData = allData.filter(c => c.type === 'course');
      } else if (type === 'paths') {
        filteredData = allData.filter(c => c.type === 'path');
      }
      
      setItems(filteredData);
      setLoading(false);
    };
    fetchData();
  }, [type]);

  const displayedItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.includes(search) || item.description.includes(search);
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
                {type === 'paths' ? 'المسارات التعليمية الشاملة' : 'اكتشف دوراتنا المتميزة'}
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                {type === 'paths' 
                    ? 'حزم تعليمية متكاملة تأخذ بيدك من البداية وحتى الاحتراف، بتكلفة أقل وشهادة أكبر.' 
                    : 'مجموعة واسعة من الدورات في البرمجة، العلوم، والفنون مصممة خصيصاً للأطفال.'}
            </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-gharas-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                    الكل
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === cat ? 'bg-gharas-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-80">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="ابحث عن دورة..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl py-3 pr-10 pl-4 focus:ring-2 focus:ring-gharas-400 outline-none"
                />
            </div>
        </div>

        {/* Grid */}
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-3xl"></div>
                ))}
            </div>
        ) : displayedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedItems.map(item => (
                    <CourseCard key={item.id} course={item} onClick={onSelectCourse} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-400">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p>لا توجد نتائج مطابقة لبحثك.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;