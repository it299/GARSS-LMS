
import React, { useEffect, useState } from 'react';
import { SiteConfig } from '../../types';
import { TotarService } from '../../services/totarService';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

const AdminContent: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'features' | 'testimonials' | 'faq'>('hero');

  useEffect(() => {
    TotarService.getSiteConfig().then((data) => {
        setConfig(data);
        setLoading(false);
    });
  }, []);

  const handleSave = async () => {
      if (!config) return;
      setSaving(true);
      await TotarService.updateSiteConfig(config);
      setSaving(false);
      alert('تم تحديث محتوى الموقع بنجاح!');
  };

  if (loading || !config) return <div>جاري التحميل...</div>;

  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === id ? 'bg-gharas-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      >
          {label}
      </button>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 font-heading">إدارة محتوى الصفحة الرئيسية</h1>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gharas-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gharas-700 transition-colors"
          >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              حفظ التغييرات
          </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="p-4 border-b border-gray-100 flex gap-2 overflow-x-auto">
              <TabButton id="hero" label="القسم الرئيسي (Hero)" />
              <TabButton id="stats" label="شريط الأرقام" />
              <TabButton id="features" label="مميزات غرس" />
              <TabButton id="testimonials" label="آراء العملاء" />
              <TabButton id="faq" label="الأسئلة الشائعة" />
          </div>

          <div className="p-8">
              {/* HERO EDITOR */}
              {activeTab === 'hero' && (
                  <div className="space-y-6 max-w-2xl">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">العنوان الرئيسي</label>
                          <input 
                            value={config.hero.title}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, title: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gharas-500"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">النص الفرعي</label>
                          <textarea 
                            rows={3}
                            value={config.hero.subtitle}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, subtitle: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gharas-500"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">نص الزر</label>
                          <input 
                            value={config.hero.ctaText}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, ctaText: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gharas-500"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة (URL)</label>
                          <input 
                            value={config.hero.image}
                            onChange={(e) => setConfig({...config, hero: {...config.hero, image: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-gharas-500 dir-ltr"
                          />
                          {config.hero.image && <img src={config.hero.image} className="mt-4 w-40 h-24 object-cover rounded-lg" alt="Preview" />}
                      </div>
                  </div>
              )}

              {/* STATS EDITOR */}
              {activeTab === 'stats' && (
                  <div className="grid grid-cols-2 gap-6 max-w-2xl">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">عدد الطلاب</label>
                          <input 
                            value={config.stats.students}
                            onChange={(e) => setConfig({...config, stats: {...config.stats, students: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">عدد الدورات</label>
                          <input 
                            value={config.stats.courses}
                            onChange={(e) => setConfig({...config, stats: {...config.stats, courses: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">الشركاء</label>
                          <input 
                            value={config.stats.partners}
                            onChange={(e) => setConfig({...config, stats: {...config.stats, partners: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">نسبة الرضا</label>
                          <input 
                            value={config.stats.satisfaction}
                            onChange={(e) => setConfig({...config, stats: {...config.stats, satisfaction: e.target.value}})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                      </div>
                  </div>
              )}

              {/* FEATURES EDITOR */}
              {activeTab === 'features' && (
                  <div className="space-y-6">
                      {config.features.map((feature, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <h3 className="font-bold text-gray-400 mb-3 text-xs">ميزة رقم {idx + 1}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label>
                                      <input 
                                        value={feature.title}
                                        onChange={(e) => {
                                            const newFeatures = [...config.features];
                                            newFeatures[idx].title = e.target.value;
                                            setConfig({...config, features: newFeatures});
                                        }}
                                        className="w-full p-2 bg-white border border-gray-200 rounded-lg"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
                                      <input 
                                        value={feature.description}
                                        onChange={(e) => {
                                            const newFeatures = [...config.features];
                                            newFeatures[idx].description = e.target.value;
                                            setConfig({...config, features: newFeatures});
                                        }}
                                        className="w-full p-2 bg-white border border-gray-200 rounded-lg"
                                      />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              {/* TESTIMONIALS EDITOR */}
              {activeTab === 'testimonials' && (
                   <div className="space-y-6">
                      {config.testimonials.map((t, idx) => (
                          <div key={t.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex gap-4 items-start">
                              <img src={t.avatar} className="w-12 h-12 rounded-full bg-white" alt="" />
                              <div className="flex-1 space-y-3">
                                  <div className="grid grid-cols-2 gap-3">
                                      <input 
                                        value={t.name}
                                        onChange={(e) => {
                                            const newT = [...config.testimonials];
                                            newT[idx].name = e.target.value;
                                            setConfig({...config, testimonials: newT});
                                        }}
                                        className="p-2 rounded-lg border border-gray-200 text-sm" placeholder="الاسم"
                                      />
                                      <input 
                                        value={t.role}
                                        onChange={(e) => {
                                            const newT = [...config.testimonials];
                                            newT[idx].role = e.target.value;
                                            setConfig({...config, testimonials: newT});
                                        }}
                                        className="p-2 rounded-lg border border-gray-200 text-sm" placeholder="الدور (طالب/ولي أمر)"
                                      />
                                  </div>
                                  <textarea 
                                    rows={2}
                                    value={t.comment}
                                    onChange={(e) => {
                                        const newT = [...config.testimonials];
                                        newT[idx].comment = e.target.value;
                                        setConfig({...config, testimonials: newT});
                                    }}
                                    className="w-full p-2 rounded-lg border border-gray-200 text-sm" placeholder="التعليق"
                                  />
                              </div>
                          </div>
                      ))}
                   </div>
              )}

              {/* FAQ EDITOR */}
              {activeTab === 'faq' && (
                  <div className="space-y-4">
                      {config.faq.map((item, idx) => (
                          <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                              <button 
                                onClick={() => {
                                    const newFaq = config.faq.filter((_, i) => i !== idx);
                                    setConfig({...config, faq: newFaq});
                                }}
                                className="absolute top-2 left-2 p-1 text-red-400 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                  <Trash2 size={16} />
                              </button>
                              <div className="space-y-2">
                                  <input 
                                    value={item.question}
                                    onChange={(e) => {
                                        const newFaq = [...config.faq];
                                        newFaq[idx].question = e.target.value;
                                        setConfig({...config, faq: newFaq});
                                    }}
                                    className="w-full p-2 bg-white font-bold border border-gray-200 rounded-lg" placeholder="السؤال"
                                  />
                                  <textarea 
                                    rows={2}
                                    value={item.answer}
                                    onChange={(e) => {
                                        const newFaq = [...config.faq];
                                        newFaq[idx].answer = e.target.value;
                                        setConfig({...config, faq: newFaq});
                                    }}
                                    className="w-full p-2 bg-white text-gray-600 border border-gray-200 rounded-lg" placeholder="الإجابة"
                                  />
                              </div>
                          </div>
                      ))}
                      <button 
                        onClick={() => setConfig({...config, faq: [...config.faq, { id: Date.now().toString(), question: 'سؤال جديد؟', answer: 'الإجابة هنا...' }]})}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                          <Plus size={20} /> إضافة سؤال جديد
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default AdminContent;
