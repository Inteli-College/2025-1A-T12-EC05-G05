import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
