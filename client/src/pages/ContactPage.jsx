import { motion } from "framer-motion";

export default function Contact() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning text-dark" id="contact">
      <div className="container">
        <motion.h1
          className="fw-bold mb-4 text-center text-danger"
          {...fadeUp(0)}
        >
          <i className="fas fa-envelope me-2 text-danger"></i> Contact Us
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          We’d love to hear from you — whether it’s feedback, partnership inquiries, or just to say hello.
        </motion.p>

        <div className="row text-center">
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-map-marker-alt me-2 text-dark"></i> Address
            </h5>
            <p className="text-dark">Uyo, Akwa Ibom State, Nigeria</p>
          </motion.div>
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.5)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-phone me-2 text-dark"></i> Phone
            </h5>
            <p className="text-dark">+234 800 123 4567</p>
          </motion.div>
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.7)}>
            <h5 className="fw-bold text-danger">
              <i className="fas fa-envelope-open-text me-2 text-dark"></i> Email
            </h5>
            <p className="text-dark">support@uyo-food.com</p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-4" {...fadeUp(0.9)}>
          <a
            href="/partner"
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold me-3 text-white"
          >
            <i className="fas fa-handshake me-2"></i> Become a Partner
          </a>
          <a
            href="/restaurants"
            className="btn btn-outline-danger btn-lg rounded-pill shadow fw-bold"
          >
            <i className="fas fa-store me-2"></i> Explore Restaurants
          </a>
        </motion.div>
      </div>
    </section>
  );
}
