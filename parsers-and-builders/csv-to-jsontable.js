//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

//Start Node Exports
exports.convert = convert
exports.parseStringIntoArrayOfStrings = parseStringIntoArrayOfStrings
exports.parseStringIntoArrayOfValues = parseStringIntoArrayOfValues
exports.isAlpha = isAlpha
exports.extractFields = extractFields
  //End Node Exports

/**
 * Convert a CSV String and convert it into a JSONTable
 *
 * @namespace
 */
var CSVToJSONTable = {
  /**
   @description converts A CSV String into a JSONTable
   @function
   @type {JSONTable}
   @param {string} CSV a string containing delimited text of rows and columns
   @param {integer} [headerCount=0] The number of rows to be considered header rows
   @param {string} [delimiter=,] The column delimiter
   @param {string} [stringDelimiter="] The delimiter used to open and close embedded strings
   @param {string} [lineEndCharacter=\n] The delimiter used to indicate the end of a line
   */
  convert: convert
}

function convert(csv, headerCount, delimiter, stringDelimiter, lineEndCharacter) {
  if (!csv) {
    var message = "CSV Value must be defined:  "
    message +=
      "Usage - convert(csv, headerCount, delimiter, stringDelimiter, lineEndCharacter"
    throw new Error(message)
  }

  if (!headerCount) {
    headerCount = 0
  }

  var JSONTable = {}
  JSONTable.headerRows = []
  JSONTable.rows = []
  var lineArray = parseStringIntoArrayOfStrings(csv, lineEndCharacter)
  for (var headerIndex = 0; headerIndex < headerCount; headerIndex++) {
    JSONTable.headerRows.push(parseStringIntoArrayOfValues(lineArray[
      headerIndex], delimiter, stringDelimiter))
  }

  for (var rowIndex = headerIndex; rowIndex < lineArray.length; rowIndex++) {
    JSONTable.rows.push(parseStringIntoArrayOfValues(lineArray[rowIndex],
      delimiter, stringDelimiter))
  }

  return JSONTable
}

function parseStringIntoArrayOfStrings(stringToParse, delimiter) {
  var definedDelimiter
  if (!delimiter) {
    definedDelimiter = "\n"
  }
  else {
    definedDelimiter = delimiter
  }

  var indexOfLastDelimiter = stringToParse.lastIndexOf(definedDelimiter)
  var stringToSplit
  if (indexOfLastDelimiter == stringToParse.length - 1) {
    stringToSplit = stringToParse.substring(0, indexOfLastDelimiter)
  }
  else {
    stringToSplit = stringToParse
  }
  return stringToSplit.split(definedDelimiter)
}

function parseStringIntoArrayOfValues(stringToParse, delimiter, stringDelimiter) {
  var delimiters = getDelimeters(delimiter, stringDelimiter)
  var arrayOfFields = extractFields(stringToParse,
    delimiters.fieldDelimiter, delimiters.stringDelimiter)
  return arrayOfFields
}

function getDelimeters(delimiter, stringDelimiter) {
  var delimiters = {}

  if (!delimiter) {
    delimiters.fieldDelimiter = ","
  }
  else {
    delimiters.fieldDelimiter = delimiter
  }

  if (!stringDelimiter) {
    delimiters.stringDelimiter = "\""
  }
  else {
    delimiters.stringDelimiter = stringDelimiter
  }

  return delimiters
}

function extractFields(stringToExtractIntoFields, delimiter, stringDelimiter) {
  if (!stringToExtractIntoFields || !delimiter || !stringDelimiter) {
    var message =
      "usage: extractFields(stringToExtractIntoFields, delimiter, stringDelimiter)"
    if (!stringToExtractIntoFields) {
      message = "stringToExtractIntoFields " + message
    }
    if (!delimiter) {
      message = "delimiter " + message
    }
    if (!stringDelimiter) {
      message = "delimiter " + message
    }
    message = "Missing: " + message
    throw new
    ReferenceError(message)
  }

  var fieldArray = []
  var inString = false
  var fieldValue = ""

  //TODO deal with whitespace
  for (var index = 0; index < stringToExtractIntoFields.length; index++) {
    if (stringToExtractIntoFields.charAt(index) == delimiter && !inString) {
      fieldArray.push(convertFieldToValue(fieldValue))
      fieldValue = ""
    }
    else if (stringToExtractIntoFields.charAt(index) == stringDelimiter && !
      inString) {
      inString = true
    }
    else if (stringToExtractIntoFields.charAt(index) == stringDelimiter &&
      inString) {
      inString = false
      fieldArray.push(fieldValue)
      fieldValue = ""
      index++
    }
    else {
      fieldValue += stringToExtractIntoFields.charAt(index)
    }
  }

  if (fieldValue.length > 0 || stringToExtractIntoFields.charAt(
      stringToExtractIntoFields.length - 1) == delimiter) {
    fieldArray.push(convertFieldToValue(fieldValue))
  }

  return fieldArray

}

function convertFieldToValue(field) {
  if (field.length == 0) {
    return null
  }
  else if (isAlpha(field)) {
    return field
  }
  else {
    return Number(field)
  }
}

function isAlpha(stringToTest) {
  //A-65, Z-90, a-97, z-122, [-91, \- 92, ]-93, ^-94, _-95, `-96
  //. - 46
  //- - 45
  //+ - 43
  //$ - 36
  //% - 37
  //, - 44
  //console.log(",".charCodeAt(0))
  var charCode = stringToTest.charCodeAt(0)
  var isStringAlpha

  if (charCode > 64 && charCode < 123) {
    isStringAlpha = true
    var index = 0
    while (isStringAlpha && index < stringToTest.length) {
      charCode = stringToTest.charCodeAt(index)
      if (charCode < 65 && charCode > 122) {
        isStringAlpha = false
      }
      index++
    }
  }
  else {
    isStringAlpha = false
    var index = 0
    var foundDecimal = false
    while (!isStringAlpha && index < stringToTest.length) {
      charCode = stringToTest.charCodeAt(index)
      if (charCode > 64 && charCode < 123) {
        isStringAlpha = true
      }
      else if (charCode == 46) {
        if (foundDecimal) {
          isStringAlpha = true
        }
        else {
          foundDecimal = true
        }
      }
      index++
    }
  }

  return isStringAlpha
}