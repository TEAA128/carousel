DROP DATABASE IF EXISTS carousel;
CREATE DATABASE carousel;

\connect carousel;

  DROP TABLE IF EXISTS places;
  CREATE TABLE places (
    placeId SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    pictureUrl VARCHAR (500) NOT NULL,
    zipCode VARCHAR(15) NOT NULL,
    typeOfRoom VARCHAR(30) NOT NULL,
    bedsNumber SMALLINT NOT NULL,
    rating real NOT NULL,
    totalReview INTEGER NOT NULL,
    plusHost BOOLEAN,
    superHost BOOLEAN,
    price INTEGER NOT NULL,
    link VARCHAR(500) NOT NULL
  );

  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    userName VARCHAR(30) NOT NULL
  );

  DROP TABLE IF EXISTS user_lists;
  CREATE TABLE user_lists (
    listId SERIAL PRIMARY KEY,
    listName VARCHAR(30) NOT NULL,
    userId INTEGER REFERENCES users (userId)
  );

  CREATE TABLE user_likes (
    likeId SERIAL PRIMARY KEY,
    listId INTEGER REFERENCES user_lists(listId),
    placeId INTEGER REFERENCES places(placeId)
  );

-- import places
COPY places(place_gen_id,title,pictureUrl,zipCode,typeOfRoom,bedsNumber,rating,totalReview,plusHost,superHost,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generatePlace1.csv' DELIMITER ',' CSV HEADER;

-- import users
-- COPY users(user_gen_id,userName)
-- FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUsers1.csv' DELIMITER ',' CSV HEADER;


-- import user_lists
-- COPY users(user_gen_id,listName, user_gen_id)
-- FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUserLists1.csv' DELIMITER ',' CSV HEADER;

