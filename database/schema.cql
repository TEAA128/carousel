CREATE KEYSPACE carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE carousel;

CREATE TABLE place_by_zipCode (
  placeId uuid,
  title text,
  pictureUrl text,
  zipCode smallint,
  typeOfRoom text,
  bedsNumber smallint,
  rating float,
  totalReview smallint,
  plusHost boolean,
  superHost boolean,
  price smallint,
  link text,
  PRIMARY KEY (zipCode, bedsNumber, price)
) WITH CLUSTERING ORDER BY (bedsNumber ASC, price ASC);

/* for GET:userId and POST:userId, also when user has no like lists */
CREATE TABLE user_by_userId (
  userId uuid,
  userName text,
  listId uuid,
  listName text,
  likeId uuid,
  placeId uuid,
  PRIMARY KEY (userId, listId)
) WITH CLUSTERING ORDER BY (listId ASC);

/* for PATCH req and DELETE req (api always sends userId+listId, cause user HAS like lists) */
CREATE TABLE user_by_userId_and_listId (
  userId uuid,
  userName text,
  listId uuid,
  listName text,
  likeId uuid,
  placeId uuid,
  PRIMARY KEY ((userId, listId), placeId)
) WITH CLUSTERING ORDER BY (placeId, DESC);


