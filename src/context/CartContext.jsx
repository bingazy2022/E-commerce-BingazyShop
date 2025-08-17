import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // حالة فتح/إغلاق صفحة السلة
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // فتح السلة
  function openCart() {
    setIsCartOpen(true);
  }

  // إغلاق السلة
  function closeCart() {
    setIsCartOpen(false);
  }

  // إضافة منتج للسلة
  // داخل CartContext.js أو ملف Context الخاص بالسلة
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // إذا المنتج موجود مسبقًا، زود الكمية
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // إذا المنتج جديد، أضفه مع quantity = 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // إزالة منتج من السلة
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    // toast.error("🗑️ تم حذف المنتج من السلة", { position: "bottom-right" });
  }

  // تفريغ السلة
  function clearCart() {
    setCart([]);
    // toast.error("🗑️ تم تفريغ السلة", { position: "bottom-right" });
  }

  // تحديث الكمية
  function updateQuantity(id, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
