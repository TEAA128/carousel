CREATE DATABASE carousel;

\connect carousel;

  CREATE TABLE places (
    placeId SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    pictureUrl VARCHAR (500) NOT NULL,
    zipCode INTEGER NOT NULL,
    typeOfRoom VARCHAR(30) NOT NULL,
    bedsNumber SMALLINT NOT NULL,
    rating real NOT NULL,
    totalReview INTEGER NOT NULL,
    plusHost BOOLEAN,
    superHost BOOLEAN,
    price INTEGER NOT NULL,
    link VARCHAR(500) NOT NULL
  );

  CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    userName VARCHAR(30) NOT NULL
  );

  CREATE TABLE user_lists (
    listId SERIAL PRIMARY KEY,
    listName VARCHAR(30) NOT NULL,
    userId INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
  );

  CREATE TABLE user_likes (
    likeId serial PRIMARY KEY,
    listId INTEGER NOT NULL REFERENCES user_lists ON DELETE CASCADE,
    placeId INTEGER NOT NULL REFERENCES places ON DELETE CASCADE
  );


-- INSERT INTO places (title, pictureUrl, zipCode, typeOfRoom, bedsNumber, rating, totalReview, plusHost, superHost, price, link) VALUES ('Cozy hut on the beach', 'http://somethingn', 94166, 'Private room', 4, 4.85, 1189, true, false, 220, 'https://local');

-- INSERT INTO users (userName) VALUES ('Mick Jagger');
-- INSERT INTO users (userName) VALUES ('Robert Plant');

-- INSERT INTO user_lists (listName, userId) VALUES ('summer trip', (SELECT userId FROM users WHERE userName='Robert Plant'));

-- INSERT INTO user_likes (listId, placeId) VALUES ((SELECT listId FROM user_lists WHERE listName='summer trip'), (SELECT placeId FROM places WHERE zipCode=94166));
