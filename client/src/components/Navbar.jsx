import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [animateCart, setAnimateCart] = useState(false);

  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const lower = query.toLowerCase();
      const matches = [];

      restaurants.forEach((r, idx) => {
        if (r.name.toLowerCase().includes(lower)) {
          matches.push({ text: r.name, type: "restaurant", id: idx });
        }

        r.menu.forEach((item) => {
          if (item.name.toLowerCase().includes(lower)) {
            matches.push({ text: item.name, type: "dish" });
          }
        });
      });

      setSuggestions(matches.slice(0, 5));
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (s) => {
    setQuery(s.text);

    if (s.type === "restaurant") {
      navigate(`/restaurant/${s.id}`);
    } else {
      navigate(`/restaurants?search=${encodeURIComponent(s.text)}`);
    }

    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }
  };

  const highlightMatch = (text) => {
    const lower = query.toLowerCase();
    const index = text.toLowerCase().indexOf(lower);
    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <span className="fw-bold text-danger">
          {text.slice(index, index + query.length)}
        </span>
        {text.slice(index + query.length)}
      </>
    );
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm premium-navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container-fluid">

        {/* Brand */}
        <a className="navbar-brand premium-brand" href="/">
          <i className="fas fa-utensils text-danger me-2"></i>
          Uyo Food
        </a>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav mx-auto align-items-lg-center small">

            <li className="nav-item">
              <a className="nav-link premium-link" href="/">
                <i className="fas fa-home me-1"></i> Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link premium-link" href="/restaurants">
                <i className="fas fa-store me-1"></i> Restaurants
              </a>
            </li>

            {/* Search */}
            <li className="nav-item position-relative">
              <form className="d-flex" onSubmit={handleSearch}>
                <div className="input-group input-group-sm premium-search">
                  <span className="input-group-text bg-transparent border-0">
                    <i className="fas fa-search text-danger"></i>
                  </span>

                  <input
                    className="form-control bg-transparent border-0"
                    type="search"
                    placeholder="Search dishes or restaurants..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </form>

              {suggestions.length > 0 && (
                <ul className="premium-dropdown list-group">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className={`list-group-item ${
                        i === activeIndex ? "active" : ""
                      }`}
                      onClick={() => handleSelect(s)}
                    >
                      {highlightMatch(s.text)}{" "}
                      <span className="text-muted small">({s.type})</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Location */}
            <li className="nav-item">
              <div className="premium-location">
                <i className="fas fa-map-marker-alt text-success me-1"></i>
                <div>
                  <strong>Deliver to</strong><br />
                  Uyo
                </div>
              </div>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <a className="nav-link premium-link position-relative" href="/cart">
                <i className="fas fa-shopping-cart me-1"></i> Cart

                {cart.length > 0 && (
                  <span className={`badge bg-danger ${animateCart ? "bounce" : ""}`}>
                    {cart.length}
                  </span>
                )}
              </a>
            </li>

          </ul>

          {/* CTA */}
          <a href="/restaurants" className="btn premium-btn">
            Order Now
          </a>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;