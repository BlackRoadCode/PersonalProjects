"""
One suggestion to build a satisfactory password is to start with a memorable phrase or sentence and make a password by extracting the first letter of each word.

Even better is to replace some of those letters with numbers (e.g., the letter O can be replaced with the number 0):

instead of including i or I put the number 1 in the password;
instead of including o or O put the number 0 in the password;
instead of including s or S put the number 5 in the password.

Examples:
"Give me liberty or give me death"  --> "Gml0gmd"
"Keep Calm and Carry On"            --> "KCaC0"
"""

my_phrase_a = 'Give me liberty or give me death'
my_phrase_b = 'Keep Calm and Carry On'

def make_password(phrase):
    replace_dict = { 'i':'1', 'I':'1', 'o':'0', 'O':'0', 's':'5', 'S':'5' }
    pass_arr = []
    arr_phr = phrase.split()
    
    for word in arr_phr:
        if ( word[0] in replace_dict.keys() ):
            pass_arr.append( replace_dict[word[0]] )
        else:
            pass_arr.append( word[0] )
        
    return ''.join( pass_arr )

print( make_password(my_phrase_a) )
print( make_password(my_phrase_b) )

"""
TABLE = str.maketrans('iIoOsS','110055')

def make_password(s):
    return ''.join(w[0] for w in s.split()).translate(TABLE)
    
-------------------------------------------------------------
SWAP = {'i': '1', 'I': '1', 'o': '0', 'O': '0', 's': '5', 'S': '5'}

def make_password(phrase):
    return ''.join(SWAP.get(a[0], a[0]) for a in phrase.split())
"""