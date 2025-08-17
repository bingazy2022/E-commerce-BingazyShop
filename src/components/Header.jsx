import { motion } from "framer-motion";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart, openCart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* شريط الرأس */}
      <motion.div
        className={`flex flex-wrap gap-4 justify-between items-center px-4 sm:px-6 py-4 mb-4 fixed top-0 left-0 w-full  z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* عنوان المتجر */}
        <motion.h1
          className="text-2xl sm:text-4xl font-extrabold text-purple-500 drop-shadow-lg tracking-wide text-center sm:text-left w-full sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-purple-300">B</span>ingazy
          <span className="text-purple-300">S</span>hop
        </motion.h1>

        {/* أزرار التحكم */}
        <motion.div
          className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* زر إضافة منتج */}
          <Link to="/Create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              <span className="font-semibold">إضافة</span>
              <FaPlus />
            </motion.button>
          </Link>

          {/* زر السلة مع تأثير Glow عند وجود منتجات */}
          <motion.button
            whileHover={{ rotate: 360, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 ${
              totalItems > 0
                ? "animate-pulse ring-4 ring-purple-400 ring-opacity-60"
                : ""
            }`}
            onClick={openCart}
          >
            <FaShoppingCart className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* مسافة تعويض للـ sticky */}
      <div className="h-28 md:h-16 "></div>

      {/* خط فاصل */}
      <motion.div
        className="flex justify-center items-center mb-8 px-4 sm:px-6 py-4 "
        initial={{ opacity: 0, width: "0%" }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 0.8 }}
      >
        <hr className="w-full h-px  bg-gray-300 border-0 dark:bg-gray-700" />
      </motion.div>
    </>
  );
}
