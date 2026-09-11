require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fix() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, email, role FROM users');
    console.log("Users:", res.rows);

    let adminId = null;
    
    // Find admin user or make the first user admin
    const adminUser = res.rows.find(u => u.role === 'ADMIN');
    if (adminUser) {
      adminId = adminUser.id;
    } else if (res.rows.length > 0) {
      adminId = res.rows[0].id;
      await client.query('UPDATE users SET role = $1 WHERE id = $2', ['ADMIN', adminId]);
      console.log(`Made user ${adminId} an ADMIN.`);
    } else {
      console.log("No users found. Creating admin user...");
      const insert = await client.query(`
        INSERT INTO users (name, email, password, role) 
        VALUES ('Admin', 'admin@demo.com', '$2b$10$X7...', 'ADMIN') RETURNING id
      `);
      adminId = insert.rows[0].id;
    }

    // Assign courses to this admin
    await client.query(`UPDATE courses SET "instructorId" = $1 WHERE slug IN ('ai-powered-digital-marketing', 'react-js-full-stack-development')`, [adminId]);
    console.log(`Assigned courses to admin user ${adminId}`);
    
  } finally {
    client.release();
    pool.end();
  }
}
fix();
