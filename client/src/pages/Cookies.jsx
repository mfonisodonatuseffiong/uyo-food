import { motion } from "framer-motion";

export default function Cookies() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning" id="cookies-policy">   {/* ✅ Changed background */}
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
          This page explains how cookies are used on our website. Cookies are small text files
          stored on your device to help us improve your browsing experience.
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
              We use cookies to remember your preferences, analyze site traffic, and personalize
              content. Some cookies are essential for the site to function properly.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-user-cog me-2"></i> 3. Managing Cookies
            </h5>
            <p className="text-secondary">
              You can manage or disable cookies through your browser settings. Please note that
              disabling cookies may affect certain features of the site.
            </p>
          </motion.div>

          <motion.div className="col-md-12 mb-4" {...fadeUp(0.6)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-check-circle me-2"></i> 4. Consent
            </h5>
            <p className="text-secondary">
              By continuing to use our website, you consent to our use of cookies in accordance
              with this policy.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.7)}>
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
