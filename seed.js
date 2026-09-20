const bcrypt = require('bcryptjs');
const pool = require('./config/db');
require('dotenv').config();

async function seed() {
  try {
    const password = await bcrypt.hash('password123', 10);

    const users = [
      { firstName: 'Alice', lastName: 'Johnson', username: 'alice@example.com', membership: true, admin: true },
      { firstName: 'Bob', lastName: 'Smith', username: 'bob@example.com', membership: true, admin: false },
      { firstName: 'Charlie', lastName: 'Brown', username: 'charlie@example.com', membership: false, admin: false },
      { firstName: 'Diana', lastName: 'Prince', username: 'diana@example.com', membership: true, admin: false },
      { firstName: 'Eve', lastName: 'Davis', username: 'eve@example.com', membership: false, admin: false },
    ];

    for (const user of users) {
      await pool.query(
        'INSERT INTO users (first_name, last_name, username, password, membership, admin) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (username) DO NOTHING',
        [user.firstName, user.lastName, user.username, password, user.membership, user.admin]
      );
    }

    const alice = await pool.query('SELECT id FROM users WHERE username = $1', ['alice@example.com']);
    const bob = await pool.query('SELECT id FROM users WHERE username = $1', ['bob@example.com']);
    const diana = await pool.query('SELECT id FROM users WHERE username = $1', ['diana@example.com']);

    const messages = [
      { title: 'Welcome to the Club!', text: 'This is a private club for verified members only. Enjoy your stay and follow the rules.', userId: alice.rows[0].id },
      { title: 'Meeting Tomorrow', text: 'There will be a meeting tomorrow at 3 PM. All members are expected to attend.', userId: bob.rows[0].id },
      { title: 'New Guidelines', text: 'Please review the new community guidelines posted on the bulletin board. Respect others and keep it friendly.', userId: alice.rows[0].id },
      { title: 'Happy Friday!', text: 'Hope everyone has a great weekend planned. Stay safe out there!', userId: diana.rows[0].id },
      { title: 'Lost and Found', text: 'Found a blue jacket near the entrance. If it is yours, please claim it at the front desk.', userId: bob.rows[0].id },
    ];

    for (const msg of messages) {
      await pool.query(
        'INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)',
        [msg.title, msg.text, msg.userId]
      );
    }

    console.log('Seed complete! Created 5 users and 5 messages.');
    console.log('Login credentials (all use password: password123):');
    console.log('  alice@example.com (admin, member)');
    console.log('  bob@example.com (member)');
    console.log('  charlie@example.com (regular)');
    console.log('  diana@example.com (member)');
    console.log('  eve@example.com (regular)');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
