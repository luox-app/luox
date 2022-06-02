import React, { useEffect, useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import Worker from "worker-loader!./worker";
import CVGPlot from "./CVGPlot";
import CalculationTableCSV from "./CalculationTableCSV";
import { asDecimal, asExponential } from "../helpers";

// import { t0 } from "./Results";

const CalculationTableHeader = ({ measurementLabels }) => {
  return (
    <thead>
      <tr>
        <th key="condition">Condition</th>
        {Object.entries(measurementLabels).map(([key, value]) => (
          <th key={key}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};

CalculationTableHeader.propTypes = {
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

/* *
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 * */
const checkNA = (sample, index, exponentialNotation) => {
  if (sample === "N/A" && typeof sample === "string") {
    return <td key={index}> {sample} </td>;
  }
  return (
    <td key={index}>
      {exponentialNotation ? asExponential(sample) : asDecimal(sample)}
    </td>
  );
};

/**
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 * */
const CalculationTableRow = ({ heading, samples, exponentialNotation }) => {
  /* eslint-disable react/no-array-index-key */
  if (samples.length === 0) {
    return null;
  }
  return (
    <tr>
      <th>{heading}</th>
      {samples.map((sample, index) =>
        checkNA(sample, index, exponentialNotation)
      )}
    </tr>
  );
};

CalculationTableRow.propTypes = {
  exponentialNotation: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  samples: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
};

/**
 * Create component contents using calculated values.
 * Asynchronous functions were used to optimze rendering process.
 *
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 * */
const CalculationTable = ({
  radianceOrIrradiance,
  rows,
  sampleCount,
  measurementLabels,
  isLoaded,
  setLoaded,
  refHAB,
  setRefHAB,
}) => {
  const [exponentialNotation, setExponentialNotation] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [tm30display, setTm30display] = useState(false);

  const [
    calculationTableDownloadUrl,
    setCalculationTableDownloadUrl,
  ] = useStateIfMounted();
  const [calculation, setCalculation] = useStateIfMounted({
    colourFidelityIndex: [
      { CCT: 0, Duv: 0, Rf: 0, u: 0, v: 0, uPrime: 0, vPrime: 0 },
    ],
    colourFidelityIndexRounded: [
      { CCT: 0, Duv: 0, Rf: 0, u: 0, v: 0, uPrime: 0, vPrime: 0 },
    ],
    tm30ColourFidelityIndex: [
      {
        RcsH1: 0,
        RfH1: 0,
        Rg: 0,
        avgHueAngleBin: {},
        tm30CCT: 0,
        tm30Duv: 0,
        tm30Rf: 0,
      },
    ],
    colourRenderingIndex: [{ CCT: 0, Ra: 0 }],
    luminanceTotals: [0],
    chromaticity31: [{ x: 0, y: 0 }],
    chromaticity64: [{ x: 0, y: 0 }],
    lConeTotals: [0],
    mConeTotals: [0],
    sConeTotals: [0],
    melTotals: [0],
    rodTotals: [0],
    equivalentDaylightAlphaOpic: {
      sc: [0],
      mc: [0],
      lc: [0],
      rh: [0],
      mel: [0],
    },
    alphaOpicEfficiency: {
      sc: [0],
      mc: [0],
      lc: [0],
      rh: [0],
      mel: [0],
    },
  });

  const [rfDisplayRows, setRfDisplayRows] = useStateIfMounted();
  const [tm30DisplayRows, setTm30DisplayRows] = useStateIfMounted();

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  const handleAdvanced = () => {
    const oddChilds = document.querySelectorAll(
      ".result-table tbody tr:nth-child(odd)"
    );
    Object.keys(oddChilds).forEach((key) => {
      oddChilds[key].style.background = "#ebeced;";
    });
    setAdvanced((checked) => !checked);
  };

  const handleTm30display = () => {
    setTm30display((checked) => !checked);
  };

  const units =
    radianceOrIrradiance === "radiance" ? "mW ⋅ m⁻² ⋅ sr" : "mW ⋅ m⁻²";

  const equivalentDaylightUnit =
    radianceOrIrradiance === "radiance" ? "EDL (cd/m²)" : "EDI (lx)";

  useEffect(() => {
    const getIntermediateVals = (indexVals, keySet) => {
      let heading = "";
      const displayArray = [];
      Object.keys(keySet).forEach((ki) => {
        heading = keySet[ki]; // default setup for the heading text
        // below is the actual snippet to add rows
        displayArray.push(
          <tr key={ki}>
            <th>{heading}</th>
            {indexVals.map((sample, index) =>
              checkNA(sample[ki], index, exponentialNotation)
            )}
          </tr>
        );
      });
      return displayArray;
    };

    const rfKeyset = {
      u: `CIE 1960 UCS [u]`,
      uPrime: `CIE 1976 UCS [u prime]`,
      v: `CIE 1960 UCS [v]`,
      vPrime: `CIE 1976 UCS [v prime]`,
      Duv: "Duv",
    };
    const displayRows = getIntermediateVals(
      calculation.colourFidelityIndex,
      rfKeyset
    );
    setRfDisplayRows(displayRows);

    const tm30Keyset = {
      tm30CCT: `TM30 - CCT (K) - Ohno, 2013`,
      tm30Duv: `TM30 - Duv`,
      tm30Rf: `TM30 - Colour Fidelity Index [Rf]`,
      Rg: `TM30 - Gamut Index (Rg)`,
      RcsH1: `TM30 - Rcs, h1`,
      RfH1: `TM30 - Rf, h1`,
    };
    const tm30rfDisplayRows = getIntermediateVals(
      calculation.tm30ColourFidelityIndex,
      tm30Keyset
    );
    setTm30DisplayRows(tm30rfDisplayRows);

    setCalculationTableDownloadUrl(
      CalculationTableCSV({
        radianceOrIrradiance,
        measurementLabels,
        ...calculation,
      })
    );
    // Ref for passing values to HueAngleBins.jsx
    setRefHAB(calculation.tm30ColourFidelityIndex);

    if (isLoaded) {
      const worker = new Worker();
      worker.postMessage([rows, sampleCount]);
      worker.onmessage = (event) => {
        setCalculation(event.data);
        setLoaded(false);
        worker.terminate();
        // eslint-disable-next-line no-console
        console.log(`worker terminated`);
      };
      // const t1 = performance.now();
      // console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    rows,
    sampleCount,
    exponentialNotation,
    measurementLabels,
    radianceOrIrradiance,
    calculation,
  ]);

  return (
    <section>
      <div className="row">
        <div className="col text-left">
          <label htmlFor="calculation-exponential-notation">
            <input
              type="checkbox"
              checked={exponentialNotation}
              onChange={handleExponentialNotation}
              id="calculation-exponential-notation"
            />
            {" Use exponential notation?"}
          </label>
        </div>
        <div className="col text-center">
          <label htmlFor="calculation-advanced-calculations">
            <input
              type="checkbox"
              checked={advanced}
              onChange={handleAdvanced}
              id="calculation-advanced-calculations"
            />
            {" Display advanced calculations?"}
          </label>
        </div>
        <div className="col text-center">
          <label htmlFor="tm30display">
            <input
              type="checkbox"
              checked={tm30display}
              onChange={handleTm30display}
              id="tm30display"
            />
            {" Display IES TM-30-20 calculations"}
          </label>
        </div>
        <div className="col text-right">
          <a
            download="download-calc.csv"
            className="btn btn-outline-secondary"
            href={calculationTableDownloadUrl}
          >
            Download CSV
          </a>
        </div>
      </div>
      <table className="table table-sm mt-3 result-table">
        <CalculationTableHeader measurementLabels={measurementLabels} />
        <tbody>
          <CalculationTableRow
            heading={
              radianceOrIrradiance === "radiance"
                ? "Luminance (cd/m²)"
                : "Illuminance (lx)"
            }
            samples={calculation.luminanceTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="CIE 1931 xy chromaticity [x]"
            samples={calculation.chromaticity31.map(({ x }) => x)}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="CIE 1931 xy chromaticity [y]"
            samples={calculation.chromaticity31.map(({ y }) => y)}
            exponentialNotation={exponentialNotation}
          />
          {advanced && (
            <>
              <CalculationTableRow
                heading="CIE 1964 x₁₀y₁₀ chromaticity [x₁₀]"
                samples={calculation.chromaticity64.map(({ x }) => x)}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="CIE 1964 x₁₀y₁₀ chromaticity [y₁₀]"
                samples={calculation.chromaticity64.map(({ y }) => y)}
                exponentialNotation={exponentialNotation}
              />
            </>
          )}
          <CalculationTableRow
            heading={`S-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={calculation.sConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`M-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={calculation.mConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`L-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={calculation.lConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Rhodopic ${radianceOrIrradiance} (${units})`}
            samples={calculation.rodTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Melanopic ${radianceOrIrradiance} (${units})`}
            samples={calculation.melTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`S-cone-opic ${equivalentDaylightUnit}`}
            samples={calculation.equivalentDaylightAlphaOpic.sc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`M-cone-opic ${equivalentDaylightUnit}`}
            samples={calculation.equivalentDaylightAlphaOpic.mc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`L-cone-opic ${equivalentDaylightUnit}`}
            samples={calculation.equivalentDaylightAlphaOpic.lc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Rhodopic ${equivalentDaylightUnit}`}
            samples={calculation.equivalentDaylightAlphaOpic.rh}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Melanopic ${equivalentDaylightUnit}`}
            samples={calculation.equivalentDaylightAlphaOpic.mel}
            exponentialNotation={exponentialNotation}
          />
          {advanced && (
            <>
              <CalculationTableRow
                heading="S-cone-opic ELR"
                samples={calculation.alphaOpicEfficiency.sc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="M-cone-opic ELR"
                samples={calculation.alphaOpicEfficiency.mc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="L-cone-opic ELR"
                samples={calculation.alphaOpicEfficiency.lc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="Rhodopic ELR"
                samples={calculation.alphaOpicEfficiency.rh}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="Melanopic ELR"
                samples={calculation.alphaOpicEfficiency.mel}
                exponentialNotation={exponentialNotation}
              />
            </>
          )}
          <CalculationTableRow
            heading="CCT (K) - Ohno, 2013"
            samples={calculation.colourFidelityIndex.map(({ CCT }) => CCT)}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="CCT (K) - Robertson, 1968"
            samples={calculation.colourRenderingIndex.map(({ CCT }) => CCT)}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="Colour Rendering Index [Ra]"
            samples={calculation.colourRenderingIndex.map(({ Ra }) => Ra)}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="Colour Fidelity Index [Rf]"
            samples={calculation.colourFidelityIndex.map(({ Rf }) => Rf)}
            exponentialNotation={exponentialNotation}
          />
          {/* <CalculationTableRow
            heading="Colour Fidelity Index [Rf] Rounded"
            samples={calculation.colourFidelityIndexRounded.map(
              ({ Rf }) => Rf
            )}
            exponentialNotation={exponentialNotation}
          /> */}
          {advanced && <>{rfDisplayRows}</>}
          {tm30display && <>{tm30DisplayRows}</>}
        </tbody>
      </table>
      {tm30display && (
        <>
          <h2 className="my-3">Colour Vector Graphics</h2>
          <CVGPlot measurementLabels={measurementLabels} refHAB={refHAB} />
        </>
      )}
    </section>
  );
};

CalculationTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  setLoaded: PropTypes.func.isRequired,
  refHAB: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.objectOf(PropTypes.number),
          ])
        ),
      ])
    )
  ),
  setRefHAB: PropTypes.func.isRequired,
};

CalculationTable.defaultProps = {
  refHAB: null,
};

export default CalculationTable;
