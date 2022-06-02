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
import { create, all } from "mathjs";
import ROBERTSON from "../data/robertson.json";
import PLANCKIAN_CT_TABLE from "../data/planckian_table_cie.json"; // 1% CT-step table
import PLANCKIAN_CT_TABLE_CIE_CALC from "../data/planckian_table_cie_calc.json"; // 1% CT-step table
import PLANCKIAN_CT_TABLE_TM30 from "../data/planckian_table_ies.json"; // 0.25% CT-step table

const math = create(all);

/**
 * Adds another column to the given planckian table for the
 * distance between table ui,vi and the given u, v
 * @param {*} u
 * @param {*} v
 */
export const setPlanckianTableRoundedCIE = (u, v) => {
  const planckMap = {};

  Object.keys(PLANCKIAN_CT_TABLE).forEach((key) => {
    planckMap[key] = {
      Ti: PLANCKIAN_CT_TABLE[key].Ti,
      ui: PLANCKIAN_CT_TABLE[key].ui,
      vi: PLANCKIAN_CT_TABLE[key].vi,
      di: math.round(
        math.sqrt(
          math.pow(u - PLANCKIAN_CT_TABLE[key].ui, 2) +
            math.pow(v - PLANCKIAN_CT_TABLE[key].vi, 2)
        ),
        15
      ),
    };
  });
  return planckMap;
};

/**
 * Adds another column to the given planckian table for the
 * distance between table ui,vi and the given u, v
 * @param {*} u
 * @param {*} v
 */
export const setPlanckianTableCIECalc = () => {
  const planckMap = {};

  Object.keys(PLANCKIAN_CT_TABLE_CIE_CALC).forEach((key) => {
    planckMap[key] = {
      Ti: PLANCKIAN_CT_TABLE_CIE_CALC[key].Ti,
      ui: PLANCKIAN_CT_TABLE_CIE_CALC[key].ui,
      vi: PLANCKIAN_CT_TABLE_CIE_CALC[key].vi,
      di: PLANCKIAN_CT_TABLE_CIE_CALC[key].di,
    };
  });
  return planckMap;
};

/**
 * Adds another column to the given planckian table for the
 * distance between table ui,vi and the given u, v
 * @param {*} u
 * @param {*} v
 */
export const setPlanckianTableCIE = (u, v) => {
  const planckMap = {};

  Object.keys(PLANCKIAN_CT_TABLE).forEach((key) => {
    planckMap[key] = {
      Ti: PLANCKIAN_CT_TABLE[key].Ti,
      ui: PLANCKIAN_CT_TABLE[key].ui,
      vi: PLANCKIAN_CT_TABLE[key].vi,
      di: math.round(
        math.sqrt(
          math.round(
            math.round(
              math.pow(math.round(u - PLANCKIAN_CT_TABLE[key].ui, 15), 2),
              15
            ) +
              math.round(
                math.pow(math.round(v - PLANCKIAN_CT_TABLE[key].vi, 15), 2),
                15
              ),
            15
          )
        ),
        15
      ),
    };
  });
  return planckMap;
};

/**
 * Adds another column to the given planckian table for the
 * distance between table ui,vi and the given u, v
 * @param {*} u
 * @param {*} v
 */
export const setPlanckianTableTM30 = (u, v) => {
  const planckMap = {};
  const cctTable = PLANCKIAN_CT_TABLE_TM30;

  Object.keys(cctTable).forEach((key) => {
    planckMap[key] = {
      Ti: cctTable[key].Ti,
      ui: cctTable[key].ui,
      vi: cctTable[key].vi,
      di: math.round(
        math.sqrt(
          math.round(
            math.pow(u - cctTable[key].ui, 2) +
              math.pow(v - cctTable[key].vi, 2),
            15
          )
        ),
        15
      ),
    };
  });
  return planckMap;
};

