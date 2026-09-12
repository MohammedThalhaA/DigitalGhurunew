const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function testDates() {
  const res = await pool.query("SELECT last_active_date FROM users WHERE role = 'STUDENT' LIMIT 1");
  const user = res.rows[0];
  
  const today = new Date().toISOString().split("T")[0];
  const lastActive = user.last_active_date
    ? new Date(user.last_active_date).toISOString().split("T")[0]
    : null;
    
  console.log("DB Value:", user.last_active_date);
  console.log("Type:", typeof user.last_active_date);
  console.log("today:", today);
  console.log("lastActive:", lastActive);
  
  process.exit(0);
}
testDates();
