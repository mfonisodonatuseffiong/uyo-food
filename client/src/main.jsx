import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'animate.css';


// Global styles
import "./index.css";       // base styles
import "./App.css";         // component-specific styles
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap framework
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // bootstrap JS for carousel, modals, etc.

import { BrowserRouter } from "react-router-dom"; // ✅ Step 2: Router setup

// AOS setup
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Wrap App in BrowserRouter so routes work */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
