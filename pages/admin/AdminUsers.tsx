
import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { TotarService } from '../../services/totarService';
import { Search, Trash2, Edit, MoreVertical, Shield, User as UserIcon, Plus, X, CheckSquare, Square, Check } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ 
      name: '', 
      email: '', 
      password: '', 
      role: 'student' as 'student' | 'admin',
      permissions: [] as string[]
  });

  const availablePermissions = [
      { id: 'manage_users', label: 'إدارة المستخدمين', desc: 'إضافة، تعديل، وحذف الحسابات' },
      { id: 'manage_courses', label: 'إدارة الدورات', desc: 'إنشاء وتعديل الدورات والمسارات' },
      { id: 'manage_content', label: 'إدارة المحتوى', desc: 'تعديل نصوص الصفحة الرئيسية والصور' },
      { id: 'view_reports', label: 'التقارير المالية', desc: 'الاطلاع على الإيرادات والإحصائيات' },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    const data = await TotarService.getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
      if(window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
          await TotarService.deleteUser(id);
          fetchUsers();
      }
  };

  const handleCreate = async (e: React.FormEvent) => {
      e.preventDefault();
      await TotarService.createUser(formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'student', permissions: [] });
      fetchUsers();
  };

  const togglePermission = (permId: string) => {
      setFormData(prev => {
          if (prev.permissions.includes(permId)) {
              return { ...prev, permissions: prev.permissions.filter(p => p !== permId) };
          } else {
              return { ...prev, permissions: [...prev.permissions, permId] };
          }
      });
  };

  const filteredUsers = users.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 font-heading">إدارة المستخدمين</h1>
          <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="بحث..." 
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gharas-500 outline-none"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gharas-600 text-white px-4 py-3 rounded-xl font-bold shadow-md hover:bg-gharas-700 flex items-center gap-2 whitespace-nowrap"
              >
                  <Plus size={20} /> مستخدم جديد
              </button>
          </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                      <tr>
                          <th className="px-6 py-4">المستخدم</th>
                          <th className="px-6 py-4">الدور</th>
                          <th className="px-6 py-4">الصلاحيات</th>
                          <th className="px-6 py-4">تاريخ الانضمام</th>
                          <th className="px-6 py-4">الإجراءات</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-white shadow-sm" />
                                      <div>
                                          <p className="font-bold text-gray-800">{user.name}</p>
                                          <p className="text-xs text-gray-500">{user.email}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  {user.role === 'admin' ? (
                                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                                          <Shield size={12} /> مدير
                                      </span>
                                  ) : (
                                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                          <UserIcon size={12} /> طالب
                                      </span>
                                  )}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-600">
                                  {user.role === 'admin' ? (
                                      <div className="flex flex-wrap gap-1">
                                          {user.permissions && user.permissions.length > 0 ? (
                                              user.permissions.map(p => (
                                                  <span key={p} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                                                      {availablePermissions.find(ap => ap.id === p)?.label || p}
                                                  </span>
                                              ))
                                          ) : (
                                              <span className="text-xs text-green-600 font-bold">وصول كامل (Super Admin)</span>
                                          )}
                                      </div>
                                  ) : (
                                      <span className="text-gray-400">-</span>
                                  )}
                              </td>
                              <td className="px-6 py-4 text-gray-500 text-sm">
                                  {user.joinDate ? new Date(user.joinDate).toLocaleDateString('ar-EG') : '-'}
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                          <Edit size={18} />
                                      </button>
                                      {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                      )}
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {filteredUsers.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                      لا يوجد مستخدمين مطابقين للبحث
                  </div>
              )}
          </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h2 className="text-xl font-bold text-gray-800">إضافة مستخدم جديد</h2>
                      <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X /></button>
                  </div>
                  
                  <form onSubmit={handleCreate} className="p-6 space-y-4 overflow-y-auto">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                          <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-500 outline-none" placeholder="اسم المستخدم" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-500 outline-none" placeholder="email@example.com" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">كلمة المرور</label>
                          <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-500 outline-none" placeholder="********" />
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <label className="block text-sm font-bold text-gray-700 mb-3">نوع الحساب</label>
                          <div className="flex gap-4 mb-4">
                              <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${formData.role === 'student' ? 'border-gharas-500 bg-green-50 text-gharas-600' : 'border-gray-200 bg-white text-gray-500'}`}>
                                  <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={() => setFormData({...formData, role: 'student'})} className="hidden" />
                                  <span className="font-bold block">طالب</span>
                              </label>
                              <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${formData.role === 'admin' ? 'border-purple-500 bg-purple-50 text-purple-600' : 'border-gray-200 bg-white text-gray-500'}`}>
                                  <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={() => setFormData({...formData, role: 'admin'})} className="hidden" />
                                  <span className="font-bold block">مدير</span>
                              </label>
                          </div>

                          {formData.role === 'admin' && (
                              <div className="space-y-3 animate-fade-in bg-white p-3 rounded-xl border border-gray-100">
                                  <p className="text-xs font-bold text-gray-500 mb-2">تحديد الصلاحيات:</p>
                                  {availablePermissions.map(perm => (
                                      <label key={perm.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors select-none">
                                          <div 
                                            className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${formData.permissions.includes(perm.id) ? 'bg-gharas-600 border-gharas-600 text-white' : 'border-gray-300 bg-white'}`}
                                          >
                                              {formData.permissions.includes(perm.id) && <Check size={14} strokeWidth={3} />}
                                          </div>
                                          <input 
                                            type="checkbox" 
                                            checked={formData.permissions.includes(perm.id)} 
                                            onChange={() => togglePermission(perm.id)} 
                                            className="hidden"
                                          />
                                          <div>
                                              <span className="text-sm text-gray-800 font-bold block">{perm.label}</span>
                                              <span className="text-xs text-gray-400">{perm.desc}</span>
                                          </div>
                                      </label>
                                  ))}
                              </div>
                          )}
                      </div>

                      <button type="submit" className="w-full bg-gharas-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-gharas-700 shadow-lg transition-transform hover:-translate-y-1">حفظ المستخدم</button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminUsers;
