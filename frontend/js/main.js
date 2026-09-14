document.getElementById('year').textContent = new Date().getFullYear();

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Request failed');
    const projects = await res.json();

    if (projects.length === 0) {
      grid.innerHTML = '<p>No projects yet.</p>';
      return;
    }

    grid.innerHTML = projects.map(renderProjectCard).join('');
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="error">Could not load projects. Is the backend running?</p>';
  }
}

function renderProjectCard(p, index) {
  const tech = (p.tech_stack || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  const links = [
    p.repo_url ? `<a href="${escapeAttr(p.repo_url)}" target="_blank" rel="noopener">Code</a>` : '',
    p.demo_url ? `<a href="${escapeAttr(p.demo_url)}" target="_blank" rel="noopener">Demo</a>` : ''
  ].filter(Boolean).join('<span class="link-sep"></span>');

  return `
    <article class="card">
      <div class="card-head">
        <h3>${escapeHtml(p.title)}</h3>
        ${p.category ? `<span class="category">${escapeHtml(p.category)}</span>` : ''}
      </div>
      ${p.role ? `<p class="role">${escapeHtml(p.role)}</p>` : ''}
      <p class="desc">${escapeHtml(p.description)}</p>
      <div class="tags">${tech}</div>
      ${links ? `<p class="links">${links}</p>` : ''}
    </article>
  `;
}

async function loadSkills() {
  const list = document.getElementById('skills-list');
  try {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Request failed');
    const skills = await res.json();

    if (skills.length === 0) {
      list.innerHTML = '<p>No skills listed yet.</p>';
      return;
    }

    list.innerHTML = skills.map((s) => `<span class="skill-pill">${escapeHtml(s.name)}</span>`).join('');
  } catch (err) {
    console.error(err);
    list.innerHTML = '<p class="error">Could not load skills. Is the backend running?</p>';
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeAttr(str) {
  return escapeHtml(str);
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('contact-status');
  const form = e.target;
  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  status.textContent = 'Sending…';
  try {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Request failed');
    status.textContent = 'Message sent. Thanks!';
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong. Please try again later.';
  }
});

loadProjects();
loadSkills();
