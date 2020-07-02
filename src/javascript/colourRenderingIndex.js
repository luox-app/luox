import D_ILLUMINANT_S from '../data/d_illuminant.json'
import ROBERTSON from '../data/robertson.json'

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

/* eslint-disable max-lines-per-function */
export const uvToCorrelatedColourTemperatureRobertson = (u, v) => {
  let lastdt = 0
  let lastdv = 0
  let lastdu = 0
  let T = 0

  for (let i = 1; i <= 31; i += 1) {
    const wrRuvt = ROBERTSON[i]
    const wrRuvtPrevious = ROBERTSON[i - 1]

    let du = 1
    let dv = wrRuvt.t
    let length = Math.sqrt((1**2) + (dv**2))

    du /= length
    dv /= length

    let uu = u - wrRuvt.u
    let vv = v - wrRuvt.v

    let dt = (-uu * dv) + (vv * du)

    if (dt <= 0 || i === 30) {
      if (dt > 0) {
        dt = 0
      }

      dt = -dt

      let f = 0
      if (i === 1) {
        f = 0
      } else {
        f = dt / (lastdt + dt)
      }

      T = 1.0e6 / ((wrRuvtPrevious.r * f) + (wrRuvt.r * (1 - f)))

      uu = u - ((wrRuvtPrevious.u * f) + (wrRuvt.u * (1 - f)))
      vv = v - ((wrRuvtPrevious.v * f) + (wrRuvt.v * (1 - f)))

      du = (du * (1 - f)) + (lastdu * f)
      dv = (dv * (1 - f)) + (lastdv * f)

      length = Math.sqrt((du**2) + (dv**2))

      du /= length
      dv /= length

      break
    }

    lastdt = dt
    lastdu = du
    lastdv = dv
  }

  return T
}
/* eslint-enable max-lines-per-function */

// Cite: CIE 015:2018 Annex E
const blackBodyspectralRadiance = (lambda, t) => {
  const pi = Math.PI
  // Plank constant
  const h = 6.62607015e-34
  // Boltzmann constant
  const k = 1.380649e-23
  // Speed of light in a vacuum
  const c = 299792458
  // Refractive index for dry air
  const n = 1

  const c1 = 2 * pi * h * (c**2)
  const c2 = h * c / k

  return ((c1 * (n**-2) * (lambda ** -5)) / pi) * (1 / (Math.exp(c2 / (n * lambda * t)) - 1))
}

// Cite: CIE 015:2018 Annex E
export const blackBodyReferenceSpectra = (lambda, T) => {
  return blackBodyspectralRadiance(lambda, T) / blackBodyspectralRadiance(560e-9, T)
}

// Cite:: CIE 015:2018 equations 4.7, 4.8, 4.9
export const daylightIlluminantChromaticity = (T) => {
  let x = 0
  if (T <= 7000) {
    x = (-4.6070e9 / (T ** 3)) + (2.9678e6 / (T ** 2)) + (0.09911e3 / T) + 0.244063
  } else {
    x = (-2.0064e9 / (T ** 3)) + (1.9018e6 / (T ** 2)) + (0.24748e3 / T) + 0.237040
  }

  const y = (-3 * (x ** 2)) + (2.870 * x) -0.275

  return {
    x,
    y
  }
}

// Cite:: CIE 015:2018 equations 4.10, 4.11
export const daylightReferenceSpectra = (lambda, T) => {
  const chromaticity = daylightIlluminantChromaticity(T);
  const m1 = (-1.3515 - (1.7703 * chromaticity.x) + (5.9114 * chromaticity.y)) / (0.0241 + (0.2562 * chromaticity.x) - (0.7341 * chromaticity.y));
  const m2 = (0.0300 - (31.4424 * chromaticity.x) + (30.0717 * chromaticity.y)) / (0.0241 + (0.2562 * chromaticity.x) - (0.7341 * chromaticity.y));

  const s0 = D_ILLUMINANT_S[lambda].S0;
  const s1 = D_ILLUMINANT_S[lambda].S1;
  const s2 = D_ILLUMINANT_S[lambda].S2;

  return s0 + (m1.toFixed(3) * s1) + (m2.toFixed(3) * s2)
}
