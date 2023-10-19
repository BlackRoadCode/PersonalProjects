"""
Sort the Vowels!
In this kata, we want to sort the vowels in a special format.

Task
Write a function which takes a input string s and return a string in the following way:

   
                  C|                          R|
                  |O                          n|
                  D|                          d|
   "CODEWARS" =>  |E       "Rnd Te5T"  =>      |
                  W|                          T|
                  |A                          |e
                  R|                          5|
                  S|                          T|

Notes:

List all the Vowels on the right side of |
List every character except Vowels on the left side of |
for the purpose of this kata, the vowels are : a e i o u
Return every character in its original case
Each line is seperated with \n
Invalid input ( undefined / null / integer ) should return an empty string
"""

def sort_vowels(s):
    vowels = {'a', 'e', 'i', 'o', 'u'}
    result = ''
    
    if str(s).isdecimal() or str(s).isspace() or s == None:
        return ''
    for i in range( len( s ) ):
        if s[i].lower() in vowels:
            result += '|' + s[i] + '\n'
        else:
            result += s[i] + '|' + '\n'
    
    return result.rstrip()

print( sort_vowels('Rnd Te5T') )
print( sort_vowels(1337) )


"""
def sort_vowels(s):
    try:
        return '\n'.join('|' + i  if i.lower() in 'aioue' else i + '|' for i in s)
    except:
        return ''
"""
