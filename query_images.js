require('dotenv').config();
const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL);
client.connect().then(() => {
  client.query("SELECT id, title, marketing_data->>'cardImage' as card, marketing_data->>'thumbnail' as thumb, marketing_data->>'image' as img FROM courses").then(res => {
    console.log(res.rows);
    process.exit(0);
  });
});
