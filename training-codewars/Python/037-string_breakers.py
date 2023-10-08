"""
I will give you an integer (N) and a string. Break the string up into as many substrings of N as you can without spaces. If there are leftover characters, include those as well.

Example: 

n = 5;

st = "This is an example string";

Return value:
Thisi
sanex
ample
strin
g

Return value as a string: 'Thisi'+'\n'+'sanex'+'\n'+'ample'+'\n'+'strin'+'\n'+'g'
"""

def string_breakers(n, st): 
    my_str = ''.join( st.split() )
    my_arr = []
    for i, wrd in enumerate( my_str ):
        if n == 1: 
            my_arr.append(wrd + '\n')
        elif i > 1 and i % n == 0:
            my_arr.append('\n' + wrd)
        else:
            my_arr.append( wrd )
            
    return ''.join( my_arr ).lstrip()

# print( string_breakers(5, 'This is an example string') )
# print( string_breakers(1, ' r y9 5sydmylwf a bo') )
print( string_breakers(1, 'vs c  q2odone2m8 pu405ngk2') )

