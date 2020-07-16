DROP KEYSPACE IF EXISTS carousel;
CREATE KEYSPACE carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE carousel;

DROP TABLE IF EXISTS place_by_zipCode;
CREATE TABLE place_by_zipCode (
  place_id int,
  title text,
  picture_url text,
  zip_code text,
  type_of_room text,
  beds_number smallint,
  rating float,
  total_review smallint,
  plus_host boolean,
  super_host boolean,
  price smallint,
  link text,
  PRIMARY KEY (zip_code, beds_number, price)
) WITH CLUSTERING ORDER BY (beds_number ASC, price ASC);


/* for GET:user_id and POST:user_id, also when user has no like lists */
DROP TABLE IF EXISTS user_by_userid;
CREATE TABLE user_by_userid (
  user_id int,
  user_name text,
  list_id int,
  list_name text,
  PRIMARY KEY (user_id, list_id)
) WITH CLUSTERING ORDER BY (list_id ASC);


DROP TABLE IF EXISTS user_by_user_name;
CREATE TABLE user_by_user_name (
  user_id int,
  user_name text,
  list_id int,
  list_name text,
  PRIMARY KEY (user_name, user_id)
) WITH CLUSTERING ORDER BY (user_id ASC);


/* for PATCH req and DELETE req (api always sends user_id+list_id, cause user HAS like lists) */
DROP TABLE IF EXISTS user_by_userid_and_listid;
CREATE TABLE user_by_userid_and_listid (
  user_id int,
  user_name text,
  list_id int,
  list_name text,
  PRIMARY KEY ((user_id, list_id), list_name)
) WITH CLUSTERING ORDER BY (list_name ASC);


DROP TABLE IF EXISTS likes_by_listid;
CREATE TABLE likes_by_listid (
  list_id int,
  place_id int,
  PRIMARY KEY (list_id, place_id)
) WITH CLUSTERING ORDER BY (place_id ASC);


/* import places */
COPY place_by_zipCode(place_id,title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generatePlace1.csv'
with header=true and delimiter =',';


COPY place_by_zipCode(place_id,title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generatePlace2.csv'
with header=true and delimiter =',';

COPY place_by_zipCode(place_id,title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generatePlace3.csv'
with header=true and delimiter =',';

COPY place_by_zipCode(place_id,title,picture_url,zip_code,type_of_room,beds_number,rating,total_review,plus_host,super_host,price,link)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generatePlace4.csv'
with header=true and delimiter =',';


/* import users_by_userid */
COPY user_by_userid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList1.csv'
with header=true and delimiter =',';

COPY user_by_userid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList2.csv'
with header=true and delimiter =',';

COPY user_by_userid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList3.csv'
with header=true and delimiter =',';

COPY user_by_userid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList4.csv'
with header=true and delimiter =',';

/* import user_by_user_name */
COPY user_by_user_name(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList1.csv'
with header=true and delimiter =',';

COPY user_by_user_name(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList2.csv'
with header=true and delimiter =',';

COPY user_by_user_name(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList3.csv'
with header=true and delimiter =',';

COPY user_by_user_name(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList4.csv'
with header=true and delimiter =',';


/* import user_by_userid_and_listid */
COPY user_by_userid_and_listid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList1.csv'
with header=true and delimiter =',';

COPY user_by_userid_and_listid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList2.csv'
with header=true and delimiter =',';

COPY user_by_userid_and_listid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList3.csv'
with header=true and delimiter =',';

COPY user_by_userid_and_listid(user_id,user_name,list_id,list_name)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserAndList4.csv'
with header=true and delimiter =',';

/* import likes_by_listid */
COPY likes_by_listid(list_id,place_id)
FROM '/Users/ozzy_chel/Projects/sdc/data/csvCassandra/generateUserLikes1.csv'
with header=true and delimiter =',';
