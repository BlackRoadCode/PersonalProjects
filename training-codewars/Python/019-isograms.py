"""
An isogram is a word that has no repeating letters, consecutive or non-consecutive. Implement a function that determines whether a string that contains only letters is an isogram. Assume the empty string is an isogram. Ignore letter case.

Example: (Input --> Output)

"Dermatoglyphics" --> true "aba" --> false "moOse" --> false (ignore letter case)

isIsogram "Dermatoglyphics" = true
isIsogram "moose" = false
isIsogram "aba" = false
"""

def is_isogram(string):
    my_str = string.lower()
    arr_str = []
    
    for i in range( len(my_str) ):
        arr_str.append( my_str[i] )
    
    arr_str.sort()
    
    for n in range( len( arr_str ) - 1 ):
        if( arr_str[n] == arr_str[n + 1] ):
            return False
    
    return True

print( is_isogram('Dermatoglyphics') )
print( is_isogram('moose') )
print( is_isogram('aba') )

"""
def is_isogram(string):
    string = string.lower()
    for letter in string:
        if string.count(letter) > 1: return False
    return True
"""