require("dotenv").config({ path: ".env" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    console.log("Setting up platform_settings table...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS platform_settings (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert some default settings if they don't exist
    const defaultSettings = [
      { key: "platform_name", value: "Digital Ghuru" },
      { key: "support_email", value: "support@digitalghuru.in" },
      { key: "smtp_host", value: "" },
      { key: "smtp_port", value: "587" },
      { key: "smtp_user", value: "" },
      { key: "smtp_password", value: "" },
      { key: "razorpay_key_id", value: "" },
      { key: "razorpay_key_secret", value: "" },
    ];

    for (const setting of defaultSettings) {
      await client.query(
        `INSERT INTO platform_settings (key, value) 
         VALUES ($1, $2) 
         ON CONFLICT (key) DO NOTHING`,
        [setting.key, setting.value]
      );
    }

    await client.query("COMMIT");
    console.log("platform_settings table setup complete!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error setting up table:", error);
  } finally {
    client.release();
    pool.end();
  }
}

main();
