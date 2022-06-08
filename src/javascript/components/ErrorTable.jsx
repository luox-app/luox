import React from "react";
import PropTypes from "prop-types";

const ErrorTableRow = ({ row, message }) => {
  if (!row) {
    return (
      <tr>
        <td colSpan="2">{message}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>Line {row}</td>
      <td>{message}</td>
    </tr>
  );
};

ErrorTableRow.propTypes = {
  message: PropTypes.string.isRequired,
  row: PropTypes.number,
};

ErrorTableRow.defaultProps = {
  row: undefined,
};

const ErrorTable = ({ errors }) => {
  /* eslint-disable react/no-array-index-key */
  if (errors.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mt-5">Error parsing CSV</h2>
      <p>We had some problems understanding that file:</p>
      <table className="table errors">
        <tbody>
          {errors.map(({ row, message }, index) => (
            <ErrorTableRow key={index} row={row} message={message} />
          ))}
        </tbody>
      </table>
    </>
  );
};

ErrorTable.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({ row: PropTypes.number, message: PropTypes.string })
  ).isRequired,
};

export default ErrorTable;
