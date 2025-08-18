import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 استدعاء useNavigate
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateProduct() {
  const navigate = useNavigate(); // 👈 إنشاء دالة التنقل

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const prod = {
      title,
      description,
      category,
      price,
      image,
      rating: {
        rate: parseFloat(rate), // تحويل النص إلى رقم عشري
        count: parseInt(count), // تحويل النص إلى عدد صحيح
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}`, prod, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        toast.success(" تم اضافة المنتج بنجاح");
        // تفريغ الحقول
        setTitle("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage("");
        setRate("");
        setCount("");

        // 👈 إعادة التوجيه لصفحة المنتجات
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ حدث خطأ أثناء الإضافة، حاول مرة أخرى");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen  text-white p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-purple-400 text-center">
          إضافة منتج جديد
        </h1>

        {/* اسم المنتج */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            اسم المنتج
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل اسم المنتج"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* الوصف */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            الوصف
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أدخل وصف المنتج"
            rows="3"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          ></textarea>
        </div>

        {/* الفئة */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-semibold mb-2"
          >
            الفئة
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="مثل: إلكترونيات، ملابس..."
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* السعر */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold mb-2">
            السعر ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="أدخل سعر المنتج"
            step="0.01"
            min="0"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* صورة المنتج */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-semibold mb-2">
            رابط صورة المنتج
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="أدخل رابط الصورة"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* حقول rating */}
        <div className="mb-4">
          <label htmlFor="rate" className="block text-sm font-semibold mb-2">
            التقييم
          </label>
          <input
            id="rate"
            name="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="مثل: 7.2"
            step="0.1"
            min="0"
            max="10"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="count" className="block text-sm font-semibold mb-2">
            الكمية المتوفرة
          </label>
          <input
            id="count"
            name="count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="مثل: 22"
            step="1"
            min="0"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        {/* زر الحفظ */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-800"
          }`}
        >
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>
      </form>
    </div>
  );
}
