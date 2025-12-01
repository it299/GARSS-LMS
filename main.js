/**
 * Gharas Platform - Core Logic
 * Uses jQuery for DOM manipulation and LocalStorage for data persistence.
 */

// --- Initial Data (Seeding) ---
const INITIAL_COURSES = [
    {
        id: 'c1',
        title: 'المبرمج الصغير (Scratch)',
        description: 'اصنع ألعابك وقصصك التفاعلية بنفسك باستخدام المكعبات البرمجية.',
        price: 250,
        category: 'برمجة',
        level: 'مبتدئ',
        image: 'https://picsum.photos/seed/scratch/400/250',
        modules: [
            {
                id: 'm1',
                title: 'مقدمة في عالم سكراتش',
                lessons: [
                    { id: 'l1', title: 'تحميل البرنامج والواجهة', type: 'video', content: 'https://www.youtube.com/watch?v=kMTeZAAJ-5o', completed: false },
                    { id: 'l2', title: 'حرك القط', type: 'reading', content: 'استخدم لبنة "تحرك 10 خطوات" لجعل القط يتحرك.', completed: false }
                ]
            }
        ]
    },
    {
        id: 'c2',
        title: 'أساسيات بايثون للأطفال',
        description: 'لغة المستقبل! تعلم كتابة الأكواد الحقيقية بأسلوب مبسط.',
        price: 300,
        category: 'برمجة',
        level: 'متوسط',
        image: 'https://picsum.photos/seed/python/400/250',
        modules: []
    }
];

const INITIAL_USERS = [
    {
        id: 'admin',
        name: 'مدير النظام',
        email: 'admin@gharas.sa',
        password: '123',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        permissions: ['manage_users', 'manage_courses', 'manage_content']
    },
    {
        id: 'user1',
        name: 'أحمد البطل',
        email: 'student@gharas.sa',
        password: '123',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
        points: 150,
        enrolledCourses: ['c1']
    }
];

// --- State Management ---
const DB = {
    getUsers: () => JSON.parse(localStorage.getItem('gharas_users')) || INITIAL_USERS,
    setUsers: (users) => localStorage.setItem('gharas_users', JSON.stringify(users)),
    getCourses: () => JSON.parse(localStorage.getItem('gharas_courses')) || INITIAL_COURSES,
    setCourses: (courses) => localStorage.setItem('gharas_courses', JSON.stringify(courses)),
    getCurrentUser: () => JSON.parse(localStorage.getItem('gharas_current_user')),
    setCurrentUser: (user) => {
        if(user) localStorage.setItem('gharas_current_user', JSON.stringify(user));
        else localStorage.removeItem('gharas_current_user');
    }
};

// Initialize DB if empty
if (!localStorage.getItem('gharas_users')) DB.setUsers(INITIAL_USERS);
if (!localStorage.getItem('gharas_courses')) DB.setCourses(INITIAL_COURSES);

// --- Router & UI ---
$(document).ready(function() {
    // Load Icons
    lucide.createIcons();

    // Check Auth State
    checkAuth();

    // Navigation Click Handler
    $('.nav-link-custom').on('click', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        navigateTo(page);
    });

    // Login Form
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        
        const users = DB.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            DB.setCurrentUser(user);
            checkAuth();
            navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'dashboard');
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        } else {
            alert('بيانات الدخول غير صحيحة!');
        }
    });

    // Logout
    $('#logoutBtn, #adminLogoutBtn').on('click', function() {
        DB.setCurrentUser(null);
        checkAuth();
        navigateTo('home');
    });

    // Admin: Add User
    $('#saveUserBtn').on('click', function() {
        const name = $('#userName').val();
        const email = $('#userEmail').val();
        const password = $('#userPassword').val();
        const role = $('#userRole').val();

        if(name && email && password) {
            const users = DB.getUsers();
            users.push({
                id: 'u' + Date.now(),
                name, email, password, role,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                points: 0,
                enrolledCourses: []
            });
            DB.setUsers(users);
            renderAdminUsers();
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
        }
    });

    // Admin: Add Course
    $('#saveCourseBtn').on('click', function() {
        const title = $('#courseTitle').val();
        const price = $('#coursePrice').val();
        const cat = $('#courseCategory').val();
        
        if(title) {
            const courses = DB.getCourses();
            courses.push({
                id: 'c' + Date.now(),
                title,
                description: 'تمت إضافتها حديثاً',
                price: price || 0,
                category: cat,
                image: `https://picsum.photos/seed/${title}/400/250`,
                modules: []
            });
            DB.setCourses(courses);
            renderAdminCourses();
            bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
        }
    });
});

