//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

const jsonTableParser = require("../json-to-jsontable.js");
const assert = require("assert");
const util = require("util");

describe("Add Column Headers", addColumnHeadersTest);
describe("Add Cell Values", addCellValuesTest);
describe("Add Values", addValuesTest)
describe("Add Object", addObjectTest)
describe("Parse JSON Into JSON Table", parseJSONIntoJSONTableTest)
describe("Parse JSON String Into JSON Table", parseJSONStringIntoJSONTableTest)

function parseJSONStringIntoJSONTableTest() {
	it("JSON String contains a single set of values", function() {
		var JSONString = '{ "lat": 34.1147313, "lng": -118.36372640000002 }'
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["lat", "lng"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([34.1147313,-118.36372640000002])
		
		var JSONTable = jsonTableParser.parseJSONStringIntoJSONTable(JSONString)
		assert.deepEqual(expectedJSONTable, JSONTable)
	} )
	
	it("JSON String contains a complex set of values", function () {
		var JSONString = '[{"fMRI": "1","city": "Holt","ZipCode": "48842","state": "MI",'
		JSONString += '"pinLocation": {"lat": 42.6272648,"lng": -84.55366779999997}},{"fMRI": "1",'
		JSONString += '"city": "Los Angeles","ZipCode": "90046","state": "CA","pinLocation": {"lat": 34.1147313,"lng": -118.36372640000002'
		JSONString += '}}]'
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["fMRI", "city", "ZipCode", "state", "pinLocation" ])
		expectedJSONTable.headerRows.push([,,,,"lat", "lng"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push(["1", "Holt", "48842", "MI", 42.6272648, -84.55366779999997])
		expectedJSONTable.rows.push(["1", "Los Angeles", "90046", "CA", 34.1147313,-118.36372640000002])
		var JSONTable = jsonTableParser.parseJSONStringIntoJSONTable(JSONString)
// 		console.log("expected:")
// 		console.log(util.inspect(expectedJSONTable))
// 		console.log("actual:")
// 		console.log(util.inspect(JSONTable))

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
}

function parseJSONIntoJSONTableTest() {
	it("Object contains a single set of values", function() {
		var JSONObject = {"id":371,"name":"Mary","value":16.34}
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "value"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([371, "Mary", 16.34])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
	
	it("Object contains an array with multiple objects that each contain the same set of key/value pairs", function() {
		var JSONObject = []
		JSONObject.push({"id":371,"name":"Mary","value":16.34})
		JSONObject.push({"id":403,"name":"Bill","value":24.87})
		JSONObject.push({"id":105,"name":"Chris","value":44})
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "value"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([371, "Mary", 16.34])
		expectedJSONTable.rows.push([403, "Bill", 24.87])
		expectedJSONTable.rows.push([105, "Chris", 44])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)
		assert.deepEqual(expectedJSONTable, JSONTable)
	})
	
	it("Object contains an array with multiple objects that each contain the different sets of key/value pairs", function() {
		var JSONObject = []
		JSONObject.push({"id":371,"name":"Mary","value":16.34})
		JSONObject.push({"id":403,"names":"Bill","position":24.87})
		JSONObject.push({"id":105,"firstname":"Chris","count":44})
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "value", "names", "position", "firstname", "count"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([371, "Mary", 16.34])
		expectedJSONTable.rows.push([403, ,,"Bill", 24.87])
		expectedJSONTable.rows.push([105, ,,,,"Chris", 44])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
	
	it("Object contains an array with objects that each contain 1 object", function() {
		var JSONObject = []
		JSONObject.push({"id":403,"name":"Bill","coordinates":{"x":12, "y":14}})
		JSONObject.push({"id":105,"name":"Chris","coordinates":{"x":16, "y":10}})
		JSONObject.push({"id":371,"name":"Mary","coordinates":{"x":4, "y":17.34}})
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "coordinates"])
		expectedJSONTable.headerRows.push([,, "x", "y"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([403, "Bill", 12, 14])
		expectedJSONTable.rows.push([105, "Chris", 16, 10])
		expectedJSONTable.rows.push([371, "Mary", 4, 17.34])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)
		assert.deepEqual(expectedJSONTable, JSONTable)
	
	})
	
	it("Object contains an array with objects that each contain 2 object", function() {
		var JSONObject = []
		JSONObject.push({"id":403,"name":{"first":"Bill","last":"smith"},"coordinates":{"x":12, "y":14}})
		JSONObject.push({"id":105,"name":{"first":"Chris","last":"Jones"},"coordinates":{"x":16, "y":10}})
		JSONObject.push({"id":371,"name":{"first":"Mary","last":"who"},"coordinates":{"x":4, "y":17.34}})
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "coordinates"])
		expectedJSONTable.headerRows.push([,"first", "last", "x", "y"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([403, "Bill", "smith", 12, 14])
		expectedJSONTable.rows.push([105, "Chris", "Jones", 16, 10])
		expectedJSONTable.rows.push([371, "Mary", "who", 4, 17.34])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)
		assert.deepEqual(expectedJSONTable, JSONTable)
	
	})
	
	it("Object contains an array with objects of differing levels where first object contains all the levels", function() {
		var JSONObject = []
		JSONObject.push({"id":403,"name":{"first":"Bill","last":"smith"},"coordinates":{"x":12, "y":14}})
		JSONObject.push({"id":105,"name":"Chris","coordinates":{"x":16, "y":10}})
		JSONObject.push({"id":371,"name":"Mary","coordinates":{"x":4, "y":17.34}})
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "coordinates"])
		expectedJSONTable.headerRows.push([,"first", "last", "x", "y"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([403, "Bill", "smith", 12, 14])
		expectedJSONTable.rows.push([105, "Chris", , 16, 10])
		expectedJSONTable.rows.push([371, "Mary", , 4, 17.34])
		
		var JSONTable = jsonTableParser.parseJSONIntoJSONTable(JSONObject)
		assert.deepEqual(expectedJSONTable, JSONTable)
	
	})
}

function addObjectTest() {
	it("Object contains a single set of key/value pairs", function() {
		var columnTitle = "0"
		var JSONObject = {"id":403,"name":"bill","value":24.87}
		var rowIndex=0
		var depth = 0

		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id", "name", "value"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([403, "bill", 24.87])
		
		var JSONTable = jsonTableParser.addObject(columnTitle, JSONObject, rowIndex, {}, depth)

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
	
	it("Object contains an array with one object that contains a single set of key/value pairs", function() {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows[0] = ["0"]
		var columnTitle = "0"
		var JSONObject = []
		JSONObject.push({"id":403,"name":"bill","value":24.87})
		var rowIndex=0
		var depth = 0

		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows[0] = ["0"]
		expectedJSONTable.headerRows[1]=["id", "name", "value"]
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([403, "bill", 24.87])
		
		var JSONTable = jsonTableParser.addObject(columnTitle, JSONObject, rowIndex, JSONTableObject, depth)

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
}

function addValuesTest() {
	it("add single value to JSON Table Object", function() {
		var JSONTableObject = {}
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308])
		JSONTableObject = jsonTableParser.addValue("id", 308, 0, JSONTableObject, 0)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
	
	it("add two values to JSON Table Object on different rows", function() {
		var JSONTableObject = {}
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308])
		expectedJSONTableObject.rows.push([212])
		JSONTableObject = jsonTableParser.addValue("id", 308, 0, JSONTableObject, 0)
		JSONTableObject = jsonTableParser.addValue("id", 212, 1, JSONTableObject, 0)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
		
	it("Add values to JSON Table Object on different columns", function() {
		var JSONTableObject = {}
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id", "name"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308, "Bill"])
		expectedJSONTableObject.rows.push([212, "Sam"])
		JSONTableObject = jsonTableParser.addValue("id", 308, 0, JSONTableObject, 0)
		JSONTableObject = jsonTableParser.addValue("id", 212, 1, JSONTableObject, 0)
		JSONTableObject = jsonTableParser.addValue("name", "Bill", 0, JSONTableObject, 0)
		JSONTableObject = jsonTableParser.addValue("name", "Sam", 1, JSONTableObject, 0)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
	
	it("Add Values to JSON Table Object at different depths", function() {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows[0]=["name"]
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows[0]=["name"]
		expectedJSONTableObject.headerRows[1]=["first", "last"]
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push(["Bill", "Heitzeg"])
		JSONTableObject = jsonTableParser.addValue("first", "Bill", 0, JSONTableObject, 1)
		JSONTableObject = jsonTableParser.addValue("last", "Heitzeg", 0, JSONTableObject, 1)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})	
}

function addCellValuesTest() {
	it("add single cell value to JSON Table Object", function() {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["id"])
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308])
		JSONTableObject = jsonTableParser.addCellValue(308, 0, 0, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
	
	it("add two cell values to JSON Table Object on different rows", function() {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["id"])
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308])
		expectedJSONTableObject.rows.push([212])
		JSONTableObject = jsonTableParser.addCellValue(308, 0, 0, JSONTableObject)
		JSONTableObject = jsonTableParser.addCellValue(212, 1, 0, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
		
	it("add cell values to JSON Table Object on different columns", function() {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["id", "name"])
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id", "name"])
		expectedJSONTableObject.rows = []
		expectedJSONTableObject.rows.push([308, "Bill"])
		expectedJSONTableObject.rows.push([212, "Sam"])
		JSONTableObject = jsonTableParser.addCellValue(308, 0, 0, JSONTableObject)
		JSONTableObject = jsonTableParser.addCellValue(212, 1, 0, JSONTableObject)
		JSONTableObject = jsonTableParser.addCellValue("Bill", 0, 1, JSONTableObject)
		JSONTableObject = jsonTableParser.addCellValue("Sam", 1, 1, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})	

}

function addColumnHeadersTest() {
	it("add Title To Empty JSON Table Object",function () {
		var JSONTableObject = {}
		var columnTitle = "id"
		var headerRowIndex = 0
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		JSONTableObject = jsonTableParser.addColumnTitle(columnTitle, headerRowIndex, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})

	it("add title when the title is already present",function () {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["id"])
		var columnTitle = "id"
		var headerRowIndex = 0
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["id"])
		JSONTableObject = jsonTableParser.addColumnTitle(columnTitle, headerRowIndex, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
	
	it("add title when header row contains other non matching titles",function () {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["name","value"])
		var columnTitle = "id"
		var headerRowIndex = 0
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["name","value","id"])
		JSONTableObject = jsonTableParser.addColumnTitle(columnTitle, headerRowIndex, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
	
	it("add titles to multiple header rows",function () {
		var JSONTableObject = {}
		JSONTableObject.headerRows = []
		JSONTableObject.headerRows.push(["name","value", "coordinates"])
		var expectedJSONTableObject = {}
		expectedJSONTableObject.headerRows = []
		expectedJSONTableObject.headerRows.push(["name","value","coordinates"])
		expectedJSONTableObject.headerRows.push([,,"x", "y"])
		JSONTableObject = jsonTableParser.addColumnTitle("x", 1, JSONTableObject)
		JSONTableObject = jsonTableParser.addColumnTitle("y", 1, JSONTableObject)
		assert.deepEqual(expectedJSONTableObject, JSONTableObject)
	})
}
