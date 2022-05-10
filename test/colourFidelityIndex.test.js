/**
 * luox-NRC-CIERf is a module to calculate parameters for light source colour appearance and colour rendering in the luox platform.
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada. National Research Council of Canada. Ottawa, Canada.
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License v 3.0 as published by the Free Software Foundation.
 * Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 **/

import {
  setPlanckianTable,
  uvToCorrelatedColourTemperatureOhno,
  calculateColourFidelityIndex,
  planckianRelativeSPD,
} from "../src/javascript/colourFidelityIndex";
import { interpolateLinearly } from "../src/javascript/colourRenderingIndex";
import { calculateChromaticity31 } from "../src/javascript/chromaticity";
import CIEXYZ64 from "../data/ciexyz64.json";

import fl1 from "./fixtures/fl1.json";
import fl2 from "./fixtures/fl2.json";

describe("setPlanckianTable", () => {
  it("calculates the distance between <ui, vi> and <u, v> and adds a column to the table", () => {
    const uv = setPlanckianTable(0.24152, 0.34342);
    expect(uv[1].di.toFixed(3)).toEqual("0.207");
  });
});

describe("uvToCorrelatedColourTemperatureOhno", () => {
  it("calculates the CCT from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.315221043940594
    );
    expect(cct.T.toFixed(3)).toEqual("6501.157");
  });
  it("calculates the Duv from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.315221043940594
    );
    expect(cct.Duv.toFixed(3)).toEqual("0.008");
  });

  it("does not raise a undefined Error when out of bounds for Planckian", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.25686519407615915,
      0.010984366851941015
    );
    expect(cct.T.toFixed(3)).toEqual("0.000");
  });
});

describe("planckianRelativeSPD", () => {
  it("calculates the Planckian Relative SPD at temperature T", () => {
    const temperature = 4224.4;

    expect(planckianRelativeSPD(700e-9, temperature).toFixed(3)).toEqual(
      "17292035259218.445"
    );
    expect(planckianRelativeSPD(500e-9, temperature).toFixed(3)).toEqual(
      "13193538509721.008"
    );
    expect(planckianRelativeSPD(450e-9, temperature).toFixed(3)).toEqual(
      "10475846113565.602"
    );
  });
});

describe("calculateColourFidelityIndex", () => {
  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 5nm spacing", () => {
    expect(calculateColourFidelityIndex(fl1).Rf.toFixed(0)).toEqual("81");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 1nm spacing", () => {
    expect(
      calculateColourFidelityIndex(interpolateLinearly(fl1)).Rf.toFixed(0)
    ).toEqual("81");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 5nm spacing", () => {
    expect(calculateColourFidelityIndex(fl2).Rf.toFixed(0)).toEqual("70");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 1nm spacing", () => {
    expect(
      calculateColourFidelityIndex(interpolateLinearly(fl2)).Rf.toFixed(0)
    ).toEqual("70");
  });
});

// describe("sumProduct", () => {
//   it("calculates the sum product value from the illuminant of the matching wavelength value", () => {
//     const jsonSpectra = jsonifySpectra(refSpectra);

//     expect(
//       sumProduct(jsonSpectra, CIEXYZ64, "X")
//     ).toEqual();
//   });

// });
