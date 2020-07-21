const Place = require('../../originalDB/Place.js');

module.exports = {
  get: (req, res) => {
    console.log('in server GET Places loop');
    Place.find()
      .then((data) => {
        console.log('sending get Places data to client');
        res.send(data);
      })
      .catch((err) => {
        console.log(`error in get request: ${err}`);
      });
  },
};
