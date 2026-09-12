const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function getDetails() {
  const sessRes = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'sessions'");
  console.log("SESSIONS COLUMNS:", sessRes.rows);
  
  const enrRes = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'enrollments'");
  console.log("ENROLLMENTS COLUMNS:", enrRes.rows);
  
  process.exit(0);
}

getDetails();
