import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import restaurants from "../data/restaurants";

export default function Restaurants() {
  const { cart, addItem } = useCart();
  const location = useLocation();

  const [address, setAddress] = useState("");

  const params = new URLSearchParams(location.search);
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));
  const orderType = params.get("type") || "delivery";

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      const fetchAddress = async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await res.json();

          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress(`Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`);
          }
        } catch (err) {
          console.error("Geocoding error:", err);
          setAddress(`Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`);
        }
      };

      fetchAddress();
    }
  }, [lat, lng]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  let sortedRestaurants = [...restaurants];

  if (!isNaN(lat) && !isNaN(lng)) {
    sortedRestaurants = restaurants
      .map((r) => ({
        ...r,
        distance: calculateDistance(
          lat,
          lng,
          r.lat,
          r.lng
        ).toFixed(1),
      }))
      .sort(
        (a, b) =>
          parseFloat(a.distance) - parseFloat(b.distance)
      );
  }

  return (
    <section className="py-5 bg-warning" id="restaurants-page">
      <div className="container">

        {!isNaN(lat) && !isNaN(lng) && (
          <div className="alert alert-info text-center fw-bold mb-4 rounded-pill shadow-sm">
            <i className="fas fa-map-marker-alt text-danger me-2"></i>
            {address
              ? `Searching near ${address} (${orderType})`
              : `Searching near Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)} (${orderType})`}
          </div>
        )}

        <motion.h2
          className="fw-bold text-center mb-4 text-dark"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >
          <i className="fas fa-store me-2 text-danger"></i>
          Restaurants & Dishes
        </motion.h2>

        <div className="row">
          {sortedRestaurants.map((restaurant, idx) => (
            <motion.div
              key={idx}
              className="col-md-3 col-sm-6 mb-4"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .7,
                delay: idx * .12
              }}
              viewport={{ once: true }}
            >
              <div
                className="card border-0 h-100 overflow-hidden"
                style={{
                  borderRadius: "24px",
                  background:
                    "linear-gradient(145deg,#ffffff,#fffaf2)",
                  boxShadow:
                    "0 14px 35px rgba(0,0,0,.10)",
                  minHeight:"330px"
                }}
              >

                <div
                  className="position-absolute top-0 end-0 px-3 py-1 small fw-semibold text-white"
                  style={{
                    zIndex:2,
                    borderBottomLeftRadius:"18px",
                    background:
                     "linear-gradient(90deg,#dc3545,#ff8c32)"
                  }}
                >
                  {restaurant.tagline}
                </div>

                <div style={{overflow:"hidden"}}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="card-img-top"
                    style={{
                      height:"70px",
                      objectFit:"cover"
                    }}
                  />
                </div>

                <div className="d-flex align-items-center px-3 pt-1">
                  {restaurant.ownerImage && (
                    <img
                      src={restaurant.ownerImage}
                      alt="Owner"
                      className="rounded-circle border border-3 border-white shadow"
                      style={{
                        width:"40px",
                        height:"40px",
                        objectFit:"cover",
                        marginTop:"-14px"
                      }}
                    />
                  )}

                  <div className="ms-2 flex-grow-1">
                    <div className="fw-bold text-dark small">
                      {restaurant.name}
                    </div>

                    <small className="text-muted">
                      Local Premium Kitchen
                    </small>
                  </div>

                  <span
                    className="badge rounded-pill"
                    style={{
                      background:"#fff4d6",
                      color:"#c58a00"
                    }}
                  >
                    ★ {restaurant.rating.toFixed(1)}
                  </span>
                </div>

                <div className="card-body p-2 pt-1">

                  <div className="d-flex justify-content-between mb-1">
                    <span
                      className="small px-2 py-1 rounded-pill"
                      style={{background:"#f8f9fa"}}
                    >
                      ⏱ 25–30 mins
                    </span>

                    <span
                      className="small px-2 py-1 rounded-pill"
                      style={{
                        background:"#fff0f0",
                        color:"#dc3545"
                      }}
                    >
                      {restaurant.distance
                        ? `${restaurant.distance} km`
                        : "Nearby"}
                    </span>
                  </div>

                  <p
                    className="text-secondary small mb-1"
                    style={{
                      lineHeight:"1.2",
                      minHeight:"28px"
                    }}
                  >
                    {restaurant.description}
                  </p>

                  <h6 className="small fw-bold text-danger mb-1">
                    Popular Dishes
                  </h6>

                  <div className="d-grid gap-1">
                    {restaurant.menu.slice(0,2).map((item,i)=>(
                      <div
                        key={i}
                        className="d-flex justify-content-between align-items-center"
                        style={{
                          padding:"6px 10px",
                          borderRadius:"14px",
                          background:
                           "linear-gradient(135deg,#fff,#fff7ef)",
                          border:
                           "1px solid rgba(255,165,0,.15)",
                          boxShadow:
                           "0 4px 10px rgba(0,0,0,.04)"
                        }}
                      >
                        <div>
                          <div className="fw-semibold small text-dark">
                            {item.name}
                          </div>

                          <small className="text-danger fw-bold">
                            ₦{item.price}
                          </small>
                        </div>

                        <button
                          onClick={() =>
                            addItem({
                              restaurant: restaurant.name,
                              dish: item.name,
                              price: item.price,
                              quantity:1
                            })
                          }
                          className="btn rounded-circle p-0"
                          style={{
                            width:"28px",
                            height:"28px",
                            border:"none",
                            background:
                             "linear-gradient(135deg,#dc3545,#ff8c32)",
                            color:"#fff",
                            boxShadow:
                             "0 4px 12px rgba(220,53,69,.28)",
                            transition:"all .28s ease"
                          }}
                          onMouseEnter={(e)=>{
                            e.currentTarget.style.transform="scale(1.15) rotate(8deg)";
                            e.currentTarget.style.boxShadow="0 10px 18px rgba(220,53,69,.38)";
                          }}
                          onMouseLeave={(e)=>{
                            e.currentTarget.style.transform="scale(1) rotate(0)";
                            e.currentTarget.style.boxShadow="0 4px 12px rgba(220,53,69,.28)";
                          }}
                        >
                          +
                        </button>

                      </div>
                    ))}
                  </div>

                </div>

                <div className="card-footer bg-transparent border-0 px-2 pb-2 pt-1">
                  <div className="d-flex gap-2">
                    <Link
                      to={`/restaurant/${idx}`}
                      className="btn btn-sm flex-fill rounded-pill fw-semibold"
                      style={{
                        background:"#fff",
                        border:"1px solid #ddd",
                        padding:"5px",
                        transition:"all .3s ease",
                        boxShadow:"0 4px 10px rgba(0,0,0,.06)"
                      }}
                      onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-3px) scale(1.03)";
                        e.currentTarget.style.boxShadow="0 10px 18px rgba(0,0,0,.12)";
                      }}
                      onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                        e.currentTarget.style.boxShadow="0 4px 10px rgba(0,0,0,.06)";
                      }}
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        addItem({
                          restaurant: restaurant.name,
                          dish: restaurant.menu[0].name,
                          price: restaurant.menu[0].price,
                          quantity:1
                        })
                      }
                      className="btn btn-sm flex-fill rounded-pill fw-semibold text-white"
                      style={{
                        border:"none",
                        padding:"5px",
                        background:
                         "linear-gradient(90deg,#dc3545,#ff8c32)",
                        boxShadow:
                         "0 6px 15px rgba(220,53,69,.25)",
                        transition:"all .3s ease"
                      }}
                      onMouseEnter={(e)=>{
                        e.currentTarget.style.transform="translateY(-3px) scale(1.03)";
                        e.currentTarget.style.boxShadow="0 12px 24px rgba(220,53,69,.35)";
                      }}
                      onMouseLeave={(e)=>{
                        e.currentTarget.style.transform="translateY(0)";
                        e.currentTarget.style.boxShadow="0 6px 15px rgba(220,53,69,.25)";
                      }}
                    >
                      Quick +
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {cart.length > 0 && (
          <motion.div
            className="position-fixed bottom-0 end-0 m-3 text-white rounded-pill shadow-lg px-3 py-2 d-flex align-items-center"
            initial={{scale:.8,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:.5}}
            style={{
              zIndex:1050,
              background:
               "linear-gradient(90deg,#dc3545,#ff8c32)"
            }}
          >
            <i className="fas fa-shopping-cart me-2"></i>

            <span className="fw-bold">
              {cart.length} items
            </span>

            <span className="ms-2">
              ₦{subtotal}
            </span>

            <Link
              to="/cart"
              className="btn btn-sm btn-light fw-bold rounded-pill ms-3"
              style={{
                transition:"all .3s ease"
              }}
              onMouseEnter={(e)=>{
                e.currentTarget.style.transform="translateY(-2px)";
              }}
              onMouseLeave={(e)=>{
                e.currentTarget.style.transform="translateY(0)";
              }}
            >
              View Cart
            </Link>

          </motion.div>
        )}

      </div>
    </section>
  );
}