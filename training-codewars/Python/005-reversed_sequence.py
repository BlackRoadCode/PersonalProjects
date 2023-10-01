"""
Build a function that returns an array of integers from n to 1 where n>0.

Example : n=5 --> [5,4,3,2,1]
"""

def reverse_seq(n):
    my_list = []
    for i in range(n):
        my_list.append( n )
        n -= 1
    return my_list

print( reverse_seq(8) )

"""
Nice solution, not mine:

def reverse_seq(n):
    return list(range(n, 0, -1))
"""