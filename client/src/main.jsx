import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

/* Framework styles */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* Library styles */
import "animate.css";
import "aos/dist/aos.css";

/* Your merged global stylesheet */
import "./index.css";

import AOS from "aos";

AOS.init({
  duration: 800,
  once: true,
});

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);