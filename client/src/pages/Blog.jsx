import { motion } from "framer-motion";

export default function Blog() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const posts = [
    {
      title: "The Secret Behind Afang Soup",
      date: "March 2026",
      excerpt:
        "Discover the cultural roots of Afang Soup and why it remains a beloved delicacy in Uyo households.",
      link: "/blog/afang-soup",
      icon: "fas fa-leaf", // cultural/food roots
    },
    {
      title: "Top 5 Restaurants in Uyo",
      date: "April 2026",
      excerpt:
        "From local kitchens to modern eateries, here are the restaurants making waves in Uyo‑Food.",
      link: "/blog/top-restaurants",
      icon: "fas fa-store", // restaurants
    },
    {
      title: "How Riders Keep Meals Fresh",
      date: "April 2026",
      excerpt:
        "Learn how our riders ensure your meals arrive hot, fresh, and on time — every single day.",
      link: "/blog/riders",
      icon: "fas fa-motorcycle", // riders
    },
  ];

  return (
    <section className="py-5 bg-warning text-dark" id="blog">
      <div className="container">
        <motion.h1
          className="fw-bold mb-4 text-center text-danger"
          {...fadeUp(0)}
        >
          <i className="fas fa-blog me-2 text-danger"></i> Uyo‑Food Blog
        </motion.h1>
        <motion.p
          className="text-dark text-center mb-5"
          {...fadeUp(0.2)}
        >
          Stories, tips, and updates from the heart of Uyo’s food culture.
        </motion.p>

        <div className="row">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 mb-4"
              {...fadeUp(0.3 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold text-danger">
                    <i className={`${post.icon} me-2 text-dark`}></i>
                    {post.title}
                  </h5>
                  <p className="text-dark mb-2 fw-bold">{post.date}</p>
                  <p className="text-secondary flex-grow-1">{post.excerpt}</p>
                  <a
                    href={post.link}
                    className="btn btn-danger btn-sm rounded-pill fw-bold mt-auto text-white"
                  >
                    Read More <i className="fas fa-chevron-right ms-2"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
