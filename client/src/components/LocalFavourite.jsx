import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dishes from "../data/dishes";

function LocalFavourite() {
  const visibleDishes = dishes.slice(0, 4);

  return (
    <section className="py-5 bg-warning" id="local-favourites">
      <div className="container">

        {/* Section Title */}
        <motion.h2
          className="featured-title text-center fw-bold mb-5 position-relative d-inline-block mx-auto"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-utensils me-2 text-danger"></i>
          Local Favourites
        </motion.h2>

        {/* Dishes Grid */}
        <div className="row g-4">
          {visibleDishes.map((dish, idx) => (
            <motion.div
              key={idx}
              className="col-lg-3 col-md-4 col-sm-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/restaurants?dish=${encodeURIComponent(dish.name)}`}
                className="text-decoration-none"
              >
                <div className="restaurant-card h-100 premium-card overflow-hidden position-relative">
                  
                  {/* Image Container */}
                  <div className="food-thumbnail position-relative" style={{ height: "180px" }}>
                    <motion.img
                      src={dish.image}
                      alt={dish.name}
                      className="restaurant-img w-100 h-100"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Tag Badge */}
                    {dish.tag && (
                      <motion.span
                        className="badge bg-danger position-absolute top-0 start-0 m-3 rounded-pill shadow-sm fw-medium"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                      >
                        {dish.tag}
                      </motion.span>
                    )}

                    {/* Hover Overlay */}
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <span className="text-white fw-bold fs-6">View Details</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-body p-4 d-flex flex-column">
                    <h6 className="card-title fw-bold mb-2 text-dark">{dish.name}</h6>

                    {dish.price && (
                      <p className="text-warning fw-bold mb-2 small">₦{dish.price}</p>
                    )}

                    <p className="card-text text-secondary small flex-grow-1 mb-3 line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Rating */}
                    <div className="mb-3">
                      {dish.rating ? (
                        <>
                          {Array.from({ length: Math.floor(dish.rating) }).map((_, i) => (
                            <i key={i} className="fas fa-star text-warning me-1" />
                          ))}
                          <span className="small text-muted ms-1">
                            {dish.rating.toFixed(1)}
                          </span>
                        </>
                      ) : (
                        <span className="small text-muted">No ratings yet</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-auto">
                      <motion.button
                        className="premium-btn btn btn-danger flex-grow-1 rounded-pill fw-bold py-2.5"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Order
                      </motion.button>

                      <motion.button
                        className="btn btn-outline-danger rounded-pill px-3 fw-bold"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Styles for this section */}
      <style>{`
        .food-thumbnail {
          overflow: hidden;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .restaurant-card:hover .overlay {
          opacity: 1;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .premium-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .premium-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}

export default LocalFavourite;