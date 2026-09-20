-- Members Only Database Schema
-- Run this SQL against your PostgreSQL instance

-- Drop existing tables if they exist
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS session CASCADE;

-- Users table
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  username    VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  membership  BOOLEAN DEFAULT FALSE,
  admin       BOOLEAN DEFAULT FALSE
);

-- Messages table
CREATE TABLE messages (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  text       TEXT NOT NULL,
  timestamp  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Session table for connect-pg-simple
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
