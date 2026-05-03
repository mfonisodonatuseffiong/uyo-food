import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import restaurants from "../data/restaurants";
import "../styles/navbar.css";

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

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

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

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm ${
        scrolled ? "bg-warning bg-opacity-75 premium-navbar" : "bg-warning premium-navbar"
      }`}
      style={{
        transition: "all 0.3s ease",
        minHeight: "60px",   // ✅ increased height
        paddingTop: "6px",
        paddingBottom: "6px",
      }}
    >
      <div className="container-fluid">

        {/* Brand */}
<a className="navbar-brand brand d-flex align-items-center gap-2" href="/">
  <i className="fas fa-utensils text-danger fs-4"></i>
  Uyo Food
</a>


        {/* Toggle */}
        <button
          className="navbar-toggler custom-toggler"
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
              <a className="nav-link fw-bold text-dark premium-link" href="/">
                <i className="fas fa-home me-1"></i> Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-bold text-dark premium-link" href="/restaurants">
                <i className="fas fa-store me-1"></i> Restaurants
              </a>
            </li>

            {/* Search */}
            <li className="nav-item position-relative">
              <form className="d-flex" onSubmit={handleSearch}>
                <div
                  className="input-group input-group-sm premium-search shadow-sm"
                  style={{
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "20px",
                  }}
                >
                  <span className="input-group-text bg-transparent border-0 px-2">
                    <i className="fas fa-search text-danger"></i>
                  </span>

                  <input
                    className="form-control border-0 form-control-sm bg-transparent"
                    type="search"
                    placeholder="Search dishes or restaurants..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ minWidth: "160px", outline: "none" }}
                  />
                </div>
              </form>

              {/* Suggestions */}
              {suggestions.length > 0 ? (
                <ul
                  className="list-group position-absolute mt-1 shadow-lg premium-dropdown"
                  style={{
                    zIndex: 2000,
                    borderRadius: "10px",
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.95)",
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className={`list-group-item list-group-item-action small ${
                        i === activeIndex ? "bg-light fw-bold" : ""
                      }`}
                      onClick={() => handleSelect(s)}
                      style={{ cursor: "pointer" }}
                    >
                      {highlightMatch(s.text)}{" "}
                      <span className="text-muted small">({s.type})</span>
                    </li>
                  ))}
                </ul>
              ) : query.trim().length > 0 && (
                <div
                  className="position-absolute mt-1 bg-white border rounded shadow-sm px-2 py-1 small text-muted"
                  style={{ zIndex: 2000 }}
                >
                  No results found
                </div>
              )}
            </li>

            {/* Location */}
            <li className="nav-item">
              <div className="d-flex align-items-center text-dark fw-semibold small premium-location">
                <i className="fas fa-map-marker-alt text-success me-1"></i>
                <div>
                  <div className="fw-bold">Deliver to</div>
                  <div>
                    Current Location <span className="text-danger">Uyo</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <a href="/cart" className="nav-link fw-bold text-dark position-relative premium-link">
                <i className="fas fa-shopping-cart me-1"></i> Cart
                {cart.length > 0 && (
                  <span
                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
                      animateCart ? "cart-bounce" : ""
                    }`}
                  >
                    {cart.length}
                  </span>
                )}
              </a>
            </li>

          </ul>

          {/* CTA */}
          <a
            href="/restaurants"
            className="btn btn-danger fw-bold px-3 py-1 shadow-lg premium-btn"
            style={{ borderRadius: "30px" }}
          >
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;