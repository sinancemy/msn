CREATE TABLE User (
  id INTEGER,
  username VARCHAR(32),
  full_name VARCHAR(64),
  email VARCHAR(32),
  bio VARCHAR(128),
  PRIMARY KEY(id)
);

CREATE TABLE Enjoyer (
  id INTEGER,
  FOREIGN KEY (id) REFERENCES User(id),
  PRIMARY KEY (id)
);

CREATE TABLE Artist (
  id INTEGER,
  verified BOOLEAN,
  FOREIGN KEY (id) REFERENCES User(id),
  PRIMARY KEY (id)
);

CREATE TABLE Content (
  id INTEGER,
  name VARCHAR(32),
  creation_date DATE,
  PRIMARY KEY (id)
);

CREATE TABLE Album (
  id INTEGER,
  cover_art BLOB,
  FOREIGN KEY (id) REFERENCES Content(id),
  PRIMARY KEY (id)
);

CREATE TABLE Playlist (
  id INTEGER,
  enjoyer_id INTEGER,
  description VARCHAR(128),
  cover_art BLOB,
  FOREIGN KEY (id) REFERENCES Content(id),
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  PRIMARY KEY (id)
);

CREATE TABLE Track (
  id INTEGER,
  album_id INTEGER,
  genre VARCHAR(32),
  length_seconds INTEGER,
  FOREIGN KEY (id) REFERENCES Content(id),
  FOREIGN KEY (album_id) REFERENCES Album(id),
  PRIMARY KEY (id, album_id)
);

CREATE TABLE PlaylistTracks (
  track_id INTEGER,
  playlist_id INTEGER,
  FOREIGN KEY (track_id) REFERENCES Track(id),
  FOREIGN KEY (playlist_id) REFERENCES Playlist(id),
  PRIMARY KEY (track_id, playlist_id)
);

CREATE TABLE PerformsIn (
  artist_id INTEGER,
  track_id INTEGER,
  plays VARCHAR(32),
  FOREIGN KEY (artist_id) REFERENCES Artist(id),
  FOREIGN KEY (track_id) REFERENCES Track(content_id),
  PRIMARY KEY (artist_id, track_id)
);

CREATE TABLE Friend (
  friend_id1 INTEGER,
  friend_id2 INTEGER,
  since DATE,
  FOREIGN KEY (friend_id1) REFERENCES User(id),
  FOREIGN KEY (friend_id2) REFERENCES User(id),
  PRIMARY KEY (friend_id1, friend_id2)
);

CREATE TABLE Reaction (
  user_id INTEGER,
  content_id INTEGER,
  txt VARCHAR(512),
  emoji VARCHAR(16),
  FOREIGN KEY (user_id) REFERENCES User(id),
  FOREIGN KEY (content_id) REFERENCES Content(id),
  PRIMARY KEY (content_id, user_id)
);

CREATE TABLE Follows (
  enjoyer_id INTEGER,
  artist_id INTEGER,
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  FOREIGN KEY (artist_id) REFERENCES Artist(id),
  PRIMARY KEY (enjoyer_id, artist_id)
);

CREATE TABLE Saved (
  enjoyer_id INTEGER,
  content_id INTEGER,
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  FOREIGN KEY (content_id) REFERENCES Content(id),
  PRIMARY KEY (enjoyer_id, content_id)
);

-- CREATE TABLE Message (
--   id INTEGER,
--   txt VARCHAR(512),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE MessageContent (
--   content_id INTEGER,
--   message_id INTEGER,
--   FOREIGN KEY (content_id) REFERENCES Content(id),
--   FOREIGN KEY (message_id) REFERENCES Message(id),
--   PRIMARY KEY (content_id, message_id)
-- );

-- CREATE TABLE Sends (...)
