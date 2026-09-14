const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/projects — list all projects, featured first
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM projects ORDER BY featured DESC, sort_order ASC, id ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id — single project
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects — add a new project
router.post('/', async (req, res) => {
  const { title, description, tech_stack, category, role, repo_url, demo_url, featured, sort_order } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO projects
        (title, description, tech_stack, category, role, repo_url, demo_url, featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        title,
        description,
        tech_stack || [],
        category || null,
        role || null,
        repo_url || null,
        demo_url || null,
        featured || false,
        sort_order || 0
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id — update a project
router.put('/:id', async (req, res) => {
  const { title, description, tech_stack, category, role, repo_url, demo_url, featured, sort_order } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE projects SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        tech_stack = COALESCE($3, tech_stack),
        category = COALESCE($4, category),
        role = COALESCE($5, role),
        repo_url = COALESCE($6, repo_url),
        demo_url = COALESCE($7, demo_url),
        featured = COALESCE($8, featured),
        sort_order = COALESCE($9, sort_order)
       WHERE id = $10 RETURNING *`,
      [title, description, tech_stack, category, role, repo_url, demo_url, featured, sort_order, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
