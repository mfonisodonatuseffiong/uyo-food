import { motion } from "framer-motion";

export default function Refund() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-light" id="refund">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Refund & Cancellation Policy
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          At Uyo‑Food, we strive to ensure every meal is delivered fresh and on
          time. If something goes wrong, our refund and cancellation policy
          protects you.
        </motion.p>

        <div className="row">
          <motion.div className="col-md-12 mb-4" {...fadeUp(0.3)}>
            <h5 className="fw-bold text-danger">1. Order Cancellation</h5>
            <p className="text-secondary">
              Orders can be cancelled within 5 minutes of placement. After this
              window, cancellations may not be possible if the restaurant has
              already started preparing your meal.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.4)}>
            <h5 className="fw-bold text-danger">2. Refund Eligibility</h5>
            <p className="text-secondary">
              Refunds are issued if your order is undelivered, arrives
              significantly late, or is incorrect. Cold or spoiled food must be
              reported immediately for a refund or replacement.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">3. Refund Process</h5>
            <p className="text-secondary">
              Refunds are processed within 5–7 business days to your original
              payment method. Cash‑on‑delivery refunds will be handled directly
              by the rider.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.6)}>
            <h5 className="fw-bold text-danger">4. Non‑Refundable Cases</h5>
            <p className="text-secondary">
              Refunds are not issued for change of mind after delivery, minor
              delays due to traffic, or dissatisfaction with taste preferences.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.7)}>
          <p className="text-secondary">
            For refund requests, contact us at{" "}
            <a
              href="mailto:refunds@uyofood.com"
              className="text-danger fw-bold"
            >
              refunds@uyofood.com
            </a>{" "}
            or call{" "}
            <a href="tel:+2348068199955" className="text-danger fw-bold">
              +234 806 819 9955
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
