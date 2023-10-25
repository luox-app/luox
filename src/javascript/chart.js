import Chart from "chart.js";
import { mapSamples } from "./rows";
import { radianceOrIrradianceSIUnit } from "./helpers";
import { referenceSpectrum } from "./referenceSpectra";

const generateHues = (sampleCount) => {
  const hues = [];
  const hueInterval = 360 / sampleCount;
  for (let i = 0; i < sampleCount; i += 1) {
    hues.push(i * hueInterval);
  }
  return hues;
};

const createChart = (
  chartCanvas,
  radianceOrIrradiance,
  rows,
  sampleCount,
  measurementLabels,
  yAxisScaling,
  displayedReference
) => {
  const datasets = [];
  const hues = generateHues(sampleCount);
  let data = rows;
  let yAxisLabel = `Spectral ${radianceOrIrradiance} [${radianceOrIrradianceSIUnit(
    radianceOrIrradiance
  )}]`;

  if (yAxisScaling === "normalised") {
    const maxValues = [];
    for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
      const spectrum = rows.map((row) => row[sampleIdx + 1]);
      maxValues[sampleIdx] = Math.max(...spectrum);
    }
    data = mapSamples(rows, (wavelength, sample, sampleIndex) => {
      return sample / maxValues[sampleIndex];
    });
    yAxisLabel = `Normalised spectral ${radianceOrIrradiance} (relative to max.)`;
  } else if (yAxisScaling === "log10") {
    data = mapSamples(rows, (wavelength, sample) => {
      return Math.log10(sample);
    });
    yAxisLabel = `Log₁₀ spectral ${radianceOrIrradiance} [log₁₀ ${radianceOrIrradianceSIUnit(
      radianceOrIrradiance
    )}]`;
  }

  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const lineColor = `hsl(${hues[sampleIdx]},100%,50%)`;
    datasets[sampleIdx] = {
      backgroundColor: lineColor,
      borderColor: lineColor,
      data: data.map((row) => {
        return { x: row[0], y: row[sampleIdx + 1] };
      }),
      fill: false,
      label: measurementLabels[sampleIdx],
      pointRadius: 1,
    };
  }

  if (displayedReference !== "none") {
    const reference = referenceSpectrum(displayedReference, yAxisScaling);
    datasets.push({
      data: reference.data,
      label: reference.name,
      fill: false,
      pointRadius: 1,
    });
  }

  return new Chart(chartCanvas, {
    // eslint-disable-line no-new
    data: {
      datasets,
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "linear",
            scaleLabel: {
              display: true,
              labelString: "Wavelength [nm]",
            },
            ticks: {
              min: 380,
              max: 780,
              stepSize: 5,
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: yAxisLabel,
            },
          },
        ],
      },
    },
    type: "line",
  });
};

export default createChart;
