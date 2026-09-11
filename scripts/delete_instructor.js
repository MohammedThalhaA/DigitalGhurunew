require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query("DELETE FROM users WHERE email = 'instructor@demo.com'")
  .then(() => {
    console.log('Deleted Demo Instructor');
    // Also delete any other users with role INSTRUCTOR
    return pool.query("DELETE FROM users WHERE role = 'INSTRUCTOR'");
  })
  .then(() => {
    console.log('Deleted all instructors');
    return pool.end();
  })
  .catch(console.error);
