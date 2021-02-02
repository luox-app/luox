import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import html from "./About.md";
import version from "../../version.json";

const About = () => {
  useEffect(() => {
    document.title = "luox: About this application";
  });

  return (
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
  );
};

export default About;
