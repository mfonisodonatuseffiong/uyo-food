import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeItem, clearCart, updateQuantity } = useCart();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 500 : 0; // flat fee
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + serviceCharge;

  return (
    <section className="py-5 bg-warning" id="cart-page">
      <div className="container">
        <motion.h2
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-shopping-cart me-2 text-danger"></i> Your Cart
        </motion.h2>

        {cart.length === 0 ? (
          <motion.p
            className="text-dark text-center fw-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <>
            {/* Cart Items */}
            <ul className="list-group mb-4">
              {cart.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div>
                    <span className="fw-bold text-danger">{item.dish}</span>
                    <span className="text-muted small ms-2">from {item.restaurant}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* Quantity controls */}
                    <button
                      className="btn btn-sm btn-outline-dark me-2 rounded-pill"
                      onClick={() => updateQuantity(idx, (item.quantity || 1) - 1)}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="fw-bold text-dark">{item.quantity || 1}</span>
                    <button
                      className="btn btn-sm btn-outline-dark ms-2 rounded-pill"
                      onClick={() => updateQuantity(idx, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>

                    {/* Price */}
                    <span className="fw-bold text-warning ms-3">
                      ₦{item.price * (item.quantity || 1)}
                    </span>

                    {/* Remove */}
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill ms-3"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Totals */}
            <motion.div
              className="card p-3 shadow-lg mb-4 glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h5 className="fw-bold text-dark mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span className="fw-bold text-danger">₦{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span className="fw-bold text-danger">₦{deliveryFee}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Service Charge (5%)</span>
                <span className="fw-bold text-danger">₦{serviceCharge}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total</span>
                <span className="text-success fs-5">₦{total}</span>
              </div>
            </motion.div>

            {/* Cart actions */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-dark rounded-pill"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="glass-btn fw-bold rounded-pill px-4"
              >
                Proceed to Checkout <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
