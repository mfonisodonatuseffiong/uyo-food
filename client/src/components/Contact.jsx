import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-5 bg-warning text-dark" id="contact">
      <div className="container">

        {/* Section Title */}
        <motion.h2
          className="featured-title text-center fw-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-envelope me-2 text-danger"></i> 
          Get in Touch with Uyo‑Food
        </motion.h2>

        <motion.p 
          className="text-center lead mb-5 col-lg-8 mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you’re a customer craving local dishes, a restaurant partner, 
          or a rider — we’d love to hear from you.
        </motion.p>

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <motion.form
              className="premium-form"
              action="/api/contact"
              method="POST"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control premium-input rounded-4 py-3"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control premium-input rounded-4 py-3"
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control premium-input rounded-4 py-3"
                    rows="6"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-3">
                  <motion.button
                    type="submit"
                    className="premium-btn btn btn-danger btn-lg rounded-pill fw-bold px-5 py-3 shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                  >
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Message
                  </motion.button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Contact Information */}
        <motion.div 
          className="text-center mt-5 pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-center gap-4 gap-md-5">
            <p className="mb-2">
              <i className="fas fa-phone-alt me-2 text-danger"></i>
              +234 806 819 9955
            </p>
            <p className="mb-2">
              <i className="fas fa-envelope me-2 text-danger"></i>
              support@uyofood.com
            </p>
            <p>
              <i className="fas fa-map-marker-alt me-2 text-danger"></i>
              Uyo, Akwa Ibom, Nigeria
            </p>
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .premium-form .premium-input {
          border: 2px solid rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
        }

        .premium-form .premium-input:focus {
          border-color: #dc3545;
          box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.15);
          background: white;
        }

        .premium-btn {
          transition: all 0.4s ease;
        }

        .premium-btn:hover {
          box-shadow: 0 10px 25px rgba(220, 53, 69, 0.4);
        }

        @keyframes pulseUnderline {
          0% { transform: scaleX(0.8); opacity: 0.6; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0.8); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}