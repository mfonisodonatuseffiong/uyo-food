import "../styles/heroBanner.css";

function HeroBanner() {
  return (
    <div className="hero-banner">
      <img
        src="https://ng.jumia.is/cms/0-1-weekly-cps/0-2026/Awoof-of-the-month/AOTM-brands-top-strip_JULY.gif"
        alt="Promo Banner"
        className="banner-img"
      />
      {/* ✅ Overlay shifted to the right */}
      <div className="banner-overlay">
        📞 <a href="tel:08068199955">08068199955</a>
      </div>
    </div>
  );
}

export default HeroBanner;
