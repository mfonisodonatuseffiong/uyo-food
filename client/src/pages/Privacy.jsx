import { motion } from "framer-motion";

export default function Cookies() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning" id="cookies">   {/* ✅ Warning background */}
      <div className="container">
        <motion.h1
          className="fw-bold text-dark mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-cookie-bite me-2 text-danger"></i> Cookies Policy
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Uyo‑Food uses cookies to improve your browsing experience, personalize
          content, and analyze site traffic. This policy explains how cookies
          are used and managed.
        </motion.p>

        <div className="row">
          <motion.div className="col-md-12 mb-4" {...fadeUp(0.3)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-info-circle me-2"></i> 1. What Are Cookies?
            </h5>
            <p className="text-secondary">
              Cookies are small text files stored on your device to help websites
              function efficiently and provide a better user experience.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.4)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-cogs me-2"></i> 2. How We Use Cookies
            </h5>
            <p className="text-secondary">
              We use cookies to remember your preferences, keep you signed in,
              and deliver personalized recommendations.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-chart-line me-2"></i> 3. Analytics & Performance
            </h5>
            <p className="text-secondary">
              Analytics cookies help us understand how users interact with our
              platform so we can improve functionality and performance.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.6)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-share-alt me-2"></i> 4. Third‑Party Cookies
            </h5>
            <p className="text-secondary">
              Some cookies are placed by third‑party services such as payment
              providers or analytics tools to support your experience.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.7)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-user-cog me-2"></i> 5. Managing Cookies
            </h5>
            <p className="text-secondary">
              You can manage or disable cookies through your browser settings.
              Note that disabling cookies may affect site functionality.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.8)}>
          <p className="text-dark">
            For questions about our Cookies Policy, contact us at{" "}
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
