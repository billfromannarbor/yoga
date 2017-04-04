var geocoder = new google.maps.Geocoder()
var currentZipCounter = 0

function geoCode() {
  if (zipCodeJSON[currentZipCounter].pinLocation) {
    if (incrementZipCodeCounter()) {
      geoCode()
    }
  }
  else {
    zipCode = zipCodeJSON[currentZipCounter].ZipCode
    if (zipCode == "") {
      console.log("missing Zip Code for Position " + currentZipCounter)
      if (incrementZipCodeCounter()) {
        geoCode()
      }
    }
    else {
      geocoder.geocode({
        address: zipCode
      }, geoCoderResult)
    }
  }
}

function geoCoderResult(results_array, status) {
  if (status != "OK") {
    geoCodeStatus(status)
  }
  else {
    pinLocation = {}
    pinLocation.lat = results_array[0].geometry.location.lat()
    pinLocation.lng = results_array[0].geometry.location.lng()
    var pinLatLng = new google.maps.LatLng(pinLocation.lat, pinLocation.lng)
    var marker = new google.maps.Marker({
      position: pinLatLng,
      title: "Zip"
    })
    marker.setMap(map)
    zipCodeJSON[currentZipCounter].pinLocation = pinLocation
    console.log(JSON.stringify(zipCodeJSON[currentZipCounter], null, 2))
  }
}

function geoCodeStatus(status) {
  setTimeout(function () {
    geoCode(zipCodeJSON[currentZipCounter].ZipCode)
  }, 5000)
}

function incrementZipCodeCounter() {
  currentZipCounter++
  if (currentZipCounter >= zipCodeJSON.length) {
    return false
  }
  else {
    return true
  }
}