import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Import images properly
import afangImg from "../assets/images/gallery/afang.webp";
import friedImg from "../assets/images/gallery/Fried.webp";
import coconutImg from "../assets/images/gallery/coconut.webp";
import pepperImg from "../assets/images/gallery/peppersoup.webp";

function PopularItems() {
  const navigate = useNavigate();

  const featuredDish = {
    img: afangImg,
    title: "Afang Soup",
    text: "Afang Soup is a beloved delicacy in Uyo — rich, hearty, and perfect with fufu.",
  };

  const items = [
    {
      img: friedImg,
      title: "Fried Rice",
      text: "Delicious fried rice with vegetables and chicken, a crowd favorite.",
    },
    {
      img: coconutImg,
      title: "Coconut Rice",
      text: "Fragrant coconut rice served with fish or chicken, rich and tasty.",
    },
    {
      img: pepperImg,
      title: "Pepper Soup",
      text: "Spicy broth with assorted meat, a true Nigerian classic.",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="popular">
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
          <i className="fas fa-star text-danger me-2"></i> Featured Dish of the Week
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

        {/* Featured Dish Spotlight */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden position-relative premium-card">
            {/* Chef Recommendation Badge with animation */}
            <motion.span
              className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              👨‍🍳 Chef’s Recommendation
            </motion.span>

            {/* Spotlight glow */}
            <div
              className="position-absolute w-100 h-100"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,193,7,0.2), transparent 70%)",
                zIndex: 0,
              }}
            ></div>

            <div className="row g-0 position-relative" style={{ zIndex: 1 }}>
              <div className="col-md-5">
                <img
                  src={featuredDish.img}
                  alt={featuredDish.title}
                  className="img-fluid h-100"
                  style={{
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
              <div className="col-md-7 d-flex flex-column justify-content-center p-4 text-center text-md-start">
                <h3 className="fw-bold text-danger">{featuredDish.title}</h3>
                <p className="text-dark">{featuredDish.text}</p>
                <button
                  className="btn btn-warning rounded-pill fw-bold shadow-sm mt-3"
                  onClick={() =>
                    navigate(
                      `/restaurants?dish=${encodeURIComponent(
                        featuredDish.title
                      )}&type=delivery`
                    )
                  }
                >
                  <i className="fas fa-shopping-cart me-2"></i> Order Afang Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Popular Meals */}
        <motion.h3
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-fire text-danger me-2"></i> Other Popular Meals
        </motion.h3>

        <div className="row">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="card shadow h-100 rounded premium-card position-relative overflow-hidden"
                style={{
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.8)",
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={item.img}
                  className="card-img-top rounded-top"
                  alt={item.title}
                  style={{
                    height: "250px",
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
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title text-danger fw-bold">{item.title}</h5>
                  <p className="card-text text-dark flex-grow-1">{item.text}</p>
                  <button
                    className="btn btn-danger mt-auto rounded-pill fw-bold shadow-sm"
                    onClick={() =>
                      navigate(
                        `/restaurants?dish=${encodeURIComponent(
                          item.title
                        )}&type=delivery`
                      )
                    }
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Popular Meals Button with pulse */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Popular Meals
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

export default PopularItems;
