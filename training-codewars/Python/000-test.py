def better_than_average(class_points, your_points):
    return ( False if sum( class_points ) / len( class_points ) > your_points else True )

print(better_than_average([2, 3], 5)) # True
print(better_than_average([100, 40, 34, 57, 29, 72, 57, 88], 75)) # True
print(better_than_average([12, 23, 34, 45, 56, 67, 78, 89, 90], 69)) # True
print(better_than_average([41, 75, 72, 56, 80, 82, 81, 33], 50)) # False
print(better_than_average([29, 55, 74, 60, 11, 90, 67, 28], 21)) # False