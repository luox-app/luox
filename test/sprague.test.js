var { sprague } = require('./../src/sprague.js')
var assert = require('assert');

describe('sprague', function() {
  it('should return unmodified input when interpolation factor is 1', function() {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const actual = sprague(input, 1)
    assert.deepStrictEqual(actual, input)
  });

  it('should generate intermediate values when interpolation factor is 2', function() {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const expected = [
      1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5,
      9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16
    ]
    const actual = sprague(input, 2)
    assert.deepStrictEqual(actual, expected)
  });

  it('should generate intermediate values when interpolation factor is 3', function() {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const expected = [
      1.0000, 1.3333, 1.6667, 2.0000, 2.3333, 2.6667, 3.0000, 3.3333, 3.6667, 4.0000,
      4.3333, 4.6667, 5.0000, 5.3333, 5.6667, 6.0000, 6.3333, 6.6667, 7.0000, 7.3333, 7.6667,
      8.0000, 8.3333, 8.6667, 9.0000, 9.3333, 9.6667, 10.0000, 10.3333, 10.6667,
      11.0000, 11.3333, 11.6667, 12.0000, 12.3333, 12.6667, 13.0000, 13.3333, 13.6667,
      14.0000, 14.3333, 14.6667, 15.0000, 15.3333, 15.6667, 16.0000
    ]
    const actual = sprague(input, 3)
    assert.deepStrictEqual(actual.map((n) => n.toFixed(4)), expected.map((n) => n.toFixed(4)))
  });
});
