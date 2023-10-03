"""
Oh no! Ghosts have reportedly swarmed the city. It's your job to get rid of them and save the day!

In this kata, strings represent buildings while whitespaces within those strings represent ghosts.

So what are you waiting for? Return the building(string) without any ghosts(whitespaces)!

Example:

ghostBusters("Sky scra per");
Should return:

"Skyscraper"

If the building contains no ghosts, return the string:

"You just wanted my autograph didn't you?"
"""

def ghostbusters(building):
    arr_w_ghosts = building.split(' ')
    
    if len(arr_w_ghosts) > 1:
        return ''.join(arr_w_ghosts)
    else:
        return "You just wanted my autograph didn't you?"


print(ghostbusters("Sky scra per"))
print(ghostbusters("Skyscraper"))

"""
message = "You just wanted my autograph didn't you?"

def ghostbusters(building):
    return building.replace(' ', '') if ' ' in building else message
-------------------------------------------------------------------------------
def ghostbusters(building):
        return building.replace(' ', '') if ' ' in building else "You just wanted my autograph didn't you?"
"""