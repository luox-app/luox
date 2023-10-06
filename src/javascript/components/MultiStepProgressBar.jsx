import React from "react";
// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import PropTypes from "prop-types";

// import "../../stylesheets/multistepprogressbar.css";
// import { ProgressBar, Step, StepLabel } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page }) => {
  //   let stepPercentage = 0;
  let startingStep = 0;
  if (page === "start") {
    // stepPercentage = 0;
    startingStep = 0;
  } else if (page === "format_instruction") {
    // stepPercentage = 34;
    startingStep = 1;
  } else if (page === "upload") {
    // stepPercentage = 67;
    startingStep = 2;
  } else {
    // stepPercentage = 0;
    startingStep = 3;
  }

  return (
    // <ProgressBar percent={stepPercentage}>
    //   <Step label="Start">
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //         onClick={() => onPageNumberClick("1")}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //         onClick={() => onPageNumberClick("2")}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //         onClick={() => onPageNumberClick("3")}
    //       >
    //         {index + 1}
    //       </div>
    //     )
    //     }
    //   </Step>
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //         onClick={() => onPageNumberClick("4")}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    // </ProgressBar>
    <div className="progressBarDiv">
      <StepProgressBar
        startingStep={startingStep}
        steps={[
          {
            label: "Start",
          },
          {
            label: "Format Instruction",
          },
          {
            label: "Upload",
          },
        ]}
      />
    </div>
  );
};
MultiStepProgressBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MultiStepProgressBar;
