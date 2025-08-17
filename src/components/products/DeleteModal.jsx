import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-5xl animate-bounce" />
        </div>
        <h2 className="text-lg font-bold mb-4 text-center">تأكيد الحذف</h2>
        <p className="mb-6 text-center">
          هل أنت متأكد أنك تريد حذف هذا المنتج؟
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-800"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
