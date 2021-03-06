//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

/**
  @typedef JSONTable
  @type {object}
  @property {array} headerRows - an array of header rows, each of which contains an array of header columns
  @property {string} rows - an array of rows, each of which contains an array of columns
*/

//Start Node Exports
exports.parseJSONStringIntoJSONTable = parseJSONStringIntoJSONTable
exports.parseJSONIntoJSONTable = parseJSONIntoJSONTable
exports.addColumnTitle = addColumnTitle
exports.addCellValue = addCellValue
exports.addValue = addValue
exports.addObject = addObject
  //End Node Exports

/**
 * Take standard JSON Objects and convert them to the intermediate data type JSONTable.
 * JSONTable is used to convert into other formats including back into JSON
 * @namespace
 */
var JSONToJSONTable = {
  /**
   @description converts A JSON Object into a JSONTable
   @function
   @type {JSONTable}
   @param {JSON} JSONObject standard JSON Object
   */
  convert: parseJSONIntoJSONTable,
  /**
   @description converts a valid JSON String into a JSONTable
   @function
   @type {JSONTable}
   @param {string} JSONString a valid/parseable JSON string
   */
  convertString: parseJSONStringIntoJSONTable
}


function parseJSONStringIntoJSONTable(JSONString) {
  var JSONObject = JSON.parse(JSONString)
  return parseJSONIntoJSONTable(JSONObject)
}

function parseJSONIntoJSONTable(JSONObject) {
  var JSONTable = {}
  var rowIndex = 0
  for (var key in JSONObject) {
    var value = JSONObject[key]
    if (typeof value == "object") {
      JSONTable = addObject(key, value, rowIndex, JSONTable, 0)
      rowIndex++
    }
    else {
      JSONTable = addValue(key, value, rowIndex, JSONTable, 0)
    }
  }
  return JSONTable
}

function addObject(columnTitle, JSONObject, rowIndex, sourceJSONTable, depth) {
  var JSONTable = sourceJSONTable
  for (var key in JSONObject) {
    var value = JSONObject[key]
    if (typeof value == "object") {
      JSONTable = addColumnTitle(key, depth, JSONTable)
      depth++
      JSONTable = addObject(key, value, rowIndex, JSONTable, depth)
      depth--
    }
    else {
      JSONTable = addValue(key, value, rowIndex, JSONTable, depth)
    }
  }
  return JSONTable
}

function addValue(columnTitle, value, rowIndex, sourceJSONTable, depth) {
  var JSONTable = sourceJSONTable
  JSONTable = addColumnTitle(columnTitle, depth, JSONTable)
  var columnIndex = JSONTable.headerRows[depth].indexOf(columnTitle)
  JSONTable = addCellValue(value, rowIndex, columnIndex, JSONTable)
  return JSONTable
}

function addCellValue(value, rowIndex, columnIndex, sourceJSONTable) {
  var JSONTable = sourceJSONTable
  if (!JSONTable.rows) {
    JSONTable.rows = []
  }

  if (!JSONTable.rows[rowIndex]) {
    JSONTable.rows[rowIndex] = []
  }

  JSONTable.rows[rowIndex][columnIndex] = value

  return JSONTable
}

function addColumnTitle(columnTitle, headerRowIndex, sourceJSONTable) {
  var JSONTable = sourceJSONTable
  if (!JSONTable.headerRows) {
    JSONTable.headerRows = []
  }

  if (!JSONTable.headerRows[headerRowIndex]) {
    JSONTable.headerRows[headerRowIndex] = []
    if (headerRowIndex > 0) {
      var columnIndex = JSONTable.headerRows[headerRowIndex - 1].length - 1
      JSONTable.headerRows[headerRowIndex][columnIndex] = columnTitle
    }
    else {
      JSONTable.headerRows[headerRowIndex].push(columnTitle)
    }
  }
  else {
    if (JSONTable.headerRows[headerRowIndex].indexOf(columnTitle) == -1) {
      JSONTable.headerRows[headerRowIndex].push(columnTitle)
    }
  }

  return JSONTable
}



function OLDparseJSONIntoJSONTable(JSONObject, row, depth) {
  if (!depth) {
    depth = 0
  }
  if (!row) {
    row = 0
  }
  var JSONTable = {}
  JSONTable.headerRows = []
  JSONTable.rows = []
  for (var key in JSONObject) {
    var value = JSONObject[key]
    if (typeof value == "object") {
      var childJSONTable = parseJSONIntoJSONTable(value, row, depth++)
      JSONTable.headerRows[depth] = childJSONTable.headerRows
    }
    else {
      if (JSONTable.headerRows.length < 1) {
        JSONTable.headerRows[0] = []
      }
      var indexOfColumn = JSONTable.headers[0].indexOf(key)
      if (indexOfColumn == -1) {
        indexOfColumn = JSONTable.headers[0].push(key) - 1
      }
      JSONTable.rows[row][indexOfColumn] = value
    }
    row++
  }
  return JSONTable
}