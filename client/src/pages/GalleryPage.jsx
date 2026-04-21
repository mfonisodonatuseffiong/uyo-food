import { motion } from "framer-motion";
import jollofImg from "../assets/images/gallery/jollof.webp";
import afangImg from "../assets/images/gallery/afang.webp";
import ekpangImg from "../assets/images/gallery/ekpang.webp";
import edikangikongImg from "../assets/images/gallery/edikangikong.webp";

export default function GalleryPage() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
    viewport: { once: true },
  });

  const galleryItems = [
    { name: "Jollof Rice", image: jollofImg },
    { name: "Afang Soup", image: afangImg },
    { name: "Ekpang Nkukwo", image: ekpangImg },
    { name: "Edikaikong Soup", image: edikangikongImg },
  ];

  return (
    <section className="py-5 bg-light" id="gallery-page">
      <div className="container">
        <motion.h2
          className="fw-bold text-danger mb-5 text-center"
          {...fadeUp(0)}
        >
          <i className="fas fa-images text-warning me-2"></i> Food Gallery
        </motion.h2>

        <div className="row">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="col-md-3 col-sm-6 mb-4"
              {...fadeUp(0.2 + idx * 0.2)}
            >
              <div className="card shadow h-100 rounded-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-danger">{item.name}</h6>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
