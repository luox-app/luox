import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { Link } from "react-router-dom";

const Intro = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">Reporting Light Exposure</h1>

        <p className="lead mb-5">
          Use this tool to meet the{" "}
          <a href="https://doi.org/10.3390/clockssleep1030024">
            minimum reporting guidelines
          </a>{" "}
          for reporting the stimulus conditions involving light as an
          intervention in chronobiology, sleep research and environmental
          psychology experiments.
        </p>

        <p>The minimum reporting guidelines are:</p>

        <ul>
          <li>
            Measure and report the spectral power distribution of the{" "}
            <span
              style={{ borderBottom: "1px", borderBottomStyle: "dashed" }}
              id="acute-stimulus-help"
            >
              acute stimulus
            </span>{" "}
            from the observer’s point of view at a known and specified angle and
            distance from the source
          </li>
          <Tooltip
            placement="auto"
            autohide={false}
            isOpen={tooltipOpen}
            target="acute-stimulus-help"
            toggle={toggle}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            ut nunc nulla. In ac vestibulum quam. Nulla mollis nulla ligula,
            eget blandit augue sodales vitae.{" "}
            <a href="https://en.wikipedia.org/wiki/Stimulus_(physiology)">
              Nunc maximus magna
            </a>{" "}
            sed lorem aucibus, vitae tempus enim varius.
          </Tooltip>
          <li>
            Measure and report the spectral power distribution of the background
            light environment from the observer’s point of view at a known and
            specified angle and distance from the source
          </li>
          <li>Make spectra available in tabulated form</li>
          <li>Report α-opic (ir)radiances and illuminance</li>
          <li>
            Describe the timing properties of stimulus (clock time, duration and
            pattern)
          </li>
          <li>
            Describe the spatial properties of stimulus (spatial arrangement and
            extent)
          </li>
          <li>Report measurement conditions and equipment</li>
        </ul>

        <p className="my-5">
          You’ll need a CSV file containing the spectral power distribution of
          the acute stimulus and background light environment from the
          observer’s point of view.
        </p>

        <p>
          <Link to="/generate-csv" className="btn btn-primary">
            Start now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Intro;