// --- Functions ---

function navigateTo(pageId) {
    $('.page-section').removeClass('active');
    $('#' + pageId).addClass('active');
    window.scrollTo(0,0);

    // Dynamic Renders based on page
    if (pageId === 'courses') renderPublicCourses();
    if (pageId === 'dashboard') renderDashboard();
    if (pageId === 'admin-users') renderAdminUsers();
    if (pageId === 'admin-courses') renderAdminCourses();
}

function checkAuth() {
    const user = DB.getCurrentUser();
    if (user) {
        $('.auth-guest').hide();
        $('.auth-user').css('display', 'flex');
        $('#userNameDisplay').text(user.name);
        $('#userAvatarDisplay').attr('src', user.avatar);
        
        if(user.role === 'admin') {
            $('.admin-only').show();
            $('#adminLink').show();
        } else {
            $('.admin-only').hide();
            $('#adminLink').hide();
        }
    } else {
        $('.auth-guest').show();
        $('.auth-user').hide();
        $('.admin-only').hide();
    }
}

// Render Public Courses Catalog
function renderPublicCourses() {
    const courses = DB.getCourses();
    const container = $('#coursesGrid');
    container.empty();

    courses.forEach(c => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="bg-white rounded-[2rem] border-4 border-gray-100 overflow-hidden shadow-pop hover-bounce cursor-pointer h-100 flex flex-col" onclick="showCourseDetail('${c.id}')">
                    <img src="${c.image}" class="h-48 w-full object-cover">
                    <div class="p-5 flex-1 flex flex-col">
                        <div class="flex justify-between items-center mb-2">
                            <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold">${c.category}</span>
                            <span class="text-gray-400 text-xs font-bold">${c.level || 'مبتدئ'}</span>
                        </div>
                        <h3 class="font-bold text-xl mb-2 text-gray-800">${c.title}</h3>
                        <p class="text-gray-500 text-sm mb-4 line-clamp-2">${c.description}</p>
                        <div class="mt-auto flex justify-between items-center">
                            <span class="text-green-600 font-black text-lg">${c.price} ر.س</span>
                            <button class="bg-gharas-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                <i data-lucide="arrow-left" width="16"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(card);
    });
    lucide.createIcons();
}

