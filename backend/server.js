require('dotenv').config();
const express = require('express');
const cors = require('cors');

const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const messagesRouter = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins.includes('*') ? true : allowedOrigins
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/messages', messagesRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Portfolio API running on port ${PORT}`);
});