/**
 * Returns the shortest distance index in given planckian table using Ohno method
 * @param {*} table
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
export const uvToCorrelatedColourTemperatureOhno = (
  u,
  v,
  planckianVersion,
  UseCIEPlanckian
) => {
  const vx = v;
  // 0. initialize planckian table with distance from given u, v
  let planckianTable = setPlanckianTableCIE(u, v);
  if (planckianVersion === "IES") {
    planckianTable = setPlanckianTableTM30(u, v);
  }
  if (UseCIEPlanckian) {
    planckianTable = setPlanckianTableCIECalc();
  }
  let CCT = 0;
  let Duv = 0;

  // 1. find the point i = m, where di is the smallest in the table
  const m = parseInt(findPlanckianMinimalDistance(planckianTable), 10);

  // CIE plankian table highest index = 302
  // TM30 planckian table highest index = 1569
  // planckian table is bounded, the accessible range should be controlled.
  if (planckianVersion === "CIE") {
    if (m <= 0 || m >= 302) {
      return { CCT, Duv };
    }
  } else if (m <= 0 || m >= 1569) {
    // for IES
    return { CCT, Duv };
  }

  const [Tuvdip, Tuvdi, Tuvdin] = [
    planckianTable[m - 1],
    planckianTable[m],
    planckianTable[m + 1],
  ];

  const [Tip, uip, vip, dip] = [Tuvdip.Ti, Tuvdip.ui, Tuvdip.vi, Tuvdip.di];
  const [Ti, vi, di] = [Tuvdi.Ti, Tuvdi.vi, Tuvdi.di];
  const [Tin, uin, vin, din] = [Tuvdin.Ti, Tuvdin.ui, Tuvdin.vi, Tuvdin.di];

  if (planckianVersion === "CIE") {
    // Triangular Solution
    const l = math.round(
      math.sqrt(
        math.round(
          math.round(math.pow(uin - uip, 2), 15) +
            math.round(math.pow(vin - vip, 2), 15),
          15
        )
      ),
      15
    );
    const x = math.round(
      math.round(
        math.round(
          math.round(math.pow(dip, 2), 15) - math.round(math.pow(din, 2), 15),
          15
        ) + math.round(math.pow(l, 2), 15),
        15
      ) / math.round(2 * l, 15),
      15
    );
    const vtx = vip + (vin - vip) * (x / l);
    CCT = Tip + (Tin - Tip) * (x / l);

    Duv = math.round(
      math.sqrt(
        math.round(math.pow(dip, 2), 15) - math.round(math.pow(x, 2), 15)
      ),
      15
    );

    // Parabolic solution
    if (Duv >= 0.002) {
      const X = (Tin - Ti) * (Tip - Tin) * (Ti - Tip);
      const a =
        (Tip * (din - di) + Ti * (dip - din) + Tin * (di - dip)) * X ** -1;
      const b =
        -1 *
        (Tip ** 2 * (din - di) +
          Ti ** 2 * (dip - din) +
          Tin ** 2 * (di - dip)) *
        X ** -1;
      const c =
        -1 *
        (dip * (Tin - Ti) * Ti * Tin +
          di * (Tip - Tin) * Tip * Tin +
          din * (Ti - Tip) * Tip * Ti) *
        X ** -1;
      CCT = (-1 * b) / (2 * a);
      Duv = a * CCT ** 2 + b * CCT + c;
    }

    // Sign function as described in (Ohno, 2014)
    if (vx - vtx < 0) {
      Duv *= -1;
    }
    CCT *= 0.99991;
  } else {
    // IES TM30 20
    // Parabolic solution
    const a = dip / (Tip - Ti) / (Tip - Tin);
    const b = di / (Ti - Tip) / (Ti - Tin);
    const c = din / (Tin - Tip) / (Tin - Ti);
    const A = a + b + c;
    const B = -1.0 * (a * (Tin + Ti) + b * (Tip + Tin) + c * (Ti + Tip));
    const C = a * (Ti * Tin) + b * (Tip * Tin) + c * (Tip * Ti);
    const parabolicT = ((-1.0 * B) / (2.0 * A)) * (1 / 1.000006); // Parabolic T
    const parabolicDuv = A * math.pow(parabolicT, 2) + B * parabolicT + C; // Parabolic Duv

    // Triangular Solution
    const l = math.sqrt(math.pow(uin - uip, 2) + math.pow(vin - vip, 2)); // Dist. Ti+1, Ti-1
    // the numerator has different order of arithmetic than the document for calculating x in distance below
    const x =
      (math.pow(dip, 2) + math.pow(l, 2) - math.pow(din, 2)) / (2.0 * l);
    const triangularT = Tip + ((x * (Tin - Tip)) / l) * (1.0 / 1.000006);
    const triangularDuv = math.sqrt(math.pow(dip, 2) - math.pow(x, 2));

    // Linear shift
    const linearShift =
      triangularT + (parabolicT - triangularT) * triangularDuv * (1 / 0.002);

    if (triangularDuv < 0.002) {
      CCT = linearShift;
      Duv = triangularDuv;
    } else {
      CCT = parabolicT;
      Duv = parabolicDuv;
    }

    if (v < vi) {
      Duv *= -1.0;
    }
  }
  return { CCT, Duv };
};

export const uvToCorrelatedColourTemperatureOhnoRounded = (u, v) => {
  const vx = v;
  // 0. initialize planckian table with distance from given u, v
  const planckianTable = setPlanckianTableRoundedCIE(u, v);
  let CCT = 0;
  let Duv = 0;

  // 1. find the point i = m, where di is the smallest in the table
  const m = parseInt(findPlanckianMinimalDistance(planckianTable), 10);

  if (m <= 0 || m >= 302) {
    return { CCT, Duv };
  }

  const [Tuvdip, Tuvdi, Tuvdin] = [
    planckianTable[m - 1],
    planckianTable[m],
    planckianTable[m + 1],
  ];

  const [Tip, uip, vip, dip] = [Tuvdip.Ti, Tuvdip.ui, Tuvdip.vi, Tuvdip.di];
  const [Ti, di] = [Tuvdi.Ti, Tuvdi.di];
  const [Tin, uin, vin, din] = [Tuvdin.Ti, Tuvdin.ui, Tuvdin.vi, Tuvdin.di];

  // Triangular Solution
  const l = math.round(
    math.pow(math.pow(uin - uip, 2) + math.pow(vin - vip, 2), 0.5),
    15
  );
  const x = math.round(
    (math.pow(dip, 2) - math.pow(din, 2) + math.pow(l, 2)) / (2 * l),
    15
  );

  const vtx = math.round(vip + (vin - vip) * (x / l), 15);
  CCT = math.round(Tip + (Tin - Tip) * (x / l), 15);
  Duv = math.round(math.pow(math.pow(dip, 2) - math.pow(x, 2), 0.5), 15);

  // Parabolic solution
  if (Duv >= 0.002) {
    const X = math.round((Tin - Ti) * (Tip - Tin) * (Ti - Tip), 15);
    const a = math.round(
      (Tip * (din - di) + Ti * (dip - din) + Tin * (di - dip)) *
        math.pow(X, -1),
      15
    );
    const b =
      -1 *
      math.round(
        (math.pow(Tip, 2) * (din - di) +
          math.pow(Ti, 2) * (dip - din) +
          math.pow(Tin, 2) * (di - dip)) *
          math.pow(X, -1),
        15
      );
    const c =
      -1 *
      math.round(
        (dip * (Tin - Ti) * Ti * Tin +
          di * (Tip - Tin) * Tip * Tin +
          din * (Ti - Tip) * Tip * Ti) *
          math.pow(X, -1),
        15
      );
    CCT = math.round((-1 * b) / (2 * a), 15);
    Duv = math.round(a * math.pow(CCT, 2) + b * CCT + c, 15);
  }

  // Sign function as described in (Ohno, 2014)
  if (vx - vtx < 0) {
    Duv *= -1;
  }
  CCT *= 0.99991;

  return { CCT, Duv };
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
