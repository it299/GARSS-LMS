import React from 'react';
import { User } from '../types';
import { Leaf, LogIn, LogOut, Menu, X, User as UserIcon, Settings, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout, onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const NavLink = ({ page, label, icon }: { page: string; label: string, icon?: React.ReactNode }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsOpen(false);
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-bold text-sm lg:text-base ${
        currentPage === page
          ? 'bg-gharas-100 text-gharas-700'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gharas-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-2" onClick={() => onNavigate('home')}>
            <div className="bg-gharas-500 p-2 rounded-2xl text-white shadow-lg rotate-3 hover:rotate-0 transition-transform">
              <Leaf size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-heading font-bold text-gray-800 tracking-tight">غرس</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink page="home" label="الرئيسية" />
            <NavLink page="courses" label="الدورات" />
            <NavLink page="paths" label="المسارات التعليمية" />
            <NavLink page="about" label="من نحن" />
            <NavLink page="contact" label="اتصل بنا" />
            {user && <NavLink page="dashboard" label="لوحتي" />}
            <NavLink page="tutor" label="المرشد الذكي" icon={<span className="text-lg">🤖</span>} />
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {user ? (
              <div className="relative">
                <div 
                    className="flex items-center gap-2 bg-gharas-50 px-2 py-1.5 rounded-full border border-gharas-200 cursor-pointer hover:bg-gharas-100 transition-colors" 
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                    <div className="text-xs hidden xl:block text-right">
                    <p className="font-bold text-gharas-800 leading-none">{user.name}</p>
                    <p className="text-gray-500 text-[10px]">ن نقاط: {user.points}</p>
                    </div>
                </div>

                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-fade-in">
                            <button onClick={() => { onNavigate('profile'); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <UserIcon size={16} /> الملف الشخصي
                            </button>
                            <button onClick={() => { onNavigate('settings'); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Settings size={16} /> الإعدادات
                            </button>
                            <div className="border-t border-gray-100"></div>
                            <button onClick={() => { onLogout(); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 font-bold">
                                <LogOut size={16} /> تسجيل خروج
                            </button>
                        </div>
                    </>
                )}
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 bg-gharas-600 hover:bg-gharas-700 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-gharas-200 transition-all transform hover:scale-105"
              >
                <LogIn size={16} />
                دخول / تسجيل
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gharas-600 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gharas-100 p-4 space-y-2 shadow-lg absolute w-full top-20 left-0 z-40">
          <NavLink page="home" label="الرئيسية" />
          <NavLink page="courses" label="جميع الدورات" />
          <NavLink page="paths" label="المسارات الشاملة" />
          <NavLink page="about" label="من نحن" />
          <NavLink page="contact" label="اتصل بنا" />
          {user && <NavLink page="dashboard" label="لوحة التحكم" />}
          <NavLink page="tutor" label="المرشد الذكي (AI)" />
          
          <div className="border-t border-gray-100 pt-3 mt-2">
             {user ? (
              <div className="space-y-2">
                 <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                   <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                   <div>
                       <span className="font-bold text-gray-700 block">{user.name}</span>
                       <span className="text-xs text-gray-500">{user.email}</span>
                   </div>
                </div>
                <button onClick={() => { onNavigate('profile'); setIsOpen(false); }} className="w-full text-right p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-bold flex items-center gap-2">
                    <UserIcon size={18} /> الملف الشخصي
                </button>
                <button onClick={() => { onNavigate('settings'); setIsOpen(false); }} className="w-full text-right p-3 rounded-xl hover:bg-gray-50 text-gray-600 font-bold flex items-center gap-2">
                    <Settings size={18} /> الإعدادات
                </button>
                <button onClick={onLogout} className="w-full text-right p-3 rounded-xl hover:bg-red-50 text-red-500 font-bold flex items-center gap-2">
                    <LogOut size={18} /> تسجيل خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLogin(); setIsOpen(false); }}
                className="w-full text-center bg-gharas-600 text-white py-3 rounded-xl font-bold"
              >
                تسجيل الدخول / إنشاء حساب
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;