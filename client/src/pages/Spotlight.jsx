import { motion } from "framer-motion";

export default function Spotlight({ name, tagline, description, image, link }) {
  return (
    <section className="py-5 bg-warning" id="spotlight">
      <div className="container">
        <motion.div
          className="premium-card shadow-lg border-0 rounded-5 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="row g-0 align-items-center">
            
            {/* Image Side */}
            <motion.div
              className="col-12 col-md-5 col-lg-4"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="spotlight-image-wrapper">
                <img
                  src={image}
                  alt={`${name} - Spotlight Dish`}
                  className="spotlight-image"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              className="col-12 col-md-7 col-lg-8 p-4 p-md-5 text-center text-md-start"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <h4 className="featured-title fw-bold mb-3">
                  Spotlight: <span className="text-danger">{name}</span>
                </h4>
                <p className="text-dark lead mb-4">{description}</p>
              </div>

              <motion.a
                href={link}
                className="premium-btn btn btn-danger rounded-pill fw-bold px-5 py-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                {tagline}
                <i className="fas fa-chevron-right ms-2"></i>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Local Styles */}
      <style>{`
        .spotlight-image-wrapper {
          height: 100%;
          min-height: 320px;
          overflow: hidden;
        }

        .spotlight-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .premium-card:hover .spotlight-image {
          transform: scale(1.08);
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