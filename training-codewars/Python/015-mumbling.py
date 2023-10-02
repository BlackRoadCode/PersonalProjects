"""
This time no story, no theory. The examples below show you how to write function accum:

Examples:
accum("abcd") -> "A-Bb-Ccc-Dddd"
accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt") -> "C-Ww-Aaa-Tttt"
The parameter of accum is a string which includes only letters from a..z and A..Z.
"""

def accum(s):
    my_arr = []
    
    for i in range( len(s) ):
        my_arr.append( s[i].lower() )
        
        for n in range( i ):
            my_arr[i] += s[i].lower()
    
    for word in range( len(my_arr) ):
        my_arr[word] = my_arr[word].capitalize()
    
    return '-'.join(my_arr)

print( accum("abcd") )
print( accum("RqaEzty") )
print( accum("cwAt") )

"""
def accum(s):
    return '-'.join(c.upper() + c.lower() * i for i, c in enumerate(s))
"""