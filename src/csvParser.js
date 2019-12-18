import Papa from 'papaparse'

export const parseCSV = async (file) => {
  const fileContents = await file.text()
  const result = Papa.parse(fileContents,
    {"dynamicTyping": true,
    "header": false})
  const {data, errors} = result;

  const fieldCount = data[0].length
  const rows = data.filter(([wavelength]) =>
    wavelength >= 380 && wavelength <= 780
  )
  return [errors, rows, fieldCount -1]
}
