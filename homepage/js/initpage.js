$(document).ready(function () {
  initpage()
})

function initpage() {
  displayNavBar()
  displayFooter()
  displayDownloadYogaTodo()
  displayDownloadLocationData() //TODO - make this specific to the js for this page
  addGoogleAnalyticsTracking()
}

function displayNavBar() {
  var navbarElement = document.getElementById("navbar")
  if (navbarElement) {
    $.get("/html/navbar.html", function (data) {
      navbarElement.innerHTML = data
    })
  }
}

function displayFooter() {
  var footerElement = document.getElementById("footer")
  if (footerElement) {
    $.get("/html/footer.html", function (data) {
      footerElement.innerHTML = data
    })
  }
}

function displayDownloadYogaTodo() {
  var downloadYogaTodoList = document.getElementById("download-yoga-todolist")
  if (downloadYogaTodoList) {
    var todoTableElement = document.getElementById("yoga-todo-table")
    var yogaTodoCSV = convertHTMLTableToCSV(todoTableElement)
    downloadYogaTodoList.href = "data:text/csv;charset=utf-8," +
      encodeURIComponent(yogaTodoCSV)
  }
}

function displayDownloadLocationData() {
  var downloadLocationLink = document.getElementById("download-location-data")
  if (downloadLocationLink) {
    downloadLocationLink.addEventListener('click', function (event) {
      var csvLocationData = document.getElementById("display-locations").innerHTML
      downloadLocationLink.href = "data:text/csv;charset=utf-8," +
        encodeURIComponent(csvLocationData)
      downloadLocationLink.download = "locationData.csv"
    }, false)
  }
}

function addGoogleAnalyticsTracking() {
  (function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date()
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js',
    'ga')

  ga('create', 'UA-60678767-1', 'auto')
  ga('send', 'pageview')
}