import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item, idx) => idx !== action.index);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("info");

  const showNotification = (msg, type = "info") => {
    setNotification(msg);
    setNotificationType(type);
    setTimeout(() => setNotification(null), 3000);
  };

  const addItem = (item) => {
    if (cart.length > 0 && cart[0].restaurant !== item.restaurant) {
      showNotification(
        "You can only order from one restaurant at a time. Please clear your cart first.",
        "error"
      );
      return;
    }
    dispatch({ type: "ADD_ITEM", payload: item });
    showNotification("Item added to cart successfully!", "success");
  };

  const removeItem = (index) => {
    dispatch({ type: "REMOVE_ITEM", index });
    showNotification("Item removed from cart.", "info");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    showNotification("Cart cleared.", "info");
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, notification, notificationType }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
