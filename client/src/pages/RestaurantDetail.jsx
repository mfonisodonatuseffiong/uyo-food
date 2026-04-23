import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";

export default function RestaurantDetail() {
  const { id } = useParams(); // restaurant index from URL
  const { addItem } = useCart();

  const restaurant = restaurants[id];
  if (!restaurant) {
    return (
      <section className="py-5 bg-warning">
        <div className="container text-center">
          <p className="fw-bold text-danger">Restaurant not found.</p>
          <Link to="/restaurants" className="btn btn-dark rounded-pill mt-3">
            Back to Restaurants
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-warning" id="restaurant-detail">
      <div className="container">
        {/* Title */}
        <motion.h2
          className="fw-bold text-dark mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-utensils me-2 text-danger"></i> {restaurant.name}
        </motion.h2>

        {/* Banner + Owner Spotlight */}
        <div className="position-relative mb-4">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "250px", objectFit: "cover", width: "100%" }}
          />
          {restaurant.ownerImage && (
            <img
              src={restaurant.ownerImage}
              alt="Owner"
              className="rounded-circle border border-3 border-white shadow-lg position-absolute"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                bottom: "-20px",
                left: "20px",
              }}
            />
          )}
        </div>

        {/* Description */}
        <p className="text-secondary mb-4 text-center">{restaurant.description}</p>

        {/* Extra Info */}
        <div className="d-flex justify-content-around mb-4 text-dark fw-bold">
          <span>
            <i className="fas fa-star text-warning me-1"></i>
            {restaurant.rating} / 5
          </span>
          <span>
            <i className="fas fa-map-marker-alt text-danger me-1"></i>
            {restaurant.distance} km away
          </span>
          <span>
            {restaurant.supportsPickup ? (
              <i className="fas fa-shopping-bag text-success me-1"></i>
            ) : (
              <i className="fas fa-truck text-primary me-1"></i>
            )}
            {restaurant.supportsPickup ? "Pickup Available" : "Delivery Only"}
          </span>
          <span className="badge bg-info text-dark">⏱ 25–30 mins</span>
        </div>

        {/* Menu */}
        <motion.h4
          className="fw-bold text-dark mb-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Menu
        </motion.h4>
        <div className="row mb-4">
          {restaurant.menu.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 col-sm-6 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="card h-100 shadow-sm rounded-3 glass-card">
                <div className="card-body d-flex flex-column justify-content-between p-3">
                  <h6 className="fw-bold text-danger mb-2">{item.name}</h6>
                  <p className="text-warning fw-bold mb-3">₦{item.price}</p>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill mt-auto"
                    onClick={() =>
                      addItem({
                        restaurant: restaurant.name,
                        dish: item.name,
                        price: item.price,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reviews */}
        <motion.h4
          className="fw-bold text-dark mb-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Reviews
        </motion.h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <p className="text-dark mb-1">⭐️⭐️⭐️⭐️☆</p>
              <p className="text-secondary small">“Great food and fast delivery!”</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <p className="text-dark mb-1">⭐️⭐️⭐️⭐️⭐️</p>
              <p className="text-secondary small">“Loved the jollof rice, will order again.”</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-4">
          <Link to="/restaurants" className="btn btn-dark fw-bold rounded-pill px-4">
            Back to Restaurants
          </Link>
          <Link to="/cart" className="btn btn-danger fw-bold rounded-pill px-4 ms-3">
            Go to Cart <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
