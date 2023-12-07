var testArray=[1,2];
console.log("Test Array Values: " + testArray);


//Return from map is a new array, it doens't mutate the current array
console.log("Test Array after Transform: " + testArray.map(transformArrayValues));

console.log("Test Array after using ArrowFunction for Transform: " + testArray.map(x=>x+20));

function transformArrayValues(value){
    return value+10;
}
