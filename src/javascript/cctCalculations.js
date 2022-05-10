/**
 * luox-NRC-CIERf is a module to calculate parameters for light source
 * colour appearance and colour rendering in the luox platform.
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License v 3.0 as published by the Free Software Foundation.
 * Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 * */
import PLANCKIAN_CT_TABLE from "../data/planckian_table_cie.json"; // 1% CT-step table
import ROBERTSON from "../data/robertson.json";

/**
 * Adds another column to the given planckian table for the
 * distance between table ui,vi and the given u, v
 * @param {*} u
 * @param {*} v
 */
export const setPlanckianTable = (u, v) => {
  const planckTable = {};

  Object.keys(PLANCKIAN_CT_TABLE).forEach((key) => {
    planckTable[key] = {
      Ti: PLANCKIAN_CT_TABLE[key].Ti,
      ui: PLANCKIAN_CT_TABLE[key].ui,
      vi: PLANCKIAN_CT_TABLE[key].vi,
      di:
        ((u - PLANCKIAN_CT_TABLE[key].ui) ** 2 +
          (v - PLANCKIAN_CT_TABLE[key].vi) ** 2) **
        0.5,
    };
  });
  return planckTable;
};

/**
 * Returns the shortest distance index in given planckian table using Ohno method
 * @param {*} planckian_table
 * @return index of given planckian table, which contains the lowest di value
 */
export const findPlanckianMinimalDistance = (table) => {
  // init to acquire the first item to compare
  let minIndex = Object.keys(table)[0];
  let minDistance = table[minIndex];
  Object.keys(table).forEach((i) => {
    minDistance = table[minIndex].di;
    if (table[i].di <= minDistance) {
      // update the index if current distance value is less or equal
      minIndex = i;
    }
  });
  if (minIndex === 0) {
    // "minimal distance index is on the lowest planckian table bound"
    minIndex += 1;
  } else if (minIndex === table.length - 1) {
    // "minimal distance index is on the highest planckian table bound"
    minIndex -= 1;
  }
  return minIndex;
};

/**
 * CIE 2 degree standard observer is used for the calculation of the CCT, T1 (from ciexyz31.json).
 * CCT based on CIE 15, by Ohno (2014), which
 * 'is accurate to within 1 K for a CCT range of 1000 K to 20000K and a Duv^2 range from -0,03 to 0,03"
 *
 * Returns the correlated colour temperature T_cp and Δ_uv from given
 * CIE UCS colourspace uv chromaticity coordinates, colour matching functions and
 * temperature range using Yoshi Ohno (2014) method.
 *
 * The iterations parameter defines the calculations precision:
 * The higher its value, the more planckian tables will be generated through
 * cascade expansion in order to converge to the exact solution.
 *
 * @param {*} u
 * @param {*} v
 * @param {*} start
 * @param {*} end
 * @returns
 */
export const uvToCorrelatedColourTemperatureOhno = (u, v) => {
  const vx = v;
  // 0. initialize planckian table with distance from given u, v
  const planckianTable = setPlanckianTable(u, v);

  // 1. find the point i = m, where di is the smallest in the table
  const m = parseInt(findPlanckianMinimalDistance(planckianTable), 10);

  const [Tuvdip, Tuvdi, Tuvdin] = [
    planckianTable[m - 1],
    planckianTable[m],
    planckianTable[m + 1],
  ];

  const [Tip, uip, vip, dip] = [Tuvdip.Ti, Tuvdip.ui, Tuvdip.vi, Tuvdip.di];
  const [Ti, di] = [Tuvdi.Ti, Tuvdi.di];
  const [Tin, uin, vin, din] = [Tuvdin.Ti, Tuvdin.ui, Tuvdin.vi, Tuvdin.di];

  // Triangular Solution
  const l = ((uin - uip) ** 2 + (vin - vip) ** 2) ** 0.5;
  const x = (dip ** 2 - din ** 2 + l ** 2) / (2 * l);

  const vtx = vip + (vin - vip) * (x / l);
  let T = Tip + (Tin - Tip) * (x / l);
  let Duv = (dip ** 2 - x ** 2) ** 0.5;

  // Parabolic solution
  if (Duv >= 0.002) {
    const X = (Tin - Ti) * (Tip - Tin) * (Ti - Tip);
    const a =
      (Tip * (din - di) + Ti * (dip - din) + Tin * (di - dip)) * X ** -1;
    const b =
      -1 *
      (Tip ** 2 * (din - di) + Ti ** 2 * (dip - din) + Tin ** 2 * (di - dip)) *
      X ** -1;
    const c =
      -1 *
      (dip * (Tin - Ti) * Ti * Tin +
        di * (Tip - Tin) * Tip * Tin +
        din * (Ti - Tip) * Tip * Ti) *
      X ** -1;
    T = (-1 * b) / (2 * a);
    Duv = a * T ** 2 + b * T + c;
  }

  // Sign function as described in (Ohno, 2014)
  if (vx - vtx < 0) {
    Duv *= -1;
  }
  T *= 0.99991;

  return { T, Duv };
};

