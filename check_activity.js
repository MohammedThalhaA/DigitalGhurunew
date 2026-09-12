const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function check() {
  const res = await pool.query("SELECT * FROM activity_log LIMIT 5");
  console.log(res.rows);
  process.exit(0);
}
check();
