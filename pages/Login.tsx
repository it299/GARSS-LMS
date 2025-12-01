import React, { useState } from 'react';
import { User } from '../types';
import { TotarService } from '../services/totarService';
import { Leaf, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

interface LoginProps {
  onSuccess: (user: User) => void;
  onRegisterClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await TotarService.login(email, password);
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-playful-yellow rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-playful-blue rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gharas-500 p-3 rounded-2xl text-white shadow-lg rotate-3">
            <Leaf size={40} strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-heading font-bold text-gray-900">
          أهلاً بعودتك يا بطل! 👋
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          سجل دخولك لتكمل رحلة التعلم والإبداع
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-3xl sm:px-10 border border-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 border-gray-300 rounded-xl focus:ring-gharas-500 focus:border-gharas-500 py-3 bg-gray-50 border outline-none transition-all"
                  placeholder="********"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="mr-3">
                    <h3 className="text-sm font-bold text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-gharas-200 text-sm font-bold text-white bg-gharas-600 hover:bg-gharas-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gharas-500 transition-all hover:-translate-y-1"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'تسجيل الدخول'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <button 
                    onClick={onRegisterClick}
                    className="font-bold text-gharas-600 hover:text-gharas-500"
                >
                  أنشئ حساباً جديداً
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;