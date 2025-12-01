import React, { useState } from 'react';
import { User } from '../types';
import { TotarService } from '../services/totarService';
import { Edit2, Camera, Trophy, Star, Medal, Save } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const AVATAR_SEEDS = ['Ahmed', 'Sara', 'Omar', 'Laila', 'Zaid', 'Noura', 'Khalid', 'Jana'];

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    avatar: user.avatar
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const updatedUser = await TotarService.updateProfile(formData);
    onUpdate(updatedUser);
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="h-32 bg-gradient-to-r from-gharas-500 to-playful-blue"></div>
            <div className="px-8 pb-8 flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12">
                <div className="relative group">
                    <img 
                        src={formData.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white"
                    />
                    {isEditing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" />
                        </div>
                    )}
                </div>
                <div className="flex-1 pt-12 md:pt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            {isEditing ? (
                                <input 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="text-2xl font-bold font-heading border-b-2 border-gharas-500 outline-none pb-1"
                                />
                            ) : (
                                <h1 className="text-3xl font-heading font-bold text-gray-900">{user.name}</h1>
                            )}
                            <p className="text-gray-500">مستوى {user.level} • {user.points} نقطة</p>
                        </div>
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors"
                            >
                                <Edit2 size={16} />
                                تعديل
                            </button>
                        ) : (
                             <button 
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 bg-gharas-600 hover:bg-gharas-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors shadow-lg"
                            >
                                <Save size={16} />
                                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Stats */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={20} />
                        إحصائياتي
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-xl">
                            <span className="text-gray-600 font-medium">النقاط</span>
                            <span className="font-bold text-yellow-600">{user.points}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-xl">
                            <span className="text-gray-600 font-medium">المستوى</span>
                            <span className="font-bold text-blue-600">{user.level}</span>
                        </div>
                        <div className="flex justify-between items-center bg-purple-50 p-3 rounded-xl">
                            <span className="text-gray-600 font-medium">الأوسمة</span>
                            <span className="font-bold text-purple-600">5</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Medal className="text-playful-orange" size={20} />
                        أوسمة الشرف
                    </h3>
                    <div className="flex flex-wrap gap-2">
                         {[1,2,3,4,5].map(i => (
                             <div key={i} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl grayscale hover:grayscale-0 cursor-pointer transition-all hover:scale-110" title="وسام النشاط">
                                🏅
                             </div>
                         ))}
                    </div>
                </div>
            </div>

            {/* Main Content Form */}
            <div className="md:col-span-2 space-y-8">
                {isEditing && (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-fade-in">
                        <h3 className="font-bold text-gray-800 mb-4">اختر شخصيتك الرمزية</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                            {AVATAR_SEEDS.map((seed) => {
                                const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                                return (
                                    <button 
                                        key={seed}
                                        onClick={() => setFormData({...formData, avatar: url})}
                                        className={`rounded-full p-1 transition-all ${formData.avatar === url ? 'ring-4 ring-gharas-400 bg-gharas-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <img src={url} alt={seed} className="w-full h-full rounded-full" />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 text-lg">معلوماتي الشخصية</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-2">البريد الإلكتروني</label>
                            <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500">
                                {user.email} <span className="text-xs text-gray-400 mx-2">(لا يمكن تغييره)</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-2">نبذة عني</label>
                            {isEditing ? (
                                <textarea 
                                    rows={4}
                                    value={formData.bio}
                                    onChange={e => setFormData({...formData, bio: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-400 outline-none resize-none"
                                    placeholder="اكتب شيئاً عن نفسك..."
                                />
                            ) : (
                                <div className="w-full px-4 py-3 bg-white rounded-xl border border-gray-100 text-gray-700 min-h-[100px]">
                                    {user.bio || "لا توجد نبذة بعد.."}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;