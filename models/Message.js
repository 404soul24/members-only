const pool = require('../config/db');

const Message = {
  async create({ title, text, userId }) {
    const result = await pool.query(
      'INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, text, userId]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT m.*, u.first_name, u.last_name
       FROM messages m
       JOIN users u ON m.user_id = u.id
       ORDER BY m.timestamp DESC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },
};

module.exports = Message;
