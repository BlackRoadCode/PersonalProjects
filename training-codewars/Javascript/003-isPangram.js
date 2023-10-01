
function isPangram( phrase ){
    let abc = 'abcdefghijklmnopqrstuvwxyz';
    let arrS = phrase.replace(/[\s.,0-9]/g,'').toLowerCase().split('').sort();
    
    let arrSD = arrS.filter( (char, i) => {
        return arrS.indexOf(char) === i;
    });

    return (abc == arrSD.join(''));
}


console.log( isPangram('The quick brown fox jumps over the lazy dog.') );
console.log( isPangram('This is not a pangram') );