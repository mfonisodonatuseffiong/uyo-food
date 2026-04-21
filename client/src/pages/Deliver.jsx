import { motion } from "framer-motion";

export default function Deliver() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const perks = [
    {
      title: "Flexible Hours",
      description:
        "Choose when you want to ride. Morning, afternoon, or evening — you’re in control.",
      icon: "fas fa-clock",
    },
    {
      title: "Competitive Earnings",
      description:
        "Earn per delivery with bonuses for peak hours and high performance.",
      icon: "fas fa-money-bill-wave",
    },
    {
      title: "Community Impact",
      description:
        "Be part of Uyo’s food culture by helping customers enjoy fresh meals daily.",
      icon: "fas fa-biking",
    },
  ];

  return (
    <section className="py-5 bg-light" id="deliver">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Deliver with Uyo‑Food
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          Join our rider network and help deliver hot, fresh meals across Uyo.
          With flexible hours and competitive pay, you can ride your way to
          success.
        </motion.p>

        <div className="row text-center">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 p-4">
                <i className={`${perk.icon} fs-1 text-danger mb-3`}></i>
                <h5 className="fw-bold text-danger">{perk.title}</h5>
                <p className="text-secondary">{perk.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.8)}>
          <a
            href="/signup"
            className="btn btn-danger btn-lg rounded-pill shadow fw-bold"
          >
            <i className="fas fa-biking me-2"></i> Become a Rider
          </a>
        </motion.div>
      </div>
    </section>
  );
}
