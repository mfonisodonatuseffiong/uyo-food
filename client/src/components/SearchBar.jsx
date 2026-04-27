import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="row g-2 mb-4 align-items-center" onSubmit={handleSearch}>
      {/* Input with icon */}
      <div className="col-12 col-md-9 position-relative">
        <span
          className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
          style={{ pointerEvents: "none" }}
        >
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          className="form-control ps-5" // padding-left for icon space
          placeholder="Search for dishes or restaurants..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Button */}
      <div className="col-12 col-md-3 d-grid">
        <button type="submit" className="btn btn-danger fw-bold">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
