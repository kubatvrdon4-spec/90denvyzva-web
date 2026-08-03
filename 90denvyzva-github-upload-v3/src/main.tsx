import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LeadMagnetPage from "./LeadMagnetPage";
import "./styles.css";
import "./lead-magnet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {window.location.pathname.replace(/\/+$/, "") === "/obsah-pro-trenery" ? (
      <LeadMagnetPage />
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
