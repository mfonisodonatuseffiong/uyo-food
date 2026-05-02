import "../styles/hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants";

function HeroSection() {
  const [searchValue, setSearchValue] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setSearchValue("Near me");
      navigate(`/restaurants?lat=${coords.latitude}&lng=${coords.longitude}&type=${orderType}`);
    });
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(searchValue)}&type=${orderType}`);
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

  const localFavourites = ["Edikan Ikong", "Afia Efere", "Atama Soup", "Ekpang Nkuwo", "Afang"];

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

        <div className="hero-card">
          <div className="toggle-group">
            <button className={orderType === "delivery" ? "active" : ""} onClick={() => setOrderType("delivery")}>
              🚴 Delivery
            </button>
            <button className={orderType === "pickup" ? "active" : ""} onClick={() => setOrderType("pickup")}>
              🛍 Pickup
            </button>
          </div>

          <div className="search-box">
            <input
              placeholder="Search meals, restaurants..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="button" onClick={handleGeoLocation} className="geo-btn" title="Use my location">
              <i className="fas fa-map-marker-alt"></i>
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => setSearchValue(s)}>{s}</li>
              ))}
            </ul>
          )}

          <button className="hero-btn" onClick={handleSearch}>
            Explore Restaurants →
          </button>
        </div>

        <div className="section-title">Browse Categories</div>
        <div className="category-scroll">
          {categories.map((cat, i) => (
            <button key={i} className="category-card" onClick={() => navigate(`/restaurants?category=${cat.name}&type=${orderType}`)}>
              <div className="icon">{cat.icon}</div>
              <div>{cat.name}</div>
            </button>
          ))}
        </div>

        <div className="section-title">Local Favourites</div>
        <div className="favourites">
          {localFavourites.map((dish, i) => (
            <button key={i} className="pill" onClick={() => navigate(`/restaurants?dish=${dish}&type=${orderType}`)}>
              {dish}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
