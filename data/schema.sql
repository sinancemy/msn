CREATE DATABASE msn;
USE msn;

CREATE TABLE User (
  id INTEGER,
  username VARCHAR(32) UNIQUE,
  password CHAR(64),
  full_name VARCHAR(64),
  avatar BLOB,
  email VARCHAR(64),
  bio VARCHAR(128),
  PRIMARY KEY(id)
);

CREATE TABLE Enjoyer (
  id INTEGER,
  enjoyment FLOAT,
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE Artist (
  id INTEGER,
  verified BOOLEAN,
  FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE Content (
  id INTEGER,
  name VARCHAR(64),
  creation_date DATE,
  PRIMARY KEY (id)
);

CREATE TABLE Album (
  id INTEGER,
  cover_art BLOB,
  FOREIGN KEY (id) REFERENCES Content(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE Playlist (
  id INTEGER,
  enjoyer_id INTEGER,
  description VARCHAR(128),
  cover_art BLOB,
  FOREIGN KEY (id) REFERENCES Content(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE Track (
  id INTEGER,
  album_id INTEGER,
  genre VARCHAR(32),
  length_seconds INTEGER,
  FOREIGN KEY (id) REFERENCES Content(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (album_id) REFERENCES Album(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id, album_id)
);

CREATE TABLE PlaylistTracks (
  playlist_id INTEGER,
  track_id INTEGER,
  FOREIGN KEY (playlist_id) REFERENCES Playlist(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (track_id) REFERENCES Track(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (playlist_id, track_id)
);

CREATE TABLE PerformsIn (
  artist_id INTEGER,
  track_id INTEGER,
  plays VARCHAR(32),
  FOREIGN KEY (artist_id) REFERENCES Artist(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (track_id) REFERENCES Track(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (artist_id, track_id)
);

CREATE TABLE Friend (
  friend_id1 INTEGER,
  friend_id2 INTEGER,
  since DATE,
  FOREIGN KEY (friend_id1) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (friend_id2) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (friend_id1, friend_id2)
);

CREATE TABLE Reaction (
  user_id INTEGER,
  content_id INTEGER,
  txt VARCHAR(512),
  emoji BLOB,
  FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (content_id) REFERENCES Content(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (content_id, user_id, txt, emoji)
);

CREATE TABLE Follows (
  enjoyer_id INTEGER,
  artist_id INTEGER,
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (artist_id) REFERENCES Artist(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (enjoyer_id, artist_id)
);

CREATE TABLE Saved (
  enjoyer_id INTEGER,
  content_id INTEGER,
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (content_id) REFERENCES Content(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (enjoyer_id, content_id)
);