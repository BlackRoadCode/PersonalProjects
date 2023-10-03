"""
Write a function which calculates the average of the numbers in a given list.

Note: Empty arrays should return 0.
"""

def find_average(numbers):
    return 0 if len(numbers) < 1 else sum( numbers ) / len(numbers)


print( find_average([1,2,3]) )
print( find_average([]) )
print( find_average([1,2]) )

"""
def find_average(array):
    return sum(array) / len(array) if array else 0
"""