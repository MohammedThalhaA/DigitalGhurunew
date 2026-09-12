require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const defaultJobs = [
  {
    slug: "performance-marketing",
    title: "Senior Performance Marketing Executive",
    department: "Paid Media",
    experience: "2 - 5 Years",
    location: "Main Campus",
    type: "Full-Time",
    description: "We are looking for an analytical Paid Ads expert to formulate client campaign strategy, run Google & Meta ad setups, and mentor advanced mock agency batches.",
    responsibilities: JSON.stringify([
      "Plan, set up, and optimize search, social, and display campaigns on Google, Meta, & LinkedIn Ads.",
      "Analyze analytics funnels, tag parameters, and conversion metrics to maintain campaign ROAS.",
      "Collaborate with the training division to run mock agency ad campaigns and review student-led pitches.",
      "Prepare monthly presentation decks showing clear performance stats and optimization pathways."
    ]),
    requirements: JSON.stringify([
      "In-depth command of Google Analytics 4, Meta Ads Manager, and Google Tag Manager.",
      "Proven track record of managing monthly budgets of ₹2L+ with positive ROI metrics.",
      "Strong communication and leadership skills to train and coordinate fresh recruits & students.",
      "Any Google Ads Search/Display or Meta Blueprint certification is highly preferred."
    ])
  },
  {
    slug: "seo-trainer",
    title: "SEO Specialist & Mentor",
    department: "Organic Growth",
    experience: "1 - 3 Years",
    location: "Our Campus / Hybrid",
    type: "Full-Time",
    description: "Join us to shape organic visibility. You will manage client SEO audits, drive content marketing pipelines, and lead classroom sessions on technical and off-page SEO.",
    responsibilities: JSON.stringify([
      "Execute full website audits (screaming frog audits, structural tags, internal linking structures).",
      "Draft content keyword maps and keyword clusters for client blogs and landing pages.",
      "Conduct daily interactive classes teaching SEO basics, keyword research, and on-page tactics.",
      "Direct outreach link-building campaigns and coordinate guest posting distributions."
    ]),
    requirements: JSON.stringify([
      "Experience with Ahrefs, SEMrush, Screaming Frog, and Google Search Console.",
      "Strong understanding of PageSpeed parameters and core web vitals optimization.",
      "A passion for teaching and explaining complex search ranking concepts to freshers.",
      "Basic understanding of Answer Engine Optimization (AEO) and AI overview optimization."
    ])
  },
  {
    slug: "content-writer",
    title: "Creative Content Strategist & Prompt Writer",
    department: "Content & Copy",
    experience: "1 - 2 Years",
    location: "Main Campus",
    type: "Full-Time",
    description: "Write copy that hooks and convert! You will handle copy for campaigns, social channels, and train students to leverage generative AI writing tools safely.",
    responsibilities: JSON.stringify([
      "Draft creative landing page copies, ad copies for paid channels, and marketing emails.",
      "Manage social media calendars, writing engaging hooks and descriptions for Instagram & LinkedIn.",
      "Incorporate generative AI prompts (ChatGPT, Claude) to scale research and format briefs.",
      "Review student copy submissions and teach prompt structures (CRAFT framework)."
    ]),
    requirements: JSON.stringify([
      "Portfolio showcasing landing page, email campaign, or creative social copywriting.",
      "Command over AI content drafting, editing, and prompt structures.",
      "Impeccable grammar, storytelling capacity, and active interest in digital trends.",
      "Familiarity with Canva or basic visual layout formatting is a plus."
    ])
  },
  {
    slug: "sales-counselor",
    title: "Admissions Counselor & Sales Associate",
    department: "Admissions",
    experience: "0 - 2 Years (Freshers welcome)",
    location: "Main Campus",
    type: "Full-Time",
    description: "Interact with eager minds and help them find their perfect career path. You will address course queries, coordinate demo sessions, and manage lead registers.",
    responsibilities: JSON.stringify([
      "Handle inbound course queries via phone, WhatsApp, and face-to-face walk-ins.",
      "Counsel students & parents on career pathways, syllabus structures, and placement opportunities.",
      "Coordinate weekly free demo classes and track attendee conversions in the CRM register.",
      "Engage with alumni networks to request success stories and program feedback reviews."
    ]),
    requirements: JSON.stringify([
      "Excellent interpersonal, counseling, and phone conversation skills.",
      "Empathetic listening skills to align students' ambitions to our course offerings.",
      "Basic familiarity with CRM software registers, Excel, and office tools.",
      "Prior experience in educational admissions sales or counseling is a big advantage."
    ])
  }
];

async function setupCareers() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create careers table
    console.log("Creating careers table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        department VARCHAR(100) NOT NULL,
        experience VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        responsibilities JSONB NOT NULL DEFAULT '[]',
        requirements JSONB NOT NULL DEFAULT '[]',
        "isActive" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create applications table
    console.log("Creating job_applications table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "careerSlug" VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        bio TEXT,
        status VARCHAR(50) DEFAULT 'PENDING',
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Seed default jobs
    console.log("Seeding default jobs...");
    for (const job of defaultJobs) {
      await client.query(`
        INSERT INTO careers (slug, title, department, experience, location, type, description, responsibilities, requirements)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET 
          title = EXCLUDED.title,
          department = EXCLUDED.department,
          description = EXCLUDED.description
      `, [
        job.slug, job.title, job.department, job.experience, job.location, job.type, job.description, job.responsibilities, job.requirements
      ]);
    }

    await client.query('COMMIT');
    console.log("Migration complete!");
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error migrating:", error);
  } finally {
    client.release();
    pool.end();
  }
}

setupCareers();
