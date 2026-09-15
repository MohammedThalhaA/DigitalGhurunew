require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedTestEnrollment() {
  const client = await pool.connect();
  try {
    console.log("🔍 Looking up user: mohammedthalha177@gmail.com ...");
    
    const userRes = await client.query(
      `SELECT id, name, email FROM users WHERE email = $1`,
      ["mohammedthalha177@gmail.com"]
    );

    if (userRes.rows.length === 0) {
      console.error("❌ User mohammedthalha177@gmail.com not found in the database.");
      console.log("   Make sure you've signed up with this email first.");
      return;
    }

    const user = userRes.rows[0];
    console.log(`✅ Found user: ${user.name} (ID: ${user.id})`);

    // Find all published courses
    const coursesRes = await client.query(
      `SELECT id, title FROM courses WHERE "isPublished" = true ORDER BY id ASC`
    );

    if (coursesRes.rows.length === 0) {
      console.error("❌ No published courses found. Create a course in Admin first.");
      return;
    }

    console.log(`📚 Found ${coursesRes.rows.length} published course(s):`);
    coursesRes.rows.forEach(c => console.log(`   - [${c.id}] ${c.title}`));

    // Enroll the user in ALL published courses
    for (const course of coursesRes.rows) {
      const existingEnrollment = await client.query(
        `SELECT id FROM enrollments WHERE "userId" = $1 AND "courseId" = $2`,
        [user.id, course.id]
      );

      if (existingEnrollment.rows.length > 0) {
        console.log(`⚡ Already enrolled in "${course.title}" — skipping.`);
        continue;
      }

      // Get course price
      const priceRes = await client.query(`SELECT price FROM courses WHERE id = $1`, [course.id]);
      const price = priceRes.rows[0]?.price || 0;

      await client.query(
        `INSERT INTO enrollments ("userId", "courseId", "pricePaid", "createdAt") VALUES ($1, $2, $3, NOW())`,
        [user.id, course.id, price]
      );
      console.log(`✅ Enrolled in "${course.title}" (₹${price})`);

      // Now seed some progress — mark first ~50% of chapters as completed
      const chaptersRes = await client.query(
        `SELECT ch.id FROM chapters ch 
         JOIN modules m ON ch."moduleId" = m.id 
         WHERE m."courseId" = $1 
         ORDER BY m.position ASC, ch.position ASC`,
        [course.id]
      );

      const totalChapters = chaptersRes.rows.length;
      const halfMark = Math.floor(totalChapters / 2);

      if (totalChapters > 0) {
        for (let i = 0; i < halfMark; i++) {
          await client.query(
            `INSERT INTO user_progress ("userId", "chapterId", "isCompleted", "createdAt", "updatedAt")
             VALUES ($1, $2, true, NOW(), NOW())
             ON CONFLICT ("userId", "chapterId") DO UPDATE SET "isCompleted" = true, "updatedAt" = NOW()`,
            [user.id, chaptersRes.rows[i].id]
          );
        }
        console.log(`   📊 Marked ${halfMark}/${totalChapters} chapters as completed for realistic progress.`);
      } else {
        console.log(`   ℹ️  No chapters found for this course yet. Upload modules from Admin to test the player.`);
      }
    }

    console.log("\n🎉 Done! Login as mohammedthalha177@gmail.com to see your enrolled courses.");
    console.log("   Then upload test video(s) from Admin → Courses → Edit → Modules/Chapters.");
    console.log("   Visit /student/learn/{courseId} to test the video player.\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedTestEnrollment();
