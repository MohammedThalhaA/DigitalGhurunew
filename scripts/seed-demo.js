require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedDemoUsers() {
  const client = await pool.connect();
  try {
    const passwordHash = await bcrypt.hash("password123", 10);

    // Seed Student
    await client.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ('Demo Student', 'student@demo.com', $1, 'STUDENT')
      ON CONFLICT (email) DO NOTHING;
    `, [passwordHash]);

    // Seed Instructor
    await client.query(`
      INSERT INTO users (name, email, password, role)
      VALUES ('Demo Instructor', 'instructor@demo.com', $1, 'INSTRUCTOR')
      ON CONFLICT (email) DO NOTHING;
    `, [passwordHash]);

    console.log("✅ Demo users seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding demo users:", err);
  } finally {
    client.release();
    pool.end();
  }
}

seedDemoUsers();
