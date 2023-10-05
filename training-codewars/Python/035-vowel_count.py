"""
Return the number (count) of vowels in the given string.

We will consider a, e, i, o, u as vowels for this Kata (but not y).

The input string will only consist of lower case letters and/or spaces.
"""

def get_count(sentence):
    arr_vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' ]
    vowel_count = 0 
    
    for i in sentence:
        if i in arr_vowels:
            vowel_count += 1
    
    return vowel_count


print( get_count('This website is for losers LOL!') )
print( get_count('What are you, a communist?') ) # Wht r y,  cmmnst?
print( get_count('abcde') )

"""
def getCount(s):
    return sum(c in 'aeiou' for c in s)
"""