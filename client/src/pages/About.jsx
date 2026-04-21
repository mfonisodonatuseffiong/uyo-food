import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-5 bg-warning text-dark" id="about">
      <div className="container">
        <motion.h1
          className="fw-bold mb-4 text-center text-danger"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-utensils me-2 text-danger"></i> About Uyo‑Food
        </motion.h1>
        <motion.p
          className="fs-5 text-dark text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Uyo‑Food is more than a delivery service — it’s a celebration of culture, community, and cuisine.
          We connect people with authentic local dishes, delivered fresh and fast.
        </motion.p>

        <div className="row text-center">
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="fw-bold text-danger">
              <i className="fas fa-bullseye me-2 text-dark"></i> Our Mission
            </h3>
            <p className="text-dark">
              To connect people with authentic local dishes, delivered fresh and fast.
            </p>
          </motion.div>
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="fw-bold text-danger">
              <i className="fas fa-eye me-2 text-dark"></i> Our Vision
            </h3>
            <p className="text-dark">
              A world where every household enjoys the warmth of Uyo’s food culture.
            </p>
          </motion.div>
          <motion.div
            className="col-md-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="fw-bold text-danger">
              <i className="fas fa-heart me-2 text-dark"></i> Our Values
            </h3>
            <p className="text-dark">
              Freshness, trust, community, and innovation.
            </p>
          </motion.div>
        </div>

        <div className="text-center mt-4">
          <a
            href="/restaurants"
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold me-3 text-white"
          >
            <i className="fas fa-store me-2"></i> Explore Restaurants
          </a>
          <a
            href="/partner"
            className="btn btn-outline-danger btn-lg rounded-pill shadow fw-bold"
          >
            <i className="fas fa-handshake me-2"></i> Join as a Partner
          </a>
        </div>
      </div>
    </section>
  );
}
