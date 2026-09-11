require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log("🚀 Starting dynamic migration...");
  const client = await pool.connect();

  try {
    // ─── ADD NEW COLUMNS TO EXISTING TABLES ───

    console.log("📦 Adding new columns to users table...");
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS xp_points INTEGER DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS best_streak INTEGER DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_date DATE;
    `);

    console.log("📦 Adding new columns to enrollments table...");
    await client.query(`
      ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0;
      ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMPTZ;
    `);

    console.log("📦 Adding duration column to chapters table...");
    await client.query(`
      ALTER TABLE chapters ADD COLUMN IF NOT EXISTS duration VARCHAR(20) DEFAULT '10:00';
    `);

    // ─── CREATE NEW TABLES ───

    console.log("📦 Creating notifications table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL DEFAULT 'info',
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        "isRead" BOOLEAN DEFAULT false,
        "relatedUrl" TEXT,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log("📦 Creating activity_log table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        title TEXT NOT NULL,
        metadata JSONB DEFAULT '{}',
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log("📦 Creating leaderboard_points table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS leaderboard_points (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        action VARCHAR(100) NOT NULL,
        points INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // ─── CREATE INDEXES FOR PERFORMANCE ───

    console.log("📦 Creating indexes...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications("userId", "createdAt" DESC);
      CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log("userId", "createdAt" DESC);
      CREATE INDEX IF NOT EXISTS idx_leaderboard_points_user ON leaderboard_points("userId");
      CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress("userId");
      CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments("userId");
    `);

    // ─── SEED: Generate welcome notification for existing users ───

    console.log("🌱 Seeding welcome notifications for existing users...");
    const usersRes = await client.query(`SELECT id FROM users`);
    for (const user of usersRes.rows) {
      // Check if welcome notification already exists
      const existing = await client.query(
        `SELECT id FROM notifications WHERE "userId" = $1 AND title = 'Welcome to Digital Ghuru!'`,
        [user.id]
      );
      if (existing.rows.length === 0) {
        await client.query(
          `INSERT INTO notifications ("userId", type, title, message, "relatedUrl")
           VALUES ($1, 'info', 'Welcome to Digital Ghuru!', 'Your learning journey starts here. Browse courses and start building your digital marketing skills!', '/student/courses')`,
          [user.id]
        );
      }
    }

    // ─── SEED: Calculate initial XP from existing user_progress ───

    console.log("🌱 Calculating initial XP from existing progress...");
    const progressRes = await client.query(`
      SELECT "userId", COUNT(*) as completed_chapters
      FROM user_progress
      WHERE "isCompleted" = true
      GROUP BY "userId"
    `);
    for (const row of progressRes.rows) {
      const xp = row.completed_chapters * 10; // 10 XP per completed chapter
      await client.query(
        `UPDATE users SET xp_points = GREATEST(xp_points, $1) WHERE id = $2`,
        [xp, row.userId]
      );
    }

    // ─── SEED: Calculate enrollment progress from user_progress ───

    console.log("🌱 Calculating enrollment progress...");
    await client.query(`
      UPDATE enrollments e
      SET progress = COALESCE(sub.pct, 0)
      FROM (
        SELECT
          e2."userId",
          e2."courseId",
          CASE WHEN COUNT(ch.id) = 0 THEN 0
               ELSE ROUND(100.0 * COUNT(up.id) FILTER (WHERE up."isCompleted" = true) / COUNT(ch.id))
          END AS pct
        FROM enrollments e2
        JOIN courses c ON c.id = e2."courseId"
        LEFT JOIN modules m ON m."courseId" = c.id
        LEFT JOIN chapters ch ON ch."moduleId" = m.id
        LEFT JOIN user_progress up ON up."chapterId" = ch.id AND up."userId" = e2."userId"
        GROUP BY e2."userId", e2."courseId"
      ) sub
      WHERE e."userId" = sub."userId" AND e."courseId" = sub."courseId"
    `);

    // Mark completed enrollments
    await client.query(`
      UPDATE enrollments
      SET "completedAt" = NOW()
      WHERE progress = 100 AND "completedAt" IS NULL
    `);

    console.log("✅ Dynamic migration completed successfully!");

  } catch (err) {
    console.error("❌ Migration error:", err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
