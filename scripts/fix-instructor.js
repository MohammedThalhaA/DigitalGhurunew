require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fix() {
  await pool.query(`UPDATE courses SET "instructorId" = (SELECT id FROM users WHERE email = 'admin@demo.com' LIMIT 1)`);
  console.log('Assigned courses to admin');
  pool.end();
}
fix();
