import { motion } from "framer-motion";

export default function Spotlight({ name, tagline, description, image, link }) {
  return (
    <section className="py-4 bg-warning" id="spotlight">
      <motion.div
        className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4 premium-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          backdropFilter: "blur(6px)",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <div className="row g-0 align-items-center">
          {/* Image column */}
          <motion.div
            className="col-12 col-md-4 food-thumbnail" // responsive: full width on mobile
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="img-fluid w-100 h-100 fit-cover"
              src={image}
              alt={`Spotlight dish: ${name}`}   // descriptive alt text
              style={{ objectFit: "cover", minHeight: "220px" }}
              loading="lazy"                   // lazy load for performance
            />
          </motion.div>

          {/* Text column */}
          <motion.div
            className="col-12 col-md-8 p-4 text-center text-md-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4
              className="fw-bold mb-2 position-relative d-inline-block"
              style={{
                background: "linear-gradient(90deg, #dc3545, #ffc107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spotlight: <span className="text-danger">{name}</span>
              <span
                className="position-absolute start-50 translate-middle-x"
                style={{
                  bottom: "-6px",
                  width: "50%",
                  height: "3px",
                  background: "linear-gradient(90deg, #dc3545, #ffc107)",
                  borderRadius: "2px",
                  animation: "pulseUnderline 2s infinite",
                }}
              ></span>
            </h4>
            <p className="text-dark mb-3">{description}</p>
            <motion.a
              className="btn btn-sm btn-danger fw-bold rounded-pill shadow premium-btn"
              href={link}
              whileHover={{ scale: 1.05 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {tagline} <i className="fas fa-chevron-right ms-1"></i>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <style>
        {`
          @keyframes pulseUnderline {
            0% { transform: scaleX(0.8); opacity: 0.6; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0.8); opacity: 0.6; }
          }
          .premium-card {
            transition: transform 0.3s ease;
          }
          .premium-card:hover {
            transform: translateY(-5px);
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
