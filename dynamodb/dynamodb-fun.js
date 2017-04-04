//Copyright 2015 Karma Open Health LLC
"use strict"

const AWS = require("aws-sdk")
const util = require("util")
const types = {
  undefinedType:"undefined"
  ,nullType:"object"
  ,booleanType:"boolean"
  ,numberType:"number"
  ,stringType:"string"
  ,symbolType:"symbol"
  ,functionType: "function"
  ,objectType:"object"
}

const dynamoDBHelper = {
  attributeType: { string:"String",number:"Number",binary:"Binary" }
  ,keyType: { hash:"HASH",range:"RANGE" }
  ,createKVTable: createKVTable
}

var awsInfo = {
  setupComplete: false
  ,awsRegion:"us-east-1"  
}

exports.dynamoDBHelper = dynamoDBHelper
exports.types = types

function setup() {
  if ( !awsInfo.setupComplete)
  {
    AWS.config.update({region: awsInfo.awsRegion})
    awsInfo.setupComplete = true //I wonder if this should be accessed atomically?
  }
}
function createKVTable(tableName, keyName, keyType, valueName, valueType) {
  //Validate the arguments
  if ( !tableName || !keyName || !keyType || !valueName || !valueType) {
    var validationError = new Error()
    validationError.message ="Missing: "
    if ( !tableName)
      validationError.message+="tableName" + " "
    if ( !keyName)
      validationError.message+="keyName" + " "
    if ( !keyType)
      validationError.message+="keyType" + " "
    if ( !valueName)
      validationError.message+="valueName" + " "
    if ( !valueType)
      validationError.message+="valueType (should be an attributeType)" + " "
    throw ( validationError)    
  }
  if ( typeof tableName != types.stringType)
    throw(new Error("tableName should be type: " + types.stringType))
  
  var createTableInfo = {
    tablename : tableName
    ,keySchema: [{AttributeName:keyName, KeyType:keyType}]
    ,attributes : [{AttributeName:valueName, AttributeType: valueType}]
  }

}

function createTable(createTableInfo) {
    return new Promise(function (resolve, reject) {
      setup()
      var dynamodb = new AWS.DynamoDB()
      var params = {
        AttributeDefinitions: createTableInfo.attributes
        ,KeySchema:createTableInfo.keySchema
        ,TableName: createTableInfo.tableName
        ,Key: {emailAddress:{S:emailAddress}}
        ,AttributesToGet:["emailAddress","name"]
      }

    dynamodb.createTable(params, function(err, data) {
      if (err) {
        reject(err)
      } 
      else {
        resolve(data)
      }
    })
  })
}

//addARecordToUserTable()
//addOrUpdateUserRecord("bill2.heitzeg@gmail.com", "anotherPasswordAss", "Bill Heitzeg")
//scanUserTable()
//showUserRecord("bill2.heitzeg@gmail.com")

function showUserRecord(emailAddress) {
  getUserRecord(emailAddress).then(show).catch(errorHandler)

  function show(data) {
    if (!data.Item) {
      console.log("User Record doesn't exist")
      showReturnData("showUserRecord", data)
    }
    else {
      console.log("User Record: " + util.inspect(data.Item))
    }
  }

  function errorHandler(error) {
    console.log("showUserRecord failed for: " + email)
    console.log(error)
  }

}


function addOrUpdateUserRecord(emailAddress, password, name) {
  getUserRecord(emailAddress).then(addOrUpdate).catch(errorHandler)

  function addOrUpdate(data) {
    if (!data.Item) {
      addUserRecord(emailAddress,password,name).catch(errorHandler)
    }
    else {
      updateUserRecord(emailAddress,password,name).catch(errorHandler)
    }
  }

  function errorHandler(error) {
    console.log("AddOrUpdateUserRecord failed for: " + email)
    console.log(error)
  }
}

function getUserRecord(emailAddress) {
    return new Promise(function (resolve, reject) {
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: USER_TABLE_NAME
        ,Key: {emailAddress:{S:emailAddress}}
        ,AttributesToGet:["emailAddress","name"]
      }

    dynamodb.getItem(params, function(err, data) {
      if (err) {
        reject(err)
      } 
      else {
        resolve(data)
      }
    })
  })

}

function updateUserRecord(email, password, name ) {
    console.log("updateUserRecord" + updateUserRecord)
    return new Promise(function (resolve, reject) {
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: USER_TABLE_NAME
        ,Key: {emailAddress:{S:emailAddress}}
        ,AttributeUpdates: {password: {Action:PUT, Value:{S:password} } }
      }

    dynamodb.updateItem(params, function(err, data) {
      if (err) {
        reject(err)
      }
      else { 
        resolve(data) 
      }
    })
    
  })

}

function addUserRecord(emailAddress, password, name ) {
    console.log("addUserRecord" + emailAddress)
    return new Promise(function (resolve, reject) {
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: USER_TABLE_NAME
        ,Item: {emailAddress:{S:emailAddress}, password:{S:password}, name:{S:name}}
      }

    dynamodb.putItem(params, function(err, data) {
      if (err) {
        reject(err)
      }
      else { 
        resolve(data) 
      }
    })
    
  })
}


function addARecordToUserTable() {
  var dataSave = putItem("Bill Heitzeg", "bill.heitzeg@gmail.com")
  dataSave.then(
    function(data){
      showReturnData("Add A Record To User Table",data)
    }
    ,function(err){
      console.log("Failed: " + err)
  })
}

function scanUserTable() {
  var scan = scanTable(USER_TABLE_NAME)
  scan.then(
    function(data) {
      showReturnData("Scan User Table", data)
    }
    ,function(err) {
      console.log("Failed: " + err)
  })

}

function putItem(name, emailAddress) {
    return new Promise(function (resolve, reject) {
    console.log("name: " + name + " emailAddress: " + emailAddress)
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: USER_TABLE_NAME
        ,Item: {key:{S:"dog"}, name:{S:name}, emailAddress:{S:emailAddress} }
      }

    dynamodb.putItem(params, function(err, data) {
      if (err) reject(err) // an error occurred
      else resolve(data);           // successful response
    })
    
  })
}

function scanTable(tableName) {
   return new Promise(function (resolve, reject) {
      var dynamodb = new AWS.DynamoDB()
      var params = {
        TableName: tableName,
        AttributesToGet: ["key", "name"]
      }

    dynamodb.scan(params, function(err, data) {
      if (err) {
        reject(err)
      } 
      else {
        resolve(data)
      }
    })
  })
}

function showReturnData(prefix, data) {
  console.log(prefix + " - Item: " + util.inspect(data.Item))
  console.log(prefix + " - Count: " + data.Count)
  console.log(prefix + " - ScannedCount: " + data.ScannedCount)
  console.log(prefix + " - LastEvaluatedKey: " + data.LastEvaluatedKey)
  console.log(prefix + " - ConsumedCapacity: " + data.ConsumedCapacity)
}