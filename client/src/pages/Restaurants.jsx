import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import restaurants from "../data/restaurants";
import categories from "../data/categories";
import { motion } from "framer-motion";

function Restaurants() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const dish = params.get("dish") || "";
  const type = params.get("type") || "delivery"; // ✅ read order type

  const [visibleCount, setVisibleCount] = useState(6);
  const [sortOption, setSortOption] = useState("rating");
  const [searchTerm, setSearchTerm] = useState(dish);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dismissed, setDismissed] = useState([]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/restaurants?dish=${encodeURIComponent(searchTerm)}&type=${type}`);
  };

  const handleDismiss = (name) => {
    setDismissed((prev) => [...prev, name]);
  };

  // Filter restaurants by name or menu
  let filteredRestaurants = restaurants.filter(
    (r) => !dismissed.includes(r.name)
  );

  // ✅ Apply Delivery/Pickup filter
  if (type === "pickup") {
    filteredRestaurants = filteredRestaurants.filter((r) => r.supportsPickup);
  }

  if (dish) {
    filteredRestaurants = filteredRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(dish.toLowerCase()) ||
        r.menu?.some((item) =>
          item.toLowerCase().includes(dish.toLowerCase())
        )
    );
  }

  if (selectedCategory) {
    filteredRestaurants = filteredRestaurants.filter(
      (r) => r.category === selectedCategory
    );
  }

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "distance") return a.distance - b.distance;
    return 0;
  });

  const noResults = sortedRestaurants.length === 0;

  return (
    <section className="py-5 bg-warning" id="restaurants">
      <div className="container">
        {/* Page Title */}
        <motion.h2
          className="fw-bold text-danger mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {dish
            ? `Restaurants serving "${dish}" (${type})`
            : `All Restaurants (${type})`}
        </motion.h2>

        {/* Search Bar */}
        <motion.form
          className="input-group mb-4"
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="input-group-text bg-warning border-0">
            <i className="fas fa-search text-danger"></i>
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search for a dish or restaurant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-danger fw-bold" type="submit">
            Search
          </button>
        </motion.form>

        {/* Category Filters */}
        <motion.div
          className="d-flex gap-3 mb-4 flex-wrap justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn rounded-pill fw-bold ${
                selectedCategory === cat.name
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.name ? "" : cat.name
                )
              }
            >
              <i className={`${cat.icon} me-2`}></i> {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Restaurant Cards */}
        <div className="row justify-content-center">
          {noResults ? (
            <motion.div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "50vh" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <i className="fas fa-utensils fa-3x text-danger mb-3"></i>
              <div className="alert alert-light fw-bold w-75">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Sorry, no restaurants found for{" "}
                <span className="text-danger">{dish}</span> ({type}).
              </div>
              <button
                className="btn btn-outline-danger fw-bold rounded-pill mt-3"
                onClick={() => navigate(`/restaurants?type=${type}`)}
              >
                Browse All Restaurants
              </button>
            </motion.div>
          ) : (
            sortedRestaurants.slice(0, visibleCount).map((r, idx) => (
              <motion.div
                key={idx}
                className="col-12 col-md-6 col-lg-4 mb-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="card shadow h-100 border-0 position-relative">
                  {/* X Button */}
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-2"
                    aria-label="Close"
                    onClick={() => handleDismiss(r.name)}
                  ></button>

                  <img
                    src={r.image}
                    alt={r.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-danger">{r.name}</h5>
                    <p className="text-muted">{r.description}</p>
                    <div className="mt-auto">
                      <span className="badge bg-warning text-dark me-2">
                        ⭐ {r.rating}
                      </span>
                      <span className="badge bg-info text-dark me-2">
                        ₦{r.price}
                      </span>
                      <span className="badge bg-secondary">
                        {r.distance} km
                      </span>
                      {r.supportsPickup && (
                        <span className="badge bg-success ms-2">Pickup</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <a
                        href={r.link}
                        className="btn btn-danger fw-bold w-75"
                      >
                        <i className="fas fa-shopping-cart me-2"></i> Order Here
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => handleDismiss(r.name)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {!noResults && visibleCount < sortedRestaurants.length && (
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <button
              className="btn btn-outline-danger fw-bold rounded-pill px-4 shadow-sm"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Restaurants;
