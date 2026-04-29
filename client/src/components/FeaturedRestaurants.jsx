import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    <section className="featured-section py-5" id="restaurants">
      <div className="container">

        {/* Title */}
        <motion.h2
          className="featured-title text-center fw-bold mb-5 position-relative d-inline-block mx-auto"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-store me-2 text-danger"></i>
          Featured Restaurants
          <span className="featured-underline"></span>
        </motion.h2>

        {/* Restaurant Cards */}
        <div className="row g-4">
          {restaurants.map((r, idx) => (
            <motion.div
              key={idx}
              className="col-sm-6 col-lg-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div
                className="restaurant-card h-100 rounded overflow-hidden"
                onClick={() =>
                  navigate(`/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`)
                }
              >
                {/* Badge */}
                <motion.span
                  className="restaurant-badge badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  {r.badge}
                </motion.span>

                {/* Image */}
                <div className="restaurant-img-wrapper">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="restaurant-img"
                  />
                </div>

                {/* Content */}
                <div className="card-body p-4 d-flex flex-column text-center">
                  <h5 className="card-title fw-bold mb-2">{r.name}</h5>
                  <p className="card-text flex-grow-1 mb-3">{r.description}</p>

                  <p className="restaurant-highlight fw-bold text-danger mb-4">
                    {r.highlight}
                  </p>

                  <button
                    className="premium-btn btn btn-danger w-100 rounded-pill fw-bold py-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="premium-btn btn btn-danger btn-lg rounded-pill fw-bold px-5 py-3 shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/restaurants")}
          >
            <i className="fas fa-arrow-right me-2"></i>
            View All Restaurants
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedRestaurants;