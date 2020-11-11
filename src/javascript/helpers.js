export const asExponential = (number) => {
  const parts = number.toExponential(2).split(/(e\+|-)/);
  return parts[0] + parts[1] + parts[2].padStart(2, "0");
};

export const asDecimal = (number, precision = 4) => number.toFixed(precision);

export const radianceOrIrradianceSIUnit = (radianceOrIrradiance) => {
  let units = "";
  if (radianceOrIrradiance === "radiance") {
    units = "W ⋅ m⁻² ⋅ sr⁻¹ ⋅ nm⁻¹";
  } else if (radianceOrIrradiance === "irradiance") {
    units = "W ⋅ m⁻² ⋅ nm⁻¹";
  }
  return units;
};
