"""
Given an array of ones and zeros, convert the equivalent binary value to an integer.

Eg: [0, 0, 0, 1] is treated as 0001 which is the binary representation of 1.

Examples:

Testing: [0, 0, 0, 1] ==> 1
Testing: [0, 0, 1, 0] ==> 2
Testing: [0, 1, 0, 1] ==> 5
Testing: [1, 0, 0, 1] ==> 9
Testing: [0, 0, 1, 0] ==> 2
Testing: [0, 1, 1, 0] ==> 6
Testing: [1, 1, 1, 1] ==> 15
Testing: [1, 0, 1, 1] ==> 11
Testing: [1, 0, 1, 1] ==> 11
Testing: [1,  1, 0, 1, 1] ==> 27
Testing: [16, 8, 4, 2, 1] ==> 27
However, the arrays can have varying lengths, not just limited to 4.
"""

def binary_array_to_number(arr):
    arr.reverse()
    arr_index = []
    my_num = 0
    
    for index, item in enumerate( arr ):
        if index < 1:
            arr_index.append(1)
        elif index >= 1:
            arr_index.append( arr_index[ index - 1] * 2 )
            
    for i, n in enumerate(arr_index):
        if arr[i] == 1:
            my_num += arr_index[i]
    
    return my_num
  
print(binary_array_to_number([0,0,0,1])) # 1
print(binary_array_to_number([0,0,1,0])) # 2
print(binary_array_to_number([1,1,1,1])) # 15
print(binary_array_to_number([0,1,1,0])) # 6