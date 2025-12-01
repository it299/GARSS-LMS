import React from 'react';
import { Target, Heart, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gharas-600 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold relative z-10">من نحن</h1>
        <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto relative z-10">نحن نزرع بذور المعرفة لنحصد جيل المستقبل.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-800 mb-6 font-heading">قصة غرس</h2>
           <p className="text-lg text-gray-600 leading-8">
             انطلقت منصة غرس برؤية طموحة تهدف إلى سد الفجوة التقنية لدى الأطفال في العالم العربي. نؤمن أن البرمجة والذكاء الاصطناعي هي لغات العصر، وأن أطفالنا يمتلكون ذكاءً فطرياً يحتاج فقط إلى التوجيه الصحيح والأدوات الممتعة. لسنا مجرد منصة فيديوهات، نحن مجتمع تعليمي متكامل يربط بين الطالب والمعلم وولي الأمر.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">رؤيتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              أن نكون المنصة الأولى عربياً في تمكين الأطفال من مهارات القرن الحادي والعشرين، وبناء جيل مبدع، مبتكر، ومتمكن تقنياً.
            </p>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 mb-6 shadow-sm">
                <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">رسالتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              تقديم محتوى تعليمي تقني عالي الجودة، آمن، وممتع، يراعي الهوية العربية والإسلامية، وبأسعار في متناول الجميع.
            </p>
          </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-heading">فريقنا وأرقامنا</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-6">
                    <div className="text-4xl font-bold text-gharas-600 mb-2">+50</div>
                    <div className="text-gray-500 font-bold">دورة تدريبية</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-gharas-600 mb-2">+10k</div>
                    <div className="text-gray-500 font-bold">طالب مسجل</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-gharas-600 mb-2">+15</div>
                    <div className="text-gray-500 font-bold">شريك تعليمي</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-gharas-600 mb-2">100%</div>
                    <div className="text-gray-500 font-bold">ضمان الجودة</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;