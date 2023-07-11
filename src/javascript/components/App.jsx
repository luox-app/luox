import "../../stylesheets/custom.css";
import React from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Intro from "./Intro";
import GenerateCSV from "./GenerateCSV";
import Upload from "./Upload";
import Report from "./Report";
import About from "./About";
import ScrollToTop from "./ScrollToTop";
import FooterBar from "./FooterBar";

const NavBarWithRouter = withRouter(NavBar);
const FooterBarWithRouter = withRouter(FooterBar);

let homeActive = false;
if (window.location.pathname === "/") {
  homeActive = true;
}

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <header
          id="header"
          className={
            homeActive
              ? "fixed-top d-flex align-items-center header-transparent"
              : "fixed-top d-flex align-items-center"
          }
        >
          <NavBarWithRouter />
        </header>

        <Switch>
          <Route path="/u/:id">
            <Report />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/format-info">
            <GenerateCSV />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
        <footer
          id="footer"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="200"
        >
          <FooterBarWithRouter />
        </footer>
        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short" />
        </a>
      </Router>
    </div>
  );
};

export default App;
