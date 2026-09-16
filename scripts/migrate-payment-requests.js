const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_requests (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "courseId" INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        amount DECIMAL(10,2),
        utr_number VARCHAR(100),
        status VARCHAR(20) DEFAULT 'PENDING',
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "reviewedAt" TIMESTAMPTZ,
        "reviewedBy" INTEGER REFERENCES users(id)
      );
    `);
    console.log("✅ payment_requests table created successfully.");
  } catch (err) {
    console.error("❌ Error creating payment_requests table:", err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
