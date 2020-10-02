import Papa from "papaparse";
import { radianceOrIrradianceSIUnit } from "../helpers";

const SpectraCSV = ({ rows, radianceOrIrradiance }) => {
  const csv = Papa.unparse([
    [
      "Wavelength [nm]",
      `Spectral ${radianceOrIrradiance} [${radianceOrIrradianceSIUnit(
        radianceOrIrradiance
      )}]`,
    ],
    ...rows,
  ]);

  return window.URL.createObjectURL(
    new Blob(["\ufeff", csv], { type: "text/csv" })
  );
};

export default SpectraCSV;
