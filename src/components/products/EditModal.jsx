export default function EditModal({ editForm, onChange, onCancel, onSubmit }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50">
      <div className="bg-gray-800 text-white p-4 m-4 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-purple-400">تعديل المنتج</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={editForm.title}
            onChange={onChange}
            placeholder="اسم المنتج"
            className="w-full p-2 rounded-lg bg-gray-700"
          />
          <input
            type="text"
            name="category"
            value={editForm.category}
            onChange={onChange}
            placeholder="الفئة"
            className="w-full p-2 rounded-lg bg-gray-700"
          />
          <textarea
            name="description"
            value={editForm.description}
            onChange={onChange}
            placeholder="الوصف"
            rows="4"
            className="w-full p-2 rounded-lg bg-gray-700"
          ></textarea>
          <input
            type="number"
            name="price"
            value={editForm.price}
            onChange={onChange}
            placeholder="السعر"
            className="w-full p-2 rounded-lg bg-gray-700"
          />
          <input
            type="text"
            name="image"
            value={editForm.image}
            onChange={onChange}
            placeholder="رابط الصورة"
            className="w-full p-2 rounded-lg bg-gray-700"
          />

          {/* ⭐ التقييم (rate) */}
          <input
            type="number"
            name="ratingRate"
            value={editForm.rating?.rate || ""}
            onChange={(e) =>
              onChange({
                target: {
                  name: "rating",
                  value: {
                    ...editForm.rating,
                    rate: parseFloat(e.target.value),
                  },
                },
              })
            }
            placeholder="التقييم (من 1 إلى 10)"
            min="1"
            max="10"
            step="0.1"
            className="w-full p-2 rounded-lg bg-gray-700"
          />

          {/* 👥   (count) */}
          <input
            type="number"
            name="ratingCount"
            value={editForm.rating?.count || ""}
            onChange={(e) =>
              onChange({
                target: {
                  name: "rating",
                  value: { ...editForm.rating, count: Number(e.target.value) },
                },
              })
            }
            placeholder="الكمية  المتوفرة"
            min="0"
            className="w-full p-2 rounded-lg bg-gray-700"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
