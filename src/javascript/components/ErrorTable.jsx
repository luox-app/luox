import React from 'react';
import PropTypes from 'prop-types';

const ErrorTableRow = ({row, message}) =>
  <tr>
    <td>Line {row}</td>
    <td>{message}</td>
  </tr>;

ErrorTableRow.propTypes = {
  'message': PropTypes.string,
  'row': PropTypes.string
};

const ErrorTable = ({errors}) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mt-5">Error parsing CSV</h2>
      <p>We had some problems understanding that file:</p>
      <table className="table errors">
        <tbody>
          {errors.map((error, index) => <ErrorTableRow key={index} {...error} />)}
        </tbody>
      </table>
    </>
  );
};

ErrorTable.propTypes = {
  'errors': PropTypes.array
};

export default ErrorTable;
