import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TrackingPage() {
  // ✅ Simulate order status progression
  const steps = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
  const [currentStep, setCurrentStep] = useState(0);

  // ✅ Countdown timer (15 minutes)
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    // Progression through steps every 3 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);

    // Countdown timer every second
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-5 bg-warning" id="tracking-page">
      <div className="container">
        <motion.h2
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-map-marker-alt me-2 text-danger"></i> Order Tracking
        </motion.h2>

        {/* Progress bar */}
        <motion.div
          className="progress mb-4"
          style={{ height: "30px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="progress-bar bg-danger fw-bold"
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {step}
              {idx <= currentStep && <i className="fas fa-check text-success"></i>}
            </motion.li>
          ))}
        </ul>

        {/* Estimated delivery message */}
        <motion.div
          className="alert alert-info mt-4 text-center rounded-pill shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          🚚 Your order is <strong>{steps[currentStep]}</strong>... <br />
          ⏱ Estimated delivery in <span className="fw-bold text-danger">{formatTime(timeLeft)}</span>
        </motion.div>

        {/* Map placeholder */}
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
