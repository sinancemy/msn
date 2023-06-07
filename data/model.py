
class User:
    def __init__(self, id, username, full_name, email, bio):
        self.id = id
        self.username = username
        self.full_name = full_name
        self.email = email
        self.bio = bio


class Enjoyer(User):
    def __init__(self, id):
        super().__init__(id, None, None, None, None)


class Artist(User):
    def __init__(self, id, verified):
        super().__init__(id, None, None, None, None)
        self.verified = verified


class Content:
    def __init__(self, id, name, creation_date):
        self.id = id
        self.name = name
        self.creation_date = creation_date


class Album(Content):
    def __init__(self, id, cover_art):
        super().__init__(id, None, None)
        self.cover_art = cover_art


class Playlist(Content):
    def __init__(self, id, description, cover_art, enjoyer_id):
        super().__init__(id, None, None)
        self.description = description
        self.cover_art = cover_art
        self.enjoyer_id = enjoyer_id


class Track:
    def __init__(self, content_id, album_id, genre, length_seconds):
        self.content_id = content_id
        self.album_id = album_id
        self.genre = genre
        self.length_seconds = length_seconds


class PlaylistTracks:
    def __init__(self, track_id, playlist_id, description):
        self.track_id = track_id
        self.playlist_id = playlist_id
        self.description = description


class Friend:
    def __init__(self, since, friend_id1, friend_id2):
        self.since = since
        self.friend_id1 = friend_id1
        self.friend_id2 = friend_id2


class Message:
    def __init__(self, id, txt):
        self.id = id
        self.txt = txt


class MessageContent:
    def __init__(self, content_id, message_id):
        self.content_id = content_id
        self.message_id = message_id


class Reaction:
    def __init__(self, content_id, user_id, txt, emoji):
        self.content_id = content_id
        self.user_id = user_id
        self.txt = txt
        self.emoji = emoji


class Follows:
    def __init__(self, artist_id, enjoyer_id):
        self.artist_id = artist_id
        self.enjoyer_id = enjoyer_id


class PerformsIn:
    def __init__(self, artist_id, track_id, plays):
        self.artist_id = artist_id
        self.track_id = track_id
        self.plays = plays


class Saved:
    def __init__(self, content_id, enjoyer_id):
        self.content_id = content_id
        self.enjoyer_id = enjoyer_id