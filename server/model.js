const db = require('../database/index.js');

const getPlacesByZipCode = (req, res, callback) => {
  const zip = req.query.zipCode;
  const bedsMin = Math.floor(parseInt(req.query.beds_number) * 0.6);
  const bedsMax = Math.ceil(parseInt(req.query.beds_number) * 1.4);
  const priceMin = Math.floor(parseInt(req.query.price) * 0.6);
  const priceMax = Math.ceil(parseInt(req.query.price) * 1.4);
  const query = `SELECT * FROM places WHERE zip_code = '${zip}' AND beds_number > ${bedsMin} AND beds_number < ${bedsMax} AND price > ${priceMin} AND price < ${priceMax}`;
  db.pool.query(query)
    .then((result) => {
      return convertPlacesResponce(result);
    })
    .then((converted) => {
      callback(null, converted)
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
};

const getUserListsById = (req, res, callback) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM user_likes INNER JOIN user_lists ON user_likes.list_id = user_lists.list_id INNER JOIN users ON user_lists.user_id_fk = users.user_id WHERE user_id_fk = ${userId}`;
  db.pool.query(query)
    .then((result) => {
      return convertUserListsResponce(result);
    })
    .then((converted) => {
      callback(null, converted)
    })
    .catch((err) => {
      console.log(err)
    })
}

const createNewList = (req, res, callback) => {
  console.log('BODY', req.body)
  const query = `WITH ins1 AS (INSERT INTO user_lists(list_name, user_id_fk) VALUES('${req.body.list_name}',${req.body.user_id}) RETURNING list_id) INSERT INTO user_likes(list_id, place_id) VALUES((SELECT list_id FROM ins1), ${req.body.place_id})`;
  db.pool.query(query, callback);
}

const getLikesByListId = (req, res, callback) => {
  const listId = req.params.listId;
  const query = `SELECT * FROM user_likes WHERE list_id = ${listId}`
  db.pool.query(query, callback);
}

const convertPlacesResponce = (array) => {
  const outputArray = [];
  const inputArray = array.rows;
  for (let i = 0; i < inputArray.length; i++) {
    let obj = {
      _id: inputArray[i].place_id,
      picture: inputArray[i].picture_url,
      type: inputArray[i].type_of_room,
      bed: inputArray[i].beds_number,
      rating: inputArray[i].rating,
      totalReview: inputArray[i].total_review,
      hostplus: inputArray[i].plus_host,
      superhost: inputArray[i].super_host,
      title: inputArray[i].title,
      price: inputArray[i].price,
      src: inputArray[i].link
    }
    outputArray.push(obj);
  }
  return outputArray;
}

const convertUserListsResponce = (array) => {
  const inputArray = array.rows;
  const outputArray = [];
  let obj = {
    _id: inputArray[0].user_id,
    name: inputArray[0].user_name,
    likeplace: []
  }
  for (let i = 0; i < inputArray.length; i++) {
    let like = {
      name: inputArray[i].place_id,
      list: inputArray[i].list_name,
      like: true
    }
    obj.likeplace.push(like);
  }
  outputArray.push(obj)
  return outputArray;
}

module.exports = {
  getPlacesByZipCode,
  getUserListsById,
  getLikesByListId,
  createNewList
}