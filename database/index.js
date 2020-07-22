const { Pool, Client } = require('pg');
const keys = require('../config.js');

const pool = new Pool({
  host: '52.53.164.12',
  port: '5432',
  user: 'postgres',
  password: keys.psql_pass,
  database: 'carousel',
});

// test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('FAILED TO CONNECT', err);
  }
  if (res) {
    console.log('DB CONNECTED');
  }
});

module.exports.pool = pool;