/**
 * Returns the spectral radiance of a blackbody at thermodynamic temperature, T
 * Note that the refractive index of the medium, n, which is normally used
 * in the Planck’s equation for radiometric applications, is not
 * used for the calculation of CCT by Ohno (2014)
 *
 * @param {*} lambda : wavelength in the medium
 * @param {*} t : temperature (K)
 * @returns {*} L : spectral radiance
 */
export const planckEquationOhno = (lambda, t) => {
  const c1 = 3.7417749e-16;
  const c2 = 1.4388e-2;
  return (
    ((c1 * lambda ** -5) / Math.PI) * (Math.exp(c2 / (lambda * t)) - 1) ** -1
  );
};

/**
 * Requires the closest point on the Planckian locus
 * - Chromaticity coordinate (u, v) of the test source
 * - Closest point on the Planckian locus (u0, v0)
 * @param {*} u
 * @param {*} v
 * @param {*} u0
 * @param {*} v0
 * @returns Duv
 */
export const duvEquation = (u, v, u0, v0) => {
  let duv = 0; // initialization
  if (v - v0 >= 0) {
    duv = ((u - u0) ** 2 + ((2 / 3) * v - (2 / 3) * v0) ** 2) ** 1 / 2;
  } else {
    duv = (-1.0 * ((u - u0) ** 2 + ((2 / 3) * v - (2 / 3) * v0) ** 2) ** 1) / 2;
  }
  return duv;
};

export const correlatedColourTemperature = (x, y) => {
  const n = (x - 0.332) / (y - 0.1858);
  const cct = -449 * n ** 3 + 3525 * n ** 2 - 6823.3 * n + 5520.33;
  return cct;
};

export const uvToCorrelatedColourTemperatureRobertson = (u, v) => {
  let lastdt = 0;
  let lastdv = 0;
  let lastdu = 0;
  let T = 0;

  for (let i = 1; i <= 30; i += 1) {
    const wrRuvt = ROBERTSON[i];
    const wrRuvtPrevious = ROBERTSON[i - 1] || {};

    let du = 1;
    let dv = wrRuvt.t;
    let length = Math.sqrt(1 ** 2 + dv ** 2);

    du /= length;
    dv /= length;

    let uu = u - wrRuvt.u;
    let vv = v - wrRuvt.v;

    let dt = -uu * dv + vv * du;

    if (dt <= 0 || i === 30) {
      if (dt > 0) {
        dt = 0;
      }

      dt = -dt;

      let f = 0;
      if (i === 1) {
        f = 0;
      } else {
        f = dt / (lastdt + dt);
      }

      T = 1.0e6 / (wrRuvtPrevious.r * f + wrRuvt.r * (1 - f));

      uu = u - (wrRuvtPrevious.u * f + wrRuvt.u * (1 - f));
      vv = v - (wrRuvtPrevious.v * f + wrRuvt.v * (1 - f));

      du = du * (1 - f) + lastdu * f;
      dv = dv * (1 - f) + lastdv * f;

      length = Math.sqrt(du ** 2 + dv ** 2);

      du /= length;
      dv /= length;

      break;
    }

    lastdt = dt;
    lastdu = du;
    lastdv = dv;
  }

  return T;
};
