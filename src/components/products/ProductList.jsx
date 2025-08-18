import { useState } from "react";
import useFetch from "../../useFetch";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const {
    data: products,
    Isloding,
    errMessage,
  } = useFetch(`${process.env.REACT_APP_API_URL}`);

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    products && products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = products
    ? Math.ceil(products.length / productsPerPage)
    : 0;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-5">
      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Isloding && <div>Loading...</div>}
        {!Isloding && products && products.length === 0 && !errMessage && (
          <div>لا يوجد منتجات</div>
        )}
        {errMessage && <div>{errMessage}</div>}

        {currentProducts &&
          currentProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </div>

      {/* Pagination مع أزرار السابق/التالي */}
      {products && products.length > productsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 ml-2 rounded text-white transition-colors ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            السابق
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded text-white transition-colors ${
                currentPage === i + 1
                  ? "bg-gray-800"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-white transition-colors ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
