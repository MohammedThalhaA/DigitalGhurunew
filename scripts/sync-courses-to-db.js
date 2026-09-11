require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const data = {
  "ai-powered-digital-marketing": {
    title: "AI-Powered Digital Marketing Course",
    description: "Digital marketing combined with AI is rapidly transforming how businesses grow and compete.",
    price: 0,
    curriculum: [
      { module: "Module 1: Audience Research", topics: ["Understand the digital ecosystem and customer journey.", "Learn core marketing concepts and strategies.", "Identify target audience and business goals.", "Build a strong foundation in digital marketing."] },
      { module: "Module 2: AI Content Mastery", topics: ["Learn prompt engineering for content creation.", "Generate high-quality text, images, and videos using AI.", "Automate content creation for faster execution.", "Use tools like ChatGPT and Midjourney."] },
      { module: "Module 3: Social Media Marketing", topics: ["Plan and create engaging content strategies.", "Increase followers and audience engagement.", "Understand platform-specific growth techniques.", "Manage social media pages effectively."] },
      { module: "Module 4: Instagram Marketing", topics: ["Master Instagram algorithm and trends.", "Create high-performing reels and posts.", "Implement influencer marketing strategies.", "Optimize profile for better reach and engagement."] },
      { module: "Module 5: LinkedIn Marketing", topics: ["Build a strong personal brand.", "Generate B2B leads and connections.", "Create professional content strategies.", "Optimize LinkedIn profile for growth."] },
      { module: "Module 6: Landing Page & Funnel Building", topics: ["Create high-converting landing pages.", "Build sales funnels for lead generation.", "Understand user journey and conversions.", "Optimize pages for better performance."] },
      { module: "Module 7: Marketing Automation", topics: ["Automate email and WhatsApp marketing.", "Set up CRM tools and workflows.", "Save time with automation systems.", "Improve customer engagement and follow-ups."] },
      { module: "Module 8: Facebook & Instagram Ads", topics: ["Create ad campaigns for leads and sales.", "Target the right audience effectively.", "Analyze performance and optimize ads.", "Improve ROI with data-driven strategies."] },
      { module: "Module 9: Website Development", topics: ["Build websites using WordPress.", "Customize pages and design layouts.", "Create landing pages for campaigns.", "Optimize website performance."] },
      { module: "Module 10: Search Engine Optimization (SEO)", topics: ["Optimize website for search engines.", "Learn on-page and off-page SEO.", "Improve rankings and organic traffic.", "Perform basic technical SEO."] },
      { module: "Module 11: Search Engine Marketing (SEM)", topics: ["Run ads using Google Ads.", "Learn keyword targeting and bidding.", "Create high-converting PPC campaigns.", "Track and measure ad performance."] },
      { module: "Module 12: Digital Design Mastery", topics: ["Design creatives using Canva.", "Create social media posts and ad creatives.", "Build brand identity and visual content.", "Understand design principles."] }
    ]
  },
  "react-js-full-stack-development": {
    title: "React JS Full Stack Development Course",
    description: "In today's digital-first world, businesses demand fast, scalable, and highly interactive web applications.",
    price: 0,
    curriculum: [
      { module: "Module 1: Web Development Fundamentals", topics: ["Structuring content using semantic HTML", "Styling modern layouts using CSS (Flexbox & Grid)", "Creating responsive designs for mobile & desktop", "Introduction to JavaScript for interactivity"] },
      { module: "Module 2: Advanced JavaScript Programming", topics: ["ES6+ concepts (arrow functions, destructuring, modules)", "Execution context & closures", "DOM manipulation for dynamic UI", "Event-driven programming", "Asynchronous JavaScript (Promises, Async/Await)"] },
      { module: "Module 3: React JS – Frontend Mastery", topics: ["Component-based architecture", "JSX syntax and rendering logic", "Props & state management", "React Hooks (useState, useEffect)", "Routing for multi-page navigation", "API integration in React apps"] },
      { module: "Module 4: Backend Development with Node.js", topics: ["Node.js architecture and event loop", "Express.js for server creation", "Building RESTful APIs", "Middleware and request handling", "Error handling and debugging"] },
      { module: "Module 5: Database Management (MongoDB)", topics: ["NoSQL vs SQL concepts", "MongoDB collections and documents", "CRUD operations", "Schema design and validation", "Integration with backend"] },
      { module: "Module 6: Full Stack Application Development", topics: ["Connecting React with APIs", "Authentication & authorization systems", "State management across applications", "Deployment (hosting live apps)"] },
      { module: "Module 7: Capstone Project", topics: ["E-commerce application", "Admin dashboard system", "Booking or service platform"] }
    ]
  }
};

async function syncCourses() {
  console.log("🚀 Syncing courses to DB...");
  const client = await pool.connect();
  
  try {
    // 1. Add slug and marketing_data columns to courses
    await client.query(`
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS marketing_data JSONB DEFAULT '{}';
    `);

    // 2. Insert or update courses
    for (const [slug, course] of Object.entries(data)) {
      console.log(`Processing course: ${slug}`);
      
      const res = await client.query(
        `INSERT INTO courses (title, description, price, "isPublished", slug)
         VALUES ($1, $2, $3, true, $4)
         ON CONFLICT (slug) DO UPDATE SET title = $1, description = $2
         RETURNING id`,
        [course.title, course.description, course.price, slug]
      );
      const courseId = res.rows[0].id;

      // 3. Insert modules and chapters
      for (let m = 0; m < course.curriculum.length; m++) {
        const mod = course.curriculum[m];
        const modTitle = mod.module;
        
        // Find or create module
        let modRes = await client.query(
          `SELECT id FROM modules WHERE "courseId" = $1 AND title = $2`,
          [courseId, modTitle]
        );
        
        let moduleId;
        if (modRes.rows.length === 0) {
          const insertMod = await client.query(
            `INSERT INTO modules (title, position, "courseId") VALUES ($1, $2, $3) RETURNING id`,
            [modTitle, m + 1, courseId]
          );
          moduleId = insertMod.rows[0].id;
        } else {
          moduleId = modRes.rows[0].id;
        }

        // 4. Insert topics as chapters
        for (let t = 0; t < mod.topics.length; t++) {
          const topic = mod.topics[t];
          
          // check if chapter exists
          const chapRes = await client.query(
            `SELECT id FROM chapters WHERE "moduleId" = $1 AND title = $2`,
            [moduleId, topic]
          );

          if (chapRes.rows.length === 0) {
            await client.query(
              `INSERT INTO chapters (title, position, "moduleId", "isPublished")
               VALUES ($1, $2, $3, true)`,
              [topic, t + 1, moduleId]
            );
          }
        }
      }
    }
    
    console.log("✅ Successfully synced courses, modules, and chapters to DB.");
  } catch (err) {
    console.error("❌ Sync failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

syncCourses();
