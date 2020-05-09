const appendCells = (table, cellType, cells) => {
  const row = document.createElement("tr")
  const domCells = cells.map((cellText) =>  {
    const cell = document.createElement(cellType)
    cell.append(cellText)
    return cell
  })
  for (const cell of domCells) {
    row.append(cell)
  }
  table.append(row)
  return domCells
}

export const createTableHeader = (table, titles) => {
  return appendCells(table, "th", titles)
}

export const createTableRow = (table, rowLabel, samples, formatter) => {
  const formattedSamples = samples.map((sample) => formatter(sample))
  const cells = appendCells(table, "td", [rowLabel, ...formattedSamples])
  cells.forEach((cell, index) => {
    if (index > 0) {
      cell.dataset.notationToggleable = true
    }
  })
}
