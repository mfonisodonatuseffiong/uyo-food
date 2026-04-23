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
      icon: "fas fa-motorcycle text-danger fs-2",
    },
    {
      title: "Restaurant Partner",
      location: "Uyo & Surrounding Cities",
      description:
        "Partner with Uyo‑Food to reach more customers. Showcase your dishes and grow your restaurant with us.",
      icon: "fas fa-utensils text-danger fs-2",
    },
    {
      title: "Customer Support Specialist",
      location: "Remote / Uyo HQ",
      description:
        "Assist customers with orders, refunds, and inquiries. Be the friendly voice of Uyo‑Food.",
      icon: "fas fa-headset text-danger fs-2",
    },
  ];

  return (
    <section className="py-5 bg-warning" id="careers">
      <div className="container">
        <motion.h1
          className="fw-bold text-dark mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-briefcase me-2 text-danger"></i> Careers at Uyo‑Food
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
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
              <div
                className="card shadow h-100 rounded-4 transition-all"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.15)";
                }}
              >
                <div className="card-body text-center">
                  <i className={role.icon}></i>
                  <h5 className="fw-bold text-danger mt-3">{role.title}</h5>
                  <p className="text-dark mb-2">
                    <i className="fas fa-map-marker-alt text-success me-2"></i>
                    {role.location}
                  </p>
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
          <p className="text-dark">
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
