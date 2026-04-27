import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrderDetails({ orderId }) {
  const steps = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes delivery countdown
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const cancelOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });
      if (res.ok) {
        alert("Order cancelled successfully. Refund will be processed.");
      } else {
        alert("Unable to cancel. The restaurant may have already started preparing your meal.");
      }
    } catch (err) {
      console.error(err);
      alert("Error cancelling order. Please try again.");
    }
    setShowModal(false);
  };

  // ✅ Cancellation window logic
  const elapsedTime = 15 * 60 - timeLeft;
  const withinCancellationWindow = elapsedTime <= 300; // 5 minutes

  return (
    <section className="py-5 bg-light" id="order-details">
      <div className="container">
        <motion.h2
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-receipt me-2 text-danger"></i> Order Details
        </motion.h2>

        {/* Order summary */}
        <div className="card shadow-lg rounded-4 mb-4">
          <div className="card-body">
            <h5 className="fw-bold text-dark">Order ID: {orderId}</h5>
            <p className="text-muted">Status: {steps[currentStep]}</p>
            <p className="text-muted">Estimated delivery: {formatTime(timeLeft)}</p>
          </div>
        </div>

        {/* Cancel Order button + countdown */}
        {currentStep < 2 && (
          <div className="text-center mt-4">
            <motion.button
              className="btn fw-bold rounded-pill premium-btn"
              onClick={() => setShowModal(true)}
              whileHover={{ scale: withinCancellationWindow ? 1.05 : 1 }}
              disabled={!withinCancellationWindow}
              style={{
                backgroundColor: withinCancellationWindow ? "transparent" : "#ccc",
                color: withinCancellationWindow ? "#dc3545" : "#666",
                border: "2px solid #dc3545",
                cursor: withinCancellationWindow ? "pointer" : "not-allowed",
              }}
            >
              <i className="fas fa-times me-2"></i> Cancel Order
            </motion.button>
            <p className="text-muted small mt-2">
              ⏳ Time left to cancel:{" "}
              <span className="fw-bold text-danger">
                {withinCancellationWindow ? formatTime(300 - elapsedTime) : "Expired"}
              </span>
              <br />
              <a href="/refund" className="text-danger fw-bold">View Refund Policy</a>
            </p>
          </div>
        )}

        {/* Confirmation Modal */}
        {showModal && withinCancellationWindow && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 shadow-lg">
                <div className="modal-header bg-danger text-white rounded-top-4">
                  <h5 className="modal-title fw-bold">Confirm Cancellation</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <p className="fw-bold text-dark">
                    Are you sure you want to cancel this order?
                  </p>
                  <p className="text-muted small">
                    Refunds are processed within 5–7 business days to your original payment method.
                  </p>
                </div>
                <div className="modal-footer d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-secondary rounded-pill"
                    onClick={() => setShowModal(false)}
                  >
                    Keep Order
                  </button>
                  <button
                    className="btn btn-danger rounded-pill fw-bold"
                    onClick={cancelOrder}
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
