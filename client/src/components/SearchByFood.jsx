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
    navigate(
      searchTerm.trim()
        ? `/restaurants?dish=${encodeURIComponent(searchTerm)}&type=delivery`
        : "/restaurants"
    );
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
    <section className="search-food-section" id="search-food">
      <div className="container">

        {/* Header */}
        <div className="search-food-header">
          <motion.h2
            className="search-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-search me-2 text-danger"></i>
            Search by Local Food
            <span className="search-title-line"></span>
          </motion.h2>

          <p className="search-subtitle">
            Type or tap a dish to explore restaurants serving your favourite Uyo delicacies.
          </p>
        </div>

        {/* Search Bar */}
        <motion.form
          className="search-bar-wrapper"
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
          />

          <button className="search-btn" type="submit">
            <i className="fas fa-search me-2"></i> Search
          </button>

          {/* Suggestions */}
          {showSuggestions && searchTerm && (
            <ul className="suggestions-box">
              {filteredSuggestions.length ? (
                filteredSuggestions.map((food, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(food.name)}
                  >
                    <i className="fas fa-utensils me-2 text-danger"></i>
                    {food.name}
                  </li>
                ))
              ) : (
                <li className="no-result">No matches found</li>
              )}
            </ul>
          )}
        </motion.form>

        {/* Food Grid */}
        <div className="row g-4 mt-4">
          {foods.map((food, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-4 col-lg-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() =>
                navigate(`/restaurants?dish=${encodeURIComponent(food.name)}&type=delivery`)
              }
            >
              <div className="food-card">
                <div className="food-img-wrapper">
                  <img src={food.img} alt={food.name} />
                </div>

                <h6 className="food-name">{food.name}</h6>

                <button className="quick-order-btn">
                  <i className="fas fa-shopping-cart me-1"></i>
                  Quick Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}