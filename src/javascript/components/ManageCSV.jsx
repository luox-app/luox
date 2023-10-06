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
  setMeasurementLabels,
  modalView,
  setModalView,
}) => {
  const [error, setError] = useState(false);
  let selectedRowsArray = [];
  const selectedRowsColumnsArray = [];
  const selectedColumnsArray = [];
  const selectedColumnsKeysArray = [];

  if (rows.length === 0) {
    return null;
  }

  const addSelectedRow = (row, isChecked) => {
    if (isChecked) {
      selectedRowsArray.push(row);
    } else {
      for (let i = 0; i < selectedRowsArray.length; i += 1) {
        if (selectedRowsArray[i] === row) {
          const valueIndex = selectedRowsArray.indexOf(row);
          if (valueIndex > -1) {
            selectedRowsArray.splice(valueIndex, 1);
          }
        }
      }
    }
  };

  const useSelectedRowsAllColumns = () => {
    if (selectedRowsArray.length > 0) {
      setError(false);
      setSelectedRows(selectedRowsArray);
      setSelectedRowsSampleCount(sampleCount);
      setModalView(false);
    } else {
      setError(true);
    }
  };
  const useSelectedRowsSelectedColumns = () => {
    if (selectedRowsArray.length > 0 && selectedColumnsArray.length > 0) {
      if (measurementLabels.length === selectedColumnsArray.length) {
        setError(false);
        setSelectedRows(selectedRowsArray);
        setSelectedRowsSampleCount(sampleCount);
        setModalView(false);
      } else {
        for (let i = 0; i < selectedRowsArray.length; i += 1) {
          const rowArray = [];
          for (let j = 1; j <= selectedRowsArray[i].length; j += 1) {
            if (j - 1 === 0) {
              rowArray.push(selectedRowsArray[i][j - 1]);
            }
            if (selectedColumnsKeysArray.includes(j - 1)) {
              rowArray.push(selectedRowsArray[i][j]);
            }
          }
          selectedRowsColumnsArray.push(rowArray);
        }
        setError(false);
        setSelectedRows(selectedRowsColumnsArray);
        setSelectedRowsSampleCount(selectedColumnsArray.length);
        setMeasurementLabels({ ...selectedColumnsArray });
        setModalView(false);
      }
    } else {
      setError(true);
    }
  };
  const useAllRowsColumns = () => {
    setSelectedRows(rows);
    setSelectedRowsSampleCount(sampleCount);
    setModalView(false);
  };
  const useAllRowsSelectedColumns = () => {
    if (selectedColumnsArray.length > 0) {
      if (measurementLabels.length === selectedColumnsArray.length) {
        setSelectedRows(rows);
        setSelectedRowsSampleCount(sampleCount);
        setModalView(false);
      } else {
        selectedRowsArray = [];
        for (let i = 0; i < rows.length; i += 1) {
          const rowArray = [];
          for (let j = 1; j <= rows[i].length; j += 1) {
            if (j - 1 === 0) {
              rowArray.push(rows[i][j - 1]);
            }
            if (selectedColumnsKeysArray.includes(j - 1)) {
              rowArray.push(rows[i][j]);
            }
          }
          selectedRowsArray.push(rowArray);
        }
        setSelectedRows(selectedRowsArray);
        setSelectedRowsSampleCount(selectedColumnsArray.length);
        setMeasurementLabels({ ...selectedColumnsArray });
        setModalView(false);
      }
    } else {
      setError(true);
    }
  };

  const changeColumnCheckbox = (key, value, isChecked) => {
    if (isChecked) {
      selectedColumnsArray.push(value);
      selectedColumnsKeysArray.push(Number(key));
    } else {
      for (let i = 0; i < selectedColumnsArray.length; i += 1) {
        if (selectedColumnsArray[i] === value) {
          const valueIndex = selectedColumnsArray.indexOf(value);
          const keyIndex = selectedColumnsKeysArray.indexOf(Number(key));
          if (valueIndex > -1) {
            selectedColumnsArray.splice(valueIndex, 1);
            selectedColumnsKeysArray.splice(keyIndex, 1);
          }
        }
      }
    }
    selectedColumnsArray.sort();
    selectedColumnsKeysArray.sort();
  };

  return (
    <>
      <Modal size="lg" show={modalView}>
        <Modal.Header>
          <Modal.Title>Manage Rows</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 text-end">
              {error ? (
                <p className="colorRed">
                  Please select atleast one row or one column.
                </p>
              ) : (
                ""
              )}
              <Button
                variant="success"
                onClick={useAllRowsColumns}
                className="mx-2 my-1"
              >
                Use all Rows and Columns
              </Button>
              <Button
                variant="primary"
                onClick={useAllRowsSelectedColumns}
                className="mx-2 my-1"
              >
                Use all Rows and Selected Columns
              </Button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 text-end">
              <Button
                variant="success"
                onClick={useSelectedRowsAllColumns}
                className="mx-2 my-1"
              >
                Use Selected Rows and all Columns
              </Button>
              <Button
                variant="primary"
                onClick={useSelectedRowsSelectedColumns}
                className="my-1"
              >
                Use Selected Rows and Selected Columns
              </Button>
            </div>
          </div>
          <div className="row mt-3 row-div table-row">
            <div className="col-md-12">
              <table className="table table-striped table-bordered table-hover generate-csv-table mb-1">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Wavelength</th>
                    {Object.entries(measurementLabels).map(([key, value]) => (
                      <th key={key}>
                        <input
                          type="checkbox"
                          name="columnCheckbox"
                          onChange={(event) =>
                            changeColumnCheckbox(
                              key,
                              value,
                              event.target.checked
                            )
                          }
                        />{" "}
                        {value}
                      </th>
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
        {/* <Modal.Footer>
        </Modal.Footer> */}
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
  setMeasurementLabels: PropTypes.func.isRequired,
  modalView: PropTypes.bool.isRequired,
  setModalView: PropTypes.func.isRequired,
};
export default ManageCSV;
