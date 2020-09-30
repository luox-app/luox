export default class SpectralPowerDistribution {
  constructor(rows) {
    this.rows = rows;
  }

  get interval() {
    const intervals = new Set();

    for (
      let i = 0, { wavelengths } = this;
      i < wavelengths.length - 1;
      i += 2
    ) {
      intervals.add(wavelengths[i + 1] - wavelengths[i]);
    }

    if (intervals.size > 1) {
      throw new Error("Wavelengths are at irregular intervals");
    }

    return [...intervals][0];
  }

  get wavelengths() {
    return this.rows.map(([wavelength]) => wavelength);
  }

  get measurements() {
    const sampleCount = this.rows[0].length - 1;

    return [...Array(sampleCount).keys()].map((index) =>
      this.rows.map(([wavelength, ...measurements]) => [
        wavelength,
        measurements[index],
      ])
    );
  }
}
