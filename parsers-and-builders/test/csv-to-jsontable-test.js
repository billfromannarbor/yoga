//Copy 2015 Karma Open Health LLC - Apache 2 License

const csvToJSONTable = require("../csv-to-jsontable.js")
const assert = require("assert")
const util = require("util")

describe("CSV To JSON Table", csvToJSONTableTest)
describe("Parse Strings into Array of Strings", parseStringIntoArrayOfStringsTest)
describe("Parse Strings into Array of Values", parseStringIntoArrayOfValuesTest)
describe("Test if the field is an alpha field", isAlphaTest)
describe("Extract Fields", extractFieldsTest)

function csvToJSONTableTest() {
	it("single header, comma separated delimiter with standard line ending", function () {
		var delimiter = ","
		var lineEndCharacter = "\n"
		var headerCount = 1
		var stringDelimiter = "\""
		var csv = '"id","name","value"\n'
		csv+='1,"Mary",36.873\n'
		csv+='2,"John",42.31\n'
		csv+='3,"Allen",16.42\n'
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id","name","value"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([1,"Mary",36.873])
		expectedJSONTable.rows.push([2,"John",42.31])
		expectedJSONTable.rows.push([3,"Allen",16.42])

		var JSONTable = csvToJSONTable.convert(csv, headerCount, delimiter, stringDelimiter, lineEndCharacter )

		assert.deepEqual(expectedJSONTable, JSONTable)
	})

	it("two line header, comma separated delimiter with standard line ending", function () {
		var delimiter = ","
		var lineEndCharacter = "\n"
		var headerCount = 2
		var stringDelimiter = "\""
		var csv = '"id","name","position"\n'
		csv+=',,"x","y"\n'
		csv+='1,"Mary",10,4\n'
		csv+='2,"John",12,31\n'
		csv+='3,"Allen",14,9\n'
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.headerRows.push(["id","name","position"])
		expectedJSONTable.headerRows.push([,,"x","y"])
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([1,"Mary",10,4])
		expectedJSONTable.rows.push([2,"John",12,31])
		expectedJSONTable.rows.push([3,"Allen",14,9])
		expectedJSONTable = JSON.parse(JSON.stringify(expectedJSONTable))
		var JSONTable = csvToJSONTable.convert(csv, headerCount, delimiter, stringDelimiter, lineEndCharacter )		
		assert.deepEqual(expectedJSONTable, JSONTable)
	})

	it("no header, no info but the csv passed in", function () {
		var csv ='1,"Mary",36.873\n'
		csv+='2,"John",42.31\n'
		csv+='3,"Allen",16.42\n'
		
		var expectedJSONTable = {}
		expectedJSONTable.headerRows = []
		expectedJSONTable.rows = []
		expectedJSONTable.rows.push([1,"Mary",36.873])
		expectedJSONTable.rows.push([2,"John",42.31])
		expectedJSONTable.rows.push([3,"Allen",16.42])

		var JSONTable = csvToJSONTable.convert(csv )

		assert.deepEqual(expectedJSONTable, JSONTable)
	})
	
	it("No CSV Passed in", function () {
		try {
			var JSONTable = csvToJSONTable.convert()
			assert(false)
		}
		catch(e) {
			assert(true)
		}
	})

	it("Bad delimiters", function () {
		var delimiter = "|"
		var lineEndCharacter = "\r"
		var headerCount = 2
		var stringDelimiter = "\'"
		var csv = '"id","name","position"\n'
		csv+=',,"x","y"\n'
		csv+='1,"Mary",10,4\n'
		csv+='2,"John",12,31\n'
		csv+='3,"Allen",14,9\n'
		try {
			var JSONTable = csvToJSONTable.convert(csv, headerCount, delimiter, stringDelimiter, lineEndCharacter )	
			assert(false)
		}
		catch(e)
		{
			assert(true)
		}	
	})
	
}

function parseStringIntoArrayOfStringsTest() {
	it("parses lines where all lines have a line end character", function () {
		var lineEndCharacter = "\n"
	
		var csv = 'id,name,value\n'
		csv+='1,"Mary",36.873\n'
		csv+='2,"John",42.31\n'
		csv+='3,"Allen",16.42\n'
				
		var expectedLineArray = []
		expectedLineArray.push('id,name,value')
		expectedLineArray.push('1,"Mary",36.873')
		expectedLineArray.push('2,"John",42.31')
		expectedLineArray.push('3,"Allen",16.42')

		var lineArray = csvToJSONTable.parseStringIntoArrayOfStrings(csv, lineEndCharacter )

		assert.deepEqual(expectedLineArray, lineArray)
	})
	
	it("parses lines where the last line does not have an end of line character", function () {
		var lineEndCharacter = "\n"
	
		var csv = 'id,name,value\n'
		csv+='1,"Mary",36.873\n'
		csv+='2,"John",42.31\n'
		csv+='3,"Allen",16.42'
				
		var expectedLineArray = []
		expectedLineArray.push('id,name,value')
		expectedLineArray.push('1,"Mary",36.873')
		expectedLineArray.push('2,"John",42.31')
		expectedLineArray.push('3,"Allen",16.42')

		var lineArray = csvToJSONTable.parseStringIntoArrayOfStrings(csv, lineEndCharacter )

		assert.deepEqual(expectedLineArray, lineArray)
	})
}

