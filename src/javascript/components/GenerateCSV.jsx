import React from "react";
import { Link } from "react-router-dom";

const GenerateCSV = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">Reporting Light Exposure</h1>

        <p className="lead my-5">
          Generate a CSV file containing the spectral power distribution of all
          of the measurements taken during the experiment.
        </p>

        <h2 className="mb-3">Specification</h2>

        <p className="mb-3">
          The first field contains the wavelength in nanometers. The subsequent
          fields contain the spectral (ir)radiance for each of the measurements
          taken during the experiment:
        </p>

        <table className="table mb-5">
          <thead>
            <tr>
              <th>Field</th>
              <th>Required?</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Yes</td>
              <td>Wavelength in nanometers</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Yes</td>
              <td>
                First measurement spectral (ir)radiance in µW/mW/W per
                mm²/cm²/m² (per sr)
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>No</td>
              <td>
                Second measurement spectral (ir)radiance in µW/mW/W per
                mm²/cm²/m² (per sr)
              </td>
            </tr>
            <tr>
              <td>N</td>
              <td>No</td>
              <td>
                Nth measurement spectral (ir)radiance in µW/mW/W per mm²/cm²/m²
                (per sr)
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Example</h3>

        <pre>
          <code>
            {`Wavelength,Measurement 1,Measurement 2,Measurement n
380,0.00E+00,9.73E-05,0.00E+00
385,0.00E+00,1.67E-06,0.00E+00
...
775,2.30E-06,3.46E-05,2.72E-06
780,8.15E-06,5.00E-05,6.12E-06`}
          </code>
        </pre>

        <ul>
          <li>
            <a download="sample.csv" href="/examples/sample.csv">
              Download example spectral power distribution
            </a>
          </li>
        </ul>

        <p className="my-5">
          <Link to="/upload" className="btn btn-primary">
            Next
          </Link>
        </p>
      </div>
    </div>
  );
};

export default GenerateCSV;
