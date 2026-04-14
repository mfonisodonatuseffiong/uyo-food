import { motion } from "framer-motion";
import pizzaImg from "../assets/images/gallery/pizza.png";

export default function PizzaDeals() {
  return (
    <section className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card card-span mb-3 shadow-lg">
              <div className="card-body py-0">
                <div className="row justify-content-center">
                  {/* Image column */}
                  <motion.div
                    className="col-md-5 col-xl-7 col-xxl-8 g-0 order-0 order-md-1"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    data-aos="fade-right"
                  >
                    <img
                      className="img-fluid w-100 fit-cover h-100 rounded-top rounded-md-end rounded-md-top-0"
                      src={pizzaImg}
                      alt="Pizza"
                    />
                  </motion.div>

                  {/* Text column */}
                  <motion.div
                    className="col-md-7 col-xl-5 col-xxl-4 p-4 p-lg-5"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    data-aos="fade-left"
                  >
                    <h1 className="card-title mt-xl-5 mb-4">
                      Wanna eat hot & <span className="text-primary">spicy Pizza?</span>
                    </h1>
                    <p className="fs-1">
                      Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.
                    </p>
                    <div className="d-grid bottom-0">
                      <a className="btn btn-lg btn-primary mt-xl-6" href="#!">
                        PROCEED TO ORDER <i className="fas fa-chevron-right ms-2"></i>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
