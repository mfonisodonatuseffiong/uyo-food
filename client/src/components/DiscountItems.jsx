import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Import images instead of hardcoding /src paths
import vegetableImg from "../assets/images/gallery/vegetable.webp";
import jollofImg from "../assets/images/gallery/jollof.webp";
import afangImg from "../assets/images/gallery/afang.webp";

function DiscountItems() {
  const navigate = useNavigate();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-light" id="discounts">
      <div className="container">
        {/* Section Title with gradient + underline */}
        <motion.div
          className="text-center mb-4 position-relative d-inline-block"
          {...fadeUp(0)}
          style={{
            background: "linear-gradient(90deg, #dc3545, #ffc107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          <h2 className="fw-bold display-5">
            <i className="fas fa-tags me-2"></i> Uyo-Food Specials
          </h2>
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
        </motion.div>

        <motion.p className="text-center text-muted mb-5" {...fadeUp(0.2)}>
          Enjoy authentic local favourites at unbeatable prices — fresh, hot, and discounted just for you.
        </motion.p>

        <div className="row">
          {/* Vegetable Soup */}
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <motion.div
              className="card shadow h-100 rounded premium-card position-relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="position-relative" style={{ height: "220px" }}>
                <img
                  src={vegetableImg}
                  className="card-img-top rounded-top"
                  alt="Vegetable Soup"
                  style={{ height: "100%", objectFit: "cover" }}
                />
                <div
                  className="overlay d-flex align-items-center justify-content-center"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    fontWeight: "bold",
                    opacity: 0,
                    transition: "opacity 0.4s ease-in-out",
                  }}
                >
                  View Details
                </div>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-danger fw-bold">Vegetable Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Freshly prepared vegetable soup, now{" "}
                  <span className="badge bg-warning text-dark">20% OFF</span>
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
              className="card shadow h-100 rounded premium-card position-relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="position-relative" style={{ height: "220px" }}>
                <img
                  src={jollofImg}
                  className="card-img-top rounded-top"
                  alt="Jollof Rice"
                  style={{ height: "100%", objectFit: "cover" }}
                />
                <div
                  className="overlay d-flex align-items-center justify-content-center"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    fontWeight: "bold",
                    opacity: 0,
                    transition: "opacity 0.4s ease-in-out",
                  }}
                >
                  View Details
                </div>
              </div>
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
              className="card shadow h-100 rounded premium-card position-relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="position-relative" style={{ height: "220px" }}>
                <img
                  src={afangImg}
                  className="card-img-top rounded-top"
                  alt="Afang Soup"
                  style={{ height: "100%", objectFit: "cover" }}
                />
                <div
                  className="overlay d-flex align-items-center justify-content-center"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.4)",
                    color: "#fff",
                    fontWeight: "bold",
                    opacity: 0,
                    transition: "opacity 0.4s ease-in-out",
                  }}
                >
                  View Details
                </div>
              </div>
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-danger fw-bold">Afang Soup</h5>
                <p className="card-text text-dark flex-grow-1">
                  Rich Afang soup served with fufu,{" "}
                  <span className="badge bg-warning text-dark">10% OFF</span>
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
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Discounts
          </button>
        </motion.div>
      </div>

      <style>
        {`
          @keyframes pulseUnderline {
            0% { transform: scaleX(0.8); opacity: 0.6; }
            50% { transform: scaleX(1); opacity: 1; }
            100% { transform: scaleX(0.8); opacity: 0.6; }
          }
        `}
      </style>
    </section>
  );
}

export default DiscountItems;
