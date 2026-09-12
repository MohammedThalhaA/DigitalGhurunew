const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function migrate() {
  try {
    console.log("Adding columns to users table...");
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS bio TEXT,
      ADD COLUMN IF NOT EXISTS notification_course_announcements BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS notification_community_mentions BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS notification_marketing_emails BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false
    `);
    console.log("Migration successful");
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
migrate();
