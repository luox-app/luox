import Papa from "papaparse";

const parseCSV = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      dynamicTyping: true,
      header: false,
      error: (error) => reject(error),
      complete: (results) => resolve(results),
    });
  });
};

export { parseCSV as default };
