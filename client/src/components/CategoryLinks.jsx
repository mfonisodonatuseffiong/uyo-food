import React from "react";
import "../styles/categories.css";

// ✅ Empty categories array
const categories = [];

export default function CategoryLinks() {
  return (
    <div className="categories-list">
      {categories.map((cat, index) => (
        <span
          key={index}
          className="category-link"
          onClick={() => console.log(`Clicked ${cat.name}`)}
        >
          {cat.icon} {cat.name}
        </span>
      ))}
    </div>
  );
}
