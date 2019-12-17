export const tableToCSV = (table) => {
  const rows = Array.from(table.querySelectorAll('tr'))
  return rows.reduce((acc, row) => {
      const cells = Array.from(row.querySelectorAll('td, th'))
      const csv = cells.map((item) => item.textContent).join(',')
      return acc.concat(csv)
  }, []).join('\n')
}

export const downloadCSVButton = (table, className, filename, title) => {
  const csv = tableToCSV(table)
  const csvFile = new Blob([csv], {"type": 'text/csv'})
  const downloadLink =  document.createElement('a')
  downloadLink.download = `${filename}.csv`
  downloadLink.href = window.URL.createObjectURL(csvFile)
  downloadLink.className = className
  downloadLink.innerText = title
  return downloadLink
}
