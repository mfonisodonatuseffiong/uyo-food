import { motion } from "framer-motion";
import jollofImg from "../assets/images/gallery/jollof.webp";
import "../styles/deals.css";

export default function DealsPage() {
  return (
    <section className="deals-section" id="deals-page">
      <div className="container">

        {/* TITLE */}
        <motion.h2
          className="deals-title text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-tags text-danger me-2"></i>
          Best Deals of the Week
        </motion.h2>

        {/* DEAL CARD */}
        <motion.div
          className="deals-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="row g-0 align-items-center">

            {/* IMAGE */}
            <motion.div
              className="col-12 col-md-5 deals-image-wrap"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={jollofImg}
                alt="Best Jollof Rice deal"
                className="deals-image"
                loading="lazy"
              />
            </motion.div>

            {/* CONTENT */}
            <div className="col-12 col-md-7 deals-content">
              <h2 className="deals-heading">
                Best Deals on <span>Jollof Rice</span>
              </h2>

              <p className="deals-text">
                Nothing brings people together like a plate of Jollof.
                Enjoy generous portions at unbeatable prices,
                prepared by trusted Uyo restaurants and delivered fresh.
              </p>

              <div className="deals-actions">
                <motion.a
                  href="/restaurants?dish=Jollof%20Rice&type=delivery"
                  className="btn-deals primary"
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Order Now
                </motion.a>

                <motion.a
                  href="/restaurants?type=delivery"
                  className="btn-deals secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  <i className="fas fa-arrow-right me-2"></i>
                  View More Deals
                </motion.a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}