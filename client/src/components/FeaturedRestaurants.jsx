import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Import images properly
import chickenImg from "../assets/images/gallery/chickenrepublic.webp";
import kilimanjaroImg from "../assets/images/gallery/Afiaefere.webp";
import crunchiesImg from "../assets/images/gallery/crunchies.webp";

function FeaturedRestaurants() {
  const navigate = useNavigate();

  const restaurants = [
    {
      img: chickenImg,
      name: "Chicken Republic",
      description: "Famous for tasty fried chicken, rice bowls, and quick service.",
      highlight: "Jollof Rice & Chicken",
      badge: "🔥 Fast Delivery",
    },
    {
      img: kilimanjaroImg,
      name: "Kilimanjaro",
      description: "Serving Nigerian classics, pastries, and continental meals.",
      highlight: "Afia Efere Soup",
      badge: "👨‍🍳 Chef’s Pick",
    },
    {
      img: crunchiesImg,
      name: "Crunchies",
      description: "Popular for fast food, snacks, and family-friendly meals.",
      highlight: "Fried Chicken & Chips",
      badge: "⭐ Family Favourite",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="restaurants">
      <div className="container">
        {/* Gradient Section Title */}
        <motion.h2
          className="text-center fw-bold mb-4 position-relative d-inline-block"
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
          <i className="fas fa-store me-2 text-danger"></i> Featured Restaurants
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

        {/* Restaurant Cards */}
        <div className="row">
          {restaurants.map((r, idx) => (
            <motion.div
              key={idx}
              className="col-sm-6 col-md-4 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="card shadow h-100 rounded position-relative premium-card overflow-hidden"
                style={{
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.85)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(
                    `/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`
                  )
                }
              >
                {/* Animated Badge */}
                <motion.span
                  className="badge bg-danger position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill shadow"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {r.badge}
                </motion.span>

                {/* Image with hover zoom */}
                <div
                  className="food-thumbnail rounded-top overflow-hidden"
                  style={{ height: "220px" }}
                >
                  <img
                    src={r.img}
                    className="card-img-top"
                    alt={r.name}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>

                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title text-dark fw-bold">{r.name}</h5>
                  <p className="card-text text-dark flex-grow-1">{r.description}</p>
                  <p
                    className="fw-bold text-danger"
                    style={{ textShadow: "0 0 6px rgba(220,53,69,0.6)" }}
                  >
                    {r.highlight}
                  </p>
                  <button
                    className="glass-btn btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`
                      );
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Restaurants Button with pulse */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="glass-btn btn btn-danger btn-lg rounded-pill fw-bold shadow"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => navigate("/restaurants")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Restaurants
          </motion.button>
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

export default FeaturedRestaurants;
