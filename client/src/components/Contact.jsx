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
          className="text-center fw-bold mb-4 position-relative d-inline-block"
          {...fadeUp(0)}
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <i className="fas fa-envelope me-2 text-danger"></i> Get in Touch with Uyo‑Food
          <span
            className="position-absolute start-50 translate-middle-x"
            style={{
              bottom: "-8px",
              width: "60%",
              height: "4px",
              background: "linear-gradient(90deg, #dc3545, #ffc107)",
              borderRadius: "2px",
              animation: "pulseUnderline 2s infinite",
            }}
          ></span>
        </motion.h2>

        <motion.p className="text-center text-dark mb-5" {...fadeUp(0.2)}>
          Whether you’re a customer craving local dishes, a restaurant partner, or a rider,
          we’d love to hear from you.
        </motion.p>

        {/* Contact Form */}
        <form className="row g-3 premium-form" action="/api/contact" method="POST">
          <motion.div className="col-md-6" {...fadeUp(0.3)}>
            <input
              type="text"
              name="name"
              className="form-control shadow-sm rounded-pill premium-input"
              placeholder="Your Name"
              required
            />
          </motion.div>
          <motion.div className="col-md-6" {...fadeUp(0.4)}>
            <input
              type="email"
              name="email"
              className="form-control shadow-sm rounded-pill premium-input"
              placeholder="Your Email"
              required
            />
          </motion.div>
          <motion.div className="col-12" {...fadeUp(0.5)}>
            <textarea
              name="message"
              className="form-control shadow-sm premium-input"
              rows="5"
              placeholder="Your Message"
              required
              style={{ borderRadius: "20px" }}
            ></textarea>
          </motion.div>
          <motion.div className="col-12 text-center" {...fadeUp(0.6)}>
            <motion.button
              type="submit"
              className="btn btn-danger btn-lg rounded-pill shadow fw-bold premium-btn"
              whileHover={{ scale: 1.05 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <i className="fas fa-paper-plane me-2"></i> Send Message
            </motion.button>
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

      <style>
        {`
          @keyframes pulseUnderline {
            0% { transform: scaleX(0.8); opacity: 0.6; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0.8); opacity: 0.6; }
          }
          .premium-form .premium-input {
            transition: box-shadow 0.3s ease;
          }
          .premium-form .premium-input:focus {
            box-shadow: 0 0 10px rgba(220, 53, 69, 0.5);
          }
          .premium-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .premium-btn:hover {
            box-shadow: 0 0 12px rgba(220, 53, 69, 0.6);
          }
        `}
      </style>
    </section>
  );
}
