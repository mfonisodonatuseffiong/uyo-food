import { motion } from "framer-motion";

export default function Privacy() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-light" id="privacy">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          Uyo‑Food values your privacy. This policy explains how we collect,
          use, and protect your personal information when you use our services.
        </motion.p>

        <div className="row">
          <motion.div className="col-md-12 mb-4" {...fadeUp(0.3)}>
            <h5 className="fw-bold text-danger">1. Information We Collect</h5>
            <p className="text-secondary">
              We collect information such as your name, contact details,
              delivery address, and payment information to process your orders.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.4)}>
            <h5 className="fw-bold text-danger">2. How We Use Your Data</h5>
            <p className="text-secondary">
              Your data is used to fulfill orders, improve our services, and
              provide customer support. We may also send you promotional offers
              if you opt in.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">3. Data Protection</h5>
            <p className="text-secondary">
              We implement industry‑standard security measures to protect your
              information from unauthorized access, disclosure, or misuse.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.6)}>
            <h5 className="fw-bold text-danger">4. Sharing of Information</h5>
            <p className="text-secondary">
              We do not sell your data. Information may be shared with partner
              restaurants and riders strictly for order fulfillment.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.7)}>
            <h5 className="fw-bold text-danger">5. Your Rights</h5>
            <p className="text-secondary">
              You have the right to access, update, or delete your personal
              information. Contact us to exercise these rights.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.8)}>
            <h5 className="fw-bold text-danger">6. Updates to Policy</h5>
            <p className="text-secondary">
              We may update this Privacy Policy from time to time. Continued use
              of Uyo‑Food means you accept the updated terms.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.9)}>
          <p className="text-secondary">
            For privacy inquiries, contact us at{" "}
            <a
              href="mailto:privacy@uyofood.com"
              className="text-danger fw-bold"
            >
              privacy@uyofood.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
