import { motion } from "framer-motion";
import jollofImg from "../assets/images/gallery/jollof.webp";

export default function DealsPage() {
  return (
    <section className="pb-5 pt-8 bg-warning" id="deals-page">
      <div className="container">
        <motion.h2
          className="text-center fw-bold text-dark mb-5"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-tags text-danger me-2"></i> Best Deals of the Week
        </motion.h2>

        <div className="row">
          <div className="col-12">
            <motion.div
              className="card card-span mb-3 shadow-lg border-0 rounded-4 overflow-hidden glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="row g-0 align-items-center">
                {/* Image column */}
                <div className="col-md-6 food-thumbnail">
                  <img
                    className="img-fluid w-100 h-100 fit-cover"
                    src={jollofImg}
                    alt="Jollof Rice"
                    style={{ objectFit: "cover", minHeight: "300px" }}
                  />
                </div>

                {/* Text column */}
                <div className="col-md-6 p-4 p-lg-5 text-center text-md-start">
                  <h2 className="fw-bold text-dark mb-3">
                    Best Deals on <span className="text-danger">Jollof Rice</span>
                  </h2>
                  <p className="fs-5 text-dark mb-4">
                    Nothing brings people together like a plate of Jollof. 
                    Enjoy generous portions at unbeatable prices, 
                    prepared by trusted Uyo restaurants and delivered fresh to your table.
                  </p>
                  <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                    <a
                      className="glass-btn btn btn-lg btn-danger fw-bold rounded-pill"
                      href="/restaurants?dish=Jollof%20Rice&type=delivery"
                    >
                      <i className="fas fa-shopping-cart me-2"></i> Order Now
                    </a>
                    <a
                      className="glass-btn btn btn-lg btn-dark fw-bold rounded-pill"
                      href="/restaurants?type=delivery"
                    >
                      <i className="fas fa-arrow-right me-2"></i> View More Deals
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
