var csvExport = require('./../src/csvExport.js')
var assert = require('assert');
const { JSDOM } = require('jsdom');

describe('tableToCSV', function() {
  it('should convert HTML table to CSV', function() {
    const html = `
    <table id="spectrum">
      <tr>
        <th>Heading 1</th>
        <th>Heading 2</th>
      </tr>
      <tr>
        <td>Value 1</td>
        <td>Value 2</td>
      </tr>
    </table>
    `
    const jsdom = new JSDOM(html)
    const table = jsdom.window.document.getElementById('spectrum')

    const expected = 'Heading 1,Heading 2\nValue 1,Value 2'
    assert.equal(expected, csvExport.tableToCSV(table));
  });
});
