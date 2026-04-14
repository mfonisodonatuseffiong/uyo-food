import { motion } from "framer-motion";
import ctaBg2 from "../assets/images/gallery/cta-two-bg.png";

export default function OrderCTA() {
  return (
    <section
      className="py-0"
      style={{
        backgroundImage: `url(${ctaBg2})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row flex-center">
          <motion.div
            className="col-xxl-9 py-7 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-aos="zoom-in"
          >
            <h1 className="fw-bold mb-4 text-white fs-6">
              Are you ready to order <br /> with the best deals?
            </h1>
            <a className="btn btn-danger" href="#!">
              PROCEED TO ORDER <i className="fas fa-chevron-right ms-2"></i>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
