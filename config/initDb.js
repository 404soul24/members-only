const pool = require('./config/db');

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        first_name  VARCHAR(100) NOT NULL,
        last_name   VARCHAR(100) NOT NULL,
        username    VARCHAR(255) NOT NULL UNIQUE,
        password    VARCHAR(255) NOT NULL,
        membership  BOOLEAN DEFAULT FALSE,
        admin       BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS messages (
        id         SERIAL PRIMARY KEY,
        title      VARCHAR(255) NOT NULL,
        text       TEXT NOT NULL,
        timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
      );

      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
    console.log('Database schema initialized');
  } catch (err) {
    console.error('Database initialization error:', err.message);
  }
}

module.exports = initDatabase;
