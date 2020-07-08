const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  likeplace: [{ name: String, list: String, like: Boolean }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
