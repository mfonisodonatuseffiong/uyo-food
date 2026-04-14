import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
import "./index.css";       // base styles
import "./App.css";         // component-specific styles
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap framework

import { BrowserRouter } from "react-router-dom";

// AOS setup
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
