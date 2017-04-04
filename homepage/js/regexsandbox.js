$(document).ready(function () {
  initializePage()
})

function initializePage() {
  $("#regex-editor-validate").click(validateRegexEvent)
  $("#regex-editor-replace").click(replaceStringEvent)

}

function initForSplit() {
  var text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end'
  var regexPattern = "\\r\\n|\\r|\\n/"
  document.getElementById("regex-editor-pattern").value = regexPattern
  document.getElementById("regex-editor-target-string").value = text

}

function validateRegexEvent() {
  var pattern = document.getElementById("regex-editor-pattern").value
  var flags = document.getElementById("regex-editor-flags").value
  var regEx = new RegExp(pattern, flags)
  document.getElementById("regex-editor-validation-errors").innerHTML = regEx
    .source
}

function replaceStringEvent() {
  var pattern = document.getElementById("regex-editor-pattern").value
  var flags = document.getElementById("regex-editor-flags").value
  var regEx = new RegExp(pattern, flags)
  var stringToReplace = document.getElementById("regex-editor-target-string")
    .value
  var replaceWithString = document.getElementById(
    "regex-editor-replace-with-string").value
  var result = stringToReplace.replace(regEx, replaceWithString)
  var returnString = ""
  for (var i = 0; i < result.length; i++) {
    returnString += i + ":" + result[i]
  }
  document.getElementById("regex-editor-result").innerHTML = result
}

// \,{2}|^\,|\,$
//split
//match
//replace