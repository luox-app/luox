import Papa from "papaparse";
import { radianceOrIrradianceSIUnit } from "../helpers";

const SpectraCSV = ({ selectedRows, radianceOrIrradiance }) => {
  const csv = Papa.unparse([
    [
      "Wavelength [nm]",
      `Spectral ${radianceOrIrradiance} [${radianceOrIrradianceSIUnit(
        radianceOrIrradiance
      )}]`,
    ],
    ...selectedRows,
  ]);

  return window.URL.createObjectURL(
    new Blob(["\ufeff", csv], { type: "text/csv" })
  );
};

export default SpectraCSV;
