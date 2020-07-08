const faker = require('faker');
const Promise = require('bluebird');
const Place = require('./Place.js');
const User = require('./User.js');
const db = require('./index.js');

const sampleUser = () => new Promise(((resolve, reject) => {
  const users = [];
  for (let i = 0; i < 90; i++) {
    const user = {};
    user.name = `${faker.name.findName()}`;
    user.likeplace = [];
    users.push(user);
  }
  if (users != null) {
    resolve(users);
  } else {
    reject(new Error('No data'));
  }
}));

const awsImgAdd = [
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-albertoeger-PmstY5S5nKA.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-albertoeger-PmstY5S5nKA.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-chuttersnap-E_1HgzKm4Vw.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-chuttersnap-E_1HgzKm4Vw.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-couriina-OsgLI_awdk0.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-couriina-OsgLI_awdk0.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-cowomen-t9ovV7r-FJU.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-cowomen-t9ovV7r-FJU.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-curology-6CJg-fOTYs4.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-curology-6CJg-fOTYs4.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-creatveight-zzMb7jacyBc.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-creatveight-zzMb7jacyBc.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-devano23-DU8Z5djVJtg.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-devano23-DU8Z5djVJtg.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-evphotocinema-7SY3pedipaA.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-7SY3pedipaA.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-evphotocinema-E8Qyl8zj3XI.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-E8Qyl8zj3XI.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-evphotocinema-dTCNj6ptvG0.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-dTCNj6ptvG0.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-evphotocinema-y0QpNoSx4eI.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-y0QpNoSx4eI.jpg',
  'https://myhackreactorimghost.s3-us-west-1.amazonaws.com/bulksplash-filios_sazeides-oe6GzjEyHns.jpg', 'https://d2gavsb72y0czz.cloudfront.net/bulksplash-filios_sazeides-oe6GzjEyHns.jpg',
];

const samplePlaces = () => new Promise((resolve, reject) => {
  const result = [];
  for (let i = 0; i < awsImgAdd.length; i++) {
    const tempObj = {};
    tempObj.picture = awsImgAdd[i];
    tempObj.type = 'Private Room';
    tempObj.bed = '1 bed';
    tempObj.rating = parseFloat(Math.random() * (5 - 2) + 2).toFixed(2);
    tempObj.totalReview = Math.ceil(Math.random() * 100 + 1);
    tempObj.hostplus = Math.round(Math.random() * 1);
    tempObj.superhost = Math.round(Math.random() * 1);
    tempObj.title = 'Spacious Carmel Highland Retreat';
    tempObj.price = parseFloat(Math.random() * (300 - 100) + 100).toFixed(0);
    tempObj.src = 'http://youtube.com';
    result.push(tempObj);
  }
  console.log(result);
  if (result != null) {
    resolve(result);
  } else {
    reject(new Error('no result return!'));
  }
});
const insertSamplePlaces = () => {
  Place.deleteMany()
    .then(() => samplePlaces())
    .then((data) => Place.create(data))
    .then(() => console.log('completed importing Places sample data'))
    .catch((err) => console.log(`error: ${err}`))
    .then(() => User.deleteMany())
    .then(() => sampleUser())
    .then((data) => User.create(data))
    .then(() => console.log('completed importing sample data'))
    .catch((err) => console.log(`error: ${err}`));
};

insertSamplePlaces();

// const axios = require('axios');
// const apiKey = require('../config/unsplashdb.js');

// const insertSamplePlaces = () => {
//   Place.deleteMany()
//   .then( () => samplePlaces(1, []))
//   .then( (data) => samplePlaces(2,data))
//   .then( (data) => samplePlaces(3,data))
//   .then( (data)=>Place.create(data))
//   .then( ()=> console.log("completed importing Places sample data"))
//   .catch( (err) => console.log("error: "+ err))
//   .then( () => User.deleteMany())
//   .then( () => sampleUser())
//   .then( (data) => User.create(data))
//   .then( ()=> console.log("completed importing sample data"))
//   .catch( (err) => console.log("error: "+ err))
// };

//  pageNumber = pageNumber || 1;
//  return axios.get('https://api.unsplash.com/search/photos',{
//    params: {
//      client_id: apiKey,
//      query: "bedroom for rent",
//      page: pageNumber,
//      per_page: 30
//    }
//  })
//    .then((res)=> {
//      let result = previousdata || [];;
//      let unsplashPhoto = res.data.results;
//      for(let i=0;i<unsplashPhoto.length;i++){
//        let tempObj = {};
//        tempObj.picture = unsplashPhoto[i].urls.thumb;
//        tempObj.type = 'One room';
//        tempObj.bed = '1 bed';
//        tempObj.rating = parseFloat(Math.random() * (5-2)+2).toFixed(2);
//        tempObj.totalReview = Math.ceil(Math.random() * 100 + 1);
//        tempObj.hostplus = Math.round(Math.random() * 1);
//        tempObj.superhost = Math.round(Math.random() * 1);
//        tempObj.title = unsplashPhto;
//        tempObj.price = parseFloat(Math.random() * (300-100)+100).toFixed(0);
//        tempObj.src = "http://youtube.com";
//        result.push(tempObj);
//      }
//      return result;
//    })
//    .catch((err) => {
//      console.log("error: "+ err);
//    })
