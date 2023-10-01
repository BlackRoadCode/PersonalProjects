"""
Given an array of integers.

Return an array, where the first element is the count of positives numbers and the second element is sum of negative numbers. 0 is neither positive nor negative.

If the input is an empty array or is null, return an empty array.

Example
For input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15], you should return [10, -65].
"""

my_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

def count_positives_sum_negatives(arr):
    pos = 0
    neg = 0
    res = []
    if (len(arr) < 1):
        return []
    for item in arr:
        if ( item > 0 ):
            pos += 1
        elif ( item < 0 ):
            neg += item
        else:
            continue
    res.append(pos)
    res.append(neg)
    return res

print(count_positives_sum_negatives(my_arr))


"""
def count_positives_sum_negatives(arr):
    pos = sum(1 for x in arr if x > 0)
    neg = sum(x for x in arr if x < 0)
    return [pos, neg] if len(arr) else []
"""