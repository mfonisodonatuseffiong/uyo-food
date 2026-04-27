import { motion } from "framer-motion";
import jollofImg from "../assets/images/gallery/jollof.webp";

export default function DealsPage() {
  return (
    <section className="pb-5 pt-8 bg-warning" id="deals-page">
      <div className="container">
        {/* Gradient Section Title */}
        <motion.h2
          className="text-center fw-bold mb-5 position-relative d-inline-block"
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-tags text-danger me-2"></i> Best Deals of the Week
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

        <div className="row">
          <div className="col-12">
            <motion.div
              className="card mb-3 shadow-lg border-0 rounded-4 overflow-hidden premium-card"
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
                  className="col-12 col-md-6 food-thumbnail" // responsive: full width on mobile
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className="img-fluid w-100 h-100 fit-cover"
                    src={jollofImg}
                    alt="Best Jollof Rice deal of the week" // descriptive alt text
                    style={{ objectFit: "cover", minHeight: "300px" }}
                    loading="lazy" // lazy load for performance
                  />
                </motion.div>

                {/* Text column */}
                <div className="col-12 col-md-6 p-4 p-lg-5 text-center text-md-start">
                  <h2 className="fw-bold text-dark mb-3">
                    Best Deals on <span className="text-danger">Jollof Rice</span>
                  </h2>
                  <p className="fs-5 text-dark mb-4">
                    Nothing brings people together like a plate of Jollof. 
                    Enjoy generous portions at unbeatable prices, 
                    prepared by trusted Uyo restaurants and delivered fresh to your table.
                  </p>
                  <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                    <motion.a
                      className="btn btn-lg btn-danger fw-bold rounded-pill shadow premium-btn"
                      href="/restaurants?dish=Jollof%20Rice&type=delivery"
                      whileHover={{ scale: 1.05 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <i className="fas fa-shopping-cart me-2"></i> Order Now
                    </motion.a>
                    <motion.a
                      className="btn btn-lg btn-dark fw-bold rounded-pill shadow premium-btn"
                      href="/restaurants?type=delivery"
                      whileHover={{ scale: 1.05 }}
                    >
                      <i className="fas fa-arrow-right me-2"></i> View More Deals
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
