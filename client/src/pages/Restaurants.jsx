import "../styles/Restaurants.css";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useMemo, useState } from "react";
import restaurants from "../data/restaurants";
import Categories from "../components/Categories";

export default function Restaurants() {
  const { cart, addItem } = useCart();
  const location = useLocation();

  const [address, setAddress] = useState("");

  const params = new URLSearchParams(location.search);
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));
  const orderType = params.get("type") || "delivery";

  const validCoords = !isNaN(lat) && !isNaN(lng);

  // =========================
  // OPEN STATUS (BACKEND READY PLACEHOLDER)
  // =========================
  const getOpenStatus = (restaurant) => {
    const hour = new Date().getHours();

    // backend will override this later
    if (restaurant.supportsPickup === false) return false;

    return hour >= 7 && hour <= 22;
  };

  // =========================
  // GEO LOCATION
  // =========================
  useEffect(() => {
    if (!validCoords) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await res.json();

        setAddress(
          data?.display_name ||
            `Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`
        );
      } catch {
        setAddress(`Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`);
      }
    };

    fetchAddress();
  }, [lat, lng, validCoords]);

  // =========================
  // CART TOTAL
  // =========================
  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }, [cart]);

  // =========================
  // DISTANCE CALC
  // =========================
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  // =========================
  // PREPARE RESTAURANTS (CLEAN DATA LAYER)
  // =========================
  const enrichedRestaurants = useMemo(() => {
    let list = [...restaurants];

    if (validCoords) {
      list = list.map((r) => {
        const distance = getDistance(lat, lng, r.lat, r.lng);
        const eta = Math.max(12, Math.round(distance * 7));

        return {
          ...r,
          distance: distance.toFixed(1),
          eta,
          isOpen: getOpenStatus(r),
          isTopRated: r.rating >= 4.5,
        };
      });

      // SMART SORT (Uber-style ranking)
      list.sort((a, b) => {
        const scoreA = a.eta * 0.6 + (5 - a.rating) * 10;
        const scoreB = b.eta * 0.6 + (5 - b.rating) * 10;
        return scoreA - scoreB;
      });
    }

    return list;
  }, [lat, lng, validCoords]);

  return (
    <section className="py-5 bg-warning" id="restaurants-page">
      <div className="container">

        {/* LOCATION */}
        {validCoords && (
          <div className="location-banner">
            📍 {address || "Detecting location..."} ({orderType})
          </div>
        )}

        {/* TITLE */}
        <motion.h2
          className="text-center fw-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          🍽 Restaurants Near You
        </motion.h2>

        <Categories />

        {/* GRID */}
        <div className="row">
          {enrichedRestaurants.map((restaurant, idx) => (
            <motion.div
              key={restaurant.name}
              className="col-md-3 col-sm-6 mb-4 d-flex"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <div className="restaurant-card">

                {/* TAG */}
                <div className="restaurant-tag">
                  {restaurant.tagline}
                </div>

                {/* IMAGE */}
                <div className="restaurant-img-wrap">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-banner"
                  />
                </div>

                {/* BODY */}
                <div className="card-body">

                  {/* NAME + STATUS */}
                  <div className="d-flex justify-content-between align-items-start">

                    <div>
                      <div className={`fw-bold ${restaurant.isTopRated ? "top-rated" : ""}`}>
                        {restaurant.name}
                      </div>

                      <small>⭐ {restaurant.rating}</small>
                    </div>

                    <span className={`status-badge ${restaurant.isOpen ? "open" : "closed"}`}>
                      {restaurant.isOpen ? "Open now" : "Closed"}
                    </span>

                  </div>

                  {/* META */}
                  <div className="meta-row">
                    <span>⏱ {restaurant.eta} min</span>
                    <span>📍 {restaurant.distance} km</span>
                  </div>

                  {/* DESCRIPTION */}
                  <p>{restaurant.description}</p>

                  {/* MENU */}
                  <div className="menu-list">
                    {restaurant.menu.slice(0, 2).map((item, i) => (
                      <div key={i} className="popular-dish-item">

                        <div>{item.name}</div>

                        <button
                          onClick={() =>
                            addItem({
                              restaurant: restaurant.name,
                              dish: item.name,
                              price: item.price,
                              quantity: 1,
                            })
                          }
                          className="dish-add-btn"
                        >
                          +
                        </button>

                      </div>
                    ))}
                  </div>

                </div>

                {/* FOOTER */}
                <div className="card-footer">

                  <Link
                    to={`/restaurant/${idx}`}
                    className="restaurant-view-btn"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      addItem({
                        restaurant: restaurant.name,
                        dish: restaurant.menu[0].name,
                        price: restaurant.menu[0].price,
                        quantity: 1,
                      })
                    }
                    className="restaurant-order-btn"
                  >
                    Quick +
                  </button>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CART */}
        {cart.length > 0 && (
          <div className="floating-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">
              {cart.length} {cart.length === 1 ? "item" : "items"} | ₦{subtotal}
            </span>
            <Link to="/cart" className="btn btn-light btn-sm ms-2">
              View Cart
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}