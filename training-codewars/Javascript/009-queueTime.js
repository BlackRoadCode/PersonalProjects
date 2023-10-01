
function queueTime(customers, n) {
    const tills = Array(n).fill(0); 
    for (let i = 0; i < customers.length; i++) {
        const minTillIdx = tills.indexOf(Math.min(...tills)); 
        tills[minTillIdx] += customers[i]; 
    }

    return Math.max(...tills);
}

console.log(queueTime([5,3,4], 1)); // should return 12
console.log(queueTime([10,2,3,3], 2)); // should return 10
console.log(queueTime([2,3,10], 2)); // should return 12
console.log(queueTime([], 1)); //  0
console.log(queueTime([1,2,3,4], 1)); //  10
console.log(queueTime([2,2,3,3,4,4], 2)); //  9
console.log(queueTime([1,2,3,4,5], 100)); //  5