"""
Convert number to reversed array of digits
Given a random non-negative number, you have to return the digits of this number within an array in reverse order.

Example(Input => Output):
35231 => [1,3,2,5,3]
0 => [0]
"""

def digitize(n):
    my_arr = list( str( n ) )[0:]
    my_arr.reverse()
    
    int_arr = []
    
    for i in my_arr:
        int_arr.append(int(i))
    
    return int_arr
        

print( digitize(12345) )

"""
def digitize(n):
    return [int(x) for x in str(n)[::-1]]
"""