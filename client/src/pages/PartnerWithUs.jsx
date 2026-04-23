import { motion } from "framer-motion";

export default function PartnerWithUs() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning" id="partner-with-us">
      <div className="container">
        <motion.h1
          className="fw-bold text-dark mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-handshake me-2 text-danger"></i> Partner with Us
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Join Uyo‑Food as a restaurant, vendor, or delivery partner. Together,
          we’ll connect culture, cuisine, and community.
        </motion.p>

        <div className="row text-center">
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <i className="fas fa-utensils text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Restaurants</h5>
            <p className="text-secondary">
              Showcase your dishes to thousands of hungry customers across Uyo.
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.5)}>
            <i className="fas fa-store text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Vendors</h5>
            <p className="text-secondary">
              Sell groceries, snacks, and essentials through our platform.
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.7)}>
            <i className="fas fa-motorcycle text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Riders</h5>
            <p className="text-secondary">
              Earn flexible income by delivering meals and products across the city.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.9)}>
          <a
            href="/signup"
            className="btn btn-danger fw-bold rounded-pill px-4"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
