import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import luoxIcon from "../../images/icon.svg";

const NavBar = ({ location }) => {
  const isHome = location.pathname === "/";
  const isFormatInfo = location.pathname === "/format-info";
  const isUpload = location.pathname === "/upload";
  const isAbout = location.pathname === "/about";
  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <a className="navbar-brand" href="/">
    //     <img
    //       src={luoxIcon}
    //       width="30"
    //       height="30"
    //       className="d-inline-block align-top mr-3"
    //       alt="luox icon"
    //     />
    //     Home {isHome && <span className="sr-only">(current)</span>}
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon" />
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav">
    //       <li className={isFormatInfo ? "nav-item active" : "nav-item"}>
    //         <a className="nav-link" href="/format-info">
    //           Format instructions{" "}
    //           {isFormatInfo && <span className="sr-only">(current)</span>}
    //         </a>
    //       </li>
    //       <li className={isUpload ? "nav-item active" : "nav-item"}>
    //         <a className="nav-link" href="/upload">
    //           Upload spectrum and generate report{" "}
    //           {isUpload && <span className="sr-only">(current)</span>}
    //         </a>
    //       </li>
    //       <li className={isAbout ? "nav-item active" : "nav-item"}>
    //         <a className="nav-link" href="/about">
    //           About {isAbout && <span className="sr-only">(current)</span>}
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
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
