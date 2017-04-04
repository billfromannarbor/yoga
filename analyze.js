//find . -name *.jsp -exec grep -l '<input' {} \; | wc -l

const fs = require("fs")
main()

function main() {
  var fileList = getFileList()
  fileList.catch(errorHandler)
  var analyzeFilePromises = fileList.then(createFileList).then(analyzeFiles).then(function (data) {
    Promise.all(data)
      .then(function (data) {
        var info = {}
        info.count = 0
        info.findThisCount = 0
        info.thenFindThisCount= 0
        for (var i = 0; i< data.length; i++ )
        {
          info.count++
          info.findThisCount+=data[i].findThisCount
          info.thenFindThisCount+=data[i].thenFindThisCount
          if ( data[i].findThisCount > 0 && data[i].thenFindThisCount==0 ) {
             console.log("File: " + data[i].fileName)
          }
        }
        console.log("Analyzed " + info.count + " files, found " + info.findThisCount + " instances with " + info.thenFindThisCount + " ids")
      }, function (error) {console.log("error: " + error)})
  })
  
}

function errorHandler(error) {
  console.log("ERROR:" +error)
}

function getFileList() {
  return new Promise(function (resolve, reject) {
    fs.readFile("jsplist.txt", function (err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createFileList(data) {
  return new Promise(function (resolve, reject) {
    var fileList = parseStringIntoArrayOfStrings(""+data, "\n")
    resolve(fileList)
  })
}

function analyzeFiles(fileList) {
  return new Promise( function (resolve, reject) {
    var analyzeFilePromises = []
    for (var i=0; i<fileList.length; i++ ) {
      analyzeFilePromises.push(analyzeFile(fileList[i]))
    }
    resolve(analyzeFilePromises)
  })
}



function analyzeFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, function (err, data) {
      if (err) { 
        console("ERROR")
        reject("analyzeFileErr with filePath= " + filePath+ " " + err)
      }
      else {
        //search through the data to find what you're looking for
        var fileContent = "" + data
        info = strategyFindFilesWithOnlyHTML(fileContent)
        info.fileName = filePath
        resolve(info)
      }
    })
   }) 
}

function strategyFindFilesWithOnlyHTML(content) {
  var findThisIndex = content.indexOf("<html")
  var info = {findThisCount:0,thenFindThisCount:0}
  if ( findThisIndex !=-1 ) {
    info.findThisCount = 1
    var findEnd = content.indexOf("</html>", findThisIndex)
    if ( findEnd !=-1) {
        info.thenFindThisCount= 1
  
      }
    }
    
    return info


}

function strategyFindThisThenFindThisBeforeThis(content){
    var findThis = "<html"
    var thenFindThis = "id="
    var beforeThis = ">"
    
    var findThisCount = 0
    var thenFindThisCount = 0
    
    var findThisIndex = content.indexOf(findThis)
    //console.log("findThisIndex: " + findThisIndex )
    while ( findThisIndex !=-1 ) {
      findThisCount++
      var beforeIndex = content.indexOf(beforeThis,findThisIndex)
      //console.log("beforeIndex: " + beforeIndex )
      if ( beforeIndex != -1 ) {
        var thenFindThisIndex = content.substring(findThisIndex,beforeIndex).indexOf(thenFindThis)
        if ( thenFindThisIndex != -1 ) {
          thenFindThisCount++
        }
      }
      findThisIndex = content.indexOf(findThis,findThisIndex+1)
    }
    var info = {}
    info.findThisCount = findThisCount
    info.thenFindThisCount= thenFindThisCount
    return info
}

function readArguments() {
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

}

function parseStringIntoArrayOfStrings(stringToParse, delimiter) {
  var definedDelimiter
  if (!delimiter) {
    definedDelimiter = "\n"
  }
  else {
    definedDelimiter = delimiter
  }
  var indexOfLastDelimiter = stringToParse.lastIndexOf(definedDelimiter)
  var stringToSplit
  if (indexOfLastDelimiter == stringToParse.length - 1) {
    stringToSplit = stringToParse.substring(0, indexOfLastDelimiter)
  }
  else {
    stringToSplit = stringToParse
  }
  
  return stringToSplit.split(definedDelimiter)
}