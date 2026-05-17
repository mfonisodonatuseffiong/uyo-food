import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/trackingpage.css"; // ✅ Import your custom CSS file

export default function TrackingPage() {
  const steps = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes delivery countdown
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const cancelOrder = async (orderId = "ORDER_ID") => {
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

  const elapsedTime = 15 * 60 - timeLeft;
  const cancellationWindow = elapsedTime <= 300;

  return (
    <section id="tracking-page"> {/* ✅ Removed bg-warning */}
      <div className="container">
        <motion.h2
          className="fw-bold mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-map-marker-alt me-2 text-danger"></i> Order Tracking
        </motion.h2>

        {/* Progress bar */}
        <motion.div className="progress mb-4">
          <div
            className="progress-bar fw-bold"
            role="progressbar"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          >
            {steps[currentStep]}
          </div>
        </motion.div>

        {/* Timeline */}
        <ul className="list-group mb-4">
          {steps.map((step, idx) => (
            <motion.li
              key={idx}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                idx <= currentStep ? "fw-bold text-dark" : "text-muted"
              }`}
            >
              {step}
              {idx <= currentStep && <i className="fas fa-check text-success"></i>}
            </motion.li>
          ))}
        </ul>

        {/* Estimated delivery message */}
        <motion.div className="alert mt-4 text-center rounded-pill shadow-sm">
          🚚 Your order is <strong>{steps[currentStep]}</strong>... <br />
          ⏱ Estimated delivery in <span className="fw-bold text-danger">{formatTime(timeLeft)}</span>
        </motion.div>

        {/* Cancel Order button */}
        {currentStep < 2 && cancellationWindow && (
          <div className="text-center mt-4">
            <motion.button
              className="btn premium-btn fw-bold rounded-pill"
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-times me-2"></i> Cancel Order
            </motion.button>
            <p className="text-muted small mt-2">
              ⏳ Time left to cancel:{" "}
              <span className="fw-bold text-danger">{formatTime(300 - elapsedTime)}</span>
              <br />
              <a href="/refund" className="text-danger fw-bold">View Refund Policy</a>
            </p>
          </div>
        )}

        {/* Modal */}
        {showModal && (
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
                    onClick={() => cancelOrder()}
                  >
                    Yes, Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mt-4">
          <h5 className="fw-bold text-dark mb-2">Live Map</h5>
          <div className="ratio ratio-16x9 rounded shadow-lg border border-danger">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Uyo,Nigeria"
              title="Delivery Map"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-muted small mt-2 text-center">
            Rider location will appear here in real time.
          </p>
        </div>
      </div>
    </section>
  );
}
