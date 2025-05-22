import React, { createContext, useState, useEffect, useCallback } from "react";

import all_product from "../Components/Assets/all_product";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // ✅ Sync updated cart to server
  const syncCartToServer = async (items) => {
    try {
      await axios.post("http://localhost:4000/cart", { items }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to sync cart", err);
    }
  };

  const fetchCartFromEmail = useCallback(async (email) => {
  try {
    const res = await axios.get(`http://localhost:4000/cart/${email}`, { withCredentials: true });
    if (res.data && res.data.items) {
      const items = Object.fromEntries(
        Object.entries(res.data.items).map(([id, qty]) => [parseInt(id), qty])
      );
      setCartItems(items);
    }
  } catch (err) {
    console.error("Failed to fetch cart", err);
  }
}, []);

  // ✅ Re-sync on cart change
  useEffect(() => {
    syncCartToServer(cartItems);
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      const item = all_product.find((p) => p.id === Number(key));
      return total + cartItems[key] * (item?.new_price || 0);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    fetchCartFromEmail, // ✅ exportable to CartItems.jsx
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
