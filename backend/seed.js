// Creates tables (if needed) and seeds them with starter content.
// Run with: npm run seed

const fs = require('fs');
const path = require('path');
const pool = require('./db');

const projects = [
  {
    title: 'Campus Placement Management System',
    description:
      'A desktop application that streamlines campus placement drives. Scoped to a lean two-role (student/admin), four-module design covering registration, job postings, applications, and status tracking.',
    tech_stack: ['Java', 'Java Swing', 'MySQL', 'JDBC'],
    category: 'Desktop Application',
    role: 'Course project (Java OOP)',
    repo_url: '',
    demo_url: '',
    featured: true,
    sort_order: 1
  },
  {
    title: 'Offline-First E-Waste Collector & EPR Compliance Platform',
    description:
      'Hackathon project (Megathon, Reverse Logistics track) enabling informal e-waste collectors to log items offline and stay EPR-compliant. Includes a legality/recyclability check verified by an intermediate, automated rejection messages for ineligible items, and a WhatsApp-integrated chatbot so collectors can use the whole platform through chat.',
    tech_stack: ['Node.js', 'WhatsApp API', 'Offline-first sync', 'PostgreSQL'],
    category: 'Hackathon',
    role: 'Team project — Megathon, PS2',
    repo_url: '',
    demo_url: '',
    featured: true,
    sort_order: 2
  },
  {
    title: 'Solar-Powered PCM Vaccine Cold Chain',
    description:
      'A startup concept for vaccine cold-chain storage in rural and resource-limited settings, using phase-change materials (PCM) for passive thermal buffering, Peltier-based active cooling, and ESP32-based control logic for monitoring and regulation.',
    tech_stack: ['ESP32', 'Embedded C', 'PCM Thermal Design', 'Peltier Cooling'],
    category: 'Hardware / Startup Concept',
    role: 'Founder / technical design',
    repo_url: '',
    demo_url: '',
    featured: true,
    sort_order: 3
  }
];

const skills = [
  { name: 'Java', category: 'language', sort_order: 1 },
  { name: 'JavaScript', category: 'language', sort_order: 2 },
  { name: 'Python', category: 'language', sort_order: 3 },
  { name: 'Node.js / Express', category: 'framework', sort_order: 4 },
  { name: 'Java Swing', category: 'framework', sort_order: 5 },
  { name: 'MySQL', category: 'database', sort_order: 6 },
  { name: 'PostgreSQL', category: 'database', sort_order: 7 },
  { name: 'JDBC', category: 'tool', sort_order: 8 },
  { name: 'Git / GitHub', category: 'tool', sort_order: 9 },
  { name: 'Linux', category: 'tool', sort_order: 10 }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Applying schema...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);

    console.log('Clearing existing rows...');
    await client.query('TRUNCATE projects, skills RESTART IDENTITY;');

    console.log('Inserting projects...');
    for (const p of projects) {
      await client.query(
        `INSERT INTO projects
          (title, description, tech_stack, category, role, repo_url, demo_url, featured, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [p.title, p.description, p.tech_stack, p.category, p.role, p.repo_url, p.demo_url, p.featured, p.sort_order]
      );
    }

    console.log('Inserting skills...');
    for (const s of skills) {
      await client.query(
        `INSERT INTO skills (name, category, sort_order) VALUES ($1,$2,$3)`,
        [s.name, s.category, s.sort_order]
      );
    }

    console.log('Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
