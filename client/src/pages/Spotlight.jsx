import { motion } from "framer-motion";

export default function Spotlight({ name, tagline, description, image, link }) {
  return (
    <section className="py-4 bg-warning" id="spotlight">
      <motion.div
        className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4 glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="row g-0 align-items-center">
          {/* Image column */}
          <motion.div
            className="col-md-4 food-thumbnail"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              className="img-fluid w-100 h-100 fit-cover"
              src={image}
              alt={name}
              style={{ objectFit: "cover", minHeight: "220px" }}
            />
          </motion.div>

          {/* Text column */}
          <motion.div
            className="col-md-8 p-4 text-center text-md-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="fw-bold text-dark mb-2">
              Spotlight: <span className="text-danger">{name}</span>
            </h4>
            <p className="text-dark mb-3">{description}</p>
            <a
              className="glass-btn btn btn-sm btn-danger fw-bold rounded-pill"
              href={link}
            >
              {tagline} <i className="fas fa-chevron-right ms-1"></i>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
