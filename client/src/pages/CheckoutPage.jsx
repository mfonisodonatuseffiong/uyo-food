import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Delivery form state
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 500 : 0;
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + serviceCharge;

  const handleConfirmOrder = () => {
    clearCart();
    navigate("/confirmation");
  };

  return (
    <section className="py-5 bg-warning" id="checkout-page">
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="container text-center p-4 rounded shadow-lg"
          style={{ backgroundColor: "rgba(255,193,7,0.9)", maxWidth: "600px" }}
        >
          <motion.h2
            className="fw-bold text-dark mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <i className="fas fa-credit-card me-2 text-danger"></i> Checkout
          </motion.h2>

          {cart.length === 0 ? (
            <p className="text-dark">
              Your cart is empty.{" "}
              <Link to="/restaurants" className="text-danger fw-bold">
                Go back to restaurants
              </Link>
            </p>
          ) : (
            <>
              {/* Order Summary */}
              <motion.div
                className="card p-3 shadow-lg mb-4 glass-card text-start"
                style={{ maxWidth: "500px", margin: "0 auto" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h5 className="fw-bold text-dark mb-3">Order Summary</h5>
                <ul className="list-group mb-3">
                  {cart.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span className="fw-bold text-danger">
                        {item.dish} x {item.quantity || 1}
                      </span>
                      <span className="text-warning fw-bold">
                        ₦{item.price * (item.quantity || 1)}
                      </span>
                    </li>
                  ))}
                </ul>
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

              {/* Delivery Details */}
              <motion.div
                className="card p-3 shadow-lg mb-4 text-start"
                style={{ maxWidth: "500px", margin: "0 auto" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h5 className="fw-bold text-dark mb-3">Delivery Details</h5>
                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter delivery address"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Payment Method</label>
                  <select
                    className="form-select rounded-pill"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="card">💳 Card Payment</option>
                    <option value="transfer">🏦 Bank Transfer</option>
                  </select>
                </div>
              </motion.div>

              {/* Confirm Button */}
              <motion.button
                className="btn btn-danger fw-bold w-100 rounded-pill py-2 fs-5"
                style={{ maxWidth: "500px", margin: "0 auto" }}
                onClick={handleConfirmOrder}
                disabled={!address || !phone}
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm & Pay <i className="fas fa-arrow-right ms-2"></i>
              </motion.button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
