import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImg1 from "../assets/images/gallery/afang.webp";
import heroImg2 from "../assets/images/gallery/Afiaefere.webp";
import heroImg3 from "../assets/images/gallery/jollof.webp";
import restaurants from "../data/restaurants";

function HeroSection() {
  const images = [heroImg1, heroImg2, heroImg3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [suggestions, setSuggestions] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();

  // Background Carousel
  useEffect(() => {
    setFadeIn(true);

    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setAnimate(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSearchValue(`Near me (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        navigate(`/restaurants?lat=${latitude}&lng=${longitude}&type=${orderType}`);
      },
      (error) => {
        const messages = {
          [error.PERMISSION_DENIED]: "Location permission denied.",
          [error.POSITION_UNAVAILABLE]: "Location information unavailable.",
          [error.TIMEOUT]: "Request timed out.",
        };
        alert(messages[error.code] || "Unable to fetch location.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(searchValue)}&type=${orderType}`);
    } else {
      navigate(`/restaurants?type=${orderType}`);
    }
    setSuggestions([]);
  };

  // Live Suggestions
  useEffect(() => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = searchValue.toLowerCase();
    const matches = [];

    restaurants.forEach((r) => {
      if (r.name.toLowerCase().includes(lower)) matches.push(r.name);
      r.menu?.forEach((item) => {
        if (item.name.toLowerCase().includes(lower)) matches.push(item.name);
      });
    });

    setSuggestions(matches.slice(0, 6));
  }, [searchValue]);

  const categories = [
    { name: "Soups", icon: "🍲" },
    { name: "Rice", icon: "🍛" },
    { name: "Pizza", icon: "🍕" },
    { name: "Ice Cream", icon: "🍨" },
    { name: "Bread", icon: "🍞" },
    { name: "Cake", icon: "🍰" },
    { name: "Drinks", icon: "🥤" },
  ];

  const localFavourites = [
    "Edikan Ikong", "Afia Efere", "Atama Soup", "Ekpang Nkuwo", "Afang"
  ];

  return (
    <section
      id="home"
      className={`position-relative d-flex align-items-center text-white animate__animated ${
        fadeIn ? "animate__fadeIn" : ""
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.58)",
          transition: "all 0.9s ease",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(1.06)",
        }}
      />

      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-black/50" />

      <div className="container position-relative py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-8">
            {/* Badge */}
            <span className="badge bg-danger mb-3 mb-md-4 px-4 py-2 rounded-pill shadow-lg fw-semibold">
              ⚡ Fast Delivery • Uyo
            </span>

            {/* Heading */}
            <h1
              className="fw-bold display-2 display-md-1 mb-3 mb-md-4"
              style={{
                background: "linear-gradient(90deg, #ffc107, #ffffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.05",
              }}
            >
              Taste Local Favourites in{" "}
              <span className="text-warning">Uyo</span>
            </h1>

            <p
              className="lead mb-4 mb-md-5 fw-semibold rounded-pill shadow-sm d-inline-block"
              style={{
                background: "linear-gradient(135deg, #ffc107 0%, #ffcd39 50%, #ffda6a 100%)",
                color: "#b62020",
                padding: "0.75rem 1.6rem",
                fontSize: "1.08rem",
                animation: "glowPulse 2.5s infinite",
              }}
            >
              Discover traditional dishes delivered hot and fresh
            </p>

            {/* Compact Premium Search Card - Fully Responsive */}
            <div
              className="card border-0 shadow-2xl rounded-4 rounded-md-5 mb-5 overflow-hidden mx-auto"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255, 193, 7, 0.4)",
                maxWidth: "580px",           // Controlled width on large screens
              }}
            >
              <div className="p-4 p-md-5 pb-3 pb-md-4">
                {/* Order Type Tabs */}
                <ul className="nav nav-pills nav-justified gap-2 mb-4">
                  <li className="nav-item flex-fill">
                    <button
                      onClick={() => setOrderType("delivery")}
                      className={`nav-link fw-bold py-2.5 py-md-3 rounded-4 text-center ${
                        orderType === "delivery"
                          ? "active bg-danger text-white shadow"
                          : "bg-white text-warning border border-warning-subtle"
                      }`}
                    >
                      <i className="fas fa-motorcycle me-2"></i>
                      Delivery
                    </button>
                  </li>
                  <li className="nav-item flex-fill">
                    <button
                      onClick={() => setOrderType("pickup")}
                      className={`nav-link fw-bold py-2.5 py-md-3 rounded-4 text-center ${
                        orderType === "pickup"
                          ? "active bg-warning text-white shadow"
                          : "bg-white text-warning border border-warning-subtle"
                      }`}
                    >
                      <i className="fas fa-shopping-bag me-2"></i>
                      Pickup
                    </button>
                  </li>
                </ul>

                {/* Search Input */}
                <div className="position-relative">
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0 ps-3 ps-md-4">
                      <i className="fas fa-map-marker-alt text-warning fs-4"></i>
                    </span>
                    <input
                      className="form-control border-0 py-3 fw-medium"
                      placeholder="Find food near you"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      style={{ fontSize: "1.05rem" }}
                    />
                    <button
                      onClick={handleGeoLocation}
                      className="btn btn-outline-warning px-3 px-md-4"
                    >
                      <i className="fas fa-crosshairs"></i>
                    </button>
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100 mt-2 shadow-xl rounded-4 overflow-hidden"
                      style={{ zIndex: 2000, background: "rgba(255,255,255,0.97)" }}
                    >
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          className="list-group-item list-group-item-action border-0 py-3 px-4 fw-medium"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSearchValue(s);
                            navigate(`/restaurants?dish=${encodeURIComponent(s)}&type=${orderType}`);
                            setSuggestions([]);
                          }}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}

                  {searchValue.trim().length > 0 && suggestions.length === 0 && (
                    <div className="position-absolute mt-2 bg-white border rounded-4 shadow-sm p-3 text-muted small w-100">
                      No results found
                    </div>
                  )}
                </div>

                {/* Explore Button */}
                <button
                  onClick={handleSearch}
                  className="btn fw-bold w-100 mt-4 py-3.5 rounded-4 fs-6 fs-md-5"
                  style={{
                    background: "linear-gradient(135deg, #ffc107 0%, #ffcd39 50%, #ffda6a 100%)",
                    color: "#b62020",
                    boxShadow: "0 8px 25px rgba(255,193,7,0.45)",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(255,193,7,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,193,7,0.45)";
                  }}
                >
                  Explore Restaurants
                  <i className="fas fa-chevron-right ms-2" style={{ color: "#fff" }}></i>
                </button>
              </div>
            </div>

            {/* Local Favourites & Categories */}
            <div>
              <h6 className="fw-bold text-light mb-3">Local Favourites</h6>
              <div className="d-flex flex-wrap gap-2 mb-5">
                {localFavourites.map((dish, idx) => (
                  <button
                    key={idx}
                    className="badge bg-danger text-white rounded-pill px-4 py-2.5 border-0 fw-medium premium-badge"
                    onClick={() =>
                      navigate(`/restaurants?dish=${encodeURIComponent(dish)}&type=${orderType}`)
                    }
                  >
                    {dish}
                  </button>
                ))}
              </div>

              <h6 className="fw-bold text-light mb-3">Browse Categories</h6>
              <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 premium-scroll pb-3">
                {categories.map((cat, index) => (
                  <div key={index} className="flex-shrink-0" style={{ minWidth: "130px" }}>
                    <button
                      className="w-100 border-0 rounded-4 category-card premium-card py-4"
                      onClick={() =>
                        navigate(`/restaurants?category=${encodeURIComponent(cat.name)}&type=${orderType}`)
                      }
                    >
                      <div className="fs-1 mb-3">{cat.icon}</div>
                      <div className="fw-bold fs-6">{cat.name}</div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="position-absolute bottom-4 start-50 translate-middle-x text-white d-lg-none">
        <i className="fas fa-chevron-down fa-2x opacity-75"></i>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(255,193,7,0.5); }
          50% { box-shadow: 0 0 25px rgba(255,193,7,0.85); }
        }

        .premium-card:hover {
          transform: translateY(-5px);
        }

        .category-card {
          background: linear-gradient(135deg, #fff8f0, #ffefdb);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          transition: all 0.4s ease;
          text-align: center;
          color: #212529;
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 15px 35px rgba(255, 193, 7, 0.25);
        }

        .premium-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .premium-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 193, 7, 0.6);
          border-radius: 10px;
        }

        /* Mobile Optimizations */
        @media (max-width: 576px) {
          h1 {
            font-size: 2.4rem;
          }
          .card {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;