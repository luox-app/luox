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
  setPlanckianTableTM30,
  uvToCorrelatedColourTemperatureOhno,
} from "../src/javascript/cctCalculations";
import { calculateTM30ColourFidelityIndex } from "../src/javascript/tm30ColourFidelityIndex";
import { interpolateLinearly } from "../src/javascript/colourRenderingIndex";

import fl1 from "./fixtures/fl1.json";
import fl2 from "./fixtures/fl2.json";

describe("setPlanckianTableTM30", () => {
  it("calculates the distance between <ui, vi> and <u, v> and adds a column to the table", () => {
    const uv = setPlanckianTableTM30(0.24152, 0.34342);
    expect(uv[0].di.toFixed(5)).toEqual("0.20738");
  });
});

describe("uvToCorrelatedColourTemperatureOhno", () => {
  it("calculates the CCT from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.31522104394059,
      "IES"
    );
    expect(cct.CCT.toFixed(5)).toEqual("6500.56003");
  });
  it("calculates the Duv from u,v using the by Ohno method", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.19374137599823,
      0.31522104394059,
      "IES"
    );
    expect(cct.Duv.toFixed(5)).toEqual("0.00828");
  });

  it("does not raise a undefined Error when out of bounds for Planckian", () => {
    const cct = uvToCorrelatedColourTemperatureOhno(
      0.25686519407615915,
      0.010984366851941015,
      "IES"
    );
    expect(cct.CCT.toFixed(5)).toEqual("0.00000");
  });
});

describe("calculateTM30ColourFidelityIndex", () => {
  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 5nm spacing", () => {
    expect(calculateTM30ColourFidelityIndex(fl1).tm30Rf.toFixed(5)).toEqual(
      "80.63846"
    );
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL1 in 1nm spacing", () => {
    expect(
      calculateTM30ColourFidelityIndex(interpolateLinearly(fl1)).tm30Rf.toFixed(
        5
      )
    ).toEqual("80.68511");
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 5nm spacing", () => {
    expect(calculateTM30ColourFidelityIndex(fl2).tm30Rf.toFixed(5)).toEqual(
      "70.12121"
    );
  });

  it("calculates the correct Rf given the input spectrum for CIE illuminant FL2 in 1nm spacing", () => {
    expect(
      calculateTM30ColourFidelityIndex(interpolateLinearly(fl2)).tm30Rf.toFixed(
        5
      )
    ).toEqual("70.20860");
  });
});
