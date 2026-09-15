import pool from "./db";

export interface PlatformSettings {
  platform_name?: string;
  support_email?: string;
  smtp_host?: string;
  smtp_port?: string;
  smtp_user?: string;
  smtp_password?: string;
  razorpay_key_id?: string;
  razorpay_key_secret?: string;
}

/**
 * Fetches all platform settings from the database.
 */
export async function getPlatformSettings(): Promise<PlatformSettings> {
  try {
    const res = await pool.query("SELECT key, value FROM platform_settings");
    const settings = res.rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
    return settings;
  } catch (error) {
    console.error("Failed to fetch platform settings from DB:", error);
    return {};
  }
}
