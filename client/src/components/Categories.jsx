// src/components/Categories.jsx
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const handleClick = (type) => {
    if (type === "popular") {
      document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" });
    } else if (type === "featured") {
      document.getElementById("restaurants")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // For Fast Food and Local Dishes - navigate with filter
      navigate(`/restaurants?category=${type}`);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
      <button 
        className="btn btn-outline-danger mx-2 fw-bold"
        onClick={() => handleClick("fast")}
      >
        Fast Food
      </button>

      <button 
        className="btn btn-outline-danger mx-2 fw-bold"
        onClick={() => handleClick("local")}
      >
        Local Dishes
      </button>

      <button 
        className="btn btn-outline-danger mx-2 fw-bold"
        onClick={() => handleClick("popular")}
      >
        Popular
      </button>

      <button 
        className="btn btn-outline-danger mx-2 fw-bold"
        onClick={() => handleClick("featured")}
      >
        Featured
      </button>
    </div>
  );
}