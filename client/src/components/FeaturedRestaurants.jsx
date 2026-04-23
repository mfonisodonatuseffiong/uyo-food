import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FeaturedRestaurants() {
  const navigate = useNavigate();

  const restaurants = [
    {
      img: "/src/assets/images/gallery/chickenrepublic.webp",
      name: "Chicken Republic",
      description: "Famous for tasty fried chicken, rice bowls, and quick service.",
      highlight: "Jollof Rice & Chicken",
      badge: "🔥 Fast Delivery",
    },
    {
      img: "/src/assets/images/gallery/Afiaefere.webp",
      name: "Kilimanjaro",
      description: "Serving Nigerian classics, pastries, and continental meals.",
      highlight: "Afia Efere Soup",
      badge: "👨‍🍳 Chef’s Pick",
    },
    {
      img: "/src/assets/images/gallery/crunchies.webp",
      name: "Crunchies",
      description: "Popular for fast food, snacks, and family-friendly meals.",
      highlight: "Fried Chicken & Chips",
      badge: "⭐ Family Favourite",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="restaurants">
      <div className="container">
        {/* Section Title */}
        <motion.h2
          className="text-center fw-bold text-dark mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-store me-2 text-danger"></i> Featured Restaurants
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
                className="card shadow h-100 rounded position-relative glass-card"
                onClick={() =>
                  navigate(`/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`)
                }
                style={{ cursor: "pointer" }}
              >
                {/* Badge */}
                <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill shadow">
                  {r.badge}
                </span>

                <div
                  className="food-thumbnail rounded-top overflow-hidden"
                  style={{ height: "220px" }}
                >
                  <img
                    src={r.img}
                    className="card-img-top"
                    alt={r.name}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title text-dark fw-bold">{r.name}</h5>
                  <p className="card-text text-dark flex-grow-1">{r.description}</p>
                  <p className="fw-bold text-danger">{r.highlight}</p>
                  <button
                    className="glass-btn btn btn-danger mt-auto rounded-pill fw-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/restaurants?dish=${encodeURIComponent(r.highlight)}&type=delivery`);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Restaurants Button */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            className="glass-btn btn btn-danger btn-lg rounded-pill fw-bold"
            onClick={() => navigate("/restaurants")}
          >
            <i className="fas fa-arrow-right me-2"></i> View All Restaurants
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedRestaurants;
