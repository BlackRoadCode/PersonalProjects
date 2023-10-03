"""
When given a string of space separated words, return the word with the longest length. If there are multiple words with the longest length, return the last instance of the word with the longest length.

Example:

'red white blue' //returns string value of white

'red blue gold' //returns gold
"""

def longest_word(string_of_words):
    my_arr = string_of_words.split()
    max_len = 0
    word = ''
    
    for index, item in enumerate( my_arr ):
        
        if len(item) >= max_len:
            max_len = len(item)
            word = item
        
    return word

print( longest_word('red white blue') )
print( longest_word('red blue gold') )

"""
def longest_word(string_of_words):
    return max(reversed(string_of_words.split()), key=len)
-----------------------------------------------------------------------
def longest_word(string_of_words):
    arr = string_of_words.split()
    arr.sort(key=len)
    return arr[-1]
"""