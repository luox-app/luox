/**
 * luox-NRC-CIERf is a module to calculate parameters for light source
 * colour appearance and colour rendering in the luox platform.
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License v 3.0 as published by the Free Software Foundation.
 * Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 * */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";
import Pagination from "react-js-pagination";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { Button } from "react-bootstrap";
import hueBG from "../../images/hueBG.png";

/**
 * Setting up the bin lines for drawing
 */
const drawBinDividers = () => {
  const binDividerLines = [];
  const binLineCoords = [
    { x: [-1.5, 1.5], y: [0, 0] },
    { x: [-1.39, 1.39], y: [-0.57, 0.57] },
    { x: [-1.06, 1.06], y: [-1.06, 1.06] },
    { x: [-0.57, 0.57], y: [-1.39, 1.39] },
    { x: [0, 0], y: [-1.5, 1.5] },
    { x: [-0.57, 0.57], y: [1.39, -1.39] },
    { x: [-1.06, 1.06], y: [1.06, -1.06] },
    { x: [-1.39, 1.39], y: [0.57, -0.57] },
  ];
  Object.keys(binLineCoords).forEach((key) => {
    binDividerLines.push({
      x: binLineCoords[key].x,
      y: binLineCoords[key].y,
      mode: "lines",
      name: "dividerLine",
      line: { dash: "5px", width: 1 },
      marker: { color: "rgb(166, 166, 166)" },
      showlegend: false,
      hoverinfo: "skip",
    });
  });
  return binDividerLines;
};

let styleWidth = 700;
let styleHeight = 700;
const windowWidth = window.innerWidth;

if (windowWidth <= 996 && windowWidth > 776) {
  styleWidth = 500;
  styleHeight = 500;
} else if (windowWidth <= 776 && windowWidth > 500) {
  styleWidth = 300;
  styleHeight = 300;
} else if (windowWidth <= 500) {
  styleWidth = 200;
  styleHeight = 200;
}

const downloadChart = (downloadType) => {
  if (downloadType === "png") {
    htmlToImage
      .toBlob(document.getElementById("colorVectorGraphics"))
      .then(function (blob) {
        saveAs(blob, "colorVectorGraphics.png");
      });
  } else if (downloadType === "svg") {
    htmlToImage
      .toSvg(document.getElementById("colorVectorGraphics"))
      .then(function (blob) {
        saveAs(blob, "colorVectorGraphics.svg");
      });
  }
};

