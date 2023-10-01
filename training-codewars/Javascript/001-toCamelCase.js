
function toCamelCase(str){
    let separator;
    str.includes('_') ? separator = '_' : separator = '-';
  
    let newStr = str.split(separator);

    for ( let i = 0; i < newStr.length; i++ ) {
        let firstLetter = newStr[i].substring(1,-1);
        firstLetter == firstLetter.toUpperCase() ? firstLetter : firstLetter.toLowerCase();
    }

    let camelCase = newStr.join('');
    return camelCase;
}



toCamelCase('the_Stealth_Warrior');