import 'dotenv/config';
import pool from './lib/db';

async function checkAccount() {
  try {
    const r = await pool.query(
      `SELECT u.* FROM users u JOIN accounts a ON u.id = a."userId" WHERE a.provider = $1 AND a."providerAccountId" = $2`,
      ['google', '110805339927331825328']
    );
    console.log(r.rows);
  } finally {
    process.exit(0);
  }
}
checkAccount();
