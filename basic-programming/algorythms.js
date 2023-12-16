pets = ["Cat", "Dog", "Parrot", "Hamster"]
listOfNumbers = [17,10,13,78,33,21];

//Quicksort
function quickSort(arrayToSort) {
    if (arrayToSort.length<=1) {
        return arrayToSort;
    }
    
    let leftarray=[]
    let rightarray=[]
    let pivot = arrayToSort[0];
    for (let index=1 ; index<arrayToSort.length; index++) {
        if ( arrayToSort[index] < pivot ) {
            leftarray.push(arrayToSort[index]);
        }
        else {
            rightarray.push(arrayToSort[index]);
        }
    }

    //Use the spread operator to clean up empty elements in the arrays
    return [...quickSort(leftarray), pivot, ...quickSort(rightarray)];
}

console.log("Sorted numbers: " + quickSort(listOfNumbers));

//Binary Search
function searchForNumberInAnArray(number, array) {
    var sortedArray = quickSort(array);
    var index = Math.round(sortedArray.length/2);

    if ( number < sortedArray[index]) {
        while (index>=0)
        {
            if ( number == sortedArray[index])
            {
                return index;
            }
            index--;
        }
        return -1;
    }
    else if (number > sortedArray[index]) {
        while (index<sortedArray.length)
        {
            if ( number == sortedArray[index])
                return index;
        }
        return -1;
        index++;
    }
    else {
        return index;
    }
}

console.log("After sorting, we found the value at this index " + searchForNumberInAnArray(12, [5,13,45,6,3,9,12]));