function parseStringIntoArrayOfValuesTest() {
	it("comma separated string", function () {
		var delimiter = ","
		var csv = '"id",5,"name","value",2.05,"dog",16.357'
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter )

		assert.deepEqual(expectedArray, array)
	})

	it("comma separated string with single quotes around strings", function () {
		var delimiter = ","
		var stringDelimiter = "'"
		var csv = "'id',5,'name','value',2.05,'dog',16.357"
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter, stringDelimiter )

		assert.deepEqual(expectedArray, array)
	})
	
	it("comma separated string with no quotes around strings", function () {
		var delimiter = ","
		var stringDelimiter = "'"
		var csv = "id,5,name,'value',2.05,'dog',16.357"
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter, stringDelimiter )

		assert.deepEqual(expectedArray, array)
	})
	
	it("comma separated string with empty fields", function () {
		var delimiter = ","
		var stringDelimiter = "'"
		var csv = ",'id',5,'name','value',2.05,'dog',,25.692,"
		var expectedArray = [null,'id',5,'name','value',2.05,'dog',null,25.692,null]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter, stringDelimiter)

		assert.deepEqual(expectedArray, array)
	})

	it("semicolon separated string", function () {
		var delimiter = ";"
		var csv = '"id";5;"name";"value";2.05;"dog";16.357'
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter )

		assert.deepEqual(expectedArray, array)
	})

	it("pipe separated string", function () {
		var delimiter = "|"
		var csv = '"id"|5|"name"|"value"|2.05|"dog"|16.357'
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter )

		assert.deepEqual(expectedArray, array)
	})

	it("backslash separated string", function () {
		var delimiter = "\\"
		var csv = '"id"\\5\\"name"\\"value"\\2.05\\"dog"\\16.357'
		var expectedArray = ['id',5,'name','value',2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter )

		assert.deepEqual(expectedArray, array)
	})

	it("Pass in Date", function () {
		//JSON doesn't really parse the date, seems to just keep it as a string
		var delimiter = ","
		var date = new Date()
		var csv = '"id",5,"name","'+date.toISOString()+'",2.05,"dog",16.357'
		var expectedArray = ['id',5,'name',date.toISOString(),2.05,'dog',16.357]
		var array = csvToJSONTable.parseStringIntoArrayOfValues(csv, delimiter )

		assert.deepEqual(expectedArray, array)
	})
	
}

function isAlphaTest() {
	it ("a,A,Z,z", function () {
		assert.equal(true,csvToJSONTable.isAlpha("abcdefg"))
		assert.equal(true,csvToJSONTable.isAlpha("Acdefg"))
		assert.equal(true,csvToJSONTable.isAlpha("Zbcdefg"))
		assert.equal(true,csvToJSONTable.isAlpha("zbcdefg"))
	})
	it ("+,-,.,1,0", function () {
		assert.equal(true,csvToJSONTable.isAlpha("1bcdefg"), "1bcdefg is alpha")
		assert.equal(false,csvToJSONTable.isAlpha("+14.35"), "+14.35 is not alpha")
		assert.equal(false,csvToJSONTable.isAlpha("-14.35"), "-14.35 is not alpha")
		assert.equal(false,csvToJSONTable.isAlpha(".1435"), ".1435 is not alpha")
	})
	it("numbers that aren't", function (){
			assert.equal(true,csvToJSONTable.isAlpha(".14.35"), ".14.35 is alpha")
	})
	it("numbers that are", function (){
			assert.equal(false,csvToJSONTable.isAlpha("100,378.48"), "100,378.48 is not alpha")
	})
	
}

function extractFieldsTest() {
	it("field delimiter is comma and there are strings with commas in the line", function() {
		var stringToExtractIntoFields = '123,"abc,def",40.5'
		var expectedArray = ["123","abc,def","40.5"]
		var delimiter = ","
		var stringDelimiter = "\""
		var fieldArray 
			= csvToJSONTable.extractFields(stringToExtractIntoFields, delimiter, stringDelimiter)
		assert.deepEqual(expectedArray, fieldArray)
	})
}

