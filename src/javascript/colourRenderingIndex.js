export const cie1960UCS = (x, y) => {
  const u = (4 * x) / ((-2 * x) + (12 * y) + 3)
  const v = (6 * y) / ((-2 * x) + (12 * y) + 3)

  return {
    u,
    v
  }
}

export const correlatedColourTemperature = (x, y) => {
  const n = (x-0.3320)/(y-0.1858)
  const cct = (-449*(n**3)) + (3525*(n**2)) - (6823.3*n) + 5520.33
  return cct
}

