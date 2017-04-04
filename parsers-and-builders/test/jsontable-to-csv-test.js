//Copy 2015 Karma Open Health LLC - Apache 2 License

const jsonTableToCSV = require("../jsontable-to-csv.js");
const assert = require("assert");
const util = require("util");

describe("convert jsonTable into CSV", convertTest);
describe("convert jsonTable string into CSV", convertStringTest);

function convertStringTest() {
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

		var expectedCSV = ""
		expectedCSV += '"id","name","coordinates"\n'
		expectedCSV += ',,"x","y"\n'
		expectedCSV += '403,"Bill",12,14\n'
		expectedCSV += '105,"Chris",16,10\n'
		expectedCSV += '371,"Mary",4,17.34'
		
		var CSV = jsonTableToCSV.convertFromJSONString(JSONTableString)
		assert.equal(expectedCSV, CSV)

	})
	
	it("build from Table with nulls", function() {
		var JSONTableString = ""
		JSONTableString+='{"headerRows":[["Study","City","ZipCode","State","Position"],'
		JSONTableString+='[null,null,null,null,"lat","lng"]],"rows":[[1,"Holt",48842,"MI",42.6272648,-84.5536678]'
		JSONTableString+=',[1,"Los Angeles",90046,"CA",34.1147313,-118.3637264]]}'
	
		var expectedCSV = ""
		expectedCSV +='"Study","City","ZipCode","State","Position"\n'
		expectedCSV +=',,,,"lat","lng"\n'
		expectedCSV +='1,"Holt",48842,"MI",42.6272648,-84.5536678\n'
		expectedCSV +='1,"Los Angeles",90046,"CA",34.1147313,-118.3637264\n'
	
		var CSV = jsonTableToCSV.convertFromJSONString(JSONTableString)
		for ( var index = 0; index< CSV.length-1; index++ ) {
			assert.equal(expectedCSV.charAt(index),CSV.charAt(index))
			assert.equal(expectedCSV.charCodeAt(index),CSV.charCodeAt(index))
			assert.equal(expectedCSV.substring(index,index+1),CSV.substring(index,index+1))
		}		
	})

}

function convertTest() {
	it("table with one header and one row", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "value"])
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
				
		var expectedCSV = '"id","name","value"\n371,"Mary",16.34'
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})
	
	it("table with one header and one row", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "value"])
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
				
		var expectedCSV = '"id","name","value"\n371,"Mary",16.34'
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})

	
	it("table with one header and no rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.headerRows.push(["id", "name", "value"])
		JSONTable.rows = []
				
		var expectedCSV = '"id","name","value"'
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})
	
	it("table with no header and one rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
				
		var expectedCSV = '371,"Mary",16.34'
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})
	
	it("table with no header and two rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.rows = []
		JSONTable.rows.push([371, "Mary", 16.34])
		JSONTable.rows.push([14, "Bill", 22.7])
				
		var expectedCSV = '371,"Mary",16.34\n14,"Bill",22.7'
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})
	
	it("table with no header and no rows", function () {
		var JSONTable = {}
		JSONTable.headerRows = []
		JSONTable.rows = []
		
		var expectedCSV = ''
		var CSV = jsonTableToCSV.convert(JSONTable)
		assert.deepEqual(expectedCSV, CSV)
	})


}