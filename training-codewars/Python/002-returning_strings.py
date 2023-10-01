"""
Make a function that will return a greeting statement that uses an input; your program should return, "Hello, <name> how are you doing today?".
[Make sure you type the exact thing I wrote or the program may not execute properly]
"""

print('Introduce tu nombre')
name = input()

def greet(name):
    return f"Hello, {name} how are you doing today?"

print(greet(name))