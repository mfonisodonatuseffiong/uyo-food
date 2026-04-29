import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";   // ← This was missing!
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Popular search suggestions (You can later connect this to real data)
  const popularSearches = [
    "Afang Soup",
    "Jollof Rice",
    "Edikan Ikong",
    "Atama Soup",
    "Ekpang Nkuwo",
    "Pepper Soup",
    "Fried Rice",
    "Coconut Rice",
    "Chicken Republic",
    "Kilimanjaro",
  ];

  // Filter suggestions as user types
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = popularSearches
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);

      setSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/restaurants");
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/restaurants?dish=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else if (query.trim()) {
        handleSearch(e);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative" ref={searchRef}>
      <form className="row g-2 align-items-center" onSubmit={handleSearch}>
        {/* Search Input */}
        <div className="col-12 col-md-9 position-relative">
          <div className="input-group premium-card shadow-sm">
            <span className="input-group-text bg-transparent border-0 ps-4 text-muted">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 py-3 fw-medium"
              placeholder="Search dishes or restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query.trim() && setShowSuggestions(true)}
            />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="list-group position-absolute w-100 mt-2 shadow-xl rounded-4 overflow-hidden" style={{ zIndex: 1050 }}>
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className={`list-group-item list-group-item-action d-flex align-items-center gap-3 py-3 ${
                    idx === activeIndex ? "active bg-danger text-white" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <i className="fas fa-utensils text-danger"></i>
                  <span className="fw-medium">{suggestion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <div className="col-12 col-md-3 d-grid">
          <motion.button
            type="submit"
            className="btn btn-danger fw-bold py-3 rounded-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Search
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;