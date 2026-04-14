import { motion } from "framer-motion";
import pizzaImg from "../assets/images/gallery/search-pizza.png";
import burgerImg from "../assets/images/gallery/burger.png";
import noodlesImg from "../assets/images/gallery/noodles.png";
import subSandwichImg from "../assets/images/gallery/sub-sandwich.png";
import chowmeinImg from "../assets/images/gallery/chowmein.png";
import steakImg from "../assets/images/gallery/steak.png";

export default function SearchByFood() {
  const foods = [
    { img: pizzaImg, name: "Pizza" },
    { img: burgerImg, name: "Burger" },
    { img: noodlesImg, name: "Noodles" },
    { img: subSandwichImg, name: "Sub-sandwiches" },
    { img: chowmeinImg, name: "Chowmein" },
    { img: steakImg, name: "Steak" },
  ];

  return (
    <section className="py-8 overflow-hidden">
      <div className="container">
        <div className="row flex-center mb-6">
          <div className="col-lg-7">
            <motion.h5
              className="fw-bold fs-3 fs-lg-5 lh-sm text-center text-lg-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              data-aos="fade-up"
            >
              Search by Food
            </motion.h5>
          </div>
          <div className="col-lg-4 text-lg-end text-center">
            <a className="btn btn-lg text-800 me-2" href="#!" role="button">
              VIEW ALL <i className="fas fa-chevron-right ms-2"></i>
            </a>
          </div>
        </div>
        <div className="row flex-center">
          <div className="col-12">
            <div className="row h-100 align-items-center">
              {foods.map((food, index) => (
                <motion.div
                  key={index}
                  className="col-sm-6 col-md-4 col-xl mb-5 h-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                >
                  <div className="card card-span h-100 rounded-circle">
                    <img
                      className="img-fluid rounded-circle h-100"
                      src={food.img}
                      alt={food.name}
                    />
                    <div className="card-body ps-0">
                      <h5 className="text-center fw-bold text-1000 text-truncate mb-2">
                        {food.name}
                      </h5>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
