import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import restaurants from "../data/restaurants";
import "../styles/orderModal.css";

// ── Build outlet map from real restaurants.js data ────────────────────────────
// FIX: use restaurant.id (string like "rest_001") not array index
// FIX: use restaurant.name exactly as it appears in data
const OUTLET_MAP = Object.fromEntries(
  restaurants.map((r) => [r.name, r.id])
);
// Result: { "Esandidia": "rest_001", "Afedndia": "rest_002", ... }

export default function OrderTypeModal({
  isOpen,
  orderType,
  setOrderType,
  onClose,
  // Optional: pre-select a restaurant when opened from RestaurantDetail
  defaultOutlet = "",
}) {
  const navigate     = useNavigate(); // FIX: React Router — no hardcoded localhost
  const [selected,   setSelected]   = useState(defaultOutlet);
  const [loading,    setLoading]    = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [localType,  setLocalType]  = useState(orderType || "delivery");

  const dropdownRef  = useRef(null);
  const firstFocusRef = useRef(null);

  const outletNames = Object.keys(OUTLET_MAP);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(defaultOutlet || "");
      setLoading(false);
      setShowDropdown(false);
      setLocalType(orderType || "delivery");
      // Focus first interactive element for accessibility
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    }
  }, [isOpen, defaultOutlet, orderType]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Trap focus inside modal — close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") { onClose(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleConfirm = useCallback(() => {
    if (!selected) return;

    const restaurantId = OUTLET_MAP[selected];
    if (!restaurantId) return;

    setLoading(true);

    // FIX: use React Router navigate — no window.location, no hardcoded localhost
    // Short delay to show the progress bar, then navigate
    setTimeout(() => {
      setLoading(false);
      onClose();
      navigate(`/restaurant/${restaurantId}?type=${localType}`);
    }, 1000);
  }, [selected, localType, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="om__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="om-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="om__box">

        {/* Header */}
        <div className="om__header">
          <div>
            <h2 className="om__title" id="om-title">
              <i className="fas fa-store" aria-hidden="true"></i>
              Select Restaurant
            </h2>
            <p className="om__subtitle">Choose where you'd like to order from</p>
          </div>
          <button
            className="om__close"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        {/* Outlet dropdown */}
        <div className="om__field" ref={dropdownRef}>
          <label className="om__label" htmlFor="om-outlet-input">
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            Restaurant / Outlet
          </label>
          <div className="om__dropdown-wrap">
            <input
              id="om-outlet-input"
              type="text"
              className="om__input"
              placeholder="Select a restaurant…"
              value={selected}
              readOnly
              onClick={() => setShowDropdown((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={showDropdown}
              aria-controls="om-outlet-list"
              ref={firstFocusRef}
            />
            <i
              className={`fas fa-chevron-down om__dropdown-arrow${showDropdown ? " open" : ""}`}
              aria-hidden="true"
              onClick={() => setShowDropdown((v) => !v)}
            ></i>

            {showDropdown && (
              <ul
                id="om-outlet-list"
                className="om__dropdown-list"
                role="listbox"
                aria-label="Available restaurants"
              >
                {outletNames.map((name) => {
                  const r = restaurants.find((x) => x.name === name);
                  return (
                    <li
                      key={name}
                      className={`om__dropdown-item${selected === name ? " active" : ""}`}
                      role="option"
                      aria-selected={selected === name}
                      onClick={() => { setSelected(name); setShowDropdown(false); }}
                    >
                      <span className="om__item-name">{name}</span>
                      {r && (
                        <span className={`om__item-status${r.isOpen ? " open" : " closed"}`}>
                          {r.isOpen ? "● Open" : "● Closed"}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Order type toggle */}
        <div className="om__field">
          <label className="om__label">
            <i className="fas fa-truck" aria-hidden="true"></i>
            How would you like to receive your order?
          </label>
          <div
            className="om__toggle-group"
            role="group"
            aria-label="Order type"
          >
            <button
              className={`om__toggle-btn${localType === "delivery" ? " active" : ""}`}
              onClick={() => { setLocalType("delivery"); setOrderType?.("delivery"); }}
              aria-pressed={localType === "delivery"}
              type="button"
            >
              <i className="fas fa-motorcycle" aria-hidden="true"></i>
              Delivery
            </button>
            <button
              className={`om__toggle-btn${localType === "pickup" ? " active" : ""}`}
              onClick={() => { setLocalType("pickup"); setOrderType?.("pickup"); }}
              aria-pressed={localType === "pickup"}
              type="button"
            >
              <i className="fas fa-walking" aria-hidden="true"></i>
              Pick Up
            </button>
          </div>
        </div>

        {/* Selected restaurant preview */}
        {selected && (() => {
          const r = restaurants.find((x) => x.name === selected);
          if (!r) return null;
          return (
            <div className="om__preview">
              <img src={r.image} alt={r.name} className="om__preview-img" width="60" height="60" />
              <div className="om__preview-info">
                <span className="om__preview-name">{r.name}</span>
                <span className="om__preview-detail">
                  <i className="fas fa-clock" aria-hidden="true"></i>
                  {r.baseDeliveryTime} min · {r.category}
                </span>
              </div>
              <span className={`om__preview-status${r.isOpen ? " open" : " closed"}`}>
                {r.isOpen ? "Open" : "Closed"}
              </span>
            </div>
          );
        })()}

        {/* Actions */}
        <div className="om__actions">
          <button
            className="om__cancel-btn"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="om__confirm-btn"
            onClick={handleConfirm}
            disabled={loading || !selected}
            type="button"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="om__spinner" aria-hidden="true"></span>
                Loading menu…
              </>
            ) : (
              <>
                <i className="fas fa-bolt" aria-hidden="true"></i>
                Let's Go!
              </>
            )}
          </button>
        </div>

        {/* Progress bar during loading */}
        {loading && (
          <div className="om__progress-bar" aria-hidden="true">
            <div className="om__progress-fill"></div>
          </div>
        )}

      </div>
    </div>
  );
}