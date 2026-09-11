require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS "isBlocked" BOOLEAN DEFAULT false;')
  .then(() => {
    console.log('isBlocked column added to users table');
    return pool.end();
  })
  .catch(e => {
    console.error(e);
    pool.end();
  });
