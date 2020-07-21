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

const getUserLists = (req, res) => {
  Model.getUserListsById (req, res, (err, data) => {
    if (err) {
      console.log('failed');
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

const postNewList = (req, res) => {
  Model.createNewList (req, res, (err, data) => {
    if (err) {
      console.log('failed', err)
      res.status(400).send();
    }
    if (data) {
      console.log('success')
      res.status(201).send();
    }
  })
}

module.exports = {
  getPlaces,
  getUserLists,
  getLikes,
  postNewList
}