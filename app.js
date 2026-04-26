/* ══════════════════════════════════════════════════
   RESUME MAKER PRO — app.js
   ══════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────
const state = {
  education:      [],
  experience:     [],
  projects:       [],
  certifications: [],
  languages:      [],
  skills: {
    tech: [],
    soft: [],
    tool: []
  }
};

// ──────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────
function v(el) {
  return el ? el.value.trim() : '';
}

function $(id) {
  return document.getElementById(id);
}

// ──────────────────────────────────────────────────
// TAB SWITCHING
// ──────────────────────────────────────────────────
function switchTab(name, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  $('sec-' + name).classList.add('active');
  btn.classList.add('active');
}

// ──────────────────────────────────────────────────
// SKILLS
// ──────────────────────────────────────────────────
function addSkill(type) {
  const input = $(type + 'SkillInput');
  const raw   = input.value.trim();
  if (!raw) return;

  raw.split(',').forEach(chunk => {
    const s = chunk.trim();
    if (s && !state.skills[type].includes(s)) {
      state.skills[type].push(s);
    }
  });

  input.value = '';
  renderSkillTags(type);
  update();
}

function removeSkill(type, idx) {
  state.skills[type].splice(idx, 1);
  renderSkillTags(type);
  update();
}

function renderSkillTags(type) {
  const el = $(type + '-tags');
  el.innerHTML = state.skills[type]
    .map((s, i) =>
      `<span class="skill-tag">
        ${s}
        <span class="rm" onclick="removeSkill('${type}', ${i})">✕</span>
      </span>`
    )
    .join('');
}

// ──────────────────────────────────────────────────
// GENERIC ENTRY HELPERS
// ──────────────────────────────────────────────────
function updateEntry(type, idx, key, val) {
  state[type][idx][key] = val;
  update();
}

function removeEntry(type, idx) {
  state[type].splice(idx, 1);
  const renders = {
    education:      renderEduEntries,
    experience:     renderExpEntries,
    projects:       renderProjEntries,
    certifications: renderCertEntries,
    languages:      renderLangEntries
  };
  renders[type]();
  update();
}

// ──────────────────────────────────────────────────
// EDUCATION
// ──────────────────────────────────────────────────
function addEducation() {
  state.education.push({ degree: '', field: '', school: '', year: '', gpa: '' });
  renderEduEntries();
}

function renderEduEntries() {
  $('edu-entries').innerHTML = state.education
    .map((e, i) => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span class="entry-label">Education #${i + 1}</span>
          <button class="remove-btn" onclick="removeEntry('education', ${i})">Remove</button>
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>Degree / Level</label>
            <input type="text" placeholder="B.Tech / M.Sc / MBA"
              value="${e.degree}"
              oninput="updateEntry('education', ${i}, 'degree', this.value)">
          </div>
          <div class="field">
            <label>Field of Study</label>
            <input type="text" placeholder="Computer Science"
              value="${e.field}"
              oninput="updateEntry('education', ${i}, 'field', this.value)">
          </div>
        </div>

        <div class="field">
          <label>School / University</label>
          <input type="text" placeholder="IIT Roorkee"
            value="${e.school}"
            oninput="updateEntry('education', ${i}, 'school', this.value)">
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>Year of Passing</label>
            <input type="text" placeholder="2024"
              value="${e.year}"
              oninput="updateEntry('education', ${i}, 'year', this.value)">
          </div>
          <div class="field">
            <label>CGPA / % / Grade</label>
            <input type="text" placeholder="8.5 CGPA"
              value="${e.gpa}"
              oninput="updateEntry('education', ${i}, 'gpa', this.value)">
          </div>
        </div>
      </div>
    `)
    .join('');
  update();
}

// ──────────────────────────────────────────────────
// EXPERIENCE
// ──────────────────────────────────────────────────
function addExperience() {
  state.experience.push({ role: '', company: '', location: '', from: '', to: '', description: '' });
  renderExpEntries();
}

function renderExpEntries() {
  $('exp-entries').innerHTML = state.experience
    .map((e, i) => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span class="entry-label">Experience #${i + 1}</span>
          <button class="remove-btn" onclick="removeEntry('experience', ${i})">Remove</button>
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>Job Title</label>
            <input type="text" placeholder="Software Engineer"
              value="${e.role}"
              oninput="updateEntry('experience', ${i}, 'role', this.value)">
          </div>
          <div class="field">
            <label>Company</label>
            <input type="text" placeholder="Tech Corp Ltd"
              value="${e.company}"
              oninput="updateEntry('experience', ${i}, 'company', this.value)">
          </div>
        </div>

        <div class="field">
          <label>Location</label>
          <input type="text" placeholder="Bangalore, India / Remote"
            value="${e.location}"
            oninput="updateEntry('experience', ${i}, 'location', this.value)">
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>From</label>
            <input type="text" placeholder="Jun 2022"
              value="${e.from}"
              oninput="updateEntry('experience', ${i}, 'from', this.value)">
          </div>
          <div class="field">
            <label>To (or "Present")</label>
            <input type="text" placeholder="Present"
              value="${e.to}"
              oninput="updateEntry('experience', ${i}, 'to', this.value)">
          </div>
        </div>

        <div class="field">
          <label>Responsibilities &amp; Achievements</label>
          <textarea placeholder="• Led development of RESTful APIs serving 50k daily users&#10;• Reduced load time by 40% via caching"
            oninput="updateEntry('experience', ${i}, 'description', this.value)">${e.description}</textarea>
        </div>
      </div>
    `)
    .join('');
  update();
}

// ──────────────────────────────────────────────────
// PROJECTS
// ──────────────────────────────────────────────────
function addProject() {
  state.projects.push({ name: '', tech: '', description: '', link: '' });
  renderProjEntries();
}

function renderProjEntries() {
  $('proj-entries').innerHTML = state.projects
    .map((p, i) => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span class="entry-label">Project #${i + 1}</span>
          <button class="remove-btn" onclick="removeEntry('projects', ${i})">Remove</button>
        </div>

        <div class="field">
          <label>Project Name</label>
          <input type="text" placeholder="E-Commerce Platform"
            value="${p.name}"
            oninput="updateEntry('projects', ${i}, 'name', this.value)">
        </div>

        <div class="field">
          <label>Tech Stack</label>
          <input type="text" placeholder="React, Node.js, MongoDB"
            value="${p.tech}"
            oninput="updateEntry('projects', ${i}, 'tech', this.value)">
        </div>

        <div class="field">
          <label>Description</label>
          <textarea placeholder="Built a full-stack e-commerce platform with payment integration..."
            oninput="updateEntry('projects', ${i}, 'description', this.value)">${p.description}</textarea>
        </div>

        <div class="field">
          <label>GitHub / Live Link</label>
          <input type="url" placeholder="github.com/user/project"
            value="${p.link}"
            oninput="updateEntry('projects', ${i}, 'link', this.value)">
        </div>
      </div>
    `)
    .join('');
  update();
}

// ──────────────────────────────────────────────────
// CERTIFICATIONS
// ──────────────────────────────────────────────────
function addCertification() {
  state.certifications.push({ name: '', org: '', date: '' });
  renderCertEntries();
}

function renderCertEntries() {
  $('cert-entries').innerHTML = state.certifications
    .map((c, i) => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span class="entry-label">Cert #${i + 1}</span>
          <button class="remove-btn" onclick="removeEntry('certifications', ${i})">Remove</button>
        </div>

        <div class="field">
          <label>Certification Name</label>
          <input type="text" placeholder="AWS Solutions Architect"
            value="${c.name}"
            oninput="updateEntry('certifications', ${i}, 'name', this.value)">
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>Issuing Organization</label>
            <input type="text" placeholder="Amazon Web Services"
              value="${c.org}"
              oninput="updateEntry('certifications', ${i}, 'org', this.value)">
          </div>
          <div class="field">
            <label>Date / Year</label>
            <input type="text" placeholder="2023"
              value="${c.date}"
              oninput="updateEntry('certifications', ${i}, 'date', this.value)">
          </div>
        </div>
      </div>
    `)
    .join('');
  update();
}

// ──────────────────────────────────────────────────
// LANGUAGES
// ──────────────────────────────────────────────────
function addLanguage() {
  state.languages.push({ name: '', level: 'Fluent' });
  renderLangEntries();
}

function renderLangEntries() {
  const levels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

  $('lang-entries').innerHTML = state.languages
    .map((l, i) => `
      <div class="entry-card">
        <div class="entry-card-header">
          <span class="entry-label">Language #${i + 1}</span>
          <button class="remove-btn" onclick="removeEntry('languages', ${i})">Remove</button>
        </div>

        <div class="row cols-2">
          <div class="field">
            <label>Language</label>
            <input type="text" placeholder="Hindi"
              value="${l.name}"
              oninput="updateEntry('languages', ${i}, 'name', this.value)">
          </div>
          <div class="field">
            <label>Proficiency</label>
            <select onchange="updateEntry('languages', ${i}, 'level', this.value)">
              ${levels.map(lv => `<option value="${lv}" ${l.level === lv ? 'selected' : ''}>${lv}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
    `)
    .join('');
  update();
}

// ──────────────────────────────────────────────────
// RESUME RENDER — live preview update
// ──────────────────────────────────────────────────
function update() {
  const fn = v($('firstName'));
  const ln = v($('lastName'));
  const fullName = (fn + ' ' + ln).trim() || 'Your Name';

  /* ── Header ── */
  $('r-name').textContent  = fullName;
  $('r-title').textContent = v($('jobTitle')) || 'Professional Title';

  /* Avatar */
  const initials    = ((fn[0] || '') + (ln[0] || '')).toUpperCase() || 'A';
  const avatarImg   = $('r-avatar');
  const avatarPH    = $('r-avatar-placeholder');
  avatarPH.textContent = initials;

  const photo = v($('photoUrl'));
  if (photo) {
    avatarImg.src = photo;
    avatarImg.classList.add('visible');
    avatarPH.style.display = 'none';
  } else {
    avatarImg.classList.remove('visible');
    avatarPH.style.display = '';
  }

  /* Contact bar */
  const email   = v($('email'));
  const phone   = v($('phone'));
  const city    = v($('city'));
  const region  = v($('state'));
  const linkedin = v($('linkedin'));
  const github  = v($('github'));
  const website = v($('website'));

  const contacts = [];
  if (email)           contacts.push(contactItem('✉', email));
  if (phone)           contacts.push(contactItem('📞', phone));
  if (city || region)  contacts.push(contactItem('📍', [city, region].filter(Boolean).join(', ')));
  if (linkedin)        contacts.push(contactItem('in', linkedin.replace(/^https?:\/\//, '')));
  if (github)          contacts.push(contactItem('⌥', github.replace(/^https?:\/\//, '')));
  if (website)         contacts.push(contactItem('🌐', website.replace(/^https?:\/\//, '')));

  $('r-contacts').innerHTML = contacts.join('');

  /* ── Objective ── */
  const obj = v($('objective'));
  const objSection = $('r-obj-section');
  if (obj) {
    objSection.style.display = '';
    $('r-obj').textContent = obj;
  } else {
    objSection.style.display = 'none';
  }

  /* ── Experience ── */
  const expSection = $('r-exp-section');
  if (state.experience.length) {
    expSection.style.display = '';
    $('r-exp-list').innerHTML = state.experience.map(e => {
      const dateRange  = [e.from, e.to].filter(Boolean).join(' – ');
      const descLines  = e.description ? e.description.split('\n').filter(l => l.trim()) : [];

      return `<div class="r-exp-item">
        <div class="r-exp-header">
          <div>
            <div class="r-exp-title">${e.role || 'Position'}</div>
            <div class="r-exp-company">
              ${e.company || ''}${e.location ? ' · ' + e.location : ''}
            </div>
          </div>
          <div class="r-exp-dates">${dateRange}</div>
        </div>
        ${descLines.length
          ? `<div class="r-exp-desc"><ul>
              ${descLines.map(l => `<li>${l.replace(/^[•\-]\s*/, '')}</li>`).join('')}
             </ul></div>`
          : ''}
      </div>`;
    }).join('');
  } else {
    expSection.style.display = 'none';
  }

  /* ── Education ── */
  const eduSection = $('r-edu-section');
  if (state.education.length) {
    eduSection.style.display = '';
    $('r-edu-list').innerHTML = state.education.map(e => `
      <div class="r-edu-item">
        <div class="r-edu-degree">${[e.degree, e.field].filter(Boolean).join(' in ')}</div>
        <div class="r-edu-school">${e.school || ''}</div>
        ${e.year ? `<div class="r-edu-year">${e.year}</div>` : ''}
        ${e.gpa  ? `<div class="r-edu-gpa">${e.gpa}</div>`   : ''}
      </div>
    `).join('');
  } else {
    eduSection.style.display = 'none';
  }

  /* ── Skills ── */
  const skillsSection = $('r-skills-section');
  const hasSkills = state.skills.tech.length || state.skills.soft.length || state.skills.tool.length;

  if (hasSkills) {
    skillsSection.style.display = '';
    let html = '';
    if (state.skills.tech.length) html += skillGroup('Technical', state.skills.tech);
    if (state.skills.tool.length) html += skillGroup('Tools',     state.skills.tool);
    if (state.skills.soft.length) html += skillGroup('Soft Skills', state.skills.soft);
    $('r-skills-content').innerHTML = html;
  } else {
    skillsSection.style.display = 'none';
  }

  /* ── Projects ── */
  const projSection = $('r-proj-section');
  if (state.projects.length) {
    projSection.style.display = '';
    $('r-proj-list').innerHTML = state.projects.map(p => `
      <div class="r-proj-item">
        <div class="r-proj-name">${p.name || 'Project'}</div>
        ${p.tech        ? `<div class="r-proj-tech">${p.tech}</div>`        : ''}
        ${p.description ? `<div class="r-proj-desc">${p.description}</div>` : ''}
        ${p.link        ? `<div class="r-proj-link">${p.link.replace(/^https?:\/\//, '')}</div>` : ''}
      </div>
    `).join('');
  } else {
    projSection.style.display = 'none';
  }

  /* ── Certifications ── */
  const certSection = $('r-cert-section');
  if (state.certifications.length) {
    certSection.style.display = '';
    $('r-cert-list').innerHTML = state.certifications.map(c => `
      <div class="r-cert-item">
        <div class="r-cert-name">${c.name || 'Certification'}</div>
        ${c.org  ? `<div class="r-cert-org">${c.org}</div>`   : ''}
        ${c.date ? `<div class="r-cert-date">${c.date}</div>` : ''}
      </div>
    `).join('');
  } else {
    certSection.style.display = 'none';
  }

  /* ── Languages ── */
  const langSection = $('r-lang-section');
  if (state.languages.length) {
    langSection.style.display = '';
    $('r-lang-list').innerHTML = state.languages.map(l => `
      <div class="r-lang-item">
        <span class="r-lang-name">${l.name || 'Language'}</span>
        <span class="r-lang-level">${l.level}</span>
      </div>
    `).join('');
  } else {
    langSection.style.display = 'none';
  }

  /* ── Hobbies ── */
  const hobbySection = $('r-hobby-section');
  const hobbies = v($('hobbies'));
  if (hobbies) {
    hobbySection.style.display = '';
    $('r-hobby-list').innerHTML = hobbies
      .split(',')
      .map(h => h.trim())
      .filter(Boolean)
      .map(h => `<span class="r-interest-tag">${h}</span>`)
      .join('');
  } else {
    hobbySection.style.display = 'none';
  }
}

// ──────────────────────────────────────────────────
// TEMPLATE HELPERS
// ──────────────────────────────────────────────────
function contactItem(icon, text) {
  return `<span class="resume-contact-item"><span class="ci">${icon}</span>${text}</span>`;
}

function skillGroup(label, items) {
  return `<div class="r-skills-group">
    <div class="r-skills-label">${label}</div>
    <div class="r-skill-tags">
      ${items.map(s => `<span class="r-skill-tag">${s}</span>`).join('')}
    </div>
  </div>`;
}

// ──────────────────────────────────────────────────
// DOWNLOAD / PRINT
// ──────────────────────────────────────────────────
function downloadResume() {
  window.print();
}

// ──────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  update();
});
