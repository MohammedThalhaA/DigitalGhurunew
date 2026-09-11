const path = require('path');
const pg = require(path.join(process.cwd(), 'node_modules', 'pg'));

const connectionString = "postgresql://neondb_owner:npg_ASjH9uZ2qagO@ep-bitter-mode-awe9xu57-pooler.c-12.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function clean() {
  try {
    await pool.query('DELETE FROM courses WHERE id NOT IN (1, 2)');
    const res = await pool.query('SELECT id, title, slug, "isPublished" FROM courses ORDER BY id ASC');
    console.log('Active DB Courses:', res.rows);
  } catch (err) {
    console.error('Error cleaning courses:', err);
  } finally {
    await pool.end();
  }
}

clean();
