//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

//Start Node Exports
exports.buildJSONFromJSONTableString = buildJSONFromJSONTableString
exports.buildJSONFromJSONTable = buildJSONFromJSONTable
  //End Node Exports


/**
 Convert a JSON Table into a standard JSON Object
 @namespace
 */
var JSONTableToJSON = {
  /**
   @description converts a JSONTable into a JSON Object
   @function
   @type {JSON}
   @param {JSONTable} JSONTableObject a standard JSON object that conforms to the JSONTable object spec
   */
  convert: buildJSONFromJSONTable,
  /**
   @description converts a JSONTable string into a JSON Object
   @function
   @type {string}
   @param {string} JSONTableString a standard JSON String that conforms to the JSONTable object spec
   */
  convertString: buildJSONFromJSONTableString
}


function buildJSONFromJSONTableString(JSONTableString) {
  var JSONTableObject = JSON.parse(JSONTableString)
  return buildJSONFromJSONTable(JSONTableObject)
}

function buildJSONFromJSONTable(JSONTableObject) {
  var JSONObject
  var JSONArray = []
  var outerKey = null

  if (!JSONTableObject.headerRows) {
    throw new Error("Header Rows Missing from JSONTableObject")
  }
  if (!JSONTableObject.rows) {
    throw new Error("Rows Missing from JSONTableObject")
  }

  for (var rowIndex = 0; rowIndex < JSONTableObject.rows.length; rowIndex++) {
    JSONObject = {}
    for (var headerIndex = 0; headerIndex < JSONTableObject.headerRows.length; headerIndex++) {
      for (var headerColumnIndex = 0; headerColumnIndex < JSONTableObject.headerRows[
          headerIndex].length; headerColumnIndex++) {
        var key = JSONTableObject.headerRows[headerIndex][headerColumnIndex]
        var value = JSONTableObject.rows[rowIndex][headerColumnIndex]
        if (headerIndex > 0) {
          if (key) {
            if (!outerKey) {
              outerKey = JSONTableObject.headerRows[headerIndex - 1][
                headerColumnIndex
              ]
              JSONObject[outerKey] = {}
            }
            JSONObject[outerKey][key] = value
          }
          else {
            if (outerKey) {
              outerKey = null
            }
          }
        }
        else {
          JSONObject[key] = value
        }
      }
    }
    JSONArray.push(JSONObject)
  }

  if (JSONTableObject.rows.length > 1) {
    return JSONArray
  }
  else {
    return JSONObject
  }
}