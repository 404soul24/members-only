const pool = require('../config/db');

const User = {
  async create({ firstName, lastName, username, password }) {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, username, password]
    );
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async updateMembership(id, membership) {
    const result = await pool.query(
      'UPDATE users SET membership = $1 WHERE id = $2 RETURNING *',
      [membership, id]
    );
    return result.rows[0];
  },

  async updateAdmin(id, admin) {
    const result = await pool.query(
      'UPDATE users SET admin = $1 WHERE id = $2 RETURNING *',
      [admin, id]
    );
    return result.rows[0];
  },
};

module.exports = User;
