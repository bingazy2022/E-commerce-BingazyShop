import { FaTrash, FaCreditCard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import PaymentPopup from "./PaymentPopup";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart,
  } = useContext(CartContext);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // أقل من md = جوال
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteItem = (id) => removeFromCart(id);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  return (
    <>
      {/* السلة المنبثقة */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 h-full shadow-2xl z-50 p-6 overflow-y-auto 
                ${
                  isMobile
                    ? "w-full bg-gray-900"
                    : "w-full md:w-96 mt-[70px] bg-gray-900 rounded-md"
                }`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-400">
                  سلة التسوق
                </h2>
                <button
                  onClick={closeCart}
                  className="text-white text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">السلة فارغة</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex items-center bg-gray-800 p-3 rounded-xl shadow hover:shadow-lg transition"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain rounded-lg mx-4 bg-gray-700 p-1 "
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-purple-300 text-sm">
                            {item.category}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-green-400 font-bold">
                              ${item.price}
                            </span>
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-16 text-center rounded focus:outline-none border-gray-600 bg-gray-700 text-white"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-white bg-red-500 hover:bg-red-600 ml-3 p-2 rounded-full transition transform duration-500 hover:scale-105 shadow-md"
                        >
                          <FaTrash />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white font-bold text-lg">
                        المجموع:
                      </span>
                      <span className="text-green-400 font-bold text-lg">
                        ${totalPrice}
                      </span>
                    </div>

                    {/* أزرار التفريغ والدفع */}
                    <div className="flex gap-4 flex-col sm:flex-row mb-16">
                      <button
                        onClick={clearCart}
                        className="flex-1 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition transform duration-500 hover:scale-105 shadow-lg"
                      >
                        <div className="p-2 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                          <FaTrash size={18} />
                        </div>
                        تفريغ السلة
                      </button>

                      <button
                        onClick={() => setIsPaymentOpen(true)}
                        className="flex-1 flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition transform duration-500 hover:scale-105 shadow-lg"
                      >
                        <div className="p-2 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <FaCreditCard size={18} />
                        </div>
                        الدفع الآن
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* الخلفية */}
            <div
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-40"
            ></div>
          </>
        )}
      </AnimatePresence>

      {/* نافذة الدفع */}
      <PaymentPopup
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onConfirm={clearCart}
      />

      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}
