
function twoSum( numbers, target ) {

    let count = 0;
  
    for( let i = 0; i < numbers.length - 1 ; i++ ){

        count = numbers[i]  + numbers[i + 1];

        console.log( count );

        if (count == target) {
            return [ numbers[i].indexOf(), numbers[i + 1].indexOf() ];
        }
    }
}


console.log( twoSum([1, 2, 3], 4) );