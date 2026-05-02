import { useState } from "react";
import StarRating from "./StarRating";

export default function DishCard({ dish }) {
  const [rating, setRating] = useState(dish.rating);

  return (
    <div className="dish-card">
      <div className="dish-image">
        <img src={dish.image} alt={dish.name} />
        <span className="badge">{dish.tag}</span>
      </div>

      <div className="dish-body">
        <h3>{dish.name}</h3>
        <p>{dish.description}</p>

        <div className="dish-footer">
          <span className="price">₦{dish.price}</span>

          {/* ⭐ STAR RATING */}
          <StarRating value={rating} onChange={setRating} />
        </div>
      </div>
    </div>
  );
}