CREATE KEYSPACE carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE carousel;

CREATE TABLE place_by_zipCode (
  place_id uuid,
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
) WITH CLUSTERING ORDER BY (bedsNumber ASC, price ASC);

/* for GET:user_id and POST:user_id, also when user has no like lists */
CREATE TABLE user_by_userid (
  user_id uuid,
  user_name text,
  list_id uuid,
  list_name text,
  like_id uuid,
  place_id uuid,
  PRIMARY KEY (user_id, list_id)
) WITH CLUSTERING ORDER BY (list_id ASC);

/* for PATCH req and DELETE req (api always sends user_id+list_id, cause user HAS like lists) */
CREATE TABLE user_by_userid_and_listid (
  user_id uuid,
  user_name text,
  list_id uuid,
  list_name text,
  like_id uuid,
  place_id uuid,
  PRIMARY KEY ((user_id, list_id), place_id)
) WITH CLUSTERING ORDER BY (place_id, DESC);


