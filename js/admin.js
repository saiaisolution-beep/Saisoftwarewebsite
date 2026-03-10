// ============================================
// TechVista — CMS Admin Panel JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Load data from localStorage or use defaults
  let cmsData = loadData();

  initNavigation();
  initSaveButton();
  initSidebarToggle();
  renderDashboard();

  // ---- Navigation ----
  function initNavigation() {
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const section = btn.dataset.section;
        document.getElementById('admin-page-title').textContent = btn.textContent.trim();
        renderSection(section);

        // Close sidebar on mobile
        document.getElementById('admin-sidebar').classList.remove('open');
      });
    });
  }

  function initSaveButton() {
    document.getElementById('save-all-btn').addEventListener('click', () => {
      saveData(cmsData);
      showToast('Changes saved successfully!');
    });
  }

  function initSidebarToggle() {
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
      document.getElementById('admin-sidebar').classList.toggle('open');
    });
  }

  // ---- Render Sections ----
  function renderSection(section) {
    switch (section) {
      case 'dashboard': renderDashboard(); break;
      case 'company': renderCompanyEditor(); break;
      case 'hero': renderHeroEditor(); break;
      case 'services': renderServicesEditor(); break;
      case 'portfolio': renderPortfolioEditor(); break;
      case 'team': renderTeamEditor(); break;
      case 'testimonials': renderTestimonialsEditor(); break;
      case 'faq': renderFAQEditor(); break;
      case 'contact': renderContactEditor(); break;
    }
  }

  // ---- Dashboard ----
  function renderDashboard() {
    const content = document.getElementById('admin-content');
    content.innerHTML = `
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">🚀</div>
          <div class="card-number">${cmsData.services.length}</div>
          <div class="card-label">Services</div>
        </div>
        <div class="dashboard-card">
          <div class="card-icon">💼</div>
          <div class="card-number">${cmsData.portfolio.length}</div>
          <div class="card-label">Projects</div>
        </div>
        <div class="dashboard-card">
          <div class="card-icon">👥</div>
          <div class="card-number">${cmsData.team.length}</div>
          <div class="card-label">Team Members</div>
        </div>
        <div class="dashboard-card">
          <div class="card-icon">⭐</div>
          <div class="card-number">${cmsData.testimonials.length}</div>
          <div class="card-label">Testimonials</div>
        </div>
      </div>
      <div class="dashboard-info">
        <h3>📋 CMS Guide</h3>
        <p>Welcome to the Sai Softwares CMS Admin Panel. Here you can manage all the content displayed on your website.</p>
        <ul>
          <li><strong>Company Info</strong> — Update company name, tagline, contact details, and social links</li>
          <li><strong>Hero Section</strong> — Edit the main landing section headline, description, and CTAs</li>
          <li><strong>Services</strong> — Manage your services, their descriptions, features, and technologies</li>
          <li><strong>Portfolio</strong> — Add, edit, or remove projects from your portfolio showcase</li>
          <li><strong>Team</strong> — Manage team members, roles, and bios</li>
          <li><strong>Testimonials</strong> — Update client testimonials and ratings</li>
          <li><strong>FAQ</strong> — Edit frequently asked questions and answers</li>
          <li><strong>Contact</strong> — Configure the contact form and company contact information</li>
        </ul>
        <p style="margin-top:16px; color:var(--primary-300);"><strong>💡 Tip:</strong> Click "Save Changes" in the top bar after making edits. Changes are saved to your browser's local storage and will persist across sessions.</p>
      </div>
    `;
  }

  // ---- Company Info Editor ----
  function renderCompanyEditor() {
    const c = cmsData.company;
    const content = document.getElementById('admin-content');
    content.innerHTML = `
      <div class="admin-form-section">
        <h3>🏢 Company Details</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group">
            <label>Company Name</label>
            <input type="text" class="admin-input" data-path="company.name" value="${esc(c.name)}">
          </div>
          <div class="admin-form-group">
            <label>Tagline</label>
            <input type="text" class="admin-input" data-path="company.tagline" value="${esc(c.tagline)}">
          </div>
          <div class="admin-form-group full-width">
            <label>Description</label>
            <textarea class="admin-textarea" data-path="company.description">${esc(c.description)}</textarea>
          </div>
          <div class="admin-form-group">
            <label>Email</label>
            <input type="email" class="admin-input" data-path="company.email" value="${esc(c.email)}">
          </div>
          <div class="admin-form-group">
            <label>Phone</label>
            <input type="tel" class="admin-input" data-path="company.phone" value="${esc(c.phone)}">
          </div>
          <div class="admin-form-group full-width">
            <label>Address</label>
            <input type="text" class="admin-input" data-path="company.address" value="${esc(c.address)}">
          </div>
        </div>
      </div>

      <div class="admin-form-section">
        <h3>📊 Statistics</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group">
            <label>Years of Experience</label>
            <input type="number" class="admin-input" data-path="company.experienceYears" value="${c.experienceYears}">
          </div>
          <div class="admin-form-group">
            <label>Projects Completed</label>
            <input type="number" class="admin-input" data-path="company.projectsCompleted" value="${c.projectsCompleted}">
          </div>
          <div class="admin-form-group">
            <label>Clients Satisfied</label>
            <input type="number" class="admin-input" data-path="company.clientsSatisfied" value="${c.clientsSatisfied}">
          </div>
          <div class="admin-form-group">
            <label>Team Members</label>
            <input type="number" class="admin-input" data-path="company.teamMembers" value="${c.teamMembers}">
          </div>
          <div class="admin-form-group">
            <label>Founded Year</label>
            <input type="number" class="admin-input" data-path="company.founded" value="${c.founded}">
          </div>
        </div>
      </div>

      <div class="admin-form-section">
        <h3>🔗 Social Links</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group">
            <label>LinkedIn URL</label>
            <input type="url" class="admin-input" data-path="company.socialLinks.linkedin" value="${esc(c.socialLinks.linkedin)}">
          </div>
          <div class="admin-form-group">
            <label>GitHub URL</label>
            <input type="url" class="admin-input" data-path="company.socialLinks.github" value="${esc(c.socialLinks.github)}">
          </div>
          <div class="admin-form-group">
            <label>Twitter / X URL</label>
            <input type="url" class="admin-input" data-path="company.socialLinks.twitter" value="${esc(c.socialLinks.twitter)}">
          </div>
          <div class="admin-form-group">
            <label>Instagram URL</label>
            <input type="url" class="admin-input" data-path="company.socialLinks.instagram" value="${esc(c.socialLinks.instagram)}">
          </div>
        </div>
      </div>
    `;
    initFormBindings();
  }

  // ---- Hero Editor ----
  function renderHeroEditor() {
    const h = cmsData.hero;
    const content = document.getElementById('admin-content');
    content.innerHTML = `
      <div class="admin-form-section">
        <h3>🎯 Hero Content</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group full-width">
            <label>Headline</label>
            <input type="text" class="admin-input" data-path="hero.headline" value="${esc(h.headline)}">
          </div>
          <div class="admin-form-group full-width">
            <label>Subheadline</label>
            <input type="text" class="admin-input" data-path="hero.subheadline" value="${esc(h.subheadline)}">
          </div>
          <div class="admin-form-group full-width">
            <label>Description</label>
            <textarea class="admin-textarea" data-path="hero.description">${esc(h.description)}</textarea>
          </div>
        </div>
      </div>
      <div class="admin-form-section">
        <h3>🔘 Call-to-Action Buttons</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group">
            <label>Primary CTA Label</label>
            <input type="text" class="admin-input" data-path="hero.ctaPrimary.label" value="${esc(h.ctaPrimary.label)}">
          </div>
          <div class="admin-form-group">
            <label>Primary CTA Link</label>
            <input type="text" class="admin-input" data-path="hero.ctaPrimary.href" value="${esc(h.ctaPrimary.href)}">
          </div>
          <div class="admin-form-group">
            <label>Secondary CTA Label</label>
            <input type="text" class="admin-input" data-path="hero.ctaSecondary.label" value="${esc(h.ctaSecondary.label)}">
          </div>
          <div class="admin-form-group">
            <label>Secondary CTA Link</label>
            <input type="text" class="admin-input" data-path="hero.ctaSecondary.href" value="${esc(h.ctaSecondary.href)}">
          </div>
        </div>
      </div>
    `;
    initFormBindings();
  }

  // ---- Services Editor ----
  function renderServicesEditor() {
    const content = document.getElementById('admin-content');
    const items = cmsData.services.map((svc, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-header">
          <h4><span class="admin-icon-preview">${getIconHTML(svc.icon)}</span> ${svc.title}</h4>
          <div class="admin-list-actions">
            <button class="admin-btn-icon expand-btn" data-index="${i}" title="Edit">✏️</button>
            <button class="admin-btn-icon delete" data-type="services" data-index="${i}" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="admin-collapse">
          <div class="admin-collapse-inner">
            <div class="admin-form-grid">
              <div class="admin-form-group">
                <label>Title</label>
                <input type="text" class="admin-input" data-array-path="services.${i}.title" value="${esc(svc.title)}">
              </div>
              <div class="admin-form-group">
                <label>Icon (Emoji or Path)</label>
                <input type="text" class="admin-input" data-array-path="services.${i}.icon" value="${svc.icon}">
              </div>
              <div class="admin-form-group full-width">
                <label>Short Description</label>
                <textarea class="admin-textarea" data-array-path="services.${i}.shortDesc">${esc(svc.shortDesc)}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Page Intro (Detail Page)</label>
                <textarea class="admin-textarea" data-array-path="services.${i}.detailedContent.intro">${esc(svc.detailedContent?.intro || '')}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Features (one per line)</label>
                <textarea class="admin-textarea" data-array-path="services.${i}.features" data-type="array">${svc.features.join('\n')}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Specialties (one per line)</label>
                <textarea class="admin-textarea" data-array-path="services.${i}.detailedContent.specialties" data-type="array">${svc.detailedContent?.specialties?.join('\n') || ''}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Technologies (comma-separated)</label>
                <input type="text" class="admin-input" data-array-path="services.${i}.technologies" data-type="csv" value="${svc.technologies.join(', ')}">
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="admin-list">
        ${items}
        <button class="add-item-btn" id="add-service">+ Add New Service</button>
      </div>
    `;

    initExpandButtons();
    initDeleteButtons();
    initArrayFormBindings();

    document.getElementById('add-service').addEventListener('click', () => {
      cmsData.services.push({
        id: `new-${Date.now()}`,
        icon: '🆕',
        title: 'New Service',
        shortDesc: 'Short description.',
        description: 'Detailed description.',
        detailedContent: {
          intro: 'Welcome to this service detail.',
          process: [],
          specialties: []
        },
        features: [],
        technologies: []
      });
      renderServicesEditor();
    });
  }

  // ---- Portfolio Editor ----
  function renderPortfolioEditor() {
    const content = document.getElementById('admin-content');
    const categoryLabels = { app: '📱 App', web: '🌐 Web', server: '🖥️ Server' };

    const items = cmsData.portfolio.map((proj, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-header">
          <h4>${categoryLabels[proj.category] || '💼'} ${proj.title}</h4>
          <div class="admin-list-actions">
            <button class="admin-btn-icon expand-btn" data-index="${i}" title="Edit">✏️</button>
            <button class="admin-btn-icon delete" data-type="portfolio" data-index="${i}" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="admin-collapse">
          <div class="admin-collapse-inner">
            <div class="admin-form-grid">
              <div class="admin-form-group">
                <label>Title</label>
                <input type="text" class="admin-input" data-array-path="portfolio.${i}.title" value="${esc(proj.title)}">
              </div>
              <div class="admin-form-group">
                <label>Category</label>
                <select class="admin-input" data-array-path="portfolio.${i}.category">
                  <option value="app" ${proj.category === 'app' ? 'selected' : ''}>App Development</option>
                  <option value="web" ${proj.category === 'web' ? 'selected' : ''}>Web Development</option>
                  <option value="server" ${proj.category === 'server' ? 'selected' : ''}>Server Management</option>
                </select>
              </div>
              <div class="admin-form-group full-width">
                <label>Short Description (Grid)</label>
                <textarea class="admin-textarea" data-array-path="portfolio.${i}.description">${esc(proj.description)}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Detailed Description (Page)</label>
                <textarea class="admin-textarea" data-array-path="portfolio.${i}.detailedDescription">${esc(proj.detailedDescription || '')}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Strategic Challenge</label>
                <textarea class="admin-textarea" data-array-path="portfolio.${i}.challenge">${esc(proj.challenge || '')}</textarea>
              </div>
              <div class="admin-form-group full-width">
                <label>Key Outcomes (one per line)</label>
                <textarea class="admin-textarea" data-array-path="portfolio.${i}.outcomes" data-type="array">${proj.outcomes?.join('\n') || ''}</textarea>
              </div>
              <div class="admin-form-group">
                <label>Client</label>
                <input type="text" class="admin-input" data-array-path="portfolio.${i}.client" value="${esc(proj.client)}">
              </div>
              <div class="admin-form-group">
                <label>Year</label>
                <input type="number" class="admin-input" data-array-path="portfolio.${i}.year" value="${proj.year}">
              </div>
              <div class="admin-form-group">
                <label>Duration</label>
                <input type="text" class="admin-input" data-array-path="portfolio.${i}.duration" value="${esc(proj.duration)}">
              </div>
              <div class="admin-form-group">
                <label>Technologies (comma-separated)</label>
                <input type="text" class="admin-input" data-array-path="portfolio.${i}.technologies" data-type="csv" value="${proj.technologies.join(', ')}">
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="admin-list">
        ${items}
        <button class="add-item-btn" id="add-project">+ Add New Project</button>
      </div>
    `;

    initExpandButtons();
    initDeleteButtons();
    initArrayFormBindings();

    document.getElementById('add-project').addEventListener('click', () => {
      cmsData.portfolio.push({
        id: Date.now(),
        title: 'New Project',
        category: 'web',
        description: 'Short grid description.',
        detailedDescription: 'Full case study solution text.',
        challenge: 'The technical challenge addressed.',
        outcomes: ['Impact 1', 'Impact 2'],
        technologies: [],
        duration: '3 months',
        year: new Date().getFullYear(),
        client: 'Client Name',
        image: null
      });
      renderPortfolioEditor();
    });
  }

  // ---- Team Editor ----
  function renderTeamEditor() {
    const content = document.getElementById('admin-content');
    const items = cmsData.team.map((member, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-header">
          <h4>👤 ${member.name} — ${member.role}</h4>
          <div class="admin-list-actions">
            <button class="admin-btn-icon expand-btn" data-index="${i}" title="Edit">✏️</button>
            <button class="admin-btn-icon delete" data-type="team" data-index="${i}" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="admin-collapse">
          <div class="admin-collapse-inner">
            <div class="admin-form-grid">
              <div class="admin-form-group">
                <label>Name</label>
                <input type="text" class="admin-input" data-array-path="team.${i}.name" value="${esc(member.name)}">
              </div>
              <div class="admin-form-group">
                <label>Role</label>
                <input type="text" class="admin-input" data-array-path="team.${i}.role" value="${esc(member.role)}">
              </div>
              <div class="admin-form-group full-width">
                <label>Bio</label>
                <textarea class="admin-textarea" data-array-path="team.${i}.bio">${esc(member.bio)}</textarea>
              </div>
              <div class="admin-form-group">
                <label>LinkedIn URL</label>
                <input type="url" class="admin-input" data-array-path="team.${i}.social.linkedin" value="${esc(member.social.linkedin)}">
              </div>
              <div class="admin-form-group">
                <label>GitHub URL</label>
                <input type="url" class="admin-input" data-array-path="team.${i}.social.github" value="${esc(member.social.github)}">
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="admin-list">
        ${items}
        <button class="add-item-btn" id="add-member">+ Add New Team Member</button>
      </div>
    `;

    initExpandButtons();
    initDeleteButtons();
    initArrayFormBindings();

    document.getElementById('add-member').addEventListener('click', () => {
      cmsData.team.push({
        name: 'New Member',
        role: 'Role Title',
        bio: 'Bio description goes here.',
        avatar: null,
        social: { linkedin: '#', github: '#' }
      });
      renderTeamEditor();
    });
  }

  // ---- Testimonials Editor ----
  function renderTestimonialsEditor() {
    const content = document.getElementById('admin-content');
    const items = cmsData.testimonials.map((t, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-header">
          <h4>⭐ ${t.name} — ${t.company}</h4>
          <div class="admin-list-actions">
            <button class="admin-btn-icon expand-btn" data-index="${i}" title="Edit">✏️</button>
            <button class="admin-btn-icon delete" data-type="testimonials" data-index="${i}" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="admin-collapse">
          <div class="admin-collapse-inner">
            <div class="admin-form-grid">
              <div class="admin-form-group">
                <label>Name</label>
                <input type="text" class="admin-input" data-array-path="testimonials.${i}.name" value="${esc(t.name)}">
              </div>
              <div class="admin-form-group">
                <label>Company</label>
                <input type="text" class="admin-input" data-array-path="testimonials.${i}.company" value="${esc(t.company)}">
              </div>
              <div class="admin-form-group">
                <label>Role</label>
                <input type="text" class="admin-input" data-array-path="testimonials.${i}.role" value="${esc(t.role)}">
              </div>
              <div class="admin-form-group">
                <label>Rating (1-5)</label>
                <input type="number" min="1" max="5" class="admin-input" data-array-path="testimonials.${i}.rating" value="${t.rating}">
              </div>
              <div class="admin-form-group full-width">
                <label>Quote</label>
                <textarea class="admin-textarea" data-array-path="testimonials.${i}.quote">${esc(t.quote)}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="admin-list">
        ${items}
        <button class="add-item-btn" id="add-testimonial">+ Add New Testimonial</button>
      </div>
    `;

    initExpandButtons();
    initDeleteButtons();
    initArrayFormBindings();

    document.getElementById('add-testimonial').addEventListener('click', () => {
      cmsData.testimonials.push({
        name: 'Client Name',
        company: 'Company Name',
        role: 'CEO',
        quote: 'Your testimonial quote here...',
        rating: 5,
        avatar: null
      });
      renderTestimonialsEditor();
    });
  }

  // ---- FAQ Editor ----
  function renderFAQEditor() {
    const content = document.getElementById('admin-content');
    const items = cmsData.faq.map((item, i) => `
      <div class="admin-list-item" data-index="${i}">
        <div class="admin-list-header">
          <h4>❓ ${item.question.substring(0, 50)}${item.question.length > 50 ? '...' : ''}</h4>
          <div class="admin-list-actions">
            <button class="admin-btn-icon expand-btn" data-index="${i}" title="Edit">✏️</button>
            <button class="admin-btn-icon delete" data-type="faq" data-index="${i}" title="Delete">🗑️</button>
          </div>
        </div>
        <div class="admin-collapse">
          <div class="admin-collapse-inner">
            <div class="admin-form-grid">
              <div class="admin-form-group full-width">
                <label>Question</label>
                <input type="text" class="admin-input" data-array-path="faq.${i}.question" value="${esc(item.question)}">
              </div>
              <div class="admin-form-group full-width">
                <label>Answer</label>
                <textarea class="admin-textarea" data-array-path="faq.${i}.answer">${esc(item.answer)}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="admin-list">
        ${items}
        <button class="add-item-btn" id="add-faq">+ Add New FAQ</button>
      </div>
    `;

    initExpandButtons();
    initDeleteButtons();
    initArrayFormBindings();

    document.getElementById('add-faq').addEventListener('click', () => {
      cmsData.faq.push({
        question: 'New question?',
        answer: 'The answer goes here.'
      });
      renderFAQEditor();
    });
  }

  // ---- Contact Editor ----
  function renderContactEditor() {
    const cf = cmsData.contactForm;
    const content = document.getElementById('admin-content');
    content.innerHTML = `
      <div class="admin-form-section">
        <h3>💬 Contact Form Settings</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group full-width">
            <label>Heading</label>
            <input type="text" class="admin-input" data-path="contactForm.heading" value="${esc(cf.heading)}">
          </div>
          <div class="admin-form-group full-width">
            <label>Subheading</label>
            <textarea class="admin-textarea" data-path="contactForm.subheading">${esc(cf.subheading)}</textarea>
          </div>
        </div>
      </div>

      <div class="admin-form-section">
        <h3>📝 Footer Settings</h3>
        <div class="admin-form-grid">
          <div class="admin-form-group full-width">
            <label>Copyright Text</label>
            <input type="text" class="admin-input" data-path="footer.copyright" value="${esc(cmsData.footer.copyright)}">
          </div>
        </div>
      </div>
    `;
    initFormBindings();
  }

  // ============================================
  // DATA BINDING HELPERS
  // ============================================

  function initFormBindings() {
    document.querySelectorAll('[data-path]').forEach(el => {
      const handler = el.tagName === 'TEXTAREA' ? 'input' : 'change';
      el.addEventListener(handler, () => {
        setNestedValue(cmsData, el.dataset.path, el.value);
      });
    });
  }

  function initArrayFormBindings() {
    document.querySelectorAll('[data-array-path]').forEach(el => {
      el.addEventListener('input', () => {
        const path = el.dataset.arrayPath;
        let value = el.value;
        if (el.dataset.type === 'array') {
          value = el.value.split('\n').filter(v => v.trim());
        } else if (el.dataset.type === 'csv') {
          value = el.value.split(',').map(v => v.trim()).filter(Boolean);
        } else if (el.type === 'number') {
          value = parseInt(el.value) || 0;
        }
        setNestedValue(cmsData, path, value);
      });
    });
  }

  function initExpandButtons() {
    document.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.admin-list-item');
        item.classList.toggle('expanded');
      });
    });
  }

  function initDeleteButtons() {
    document.querySelectorAll('.admin-btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const index = parseInt(btn.dataset.index);
        if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
          cmsData[type].splice(index, 1);
          renderSection(type);
        }
      });
    });
  }

  // ---- Utility functions ----
  function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(keys[i]) ? keys[i] : parseInt(keys[i]);
      if (!current[key]) current[key] = {};
      current = current[key];
    }
    const lastKey = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : parseInt(keys[keys.length - 1]);
    current[lastKey] = value;
  }

  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- localStorage persistence ----
  function loadData() {
    const stored = localStorage.getItem('sai_softwares_cms_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored CMS data, using defaults.');
      }
    }
    return JSON.parse(JSON.stringify(window.CMS_DATA));
  }

  function saveData(data) {
    localStorage.setItem('sai_softwares_cms_data', JSON.stringify(data));
    window.CMS_DATA = data;
  }

  function showToast(message) {
    const toast = document.getElementById('admin-toast');
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /**
   * Utility to render either an emoji or an image as an icon
   */
  function getIconHTML(icon) {
    if (!icon) return '';
    if (icon.includes('.') || icon.startsWith('data:') || icon.startsWith('images/')) {
      return `<img src="${icon}" style="width:24px; height:24px; object-fit:contain; vertical-align:middle;" alt="Icon">`;
    }
    return icon;
  }
});
