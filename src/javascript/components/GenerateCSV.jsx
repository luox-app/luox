import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const GenerateCSV = () => {
  useEffect(() => {
    document.title = "luox: Format instructions";
  });

  return (
    <>
      <main id="main">
        <section className="portfolio">
          <div className="container">
            <div className="section-title">
              <h2>Format Instructions</h2>
              <p>
                Generate a CSV file containing the spectral power distribution
                of all of the measurements taken during the experiment.
              </p>
            </div>
          </div>
        </section>
        <section className="why-us pt-2">
          <div className="container p-5">
            <div className="row">
              <div className="section-title">
                <h2>Specification</h2>
                <p>
                  The first column contains the wavelength in nanometers. The
                  subsequent columns contain the spectral (ir)radiance for each
                  of the measurements taken during the experiment. Your data can
                  contain up to 5 measurements:
                </p>
              </div>
              <div className="row px-5">
                <div className="col-md-12">
                  <table className="table table-striped table-bordered table-hover generate-csv-table mb-5">
                    <thead className="table-dark">
                      <tr>
                        <th>Column</th>
                        <th>Required?</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Yes</td>
                        <td>
                          Wavelength in nanometers. This should be restricted to
                          the visible light range (380-780 nm) and contain only
                          integer wavelengths (e.g. 380, 385, 390 ...).
                        </td>
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
                          Second measurement spectral (ir)radiance in µW/mW/W
                          per mm²/cm²/m² (per sr)
                        </td>
                      </tr>
                      <tr>
                        <td>...</td>
                        <td>...</td>
                        <td>...</td>
                      </tr>
                      <tr>
                        <td>N</td>
                        <td>No</td>
                        <td>
                          Nth measurement spectral (ir)radiance in µW/mW/W per
                          mm²/cm²/m² (per sr)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="section-title">
                <h2>Example</h2>
              </div>
              <div className="row px-5">
                <div className="col-md-12 text-center">
                  <p>Wavelength,Measurement 1,Measurement 2,Measurement 3</p>
                  <p>380,1.87,1.18,0.82</p>
                  <p>385,2.36,1.48,1.02</p>
                  <p>...</p>
                  <p>775,0.52,0.33,0.28</p>
                  <p>780,0.43,0.27,0.21</p>
                </div>
                <div className="col-md-12 text-center">
                  <p>
                    To download example spectral power distribution, click on
                    Download Button.
                  </p>
                  <a
                    download="sample.csv"
                    href="/examples/sample.csv"
                    className="btn btn-primary"
                  >
                    Download
                  </a>
                  <p className="pt-3">
                    Please note that the accuracy of calculations implemented
                    here depends on the uncertainties present in the uploaded
                    data. For more information, please see{" "}
                    <a href="/about">the about page</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p className="mb-5 text-center">
          <Link to="/upload" className="btn btn-primary">
            Next
          </Link>
        </p>
      </main>
    </>
    //     <div className="row">
    //       <div className="col-12">
    //         <h1 className="my-5">Format instructions</h1>

    //         <p className="lead my-5">
    //           Generate a CSV file containing the spectral power distribution of all
    //           of the measurements taken during the experiment.
    //         </p>

    //         <h2 className="mb-3">Specification</h2>

    //         <p className="mb-3">
    //           The first column contains the wavelength in nanometers. The subsequent
    //           columns contain the spectral (ir)radiance for each of the measurements
    //           taken during the experiment. Your data can contain up to 5
    //           measurements:
    //         </p>

    //         <table className="table mb-5">
    //           <thead>
    //             <tr>
    //               <th>Column</th>
    //               <th>Required?</th>
    //               <th>Description</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>1</td>
    //               <td>Yes</td>
    //               <td>
    //                 Wavelength in nanometers. This should be restricted to the
    //                 visible light range (380-780 nm) and contain only integer
    //                 wavelengths (e.g. 380, 385, 390 ...).
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>2</td>
    //               <td>Yes</td>
    //               <td>
    //                 First measurement spectral (ir)radiance in µW/mW/W per
    //                 mm²/cm²/m² (per sr)
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>3</td>
    //               <td>No</td>
    //               <td>
    //                 Second measurement spectral (ir)radiance in µW/mW/W per
    //                 mm²/cm²/m² (per sr)
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>...</td>
    //               <td>...</td>
    //               <td>...</td>
    //             </tr>
    //             <tr>
    //               <td>N</td>
    //               <td>No</td>
    //               <td>
    //                 Nth measurement spectral (ir)radiance in µW/mW/W per mm²/cm²/m²
    //                 (per sr)
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>

    //         <h3>Example</h3>

    //         <pre>
    //           <code>
    //             {`Wavelength,Measurement 1,Measurement 2,Measurement 3
    // 380,1.87,1.18,0.82
    // 385,2.36,1.48,1.02
    // ...
    // 775,0.52,0.33,0.28
    // 780,0.43,0.27,0.21
    // `}
    //           </code>
    //         </pre>

    //         <ul>
    //           <li>
    //             <a download="sample.csv" href="/examples/sample.csv">
    //               Download example spectral power distribution
    //             </a>
    //           </li>
    //         </ul>

    //         <p>
    //           Please note that the accuracy of calculations implemented here depends
    //           on the uncertainties present in the uploaded data. For more
    //           information, please see <a href="/about">the about page</a>.
    //         </p>

    //         <p className="my-5">
    //           <Link to="/upload" className="btn btn-primary">
    //             Next
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
  );
};

export default GenerateCSV;
