import useFetch from "../../useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);

  const { id } = useParams();
  const navigates = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const {
    data: product,
    Isloding,
    errMessage,
  } = useFetch(`http://localhost:3001/products/${id}`);

  const productQuantity =
    cart.find((item) => item.id === product?.id)?.quantity || 0;

  function openEditForm() {
    setEditForm({
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: product.rating,
    });
    setShowEdit(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/products/${id}`, editForm, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        toast.success("✅ تم تحديث المنتج بنجاح");
        setShowEdit(false);
        navigates("/"); // الانتقال للصفحة الرئيسية بعد التحديث
      })
      .catch(() => {
        toast.error("❌ حدث خطأ أثناء التحديث");
      });
  }

  function handleDelete() {
    axios
      .delete(`http://localhost:3001/products/${id}`)
      .then(() => {
        setShowConfirm(false);
        toast.error("🗑️ تم حذف المنتج");
        navigates("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ حدث خطأ أثناء الحذف");
      });
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-lg">
        جاري تحميل المنتج...
      </div>
    );
  }

  return (
    <>
      {Isloding && <div>Loading...</div>}
      {errMessage && <div> {errMessage} </div>}
      {!Isloding && product && !errMessage && (
        <div className="min-h-screen p-8 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-xl max-h-[500px] object-contain"
            />
          </div>

          <div className="lg:w-1/2 text-white flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-400 mb-2">{product.category}</p>

            <p className="text-lg mb-4">{product.description}</p>

            {/* ⭐ التقييم وعدد القطع */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                <FaStar /> {product.rating?.rate ?? "N/A"}
              </div>
              <span className="text-gray-400 text-sm">
                ({product.rating?.count ?? 0} قطع)
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-300 mb-6">
              ${product.price}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="relative bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out flex items-center justify-center gap-2 w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaShoppingCart className="text-lg" />
                إضافة للسلة
                {productQuantity > 0 && (
                  <span className="bg-white text-purple-500 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold shadow-md">
                    {productQuantity}
                  </span>
                )}
              </button>

              <button
                onClick={openEditForm}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-lg w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <FaEdit className="text-lg" /> تعديل
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <FaTrash className="text-lg" /> حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <DeleteModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editForm={editForm}
          onChange={handleChange}
          onCancel={() => setShowEdit(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}
