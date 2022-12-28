import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import luoxIcon from "../../images/logo.svg";

const NavBar = ({ location }) => {
  const isHome = location.pathname === "/";
  const isFormatInfo = location.pathname === "/format-info";
  const isUpload = location.pathname === "/upload";
  const isAbout = location.pathname === "/about";
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <img
        src={luoxIcon}
        style="padding: 0px 10px 0px 0px;"
        width="5%"
        alt="luox logo"
      />
      <a className="navbar-brand" href="/">
        Home {isHome && <span className="sr-only">(current)</span>}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className={isFormatInfo ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="/format-info">
              Format instructions{" "}
              {isFormatInfo && <span className="sr-only">(current)</span>}
            </a>
          </li>
          <li className={isUpload ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="/upload">
              Upload spectrum and generate report{" "}
              {isUpload && <span className="sr-only">(current)</span>}
            </a>
          </li>
          <li className={isAbout ? "nav-item active" : "nav-item"}>
            <a className="nav-link" href="/about">
              About {isAbout && <span className="sr-only">(current)</span>}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default NavBar;
