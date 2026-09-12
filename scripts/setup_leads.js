require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function setupLeads() {
  const client = await pool.connect();
  try {
    console.log("Creating course_leads table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS course_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        "courseTitle" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log("Migration complete!");
  } catch (error) {
    console.error("Error migrating:", error);
  } finally {
    client.release();
    pool.end();
  }
}

setupLeads();
