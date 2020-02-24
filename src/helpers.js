/* eslint-disable prefer-named-capture-group */
export const asExponential = (number) => {
  const parts = number.toExponential(2).split(/(e\+|-)/)
  return parts[0] + parts[1] + parts[2].padStart(2, '0')
}
/* eslint-enable prefer-named-capture-group */

export const asDecimal = (number) => number.toFixed(2)
