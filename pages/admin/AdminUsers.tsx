
import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { TotarService } from '../../services/totarService';
import { Search, Trash2, Edit, MoreVertical, Shield, User as UserIcon, Plus, X } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' as 'student' | 'admin' });

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
      setFormData({ name: '', email: '', password: '', role: 'student' });
      fetchUsers();
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
                          <th className="px-6 py-4">المستوى</th>
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
                                  المستوى {user.level}
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
              <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h2 className="text-xl font-bold text-gray-800">إضافة مستخدم جديد</h2>
                      <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X /></button>
                  </div>
                  <form onSubmit={handleCreate} className="p-6 space-y-4">
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
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الصلاحية</label>
                          <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-500 outline-none">
                              <option value="student">طالب</option>
                              <option value="admin">مدير (Admin)</option>
                          </select>
                      </div>
                      <button type="submit" className="w-full bg-gharas-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-gharas-700 shadow-lg">حفظ المستخدم</button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminUsers;
