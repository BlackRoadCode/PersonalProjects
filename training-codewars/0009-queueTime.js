
function queueTime(customers, n) {

    let time = 0;
    let hold = 0;

    if( n < 2 ){
        for (let i = 0; i < customers.length; i++) {
            time += customers[i];
        }
        
        return time;
    }

    for (let j = 0; j < customers.length; j++) {
        
        // if( customers[j]  )
        
    }

    // for (let j = 1; j < customers.length; j++) {
    //     hold = customers[0];
    //     time += customers[j];
    // }

    // let diff = time % hold;

    // return (hold >= time) ? hold : time - diff;

}



// // console.log(queueTime([], 1)); // should return 12

// console.log(queueTime([5,3,4], 1)); // should return 12

// console.log(queueTime([10,2,3,3], 2)); // should return 10
// // because here n=2 and the 2nd, 3rd, and 4th people in the 
// // queue finish before the 1st person has finished.

// console.log(queueTime([2,3,10], 2)); // should return 12

console.log(queueTime([], 1)); //  0);
console.log(queueTime([1,2,3,4], 1)); //  10);
console.log(queueTime([2,2,3,3,4,4], 2)); //  9);
console.log(queueTime([1,2,3,4,5], 100)); //  5);