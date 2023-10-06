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

const NavBarWithRouter = withRouter(NavBar);

let homeActive = false;
if (window.location.pathname === "/") {
  homeActive = true;
}
const tooltipTutorial = localStorage.getItem("tooltip_tutorial");
if (tooltipTutorial === null) {
  localStorage.setItem("tooltip_tutorial", "0");
  localStorage.setItem("tooltip_btn_text", "Enable Tooltips");
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
      </Router>
    </div>
  );
};

export default App;