// Show Course Detail (Sales Page)
function showCourseDetail(courseId) {
    const course = DB.getCourses().find(c => c.id === courseId);
    if(!course) return;

    // Populate detail view
    const detailHtml = `
        <div class="container py-5">
            <button class="btn btn-light mb-4 font-bold" onclick="navigateTo('courses')">عودة للكتالوج</button>
            <div class="row">
                <div class="col-lg-8">
                    <img src="${course.image}" class="w-100 rounded-[2rem] mb-4 shadow-sm border-4 border-white">
                    <h1 class="font-heading font-bold mb-3">${course.title}</h1>
                    <p class="text-lg text-gray-600 mb-5 leading-loose">${course.description}</p>
                    
                    <div class="bg-white p-5 rounded-3xl border border-gray-100">
                        <h3 class="font-bold mb-4">محتوى الدورة</h3>
                        ${course.modules.length > 0 ? course.modules.map(m => `
                            <div class="border-b border-gray-100 py-3">
                                <h5 class="font-bold text-gray-800">${m.title}</h5>
                                <span class="text-xs text-gray-400">${m.lessons.length} دروس</span>
                            </div>
                        `).join('') : '<p class="text-gray-400">لا يوجد محتوى مضاف بعد.</p>'}
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="bg-white p-6 rounded-3xl shadow-pop border border-gray-100 sticky-top" style="top: 100px;">
                        <div class="text-3xl font-black text-gharas-600 mb-4 text-center">${course.price} ر.س</div>
                        <button onclick="enrollCourse('${course.id}')" class="btn btn-success w-100 py-3 rounded-xl font-bold text-lg shadow-sm">اشترك الآن 🚀</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Inject into a container (reuse dashboard container or create specific)
    $('#courseDetailContent').html(detailHtml);
    navigateTo('course-detail');
}

function enrollCourse(courseId) {
    const user = DB.getCurrentUser();
    if (!user) {
        new bootstrap.Modal(document.getElementById('loginModal')).show();
        return;
    }
    
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        
        // Update both local storage objects
        DB.setCurrentUser(user);
        const allUsers = DB.getUsers();
        const idx = allUsers.findIndex(u => u.id === user.id);
        if(idx !== -1) {
            allUsers[idx] = user;
            DB.setUsers(allUsers);
        }
        alert('تم الاشتراك بنجاح! 🎉');
        navigateTo('dashboard');
    } else {
        alert('أنت مشترك بالفعل!');
        navigateTo('dashboard');
    }
}

// Render Student Dashboard
function renderDashboard() {
    const user = DB.getCurrentUser();
    const allCourses = DB.getCourses();
    const myCourses = allCourses.filter(c => user.enrolledCourses && user.enrolledCourses.includes(c.id));

    $('#dashboardStats').html(`
        <div class="col-md-4">
            <div class="bg-white p-4 rounded-3xl border-4 border-yellow-300 shadow-sm text-center">
                <span class="block text-3xl mb-2">⭐</span>
                <h3 class="font-black text-2xl text-gray-800">${user.points || 0}</h3>
                <p class="text-gray-400 font-bold text-sm">نقاطي</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="bg-white p-4 rounded-3xl border-4 border-green-300 shadow-sm text-center">
                <span class="block text-3xl mb-2">📚</span>
                <h3 class="font-black text-2xl text-gray-800">${myCourses.length}</h3>
                <p class="text-gray-400 font-bold text-sm">دوراتي</p>
            </div>
        </div>
    `);

    const list = $('#myCoursesList');
    list.empty();

    if (myCourses.length === 0) {
        list.html('<div class="text-center py-5 w-100"><p class="font-bold text-gray-400">لسه ما سجلت في أي دورة 😢</p><button class="btn btn-primary rounded-xl mt-3 font-bold" onclick="navigateTo(\'courses\')">تصفح الدورات</button></div>');
    } else {
        myCourses.forEach(c => {
            list.append(`
                <div class="col-md-6 mb-4">
                    <div class="bg-white p-4 rounded-3xl border-2 border-gray-100 flex gap-4 items-center cursor-pointer hover:bg-blue-50 transition-colors" onclick="openClassroom('${c.id}')">
                        <img src="${c.image}" class="w-24 h-24 rounded-2xl object-cover">
                        <div>
                            <h4 class="font-bold text-lg text-gray-800">${c.title}</h4>
                            <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">نشط الآن</span>
                        </div>
                        <div class="mr-auto">
                            <button class="bg-gharas-500 text-white p-2 rounded-full"><i data-lucide="play" width="20"></i></button>
                        </div>
                    </div>
                </div>
            `);
        });
    }
    lucide.createIcons();
}

// Classroom Logic
let currentClassroomCourse = null;
let currentLesson = null;

function openClassroom(courseId) {
    currentClassroomCourse = DB.getCourses().find(c => c.id === courseId);
    if(!currentClassroomCourse) return;
    
    // Default to first lesson
    const firstModule = currentClassroomCourse.modules[0];
    if(firstModule && firstModule.lessons.length > 0) {
        loadLesson(firstModule.lessons[0]);
    }

    renderClassroomSidebar();
    navigateTo('classroom');
}

function renderClassroomSidebar() {
    const list = $('#lessonList');
    list.empty();
    
    $('#classroomTitle').text(currentClassroomCourse.title);

    currentClassroomCourse.modules.forEach(m => {
        let html = `<div class="mb-3"><h6 class="text-xs font-bold text-gray-400 px-2 mb-2">${m.title}</h6>`;
        m.lessons.forEach(l => {
            html += `
                <button onclick='loadLesson(${JSON.stringify(l)})' class="w-100 text-right p-3 rounded-xl mb-1 text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors ${currentLesson && currentLesson.id === l.id ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white text-gray-600'}">
                    <i data-lucide="${l.type === 'video' ? 'play-circle' : 'file-text'}" width="16"></i>
                    ${l.title}
                </button>
            `;
        });
        html += `</div>`;
        list.append(html);
    });
    lucide.createIcons();
}

window.loadLesson = function(lesson) {
    currentLesson = lesson;
    renderClassroomSidebar(); // To update active state
    
    const container = $('#lessonContentArea');
    
    if (lesson.type === 'video') {
        const videoId = getYouTubeId(lesson.content);
        if (videoId) {
            container.html(`
                <div class="video-container shadow-lg">
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="p-4 bg-white mt-4 rounded-2xl">
                    <h2 class="font-bold text-2xl">${lesson.title}</h2>
                </div>
            `);
        } else {
            container.html(`<div class="p-10 text-center"><p class="text-red-500 font-bold">رابط الفيديو غير صالح</p></div>`);
        }
    } else {
        container.html(`
            <div class="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-h-[400px]">
                <h2 class="font-heading font-black text-3xl mb-6 text-gharas-600">${lesson.title}</h2>
                <div class="text-lg leading-loose text-gray-700 font-medium">
                    ${lesson.content}
                </div>
            </div>
        `);
    }
};

function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// --- Admin Functions ---
function renderAdminUsers() {
    const users = DB.getUsers();
    const tbody = $('#adminUsersTable');
    tbody.empty();
    
    users.forEach(u => {
        tbody.append(`
            <tr class="align-middle">
                <td><span class="font-bold">${u.name}</span><br><span class="text-xs text-gray-400">${u.email}</span></td>
                <td>
                    ${u.role === 'admin' 
                        ? '<span class="badge bg-purple-100 text-purple-600">مدير</span>' 
                        : '<span class="badge bg-gray-100 text-gray-600">طالب</span>'}
                </td>
                <td>
                    <button class="btn btn-sm btn-light text-red-500" onclick="deleteUser('${u.id}')"><i data-lucide="trash-2" width="16"></i></button>
                </td>
            </tr>
        `);
    });
    lucide.createIcons();
}

window.deleteUser = function(id) {
    if(confirm('حذف المستخدم؟')) {
        const users = DB.getUsers().filter(u => u.id !== id);
        DB.setUsers(users);
        renderAdminUsers();
    }
};

function renderAdminCourses() {
    const courses = DB.getCourses();
    const container = $('#adminCoursesGrid');
    container.empty();
    
    courses.forEach(c => {
        container.append(`
             <div class="col-md-6 mb-4">
                <div class="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4">
                    <img src="${c.image}" class="w-20 h-20 rounded-xl object-cover">
                    <div class="flex-1">
                        <h5 class="font-bold text-gray-800">${c.title}</h5>
                        <p class="text-xs text-gray-400 mb-2">${c.category} • ${c.price} ر.س</p>
                        <button class="btn btn-sm btn-outline-primary rounded-lg font-bold" onclick="manageCourseContent('${c.id}')">إدارة المحتوى</button>
                         <button class="btn btn-sm btn-light text-red-500 rounded-lg" onclick="deleteCourse('${c.id}')"><i data-lucide="trash-2" width="16"></i></button>
                    </div>
                </div>
             </div>
        `);
    });
    lucide.createIcons();
}

window.manageCourseContent = function(id) {
    // Simplified content manager alert for this demo
    const course = DB.getCourses().find(c => c.id === id);
    const newLessonTitle = prompt(`إضافة درس جديد لـ ${course.title}:\nأدخل عنوان الدرس:`);
    if(newLessonTitle) {
        const url = prompt("أدخل رابط فيديو يوتيوب:");
        if(url) {
            if(!course.modules[0]) course.modules.push({id: 'm1', title: 'الوحدة الأولى', lessons: []});
            course.modules[0].lessons.push({
                id: 'l'+Date.now(),
                title: newLessonTitle,
                type: 'video',
                content: url,
                completed: false
            });
            // Update DB
            const allCourses = DB.getCourses();
            const idx = allCourses.findIndex(c => c.id === id);
            allCourses[idx] = course;
            DB.setCourses(allCourses);
            alert('تمت إضافة الدرس بنجاح! تحقق من صفحة الطالب.');
        }
    }
};

window.deleteCourse = function(id) {
    if(confirm('حذف الدورة؟')) {
        const courses = DB.getCourses().filter(c => c.id !== id);
        DB.setCourses(courses);
        renderAdminCourses();
    }
};
