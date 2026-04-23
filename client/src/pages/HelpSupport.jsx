import { motion } from "framer-motion";

export default function HelpSupport() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning" id="help-support">
      <div className="container">
        <motion.h1
          className="fw-bold text-dark mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-life-ring me-2 text-danger"></i> Help & Support
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Need assistance? We’re here to help with orders, accounts, and general
          inquiries. Explore FAQs or reach out directly.
        </motion.p>

        <div className="row text-center">
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <i className="fas fa-question-circle text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">FAQs</h5>
            <p className="text-secondary">
              Find quick answers to common questions about ordering, payments,
              and delivery.
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.5)}>
            <i className="fas fa-envelope text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Email Support</h5>
            <p className="text-secondary">
              Contact us at{" "}
              <a href="mailto:support@uyofood.com" className="text-danger fw-bold">
                support@uyofood.com
              </a>
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.7)}>
            <i className="fas fa-phone-alt text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Call Us</h5>
            <p className="text-secondary">
              Reach our support line at <span className="fw-bold">+234 806 819 9955</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
