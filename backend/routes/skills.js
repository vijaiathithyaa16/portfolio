const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM skills ORDER BY category ASC, sort_order ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

module.exports = router;
