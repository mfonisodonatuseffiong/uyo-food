import React from "react";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { label: "Fast Food", value: "fast" },
    { label: "Local Dishes", value: "local" },
    { label: "Popular", value: "popular" },
    { label: "Featured", value: "featured" },
  ];

  return (
    <div className="d-flex justify-content-center mb-4">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className="btn btn-outline-danger mx-2 fw-bold"
          onClick={() => navigate(`/restaurants?category=${cat.value}`)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default Categories;
