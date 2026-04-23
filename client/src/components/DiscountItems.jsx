import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function DiscountItems() {
  const navigate = useNavigate();

  // Fade-up animation
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-light" id="discounts">
      <div className="container">
        {/* Section Title */}
        <motion.h2
          className="text-center fw-bold text-danger mb-4"
          {...fadeUp(0)}
        >
          <i className="fas fa-tags me-2 text-warning"></i> Uyo-Food Specials
        </motion.h2>
        <motion.p
          className="text-center text-muted mb-5"
          {...fadeUp(0.2)}
        >
          Enjoy authentic local favourites at unbeatable prices — fresh, hot, and discounted just for you.
        </motion.p>

        <div className="row">
          {/* Vegetable Soup */}
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <motion.div
              className="card shadow h-100 rounded"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/src/assets/images/gallery/vegetable.webp"
                className="card-img-top rounded-top"
                alt="Vegetable Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Vegetable Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Freshly prepared vegetable soup, now{" "}
                  <span className="badge bg-danger text-white">20% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Vegetable Soup&type=delivery")}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Jollof Rice */}
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.4)}>
            <motion.div
              className="card shadow h-100 rounded"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/src/assets/images/gallery/jollof.webp"
                className="card-img-top rounded-top"
                alt="Jollof Rice"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Jollof Rice</h5>
                <p className="card-text text-dark flex-grow-1">
                  Classic Nigerian Jollof with chicken,{" "}
                  <span className="badge bg-danger text-white">15% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Jollof Rice&type=delivery")}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Afang Soup */}
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.5)}>
            <motion.div
              className="card shadow h-100 rounded"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/src/assets/images/gallery/afang.webp"
                className="card-img-top rounded-top"
                alt="Afang Soup"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-warning fw-bold">Afang Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Rich Afang soup served with fufu,{" "}
                  <span className="badge bg-danger text-white">10% OFF</span>
                </p>
                <button
                  className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                  onClick={() => navigate("/restaurants?dish=Afang&type=delivery")}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* View All Discounts Button */}
        <motion.div className="text-center mt-4" {...fadeUp(0.6)}>
          <button
            className="btn btn-warning btn-lg rounded-pill shadow fw-bold"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Discounts
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default DiscountItems;
