"""
Write a function to convert a name into initials. This kata strictly takes two words with one space in between them.

The output should be two capital letters with a dot separating them.

It should look like this:

Sam Harris => S.H

patrick feeney => P.F
"""

def abbrev_name(name):
    initials = ''
    arr_name = name.split(' ')
    
    for i in range( len( arr_name ) ):
        initials += arr_name[i][0].upper() + '.'
    return initials[:-1]

print( abbrev_name('Sam Harris') )
print( abbrev_name('patrick feeney') )

"""
def abbrevName(name):
    first, last = name.upper().split(' ')
    return first[0] + '.' + last[0]
---------------------------------------------------------------
def abbrevName(name):
    return '.'.join(w[0] for w in name.split()).upper()
---------------------------------------------------------------
def abbrevName(name):
    names = name.split()
    return f"{names[0][0]}.{names[1][0]}".upper()
"""