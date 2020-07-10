CREATE KEYSPACE place;

CREATE TABLE place.place_by_id (

  PRIMARY KEY (place_id),
)
  WITH comment = 'Q1. Find a place with its id';

CREATE KEYSPACE user;

CREATE TABLE user.user_id (

  PRIMARY KEY( user_id, booking_id),
)
  WITH comment = 'Q2. Find user with user id';