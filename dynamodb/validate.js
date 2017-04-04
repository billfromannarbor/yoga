//Copyright 2015 Karma Open Health LLC
"use strict"

const util = require("util")

const parameterTypes = getParameterTypes()

const validate = { parameterTypes:parameterTypes, 
  createFunctionValidator:createFunctionValidator,
  FunctionValidationError:FunctionValidationError,
  TypeValidationError:TypeValidationError
}

exports.validate = validate

function getParameterTypes() {
  return  {
    undefinedType:"undefined"
    ,nullType:"object"
    ,booleanType:"boolean"
    ,numberType:"number"
    ,stringType:"string"
    ,symbolType:"symbol"
    ,functionType: "function"
    ,objectType:"object"
    }
}

function FunctionValidator(functionInfo) {
  this.functionInfo = functionInfo
}


function createFunctionValidator(functionToValidate) {
  if ( typeof functionToValidate != parameterTypes.functionType ) {
    throw new TypeValidationError("createFunctionValidator failed because functionToValidate is not a function")
  }
  if ( !functionToValidate.functionValidator) {
    functionToValidate.functionValidator = new FunctionValidator(getFunctionInfo(functionToValidate))
  }
  
  return functionToValidate.functionValidator
}



FunctionValidator.prototype.validate = 
  function validate(args) {
    if (args.length != this.functionInfo.parameters.length) {
      throw new FunctionValidationError("Number of arguments(" +args.length
        + ") doesn't match number of parameters(" + this.functionInfo.parameters.length + ")", validate)
    }
    for ( var i = 0; i<args.length; i++) {
      if ( this.functionInfo.parameters[i] ) {
        if ( this.functionInfo.parameters[i].type ) {
          if ( typeof args[i] != this.functionInfo.parameters[i].type) {
            throw new FunctionValidationError("The argument: " + typeof this.parameters[i]
            + "should be of type: " + this.functionInfo.parameters[i].type + " instead it is of type: " + typeof args[i], validate)
          }
          else {
            console.log("typeof args[i]" + typeof args[i] + " this.functionInfo.parameters[i].type " + this.functionInfo.parameters[i].type)
          }
        }
      }
          
    }
  }

function TypeValidationError(message, caller) {
  this.constructor.prototype.__proto__ = TypeError.prototype
  this.name = this.constructor.name
  Error.captureStackTrace(this, caller)
  this.message = message
}

function FunctionValidationError(message, caller) {
  this.constructor.prototype.__proto__ = Error.prototype
  this.name = this.constructor.name
  Error.captureStackTrace(this, caller)
  this.message = message
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getFunctionInfo(func) {
  if ( !func)
    throw Error("Function must be defined")
  var functionString = func.toString().replace(STRIP_COMMENTS, '');
  var functionInfo = {}
  functionInfo.methodName = functionString.slice(9, functionString.indexOf("("))
  functionInfo.parameters = functionString.slice(functionString.indexOf('(')+1, functionString.indexOf(')')).match(ARGUMENT_NAMES);
  return functionInfo;
}