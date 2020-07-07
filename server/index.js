const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3003

//setup Express Static files
app.use('/carousel',express.static(path.join(__dirname,'..','client','dist')))

//init controller
const PlaceController = require('./Controller/place.js')
const UserController = require('./Controller/user.js')

//init parser
const parser = require('body-parser')
app.use(parser.json());

//init morgan
const morgan = require('morgan')
app.use(morgan('dev'));

//init cors
var cors = require('cors')
app.use(cors());

//setup proxy
app.set('trust proxy', function(ip){
  if(ip ==='localhost:3000') return true;
  else return false;
})


//Places API Calls:
app.get('/api/places', PlaceController.get);

//User - API Calls:
app.get('/api/users', UserController.get);
app.post('/api/users', UserController.post);
app.patch('/api/users/:placeId', UserController.update)


app.listen(port, () => console.log(`App is listening at http://localhost:${port}`))