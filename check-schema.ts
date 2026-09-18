import 'dotenv/config';
import pool from './lib/db';

async function checkSchema() {
  try {
    const r = await pool.query(`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'image'`);
    console.log(r.rows);
  } finally {
    process.exit(0);
  }
}
checkSchema();
