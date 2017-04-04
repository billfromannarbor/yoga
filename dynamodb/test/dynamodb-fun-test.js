"use strict"

const dynamoDBHelper = require("../dynamodb-fun.js").dynamoDBHelper

describe("Create a new table", createNewTable)


function createNewTable() {
  it("Creates a new table", function(done) {
    dynamoDBHelper.createKVTable("testTable", "id", dynamoDBHelper.keyType.hash, "info", dynamoDBHelper.attributeType.string ) 
    done()
  
  })

}

