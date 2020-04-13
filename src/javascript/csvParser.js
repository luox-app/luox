import Papa from 'papaparse'

export const readCSV = async (file) => {
  const fileContents = await file.text()
  return fileContents
}

export const encodeCSV = (csv) => {
  return btoa(encodeURIComponent(csv))
}

export const parseCSV = (csv) => {
  const result = Papa.parse(csv,
    {"dynamicTyping": true,
    "header": false})
  const {data, errors} = result;

  const fieldCount = data[0].length
  const rows = data.filter(([wavelength]) =>
    wavelength >= 380 && wavelength <= 780
  )
  return [errors, rows, fieldCount -1]
}
