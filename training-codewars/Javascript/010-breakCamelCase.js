function breakCamelCase(string) {
    const regex = /[A-Z]/g;
    const matches = Array.from( string.matchAll(regex) );
    const indices = matches.map( match => match.index );
    const space = ' ';
    const newStr = string.substring(0, indices) + space + string.substring(indices);

    console.log(newStr);

}


console.log(breakCamelCase('camelCase')); // camel Case
console.log(breakCamelCase('')); // ''
console.log(breakCamelCase('stringSeparateForCase')); // string Separate For Case