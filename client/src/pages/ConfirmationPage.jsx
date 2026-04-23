import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ConfirmationPage() {
  // Simulated order ID (in real app, generate from backend)
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <section className="py-5 bg-warning" id="confirmation-page">
      <div className="container text-center">
        {/* Celebration Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <i className="fas fa-check-circle text-success" style={{ fontSize: "5rem" }}></i>
        </motion.div>

        {/* Success Message */}
        <motion.h2
          className="fw-bold text-dark mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🎉 Order Confirmed!
        </motion.h2>
        <p className="text-secondary mb-4">
          Thank you for ordering with <span className="fw-bold text-danger">Uyo Food</span>.  
          Your order has been placed successfully.
        </p>

        {/* Order ID */}
        <motion.div
          className="card shadow-lg glass-card p-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h5 className="fw-bold text-dark">Order ID</h5>
          <p className="fw-bold text-danger fs-4">#{orderId}</p>
          <p className="text-muted small">Keep this ID for reference.</p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="d-flex justify-content-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/tracking" className="btn btn-danger fw-bold rounded-pill px-4">
            Track Order <i className="fas fa-map-marker-alt ms-2"></i>
          </Link>
          <Link to="/restaurants" className="btn btn-dark fw-bold rounded-pill px-4">
            Continue Browsing <i className="fas fa-utensils ms-2"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
