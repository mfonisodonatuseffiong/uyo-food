import React from "react";
import { Link } from "react-router-dom";

function PaymentPage() {
  return (
    <section className="py-5 bg-light" id="payment-page">
      <div className="container">
        <h2 className="fw-bold text-center mb-4 text-dark">
          <i className="fas fa-credit-card me-2 text-danger"></i> Payment
        </h2>

        <div className="card shadow-sm rounded-3 p-4">
          <p className="lead text-secondary mb-3">
            Choose your preferred payment method to complete your order.
          </p>

          {/* ✅ Payment options */}
          <div className="d-flex flex-column gap-3">
            <button className="btn btn-outline-danger fw-bold rounded-pill">
              <i className="fas fa-credit-card me-2"></i> Pay with Card
            </button>
            <button className="btn btn-outline-success fw-bold rounded-pill">
              <i className="fas fa-university me-2"></i> Bank Transfer
            </button>
            <button className="btn btn-outline-primary fw-bold rounded-pill">
              <i className="fas fa-mobile-alt me-2"></i> Mobile Payment
            </button>
          </div>

          {/* ✅ Proceed button */}
          <div className="text-center mt-4">
            <Link
              to="/tracking"
              className="btn btn-danger fw-bold rounded-pill px-4 py-2"
            >
              Confirm & Place Order <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentPage;
