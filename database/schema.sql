DROP DATABASE IF EXISTS carousel;
CREATE DATABASE carousel;

\connect carousel;

  DROP TABLE IF EXISTS places;
  CREATE TABLE places (
    place_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    picture_url TEXT NOT NULL,
    zip_code VARCHAR(15) NOT NULL,
    type_of_room VARCHAR(30) NOT NULL,
    beds_number SMALLINT NOT NULL,
    rating real NOT NULL,
    total_review INTEGER NOT NULL,
    plus_host BOOLEAN,
    super_host BOOLEAN,
    price INTEGER NOT NULL,
    link TEXT NOT NULL
  );

  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL
  );

  DROP TABLE IF EXISTS user_lists;
  CREATE TABLE user_lists (
    list_id SERIAL PRIMARY KEY,
    list_name TEXT NOT NULL,
    user_id_fk INTEGER REFERENCES users(user_id)
  );

  DROP TABLE IF EXISTS user_likes;
  CREATE TABLE user_likes (
    like_id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES user_lists(list_id),
    place_id INTEGER REFERENCES places(place_id)
  );

COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generatePlace1.csv' DELIMITER ',' CSV HEADER;

COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generatePlace2.csv' DELIMITER ',' CSV HEADER;

COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generatePlace3.csv' DELIMITER ',' CSV HEADER;

COPY places(title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generatePlace4.csv' DELIMITER ',' CSV HEADER;
-------------------------------
-- import users
COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUsers1.csv' DELIMITER ',' CSV HEADER;

COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUsers2.csv' DELIMITER ',' CSV HEADER;

COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUsers3.csv' DELIMITER ',' CSV HEADER;

COPY users(user_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUsers4.csv' DELIMITER ',' CSV HEADER;
-------------------------------
-- import user_lists
COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUserLists1.csv' DELIMITER ',' CSV HEADER;

COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUserLists2.csv' DELIMITER ',' CSV HEADER;

COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUserLists3.csv' DELIMITER ',' CSV HEADER;

COPY user_lists(list_name,user_id_fk)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUserLists4.csv' DELIMITER ',' CSV HEADER;
------------------------------
-- import user_likes
COPY user_likes(list_id,place_id)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvPostgres/generateUserLikes1.csv' DELIMITER ',' CSV HEADER;

-- create indexes
CREATE INDEX CONCURRENTLY zipcode_idx ON places (zip_code);
CREATE INDEX CONCURRENTLY places_beds_idx ON places (beds_number);
CREATE INDEX CONCURRENTLY places_price_idx ON places (price);
CREATE INDEX CONCURRENTLY userid_idx ON users (user_id);
CREATE INDEX CONCURRENTLY user_name_idx ON users (user_name);
CREATE INDEX CONCURRENTLY user_id_fk_idx ON user_lists (user_id_fk);
CREATE INDEX CONCURRENTLY likes_listid_idx ON user_likes (list_id);