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
        {/* Heading */}
        <motion.h2
          className="text-center fw-bold text-danger mb-4"
          {...fadeUp(0)}
        >
          <i className="fas fa-envelope me-2 text-danger"></i> Get in Touch with Uyo‑Food
        </motion.h2>
        <motion.p
          className="text-center text-dark mb-5"
          {...fadeUp(0.2)}
        >
          Whether you’re a customer craving local dishes, a restaurant partner, or a rider,
          we’d love to hear from you.
        </motion.p>

        {/* Contact Form */}
        <form className="row g-3" action="/api/contact" method="POST">
          <motion.div className="col-md-6" {...fadeUp(0.3)}>
            <input
              type="text"
              name="name"
              className="form-control shadow-sm"
              placeholder="Your Name"
              required
            />
          </motion.div>
          <motion.div className="col-md-6" {...fadeUp(0.4)}>
            <input
              type="email"
              name="email"
              className="form-control shadow-sm"
              placeholder="Your Email"
              required
            />
          </motion.div>
          <motion.div className="col-12" {...fadeUp(0.5)}>
            <textarea
              name="message"
              className="form-control shadow-sm"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </motion.div>
          <motion.div className="col-12 text-center" {...fadeUp(0.6)}>
            <button
              type="submit"
              className="btn btn-danger btn-lg rounded-pill shadow-sm fw-bold"
            >
              <i className="fas fa-paper-plane me-2"></i> Send Message
            </button>
          </motion.div>
        </form>

        {/* Contact Info */}
        <motion.div className="text-center mt-5" {...fadeUp(0.7)}>
          <p className="text-dark mb-1">
            <i className="fas fa-phone-alt me-2 text-danger"></i> +234 806 819 9955
          </p>
          <p className="text-dark mb-1">
            <i className="fas fa-envelope me-2 text-danger"></i> support@uyofood.com
          </p>
          <p className="text-dark">
            <i className="fas fa-map-marker-alt me-2 text-danger"></i> Uyo, Akwa Ibom, Nigeria
          </p>
        </motion.div>
      </div>
    </section>
  );
}
