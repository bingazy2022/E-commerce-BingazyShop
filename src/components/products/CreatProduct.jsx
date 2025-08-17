import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 استدعاء useNavigate
import { toast } from "react-toastify";

export default function CreateProduct() {
  const navigate = useNavigate(); // 👈 إنشاء دالة التنقل

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const prod = { title, description, category, price, image };

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prod),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("حدث خطأ في الإرسال");
        }
        return res.json();
      })
      .then(() => {
        toast.success(" تم اضافة المنتج بنجاح");
        // تفريغ الحقول
        setTitle("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage("");

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
          <label className="block text-sm font-semibold mb-2">اسم المنتج</label>
          <input
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
          <label className="block text-sm font-semibold mb-2">الوصف</label>
          <textarea
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
          <label className="block text-sm font-semibold mb-2">الفئة</label>
          <input
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
          <label className="block text-sm font-semibold mb-2">السعر ($)</label>
          <input
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
          <label className="block text-sm font-semibold mb-2">
            رابط صورة المنتج
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="أدخل رابط الصورة"
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
