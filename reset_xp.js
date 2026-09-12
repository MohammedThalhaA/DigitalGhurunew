const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function resetXP() {
  try {
    await pool.query("UPDATE users SET xp_points = 0, level = 1 WHERE role = 'STUDENT'");
    await pool.query("DELETE FROM leaderboard_points WHERE action != 'complete_chapter' AND action != 'complete_course'");
    console.log("XP reset successfully");
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
resetXP();
