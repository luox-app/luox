/* eslint-disable prefer-named-capture-group */
export const asExponential = (number) => {
  const parts = number.toExponential(2).split(/(e\+|-)/)
  return parts[0] + parts[1] + parts[2].padStart(2, '0')
}
/* eslint-enable prefer-named-capture-group */

export const asDecimal = (number, precision = 2) => number.toFixed(precision)

export const sampleTitles = (sampleCount) => {
  return new Array(sampleCount).fill("").map((_, index) => "S"+index)
}

export const radianceOrIrradianceSIUnit = (radianceOrIrradiance) => {
  let units = ''
  if (radianceOrIrradiance === 'radiance') {
    units = 'W ⋅ m⁻² ⋅ sr⁻¹ ⋅ nm⁻¹'
  } else if (radianceOrIrradiance === 'irradiance') {
    units = 'W ⋅ m⁻² ⋅ nm⁻¹'
  }
  return units
}

export const asInteger = (number) => number.toFixed(0)
