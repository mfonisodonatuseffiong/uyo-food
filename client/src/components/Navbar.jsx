import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const collapseRef = useRef(null);

  const closeMenu = () => {
    if (collapseRef.current) {
      collapseRef.current.classList.remove("show");
    }
  };

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
      closeMenu();
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
    closeMenu();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg navbar-light fixed-top shadow-sm ${
          scrolled ? "bg-warning bg-opacity-75 premium-navbar" : "bg-warning premium-navbar"
        }`}
        style={{
          transition: "all 0.3s ease",
          minHeight: "60px",
          paddingTop: "6px",
          paddingBottom: "6px",
        }}
      >
        <div className="container-fluid">

          {/* Brand */}
          <Link to="/" className="navbar-brand brand d-flex align-items-center gap-2">
            <i className="fas fa-utensils text-danger fs-4"></i>
            Uyo Food
          </Link>

          {/* Toggle */}
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse position-relative" id="navbarNav" ref={collapseRef}>
            <button
              className="btn-close position-absolute top-0 end-0 m-3 d-lg-none"
              onClick={closeMenu}
            ></button>

            <ul className="navbar-nav mx-auto align-items-lg-center small">
              <li className="nav-item">
                <Link to="/" className="nav-link fw-bold text-dark premium-link" onClick={closeMenu}>
                  <i className="fas fa-home me-1"></i> Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/restaurants" className="nav-link fw-bold text-dark premium-link" onClick={closeMenu}>
                  <i className="fas fa-store me-1"></i> Restaurants
                </Link>
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
                    />
                  </div>
                </form>

                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                  <ul className="suggestions list-unstyled m-0 p-0">
                    {suggestions.map((s, idx) => (
                      <li
                        key={idx}
                        className={idx === activeIndex ? "active" : ""}
                        onClick={() => handleSelect(s)}
                      >
                        {s.text}
                      </li>
                    ))}
                  </ul>
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
            </ul>

            {/* CTA */}
            <Link
              to="/restaurants"
              className="btn btn-danger fw-bold px-3 py-1 shadow-lg premium-btn"
              style={{ borderRadius: "30px", cursor: "pointer" }}
              onClick={closeMenu}
            >
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* FLOATING CART */}
      <Link to="/cart" className={`floating-cart ${animateCart ? "cart-bounce" : ""}`}>
        <i className="fas fa-shopping-cart"></i>
        {cart.length > 0 && <span className="badge">{cart.length}</span>}
      </Link>
    </>
  );
}

export default Navbar;
