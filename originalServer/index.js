const express = require('express');
const path = require('path');
const app = express();
const port = 3003;
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const UserController = require('./Controller/user.js');
const PlaceController = require('./Controller/place.js');

app.use(parser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/carousel', express.static(path.join(__dirname, '..', 'client', 'dist')));
// setup proxy
app.set('trust proxy', (ip) => {
  if (ip === 'localhost:3000') return true;
  return false;
});

// Places API Calls:
app.get('/api/places', PlaceController.get);

// User - API Calls:
app.get('/api/users', UserController.get);
app.post('/api/users', UserController.post);
app.patch('/api/users/:placeId', UserController.update);

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
