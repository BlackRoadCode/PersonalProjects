
// Write an algorithm that takes an array and moves all of the zeros to the end, 
// preserving the order of the other elements.

let moveZeros = ( arr ) => {
    let arrZeros = [];
    let arrItems = [];

    arr.forEach( item => {
        if ( item === 0 ){
            arrZeros.push( item );
        } else {
            arrItems.push( item );
        }
    });

    return arrItems.push( ...arrZeros );
}

// Optimización de ChatGPT
// let moveZeros = (arr) => {
//     let zerosCount = 0;

//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] === 0) {
//             zerosCount++;
//         } else if (zerosCount > 0) {
//             arr[i - zerosCount] = arr[i];
//             arr[i] = 0;
//         }
//     }

//     return arr;
// }

// moveZeros([false,1,0,1,2,0,1,3,"a"]); // returns[false,1,1,2,1,3,"a",0,0]
console.log( moveZeros([false,1,0,1,2,0,1,3,"a"]) );
