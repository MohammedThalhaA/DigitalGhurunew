const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function fixTest() {
  const userId = 1;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  await pool.query(`UPDATE users SET last_active_date = $1 WHERE id = $2`, [today, userId]);
  
  const res = await pool.query(`SELECT last_active_date FROM users WHERE id = $1`, [userId]);
  const user = res.rows[0];
  
  const lastActive = user.last_active_date ? (
    `${user.last_active_date.getFullYear()}-${String(user.last_active_date.getMonth() + 1).padStart(2, '0')}-${String(user.last_active_date.getDate()).padStart(2, '0')}`
  ) : null;
  
  console.log("today:", today);
  console.log("lastActive:", lastActive);
  console.log("Equal?", today === lastActive);
  
  process.exit(0);
}
fixTest();
