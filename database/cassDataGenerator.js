const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const counters = {
  generatePlace: 0,
  generateUsers: 0,
  generateUserLists: 0,
  generateUserListsFk: 0,
  // generateUserLikes: 0,
  generateUserLikesFk: 0
};

function generatePlace(numberOfTitles, callback) {
  const name = 'generatePlace';
  const generatedData = [];
  const randomNumber = (min, max) => Math.floor(min + Math.random() * (max - min));
  const randomRating = (min, max) => {
    const temp = min + Math.random() * (max - min);
    return parseFloat(temp.toFixed(2));
  };
  const randomTypeOfRoom = () => {
    const types = [
      'Entire guesthouse', 'Entire apartment', 'Entire house', 'Entire townhouse', 'Entire guest suite', 'Private room', 'Shared room', 'Hotel room'];
    return types[randomNumber(0, types.length)];
  };

  for (let i = counters.generatePlace + 1; i <= (numberOfTitles + counters.generatePlace); i++) {
    const obj = {
      place_gen_id: i,
      place_uuid: faker.random.uuid(),
      title: faker.lorem.sentence(),
      picture_url: faker.image.imageUrl(),
      zip_code: faker.address.zipCode(),
      type_of_room: randomTypeOfRoom(),
      beds_number: randomNumber(1, 20),
      rating: randomRating(1, 5),
      total_review: randomNumber(0, 20000),
      plus_host: faker.random.boolean(),
      super_host: faker.random.boolean(),
      price: randomNumber(50, 500),
      link: faker.internet.url(),
    };
    generatedData.push(obj);
  }
  callback(generatedData, name);
  counters.generatePlace += numberOfTitles;
  return generatedData;
}

function generateUsers(numberOfTitles, callback) {
  const name = 'generateUsers';
  const generatedData = [];
  for (let i = counters.generateUsers + 1; i <= (numberOfTitles + counters.generateUsers); i++) {
    const obj = {
      user_gen_id: i,
      user_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      list_name: `${faker.random.word()}`
    };
    generatedData.push(obj);
  }
  counters.generateUsers += numberOfTitles;
  callback(generatedData, name);
  return generatedData;
}

function generateUserLists(numberOfTitles, callback, perForeignKeyRepeatTimes = 1) {
  const name = 'generateUserListsAndLikes';
  const generatedData = [];
  let counter = counters.generateUserListsFk;
  for (let i = counters.generateUserLists + 1; i <= (numberOfTitles + counters.generateUserLists); i++) {
    let k = counter + 1;
    while (k <= perForeignKeyRepeatTimes + counter) {
      const obj = {
        user_id: i,
        user_uuid: faker.random.uuid(),
        user_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        list_id: k,
        list_name: `${faker.random.word()}`,

      };
      generatedData.push(obj);
      k++;
    }
    counter += perForeignKeyRepeatTimes;
  }
  counters.generateUserLists += numberOfTitles;
  counters.generateUserListsFk += (perForeignKeyRepeatTimes * numberOfTitles);
  callback(generatedData, name);
  return generatedData;
}

function generateUserLikes(numberOfLikesPerList, callback) {
  const name = 'generateUserLikes';
  const generatedData = [];
  const totalLists = counters.generateUserListsFk;
  const totalPlaces = counters.generatePlace;
  let counter = 0;
  let counter2 = 0;
  let mult = totalLists / totalPlaces;
  for (let i = 1; i <= totalPlaces; i++) {
    for (let k = counter + 1; k <= counter + mult; k++) {
      for (let x = counter2 + 1; x <= counter2 + numberOfLikesPerList; x++) {
        let obj = {
          list_id: k,
          place_id: i
        }
        generatedData.push(obj);
      }
      counter2 += numberOfLikesPerList;
    }
    counter += mult;
  }
  counters.generateUserLikesFk = generatedData.length;
  callback(generatedData, name);
  return generatedData;
};

function createDataHelper(func, numberOfFiles, numberOfData, perForeignKeyRepeatTimes) {
  let created = 0;
  const total = numberOfFiles * numberOfData;
  if (arguments.length === 2) {
    const param = arguments[1];
    func(param, (data, funcName) => {
      const writer = csvWriter();
      writer.pipe(fs.createWriteStream(`/Users/ozzy_chel/Projects/sdc/data/csvCassandra/${funcName}${1}.csv`));
      var x = -1;
      write();
        function write() {
          var ok = true;
          do {
            x += 1;
            if (x === data.length) {
              console.log('last written');
              created += numberOfData;
              console.log(`${funcName}: created 1 file with ${data.length}/${data.length}`);
              writer.end()
            } else {
              ok = writer.write(data[x]);
            }
          } while (x < data.length && ok);
          if (x < data.length) {
            writer.once('drain', write);
          }
        }
    });
  } else {
    for (let i = 1; i <= numberOfFiles; i++) {
      func(numberOfData, (data, funcName) => {
        const writer = csvWriter();
        writer.pipe(fs.createWriteStream(`/Users/ozzy_chel/Projects/sdc/data/csvCassandra/${funcName}${i}.csv`));
        var x = -1;
        write();
          function write() {
            var ok = true;
            do {
              x += 1;
              if (x === data.length) {
                console.log('last written');
                created += numberOfData;
                console.log(`${funcName}: created ${i} files with ${created}/${total}`);
                writer.end()
              } else {
                ok = writer.write(data[x]);
              }
            } while (x < data.length && ok);
            if (x < data.length) {
              writer.once('drain', write);
            }
          }
      }, perForeignKeyRepeatTimes);
    }
  }
}

//createDataHelper(funcName, numberOfFiles, numberOfEntitiesPerFile [perForeignKeyRepeatTimes]);
createDataHelper(generatePlace, 4, 5);
createDataHelper(generateUsers, 4, 5);
createDataHelper(generateUserLists, 4, 5, 2);

//createDataHelper(funcName, numberOfLikesPerList) - grabs info from already generated data
// createDataHelper(generateUserLikes, 3);

console.log(counters);
//total 100mil

// const faker = require('faker');
// const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// const writer = csvWriter();

// const counters = {
//   generatePlace: 0,
//   generateUsers: 0,
//   generateUserLists: 0,
//   generateUserListsFk: 0,
//   generateUserLikesFk: 0,
//   index: 1
// };

// function generateUsers(numberOfRows, callback) {
//   const name = 'generateUsers';
//   const generatedData = [];

//   for (let i = 1; i <= numberOfRows; i++) {
//     const obj = {
//       user_gen_id: i,
//       user_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//     };
//     generatedData.push(obj);
//   }
//   callback(generatedData);
//   return generatedData;
// }

// const write = (writer, data) => {
//   return new Promise((resolve) => {
//     if (!writer.write(data)) {
//       writer.once('drain', resolve)
//     }
//     else {
//       resolve()
//     }
//   })
//   .catch((err)=>{})
// }

// // usage
// const run = async (data) => {
//   writer.pipe(fs.createWriteStream(`/Users/ozzy_chel/Projects/sdc/data/csvCassandra/test${counters.index}.csv`))
//   const max = data.length;
//   let current = 0
//   while (current <= max) {
//     await write(writer, data[current])
//     current++
//   }
//   counters.index++;
// }

// const helperFunc = (func, numberOfFiles, numberOfRows) => {

//   for (let i = 1; i <= numberOfFiles; i++) {
//     func(numberOfRows, run)
//   }

// }

// helperFunc(generateUsers, 2, 10);
