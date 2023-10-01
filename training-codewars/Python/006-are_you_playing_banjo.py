"""
Create a function which answers the question "Are you playing banjo?".
If your name starts with the letter "R" or lower case "r", you are playing banjo!

The function takes a name as its only argument, and returns one of the following strings:

name + " plays banjo" 
name + " does not play banjo"
Names given are always valid strings.
"""

my_name = input('Introduce tu nombre: ')

def are_you_playing_banjo(name):
    if (name.lower().startswith('r')):
        return f'{ name } plays banjo'
    else:
        return f'{ name } does not play banjo'

print(are_you_playing_banjo(my_name))

"""
Nice solution, not mine:

def areYouPlayingBanjo(name):
    return name + (' plays' if name[0].lower() == 'r' else ' does not play') + " banjo";
"""