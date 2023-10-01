// Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements 
// with the same value next to each other and preserving the original order of elements.

var uniqueInOrder = function(iterable){
    let arrOrder = [];
    for( let i = 0 ; i < iterable.length ; i++ ){
        ( iterable[i] != iterable[ i + 1 ] ) ?  arrOrder.push( iterable[i] ) : null;
    }
    return arrOrder;
}

console.log( uniqueInOrder([1,2,2,3,3]) );
console.log( uniqueInOrder('AAAABBBCCDAABBB') );
console.log( uniqueInOrder('ABBCcAD') );

// uniqueInOrder([1,2,2,3,3]);       // [1,2,3]
// uniqueInOrder('AAAABBBCCDAABBB'); // ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD');         // ['A', 'B', 'C', 'c', 'A', 'D']