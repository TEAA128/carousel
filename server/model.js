const db = require('../database/index.js');

const getPlacesByZipCode = (req, res, callback) => {
  console.log(req.query)
  const zip = req.query.zipCode;
  const bedsMin = Math.floor(parseInt(req.query.beds_number) * 0.6);
  const bedsMax = Math.ceil(parseInt(req.query.beds_number) * 1.4);
  const priceMin = Math.floor(parseInt(req.query.price) * 0.6);
  const priceMax = Math.ceil(parseInt(req.query.price) * 1.4);
  const query = `SELECT * FROM places WHERE zip_code = '${zip}' AND beds_number > ${bedsMin} AND beds_number < ${bedsMax} AND price > ${priceMin} AND price < ${priceMax}`;
  // console.log(query)
  db.pool.query(query, callback)
};

const getUserById = (req, res, callback) => {
  // console.log(req.params)
  const userId = req.params.userId;
  const query = `SELECT list_id,list_name FROM user_lists WHERE user_id_fk = ${userId}`;
  db.pool.query(query, callback);
}

const getLikesByListId = (req, res, callback) => {
  // console.log(req.params)
  const listId = req.params.listId;
  const query = `SELECT * FROM user_likes WHERE list_id = ${listId}`
  db.pool.query(query, callback);
}

module.exports = {
  getPlacesByZipCode,
  getUserById,
  getLikesByListId
}