import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API Call
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">تواصل معنا</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            لدينا فريق دعم متميز جاهز للإجابة على استفساراتكم ومساعدة أطفالكم في رحلتهم التعليمية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات الاتصال</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-gharas-100 p-3 rounded-xl text-gharas-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">العنوان</p>
                            <p className="text-gray-500">شارع التخصصي، الرياض، المملكة العربية السعودية</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-gharas-100 p-3 rounded-xl text-gharas-600">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">البريد الإلكتروني</p>
                            <p className="text-gray-500">support@gharas.sa</p>
                            <p className="text-gray-500">info@gharas.sa</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-gharas-100 p-3 rounded-xl text-gharas-600">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">الهاتف</p>
                            <p className="text-gray-500" dir="ltr">+966 11 000 0000</p>
                            <p className="text-gray-500" dir="ltr">+966 50 000 0000</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-playful-blue p-8 rounded-3xl text-white overflow-hidden relative">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">هل أنت مدرسة أو مؤسسة؟</h3>
                    <p className="opacity-90 mb-4 text-sm">تواصل معنا للحصول على عروض خاصة للمدارس وربط نظام Totar LMS بشكل كامل.</p>
                    <button className="bg-white text-playful-blue px-6 py-2 rounded-xl font-bold text-sm hover:bg-opacity-90">طلب عرض مؤسسات</button>
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg">
            {submitted ? (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <Send size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">تم إرسال رسالتك!</h3>
                    <p className="text-gray-500">شكراً لتواصلك معنا، سنرد عليك في أقرب وقت.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 text-gharas-600 font-bold underline">إرسال رسالة أخرى</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">أرسل لنا رسالة</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
                            <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-400 focus:bg-white transition-all outline-none" placeholder="اسمك الكامل" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال</label>
                            <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-400 focus:bg-white transition-all outline-none" placeholder="05xxxxxxxx" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-400 focus:bg-white transition-all outline-none" placeholder="example@email.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">الرسالة</label>
                        <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gharas-400 focus:bg-white transition-all outline-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-gharas-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gharas-700 transition-all transform hover:-translate-y-1">
                        إرسال الرسالة
                    </button>
                </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;