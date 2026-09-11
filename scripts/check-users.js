require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, email, role, name FROM users');
    console.log("Users:", res.rows);
    
    // Assign ALL courses to ALL admins, or specifically the one named 'Demo Admin'
    const adminId = res.rows.find(u => u.name === 'Demo Admin')?.id || res.rows.find(u => u.role === 'ADMIN')?.id;
    if (adminId) {
      await client.query(`UPDATE courses SET "instructorId" = $1`, [adminId]);
      console.log(`Assigned ALL courses to user ${adminId}`);
    }

  } finally {
    client.release();
    pool.end();
  }
}
check();
