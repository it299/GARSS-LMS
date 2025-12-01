
import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  Leaf, 
  PieChart, 
  Bell,
  Monitor
} from 'lucide-react';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout, onNavigate, currentPage, children }) => {
  // Define menu items with required permissions
  const menuItems = [
    { id: 'admin_dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, permission: null }, // Everyone sees dashboard
    { id: 'admin_users', label: 'إدارة المستخدمين', icon: Users, permission: 'manage_users' },
    { id: 'admin_courses', label: 'إدارة الدورات', icon: BookOpen, permission: 'manage_courses' },
    { id: 'admin_content', label: 'إدارة محتوى الموقع', icon: Monitor, permission: 'manage_content' },
    { id: 'admin_reports', label: 'التقارير المالية', icon: PieChart, permission: 'view_reports' },
  ];

  // Filter items based on user permissions
  const allowedMenuItems = menuItems.filter(item => {
      // Super admin has all permissions implicitly if permissions array is missing but role is admin
      if (!user.permissions) return true; 
      if (item.permission === null) return true;
      return user.permissions.includes(item.permission);
  });

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar (Right) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
           <div className="bg-gharas-500 p-2 rounded-xl text-white">
              <Leaf size={20} />
           </div>
           <div>
               <h1 className="text-xl font-heading font-bold">إدارة غرس</h1>
               <p className="text-xs text-slate-400">لوحة المسؤول</p>
           </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-2">
            {allowedMenuItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        currentPage === item.id 
                            ? 'bg-gharas-600 text-white shadow-lg' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    <item.icon size={20} />
                    <span className="font-bold">{item.label}</span>
                </button>
            ))}
            
            <div className="my-4 border-t border-slate-800"></div>

            <button
                onClick={() => onNavigate('home')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
                <Users size={20} />
                <span className="font-bold">واجهة الموقع</span>
            </button>
        </div>

        <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 mb-4 px-2">
                <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-slate-600" alt="Admin" />
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                </div>
            </div>
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-colors font-bold text-sm"
            >
                <LogOut size={16} /> تسجيل الخروج
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
                {menuItems.find(i => i.id === currentPage)?.label || 'لوحة التحكم'}
            </h2>
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button onClick={() => onNavigate('settings')} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                    <Settings size={20} />
                </button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
