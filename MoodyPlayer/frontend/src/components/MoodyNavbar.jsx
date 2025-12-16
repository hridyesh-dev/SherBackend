
import React from "react";
import "./MoodyNavbar.css";

const MoodyNavbar = () => {
  return (
    <header className="moody-navbar">
      <nav className="nav-inner">
        <a>
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Moody Player</span>
        </a>
      </nav>
    </header>
  );
};

export default MoodyNavbar;
