const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'ozzy_chel',
  host: 'localhost',
  database: 'carousel',
})

//test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('FAILED TO CONNECT', err);
  }
  if (res) {
    console.log('DB CONNECTED')
  }
})

module.exports.pool = pool;
