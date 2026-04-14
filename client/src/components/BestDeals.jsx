import { motion } from "framer-motion";
import crispySandwichImg from "../assets/images/gallery/crispy-sandwiches.png";

export default function BestDeals() {
  return (
    <section className="pb-5 pt-8">
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
                      src={crispySandwichImg}
                      alt="Crispy Sandwiches"
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
                      Best deals <span className="text-primary"> Crispy Sandwiches</span>
                    </h1>
                    <p className="fs-1">
                      Enjoy the large size of sandwiches. Complete your meal with the perfect slice of sandwiches.
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
