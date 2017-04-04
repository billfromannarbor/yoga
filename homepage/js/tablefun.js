$(document).ready(function () {
  initializePage()
})

function initializePage() {
  initializeJSONEditor()
  initializeCSVEditor()
}

function initializeJSONEditor() {
  $("#json-editor-validate").click(validateJSON)
  $("#json-editor-upload").click(uploadJSONFile)
  displayDownloadJSONFile()
  $("#json-editor-convert-csv").click(convertJSONToCSV)
  $("#json-editor-convert-html").click(convertJSONToHTML)
}

function initializeCSVEditor() {
  $("#csv-editor-validate").click(validateCSV)
  $("#csv-editor-upload").click(uploadCSVFile)
  displayDownloadCSVFile()
  $("#csv-editor-convert-csv").click(convertCSVToJSON)
  $("#csv-editor-convert-html").click(convertCSVToHTML)
}

//CSV
function validateCSV(event) {
  var content = document.getElementById("csv-editor-text").value
  try {
    var headerRows = document.getElementById(
      "csv-editor-number-of-header-rows").value
    var jsonTable = CSVToJSONTable.convert(content, headerRows)
    showCSVStatus("success")
    var jsonTableString = JSON.stringify(jsonTable)
    console.log(jsonTableString)
  }
  catch (e) {
    showCSVStatus(null, e.message)
  }
}

function uploadCSVFile(event) {
  $("#csv-editor-file-picker").click()
}

function convertCSVToJSON(event) {
  var content = document.getElementById("csv-editor-text").value
  try {
    var headerRows = document.getElementById(
      "csv-editor-number-of-header-rows").value
    var jsonTable = CSVToJSONTable.convert(content, headerRows)
    var json = JSONTableToJSON.convert(jsonTable)
    document.getElementById("json-editor-text").value = JSON.stringify(json,
      null, 2)
    showCSVStatus("success")
  }
  catch (e) {
    showCSVStatus(null, e.message)
    throw e
  }
}

function convertCSVToHTML(event) {

}

function displayDownloadCSVFile() {
  var downloadLink = document.getElementById("csv-editor-download")
  if (downloadLink) {
    downloadLink.addEventListener('click', function (event) {
      var content = document.getElementById("csv-editor-text").value
      downloadLink.href = "data:text/csv;charset=utf-8," +
        encodeURIComponent(content)
      downloadLink.download = ""
    }, false)
  }
}

function showCSVStatus(message, error) {
  showStatus(message, error, "csv-editor-validation-errors")
}

//END CSV

//JSON
function validateJSON(event) {
  var content = document.getElementById("json-editor-text").value
  try {
    var JSONTable = JSONToJSONTable.convertString(content)
    showJSONStatus("Success", null)
  }
  catch (e) {
    showJSONStatus(null, e)
    throw e
  }
}

function uploadJSONFile(event) {
  $("#json-editor-file-picker").click()
}

function convertJSONToCSV(event) {
  var content = document.getElementById("json-editor-text").value
  try {
    var JSONTable = JSONToJSONTable.convertString(content)
    var csv = JSONTableToCSV.convert(JSONTable)
    document.getElementById("csv-editor-text").value = csv

    showJSONStatus("Success", null)
  }
  catch (e) {
    showJSONStatus(null, e)
    throw e
  }

}

function convertJSONToHTML(event) {
  var JSONTable = convertJSONToJSONTable()

}

function displayDownloadJSONFile() {
  var downloadLink = document.getElementById("json-editor-download")
  if (downloadLink) {
    downloadLink.addEventListener('click', function (event) {
      var content = document.getElementById("json-editor-text").value
      downloadLink.href = "data:application/json;charset=utf-8," +
        encodeURIComponent(content)
      downloadLink.download = ""
    }, false)
  }
}

function showJSONStatus(message, error) {
  showStatus(message, error, "json-editor-validation-errors")
}

function JSONValidator(JSONString) {
  var JSONValidateInfo = {}
  var JSONObject
  try {
    JSONObject = JSON.parse(JSONString)
  }
  catch (e) {
    JSONValidateInfo.error = e
    return JSONValidateInfo
  }
  JSONValidateInfo.json = JSON.stringify(JSONObject, null, 2)
  return JSONValidateInfo
}


//END JSON


function filePicker(fileNameElementID, fileDisplayElementID, files) {
  if (files) {
    if (files.length > 0) {
      displayFileName(fileNameElementID, files[0])
      loadFile(fileDisplayElementID, files[0])
    }
  }
}

function displayFileName(fileNameElementID, file) {
  var fileNameElement = document.getElementById(fileNameElementID)
  fileNameElement.innerHTML = file.name
}

function loadFile(displayElementID, file) {
  var reader = new FileReader()
  var displayElement = document.getElementById(displayElementID)
  reader.onload = (setEditorValue)(displayElement)
  reader.readAsText(file)
}

function setEditorValue(displayElement) {
  return function (fileReader) {
    displayElement.value = fileReader.target.result
  }
}

function showStatus(message, error, elementID) {
  if (!elementID) {
    var error = new ReferenceError(
      "ElementID must be present in showStatus function")
    throw error
  }
  var elementIDString = "#" + elementID
  if (error) {
    $(elementIDString).removeClass("alert-success")
    $(elementIDString).addClass("alert-danger")
    $(elementIDString).html(error)
  }
  else {
    $(elementIDString).removeClass("alert-danger")
    $(elementIDString).addClass("alert-success")
    $(elementIDString).html(message)
  }
}