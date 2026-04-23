import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg404 from "../assets/images/gallery/jollof.webp"; // reuse hero image

function NotFound() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleBackHome = () => {
    // Trigger fade-out animation
    setFadeOut(true);

    // After animation, navigate and scroll to hero
    setTimeout(() => {
      navigate("/");
      setTimeout(() => {
        const hero = document.getElementById("home");
        if (hero) {
          hero.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }, 600); // match fade-out duration
  };

  return (
    <section
      className={`position-relative d-flex align-items-center text-center text-white animate__animated ${
        fadeOut ? "animate__fadeOut" : "animate__fadeIn"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${heroImg404})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="container position-relative">
        <h1 className="fw-bold display-1 animate__animated animate__fadeInDown">
          404
        </h1>
        <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={handleBackHome}
          className="btn btn-warning fw-bold rounded-pill px-4 shadow animate__animated animate__fadeInUp animate__delay-2s"
        >
          Back to Home <i className="fas fa-home ms-2"></i>
        </button>
      </div>

      {/* Scroll Indicator (mobile only) */}
      <div className="position-absolute bottom-3 start-50 translate-middle-x text-white d-lg-none">
        <i className="fas fa-chevron-down fa-2x"></i>
      </div>
    </section>
  );
}

export default NotFound;
