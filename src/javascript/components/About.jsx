import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import tumLogo from "../../images/tum.png";
import mpiLogo from "../../images/mpi.png";
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
              <a href="https://www.sg.tum.de/en/chronobiology/home/">
                <img
                  src={tumLogo}
                  width="100%"
                  className="align-middle"
                  alt="Technical University of Munich logo"
                />
              </a>
            </div>
            <div className="col-3">
              <a href="https://www.kyb.tuebingen.mpg.de/614159/translational-sensory-and-circadian-neuroscience">
                <img
                  src={mpiLogo}
                  width="100%"
                  className="align-middle"
                  alt="Max Planck Institute for Biological Cybernetics logo"
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
