import { Link } from "react-router-dom";
export default function ErorrMass() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-8">
      <h1 className="text-lg font-semibold mb-4">الصفحه المطلوبة غير موجوده</h1>

      <Link
        to="/"
        className="text-lg  hover:text-purple-800 text-purple-500  transition-all duration-300"
      >
        الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );
}
