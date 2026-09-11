require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  console.log("Connecting to Database...");
  const client = await pool.connect();
  
  try {
    console.log("Creating tables...");
    
    // ─── NEXTAUTH TABLES ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        password TEXT,
        role VARCHAR(50) DEFAULT 'STUDENT'
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,
        UNIQUE(provider, "providerAccountId")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMPTZ NOT NULL,
        "sessionToken" VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS verification_token (
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,
        PRIMARY KEY (identifier, token)
      );
    `);

    // ─── LMS CORE TABLES ───
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        "imageUrl" TEXT,
        price DECIMAL(10,2),
        "isPublished" BOOLEAN DEFAULT false,
        "instructorId" INTEGER REFERENCES users(id),
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS modules (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        position INTEGER NOT NULL,
        "courseId" INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS chapters (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        "videoUrl" TEXT,
        "pdfUrl" TEXT,
        position INTEGER NOT NULL,
        "isPublished" BOOLEAN DEFAULT false,
        "isFree" BOOLEAN DEFAULT false,
        "moduleId" INTEGER REFERENCES modules(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "courseId" INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        "pricePaid" DECIMAL(10,2),
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE("userId", "courseId")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "chapterId" INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
        "isCompleted" BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE("userId", "chapterId")
      );
    `);

    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS streak_count INTEGER DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'PDF',
        "courseId" INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS discussions (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "courseId" INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS community_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "likes" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id SERIAL PRIMARY KEY,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'OPEN',
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log("✅ Successfully created raw PostgreSQL tables for LMS and NextAuth.");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    client.release();
    pool.end();
  }
}

initDB();
