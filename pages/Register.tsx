import React, { useState } from 'react';
import { User } from '../types';
import { TotarService } from '../services/totarService';
import { Leaf, User as UserIcon, Mail, Lock, Calendar, Loader2 } from 'lucide-react';

interface RegisterProps {
  onSuccess: (user: User) => void;
  onLoginClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    try {
        const user = await TotarService.register(formData);
        onSuccess(user);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-playful-purple p-3 rounded-2xl text-white shadow-lg -rotate-3">
            <Leaf size={40} strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-heading font-bold text-gray-900">
          انضم لعائلة غرس 🚀
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أنشئ حسابك وابدأ رحلة الاستكشاف والمرح
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-3xl sm:px-10 border border-white">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700">الاسم الكامل</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none"
                  placeholder="اسمك البطل"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">كم عمرك؟</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  required
                  min="5"
                  max="18"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none"
                  placeholder="10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">كلمة المرور</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none"
                  placeholder="********"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-purple-200 text-sm font-bold text-white bg-playful-purple hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-playful-purple transition-all hover:-translate-y-1"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'إنشاء الحساب'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <button 
                onClick={onLoginClick}
                className="font-bold text-playful-purple hover:text-purple-600"
              >
                سجل دخولك هنا
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;