"""
Write a function that takes an array of words and smashes them together into a sentence and returns the sentence. You can ignore any need to sanitize words or add punctuation, but you should add spaces between each word. Be careful, there shouldn't be a space at the beginning or the end of the sentence!
"""

words = ['hola','mundo','obteniendo', 'resultados','en', 'python']

def smash(words):
    phrase = ' '.join(words)
    return phrase

print( smash(words) )