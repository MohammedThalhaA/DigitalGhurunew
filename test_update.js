const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function testUpdate() {
  // same logic as in updateStreak
  const userId = 1;
  const res = await pool.query(
    `SELECT last_active_date, streak_count, best_streak FROM users WHERE id = $1`,
    [userId]
  );
  
  const user = res.rows[0];
  const today = new Date().toISOString().split("T")[0];
  const lastActive = user.last_active_date
    ? new Date(user.last_active_date).toISOString().split("T")[0]
    : null;
    
  console.log("DB Date:", user.last_active_date);
  console.log("today:", today);
  console.log("lastActive parsed:", lastActive);
  
  if (lastActive === today) {
    console.log("Already logged in today");
    process.exit(0);
  }
  
  console.log("Would update streak!");
  process.exit(0);
}
testUpdate();
