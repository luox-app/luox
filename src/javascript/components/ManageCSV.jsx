import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

// export const t0 = performance.now();

const ManageCSV = ({
  rows,
  sampleCount,
  setSelectedRows,
  setSelectedRowsSampleCount,
  measurementLabels,
}) => {
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  const selectedRowsArray = [];
  let selectedRowsLength = 0;

  if (rows.length === 0) {
    return null;
  }

  const addSelectedRow = (row, isChecked) => {
    if (isChecked) {
      selectedRowsLength += 1;
      selectedRowsArray.push(row);
    } else {
      selectedRowsArray.pop(row);
      selectedRowsLength -= 1;
    }
  };

  const useSelectedRows = () => {
    if (selectedRowsLength > 0) {
      setError(false);
      setSelectedRows(selectedRowsArray);
      setSelectedRowsSampleCount(sampleCount);
      setShow(false);
    } else {
      setError(true);
    }
  };
  const useAllRows = () => {
    setSelectedRows(rows);
    setSelectedRowsSampleCount(sampleCount);
    setShow(false);
  };

  return (
    <>
      <Modal size="lg" show={show}>
        <Modal.Header>
          <Modal.Title>Manage Rows</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-3 row-div table-row">
            <div className="col-md-12">
              <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Wavelength</th>
                    {Object.entries(measurementLabels).map(([key, value]) => (
                      <th key={key}>{value}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows && rows.length > 0 ? (
                    rows.map((row) => (
                      <tr key={row[0]}>
                        <td>
                          <input
                            type="checkbox"
                            name="rowCheckbox"
                            className="selectedRowCheckbox"
                            onChange={(event) =>
                              addSelectedRow(row, event.target.checked)
                            }
                          />
                        </td>
                        {Object.entries(row).map(([key, value]) => (
                          <td key={key}>{value}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="px-2 text-center">
                          <div className="my-auto text-center text-bold">
                            No Record found
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {error ? (
            <p className="colorRed">Please select atleast one row.</p>
          ) : (
            ""
          )}
          <Button variant="success" onClick={useAllRows}>
            Use all rows
          </Button>
          <Button variant="primary" onClick={useSelectedRows}>
            Use Selected Rows
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ManageCSV.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  setSelectedRowsSampleCount: PropTypes.func.isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default ManageCSV;
