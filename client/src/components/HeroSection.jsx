import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImg1 from "../assets/images/gallery/afang.webp";
import heroImg2 from "../assets/images/gallery/Afiaefere.webp";
import heroImg3 from "../assets/images/gallery/jollof.webp";

function HeroSection() {
  const images = [heroImg1, heroImg2, heroImg3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [orderType, setOrderType] = useState("delivery"); // ✅ Delivery/Pickup state
  const navigate = useNavigate();

  useEffect(() => {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchValue(`Lat: ${latitude}, Lng: ${longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch your location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearch = () => {
    const query = searchValue.trim()
      ? `/restaurants?dish=${encodeURIComponent(searchValue)}&type=${orderType}`
      : `/restaurants?type=${orderType}`;
    navigate(query);
  };

  return (
    <section
      id="home"
      className="position-relative d-flex align-items-center text-dark"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
          transition: "all 0.8s ease",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(1.05)",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="container position-relative text-center text-lg-start py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">

            {/* Badge */}
            <span className="badge bg-danger mb-3 px-3 py-2 rounded-pill shadow animate__animated animate__fadeInDown">
              Fast Delivery
            </span>

            {/* Heading */}
            <h1 className="fw-bold display-4 mb-3 text-white animate__animated animate__fadeInUp animate__delay-1s">
              Taste Local Favourites in <span className="text-warning">Uyo</span>
            </h1>

            {/* Subtext */}
            <p className="lead mb-4 text-light animate__animated animate__fadeInUp animate__delay-1s">
              Discover traditional dishes and enjoy them delivered hot and fresh from your favourite restaurants.
            </p>

            {/* Delivery / Pickup Tabs */}
            <div className="card border-0 shadow-lg rounded-4 p-4 bg-white mb-4 animate__animated animate__fadeInUp animate__delay-2s">
              <ul className="nav nav-pills nav-justified mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link fw-bold rounded-pill px-3 py-2 ${
                      orderType === "delivery"
                        ? "active bg-danger text-white"
                        : "bg-light text-dark"
                    }`}
                    onClick={() => setOrderType("delivery")}
                  >
                    <i className="fas fa-motorcycle me-2"></i> Delivery
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link fw-bold rounded-pill px-3 py-2 ${
                      orderType === "pickup"
                        ? "active bg-warning text-white"
                        : "bg-light text-dark"
                    }`}
                    onClick={() => setOrderType("pickup")}
                  >
                    <i className="fas fa-shopping-bag me-2"></i> Pickup
                  </button>
                </li>
              </ul>

              {/* Input + Buttons */}
              <div className="d-flex flex-column gap-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0 rounded-start">
                    <i className="fas fa-map-marker-alt text-danger"></i>
                  </span>
                  <input
                    className="form-control border-0"
                    placeholder="Find food near you"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary px-3"
                    title="Use my location"
                    onClick={handleGeoLocation}
                  >
                    <i className="fas fa-crosshairs"></i>
                  </button>
                  <button
                    className="btn btn-danger px-4 rounded-end fw-bold"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search me-2"></i> Find Food
                  </button>
                </div>

                <button
                  className="btn btn-warning fw-bold rounded-pill px-4 shadow"
                  onClick={() => navigate(`/restaurants?type=${orderType}`)}
                >
                  Explore Restaurants <i className="fas fa-chevron-right ms-2"></i>
                </button>
              </div>
            </div>

            {/* Local Favourites */}
            <div>
              <h6 className="fw-bold text-light mb-2">Local Favourites:</h6>
              <div className="d-flex flex-wrap gap-2">
                {["Edikan Ikong", "Afia Efere", "Atama Soup", "Ekpang Nkuwo", "Afang"].map((dish, idx) => (
                  <button
                    key={idx}
                    className="badge bg-danger text-white rounded-pill px-3 py-2 shadow-sm border-0 favourite-badge animate__animated animate__fadeInUp animate__delay-3s"
                    onClick={() =>
                      navigate(`/restaurants?dish=${encodeURIComponent(dish)}&type=${orderType}`)
                    }
                  >
                    {dish}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator (mobile only) */}
      <div className="position-absolute bottom-3 start-50 translate-middle-x text-white d-lg-none">
        <i className="fas fa-chevron-down fa-2x"></i>
      </div>
    </section>
  );
}

export default HeroSection;
