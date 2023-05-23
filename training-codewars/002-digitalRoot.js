function digitalRoot(n) {
    let arr = n.toString();
    let arrS = arr.split('');
    let counter = 0;

    for (let i = 0; i < arrS.length; i++) {
        counter += parseInt(arrS[i]);    
    }
    
    return ( counter > 9 ) ? digitalRoot( counter ) : counter;
}



console.log(digitalRoot(12345));