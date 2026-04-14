import { motion } from "framer-motion";
import foodWorld from "../assets/images/gallery/food-world.png";
import foodWorldLogo from "../assets/images/gallery/food-world-logo.png";
import pizzaHub from "../assets/images/gallery/pizza-hub.png";
import pizzaHubLogo from "../assets/images/gallery/pizzahub-logo.png";
import donutsHut from "../assets/images/gallery/donuts-hut.png";
import donutsHutLogo from "../assets/images/gallery/donuts-hut-logo.png";
import donutHut from "../assets/images/gallery/donuthut.png";
import donutHutLogo from "../assets/images/gallery/donut-hut-logo.png";
import rubyTuesday from "../assets/images/gallery/ruby-tuesday.png";
import rubyTuesdayLogo from "../assets/images/gallery/ruby-tuesday-logo.png";
import kuakata from "../assets/images/gallery/kuakata.png";
import kuakataLogo from "../assets/images/gallery/kuakata-logo.png";
import redSquare from "../assets/images/gallery/red-square.png";
import redSquareLogo from "../assets/images/gallery/red-square-logo.png";
import tacoBell from "../assets/images/gallery/taco-bell.png";
import tacoBellLogo from "../assets/images/gallery/taco-bell-logo.png";

export default function FeaturedRestaurants() {
  const restaurants = [
    { img: foodWorld, logo: foodWorldLogo, name: "Food world", discount: "20% off", rating: 46, status: "Opens Tomorrow" },
    { img: pizzaHub, logo: pizzaHubLogo, name: "Pizza hub", discount: "10% off", rating: 40, status: "Opens Tomorrow" },
    { img: donutsHut, logo: donutsHutLogo, name: "Donuts hut", discount: "15% off", rating: 20, status: "Open Now" },
    { img: donutHut, logo: donutHutLogo, name: "Donuts hut", discount: "15% off", rating: 50, status: "Open Now" },
    { img: rubyTuesday, logo: rubyTuesdayLogo, name: "Ruby tuesday", discount: "10% off", rating: 50, status: "Open Now" },
    { img: kuakata, logo: kuakataLogo, name: "Kuakata Fried Chicken", discount: "10% off", rating: 50, status: "Open Now" },
    { img: redSquare, logo: redSquareLogo, name: "Red Square", discount: "10% off", rating: 50, status: "Open Now" },
    { img: tacoBell, logo: tacoBellLogo, name: "Taco bell", discount: "10% off", rating: 50, status: "Open Now" },
  ];

  return (
    <section id="testimonial">
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-7 mx-auto text-center mb-6">
            <motion.h5
              className="fw-bold fs-3 fs-lg-5 lh-sm mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              data-aos="fade-up"
            >
              Featured Restaurants
            </motion.h5>
          </div>
        </div>
        <div className="row gx-2">
          {restaurants.map((rest, index) => (
            <motion.div
              key={index}
              className="col-sm-6 col-md-4 col-lg-3 h-100 mb-5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              data-aos="fade-up"
            >
              <div className="card card-span h-100 text-white rounded-3">
                <img className="img-fluid rounded-3 h-100" src={rest.img} alt={rest.name} />
                <div className="card-img-overlay ps-0">
                  <span className="badge bg-danger p-2 ms-3">
                    <i className="fas fa-tag me-2 fs-0"></i>
                    <span className="fs-0">{rest.discount}</span>
                  </span>
                  <span className="badge bg-primary ms-2 me-1 p-2">
                    <i className="fas fa-clock me-1 fs-0"></i>
                    <span className="fs-0">Fast</span>
                  </span>
                </div>
                <div className="card-body ps-0">
                  <div className="d-flex align-items-center mb-3">
                    <img className="img-fluid" src={rest.logo} alt={`${rest.name} logo`} />
                    <div className="flex-1 ms-3">
                      <h5 className="mb-0 fw-bold text-1000">{rest.name}</h5>
                      <span className="text-primary fs--1 me-1">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="mb-0 text-primary">{rest.rating}</span>
                    </div>
                  </div>
                  <span className={`badge p-2 ${rest.status.includes("Open") ? "bg-soft-success" : "bg-soft-danger"}`}>
                    <span className={`fw-bold fs-1 ${rest.status.includes("Open") ? "text-success" : "text-danger"}`}>
                      {rest.status}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="col-12 d-flex justify-content-center mt-5">
            <a className="btn btn-lg btn-primary" href="#!">
              View All <i className="fas fa-chevron-right ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
