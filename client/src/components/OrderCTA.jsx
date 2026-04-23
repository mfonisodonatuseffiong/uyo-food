import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function OrderCTA() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // ❌ Commented out backend fetch for now
    // fetch("/api/featured-dishes")
    //   .then((res) => res.json())
    //   .then((data) => setSlides(data))
    //   .catch((err) => console.error("Error loading featured dishes:", err));

    // ✅ Temporary mock data so frontend works perfectly
    setSlides([
      { id: 1, name: "Afang Soup", image: "/images/afang.jpg" },
      { id: 2, name: "Jollof Rice", image: "/images/jollof.jpg" },
      { id: 3, name: "Ekwang", image: "/images/ekwang.jpg" }
    ]);
  }, []);

  return (
    <section className="py-0 position-relative" id="order-cta">
      {/* Background Carousel */}
      <div
        id="orderCtaCarousel"
        className="carousel slide carousel-fade position-absolute top-0 start-0 w-100 h-100"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#orderCtaCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : "false"}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner h-100">
          {slides.map((dish, idx) => (
            <div
              key={dish.id}
              className={`carousel-item h-100 ${idx === 0 ? "active" : ""}`}
            >
              <img
                src={dish.image}
                className="d-block w-100 h-100"
                alt={dish.name}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#orderCtaCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#orderCtaCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Overlay Content */}
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row flex-center">
          <motion.div
            className="col-12 col-md-10 col-lg-8 py-7 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="fw-bold mb-4 text-white fs-2 fs-md-3">
              <i className="fas fa-utensils me-2 text-warning"></i>
              Taste Uyo’s Best, Delivered Fresh
            </h1>
            <p className="text-white mb-4 fs-6 fs-md-5">
              Discover authentic local dishes and trusted restaurants. 
              Uyo‑Food connects you to the meals you love, at the heart of our community.
            </p>
            <a
              className="btn btn-danger btn-lg fw-bold rounded-pill shadow-sm"
              href="/restaurants?type=delivery"
            >
              ORDER NOW <i className="fas fa-chevron-right ms-2"></i>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 1 }}
      ></div>
    </section>
  );
}
