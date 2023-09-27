import React, { useState } from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Button } from "react-bootstrap";
import luoxIcon from "../../images/icon.svg";

const NavBar = ({ location }) => {
  const isHome = location.pathname === "/";
  const isFormatInfo = location.pathname === "/format-info";
  const isUpload = location.pathname === "/upload";
  const isAbout = location.pathname === "/about";
  const tooltipTutorial = localStorage.getItem("tooltip_tutorial");
  const tooltipText = localStorage.getItem("tooltip_btn_text");
  const [tooltipBtnText, setTooltipBtnText] = useState(tooltipText);
  const changeTooltipTutorial = () => {
    if (tooltipTutorial === "1") {
      localStorage.setItem("tooltip_tutorial", "0");
      localStorage.setItem("tooltip_btn_text", "Enable Tooltips");
      setTooltipBtnText("Enable Tooltips");
    } else {
      localStorage.setItem("tooltip_tutorial", "1");
      localStorage.setItem("tooltip_btn_text", "Disable Tooltips");
      setTooltipBtnText("Disable Tooltips");
    }
    window.location.reload();
  };
  return (
    <div className="container d-flex justify-content-between align-items-center">
      <div className="logo">
        <h1 className="text-light">
          <a className="" href="/">
            <img
              src={luoxIcon}
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
              alt="luox icon"
            />
            <span className="text-lowercase">luox</span>
          </a>
        </h1>
      </div>

      <nav id="navbar" className="navbar">
        <ul>
          <li>
            <a className={isHome ? "active" : ""} href="/">
              Home
            </a>
          </li>
          <li>
            <a className={isFormatInfo ? "active" : ""} href="/format-info">
              Format instructions
            </a>
          </li>
          <li>
            <a className={isUpload ? "active" : ""} href="/upload">
              Upload spectrum and generate report
            </a>
          </li>
          <li>
            <a className={isAbout ? "active" : ""} href="/about">
              About
            </a>
          </li>
          <li>
            <Button variant="primary" onClick={changeTooltipTutorial}>
              {tooltipBtnText}
            </Button>
          </li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default NavBar;
