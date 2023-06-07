import random
from datetime import datetime

from helper import generate_random_date, generate_random_image
from dictionary import *

output_dir = 'output.sql'

objects = dict()

def generate_data():
    N_ENJOYER = 1000
    N_ARTIST = 100
    N_ALBUM = 200
    N_TRACKS_ALBUM = (5, 15)
    N_PLAYLIST = 1000
    N_TRACKS_PLAYLIST = (0, 40)
    
    N_TRACK = None
    N_PERFORMS_IN = None
    N_FRIENDS_PER_USER = (0,20) # E1: [e1, e2, ...], E2: [e1, e2, ...] -> Map random friendships from E1 -> E2. Check all tuples for duplicates (e1, e2) = (e2, e1), one of them must GO. E=U
    N_REACTION_PER_USER  = (0,25)  
    N_FOLLOWS_PER_USER = (0,15)
    N_SAVED_PER_USER = (0,50)

    with open(output_dir, 'w') as file:
        file.write("set autocommit=0;")
        # SQL Insert Commands
        # Yaratılan şeyleri sonradan kullanmak için memoryde tut (artistleri tut ki albümlerde yazabilesin vs.)
        file.write("commit;")

def insert_query(table: str, *params):
    if not objects.get(table):
        objects[table] = list()
    object[table].append(params)
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

def gen_enjoyer(id):
    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)
    full_name = f"{first_name} {last_name}"
    username = first_name.lower() + last_name.lower()[0] + "{:04d}".format(random.randint(0, 9999))
    email = username + random.choice(EMAIL_SUFFIX)
    bio = f"I love {random.choice(GENRES)}"
    return [id, full_name, username, email, bio] # insert_query("Enjoyer", id, full_name, username, email, bio)

def gen_artist(id):
    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)
    full_name = f"{first_name} {last_name}"
    username = first_name.lower() + last_name.lower()[0] + "{:04d}".format(random.randint(0, 9999))
    email = username + random.choice(EMAIL_SUFFIX)
    bio = f"I play {random.choice(GENRES)}"
    verified = random.choice([True, False])
    return [id, full_name, username, email, bio, verified] # print(insert_query("Artist", ))

def gen_album(id):
    name = f"{random.choice(CONTENT_PREFIX)} {random.choice(CONTENT_ADJECTIVE)} {random.choice(CONTENT_NOUN)}"
    creation_date = generate_random_date()
    cover_art = generate_random_image()
    return [id, name, creation_date, cover_art]

def gen_playlist(id, enjoyer_id):
    name = f"{random.choice(CONTENT_PREFIX)} {random.choice(CONTENT_ADJECTIVE)} {random.choice(CONTENT_NOUN)}"
    creation_date = generate_random_date()
    description = f"{random.choice(PLAYLIST_DESC_SUFFIX)} {random.choice(PLAYLIST_DESC_PREFIX)}"
    cover_art = generate_random_image()
    return [id, enjoyer_id, name, creation_date, description, cover_art]

def gen_track(id, album_id):
    name = f"{random.choice(CONTENT_PREFIX)} {random.choice(CONTENT_ADJECTIVE)} {random.choice(CONTENT_NOUN)}"
    creation_date = generate_random_date()
    genre = random.choice(GENRES)
    length_seconds = random.randint(60,600)
    return [id, name, creation_date, album_id, genre, length_seconds]

def gen_playlist_tracks(track_id, playlist_id):
    return [track_id, playlist_id]

def gen_performs_in(artist_id, track_id):
    plays = random.choice(INSTRUMENTS)
    return [artist_id, track_id, plays]

def gen_friend(friend_id1, friend_id2):
    since = generate_random_date(datetime(2000, 1, 1))
    return [friend_id1, friend_id2, since]

def gen_reaction(user_id, content_id):
    txt = f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}"
    emoji = random.choice(EMOJIS)
    return [user_id, content_id, txt, emoji]

def gen_follows(enjoyer_id, artist_id):
    return [enjoyer_id, artist_id]

def gen_saved(enjoyer_id, artist_id):
    return [enjoyer_id, artist_id]

print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")
print(f"{random.choice(TXT_PREFIX)} {random.choice(TXT_MIDDLE)} {random.choice(TXT_SUFFIX)}")

# ADDED cover_art to Album, Playlist.
# REMOVED type from Album.