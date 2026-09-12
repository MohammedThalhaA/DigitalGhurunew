const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function resetToFirstDay() {
  try {
    const userId = 1;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    // Reset streak count to 1, best streak to 1, and set last_active_date to today
    await pool.query(
      `UPDATE users SET streak_count = 1, best_streak = 1, last_active_date = $1 WHERE role = 'STUDENT'`,
      [today]
    );
    console.log("Successfully reset streak to 1");
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
resetToFirstDay();
