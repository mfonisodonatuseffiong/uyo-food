import { motion } from "framer-motion";

export default function Team() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const teamMembers = [
    {
      name: "Mfoniso Donatus",
      role: "Co‑Founder & CEO",
      bio: "Passionate about connecting Uyo’s food culture with technology.",
      image: "/src/assets/images/team/pro2.webp",
    },
    {
      name: "Sam Olu",
      role: "Head of Operations",
      bio: "Ensures smooth delivery logistics and rider coordination.",
      image: "/src/assets/images/team/samolu.png",
    },
    {
      name: "Gideon Bigbitz",
      role: "Lead Chef Partner",
      bio: "Works with restaurants to maintain authentic taste and quality.",
      image: "/src/assets/images/team/bigbitz.webp",
    },
  ];

  return (
    <section className="py-5 bg-warning text-dark" id="team">
      <div className="container">
        <motion.h1
          className="fw-bold text-danger mb-4 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-users me-2 text-danger"></i> Meet the Uyo‑Food Team
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Behind every hot meal and fast delivery is a team dedicated to
          celebrating Uyo’s culture and serving our community.
        </motion.p>

        <div className="row">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 text-center border-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-img-top rounded-top"
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="fw-bold text-danger">{member.name}</h5>
                  <p className="text-dark mb-1 fw-bold">{member.role}</p>
                  <p className="text-secondary">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
