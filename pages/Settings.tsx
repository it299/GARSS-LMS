import React, { useState } from 'react';
import { User } from '../types';
import { TotarService } from '../services/totarService';
import { Bell, Volume2, Globe, Shield, Lock, LogOut, Check } from 'lucide-react';

interface SettingsProps {
  user: User;
  onUpdate: (user: User) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate, onLogout }) => {
  const [preferences, setPreferences] = useState(user.preferences);
  const [saving, setSaving] = useState(false);

  const togglePreference = async (key: keyof typeof preferences) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    setSaving(true);
    // Auto save
    const updatedUser = await TotarService.updateProfile({ preferences: newPrefs });
    onUpdate(updatedUser);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">إعدادات الحساب</h1>

        <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">التفضيلات العامة</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                                <Bell size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">الإشعارات</p>
                                <p className="text-sm text-gray-400">تلقي تنبيهات عن الدروس الجديدة</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => togglePreference('notifications')}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.notifications ? 'bg-gharas-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${preferences.notifications ? '-translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-50 p-2 rounded-lg text-yellow-500">
                                <Volume2 size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">المؤثرات الصوتية</p>
                                <p className="text-sm text-gray-400">تشغيل أصوات عند التفاعل</p>
                            </div>
                        </div>
                        <button 
                             onClick={() => togglePreference('soundEffects')}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.soundEffects ? 'bg-gharas-500' : 'bg-gray-300'}`}
                        >
                             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${preferences.soundEffects ? '-translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-500">
                                <Globe size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">الملف العام</p>
                                <p className="text-sm text-gray-400">السماح للآخرين برؤية إنجازاتي</p>
                            </div>
                        </div>
                        <button 
                             onClick={() => togglePreference('publicProfile')}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.publicProfile ? 'bg-gharas-500' : 'bg-gray-300'}`}
                        >
                             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${preferences.publicProfile ? '-translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">الأمان والخصوصية</h2>
                </div>
                <div className="p-6 space-y-4">
                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <Lock size={20} className="text-gray-500" />
                            <span className="font-bold text-gray-700">تغيير كلمة المرور</span>
                        </div>
                        <span className="text-gray-400 text-sm">تحديث</span>
                     </button>

                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <Shield size={20} className="text-gray-500" />
                            <span className="font-bold text-gray-700">ربط حساب ولي الأمر</span>
                        </div>
                        <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                            <Check size={14} /> مرتبط
                        </span>
                     </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8">
                <button 
                    onClick={onLogout}
                    className="w-full bg-white border-2 border-red-100 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={20} />
                    تسجيل الخروج
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;