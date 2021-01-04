import React from "react";
import ReactHtmlParser from "react-html-parser";
import html from "./About.md";

const About = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">About this application</h1>
        {ReactHtmlParser(html)}
      </div>
    </div>
  );
};

export default About;
