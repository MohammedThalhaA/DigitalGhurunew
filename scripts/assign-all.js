require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function assignAll() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, email, role, name FROM users');
    console.log("Users in DB:", res.rows);
    
    // The user "Demo Admin" might have been created by seed-demo.js initially or signed up.
    // Let's just make sure ALL users with the role 'ADMIN' get access to these courses.
    const admins = res.rows.filter(u => u.role === 'ADMIN' || u.name === 'Demo Admin');
    
    for (const admin of admins) {
      // Make sure their role is ADMIN just in case
      await client.query(`UPDATE users SET role = 'ADMIN' WHERE id = $1`, [admin.id]);
      console.log(`Setting user ${admin.id} (${admin.name}) to ADMIN role.`);
      
      // We will assign the AI Kids Programming course to them as well as the newly synced ones
      await client.query(`UPDATE courses SET "instructorId" = $1`, [admin.id]);
      console.log(`Assigned ALL courses to user ${admin.id} (${admin.name})`);
    }

  } finally {
    client.release();
    pool.end();
  }
}
assignAll();
