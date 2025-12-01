import React from 'react';
import { Sparkles, BookOpen, Trophy, Rocket, Star, Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden px-4">
      {/* Background Decor - Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         {/* Floating Blobs */}
        <div className="absolute top-10 left-[10%] w-32 h-32 bg-kid-yellow rounded-full blur-2xl opacity-40 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 right-[10%] w-40 h-40 bg-kid-pink rounded-full blur-2xl opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-[20%] w-24 h-24 bg-kid-blue rounded-full blur-2xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Crisp Shapes */}
        <div className="absolute top-20 right-10 text-kid-purple animate-bounce-slow opacity-60 hidden lg:block"><Star size={48} fill="currentColor" /></div>
        <div className="absolute bottom-40 left-10 text-kid-red animate-pulse opacity-60 hidden lg:block"><Heart size={48} fill="currentColor" /></div>
        <div className="absolute top-40 left-1/4 text-kid-green animate-spin opacity-40 hidden lg:block" style={{ animationDuration: '10s' }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-10 pb-20 lg:pt-20">
        <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] border-4 border-white shadow-xl p-8 md:p-16 text-center transform transition-transform hover:scale-[1.01]">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border-2 border-kid-yellow text-gray-700 text-lg font-bold mb-8 shadow-sm animate-fade-in-up">
            <span className="animate-wiggle">👋</span>
            أهلاً بكم في عالم غرس العجيب
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gray-900 tracking-tight mb-8 leading-tight drop-shadow-sm">
            اغرس <span className="text-kid-green inline-block transform hover:-rotate-3 transition-transform cursor-default">المعرفة</span>، <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kid-blue to-kid-purple">
              واحصد المستقبل
            </span> 🚀
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-3xl text-gray-600 leading-relaxed font-bold">
            تعلم البرمجة والذكاء الاصطناعي وأنت تلعب! 🎮
            <br/>
            <span className="text-kid-pink text-lg md:text-2xl mt-2 block">حصص ممتعة، جوائز رائعة، وأصدقاء جدد.</span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={onStart}
              className="px-10 py-5 bg-kid-green text-white text-2xl font-black rounded-3xl shadow-pop-lg shadow-green-600 hover:bg-green-400 hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-3 border-4 border-green-600"
            >
              <Rocket size={32} />
              انطلق الآن!
            </button>
            <button className="px-10 py-5 bg-white text-kid-orange text-2xl font-black rounded-3xl shadow-pop-lg shadow-orange-200 border-4 border-kid-orange hover:bg-orange-50 hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-3">
              <Trophy size={32} />
              لوحة الأبطال
            </button>
          </div>
        </div>

        {/* Feature Cards as floating stickers */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 px-4">
          {[
            { title: 'مرتبط بمدرستك', desc: 'كل درجاتك تروح لنظام Totar تلقائياً!', icon: '🏫', color: 'bg-blue-100 border-blue-400 text-blue-600', rotate: '-rotate-2' },
            { title: 'معلم ذكي (AI)', desc: 'اسأل "غرس" أي سؤال في أي وقت!', icon: '🤖', color: 'bg-purple-100 border-purple-400 text-purple-600', rotate: 'rotate-2' },
            { title: 'اجمع الجوائز', desc: 'اكسب نقاط وافتح صناديق الهدايا!', icon: '🎁', color: 'bg-yellow-100 border-yellow-400 text-yellow-600', rotate: '-rotate-1' },
          ].map((feature, idx) => (
            <div key={idx} className={`p-6 rounded-[2.5rem] border-4 ${feature.color.split(' ')[1]} ${feature.color.split(' ')[0]} shadow-lg transform hover:scale-110 transition-transform cursor-pointer ${feature.rotate}`}>
              <div className="text-5xl mb-4 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mx-auto border-4 border-white">
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-black text-center mb-2 ${feature.color.split(' ')[2]}`}>{feature.title}</h3>
              <p className="text-gray-600 text-center font-bold leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;