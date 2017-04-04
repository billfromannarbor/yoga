//Copy 2015 Karma Open Health LLC - Apache 2 License

const jsonTableBuilder = require("../jsontable-to-json.js");
const assert = require("assert");
const util = require("util");

describe("Build JSON from JSONTable", buildJSONFromJSONTableTest);
describe("Build JSON from JSONTableString", buildJSONFromJSONTableStringTest);

function buildJSONFromJSONTableStringTest() {
	it("build from Table with two headers and multiple rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "coordinates"])
		JSONTable.headerRows.push([,, "x", "y"])
		JSONTable.rows = []
		JSONTable.rows.push([403, "Bill", 12, 14])
		JSONTable.rows.push([105, "Chris", 16, 10])
		JSONTable.rows.push([371, "Mary", 4, 17.34])
		var JSONTableString = JSON.stringify(JSONTable)

		var expectedJSONObject = []
		expectedJSONObject.push({"id":403,"name":"Bill","coordinates":{"x":12, "y":14}})
		expectedJSONObject.push({"id":105,"name":"Chris","coordinates":{"x":16, "y":10}})
		expectedJSONObject.push({"id":371,"name":"Mary","coordinates":{"x":4, "y":17.34}})

		var JSONObject = jsonTableBuilder.buildJSONFromJSONTableString(JSONTableString)
// 		console.log("expected:")
// 		console.log(util.inspect(expectedJSONObject))
// 		console.log("actual:")
// 		console.log(util.inspect(JSONObject))

		assert.deepEqual(expectedJSONObject, JSONObject)
	})
	
}

function buildJSONFromJSONTableTest() {
	it("build from Table with one header and one row", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "value"])
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
		
		var expectedJSONObject = {"id":371,"name":"Mary","value":16.34}
		var JSONObject = jsonTableBuilder.buildJSONFromJSONTable(JSONTable)
		assert.deepEqual(expectedJSONObject, JSONObject)
	})

	it("build from Table with one header and multiple rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "value"])
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
		JSONTable.rows.push([403, "Bill", 24.87])
		JSONTable.rows.push([105, "Chris", 44])
	
		var expectedJSONObject = []
		expectedJSONObject.push({"id":371,"name":"Mary","value":16.34})
		expectedJSONObject.push({"id":403,"name":"Bill","value":24.87})
		expectedJSONObject.push({"id":105,"name":"Chris","value":44})

		var JSONObject = jsonTableBuilder.buildJSONFromJSONTable(JSONTable)
		assert.deepEqual(expectedJSONObject, JSONObject)
	})
	
	it("build from Table with two headers and multiple rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "coordinates"])
		JSONTable.headerRows.push([,, "x", "y"])
		JSONTable.rows = []
		JSONTable.rows.push([403, "Bill", 12, 14])
		JSONTable.rows.push([105, "Chris", 16, 10])
		JSONTable.rows.push([371, "Mary", 4, 17.34])

		var expectedJSONObject = []
		expectedJSONObject.push({"id":403,"name":"Bill","coordinates":{"x":12, "y":14}})
		expectedJSONObject.push({"id":105,"name":"Chris","coordinates":{"x":16, "y":10}})
		expectedJSONObject.push({"id":371,"name":"Mary","coordinates":{"x":4, "y":17.34}})

		var JSONObject = jsonTableBuilder.buildJSONFromJSONTable(JSONTable)
		assert.deepEqual(expectedJSONObject, JSONObject)
	})

}