import { motion } from "framer-motion";
import ctaBg from "../assets/images/gallery/cta-one-bg.png";
import discountsIcon from "../assets/images/icons/discounts.png";
import trackingIcon from "../assets/images/icons/live-tracking.png";
import deliveryIcon from "../assets/images/icons/quick-delivery.png";
import phoneImg from "../assets/images/gallery/phone-cta-one.png";
import appStoreImg from "../assets/images/gallery/app-store.svg";
import googlePlayImg from "../assets/images/gallery/google-play.svg";
import qrCodeImg from "../assets/images/gallery/qr-code.png";

export default function InstallAppCTA() {
  const features = [
    { img: discountsIcon, title: "Daily Discounts", desc: "Save on authentic meals every day." },
    { img: trackingIcon, title: "Live Tracking", desc: "Know exactly when your food arrives." },
    { img: deliveryIcon, title: "Quick Delivery", desc: "Fresh dishes delivered right on time." },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="py-5"
    >
      <div className="container">
        {/* Features Row */}
        <div className="row justify-content-center mb-5">
          <div className="col-xxl-10">
            <div className="card card-span shadow-lg border-0" style={{ borderRadius: "35px" }}>
              <div className="card-body py-5">
                <div className="row justify-content-evenly text-center">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="col-md-4 mb-4"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <img src={feature.img} width="80" alt={feature.title} className="mb-3" />
                      <h3 className="fw-bold text-danger">{feature.title}</h3>
                      <p className="text-muted">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App CTA Row */}
        <div className="row flex-center mt-md-8">
          {/* Phone Preview */}
          <motion.div
            className="col-lg-5 d-none d-lg-block"
            style={{ marginBottom: "-122px" }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img className="w-100" src={phoneImg} alt="Uyo-Food App Preview" />
          </motion.div>

          {/* CTA Content */}
          <motion.div
            className="col-lg-5 mt-7 mt-md-0 text-center text-lg-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="fw-bold text-danger mb-3">Get the Uyo‑Food App</h1>
            <p className="fs-5 text-dark mb-4">
              Order authentic Uyo dishes with ease. Discover trusted restaurants, enjoy daily discounts, 
              and track your delivery in real time — all from your phone.
            </p>

            {/* Store Buttons + QR Code on same line */}
            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center justify-content-lg-start">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
                <img src={appStoreImg} width="160" alt="Download on App Store" />
              </a>
              <a href="https://play.google.com/store/apps" target="_blank" rel="noreferrer">
                <img src={googlePlayImg} width="160" alt="Get it on Google Play" />
              </a>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={qrCodeImg}
                  alt="Scan QR Code to Download Uyo-Food App"
                  width="100"
                  className="shadow rounded"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
