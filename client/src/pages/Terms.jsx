import { motion } from "framer-motion";

export default function Terms() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-light" id="terms">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Terms & Conditions
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          Please read these Terms & Conditions carefully before using Uyo‑Food.
          By accessing or using our services, you agree to be bound by these
          terms.
        </motion.p>

        <div className="row">
          <motion.div className="col-md-12 mb-4" {...fadeUp(0.3)}>
            <h5 className="fw-bold text-danger">1. Use of Service</h5>
            <p className="text-secondary">
              Uyo‑Food provides a platform to order meals from partner
              restaurants. You agree to use the service lawfully and responsibly.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.4)}>
            <h5 className="fw-bold text-danger">2. Orders & Payments</h5>
            <p className="text-secondary">
              All orders placed through Uyo‑Food must be paid using approved
              payment methods. Prices are set by restaurants and may vary.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">3. Delivery</h5>
            <p className="text-secondary">
              We strive to deliver meals promptly. Delivery times may vary based
              on restaurant preparation and rider availability.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.6)}>
            <h5 className="fw-bold text-danger">4. Refunds & Cancellations</h5>
            <p className="text-secondary">
              Refunds and cancellations are subject to our Refund Policy. Please
              review it carefully before placing an order.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.7)}>
            <h5 className="fw-bold text-danger">5. Privacy</h5>
            <p className="text-secondary">
              Your data is handled in accordance with our Privacy Policy. We
              respect your privacy and protect your information.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.8)}>
            <h5 className="fw-bold text-danger">6. Changes to Terms</h5>
            <p className="text-secondary">
              Uyo‑Food reserves the right to update these terms at any time.
              Continued use of the service constitutes acceptance of changes.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.9)}>
          <p className="text-secondary">
            For questions regarding these Terms & Conditions, contact us at{" "}
            <a
              href="mailto:support@uyofood.com"
              className="text-danger fw-bold"
            >
              support@uyofood.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
