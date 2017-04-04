function convertHTMLTableToCSV(htmlTable) {
  var csvText = ""
  var headers = htmlTable.tHead.rows.item(0)
  var headerRows = headers.cells
  for (var i = 0; i < headerRows.length; i++) {
    csvText += headerRows[i].innerHTML
    if (i + 1 < headerRows.length) {
      csvText += ","
    }
  }
  csvText += "\n"

  var rows = htmlTable.tBodies[0].rows
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].cells
    for (var j = 0; j < cols.length; j++) {
      var columnText = cols[j].innerHTML
      csvText += '"' + columnText + '"'
      if (j + 1 < cols.length) {
        csvText += ","
      }
    }
    if (i + 1 < rows.length) {
      csvText += "\n"
    }
  }
  return csvText
}