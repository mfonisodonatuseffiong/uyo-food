import { useState } from "react";

export default function StarRating({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || value);

        return (
          <span
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            style={{
              fontSize: "18px",
              color: active ? "#ffc107" : "#ddd",
              transition: "0.2s",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}