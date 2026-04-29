import { createContext, useContext, useReducer, useState, useEffect } from "react";

const CartContext = createContext();

/* =========================
   CART REDUCER (PRODUCTION)
========================= */
const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_ITEM": {
      const item = action.payload;

      const existingIndex = state.findIndex(
        (i) =>
          i.restaurant === item.restaurant &&
          i.dish === item.dish
      );

      if (existingIndex !== -1) {
        const updated = [...state];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...state, { ...item, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "DECREASE_ITEM": {
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

/* =========================
   PROVIDER
========================= */
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState([]);

  /* =========================
     PERSIST CART (REAL APP BEHAVIOR)
  ========================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* =========================
     NOTIFICATIONS
  ========================= */
  const showNotification = (message, type = "info") => {
    const id = Date.now();

    setNotifications((prev) => [
      ...prev,
      { id, message, type },
    ]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }, 3000);
  };

  /* =========================
     ADD ITEM (BACKEND READY SHAPE)
  ========================= */
  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${item.restaurant}-${item.dish}`, // stable ID
        restaurant: item.restaurant,
        dish: item.dish,
        price: item.price,
      },
    });

    showNotification("Item added to cart", "success");
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    showNotification("Item removed", "info");
  };

  const decreaseItem = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    showNotification("Cart cleared", "info");
  };

  const dismissNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        decreaseItem,
        clearCart,
        notifications,
        showNotification,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);