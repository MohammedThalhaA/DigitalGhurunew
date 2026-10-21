import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var pool: Pool | undefined;
}

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
} else {
  if (!global.pool) {
    global.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5, // Lower max in dev to prevent connection exhaustion during hot reloads
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  pool = global.pool;
}

pool.on("error", (err) => {
  console.error("Unexpected error on idle pg client:", err);
});

export default pool;
