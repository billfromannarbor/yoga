//Strict Equality
let threeString = "3";
let threeNumber= 3;

if ( threeNumber == threeString ) {
    console.log("They Are equal.");
}

if ( threeNumber == threeString ) {
    console.log("But They Aren't strictly equal.");
}

let falseString = false.toString;
let falseBoolean = false;
console.log("falsestring: " + falseBoolean.toString());

if ( falseString == falseBoolean ) {
    console.log("They Are equal.");
}

if ( falseString == falseBoolean ) {
    console.log("But They Aren't strictly equal.");
}

let myArray = [1, 'Bob', false];

console.log("Hoisted Variable: " + hoistedVariable); //var definitions are hoisted
//console.log("notHoisted Variable: " + notHoistedVariable); //let definitions aren't

var hoistedVariable = "Hoist Me";
console.log("Hoisted Variable: " + hoistedVariable);

//let notHoistedVariable = "No"

const constantstring="Constant String";
//constantstring += " Can't get longer"
console.log("Constant String: " + constantstring);