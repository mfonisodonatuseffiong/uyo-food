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

  useEffect(() => {
    setFadeIn(true);

    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setAnimate(true);
      }, 400);
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

        setSearchValue(`Lat:${latitude}, Lng:${longitude}`);

        navigate(
          `/restaurants?lat=${latitude}&lng=${longitude}&type=${orderType}`
        );
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable.");
            break;
          case error.TIMEOUT:
            alert("Request timed out.");
            break;
          default:
            alert("Unable to fetch location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(
        `/restaurants?dish=${encodeURIComponent(
          searchValue
        )}&type=${orderType}`
      );
    } else {
      navigate(`/restaurants?type=${orderType}`);
    }

    setSuggestions([]);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = searchValue.toLowerCase();
    const matches = [];

    restaurants.forEach((r) => {
      if (r.name.toLowerCase().includes(lower)) {
        matches.push(r.name);
      }

      r.menu.forEach((item) => {
        if (item.name.toLowerCase().includes(lower)) {
          matches.push(item.name);
        }
      });
    });

    setSuggestions(matches.slice(0, 5));
  }, [searchValue]);
const categories = [
  { name: "Soups", icon: "🍲" },
  { name: "Rice", icon: "🍛" },
  { name: "Ice Cream", icon: "🍦" },
  { name: "Grills", icon: "🍖" },
  { name: "Swallows", icon: "🥘" },
  { name: "Drinks", icon: "🥤" },
];

  return (
    <section
      id="home"
      className={`position-relative d-flex align-items-center text-dark animate__animated ${
        fadeIn ? "animate__fadeIn" : ""
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(.6)",
          transition: "all .8s ease",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(1.05)",
        }}
      />

      {/* Content */}
      <div className="container position-relative text-center text-lg-start py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-8">
            <span className="badge bg-danger mb-3 px-3 py-2 rounded-pill shadow-lg premium-badge">
              Fast Delivery
            </span>

            <h1
              className="fw-bold display-1 mb-3"
              style={{
                background: "linear-gradient(90deg,#ffc107,#fff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Taste Local Favourites in{" "}
              <span className="text-warning">Uyo</span>
            </h1>

            <p className="lead mb-4 text-danger rounded-pill shadow-sm"
              style={{
                background: "linear-gradient(135deg, #ffc107 0%, #ffcd39 50%, #ffda6a 100%)",
                padding: "0.75rem 1.25rem",
                fontWeight: "600",
                animation: "blinkGlow 2s infinite",
              }}
            >
              Discover traditional dishes delivered hot and fresh.
            </p>

            <style>
              {`
                @keyframes blinkGlow {
                  0% {
                    box-shadow: 0 0 10px rgba(255,193,7,0.4);
                  }
                  50% {
                    box-shadow: 0 0 20px rgba(255,193,7,0.8);
                  }
                  100% {
                    box-shadow: 0 0 10px rgba(255,193,7,0.4);
                  }
                }
              `}
            </style>

            
          
                     {/* Search Card */}
            <div
              className="card border-0 shadow-lg rounded-4 p-4 mb-4 premium-card"
              style={{
                background: "linear-gradient(135deg, rgba(255,193,7,0.25) 0%, rgba(255,193,7,0.4) 100%)", // full warning glass blend
                backdropFilter: "blur(14px) saturate(160%)", // frosted glass effect
                WebkitBackdropFilter: "blur(14px) saturate(160%)",
                border: "1px solid rgba(255,193,7,0.4)",
                color: "#333",
              }}
            >
              <ul className="nav nav-pills nav-justified mb-4">
                <li className="nav-item">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`nav-link fw-bold rounded-pill px-3 py-2 ${
                      orderType === "delivery"
                        ? "active bg-danger text-white shadow-sm"
                        : "bg-light text-warning"
                    }`}
                  >
                    <i className="fas fa-motorcycle me-2 text-warning"></i>
                    Delivery
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`nav-link fw-bold rounded-pill px-3 py-2 ${
                      orderType === "pickup"
                        ? "active bg-warning text-white shadow-sm"
                        : "bg-light text-warning"
                    }`}
                  >
                    <i className="fas fa-shopping-bag me-2 text-warning"></i>
                    Pickup
                  </button>
                </li>
              </ul>

              <div className="d-flex flex-column gap-3 position-relative">
                <div className="input-group premium-search">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-map-marker-alt text-warning"></i>
                  </span>

                  <input
                    className="form-control border-0"
                    placeholder="Find food near you"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />

                  <button
                    onClick={handleGeoLocation}
                    className="btn btn-outline-warning px-3"
                  >
                    <i className="fas fa-crosshairs"></i>
                  </button>

                
                </div>

                {suggestions.length > 0 ? (
                  <ul
                    className="list-group position-absolute mt-1 shadow-lg premium-dropdown"
                    style={{ zIndex: 2000 }}
                  >
                    {suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action small text-warning"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSearchValue(s);
                          navigate(
                            `/restaurants?dish=${encodeURIComponent(
                              s
                            )}&type=${orderType}`
                          );
                          setSuggestions([]);
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  searchValue.trim().length > 0 && (
                    <div className="position-absolute mt-1 bg-light border rounded shadow-sm px-2 py-1 small text-muted">
                      No results found
                    </div>
                  )
                )}
              </div>

                            <button
                onClick={() => navigate(`/restaurants?type=${orderType}`)}
                className="btn fw-bold rounded-pill px-4 mt-3 premium-btn"
                style={{
                  background: "linear-gradient(135deg, #ffc107 0%, #ffcd39 50%, #ffda6a 100%)",
                  color: "#b62020",
                  boxShadow: "0 6px 20px rgba(255,193,7,0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #ffda6a 0%, #ffc107 50%, #ffcd39 100%)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(255,193,7,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #ffc107 0%, #ffcd39 50%, #ffda6a 100%)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(255,193,7,0.4)";
                }}
              >
                Explore Restaurants
                <i
                  className="fas fa-chevron-right ms-2"
                  style={{ color: "#fff" }}
                ></i>
              </button>

            </div>

            {/* Local Favourites */}
            <div>
              <h6 className="fw-bold text-light mb-2">
                Local Favourites
              </h6>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {[
                  "Edikan Ikong",
                  "Afia Efere",
                  "Atama Soup",
                  "Ekpang Nkuwo",
                  "Afang",
                ].map((dish, idx) => (
                  <button
                    key={idx}
                    className="badge bg-danger text-white rounded-pill px-3 py-2 border-0 premium-badge"
                    onClick={() =>
                      navigate(
                        `/restaurants?dish=${encodeURIComponent(
                          dish
                        )}&type=${orderType}`
                      )
                    }
                  >
                    {dish}
                  </button>
                ))}
              </div>

              <h6 className="fw-bold text-light mb-3">
                Browse Categories
              </h6>

              <div className="d-flex flex-row flex-nowrap overflow-auto premium-scroll">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 me-3"
                    style={{ minWidth: "140px" }}
                  >
                    <button
                      className="w-100 border-0 rounded-4 category-card premium-card"
                      onClick={() =>
                        navigate(
                          `/restaurants?category=${encodeURIComponent(
                            cat.name
                          )}&type=${orderType}`
                        )
                      }
                    >
                      <div className="fs-2 mb-2">{cat.icon}</div>

                      <div className="fw-bold">
                        {cat.name}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="position-absolute bottom-3 start-50 translate-middle-x text-white d-lg-none">
        <i className="fas fa-chevron-down fa-2x"></i>
      </div>

      <style>
        {`
        .premium-card{
          transition:.3s;
          border-radius:1rem;
        }

        .premium-card:hover{
          transform:translateY(-5px);
        }

        .premium-search input:focus{
          box-shadow:0 0 8px rgba(220,53,69,.5);
        }

        .premium-dropdown li:hover{
          background:rgba(220,53,69,.1);
        }

        .premium-btn{
          transition:.3s;
        }

        .premium-btn:hover{
          transform:scale(1.05);
          box-shadow:0 0 14px rgba(220,53,69,.5);
        }

        .premium-badge{
          transition:.3s;
        }

        .premium-badge:hover{
          transform:scale(1.05);
        }

        .category-card{
          background:linear-gradient(135deg,#ffefef,#ffe5e5);
          padding:18px;
          transition:.35s;
          box-shadow:0 6px 20px rgba(0,0,0,.08);
          text-align:center;
          color:#212529;
        }

        .category-card:hover{
          transform:translateY(-6px) scale(1.03);
          box-shadow:0 12px 30px rgba(0,0,0,.18);
          background:linear-gradient(135deg,#fff0f0,#ffd6d6);
        }

        .premium-scroll::-webkit-scrollbar{
          height:6px;
        }

        .premium-scroll::-webkit-scrollbar-thumb{
          background:rgba(220,53,69,.5);
          border-radius:3px;
        }
        `}
      </style>
    </section>
  );
}

export default HeroSection;