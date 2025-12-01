import React, { useState } from 'react';
import { User } from '../types';
import { TotarService } from '../services/totarService';
import { Leaf, Mail, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-kid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fun Background Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-kid-yellow rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-kid-blue rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-kid-pink rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="bg-white/80 backdrop-blur-md w-full max-w-md rounded-[3rem] shadow-2xl border-4 border-white relative z-10 overflow-hidden">
         <div className="bg-gradient-to-r from-kid-green to-gharas-500 h-32 flex items-center justify-center relative">
             <div className="bg-white p-4 rounded-3xl shadow-pop-lg transform rotate-6 border-4 border-kid-yellow absolute -bottom-10">
                <Leaf size={40} className="text-gharas-500" strokeWidth={3} />
             </div>
             {/* Decor */}
             <div className="absolute top-4 left-4 text-white/30 text-4xl">★</div>
             <div className="absolute bottom-4 right-4 text-white/30 text-2xl">●</div>
         </div>

         <div className="pt-16 pb-10 px-8 text-center">
            <h2 className="text-3xl font-heading font-black text-gray-800 mb-2">أهلاً يا بطل! 👋</h2>
            <p className="text-gray-500 font-bold mb-8">سجل دخولك عشان تكمل مغامرتك</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <Mail size={20} />
                    </div>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pr-12 pl-4 py-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-kid-blue focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-gray-700 outline-none"
                        placeholder="البريد الإلكتروني"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={20} />
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pr-12 pl-4 py-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-kid-blue focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-gray-700 outline-none"
                        placeholder="كلمة السر السرية"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-100 p-3 rounded-2xl flex items-center gap-2 text-red-500 font-bold text-sm">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-kid-blue text-white rounded-2xl font-black text-xl shadow-pop-colored text-kid-blue hover:-translate-y-1 transition-transform border-2 border-transparent hover:bg-blue-400"
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : 'دخول'}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-bold mb-4">جديد معنا؟</p>
                <button 
                    onClick={onRegisterClick}
                    className="w-full py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                    اصنع حساب جديد 🚀
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Login;