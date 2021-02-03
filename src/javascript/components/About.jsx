import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import UooRectLogo from "../../images/university-of-oxford-rect-logo.svg";
import EpLogo from "../../images/experimental-psychology-logo.jpg";
import html from "./About.md";
import version from "../../version.json";

const About = () => {
  useEffect(() => {
    document.title = "luox: About this application";
  });

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-8">
          <div className="row d-flex flex-wrap align-items-center">
            <div className="col-3">
              <a href="https://www.ox.ac.uk/">
                <img
                  src={UooRectLogo}
                  width="100%"
                  style={{ backgroundColor: "#002147" }}
                  className="align-middle"
                  alt="University of Oxford logo"
                />
              </a>
            </div>
            <div className="col-3">
              <a href="https://www.psy.ox.ac.uk/">
                <img
                  src={EpLogo}
                  width="75%"
                  className="align-middle"
                  alt="University of Oxford Experimental Psychology logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <h1 className="my-5">About this application</h1>
          {ReactHtmlParser(html)}
          <h2 id="version-information">Version information</h2>
          <ul>
            <li>Latest tag: {version.latestTag}</li>
            <li>Latest commit SHA: {version.latestCommitSha}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
