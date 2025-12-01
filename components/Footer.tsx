import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gharas-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gharas-500 p-1.5 rounded-xl text-white">
                <Leaf size={20} />
              </div>
              <span className="text-2xl font-heading font-bold text-gray-800">غرس</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              منصة تعليمية رائدة تهدف لغرس القيم والمهارات التقنية في جيل المستقبل بطرق إبداعية وآمنة.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gharas-500 hover:text-white transition-colors">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 font-heading text-lg">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-gharas-600 transition-colors">الرئيسية</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-gharas-600 transition-colors">الدورات المتاحة</button></li>
              <li><button onClick={() => onNavigate('paths')} className="hover:text-gharas-600 transition-colors">المسارات التعليمية</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-gharas-600 transition-colors">من نحن</button></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 font-heading text-lg">أشهر المجالات</h4>
            <ul className="space-y-4 text-gray-500">
              <li><button onClick={() => onNavigate('courses')} className="hover:text-gharas-600 transition-colors">برمجة الأطفال</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-gharas-600 transition-colors">الذكاء الاصطناعي</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-gharas-600 transition-colors">الروبوتكس</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-gharas-600 transition-colors">التصميم الجرافيكي</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 font-heading text-lg">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-gharas-500" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gharas-500" />
                <span>support@gharas.sa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gharas-500" />
                <span dir="ltr">+966 50 000 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} منصة غرس التعليمية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;