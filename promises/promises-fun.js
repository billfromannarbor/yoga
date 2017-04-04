const util = require("util")

exports.CRUDChain = CRUDChain
exports.CRUDLetTheFastestWin = CRUDLetTheFastestWin
exports.CRUDSync = CRUDSync

function CRUDChainWithArguments() {
  

}

/**
 @description perform each operation in order
 @function
 @type {Promise}
 */
function CRUDChain() {
  return new Promise(function (resolve, reject) {
    create().then(read).then(update).then(remove).then(resolve).catch(reject)
  })
}

/**
 @description perform each operation, but the one that finishes first is what returns
 @function
 @type {Promise}
 */
function CRUDLetTheFastestWin() {
  return new Promise(function (resolve, reject) {
    var promises = []
    promises.push(create())
    promises.push(read())
    promises.push(update())
    promises.push(remove())
    Promise.race(promises).then(resolve).catch(reject)
  })

}

/**
 @description perform each operation and return when all are complete
 @function
 @type {Promise}
 */
function CRUDSync() {
  return new Promise(function (resolve, reject) {
    var promises = []
    promises.push(create())
    promises.push(read())
    promises.push(update())
    promises.push(remove())
    Promise.all(promises).then(resolve).catch(reject)
  })
}

function create(data) {
  return new Promise(function (resolve, reject) {
    try {
      var dataString
      if ( data ) {
       dataString = "" + data
      }
      else  {
        dataString=""
      }
      var message = dataString + "-create-"
      resolve(message)
    }
    catch (e) {
      reject(e)
    }
  })
}

function read(data) {
  return new Promise(function (resolve, reject) {
    try {
      var dataString
      if ( data ) {
       dataString = "" + data
      }
      else  {
        dataString=""
      }
      resolve(dataString + "-read-")
    }
    catch(e) {      
      reject(e)
    } 
  })
}

function update(data) {
  return new Promise(function (resolve, reject) {
    try {
      var dataString
      if ( data ) {
       dataString = "" + data
      }
      else  {
        dataString=""
      }
      resolve(dataString + "-update-")
    }
    catch(e) {      
      reject(e)
    } 
  })
}

function remove(data) {
  return new Promise(function (resolve, reject) {
    try {
      var dataString
      if ( data ) {
       dataString = "" + data
      }
      else  {
        dataString=""
      }
      resolve(dataString + "-remove-")
    }
    catch(e) {      
      reject(e)
    } 
  })
}