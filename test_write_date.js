const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function testUpdate() {
  const userId = 1;
  const today = new Date().toISOString().split("T")[0];
  
  // write today
  await pool.query(`UPDATE users SET last_active_date = $1 WHERE id = $2`, [today, userId]);
  
  // read it back
  const res = await pool.query(
    `SELECT last_active_date FROM users WHERE id = $1`,
    [userId]
  );
  
  const user = res.rows[0];
  const lastActive = user.last_active_date
    ? new Date(user.last_active_date).toISOString().split("T")[0]
    : null;
    
  console.log("DB Date returned:", user.last_active_date);
  console.log("today:", today);
  console.log("lastActive parsed:", lastActive);
  process.exit(0);
}
testUpdate();
