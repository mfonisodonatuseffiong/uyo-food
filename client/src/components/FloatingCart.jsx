import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/floatingcart.css"; // ✅ Import floating cart styles

function FloatingCart() {
  const { cart } = useCart();

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hide cart if empty
  if (cart.length === 0) return null;

  return (
    <div className="floating-cart">
      {/* Cart Icon */}
      <span className="cart-icon">🛒</span>

      {/* Cart Summary */}
      <span className="cart-text">
        {cart.length} {cart.length === 1 ? "item" : "items"} | ₦{total.toLocaleString()}
      </span>

      {/* View Cart Button */}
      <Link to="/cart" className="btn">
        View Cart
      </Link>
    </div>
  );
}

export default FloatingCart;
