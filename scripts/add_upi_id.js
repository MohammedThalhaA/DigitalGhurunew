require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS upi_id VARCHAR(255);
    `);
    console.log("Successfully added upi_id column.");
  } catch (err) {
    console.error("Error adding upi_id column:", err);
  } finally {
    pool.end();
  }
}

main();
