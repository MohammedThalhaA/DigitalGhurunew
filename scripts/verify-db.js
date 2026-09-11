require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  const client = await pool.connect();
  try {
    // Check admin user
    const admin = await client.query(`SELECT id, email, role FROM users WHERE role = 'ADMIN'`);
    console.log("Admin users:", admin.rows);

    // Check courses
    const courses = await client.query(`SELECT id, title, slug, "instructorId" FROM courses`);
    console.log("Courses:", courses.rows);

    // Check modules
    const modules = await client.query(`SELECT id, title, "courseId", position FROM modules ORDER BY "courseId", position`);
    console.log("Modules:", modules.rows.length, "total");

    // Check chapters
    const chapters = await client.query(`SELECT COUNT(*) FROM chapters`);
    console.log("Chapters:", chapters.rows[0].count, "total");

    // Fix: assign all courses to the admin user
    if (admin.rows.length > 0) {
      const adminId = admin.rows[0].id;
      await client.query(`UPDATE courses SET "instructorId" = $1 WHERE "instructorId" IS NULL OR "instructorId" != $1`, [adminId]);
      console.log(`\nFixed: All courses now assigned to admin (id: ${adminId})`);
    }

    // Verify again
    const updated = await client.query(`SELECT id, title, slug, "instructorId" FROM courses`);
    console.log("\nUpdated courses:", updated.rows);
  } finally {
    client.release();
    pool.end();
  }
}
verify();
