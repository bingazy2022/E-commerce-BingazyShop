import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaShoppingCart, FaStar } from "react-icons/fa";
export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);

  // داخل ProductCard.jsx
  const productQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="">
        <motion.div
          className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 25px rgba(128,0,128,0.5)",
          }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-56 object-contain bg-gray-700 p-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="p-4">
            <span className="block text-sm text-purple-400 font-semibold uppercase mb-2">
              {product.category}
            </span>
            <h2 className="text-lg font-bold mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {product.description}
            </p>
            {/* عرض التقييم وعدد القطع */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                <FaStar />
                <span>{product.rating?.rate ?? "N/A"}</span>{" "}
                {/* التحقق من وجود rating */}
              </div>
              <span className="text-gray-400 text-sm">
                ({product.rating?.count ?? 0} قطع)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold text-lg">
                ${product.price}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="relative bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              >
                <FaShoppingCart />
                إضافة للسلة
                {productQuantity > 0 && (
                  <span className="  bg-white text-purple-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {productQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
