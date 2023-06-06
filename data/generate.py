import random
from dictionary import FIRST_NAMES, LAST_NAMES, GENRES, EMAIL_SUFFIX

output_dir = 'output.sql'

def generate_data(n_user, n_track, n_album, n_playlist):
    with open(output_dir, 'w') as file:
        file.write("set autocommit=0;")
        # SQL Insert Commands
        # Yaratılan şeyleri sonradan kullanmak için memoryde tut (artistleri tut ki albümlerde yazabilesin vs.)
        file.write("commit;")

def insert_query(table: str, *params):
    params_str = ""
    for p in params:
        if isinstance(p, int):
            params_str += str(p)
        elif isinstance(p, str):
            params_str += f"'{str(p)}'"
        elif isinstance(p, bool):
            params_str += str(p)
        params_str += ","
    return f"INSERT INTO `{table}` VALUES ({params_str[:-1]});"

# Enjoyer example
first_name = random.choice(FIRST_NAMES)
last_name = random.choice(LAST_NAMES)
id = 0
full_name = f"{first_name} {last_name}"
username = first_name.lower() + last_name.lower()[0] + "{:04d}".format(random.randint(0, 9999))
email = username + random.choice(EMAIL_SUFFIX)
bio = f"I love {random.choice(GENRES)}"
print(insert_query("Enjoyer", id, full_name, username, email, bio))

# Artist example
first_name = random.choice(FIRST_NAMES)
last_name = random.choice(LAST_NAMES)
id = 0
full_name = f"{first_name} {last_name}"
username = first_name.lower() + last_name.lower()[0] + "{:04d}".format(random.randint(0, 9999))
email = username + random.choice(EMAIL_SUFFIX)
bio = f"I play {random.choice(GENRES)}"
verified = random.choice([True, False])
print(insert_query("Artist", id, full_name, username, email, bio, verified))
