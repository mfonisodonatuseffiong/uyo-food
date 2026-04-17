import { useState, useEffect } from "react";
import heroImg from "../assets/images/gallery/hero2.png";

function HeroSection() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setAnimate(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 overflow-hidden bg-warning text-dark" id="home">
      <div className="container">
        <div className="row flex-center">
          {/* Hero Image with fade + slide + zoom */}
          <div className="col-md-5 col-lg-6 order-0 order-md-1 mt-5 mt-md-0 text-center">
            <img
              src={heroImg}
              alt="Uyo Food Hero"
              className="img-fluid rounded"
              style={{
                transition:
                  "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                opacity: animate ? 1 : 0,
                transform: animate
                  ? "translateX(0) scale(1)"
                  : "translateX(-20px) scale(0.95)",
              }}
            />
          </div>

          {/* Hero Text + Tabs with margin on desktop */}
          <div className="col-md-7 col-lg-6 py-5 text-md-start text-center ps-md-4">
            <h1 className="display-4 fw-bold text-danger mb-3">Hungry in Uyo?</h1>
            <p className="lead mb-4">
              Within a few clicks, find meals that are accessible near you.
            </p>

            {/* Delivery / Pickup Tabs */}
            <div className="card shadow mx-auto mx-md-0" style={{ maxWidth: "420px" }}>
              <div className="card-body">
                <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      id="nav-delivery-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-delivery"
                      type="button"
                      role="tab"
                      aria-controls="nav-delivery"
                      aria-selected="true"
                    >
                      <i className="fas fa-motorcycle me-2 text-danger"></i>
                      Delivery
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      id="nav-pickup-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-pickup"
                      type="button"
                      role="tab"
                      aria-controls="nav-pickup"
                      aria-selected="false"
                    >
                      <i className="fas fa-shopping-bag me-2 text-success"></i>
                      Pickup
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content mt-3" id="nav-tabContent">
                  {/* Delivery Form */}
                  <div
                    className="tab-pane fade show active"
                    id="nav-delivery"
                    role="tabpanel"
                  >
                    <form className="row gx-2 gy-2 align-items-center">
                      <div className="col">
                        <div className="input-group">
                          <span className="input-group-text bg-white border-0">
                            <i className="fas fa-compass text-danger"></i>
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Your Address"
                          />
                        </div>
                      </div>
                      <div className="d-grid gap-2 col-sm-auto">
                        <button className="btn btn-danger" type="submit">
                          <i className="fas fa-search me-2"></i> Find Food
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Pickup Form */}
                  <div className="tab-pane fade" id="nav-pickup" role="tabpanel">
                    <form className="row gx-2 gy-2 align-items-center">
                      <div className="col">
                        <div className="input-group">
                          <span className="input-group-text bg-white border-0">
                            <i className="fas fa-compass text-success"></i>
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Your Address"
                          />
                        </div>
                      </div>
                      <div className="d-grid gap-2 col-sm-auto">
                        <button className="btn btn-danger" type="submit">
                          <i className="fas fa-search me-2"></i> Find Food
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* End Card */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
