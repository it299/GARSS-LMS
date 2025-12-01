
import React, { useEffect, useState } from 'react';
import { Sparkles, BookOpen, Trophy, Monitor, Smile, Shield, CheckCircle, ChevronDown, User, Quote } from 'lucide-react';
import { SiteConfig } from '../types';
import { TotarService } from '../services/totarService';

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

  if (!config) return <div className="h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-gharas-500 rounded-full border-t-transparent"></div></div>;

  const iconMap: any = {
      Monitor: Monitor,
      Shield: Shield,
      Smile: Smile,
      CheckCircle: CheckCircle
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-playful-yellow rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-playful-blue rounded-full blur-3xl mix-blend-multiply animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-playful-purple rounded-full blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-20 lg:pt-24">
            <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gharas-100 text-gharas-700 text-sm font-bold mb-6 border border-gharas-200 shadow-sm animate-fade-in-up">
                <Sparkles size={16} className="text-playful-yellow fill-playful-yellow" />
                منصة التعليم التقني الأولى للأطفال
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
                {config.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed font-medium">
                {config.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                onClick={onStart}
                className="px-8 py-4 bg-gharas-600 text-white text-lg font-bold rounded-2xl shadow-lg shadow-gharas-200 hover:bg-gharas-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                <BookOpen size={24} />
                {config.hero.ctaText}
                </button>
                <button 
                  onClick={onBrowse}
                  className="px-8 py-4 bg-white text-gharas-700 text-lg font-bold rounded-2xl shadow-md border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                <Trophy size={24} className="text-playful-yellow" />
                تصفح الدورات
                </button>
            </div>
            </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="bg-gharas-600 py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gharas-500 divide-x-reverse">
              <div>
                  <div className="text-4xl font-heading font-bold text-white mb-1">{config.stats.students}</div>
                  <div className="text-gharas-100 font-bold">طالب مسجل</div>
              </div>
              <div>
                  <div className="text-4xl font-heading font-bold text-white mb-1">{config.stats.courses}</div>
                  <div className="text-gharas-100 font-bold">دورة تدريبية</div>
              </div>
              <div>
                  <div className="text-4xl font-heading font-bold text-white mb-1">{config.stats.partners}</div>
                  <div className="text-gharas-100 font-bold">شريك تعليمي</div>
              </div>
              <div>
                  <div className="text-4xl font-heading font-bold text-white mb-1">{config.stats.satisfaction}</div>
                  <div className="text-gharas-100 font-bold">رضا العملاء</div>
              </div>
          </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900">لماذا غرس؟</h2>
                <div className="w-20 h-2 bg-gharas-400 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {config.features.map((item, idx) => {
                    const Icon = iconMap[item.icon] || Monitor;
                    const colors = [
                        { text: 'text-blue-500', bg: 'bg-blue-50' },
                        { text: 'text-green-500', bg: 'bg-green-50' },
                        { text: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { text: 'text-purple-500', bg: 'bg-purple-50' }
                    ];
                    const color = colors[idx % colors.length];

                    return (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow text-center group">
                            <div className={`w-20 h-20 mx-auto rounded-full ${color.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <Icon size={36} className={color.text} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-500">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* LEARNING PREVIEW (Visual) */}
      <div className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
                <div className="relative">
                    <img 
                        src={config.hero.image || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"} 
                        alt="Kid learning" 
                        className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white object-cover h-[400px] w-full"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">{config.stats.satisfaction}</div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold">نسبة رضا</p>
                                <p className="text-sm font-bold text-gray-800">أولياء الأمور</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2">
                <span className="text-gharas-600 font-bold tracking-wider text-sm bg-gharas-50 px-3 py-1 rounded-full">منهجية التعليم</span>
                <h2 className="text-4xl font-heading font-bold text-gray-900 mt-4 mb-6">نحول الشغف إلى مهارة</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-playful-blue/10 rounded-xl flex items-center justify-center text-playful-blue shrink-0 font-bold text-xl">1</div>
                        <div>
                            <h4 className="font-bold text-xl text-gray-800">شاهد وتعلم</h4>
                            <p className="text-gray-500 mt-1">دروس قصيرة، مركزة، وممتعة بصرياً.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-playful-orange/10 rounded-xl flex items-center justify-center text-playful-orange shrink-0 font-bold text-xl">2</div>
                        <div>
                            <h4 className="font-bold text-xl text-gray-800">طبق بيدك</h4>
                            <p className="text-gray-500 mt-1">تمارين تفاعلية ومشاريع عملية في كل درس.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-playful-purple/10 rounded-xl flex items-center justify-center text-playful-purple shrink-0 font-bold text-xl">3</div>
                        <div>
                            <h4 className="font-bold text-xl text-gray-800">احصل على الشهادة</h4>
                            <p className="text-gray-500 mt-1">شهادة إتمام معتمدة تضاف لملفك في Totar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-heading font-bold text-gray-900">قصص نجاح وسعادة</h2>
                  <p className="text-gray-500 mt-2">ماذا يقول أولياء الأمور والطلاب عن غرس</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {config.testimonials.map(t => (
                      <div key={t.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative">
                          <Quote className="absolute top-6 left-6 text-gray-100 fill-gray-100" size={48} />
                          <p className="text-gray-600 mb-6 relative z-10">{t.comment}</p>
                          <div className="flex items-center gap-3">
                              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                              <div>
                                  <h4 className="font-bold text-gray-800 text-sm">{t.name}</h4>
                                  <span className="text-xs text-gharas-600 bg-gharas-50 px-2 py-0.5 rounded">{t.role}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-heading font-bold text-gray-900">أسئلة شائعة</h2>
              </div>
              <div className="space-y-4">
                  {config.faq.map(item => (
                      <div key={item.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                          <button 
                            onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                            className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                              <span className="font-bold text-gray-800 text-right">{item.question}</span>
                              <ChevronDown className={`text-gray-400 transition-transform ${openFaq === item.id ? 'rotate-180' : ''}`} />
                          </button>
                          {openFaq === item.id && (
                              <div className="p-6 bg-white text-gray-600 border-t border-gray-100 animate-fade-in">
                                  {item.answer}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-20 bg-gharas-50">
          <div className="max-w-5xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-6">جاهز لبدء مغامرة التعلم؟</h2>
              <p className="text-xl text-gray-600 mb-10">انضم لأكثر من {config.stats.students} طالب يبنون مستقبلهم اليوم.</p>
              <button 
                onClick={onStart}
                className="bg-gharas-600 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-xl hover:bg-gharas-700 hover:scale-105 transition-all"
              >
                  اشترك مجاناً الآن
              </button>
          </div>
      </div>
    </div>
  );
};

export default Home;
