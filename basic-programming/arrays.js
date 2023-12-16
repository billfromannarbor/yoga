//Exercise the most commonly used methods in a javascript array


//If we have a binary Tree realized as an array, then create a function that reports which side is heavier.
function whichSideIsHeaver(binaryTree) {
    if (binaryTree.length<=1){
        return "";
    }
    let rootnode = binaryTree.length/2;    
    let leftside = binaryTree.slice(0, rootnode-1).reduce((acc,val)=>acc+val);
    let rightside = binaryTree.slice(rootnode+1).reduce((acc,val)=>acc+val);

    if (leftside>rightside) {
        return "left";
    }
    else if (rightside>leftside) {
        return "right";
    }
    else {
        return "";
    }
}

console.log(whichSideIsHeaver([25,17,9,18,-1,12,22]));
console.log(whichSideIsHeaver([35,29,9,18,30,12,22]));
console.log(whichSideIsHeaver([25,17,19,18,15,12,22]));





//More Common

//slice - make 