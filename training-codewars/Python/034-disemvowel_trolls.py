"""
Trolls are attacking your comment section!

A common way to deal with this situation is to remove all of the vowels from the trolls' comments, neutralizing the threat.

Your task is to write a function that takes a string and return a new string with all vowels removed.

For example, the string "This website is for losers LOL!" would become "Ths wbst s fr lsrs LL!".

Note: for this kata y isn't considered a vowel.
"""

def disemvowel(string_):
    arr_vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' ]
    my_str = []
    
    for i in string_:
        if i not in arr_vowels:
            my_str.append(i)
    
    return ''.join(my_str)


print( disemvowel('This website is for losers LOL!') )
print( disemvowel('What are you, a communist?') ) # Wht r y,  cmmnst?
print( disemvowel('abcde') )

"""
def disemvowel(string):
    return "".join(c for c in string if c.lower() not in "aeiou")
"""