import React from 'react';
import { Sparkles, BookOpen, Trophy } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-playful-yellow rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-playful-blue rounded-full blur-3xl mix-blend-multiply animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-playful-purple rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20 lg:pt-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gharas-100 text-gharas-700 text-sm font-bold mb-6 border border-gharas-200 shadow-sm">
            <Sparkles size={16} className="text-playful-yellow fill-playful-yellow" />
            منصة التعليم الأولى للأطفال
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 tracking-tight mb-8">
            اغرس المعرفة، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gharas-500 to-gharas-700">
              واحصد المستقبل
            </span> 🌾
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            تعلم بطريقة ممتعة مع أصدقائك، واكتشف عوالم جديدة مع مرشدنا الذكي، واحصل على شهاداتك الموثقة من نظام Totar.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gharas-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-gharas-200 hover:bg-gharas-700 hover:scale-105 transition-all flex items-center gap-2"
            >
              <BookOpen size={24} />
              ابدأ رحلة التعلم
            </button>
            <button className="px-8 py-4 bg-white text-gharas-700 text-lg font-bold rounded-2xl shadow-md border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2">
              <Trophy size={24} className="text-playful-yellow" />
              لوحة المتصدرين
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'تكامل مع Totar LMS', desc: 'كل تقدمك محفوظ ومتزامن تلقائياً مع نظام المدرسة.', icon: '🏫', color: 'bg-blue-50 border-blue-100' },
            { title: 'معلم ذكي (AI)', desc: 'اسأل "غرس" أي سؤال في أي وقت وسيشرح لك ببساطة.', icon: '🤖', color: 'bg-green-50 border-green-100' },
            { title: 'جوائز ومرح', desc: 'اجمع النقاط والأوسمة مع كل درس تنهيه.', icon: '🏆', color: 'bg-yellow-50 border-yellow-100' },
          ].map((feature, idx) => (
            <div key={idx} className={`p-6 rounded-3xl border-2 ${feature.color} hover:shadow-xl transition-shadow cursor-default`}>
              <div className="text-4xl mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;