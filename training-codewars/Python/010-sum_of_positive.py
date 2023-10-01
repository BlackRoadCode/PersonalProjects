"""
You get an array of numbers, return the sum of all of the positives ones.

Example [1,-4,7,12] => 1 + 7 + 12 = 20

Note: if there is nothing to sum, the sum is default to 0.
"""

my_arr = [1,-4,7,12]
my_arr_b = [-1,-4,-7,-12]


def positive_sum(arr):
    res = 0
    for n in arr:
        if( n > 0 ):
            res += n
    return res

print(positive_sum(my_arr))

"""
def positive_sum(arr):
    return sum(x for x in arr if x > 0)
"""