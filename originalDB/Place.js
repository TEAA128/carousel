const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const placeSchema = new mongoose.Schema({
  picture: String,
  type: String,
  bed: String,
  rating: Number,
  totalReview: Number,
  hostplus: Boolean,
  superhost: Boolean,
  title: String,
  price: Number,
  src: String,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
