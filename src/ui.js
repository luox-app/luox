import {mapSamples, calculateLuminance, calculateIrradiance, interpolateData} from './rows.js'
import {downloadCSVButton} from './csvExport.js'
import Chart from 'chart.js'

const asExponential = (number) => number.toExponential(2)
const asDecimal = (number) => number.toFixed(2)

const conversionFunction = (areaSelect, powerSelect) => {
  const areaScale = parseFloat(areaSelect.options[areaSelect.selectedIndex].value)
  const powerScale = parseFloat(powerSelect.options[powerSelect.selectedIndex].value)
  return (wavelength, sample) =>  sample / powerScale * areaScale
}

const appendCells = (table, cellType, cells) => {
  const row = document.createElement("tr")
  const domCells = cells.map((cellText) =>  {
    const cell = document.createElement(cellType)
    const text = document.createTextNode(cellText)
    cell.appendChild(text)
    return cell
  })
  for (const cell of domCells) {
    row.appendChild(cell)
  }
  table.appendChild(row)
  return domCells
}

const createSampleTableHeader = (table, sampleCount) => {
  const titles = ["Wavelength [nm]", "Spectral irradiance [W/(m² nm)]"]
  const cells = appendCells(table, "th", titles)
  cells[1].setAttribute("colspan", sampleCount)
}

const sampleTitles = (sampleCount) => {
  return new Array(sampleCount).fill("").map((_, index) => "S"+index)
}

const createTableHeader = (table, sampleCount) => {
  const titles = ["Condition", ...sampleTitles(sampleCount)]
  appendCells(table, "th", titles)
}

const createTableRow = (table, wavelength, samples, formatter) => {
  const formattedSamples = samples.map(formatter)
  appendCells(table, "td", [wavelength, ...formattedSamples])
}

const createCalculationTable = (table, rows, sampleCount) => {
  createTableHeader(table, sampleCount)

  const luminanceTotals = calculateLuminance(rows, sampleCount)
  const sConeTotals = calculateIrradiance(rows, sampleCount, 'sCone')
  const mConeTotals = calculateIrradiance(rows, sampleCount, 'mCone')
  const lConeTotals = calculateIrradiance(rows, sampleCount, 'lCone')
  const rodTotals = calculateIrradiance(rows, sampleCount, 'rod')
  const melTotals = calculateIrradiance(rows, sampleCount, 'mel')
  createTableRow(table, "Illuminance [lux]", luminanceTotals, asDecimal)
  createTableRow(table, "S-cone-opic irradiance (mW/m²)", sConeTotals, asExponential)
  createTableRow(table, "M-cone-opic irradiance (mW/m²)", mConeTotals, asExponential)
  createTableRow(table, "L-cone-opic irradiance (mW/m²)", lConeTotals, asExponential)
  createTableRow(table, "Rhodopic irradiance (mW/m²)", rodTotals, asExponential)
  createTableRow(table, "Melanopic irradiance (mW/m²)", melTotals, asExponential)
}

const createSpectrumTable = (table, rows, sampleCount) => {
  createSampleTableHeader(table, sampleCount)
  for (const row of rows) {
    const [wavelength, ...samples] = row
    createTableRow(table, wavelength, samples, asExponential)
  }
}

const createDownloadButtons = (element, calculationTable, spectrumTable) => {
  const calcCSVButton = downloadCSVButton(calculationTable, "btn btn-primary", "download-calc", "Download calculation CSV")
  element.appendChild(calcCSVButton);
  const spectrumCSVButton = downloadCSVButton(spectrumTable, "btn btn-primary", "download-spectrum", "Download spectrum CSV")
  element.appendChild(spectrumCSVButton);
}

const generateHues = (sampleCount) => {
  const hues = []
  const hueInterval = 360 / sampleCount
  for (let i = 0; i < sampleCount; i += 1) {
    hues.push(i * hueInterval)
  }
  return hues
}

/* eslint-disable max-lines-per-function */
const createChart = (chartCanvas, rows, sampleCount) => {
  const datasets = []
  const hues = generateHues(sampleCount)
  const labels = sampleTitles(sampleCount)

  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const lineColor = 'hsl(' + hues[sampleIdx] + ',100%,50%)'
    datasets[sampleIdx] = {
      'backgroundColor': lineColor,
      'borderColor': lineColor,
      'data': rows.map((row) => row[sampleIdx + 1]),
      'fill': false,
      'label': labels[sampleIdx],
      'pointRadius': 1
    }
  }
  const waveLengths = rows.map((row) => row[0]);

  return new Chart(chartCanvas, { // eslint-disable-line no-new
    'data': {
      datasets,
      'labels': waveLengths
    },
    'options': {
      'scales': {
        'xAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Wavelength [nm]'
            },
            'ticks': {
              'maxTicksLimit': 20
            }
          }
        ],
        'yAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Spectral irradiance [W/(m² nm)]'
            }
          }
        ]
      }
    },
    'type': 'line'
  });
}
/* eslint-enable max-lines-per-function */

export const createTables = (rawRows, sampleCount, spectrumTable, calculationTable, areaUnitSelect, powerUnitSelect, footerButtons, chartCanvas) => {
  const unitConversion = conversionFunction(areaUnitSelect, powerUnitSelect)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  const maxValues = []
  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const spectrum = rows.map((row) => row[sampleIdx + 1])
    maxValues[sampleIdx] = Math.max(...spectrum)
  }
  const normalisedRows = mapSamples(rows, (wavelength, sample, sampleIndex) => {
    return sample / maxValues[sampleIndex]
  })
  const log10Rows = mapSamples(rows, (wavelength, sample) => {
    return Math.log10(sample)
  })

  createCalculationTable(calculationTable, interpolatedRows, sampleCount)

  const chart = createChart(chartCanvas, rows, sampleCount)
  $('#chart-data-source input[name="chart-data"]').click((event) => {
    let data = []
    let yAxisLabel = ''
    if (event.target.value === 'raw') {
      yAxisLabel = 'Spectral irradiance [W/(m² nm)]'
      data = rows
    } else if (event.target.value === 'normalised') {
      yAxisLabel = 'Normalised spectral irradiance (relative to max.)'
      data = normalisedRows
    } else if (event.target.value === 'log10') {
      yAxisLabel = 'Log spectral irradiance [log W/(m² nm)]'
      data = log10Rows
    }
    chart.options.scales.yAxes[0].scaleLabel.labelString = yAxisLabel
    chart.data.datasets.forEach((dataset, index) => {
      dataset.data = data.map((row) => row[index + 1])
    })
    chart.update()
  })
  $('#chart-data-source input#chart-data-raw').prop('checked', true)
  $('#chart-data-source').show()

  createSpectrumTable(spectrumTable, rows, sampleCount)
  createDownloadButtons(footerButtons, calculationTable, spectrumTable)
}

export const createErrorTable = (errors, errorsTable) => {
  for (const error of errors) {
    const row = document.createElement('tr')

    const rowNum = document.createElement('td')
    const rowNumText = document.createTextNode(`line ${error.row}`)
    rowNum.appendChild(rowNumText)

    const message = document.createElement('td')
    const messageText = document.createTextNode(error.message)
    message.appendChild(messageText)

    row.appendChild(rowNum)
    row.appendChild(message)

    errorsTable.appendChild(row)
  }
}
