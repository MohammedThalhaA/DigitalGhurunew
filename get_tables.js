const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function getTables() {
  const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log("TABLES:", res.rows.map(r => r.table_name));
  
  const usersRes = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'");
  console.log("USERS COLUMNS:", usersRes.rows);
  
  process.exit(0);
}

getTables();
