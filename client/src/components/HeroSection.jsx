import "../styles/hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

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
    "Edikan Ikong",
    "Afia Efere",
    "Atama Soup",
    "Ekpang Nkuwo",
    "Afang",
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container hero-content pt-5 mt-5">

        <span className="hero-badge">⚡ Fast Delivery • Uyo</span>

        <h1 className="hero-title">
          Order Local & Popular Meals in <span>Uyo</span>
        </h1>

        <p className="hero-subtitle">
          Fresh dishes from trusted restaurants, delivered hot and fast
        </p>

        {/* =========================
            MAIN ACTION (DELIVERY ENTRY POINT)
        ========================== */}
        <div className="hero-card">

          <button
            className="hero-main-btn"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            Start Ordering →
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() => navigate("/restaurants?type=delivery")}
          >
            Browse Restaurants
          </button>

        </div>

        {/* =========================
            CATEGORIES
        ========================== */}
        <div className="section-title">Browse Categories</div>

        <div className="category-scroll">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="category-card"
              onClick={() =>
                navigate(
                  `/restaurants?category=${cat.name}&type=delivery`
                )
              }
            >
              <div className="icon">{cat.icon}</div>
              <div>{cat.name}</div>
            </button>
          ))}
        </div>

        {/* =========================
            LOCAL FAVOURITES
        ========================== */}
        <div className="section-title">Local Favourites</div>

        <div className="favourites">
          {localFavourites.map((dish, i) => (
            <button
              key={i}
              className="pill"
              onClick={() =>
                navigate(`/restaurants?dish=${dish}&type=delivery`)
              }
            >
              {dish}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroSection;