//TODO - Get Rid of Globals - should be functional


//This kicks off the map - figure out a better way for god's sake
google.maps.event.addDomListener(window, 'load', initialize)

function initialize() {
  loadMapData()
}


function loadMapData() {
  $.get("/data/fmri-study-data-3.csv", function (data) {
    var headerRows = 2
    var jsonTable = CSVToJSONTable.convert(data, headerRows)
    var mapitJSON = JSONTableToJSON.convert(jsonTable)
    loadMap(mapitJSON)
  })
}

var mapInfo

function loadMap(mapitJSON) {
  mapInfo = initializeMapAndScale()
  drawLocations(mapInfo, mapitJSON)
  google.maps.event.addListener(mapInfo.map, 'center_changed', drawScale)
  google.maps.event.addListener(mapInfo.map, 'bounds_changed', drawScale)
  google.maps.event.addListener(mapInfo.map, 'zoom_changed', drawScale)
}

function initializeMapAndScale() {
  var mapInfo = {}
  var mapCanvas = document.getElementById("map-canvas")
  var map = new google.maps.Map(mapCanvas, {
    zoom: 7,
    center: new google.maps.LatLng(44.5494325, -84.0794851),
    panControl: false,
    zoomControl: false,
    scaleControl: false
  })

  mapInfo.map = map
  mapInfo.scale = new google.maps.Polyline()
  mapInfo.scaleLabel
  mapInfo.scaleColor = "#E7770E"
  mapInfo.scale.setOptions({
    strokeWeight: 2,
    visible: true,
    strokeColor: mapInfo.scaleColor
  })
  mapInfo.scaleIcon = {}
  mapInfo.scaleIcon.anchor = new google.maps.Point(0, 0)
  mapInfo.scaleIcon.origin = new google.maps.Point(0, 0)
  mapInfo.scaleIcon.scaledSize = new google.maps.Size(16, 16)
  mapInfo.scaleIcon.url =
    "http://maps.google.com/mapfiles/kml/pal5/icon5.png"
  mapInfo.scalePercentFromBottom = .04

  return mapInfo
}

function drawLocations(mapInfo, mapitJSON) {
  var markerICON = {}
  markerICON.anchor = new google.maps.Point(0, 0)
  markerICON.origin = new google.maps.Point(0, 0)
  markerICON.scaledSize = new google.maps.Size(16, 16)
  markerICON.url = "http://maps.google.com/mapfiles/kml/pal4/icon49.png"
    //You can look up marker icons here - https://sites.google.com/site/gmapsdevelopment/
  var markerIcon1 = "http://maps.google.com/mapfiles/kml/pal4/icon49.png"
  var markerIcon2 = "http://maps.google.com/mapfiles/kml/pal4/icon60.png"
  var markerIcon3 = "/img/map-icon-red.png"
  var markerIcon4 = "/img/map-icon-blue.png"
    //var markerIcon5 = " labs.google.com/ridefinder/images/mm_20_green.png"
  for (var i = 0; i < mapitJSON.length; i++) {
    if (mapitJSON[i].Position.lat && mapitJSON[i].Position.lng) {
      var pinLatLng = new google.maps.LatLng(mapitJSON[i].Position.lat,
        mapitJSON[i].Position.lng)
      var titleString = "" + i
      if (mapitJSON[i].ZipCode) {
        titleString = "Zip: " + mapitJSON[i].ZipCode
      }
      if (mapitJSON[i].Study == 1) {
        markerICON.url = markerIcon3
      }
      else {
        markerICON.url = markerIcon4
      }
      var marker = new google.maps.Marker({
        position: pinLatLng,
        title: titleString,
        icon: markerICON,
        shadow: markerICON
      })
      marker.setMap(mapInfo.map)
    }
  }
}

function drawScale() {
  var mapBounds = mapInfo.map.getBounds()
  var latDifference = mapBounds.getNorthEast().lat() - mapBounds.getSouthWest()
    .lat()
  var lngDifference = mapBounds.getNorthEast().lng() - mapBounds.getSouthWest()
    .lng()
  var lngCenter = mapInfo.map.getCenter().lng()


  var scaleVerticalMarkerPercentFromTheBottom = mapInfo.scalePercentFromBottom +
    .01
  var scaleLabelPercentFromBottom = scaleVerticalMarkerPercentFromTheBottom +
    mapInfo.scalePercentFromBottom
  var scaleHorizontalLinePercentLength = .10
  var scalePercentFromLeft = .95 - scaleHorizontalLinePercentLength

  var latStart = mapBounds.getSouthWest().lat() + (latDifference *
    scaleVerticalMarkerPercentFromTheBottom)
  var lngStart = mapBounds.getSouthWest().lng() + (lngDifference *
    scalePercentFromLeft)
  var scaleStart = new google.maps.LatLng(latStart, lngStart)
  var lathorizontalLineStart = mapBounds.getSouthWest().lat() + (
    latDifference * mapInfo.scalePercentFromBottom)
  var horizontalLineStart = new google.maps.LatLng(lathorizontalLineStart,
    lngStart)

  //Make the scale long round to the nearest x mile
  var milesToRoundTo = 1
  var oneDegreeFromStartLng = new google.maps.LatLng(latStart, lngStart + 1)
  var distanceInMilesForOneDegreeLng = google.maps.geometry.spherical.computeDistanceBetween(
    scaleStart, oneDegreeFromStartLng, 3956.6)
  var degreesLngInOneMile = 1 / distanceInMilesForOneDegreeLng

  var initialDistanceInDegrees = scaleHorizontalLinePercentLength *
    lngDifference
  var initialHorizontalLineEnd = new google.maps.LatLng(
    lathorizontalLineStart, lngStart + initialDistanceInDegrees)
  var initialDistanceInMiles = google.maps.geometry.spherical.computeDistanceBetween(
    horizontalLineStart, initialHorizontalLineEnd, 3956.6)

  if (initialDistanceInMiles > 5) {
    milesToRoundTo = 5
  }

  var roundedDistanceInMiles = Math.round(initialDistanceInMiles /
    milesToRoundTo) * milesToRoundTo
  var distanceInDegrees = roundedDistanceInMiles * degreesLngInOneMile


  var lnghorizontalLineEnd = lngStart + distanceInDegrees
  var horizontalLineEnd = new google.maps.LatLng(lathorizontalLineStart,
    lnghorizontalLineEnd)

  var scaleEnd = new google.maps.LatLng(latStart, lnghorizontalLineEnd)

  mapInfo.scale.setPath([scaleStart, horizontalLineStart, horizontalLineEnd,
    scaleEnd
  ])
  mapInfo.scale.setMap(mapInfo.map)

  var distanceInMilesForScale = google.maps.geometry.spherical.computeDistanceBetween(
    scaleStart, scaleEnd, 3956.6)


  var scaleDistanceText = "" + Math.round(distanceInMilesForScale) + " miles"

  var scaleLabelLatStart = mapBounds.getSouthWest().lat() + (latDifference *
    scaleLabelPercentFromBottom)
  var scaleLabelPos = new google.maps.LatLng(scaleLabelLatStart, lngStart)


  if (mapInfo.scaleLabel) {
    mapInfo.scaleLabel.setMap(null)
  }

  mapInfo.scaleLabel = new MapLabel({
    text: scaleDistanceText,
    position: scaleLabelPos,
    map: mapInfo.map,
    fontSize: 20,
    fontColor: mapInfo.scaleColor,
    align: 'left'
  })
}