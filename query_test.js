require('dotenv').config();
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect().then(async () => {
  const res = await client.query('SELECT id, title, slug, "isPublished" FROM courses ORDER BY id DESC LIMIT 10');
  console.log(res.rows);
  client.end();
});
