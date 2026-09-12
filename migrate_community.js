const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require' });

async function migrate() {
  try {
    console.log("Adding tags to community_posts...");
    await pool.query(`ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]';`);
    
    console.log("Creating community_replies...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS community_replies (
        id SERIAL PRIMARY KEY,
        "postId" INTEGER NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
        "userId" INTEGER NOT NULL,
        content TEXT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("Creating community_likes...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS community_likes (
        "postId" INTEGER NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
        "userId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("postId", "userId")
      );
    `);
    
    console.log("Migration successful");
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
migrate();
