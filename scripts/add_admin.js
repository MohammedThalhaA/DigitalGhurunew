require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const bcrypt = require('bcrypt');

bcrypt.hash('password123', 10).then(hashed => {
  return pool.query(
    "INSERT INTO users (name, email, password, role, \"isBlocked\", \"emailVerified\") VALUES ($1, $2, $3, $4, $5, NOW()) ON CONFLICT (email) DO NOTHING",
    ['Demo Admin', 'admin@demo.com', hashed, 'ADMIN', false]
  );
})
.then(() => {
  console.log('Added Demo Admin successfully.');
  return pool.end();
})
.catch(console.error);
