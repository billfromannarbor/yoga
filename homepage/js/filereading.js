function displayFileInfo(displayFileInfoElementID, files) {
  var displayFileInfoElement = document.getElementById(
    displayFileInfoElementID)
  if (files.length > 0) {
    var file = files[0]
    var returnString = "File Name: " + file.name
    returnString += ", File Type: " + file.type
    displayFileInfoElement.innerHTML = returnString
  }
  else {
    displayFileInfoElement.innerHTML = "Sorry No Files Found"
  }
}

function displayImage(displayImageDivID, files) {
  if (files.length > 0) {
    var file = files[0]
    var img = document.getElementById(displayImageDivID)
    img.file = file
    img.alt = file.name
    var imageType = /^image\//
    if (!imageType.test(file.type.match)) {
      var reader = new FileReader()
      reader.onload = (function (aImg) {
        return function (fileReader) {
          aImg.src = fileReader.target.result
        }
      })(img)
      reader.readAsDataURL(file)
    }
  }
}

function displayCSVInfo(displayCSVInfoDivID, files) {
  var displayCSVInfoDiv = document.getElementById(displayCSVInfoDivID)
  if (files.length > 0) {
    var file = files[0]
    if (file.type == "text/csv") {
      displayCSVInfoDiv.className = "alert alert-success"
      displayCSVInfoDiv.innerHTML = "CSV File is here"
      loadAndParseCSVFile(file, displayCSVInfoDiv)
    }
    else {
      displayCSVInfoDiv.innerHTML = "The file " + file.name +
        " is not a csv file"
      displayCSVInfoDiv.className = "alert alert-danger"
    }
  }
}

function loadAndParseCSVFile(file, displayCSVInfoDiv) {
  var reader = new FileReader()
  reader.onload = (parseTheCSVAndSetTheInfo)(displayCSVInfoDiv)
  reader.readAsText(file)
}

function parseTheCSVAndSetTheInfo(displayCSVInfoDiv) {
  return function (fileReader) {
    displayCSVInfoDiv.innerHTML = fileReader.target.result
  }
}

function displayJSONInfo(displayJSONElementID, files) {
  var displayJSONElement = document.getElementById(displayJSONElementID)
  if (files.length > 0) {
    var file = files[0]
    if (file.type == "application/json") {
      displayJSONElement.className = "alert alert-success"
      displayJSONElement.innerHTML = "JSON File is here"
      loadAndParseJSONFile(file, displayJSONElement)
    }
    else {
      displayJSONElement.innerHTML = "The file " + file.name +
        " is not a json file"
      displayJSONElement.className = "alert alert-danger"
    }
  }
}

function loadAndParseJSONFile(file, displayJSONElement) {
  var reader = new FileReader()
  reader.onload = (parseTheJSONAndSetTheInfo)(displayJSONElement)
  reader.readAsText(file)
}

function parseTheJSONAndSetTheInfo(displayJSONElement) {
  return function (fileReader) {
    displayJSONElement.innerHTML = fileReader.target.result
  }
}

function displayDownload(downloadContent) {
  var downloadSomething = document.getElementById("download-something")
  if (downloadSomething) {
    downloadSomething.href = "data:text/csv;charset=utf-8," +
      encodeURIComponent(downloadContent)
  }
}