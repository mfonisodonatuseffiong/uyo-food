import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchByFood() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const foods = [
    { img: "/src/assets/images/gallery/jollof.webp", name: "Jollof Rice" },
    { img: "/src/assets/images/gallery/afang.webp", name: "Afang Soup" },
    { img: "/src/assets/images/gallery/edikangikong.webp", name: "Edikan Ikong" },
    { img: "/src/assets/images/gallery/Atama.webp", name: "Atama Soup" },
    { img: "/src/assets/images/gallery/ekpang.webp", name: "Ekpang Nkuwo" },
    { img: "/src/assets/images/gallery/Afiaefere.webp", name: "Afia Efere" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(searchTerm)}&type=delivery`);
    } else {
      navigate("/restaurants");
    }
  };

  const handleSuggestionClick = (foodName) => {
    setSearchTerm(foodName);
    setShowSuggestions(false);
    navigate(`/restaurants?dish=${encodeURIComponent(foodName)}&type=delivery`);
  };

  const filteredSuggestions = foods.filter((food) =>
    food.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <section className="py-5 bg-warning" id="search-food">
      <div className="container">
        {/* Section Header */}
        <div className="row flex-center mb-4">
          <div className="col-lg-7">
            <motion.h2
              className="fw-bold fs-3 fs-lg-5 lh-sm text-center text-lg-start mb-3 position-relative d-inline-block"
              style={{
                background: "linear-gradient(90deg, #dc3545, #ffc107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-search me-2 text-danger"></i> Search by Local Food
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
            <p className="text-dark text-center text-lg-start">
              Type or tap a dish to explore restaurants serving your favourite Uyo delicacies.
            </p>
          </div>
          <div className="col-lg-5 text-lg-end text-center position-relative">
            {/* Inline Search Bar */}
            <motion.form
              className="input-group premium-card shadow-sm position-relative"
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                backdropFilter: "blur(6px)",
                background: "rgba(255,255,255,0.85)",
                borderRadius: "30px",
              }}
            >
              <input
                type="text"
                className="form-control border-0 bg-transparent text-dark fw-semibold"
                placeholder="Search for a dish..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                style={{ outline: "none" }}
              />
              <motion.button
                className="btn btn-danger fw-bold rounded-pill px-4"
                type="submit"
                whileHover={{ scale: 1.05 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <i className="fas fa-search me-2"></i> Search
              </motion.button>
            </motion.form>

            {/* Autosuggestions Dropdown */}
            {showSuggestions && searchTerm && (
              <ul
                className="list-group position-absolute w-100 mt-2 shadow-lg"
                style={{
                  zIndex: 10,
                  borderRadius: "10px",
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.95)",
                }}
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((food, idx) => (
                    <li
                      key={idx}
                      className="list-group-item list-group-item-action text-dark fw-semibold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSuggestionClick(food.name)}
                    >
                      <i className="fas fa-utensils me-2 text-danger"></i> {food.name}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">No matches found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Food Grid */}
        <div className="row flex-center">
          {foods.map((food, index) => (
            <motion.div
              key={index}
              className="col-sm-6 col-md-4 col-lg-2 mb-4 h-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="card card-span h-100 shadow-lg d-flex flex-column align-items-center justify-content-center p-3 premium-card"
                style={{
                  cursor: "pointer",
                  backdropFilter: "blur(6px)",
                  background: "rgba(255,255,255,0.85)",
                  transition: "transform 0.3s ease",
                }}
                onClick={() =>
                  navigate(`/restaurants?dish=${encodeURIComponent(food.name)}&type=delivery`)
                }
              >
                <motion.div
                  className="food-thumbnail rounded-circle overflow-hidden shadow-sm"
                  style={{ width: "160px", height: "160px" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={food.img}
                    alt={food.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.div>

                <div className="card-body ps-0 text-center">
                  <h6
                    className="fw-bold text-dark text-truncate mt-3 mb-2"
                    style={{ transition: "color 0.3s ease" }}
                  >
                    {food.name}
                  </h6>
                  <motion.button
                    className="btn btn-danger btn-sm rounded-pill fw-bold shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/restaurants?dish=${encodeURIComponent(food.name)}&type=delivery`);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-1"></i> Quick Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
