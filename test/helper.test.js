import {asExponential, asInteger} from './../src/javascript/helpers.js'
import {assert} from 'chai'

describe('asExponential', () => {
  it('should return a number larger than 1 in scientific notation', () => {
    assert.equal('1.36e+02', asExponential(136))
  })

  it('should return a number smaller than 1 in scientific notation', () => {
    assert.equal('1.36e-02', asExponential(0.0136))
  })

  it('should not have a leading zero in the exponent for larger numbers', () => {
    assert.equal('1.36e+10', asExponential(13600000000))
  })
})

describe('asInteger', () => {
  it('returns an integer as-is', () => {
    assert.equal(asInteger(42), '42')
  })

  it('returns a decimal number as an integer', () => {
    assert.equal(asInteger(3.141), '3')
  })
})
