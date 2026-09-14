const { Pool } = require('pg');
require('dotenv').config();

// Railway (and most managed Postgres hosts) require SSL in production but
// use a self-signed cert, so we disable strict verification only when
// running against a remote DB (i.e. not plain localhost).
const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client', err);
});

module.exports = pool;
