import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../../context/CartContext";

export default function PaymentPopup({ isOpen, onClose }) {
  const { clearCart } = useContext(CartContext);
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    setPaid(true);
    clearCart();
    setTimeout(() => {
      setPaid(false);
      onClose();
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* الخلفية الضبابية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* نافذة الدفع */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {!paid ? (
              <motion.div
                className="bg-gray-900 p-8 rounded-3xl shadow-2xl w-80 sm:w-96 md:w-72 flex flex-col items-center text-center text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-2xl font-bold mb-4">تأكيد الدفع</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  هل أنت متأكد أنك تريد إتمام عملية الدفع؟
                </p>
                <div className="flex gap-6">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-bold transition"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handlePayment}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full font-bold transition"
                  >
                    دفع الآن
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center w-72 h-72">
                {/* الدائرة الأساسية */}
                <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl border-4 border-gray-700">
                  {/* الحدود المتحركة البسيطة */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-r-indigo-300"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* المحتوى */}
                  <div className="text-center z-10">
                    <div className="text-2xl font-bold text-indigo-300 mb-2">
                      تم الدفع بنجاح
                    </div>
                    <div className="text-indigo-400 text-lg">✓</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
