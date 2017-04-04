function displayLocationInfo(displayElementID, files) {
  var displayElement = document.getElementById(displayElementID)
  if (files.length > 0) {
    var file = files[0]
    if (file.type == "text/csv") {
      displayElement.className = "alert alert-success"
      displayElement.innerHTML = "CSV File is here"
      loadAndParseLocationFile(file, displayElement)
    }
    else {
      displayElement.innerHTML = "The file " + file.name +
        " is not a csv file"
      displayElement.className = "alert alert-danger"
    }
  }
}

function loadAndParseLocationFile(file, displayElementID) {
  var reader = new FileReader()
  reader.onload = (parseGeoCodeDisplayAndShowDownload)(displayElementID)
  reader.readAsText(file)
}

function parseGeoCodeDisplayAndShowDownload(displayElementID) {
  return function (fileReader) {
    var headerRows = 2
    var jsonTable = CSVToJSONTable.convert(fileReader.target.result, 2)
    var locationInfo = JSONTableToJSON.convert(jsonTable)
    var geocoder = new google.maps.Geocoder()
    geoCodeNext(locationInfo, 0, displayElementID, geocoder,
      geoCodeFinished)
  }
}

function geoCodeNext(locationInfo, index, displayElementID, geocoder,
  geoCodeFinished) {
  if (locationInfo[index].Position.lat && locationInfo[index].Position.lng) {
    index++
    if (index < locationInfo.length) {
      geoCodeNext(locationInfo, index, displayElementID, geocoder,
        geoCodeFinished)
    }
    else {
      console.log("Nothing left to GEO Code" + status)
      geoCodeFinished(locationInfo, displayElementID)
    }
  }
  else {
    var postalCode = "" + locationInfo[index].ZipCode
    console.log(postalCode)
    geocoder.geocode({
      address: postalCode
    }, function (results_array, status) {
      if (status != "OK") {
        console.log("Geo Coding Failed - Status - " + status)
        geoCodeFinished(locationInfo, displayElementID)
      }
      else {
        locationInfo[index].Position.lat = results_array[0].geometry.location
          .lat()
        locationInfo[index].Position.lng = results_array[0].geometry.location
          .lng()
        index++
        if (index < locationInfo.length) {
          geoCodeNext(locationInfo, index, displayElementID, geocoder,
            geoCodeFinished)
        }
        else {
          geoCodeFinished(locationInfo, displayElementID)
        }
      }
    })
  }
}

function geoCodeFinished(locationInfo, displayElementID) {
  var jsonTable = JSONToJSONTable.convert(locationInfo)
  var locationInfoAsCSV = JSONTableToCSV.convert(jsonTable)
  displayElementID.innerHTML = locationInfoAsCSV
}