import { createCalculationTable } from "./calculationTable.js";
import { createSpectraTable } from "./spectraTable.js";
import { downloadCSVButton } from "./csvExport.js";
import { createChart } from "./chart.js";
import { asDecimal, asExponential } from "./helpers.js";

const createToggleButton = (target, expanded, text) => {
  const toggle = document.createElement("a");
  toggle.className = "btn btn-outline-secondary ml-1";
  toggle.href = "#";
  toggle.innerText = text;
  toggle.setAttribute("role", "button");
  toggle.setAttribute("aria-expanded", expanded);
  toggle.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      if (target.style.display === "none") {
        target.style.display = "";
      } else {
        target.style.display = "none";
      }
    },
    false
  );
  return toggle;
};

const createNotationToggle = (table, defaultNotation, decimalPrecision) => {
  const notationToggle = document.createElement("a");
  notationToggle.className = "btn btn-outline-secondary ml-1";
  notationToggle.href = "#";
  notationToggle.innerText = "Toggle notation";
  notationToggle.setAttribute("role", "button");
  notationToggle.dataset.notation = defaultNotation;

  const toggleNotation = (event) => {
    event.preventDefault();
    const button = event.target;
    if (button.dataset.notation === "decimal") {
      button.dataset.notation = "scientific";
      table
        .querySelectorAll("td[data-notation-toggleable=true]")
        .forEach((element) => {
          if (!isNaN(element.innerText)) {
            element.innerText = asExponential(Number(element.innerText));
          }
        });
    } else {
      button.dataset.notation = "decimal";
      table
        .querySelectorAll("td[data-notation-toggleable=true]")
        .forEach((element) => {
          if (!isNaN(element.innerText)) {
            element.innerText = asDecimal(
              Number(element.innerText),
              decimalPrecision
            );
          }
        });
    }
  };

  notationToggle.addEventListener("click", toggleNotation, false);
  return notationToggle;
};

const renderCalculations = (
  radianceOrIrradiance,
  rows,
  interpolatedRows,
  sampleCount,
  simplifiedReport
) => {
  const container = document.createElement("section");
  const headingAndActions = document.createElement("div");
  const heading = document.createElement("h3");
  const actions = document.createElement("div");
  const table = document.createElement("table");

  headingAndActions.className = "mt-3 d-flex justify-content-between";
  table.className = "table table-sm mt-3 result-table";

  createCalculationTable(
    table,
    radianceOrIrradiance,
    rows,
    interpolatedRows,
    sampleCount,
    simplifiedReport
  );

  if (radianceOrIrradiance === "radiance") {
    heading.append("Luminance and α-opic radiances");
  } else {
    heading.append("Illuminance and α-opic irradiances");
  }

  actions.append(
    downloadCSVButton(table, "download-calc"),
    createToggleButton(table, "true", "Toggle table"),
    createNotationToggle(table, "decimal", 2)
  );
  headingAndActions.append(heading, actions);
  container.append(headingAndActions, table);
  return container;
};

const renderChart = (radianceOrIrradiance, rows, sampleCount) => {
  const container = document.createElement("section");
  const headingAndActions = document.createElement("div");
  const heading = document.createElement("h3");
  const actions = document.createElement("div");
  const chartAndControls = document.createElement("div");
  const canvas = document.createElement("canvas");

  headingAndActions.className = "mt-5 d-flex justify-content-between";
  chartAndControls.className = "mt-3";
  chartAndControls.style.display = "none";
  canvas.setAttribute("width", "400");
  canvas.setAttribute("height", "200");

  heading.append("Spectra chart");
  actions.append(createToggleButton(chartAndControls, "false", "Toggle chart"));
  headingAndActions.append(heading, actions);

  chartAndControls.append(canvas);
  container.append(headingAndActions, chartAndControls);
  createChart(canvas, radianceOrIrradiance, rows, sampleCount);
  return container;
};

const renderSpectra = (radianceOrIrradiance, rows, sampleCount) => {
  const container = document.createElement("section");
  const headingAndActions = document.createElement("div");
  const heading = document.createElement("h3");
  const actions = document.createElement("div");
  const table = document.createElement("table");

  headingAndActions.className = "mt-5 d-flex justify-content-between";
  table.className = "table table-sm mt-3 result-table";
  table.style.display = "none";

  createSpectraTable(table, radianceOrIrradiance, rows, sampleCount);

  heading.append("Spectra");
  actions.append(
    downloadCSVButton(table, "download-spectrum"),
    createToggleButton(table, "false", "Toggle table"),
    createNotationToggle(table, "scientific", 10)
  );
  headingAndActions.append(heading, actions);
  container.append(headingAndActions, table);
  return container;
};

export const renderResults = (
  container,
  radianceOrIrradiance,
  rows,
  interpolatedRows,
  sampleCount,
  simplifiedReport
) => {
  container.append(
    renderChart(radianceOrIrradiance, rows, sampleCount),
    renderCalculations(
      radianceOrIrradiance,
      rows,
      interpolatedRows,
      sampleCount,
      simplifiedReport
    ),
    renderSpectra(radianceOrIrradiance, rows, sampleCount)
  );
};
