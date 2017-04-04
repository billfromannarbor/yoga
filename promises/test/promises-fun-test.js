const promisesFun = require("../promises-fun.js")
const assert = require("assert")
const util = require("util")

describe("Having Fun with Promises", promisesFunTest)

function promisesFunTest() {
  it("Chain CRUD together", function (done) {
    var promiseCRUDChain = promisesFun.CRUDChain()
    promiseCRUDChain.then( function (data) {
      assert.deepEqual(data, '-create--read--update--remove-')
      done()
    }).catch( function (error) {
      done(error)
    })
  })
  
  it("Parallel CRUD With no Sync", function (done) {
    var promiseLetTheFastestWin = promisesFun.CRUDLetTheFastestWin()
    promiseLetTheFastestWin.then( function (data) {
      assert.deepEqual(data, '-create-')
      done()
    }).catch( function (error) {
      done(error)
    })

  })

  it("Parallel CRUD Synchronized", function (done) {
    var promiseCRUDSync = promisesFun.CRUDSync()
    promiseCRUDSync.then( function (data) {
      assert.deepEqual(data, [ '-create-', '-read-', '-update-', '-remove-' ])
      done()
    }).catch( function (error) {
      done(error)
    })
  })

}
