import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // مراقبة التمرير (scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // وظيفة العودة للأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 relative">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* القسم الأول */}
        <div>
          <h2 className="text-purple-400 text-xl font-bold mb-3">
            <span className="text-purple-200">B</span>ingazy
            <span className="text-purple-200">S</span>hop
          </h2>
          <p className="text-sm leading-6">
            متجر إلكتروني تجريبي يعرض منتجات متنوعة مع تصميم عصري وفاخر. هدفنا
            تقديم تجربة تسوق مميزة وسهلة الاستخدام.
          </p>
        </div>

        {/* القسم الثاني */}
        <div>
          <h2 className="text-purple-400 text-xl font-bold mb-3">روابط مهمة</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="lkl" className="hover:text-purple-500 transition">
                عن الموقع
              </Link>
            </li>
            <li>
              <Link to="lkl" className="hover:text-purple-500 transition">
                تواصل معنا
              </Link>
            </li>
            <li>
              <Link to="lkl" className="hover:text-purple-500 transition">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link to="lkl" className="hover:text-purple-500 transition">
                الأسئلة الشائعة
              </Link>
            </li>
          </ul>
        </div>

        {/* القسم الثالث */}
        <div>
          <h2 className="text-purple-400 text-xl font-bold mb-3">تابعنا على</h2>
          <div className="flex gap-4 text-lg">
            <a
              href="https://www.facebook.com/share/17BNUuB6WB/?mibextid=wwXIfr"
              className="hover:text-blue-500 transition transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <Link
              to="jh"
              className="hover:text-sky-400 transition transform hover:scale-110"
            >
              <FaTwitter />
            </Link>
            <a
              href="https://www.instagram.com/t_t44tt?igsh=ZnJkaWRodm15cW15"
              className="hover:text-pink-500 transition transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/bingazy2022"
              className="hover:text-gray-400 transition transform hover:scale-110"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        جميع الحقوق محفوظة &copy; {new Date().getFullYear()} | BingazyShop
      </div>

      {/* زر العودة للأعلى */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-800 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
}
