const Model = require('./model');

const getPlaces = (req, res) => {
  Model.getPlacesByZipCode (req, res, (err, data) => {
    if (err) {
      res.status(400).send();
    }
    if (data) {
      res.status(200).send(data);
    }
  })
}

const getUser = (req, res) => {
  Model.getUserById (req, res, (err, data) => {
    if (err) {
      res.status(400).send();
    }
    if (data) {
      res.status(200).send(data);
    }
  })
}

const getLikes = (req, res) => {
  Model.getLikesByListId (req, res, (err, data) => {
    if (err) {
      res.status(400).send();
    }
    if (data) {
      res.status(200).send(data);
    }
  })
}


module.exports = {
  getPlaces,
  getUser,
  getLikes
}