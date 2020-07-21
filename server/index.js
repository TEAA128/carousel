require('newrelic');
const express = require('express');
const path = require('path');
const port = 3003;
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Controllers = require('./controllers');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
  }
} else {
  const app = express();

  app.use(parser.json());
  // app.use(morgan('dev'));
  app.use(cors());

  app.use('/', express.static(path.join(__dirname, '..', 'client', 'dist')));


  app.get('/api/places', (req, res) => {
    Controllers.getPlaces(req,res);
  });

  app.get('/api/users/:userId', (req, res) => {
    Controllers.getUserLists(req, res);
  })

  app.get('/api/likes/:listId', (req, res) => {
    Controllers.getLikes(req, res);
  })

  app.post('/api/users/:userId', (req, res) => {
    Controllers.postNewList(req, res);
  })

  // app.patch('/api/users/:userId', (req,res) => {
  //   Controllers.toggleLike(req, res)
  // })

  app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
}

cluster.on('exit', function(worker, code, signal) {
  console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
  cluster.fork();
});






