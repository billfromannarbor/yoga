//Copyright 2015 Karma Open Health LLC
"use strict"

const assert = require("assert")
const validate = require("../validate.js").validate
//var validate = new validateLib.Validate()

const allowableValuesHelper = {
  attributeType: { string:"String",number:"Number",binary:"Binary" }
  ,keyType: { hash:"HASH",range:"RANGE" }
}


describe("Validate Function", validateFunction)

function validateFunction() {
  it("Return TypeValidationError", function () { 
    try {
      var functionValidator = validate.createFunctionValidator(null)
      assert(false,"Should return TypeValidationError - too many arguments")
    }
    catch(e) {
      if (e.name !=validate.TypeValidationError.name) {
        assert(false, "Should return " + validate.TypeValidationError.name + ", but instead returns: " + e.name)
      }
    }
  })
  
  it("Return FunctionValidationError", function () { 
    try {
      testFunction("dog","cat","elephant", "kitten")
      assert(false,"Should return FunctionValidationError - too many arguments")
    }
    catch(e) {
      if ( e.name !=validate.FunctionValidationError.name) {
        console.log(e)
        console.log(e.stack)
        assert(false, "Should return Type  " + validate.FunctionValidationError.name + " but instead returns: " + e.name)
      }
    }
  })
  
  it("Return arguments are of the wrong type", function () { 
    try {
      testFunction("cat","elephant", "kitten")
    }
    catch(e) {
      console.log(e)
      if ( e.name !=validate.FunctionValidationError.name) {
        console.log(e)
        console.log(e.stack)
        assert(false, "Should return Type  " + validate.FunctionValidationError.name + " but instead returns: " + e.name)
        
      }
    }
    assert(false,"Should throw a FunctionValidationError - arguments are of the wrong type")

  })
}


function testFunction(name, registered, size) {
  console.log("allowableValuesHelper: " + allowableValuesHelper)
  var functionValidator = validate.createFunctionValidator(testFunction)
  functionValidator.name = {type:validate.parameterTypes.stringType, allowableValues:allowableValuesHelper.keyType}
  functionValidator.registered = {type:validate.parameterTypes.booleanType}
  functionValidator.size = {type:validate.parameterTypes.numberType}
  functionValidator.validate(arguments)
}

