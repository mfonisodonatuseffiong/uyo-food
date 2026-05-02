import { useEffect, useState } from "react";
import restaurants from "../data/restaurants";

export const useSearch = (query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const keyword = query.toLowerCase();
    const matches = [];

    restaurants.forEach((res, index) => {
      if (res.name.toLowerCase().includes(keyword)) {
        matches.push({
          label: res.name,
          type: "restaurant",
          id: index,
        });
      }

      res.menu?.forEach((dish) => {
        if (dish.name.toLowerCase().includes(keyword)) {
          matches.push({
            label: dish.name,
            type: "dish",
          });
        }
      });
    });

    setResults(matches.slice(0, 6));
  }, [query]);

  return results;
};