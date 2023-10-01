"""
Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.
"""

def even_or_odd(number):
    return ('Even' if number % 2 == 0 else 'Odd' )
    
print(even_or_odd(10))
print(even_or_odd(11))
print(even_or_odd(4))
print(even_or_odd(3))

"""
Other way to make the return:

def even_or_odd(number):
    return ('Even' if number % 2 == 0 else 'Odd' )
"""