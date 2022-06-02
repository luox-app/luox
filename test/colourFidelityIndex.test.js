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
 * */

import {
  setPlanckianTableCIE,
  uvToCorrelatedColourTemperatureOhno,
} from "../src/javascript/cctCalculations";
import {
  calculateColourFidelityIndex,
  planckianRelativeSPD,
} from "../src/javascript/colourFidelityIndex";
import { interpolateLinearly } from "../src/javascript/colourRenderingIndex";

import fl1 from "./fixtures/fl1.json";
import fl2 from "./fixtures/fl2.json";

describe("setPlanckianTableCIE", () => {
  it("calculates the distance between <ui, vi> and <u, v> and adds a column to the table", () => {
    const uv = setPlanckianTableCIE(0.24152, 0.34342);
    expect(uv[0].di.toFixed(5)).toEqual("0.20679");
  });
});

describe("uvToCorrelatedColourTemperatureOhno", () => {
  it("calculates the CCT from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.31522104394059,
      "CIE"
    );
    expect(cct.CCT.toFixed(5)).toEqual("6500.57177");
  });
  it("calculates the Duv from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.31522104394059,
      "CIE"
    );
    expect(cct.Duv.toFixed(5)).toEqual("0.00828");
  });

  it("does not raise a undefined Error when out of bounds for Planckian", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.25686519407615915,
      0.010984366851941015,
      "CIE"
    );
    expect(cct.CCT.toFixed(5)).toEqual("0.00000");
  });
});

describe("planckianRelativeSPD", () => {
  it("calculates the Planckian Relative SPD at temperature T", () => {
    const temperature = 4224.4;

    expect(planckianRelativeSPD(700e-9, temperature).toFixed(5)).toEqual(
      "17292035259218.44531"
    );
    expect(planckianRelativeSPD(500e-9, temperature).toFixed(5)).toEqual(
      "13193538509721.00781"
    );
    expect(planckianRelativeSPD(450e-9, temperature).toFixed(5)).toEqual(
      "10475846113565.60156"
    );
  });
});

describe("calculateColourFidelityIndex", () => {
  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 5nm spacing", () => {
    expect(calculateColourFidelityIndex(fl1).Rf.toFixed(5)).toEqual("80.63847");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 1nm spacing", () => {
    expect(
      calculateColourFidelityIndex(interpolateLinearly(fl1)).Rf.toFixed(5)
    ).toEqual("80.68472");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 5nm spacing", () => {
    expect(calculateColourFidelityIndex(fl2).Rf.toFixed(5)).toEqual("70.12080");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 1nm spacing", () => {
    expect(
      calculateColourFidelityIndex(interpolateLinearly(fl2)).Rf.toFixed(5)
    ).toEqual("70.20794");
  });
});
