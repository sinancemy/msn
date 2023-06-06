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
  creation_date DATE,
  name VARCHAR(32),
  PRIMARY KEY (id)
);

CREATE TABLE Album (
  id INTEGER,
  album_type VARCHAR(32),
  FOREIGN KEY (id) REFERENCES Content(id),
  PRIMARY KEY (id)
);

CREATE TABLE Playlist (
  id INTEGER,
  description VARCHAR(128),
  FOREIGN KEY (id) REFERENCES Content(id),
  PRIMARY KEY (id)
);

CREATE TABLE Track (
  content_id INTEGER,
  album_id INTEGER,
  genre VARCHAR(32),
  length_seconds INTEGER,
  FOREIGN KEY (content_id) REFERENCES Content(id),
  FOREIGN KEY (album_id) REFERENCES Album(id),
  PRIMARY KEY (content_id, album_id)
);

CREATE TABLE Constitutes (
  enjoyer_id INTEGER,
  track_id INTEGER,
  playlist_id INTEGER,
  description VARCHAR(128),
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  FOREIGN KEY (track_id) REFERENCES Track(id),
  FOREIGN KEY (playlist_id) REFERENCES Playlist(id),
  PRIMARY KEY (enjoyer_idi track_id, playlist_id)
);

CREATE TABLE Friend (
  since DATE,
  friend_id1 INTEGER,
  friend_id2 INTEGER,
  FOREIGN KEY (friend_id1) REFERENCES User(id),
  FOREIGN KEY (friend_id2) REFERENCES User(id),
  PRIMARY KEY (friend_id1, friend_id2)
);

CREATE TABLE Message (
  id INTEGER,
  txt VARCHAR(512),
  PRIMARY KEY (id)
);

CREATE TABLE Includes (
  content_id INTEGER,
  message_id INTEGER,
  FOREIGN KEY (content_id) REFERENCES Content(id),
  FOREIGN KEY (message_id) REFERENCES Message(id),
  PRIMARY KEY (content_id, message_id)
);

CREATE TABLE ReactsTo (
  content_id INTEGER,
  user_id INTEGER,
  txt VARCHAR(512),
  emoji VARCHAR(16),
  FOREIGN KEY (content_id) REFERENCES Content(id),
  FOREIGN KEY (user_id) REFERENCES User(id),
  PRIMARY KEY (content_id, user_id)
);

CREATE TABLE Follows (
  artist_id INTEGER,
  enjoyer_id INTEGER,
  FOREIGN KEY (artist_id) REFERENCES Artist(id),
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  PRIMARY KEY (artist_id, enjoyer_id)
);

CREATE TABLE PerformsIn (
  artist_id INTEGER,
  track_id INTEGER,
  plays VARCHAR(32),
  FOREIGN KEY (artist_id) REFERENCES Artist(id),
  FOREIGN KEY (track_id) REFERENCES Track(content_id),
  PRIMARY KEY (artist_id, track_id)
);

CREATE TABLE Saved (
  content_id INTEGER,
  enjoyer_id INTEGER,
  FOREIGN KEY (content_id) REFERENCES Content(id),
  FOREIGN KEY (enjoyer_id) REFERENCES Enjoyer(id),
  PRIMARY KEY (content_id, enjoyer_id)
);
