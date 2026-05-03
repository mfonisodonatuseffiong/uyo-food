import "../styles/heroBanner.css";

function HeroBanner() {
  return (
    <div className="hero-banner">
      <img
        src="https://ng.jumia.is/cms/0-1-weekly-cps/0-2026/Awoof-of-the-month/AOTM-brands-top-strip_JULY.gif"
        alt="Promo Banner"
        className="banner-img"
      />
      {/* ✅ Black patch overlay to hide Jumia’s number */}
      <div className="banner-overlay"></div>
    </div>
  );
}

export default HeroBanner;
