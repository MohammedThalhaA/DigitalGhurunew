const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function reset() {
  await pool.query("UPDATE users SET last_active_date = CURRENT_DATE - INTERVAL '1 day', streak_count = 0 WHERE role = 'STUDENT'");
  console.log("Done");
  process.exit(0);
}
reset();
