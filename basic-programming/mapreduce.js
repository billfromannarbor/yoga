let studentNames = ["Daniel", "Jane", ,"Joe"];

let names = [...studentNames]; //Makes a copy and removes empty elements

console.log(names); // ["Daniel","Jane","Joe"]

let pets = ["dog","cat", "hamster", "goldfish", "parrot"];

function wearAleash(pet) {
    switch ( pet )
    {
        case "dog":
        case "cat":
            return pet + " Wears a Leash";
            break;

         default:
            return pet + " Doesn't wear a Leash";
            
    }
}

console.log("Which ones wear a leash: " + pets.map(wearAleash));


function leashWearers(leashwearerarray, pet) {

    switch ( pet )
    {
        case "dog":
        case "cat":
            return leashwearerarray + " " + pet + " Wears a Leash";
            break;

         default:
            return leashwearerarray;
            
    }
}


//The second value passed to reduce is an initializer for the accumulator.  
//If it isn't provided, then the first value of the array is used to inialize the accumulator and the iterator starts at 1
console.log("Lease Wearers: " + pets.reduce(leashWearers));
//Returns: Lease Wearers: dog cat Wears a Leash
console.log("Lease Wearers: " + pets.reduce(leashWearers,"Accumulator: "));
//Returns: Lease Wearers: Accumulator:  dog Wears a Leash cat Wears a Leash


