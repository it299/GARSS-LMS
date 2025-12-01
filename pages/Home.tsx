import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Trophy, Monitor, Smile, Shield, CheckCircle, ChevronDown, Quote } from 'lucide-react';
import { SiteConfig } from '../types';
import { TotarService } from '../services/totarService';
import Hero from '../components/Hero';

interface HomeProps {
  onStart: () => void;
  onBrowse: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onBrowse }) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    TotarService.getSiteConfig().then(setConfig);
  }, []);

  if (!config) return <div className="h-screen flex items-center justify-center"><div className="animate-spin w-16 h-16 border-8 border-kid-blue border-t-transparent rounded-full"></div></div>;

  const iconMap: any = {
      Monitor: Monitor,
      Shield: Shield,
      Smile: Smile,
      CheckCircle: CheckCircle
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <Hero onStart={onStart} />

      {/* STATS STRIP - Floating Cards */}
      <div className="py-10 px-4">
          <div className="max-w-6xl mx-auto bg-gharas-600 rounded-[3rem] p-8 md:p-12 shadow-pop-lg shadow-green-800 border-4 border-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gharas-500 divide-x-reverse">
                  <div>
                      <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2 drop-shadow-md">{config.stats.students}</div>
                      <div className="text-gharas-100 font-bold text-lg">بطل وبطلة 🦸‍♂️</div>
                  </div>
                  <div>
                      <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2 drop-shadow-md">{config.stats.courses}</div>
                      <div className="text-gharas-100 font-bold text-lg">مغامرة تعليمية 🗺️</div>
                  </div>
                  <div>
                      <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2 drop-shadow-md">{config.stats.partners}</div>
                      <div className="text-gharas-100 font-bold text-lg">شريك نجاح 🤝</div>
                  </div>
                  <div>
                      <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2 drop-shadow-md">{config.stats.satisfaction}</div>
                      <div className="text-gharas-100 font-bold text-lg">أحبونا ❤️</div>
                  </div>
              </div>
          </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="bg-kid-yellow px-4 py-1 rounded-full font-bold text-gray-800 border-2 border-yellow-400">مميزاتنا</span>
                <h2 className="text-4xl font-heading font-black text-gray-900 mt-4">لماذا يحب الأطفال غرس؟</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {config.features.map((item, idx) => {
                    const Icon = iconMap[item.icon] || Monitor;
                    const styles = [
                        { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-500', shadow: 'shadow-blue-200' },
                        { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-500', shadow: 'shadow-green-200' },
                        { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-500', shadow: 'shadow-yellow-200' },
                        { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-500', shadow: 'shadow-purple-200' }
                    ];
                    const style = styles[idx % styles.length];

                    return (
                        <div key={idx} className={`bg-white p-8 rounded-[2.5rem] border-4 ${style.border} shadow-pop group hover:-translate-y-2 transition-transform`}>
                            <div className={`w-20 h-20 mx-auto rounded-3xl ${style.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 ${style.border}`}>
                                <Icon size={40} className={style.text} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-3 text-center">{item.title}</h3>
                            <p className="text-gray-500 text-center font-bold leading-relaxed">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* LEARNING PREVIEW */}
      <div className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-kid-blue rounded-[3rem] rotate-3 opacity-20 transform scale-105"></div>
                <img 
                    src={config.hero.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"} 
                    alt="Kid learning" 
                    className="relative rounded-[3rem] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white object-cover h-[450px] w-full bg-white"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -right-4 bg-white p-6 rounded-[2rem] shadow-pop-lg border-4 border-gray-100 animate-bounce-slow">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-kid-green rounded-full flex items-center justify-center text-white font-black text-2xl shadow-inner border-4 border-green-300">A+</div>
                        <div>
                            <p className="text-sm text-gray-400 font-bold">تقييم ممتاز</p>
                            <p className="text-xl font-black text-gray-800">تجربة ممتعة!</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="lg:w-1/2">
                <span className="text-kid-purple font-black tracking-wider text-sm bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100">طريقة التعلم</span>
                <h2 className="text-5xl font-heading font-black text-gray-900 mt-6 mb-8 leading-tight">كيف نحول اللعب إلى <span className="text-kid-blue">مهارة؟</span></h2>
                <div className="space-y-8">
                    <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-white border-4 border-kid-blue rounded-2xl flex items-center justify-center text-kid-blue shrink-0 font-black text-3xl shadow-pop group-hover:scale-110 transition-transform">1</div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-800 mb-2">شاهد بمتعة 📺</h4>
                            <p className="text-gray-500 font-bold text-lg">فيديوهات قصيرة كأنها كرتون، ما تزهق منها!</p>
                        </div>
                    </div>
                    <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-white border-4 border-kid-orange rounded-2xl flex items-center justify-center text-kid-orange shrink-0 font-black text-3xl shadow-pop group-hover:scale-110 transition-transform">2</div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-800 mb-2">العب وطبق 🎮</h4>
                            <p className="text-gray-500 font-bold text-lg">حل ألغاز وتمارين داخل اللعبة عشان تفهم الدرس.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-white border-4 border-kid-pink rounded-2xl flex items-center justify-center text-kid-pink shrink-0 font-black text-3xl shadow-pop group-hover:scale-110 transition-transform">3</div>
                        <div>
                            <h4 className="font-black text-2xl text-gray-800 mb-2">استلم شهادتك 🏅</h4>
                            <p className="text-gray-500 font-bold text-lg">شهادة فخمة باسمك تشاركها مع أهلك ومدرستك.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-20 bg-kid-yellow/10">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-heading font-black text-gray-900">أصدقاء غرس 💬</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {config.testimonials.map((t, i) => (
                      <div key={t.id} className={`bg-white p-8 rounded-[2.5rem] shadow-sm border-4 border-white relative mt-6 transform hover:-translate-y-2 transition-transform ${i%2===0 ? 'rotate-1' : '-rotate-1'}`}>
                          <div className="absolute -top-8 right-8 bg-kid-blue text-white p-3 rounded-2xl shadow-pop border-4 border-white">
                            <Quote size={24} fill="currentColor" />
                          </div>
                          <p className="text-gray-600 mb-8 font-bold text-lg leading-relaxed">"{t.comment}"</p>
                          <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-gray-100" />
                              <div>
                                  <h4 className="font-black text-gray-800 text-lg">{t.name}</h4>
                                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{t.role}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-white mx-4 rounded-[3rem] my-10 border-4 border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-heading font-black text-gray-900">عندك سؤال؟ 🤔</h2>
              </div>
              <div className="space-y-4">
                  {config.faq.map(item => (
                      <div key={item.id} className="border-2 border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                          <button 
                            onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                            className={`w-full flex items-center justify-between p-6 transition-colors ${openFaq === item.id ? 'bg-kid-blue text-white' : 'bg-white hover:bg-gray-50'}`}
                          >
                              <span className="font-black text-lg text-right">{item.question}</span>
                              <ChevronDown className={`transition-transform duration-300 ${openFaq === item.id ? 'rotate-180 text-white' : 'text-gray-400'}`} />
                          </button>
                          {openFaq === item.id && (
                              <div className="p-6 bg-blue-50 text-gray-700 font-bold leading-relaxed animate-fade-in border-t border-blue-100">
                                  {item.answer}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-kid-bg pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <div className="inline-block animate-bounce-slow mb-4 text-6xl">🚀</div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-gray-900 mb-6 drop-shadow-sm">جاهز تبدأ المغامرة؟</h2>
              <p className="text-2xl text-gray-600 mb-12 font-bold max-w-2xl mx-auto">انضم لأكثر من {config.stats.students} بطل وبطلة بيتعلموا ويبدعوا كل يوم.</p>
              <button 
                onClick={onStart}
                className="bg-kid-purple text-white text-2xl font-black px-12 py-6 rounded-[2rem] shadow-pop-lg shadow-purple-300 hover:bg-purple-400 hover:shadow-none hover:translate-y-2 transition-all border-4 border-purple-400"
              >
                  اشترك مجاناً الحين!
              </button>
          </div>
      </div>
    </div>
  );
};

export default Home;