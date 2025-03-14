// Header.jsx
import React from "react";
import "../styles/header.css";
import headerLogo from "../assets/logo-claro.svg";

export default function Header() {
  return (
    <div id="header-container">
      <img src={headerLogo} alt="Logo" id="header-logo" />
    </div>
  );
}
