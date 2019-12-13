const asExponential = (number) => number.toExponential(2)
const asDecimal = (number) => number.toFixed(2)

const appendCells = (table, cellType, cells) => {
  const row = document.createElement("tr")
  const domCells = cells.map((cellText) =>  {
    const cell = document.createElement(cellType)
    const text = document.createTextNode(cellText)
    cell.appendChild(text)
    return cell
  })
  for (cell of domCells) {
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

const createTableHeader = (table, sampleCount) => {
  const sampleTitles = new Array(sampleCount).fill("").map((_, index) => "S"+index)
  const titles = ["Condition", ...sampleTitles]
  appendCells(table, "th", titles)
}

const createTableRow = (table, wavelength, samples, formatter) => {
  const formattedSamples = samples.map(formatter)
  appendCells(table, "td", [wavelength, ...formattedSamples])
}

const parseCSV = async (file) => {
  const fileContents = await file.text()
  const lines = fileContents.match(/[^\r\n]+/g)
  const fieldCount = lines[0].split(",").length
  const rows = lines.map((line) =>
    line.split(",").map(parseFloat)
  ).filter(([wavelength, ...row]) =>
    wavelength >= 380 && wavelength <= 780
  )
  return [rows, fieldCount -1]
}

const mapSamples = (rows, func) => {
  return rows.map((row) => {
    const [wavelength, ...samples] = row
    const mapped = samples.map((sample) =>
      func(wavelength, sample)
    )
    return [wavelength, ...mapped]
  })
}

const reduceSamples = (rows, sampleCount, func) => {
  return rows.reduce((acc, row) => {
    const [wavelength, ...samples] = row
    return acc.map((luminance, index) =>
      func(wavelength, luminance, samples[index])
    )},
    new Array(sampleCount).fill(0)
  )
}

const integrateWithWeights = (rows, sampleCount, data, key) => {
  const weighted = mapSamples(rows, (wavelength, sample) => {
    const weight = data[wavelength][key]
    return sample * weight
  })

  return reduceSamples(weighted, sampleCount,
    (w, runningTotal, sample) => runningTotal + sample
  )
}

const calculateLuminance = async (rows, sampleCount) => {
  const data = await getvl1924Data()
  const key = 'vl1924'
  const samplesInWatts = integrateWithWeights(rows, sampleCount, data, key)
  return samplesInWatts.map((sample) => sample * 683)
}

const calculateIrradiance = async (rows, sampleCount, key) => {
  const data = await getcies026Data()
  const samplesInWatts = integrateWithWeights(rows, sampleCount, data, key)
  return samplesInWatts.map((sample) => sample * 1000)
}

const loadJSON = (filename) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.addEventListener("load", () => {
      resolve(JSON.parse(request.responseText))
    })
    request.open("GET", filename)
    request.send()
  })
}

const getvl1924Data = () => loadJSON("./vl1924.json")
const getcies026Data = () => loadJSON("./cies026.json")

const fileInput = document.getElementById('file-input')
const spectrumTable = document.getElementById('spectrum-table')

const handleFiles = async (event) => {
  const fileList = fileInput.files
  for (const file of fileList) {
    const [rows, sampleCount] = await parseCSV(file)

    createTableHeader(spectrumTable, sampleCount)

    const luminanceTotals = await calculateLuminance(rows, sampleCount)
    const sConeTotals = await calculateIrradiance(rows, sampleCount, 'sCone')
    const mConeTotals = await calculateIrradiance(rows, sampleCount, 'mCone')
    const lConeTotals = await calculateIrradiance(rows, sampleCount, 'lCone')
    const rodTotals = await calculateIrradiance(rows, sampleCount, 'rod')
    const melTotals = await calculateIrradiance(rows, sampleCount, 'mel')
    createTableRow(spectrumTable, "Illuminance [lux]", luminanceTotals, asDecimal)
    createTableRow(spectrumTable, "S-cone-opic irradiance (mW/m²)", sConeTotals, asDecimal)
    createTableRow(spectrumTable, "M-cone-opic irradiance (mW/m²)", mConeTotals, asDecimal)
    createTableRow(spectrumTable, "L-cone-opic irradiance (mW/m²)", lConeTotals, asDecimal)
    createTableRow(spectrumTable, "Rhodopic irradiance (mW/m²)", rodTotals, asDecimal)
    createTableRow(spectrumTable, "Melanopic irradiance (mW/m²)", melTotals, asDecimal)

    createSampleTableHeader(spectrumTable, sampleCount)
    for (const row of rows) {
      const [wavelength, ...samples] = row
      createTableRow(spectrumTable, wavelength, samples, asExponential)
    }
  }
}

fileInput.addEventListener("change", handleFiles, false);
