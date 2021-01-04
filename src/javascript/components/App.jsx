import "../../stylesheets/application.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Intro from "./Intro";
import GenerateCSV from "./GenerateCSV";
import Upload from "./Upload";
import Report from "./Report";
import About from "./About";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
