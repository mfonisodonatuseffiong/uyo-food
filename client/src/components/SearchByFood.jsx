import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchByFood() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const foods = [
    { img: "/src/assets/images/gallery/jollof.webp", name: "Jollof Rice" },
    { img: "/src/assets/images/gallery/afang.webp", name: "Afang Soup" },
    { img: "/src/assets/images/gallery/edikangikong.webp", name: "Edikan Ikong" },
    { img: "/src/assets/images/gallery/Atama.webp", name: "Atama Soup" },
    { img: "/src/assets/images/gallery/ekpang.webp", name: "Ekpang Nkuwo" },
    { img: "/src/assets/images/gallery/Afiaefere.webp", name: "Afia Efere" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/restaurants?dish=${encodeURIComponent(searchTerm)}&type=delivery`);
    } else {
      navigate("/restaurants");
    }
  };

  return (
    <section className="py-5 bg-light" id="search-food">
      <div className="container">
        {/* Section Header */}
        <div className="row flex-center mb-4">
          <div className="col-lg-7">
            <motion.h2
              className="fw-bold fs-3 fs-lg-5 lh-sm text-center text-lg-start text-danger"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Search by Local Food
            </motion.h2>
            <p className="text-muted text-center text-lg-start">
              Type or tap a dish to explore restaurants serving your favourite Uyo delicacies.
            </p>
          </div>
          <div className="col-lg-5 text-lg-end text-center">
            {/* Inline Search Bar */}
            <form className="input-group" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Search for a dish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-danger fw-bold" type="submit">
                <i className="fas fa-search me-2"></i> Search
              </button>
            </form>
          </div>
        </div>

        {/* Food Grid */}
        <div className="row flex-center">
          {foods.map((food, index) => (
            <motion.div
              key={index}
              className="col-sm-6 col-md-4 col-lg-2 mb-4 h-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="card card-span h-100 shadow-sm d-flex flex-column align-items-center justify-content-center p-3"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/restaurants?dish=${encodeURIComponent(food.name)}&type=delivery`)
                }
              >
                <div
                  className="rounded-circle overflow-hidden"
                  style={{
                    width: "160px",
                    height: "160px",
                  }}
                >
                  <img
                    src={food.img}
                    alt={food.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-body ps-0 text-center">
                  <h6 className="fw-bold text-warning text-truncate mt-3 mb-2">
                    {food.name}
                  </h6>
                  <button
                    className="btn btn-danger btn-sm rounded-pill fw-bold shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/restaurants?dish=${encodeURIComponent(food.name)}&type=delivery`);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-1"></i> Quick Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
