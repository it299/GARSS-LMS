import React from 'react';
import { User } from '../types';
import { Leaf, LogIn, LogOut, Menu, X, User as UserIcon, Settings } from 'lucide-react';

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

  const NavLink = ({ page, label, icon, color = 'hover:text-gharas-600' }: { page: string; label: string, icon?: React.ReactNode, color?: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all font-bold text-base lg:text-lg border-2 border-transparent ${
        currentPage === page
          ? 'bg-kid-yellow text-gray-800 shadow-pop'
          : `text-gray-600 hover:bg-white hover:shadow-sm ${color}`
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <nav className="sticky top-4 z-50 px-4 mb-4">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-[2rem] shadow-xl border-4 border-white/50 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-2 group" onClick={() => onNavigate('home')}>
            <div className="bg-gharas-500 p-3 rounded-2xl text-white shadow-pop-colored text-gharas-500 group-hover:animate-wiggle transform -rotate-6">
              <Leaf size={28} strokeWidth={3} />
            </div>
            <span className="text-3xl font-heading font-black text-gharas-600 tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">غرس</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2">
            <NavLink page="home" label="الرئيسية" color="hover:text-kid-blue" />
            <NavLink page="courses" label="الدورات" color="hover:text-kid-purple" />
            <NavLink page="paths" label="المسارات" color="hover:text-kid-pink" />
            <NavLink page="tutor" label="المرشد الذكي" icon={<span className="text-xl animate-bounce">🤖</span>} />
            
            <div className="h-8 w-px bg-gray-200 mx-2 rounded-full"></div>

            {user ? (
              <div className="relative">
                <div 
                    className="flex items-center gap-3 bg-kid-bg px-3 py-2 rounded-full border-2 border-kid-blue cursor-pointer hover:bg-blue-50 transition-all hover:scale-105 shadow-sm" 
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-white" />
                    <div className="text-right hidden xl:block">
                        <p className="font-bold text-gray-800 leading-none text-sm">{user.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] bg-kid-yellow px-1.5 rounded-md font-bold text-gray-700">⭐ {user.points}</span>
                        </div>
                    </div>
                </div>

                {showDropdown && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)}></div>
                        <div className="absolute left-0 mt-4 w-56 bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden z-20 animate-float">
                            <div className="p-2 space-y-1">
                                <button onClick={() => { onNavigate('profile'); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm font-bold text-gray-700 hover:bg-kid-bg rounded-2xl flex items-center gap-2 transition-colors">
                                    <div className="bg-blue-100 p-1.5 rounded-lg text-blue-500"><UserIcon size={16} /></div> الملف الشخصي
                                </button>
                                <button onClick={() => { onNavigate('settings'); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm font-bold text-gray-700 hover:bg-kid-bg rounded-2xl flex items-center gap-2 transition-colors">
                                    <div className="bg-purple-100 p-1.5 rounded-lg text-purple-500"><Settings size={16} /></div> الإعدادات
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={() => { onLogout(); setShowDropdown(false); }} className="w-full text-right px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl flex items-center gap-2 transition-colors">
                                    <div className="bg-red-100 p-1.5 rounded-lg text-red-500"><LogOut size={16} /></div> خروج
                                </button>
                            </div>
                        </div>
                    </>
                )}
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 bg-kid-purple text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-pop-colored text-kid-purple hover:-translate-y-1 transition-transform border-2 border-transparent"
              >
                <LogIn size={20} strokeWidth={3} />
                دخول
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gharas-600 bg-gharas-50 p-3 rounded-2xl hover:bg-gharas-100 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden mt-4 bg-white/95 backdrop-blur-xl border-2 border-white rounded-[2rem] p-6 space-y-3 shadow-2xl relative z-40 mx-auto max-w-lg">
          <NavLink page="home" label="🏠 الرئيسية" />
          <NavLink page="courses" label="📚 الدورات" />
          <NavLink page="paths" label="🚀 المسارات" />
          <NavLink page="tutor" label="🤖 المرشد الذكي" />
          
          <div className="border-t-2 border-dashed border-gray-200 pt-4 mt-2">
             {user ? (
              <div className="space-y-3">
                 <div className="flex items-center gap-3 p-3 bg-kid-bg border-2 border-kid-blue rounded-2xl">
                   <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                   <div>
                       <span className="font-black text-gray-800 block text-lg">{user.name}</span>
                       <span className="text-sm font-bold text-kid-blue bg-white px-2 rounded-full inline-block mt-1">⭐ {user.points} نقطة</span>
                   </div>
                </div>
                <button onClick={() => { onNavigate('profile'); setIsOpen(false); }} className="w-full text-right p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center gap-3">
                    <UserIcon size={20} className="text-blue-500" /> الملف الشخصي
                </button>
                <button onClick={() => { onNavigate('settings'); setIsOpen(false); }} className="w-full text-right p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center gap-3">
                    <Settings size={20} className="text-purple-500" /> الإعدادات
                </button>
                <button onClick={onLogout} className="w-full text-right p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 font-bold flex items-center gap-3">
                    <LogOut size={20} /> خروج
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLogin(); setIsOpen(false); }}
                className="w-full text-center bg-kid-green text-white py-4 rounded-2xl font-black text-xl shadow-pop-colored text-kid-green hover:brightness-105"
              >
                ابدأ رحلتك الآن! 🚀
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;