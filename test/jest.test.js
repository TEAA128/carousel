// Initial packages
import App from '../client/src/App.jsx';

const axios = require('axios');
const promise = require('bluebird');

// const PlaceController = require('../server/Controller/place.js')
// const UserController = require('../server/Controller/user.js')

// address for User and Place
const port = 3003;

describe('Testing Get functions in places', () => {
  test('Test Place API GET request to respond 200', () => axios.get(`http://localhost:${port}/api/places`)
    .then((res) => {
      console.log(res.status);
      expect(res.status).toBe(200);
      expect(res.statusText).toBe('OK');
    })
    .catch((e) => {
      console.log(`error: ${e}`);
    }));
});
describe('Testing Get functions in user', () => {
  test('Test User API GET request to respond 200', () => {
    axios.get(`http://localhost:${port}/api/users`)
      .then((res) => {
        console.log(res.status);
        expect(res.status).toBe(200);
        expect(res.statusText).toBe('OK');
      })
      .catch((e) => {
        console.log(`error: ${e}`);
      });
  });
});
