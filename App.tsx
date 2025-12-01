
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AITutor from './components/AITutor';
import LessonView from './pages/LessonView';
import About from './pages/About';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCourses from './pages/admin/AdminCourses';
import AdminContent from './pages/admin/AdminContent';
import { User, Course } from './types';
import { TotarService } from './services/totarService';
import { Loader2 } from 'lucide-react';
import { translations, Language } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [detailCourseId, setDetailCourseId] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [lang, setLang] = useState<Language>('ar');

  // Update HTML dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Current translation object
  const t = translations[lang];

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentPage('admin_dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setSelectedCourse(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
      setUser(updatedUser);
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleCourseClick = (course: Course) => {
    if (user && user.enrolledCourseIds.includes(course.id)) {
        setSelectedCourse(course);
        setCurrentPage('lesson');
    } else {
        setDetailCourseId(course.id);
        setCurrentPage('courseDetail');
    }
  };

  const handleEnroll = async (course: Course) => {
    if (!user) {
        navigateTo('login');
        return;
    }
    setIsLoggingIn(true);
    await TotarService.enrollInCourse(course.id);
    const updatedUser = { ...user, enrolledCourseIds: [...user.enrolledCourseIds, course.id] };
    setUser(updatedUser);
    setIsLoggingIn(false);
    
    setSelectedCourse(course);
    setCurrentPage('lesson');
  };

  // --- ADMIN ROUTING ---
  if (user?.role === 'admin' && currentPage.startsWith('admin_')) {
      return (
          <AdminLayout user={user} onLogout={handleLogout} onNavigate={navigateTo} currentPage={currentPage}>
              {currentPage === 'admin_dashboard' && <AdminHome />}
              {currentPage === 'admin_users' && <AdminUsers />}
              {currentPage === 'admin_courses' && <AdminCourses />}
              {currentPage === 'admin_content' && <AdminContent />}
              {currentPage === 'admin_reports' && <div className="text-center py-20 text-gray-400">Under Construction...</div>}
          </AdminLayout>
      );
  }

  // --- PUBLIC ROUTING ---
  const renderContent = () => {
    if (isLoggingIn) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-50">
          <Loader2 size={48} className="text-gharas-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gray-700">{t.common.loading}</h2>
        </div>
      );
    }

    if (currentPage === 'lesson' && selectedCourse) {
      return <LessonView course={selectedCourse} onBack={() => navigateTo('dashboard')} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onStart={() => user ? navigateTo('dashboard') : navigateTo('login')} onBrowse={() => navigateTo('courses')} lang={lang} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'courses':
        return <Catalog type="courses" onSelectCourse={handleCourseClick} />;
      case 'paths':
        return <Catalog type="paths" onSelectCourse={handleCourseClick} />;
      case 'courseDetail':
        return <CourseDetail courseId={detailCourseId} onBack={() => navigateTo('courses')} onEnroll={handleEnroll} />;
      case 'login':
        return <Login onSuccess={handleLoginSuccess} onRegisterClick={() => navigateTo('register')} />;
      case 'register':
        return <Register onSuccess={handleLoginSuccess} onLoginClick={() => navigateTo('login')} />;
      case 'dashboard':
        return user ? (
            <Dashboard 
                user={user} 
                onSelectCourse={(c) => { setSelectedCourse(c); setCurrentPage('lesson'); }} 
            />
        ) : <Home onStart={() => navigateTo('login')} onBrowse={() => navigateTo('courses')} lang={lang} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleUpdateUser} /> : <Login onSuccess={handleLoginSuccess} onRegisterClick={() => navigateTo('register')} />;
      case 'settings':
        return user ? <Settings user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} /> : <Login onSuccess={handleLoginSuccess} onRegisterClick={() => navigateTo('register')} />;
      case 'tutor':
        return (
          <div className="py-12 px-4 bg-slate-50 min-h-screen">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">{t.nav.tutor}</h1>
                <p className="text-gray-500">Ask your AI companion anything!</p>
             </div>
             <AITutor user={user} />
          </div>
        );
      default:
        return <Home onStart={() => navigateTo('login')} onBrowse={() => navigateTo('courses')} lang={lang} />;
    }
  };

  const isAuthPage = currentPage === 'login' || currentPage === 'register';

  return (
    <div className={`min-h-screen flex flex-col font-sans ${lang === 'en' ? 'font-en' : ''}`}>
      {currentPage !== 'lesson' && !isAuthPage && (
        <Navbar 
          user={user} 
          onLogin={() => navigateTo('login')} 
          onLogout={handleLogout} 
          onNavigate={navigateTo}
          currentPage={currentPage}
          lang={lang}
          setLang={setLang}
        />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentPage !== 'lesson' && !isLoggingIn && !isAuthPage && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
