require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query("SELECT * FROM users")
  .then(res => {
    console.log("Current users:");
    console.table(res.rows.map(r => ({ id: r.id, name: r.name, email: r.email, role: r.role })));
    
    // Fix Demo Student if needed
    const demoStudent = res.rows.find(r => r.email === 'student@demo.com');
    if (demoStudent && demoStudent.role !== 'STUDENT') {
      console.log("Fixing Demo Student role to STUDENT...");
      return pool.query("UPDATE users SET role = 'STUDENT' WHERE email = 'student@demo.com'");
    }
    
    // If no users, or missing Demo Admin
    const demoAdmin = res.rows.find(r => r.email === 'admin@demo.com');
    if (!demoAdmin) {
      console.log("Adding Demo Admin...");
      const bcrypt = require('bcrypt');
      return bcrypt.hash('password123', 10).then(hashed => {
        return pool.query(
          "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
          ['Demo Admin', 'admin@demo.com', hashed, 'ADMIN']
        );
      });
    }
  })
  .then(() => {
    console.log('DB checks complete.');
    return pool.end();
  })
  .catch(console.error);
