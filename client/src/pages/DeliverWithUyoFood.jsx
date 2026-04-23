import { motion } from "framer-motion";

export default function DeliverWithUyoFood() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  return (
    <section className="py-5 bg-warning" id="deliver-with-uyofood">
      <div className="container">
        <motion.h1
          className="fw-bold text-dark mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-motorcycle me-2 text-danger"></i> Deliver with Uyo‑Food
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Earn flexible income, explore the city, and be part of Uyo’s fastest‑growing food delivery network.
        </motion.p>

        <div className="row text-center">
          <motion.div className="col-md-4 mb-4" {...fadeUp(0.3)}>
            <i className="fas fa-clock text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Flexible Hours</h5>
            <p className="text-secondary">
              Work when it suits you — mornings, evenings, or weekends.
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.5)}>
            <i className="fas fa-wallet text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Competitive Pay</h5>
            <p className="text-secondary">
              Earn per delivery with bonuses during peak hours.
            </p>
          </motion.div>

          <motion.div className="col-md-4 mb-4" {...fadeUp(0.7)}>
            <i className="fas fa-users text-danger fs-1 mb-3"></i>
            <h5 className="fw-bold">Community Impact</h5>
            <p className="text-secondary">
              Help connect customers with their favorite meals across Uyo.
            </p>
          </motion.div>
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.9)}>
          <a
            href="/signup"
            className="btn btn-danger fw-bold rounded-pill px-4"
          >
            Start Delivering
          </a>
        </motion.div>
      </div>
    </section>
  );
}
