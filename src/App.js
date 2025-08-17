import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
// import Home from "./components/Home";
import Footer from "./components/Footer";
import CreatProduct from "./components/products/CreatProduct";
// import ProductCard from "./components/products/ProductCard";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/PeoductDetails";
import ErorrMass from "./components/ErorrMass";
import { ToastContainer } from "react-toastify";
import CartPage from "./components/products/CartPage";
import PaymentPopup from "./components/products/PaymentPopup";

function App() {
  return (
    <Router>
      <div
        dir="rtl"
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white  "
      >
        <header>
          <Header />
        </header>
        <main>
          {/* <Home /> */}
          {/* <CreatProduct /> */}
          {/* <ProductCard /> */}
          {/* <ProductList /> */}
          {/* <ProductDetails /> */}
          <CartPage />
          <PaymentPopup />

          <Routes>
            <Route path="/" exact element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/create" element={<CreatProduct />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route path="*" element={<ErorrMass />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
