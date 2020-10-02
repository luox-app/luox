/*
 * This is a port of the Matlab function defined in docs/sprague.m
 *
 */
const sprague = (spectrum, f) => {
  const c1 = [884, -1960, 3033, -2648, 1080, -180];
  const c2 = [508, -540, 488, -367, 144, -24];
  const c3 = [-24, 144, -367, 488, -540, 508];
  const c4 = [-180, 1080, -2648, 3033, -1960, 884];

  let r = spectrum;
  const lengthSpectrum = spectrum.length;

  let p1 = 0;
  for (let i = 0; i < 6; i += 1) {
    p1 += c1[i] * r[i];
  }
  p1 /= 209;

  let p2 = 0;
  for (let i = 0; i < 6; i += 1) {
    p2 += c2[i] * r[i];
  }
  p2 /= 209;

  let p3 = 0;
  for (let i = 0; i < 6; i += 1) {
    p3 += c3[i] * r[i + 10];
  }
  p3 /= 209;

  let p4 = 0;
  for (let i = 0; i < 6; i += 1) {
    p4 += c4[i] * r[i + 10];
  }
  p4 /= 209;

  r = [p1, p2].concat(r).concat([p3, p4]);

  const N = lengthSpectrum + 4;

  const p = new Array(f * (N - 5) + 1).fill(0);

  const xx = new Array(f - 1);
  for (let i = 0; i < xx.length; i += 1) {
    xx[i] = (i + 1) / f;
  }

  for (let j = 2; j < N - 3; j += 1) {
    const a0 = r[j];
    const a1 =
      (2 * r[j - 2] - 16 * r[j - 1] + 16 * r[j + 1] - 2 * r[j + 2]) / 24;
    const a2 =
      (-r[j - 2] + 16 * r[j - 1] - 30 * r[j] + 16 * r[j + 1] - r[j + 2]) / 24;
    const a3 =
      (-9 * r[j - 2] +
        39 * r[j - 1] -
        70 * r[j] +
        66 * r[j + 1] -
        33 * r[j + 2] +
        7 * r[j + 3]) /
      24;
    const a4 =
      (13 * r[j - 2] -
        64 * r[j - 1] +
        126 * r[j] -
        124 * r[j + 1] +
        61 * r[j + 2] -
        12 * r[j + 3]) /
      24;
    const a5 =
      (-5 * r[j - 2] +
        25 * r[j - 1] -
        50 * r[j] +
        50 * r[j + 1] -
        25 * r[j + 2] +
        5 * r[j + 3]) /
      24;

    const y = new Array(xx.length);
    for (let i = 0; i < xx.length; i += 1) {
      y[i] =
        a0 +
        a1 * xx[i] +
        a2 * xx[i] ** 2 +
        a3 * xx[i] ** 3 +
        a4 * xx[i] ** 4 +
        a5 * xx[i] ** 5;
    }

    const index = j - 2;

    const idx = index * f;

    p[idx] = r[j];

    const start = idx + 1;
    const end = start + f - 1;
    let yIdx = 0;
    for (let i = start; i <= end; i += 1) {
      p[i] = y[yIdx];
      yIdx += 1;
    }
  }
  p[f * (N - 5)] = r[N - 3];

  return p;
};

export default sprague;
