import { motion } from "framer-motion";

export default function Careers() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const roles = [
    {
      title: "Delivery Rider",
      location: "Uyo, Akwa Ibom",
      description:
        "Join our rider network and help deliver fresh meals across Uyo. Flexible hours, competitive pay, and community impact.",
    },
    {
      title: "Restaurant Partner",
      location: "Uyo & Surrounding Cities",
      description:
        "Partner with Uyo‑Food to reach more customers. Showcase your dishes and grow your restaurant with us.",
    },
    {
      title: "Customer Support Specialist",
      location: "Remote / Uyo HQ",
      description:
        "Assist customers with orders, refunds, and inquiries. Be the friendly voice of Uyo‑Food.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="careers">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          Careers at Uyo‑Food
        </motion.h1>
        <motion.p
          className="text-secondary text-center mb-5"
          {...fadeUp(0.2)}
        >
          We’re building the future of food delivery in Uyo. Join our team and
          be part of a mission to connect culture, cuisine, and community.
        </motion.p>

        <div className="row">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4">
                <div className="card-body text-center">
                  <h5 className="fw-bold text-danger">{role.title}</h5>
                  <p className="text-warning mb-2">{role.location}</p>
                  <p className="text-secondary">{role.description}</p>
                  <a
                    href="/signup"
                    className="btn btn-danger btn-sm rounded-pill fw-bold mt-3"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-5" {...fadeUp(0.8)}>
          <p className="text-secondary">
            Don’t see a role that fits? Reach out to us at{" "}
            <a href="mailto:careers@uyofood.com" className="text-danger fw-bold">
              careers@uyofood.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
