// src/components/DiscoverUyo.jsx
function DiscoverUyo() {
  return (
    <section className="position-relative text-white py-5" style={{ minHeight: "70vh" }}>
      {/* Background video with multiple sources and fallback image */}
      <video
        className="position-absolute top-0 start-0 w-100 h-100"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/uyo.jpg" // ✅ fallback image
        style={{ objectFit: "cover", filter: "brightness(0.5)" }}
      >
        {/* Primary MP4 source */}
        <source src="/videos/uyo-town.mp4" type="video/mp4" />
        {/* Secondary WebM source for modern browsers */}
        <source src="/videos/uyo-town.webm" type="video/webm" />
        {/* Fallback image if video fails */}
        <img
          src="/images/uyo.jpg"
          alt="Discover Uyo"
          className="w-100 h-100"
          style={{ objectFit: "cover", filter: "brightness(0.5)" }}
        />
      </video>

      {/* Overlay content */}
      <div className="container position-relative text-center">
        <h2 className="fw-bold display-5 mb-3 animate__animated animate__fadeInUp">
          Discover Uyo
        </h2>
        <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">
          Experience the vibrant streets, rich culture, and warm hospitality of Uyo. 
          More than food, it’s a lifestyle.
        </p>
        <a
          href="#restaurants"
          className="btn btn-warning fw-bold rounded-pill px-4 shadow animate__animated animate__fadeInUp animate__delay-2s"
        >
          Explore Restaurants <i className="fas fa-chevron-right ms-2"></i>
        </a>
      </div>
    </section>
  );
}

export default DiscoverUyo;
