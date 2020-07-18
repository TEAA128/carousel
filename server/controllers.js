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
      console.log('failed');
      res.status(400).send();
    }
    if (data) {
      // console.log('success');
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


// const convertPlacesResponce = (array, callback) => {
//   var newArray = [];
//   console.log(array)
//   console.log('WORKS')
//   // for (let i = 0; i < array.length; i++) {
//   //   let obj = {
//   //     picture: array[i].picture_url,
//   //     type: array[i].type_of_room,
//   //     bed: array[i].beds_number,
//   //     rating: array[i].rating,
//   //     totalReview: array[i].total_review,
//   //     hostplus: array[i].plus_host,
//   //     superhost: array[i].super_host,
//   //     title: array[i].title,
//   //     price: array[i].price,
//   //     src: array[i].link
//   //   }
//   //   newArray.push(obj)
//   // }
//   console.log(newArray)
//   callback(newArray);
// }

module.exports = {
  getPlaces,
  getUser,
  getLikes
}