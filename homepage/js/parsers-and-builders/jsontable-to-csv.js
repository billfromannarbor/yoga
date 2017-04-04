//Copy 2015 Karma Open Health LLC - Apache 2 License

"use strict"

var JSONTableToCSV = {
	convert:convert,
	convertString:convertFromJSONString
}

function convertFromJSONString(JSONTableString) {
	var JSONTable = JSON.parse(JSONTableString)
	return convert(JSONTable)
}

function convert(JSONTable) {
	var csv=""
	
	if ( !JSONTable.headerRows )
		throw new Error("Header Rows Missing from JSONTableObject")
	if ( !JSONTable.rows)
			throw new Error("Rows Missing from JSONTableObject")

	for ( var headerIndex = 0; headerIndex<JSONTable.headerRows.length; headerIndex++) {
		csv+=parseArrayIntoString(JSONTable.headerRows[headerIndex])
		csv+="\n"
	}
	
	for ( var rowIndex = 0; rowIndex<JSONTable.rows.length; rowIndex++) {
		csv+=parseArrayIntoString(JSONTable.rows[rowIndex])
		if ( rowIndex<(JSONTable.rows.length-1)){
			csv+="\n"
		}
	}
	
	if ( JSONTable.headerRows.length > 0 && JSONTable.rows.length== 0 ) {
		csv = csv.substring(0,csv.length-1)
	}	
	
	var re = /null/g
	csv = csv.replace(re,"")
	return csv
}

function parseArrayIntoString(arrayToParse) {
	var csv=""
	for ( var columnIndex = 0; columnIndex<arrayToParse.length; columnIndex++) {
		var value =arrayToParse[columnIndex]
		if ( typeof value=="string") {
			csv+="\"" + value + "\""
		}
		else {
			if ( value!=null) {
				csv+=value
			}
		}
		if ( columnIndex<(arrayToParse.length-1)){
			csv+=","
		}
	}
	return csv	
}

