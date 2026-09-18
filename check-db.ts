import 'dotenv/config';
import pool from './lib/db';

async function checkDb() {
  try {
    const acc = await pool.query('SELECT * FROM accounts ORDER BY id DESC LIMIT 5');
    console.log("Accounts:", acc.rows);
    const usr = await pool.query('SELECT id, email, role, "emailVerified" FROM users ORDER BY id DESC LIMIT 5');
    console.log("Users:", usr.rows);
  } finally {
    process.exit(0);
  }
}
checkDb();
