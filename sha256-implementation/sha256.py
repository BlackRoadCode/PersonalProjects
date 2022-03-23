import hashlib

def run():
    hash = hashlib.sha256("ingresa").hexdigest()
    print(hash)



if __name__ == "__main__":
    run()