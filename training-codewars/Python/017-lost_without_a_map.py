"""
Given an array of integers, return a new array with each value doubled.

For example:

[1, 2, 3] --> [2, 4, 6]
"""

def maps(a):
    for i in range( len( a ) ):
        a[i] = a[i] * 2
    return a

print( maps([1, 2, 3]) )

"""
def maps(a):
    return [2 * x for x in a]

----------------------------------------

def maps(a):
    return [n * 2 for n in a]
"""