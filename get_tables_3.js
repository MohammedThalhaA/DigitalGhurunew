const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function getDetails() {
  const upRes = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_progress'");
  console.log("USER_PROGRESS COLUMNS:", upRes.rows);
  
  process.exit(0);
}

getDetails();
