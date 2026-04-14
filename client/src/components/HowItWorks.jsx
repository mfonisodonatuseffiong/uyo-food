import { motion } from "framer-motion";
import locationImg from "../assets/images/gallery/location.png";
import orderImg from "../assets/images/gallery/order.png";
import payImg from "../assets/images/gallery/pay.png";
import mealsImg from "../assets/images/gallery/meals.png";

export default function HowItWorks() {
  const steps = [
    {
      img: locationImg,
      title: "Select location",
      text: "Choose the location where your food will be delivered.",
    },
    {
      img: orderImg,
      title: "Choose order",
      text: "Check over hundreds of menus to pick your favorite food",
    },
    {
      img: payImg,
      title: "Pay advanced",
      text: "It's quick, safe, and simple. Select several methods of payment",
    },
    {
      img: mealsImg,
      title: "Enjoy meals",
      text: "Food is made and delivered directly to your home.",
    },
  ];

  return (
    <section className="py-0 bg-primary-gradient">
      <div className="container">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9">
            <div className="col-lg-6 text-center mx-auto mb-3 mb-md-5 mt-4">
              <motion.h5
                className="fw-bold text-danger fs-3 fs-lg-5 lh-sm my-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                data-aos="fade-up"
              >
                How does it work
              </motion.h5>
            </div>
            <div className="row">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="col-sm-6 col-md-3 mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                >
                  <div className="text-center">
                    <img className="shadow-icon" src={step.img} height="112" alt={step.title} />
                    <h5 className="mt-4 fw-bold">{step.title}</h5>
                    <p className="mb-md-0">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