const CVGPlot = ({ measurementLabels, refHAB }) => {
  const [activePage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const spectraName = measurementLabels[activePage - 1];
  const binLines = drawBinDividers();
  const rgbValues = [
    "rgb(230, 40, 40)",
    "rgb(231, 75, 75)",
    "rgb(251,129,46)",
    "rgb(255,181,41)",
    "rgb(203,202,70)",
    "rgb(126, 185, 76",
    "rgb(65, 192, 109)",
    "rgb(0, 156, 124)",
    "rgb(22, 188, 176)",
    "rgb(0, 164, 191)",
    "rgb(0, 133, 195)",
    "rgb(59, 98, 170)",
    "rgb(69, 104, 174)",
    "rgb(106, 78, 133)",
    "rgb(157, 105, 161)",
    "rgb(167, 79, 129)",
  ];

  let data = [];
  const annotes = [];
  let layout = {};
  let totalItemsCount = 0;

  if (refHAB) {
    totalItemsCount = refHAB.length;
    const thisHAB = refHAB[activePage - 1];

    if (
      Object.keys(thisHAB.avgHueAngleBin).length > 0 &&
      thisHAB.avgHueAngleBin !== "N/A"
    ) {
      /**
       * Setting up the vector arrays
       */
      const vectorArrows = [];
      let vectorArrow;
      for (let j = 1; j < 17; j += 1) {
        const tmpColourBin = thisHAB.avgHueAngleBin[j];
        vectorArrow = {
          x: tmpColourBin.pathXtest,
          y: tmpColourBin.pathYtest,
          xref: "x",
          yref: "y",
          text: "",
          showarrow: true,
          arrowhead: 2,
          arrowwidth: 3,
          axref: "x",
          ayref: "y",
          ax: tmpColourBin.pathXref,
          ay: tmpColourBin.pathYref,
          arrowcolor: rgbValues[j - 1],
        };
        vectorArrows.push(vectorArrow);
      }
      // Add the origin to connect the circle end point
      const testX = vectorArrows.map((v) => v.x);
      testX.push(vectorArrows[0].x);
      const testY = vectorArrows.map((v) => v.y);
      testY.push(vectorArrows[0].y);

      data = [
        ...binLines,
        {
          name: "test_circle",
          x: testX,
          y: testY,
          type: "scatter",
          line: { shape: "spline", smoothing: 1.3 },
          mode: "lines+points",
          connectgaps: true,
          marker: { color: "red" },
          showlegend: false,
          hoverinfo: "skip",
        },
      ];

      const cornerCoords = [
        { x: 0, y: 1.25, label: `<b>${spectraName}</b>`, align: "center" },
        {
          x: -1.25,
          y: 1.25,
          label: `<b>${thisHAB.tm30Rf.toFixed(
            0
          )}</b><br /><i>R</i><sub>f</sub>`,
          align: "left",
        },
        {
          x: 1.15,
          y: 1.25,
          label: `<b>${thisHAB.Rg.toFixed(0)}</b><br /><i>R</i><sub>g</sub>`,
          align: "right",
        },
        {
          x: -1.25,
          y: -1.25,
          label: `CCT<br /><b>${thisHAB.tm30CCT.toFixed(0)}K</b>`,
          align: "left",
        },
        {
          x: 1.15,
          y: -1.25,
          label: `<i>D</i><sub>uv</sub><br /><b>${thisHAB.tm30Duv.toFixed(
            4
          )}</b>`,
          align: "right",
        },
      ];
      cornerCoords.forEach((elements) => {
        annotes.push({
          x: elements.x,
          y: elements.y,
          xref: "x",
          yref: "y",
          text: elements.label,
          font: {
            size: 20,
            color: "black",
          },
          align: elements.align,
          ax: 0,
          ay: 0,
        });
      });
      annotes.push(...vectorArrows);

      layout = {
        autosize: true,
        showlegend: true,
        xaxis: {
          fixedrange: true,
          showgrid: false,
          zeroline: false,
          showline: false,
          showticklabels: false,
          // mirror: true,
          range: [-1.5, 1.5],
          gridcolor: "#bdbdbd",
          gridwidth: 1,
          zerolinecolor: "#969696",
          zerolinewidth: 1,
          linecolor: "#636363",
          linewidth: 1,
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          zeroline: false,
          showline: false,
          showticklabels: false,
          // mirror: true,
          range: [-1.5, 1.5],
          gridcolor: "#bdbdbd",
          gridwidth: 1,
          zerolinecolor: "#969696",
          zerolinewidth: 1,
          linecolor: "#636363",
          linewidth: 1,
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad: 0,
        },
        shapes: [
          // Reference circle
          {
            type: "circle",
            xref: "x",
            yref: "y",
            x0: -1,
            y0: -1,
            x1: 1,
            y1: 1,
            line: {
              color: "rgba(0, 0, 0, 0.7)",
            },
          },
        ],
        images: [
          {
            source: hueBG,
            x: 0.5,
            y: 0.5,
            sizex: 1,
            sizey: 1,
            xanchor: "center",
            yanchor: "middle",
            sizing: "stretch",
            layer: "below",
          },
        ],
        annotations: annotes,
      };
    }
  }

  return (
    <section className="cvg col-md-12">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={1}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={10}
        onChange={handlePageChange}
      />
      <div id="colorVectorGraphics">
        <Plot
          data={data}
          style={{ width: styleWidth, height: styleHeight }}
          layout={layout}
          config={{
            toImageButtonOptions: { width: styleWidth, height: styleHeight },
            displayModeBar: true,
            showLink: false,
            modeBarButtonsToRemove: [
              "zoom2d",
              "pan",
              "pan2d",
              "sendDataToCloud",
              "hoverClosestCartesian",
              "hoverCompareCartesian",
              "autoScale2d",
              "toggleSpikelines",
              "toggleHover",
            ],
            displaylogo: false,
          }}
        />
      </div>
      <div className="col-md-12 my-1">
        <Button
          variant="primary"
          onClick={() => downloadChart("png")}
          className="btn-sm my-1"
        >
          Download Chart as PNG
        </Button>
        <Button
          variant="success"
          onClick={() => downloadChart("svg")}
          className="btn-sm mx-3 my-1"
        >
          Download Chart as SVG
        </Button>
      </div>
    </section>
  );
};

CVGPlot.propTypes = {
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  refHAB: PropTypes.arrayOf(PropTypes.shape),
};

CVGPlot.defaultProps = {
  refHAB: undefined,
};

export default CVGPlot;
