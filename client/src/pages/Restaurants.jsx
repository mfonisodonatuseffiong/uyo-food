import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";

export default function Restaurants() {
  const { addItem } = useCart();

  const featuredRestaurants = restaurants.filter(r => r.rating >= 4.5);

  return (
    <section className="py-5 bg-warning" id="restaurants-page">
      <div className="container">
        {/* Featured Section */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="fw-bold text-center text-dark mb-3">
            🌟 Top Rated Restaurants
          </h2>
          <div className="row">
            {featuredRestaurants.map((restaurant, idx) => (
              <div key={idx} className="col-md-4 col-sm-6 mb-3">
                <div className="card shadow rounded-3 glass-card h-100 position-relative overflow-hidden">
                  <div className="ribbon">{restaurant.tagline}</div>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="card-img-top"
                    style={{ height: "110px", objectFit: "cover" }}
                  />
                  <div className="card-body animated-gradient p-2">
                    <h6 className="fw-bold text-danger mb-1">{restaurant.name}</h6>
                    <p className="text-secondary small mb-1">{restaurant.description}</p>
                    <span className="text-warning fw-bold small">
                      ⭐ {restaurant.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Restaurants Grid */}
        <motion.h2
          className="fw-bold text-center mb-4 text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-store me-2 text-danger"></i> Restaurants & Dishes
        </motion.h2>

        <div className="row">
          {restaurants.map((restaurant, idx) => (
            <motion.div
              key={idx}
              className="col-md-3 col-sm-6 mb-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card shadow-sm rounded-3 glass-card h-100 position-relative overflow-hidden">
                <div className="ribbon">{restaurant.tagline}</div>

                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="card-img-top"
                  style={{ height: "90px", objectFit: "cover" }}
                />

                <div className="d-flex align-items-center mt-n3 ms-2">
                  {restaurant.ownerImage && (
                    <img
                      src={restaurant.ownerImage}
                      alt="Owner"
                      className="rounded-circle border border-2 border-white shadow owner-avatar"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                  )}
                  <span className="fw-bold text-dark ms-2 small">{restaurant.name}</span>
                </div>

                <div className="card-body p-2 animated-gradient">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-warning fw-bold small">
                      {Array.from({ length: Math.floor(restaurant.rating) }).map((_, i) => (
                        <i key={i} className="fas fa-star me-1 star-animate"></i>
                      ))}
                      {restaurant.rating.toFixed(1)}
                    </span>
                    <span className="badge bg-info text-dark small">⏱ 25–30 mins</span>
                  </div>

                  <p className="text-secondary small mb-1">{restaurant.description}</p>

                  <div className="d-flex justify-content-between text-muted small mb-1">
                    <span>
                      <i className="fas fa-map-marker-alt me-1 text-danger"></i>
                      {restaurant.distance} km
                    </span>
                    <span>
                      {restaurant.supportsPickup ? (
                        <i className="fas fa-shopping-bag text-success me-1"></i>
                      ) : (
                        <i className="fas fa-truck text-primary me-1"></i>
                      )}
                      {restaurant.supportsPickup ? "Pickup" : "Delivery"}
                    </span>
                  </div>

                  <h6 className="fw-bold text-danger mt-2 mb-1 small">Popular Dishes:</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {restaurant.menu.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="d-flex justify-content-between align-items-center border rounded-pill px-2 py-1 bg-light small chip-hover"
                        style={{ flex: "1 1 auto" }}
                      >
                        <span className="text-danger fw-bold small">
                          {item.name} <span className="text-warning fw-bold">₦{item.price}</span>
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill ms-2 py-0 px-2"
                          onClick={() =>
                            addItem({
                              restaurant: restaurant.name,
                              dish: item.name,
                              price: item.price,
                              quantity: 1,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 d-flex justify-content-between p-2">
                  <Link to={`/restaurant/${idx}`} className="btn btn-sm btn-outline-dark rounded-pill">
                    View
                  </Link>
                  <button
                    className="btn btn-sm btn-danger rounded-pill"
                    onClick={() =>
                      addItem({
                        restaurant: restaurant.name,
                        dish: restaurant.menu[0].name,
                        price: restaurant.menu[0].price,
                        quantity: 1,
                      })
                    }
                  >
                    Quick +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-3">
          <Link
            to="/cart"
            className="glass-btn fw-bold rounded-pill px-3 py-1"
          >
            Checkout <i className="fas fa-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
