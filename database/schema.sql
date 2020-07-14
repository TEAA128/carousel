DROP DATABASE IF EXISTS carousel;
CREATE DATABASE carousel;

\connect carousel;

  DROP TABLE IF EXISTS places;
  CREATE TABLE places (
    place_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    picture_url VARCHAR (500) NOT NULL,
    zip_code VARCHAR(15) NOT NULL,
    type_of_room VARCHAR(30) NOT NULL,
    beds_number SMALLINT NOT NULL,
    rating real NOT NULL,
    total_review INTEGER NOT NULL,
    plus_host BOOLEAN,
    super_host BOOLEAN,
    price INTEGER NOT NULL,
    link VARCHAR(500) NOT NULL
  );

  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL
  );

  DROP TABLE IF EXISTS user_lists;
  CREATE TABLE user_lists (
    list_id SERIAL PRIMARY KEY,
    list_name VARCHAR(50) NOT NULL,
    user_id_fk INTEGER REFERENCES users(user_id)
  );

  DROP TABLE IF EXISTS user_likes;
  CREATE TABLE user_likes (
    like_id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES user_lists(list_id),
    place_id INTEGER REFERENCES places(place_id)
  );

-- import places SELECT username
COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generatePlace1.csv' DELIMITER ',' CSV HEADER;

COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generatePlace2.csv' DELIMITER ',' CSV HEADER;

-- import users
COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUsers1.csv' DELIMITER ',' CSV HEADER;

COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUsers2.csv' DELIMITER ',' CSV HEADER;

-- import user_lists
COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUserLists1.csv' DELIMITER ',' CSV HEADER;

COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUserLists2.csv' DELIMITER ',' CSV HEADER;

-- import user_likes
COPY user_likes(list_id,place_id)
FROM '/Users/ozzy_chel/Projects/sdc/carousel/database/csvPostgresData/generateUserLikes1.csv' DELIMITER ',' CSV HEADER;