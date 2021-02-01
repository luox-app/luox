import "../../stylesheets/application.scss";
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

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <header>
          <NavBarWithRouter />
        </header>

        <main className="container">
          <Switch>
            <Route path="/u/:id">
              <Report />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/generate-csv">
              <GenerateCSV />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Intro />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
