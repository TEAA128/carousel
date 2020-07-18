const express = require('express');
const path = require('path');
const app = express();
const port = 3003;
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Controllers = require('./controllers');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;








app.use(parser.json());
// app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '..', 'client', 'dist')));

//GET requests
app.get('/api/places', (req, res) => {
  Controllers.getPlaces(req,res);
});

app.get('/api/users/:userId', (req, res) => {
  Controllers.getUser(req, res);
})

app.get('/api/likes/:listId', (req, res) => {
  Controllers.getLikes(req, res);
})

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));

