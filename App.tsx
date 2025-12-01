
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [detailCourseId, setDetailCourseId] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Called when user successfully logs in from Login Page
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

  // When clicking a card in Catalog or Dashboard
  const handleCourseClick = (course: Course) => {
    // If user is enrolled, go to Lesson view
    if (user && user.enrolledCourseIds.includes(course.id)) {
        setSelectedCourse(course);
        setCurrentPage('lesson');
    } else {
        // Otherwise go to Sales Page (Detail)
        setDetailCourseId(course.id);
        setCurrentPage('courseDetail');
    }
  };

  const handleEnroll = async (course: Course) => {
    if (!user) {
        navigateTo('login');
        return;
    }
    // Simulate enrollment
    setIsLoggingIn(true);
    await TotarService.enrollInCourse(course.id);
    // Refresh user data mock
    const updatedUser = { ...user, enrolledCourseIds: [...user.enrolledCourseIds, course.id] };
    setUser(updatedUser);
    setIsLoggingIn(false);
    
    // Go to lesson
    setSelectedCourse(course);
    setCurrentPage('lesson');
  };

  // --- ADMIN ROUTING CHECK ---
  if (user?.role === 'admin' && currentPage.startsWith('admin_')) {
      return (
          <AdminLayout user={user} onLogout={handleLogout} onNavigate={navigateTo} currentPage={currentPage}>
              {currentPage === 'admin_dashboard' && <AdminHome />}
              {currentPage === 'admin_users' && <AdminUsers />}
              {currentPage === 'admin_courses' && <AdminCourses />}
              {currentPage === 'admin_content' && <AdminContent />}
              {currentPage === 'admin_reports' && <div className="text-center py-20 text-gray-400">صفحة التقارير قيد التطوير...</div>}
          </AdminLayout>
      );
  }

  // --- STUDENT / PUBLIC ROUTING ---
  const renderContent = () => {
    if (isLoggingIn) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-50">
          <Loader2 size={48} className="text-gharas-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gray-700">جاري المعالجة...</h2>
        </div>
      );
    }

    if (currentPage === 'lesson' && selectedCourse) {
      return <LessonView course={selectedCourse} onBack={() => navigateTo('dashboard')} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onStart={() => user ? navigateTo('dashboard') : navigateTo('login')} onBrowse={() => navigateTo('courses')} />;
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
        ) : <Home onStart={() => navigateTo('login')} onBrowse={() => navigateTo('courses')} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleUpdateUser} /> : <Login onSuccess={handleLoginSuccess} onRegisterClick={() => navigateTo('register')} />;
      case 'settings':
        return user ? <Settings user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} /> : <Login onSuccess={handleLoginSuccess} onRegisterClick={() => navigateTo('register')} />;
      case 'tutor':
        return (
          <div className="py-12 px-4 bg-slate-50 min-h-screen">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-gray-800 mb-2">اسأل معلمك الذكي</h1>
                <p className="text-gray-500">هل واجهت صعوبة في درس؟ غرس هنا للمساعدة!</p>
             </div>
             <AITutor user={user} />
          </div>
        );
      default:
        // If logged in as admin but trying to access non-admin page, let them (frontend view)
        return <Home onStart={() => navigateTo('login')} onBrowse={() => navigateTo('courses')} />;
    }
  };

  const isAuthPage = currentPage === 'login' || currentPage === 'register';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {currentPage !== 'lesson' && !isAuthPage && (
        <Navbar 
          user={user} 
          onLogin={() => navigateTo('login')} 
          onLogout={handleLogout} 
          onNavigate={navigateTo}
          currentPage={currentPage}
        />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer - Only show on main pages */}
      {currentPage !== 'lesson' && !isLoggingIn && !isAuthPage && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
