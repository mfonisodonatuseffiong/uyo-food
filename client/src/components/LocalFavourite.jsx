import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dishes from "../data/dishes";

function LocalFavourite() {
  const visibleDishes = dishes.slice(0, 4);

  return (
    <section className="local-favourites-section" id="local-favourites">
      <div className="container">

        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>
            <i className="fas fa-utensils me-2 text-danger"></i>
            Local Favourites
          </h2>
          <p>
            Discover the most loved dishes in Uyo — freshly prepared and always satisfying.
          </p>
        </motion.div>

        {/* Grid */}
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
                <div className="restaurant-card">

                  {/* Tag */}
                  {dish.tag && (
                    <motion.span
                      className="restaurant-tag"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                    >
                      {dish.tag}
                    </motion.span>
                  )}

                  {/* Image */}
                  <div className="restaurant-img-wrap">
                    <motion.img
                      src={dish.image}
                      alt={dish.name}
                      className="restaurant-banner"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="overlay">View Details</div>
                  </div>

                  {/* Content */}
                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-bold">{dish.name}</h6>

                    {dish.price && (
                      <p className="price">₦{dish.price}</p>
                    )}

                    <p>{dish.description}</p>

                    {/* Rating */}
                    <div className="rating">
                      {dish.rating ? (
                        <>
                          {Array.from({ length: Math.floor(dish.rating) }).map((_, i) => (
                            <i key={i} className="fas fa-star text-warning"></i>
                          ))}
                          <small>({dish.rating.toFixed(1)})</small>
                        </>
                      ) : (
                        <small className="no-rating">No ratings yet</small>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="card-footer mt-auto">
                      <motion.button
                        className="restaurant-order-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Order
                      </motion.button>

                      <motion.button
                        className="restaurant-view-btn"
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
    </section>
  );
}

export default LocalFavourite;
