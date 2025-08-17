import { motion } from "framer-motion";
// import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState([]);

  // جلب البيانات تلقائياً عند تحميل الصفحة
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      {/* شبكة عرض المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(128,0,128,0.5)",
            }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-contain bg-gray-700 p-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="p-4">
              <span className="block text-sm text-purple-400 font-semibold uppercase mb-2">
                {item.category}
              </span>
              <h2 className="text-lg font-bold mb-2 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold text-lg">
                  ${item.price}
                </span>
                <button className="bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  إضافة للسلة
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
