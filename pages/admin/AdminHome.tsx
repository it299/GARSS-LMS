import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../../types';
import { TotarService } from '../../services/totarService';
import { Users, DollarSign, BookOpen, Activity, ArrowUpRight } from 'lucide-react';

const AdminHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    TotarService.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div>جاري التحميل...</div>;

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon size={24} className={`text-${color.replace('bg-', '').replace('100', '600')}`} />
        </div>
        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {trend} <ArrowUpRight size={12} className="mr-1" />
        </span>
      </div>
      <h3 className="text-gray-500 font-bold text-sm mb-1">{title}</h3>
      <p className="text-3xl font-heading font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
            title="إجمالي المستخدمين" 
            value={stats.totalUsers} 
            icon={Users} 
            color="bg-blue-100" 
            trend="+12%"
        />
        <StatCard 
            title="الإيرادات الكلية" 
            value={`${stats.totalRevenue.toLocaleString()} ر.س`} 
            icon={DollarSign} 
            color="bg-green-100" 
            trend="+8%"
        />
        <StatCard 
            title="الدورات النشطة" 
            value={stats.totalCourses} 
            icon={BookOpen} 
            color="bg-purple-100" 
            trend="+2"
        />
        <StatCard 
            title="نشط الآن" 
            value={stats.activeNow} 
            icon={Activity} 
            color="bg-orange-100" 
            trend="+5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-6 font-heading text-lg">آخر عمليات التسجيل</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-100">
                            <th className="pb-3 font-normal">الطالب</th>
                            <th className="pb-3 font-normal">الدورة</th>
                            <th className="pb-3 font-normal">التاريخ</th>
                            <th className="pb-3 font-normal">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                    <span className="font-bold text-gray-700">مستخدم تجريبي {i}</span>
                                </td>
                                <td className="py-4 text-gray-600">أساسيات البرمجة</td>
                                <td className="py-4 text-gray-500">منذ ساعتين</td>
                                <td className="py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">مكتمل</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-800 mb-6 font-heading text-lg">إجراءات سريعة</h3>
             <div className="space-y-3">
                 <button className="w-full text-right p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-700 flex justify-between items-center group">
                     إضافة دورة جديدة
                     <span className="text-gray-400 group-hover:translate-x-1 transition-transform">←</span>
                 </button>
                 <button className="w-full text-right p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-700 flex justify-between items-center group">
                     مراجعة التقارير
                     <span className="text-gray-400 group-hover:translate-x-1 transition-transform">←</span>
                 </button>
                 <button className="w-full text-right p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-700 flex justify-between items-center group">
                     إرسال إشعار عام
                     <span className="text-gray-400 group-hover:translate-x-1 transition-transform">←</span>
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;