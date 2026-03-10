// ============================================
// TechVista — Main Application JavaScript
// Renders all content from CMS_DATA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Load data from localStorage or use defaults
  const cmsData = loadData();
  window.CMS_DATA = cmsData;

  // Identify current page correctly
  const path = window.location.pathname;
  let pageName = path.split("/").pop();
  if (!pageName || pageName === "" || pageName === "/") pageName = "index.html";

  console.log("Routing - Path:", path, "Identified Page:", pageName);

  // Initialize Global Components
  safeRender(() => renderNavigation(cmsData, pageName));
  safeRender(() => initHeaderScroll());
  safeRender(() => initMobileMenu());
  safeRender(() => initBackToTop());
  safeRender(() => renderFloatingUI(cmsData));

  // Page-specific rendering
  if (pageName === "index.html" || pageName.startsWith("index") || pageName === "") {
    safeRender(() => renderHero(cmsData));
    safeRender(() => renderAboutSection(cmsData));
    safeRender(() => renderServices(cmsData, true));
    safeRender(() => renderTechnologies(cmsData));
    safeRender(() => renderPortfolio(cmsData, true));
    safeRender(() => renderTestimonials(cmsData));
    safeRender(() => renderFAQ(cmsData));
    safeRender(() => renderContact(cmsData));
    safeRender(() => startParticleEffect());
  } else if (pageName === "services.html" || pageName === "services") {
    safeRender(() => renderServicesGrid(cmsData));
  } else if (pageName === "portfolio.html" || pageName === "portfolio") {
    safeRender(() => renderPortfolioGrid(cmsData));
  } else if (pageName === "about.html" || pageName === "about") {
    safeRender(() => renderAboutPage(cmsData));
  } else if (pageName.startsWith("service-detail")) {
    safeRender(() => renderServiceDetail(cmsData));
  } else if (pageName.startsWith("project-detail")) {
    safeRender(() => renderProjectDetail(cmsData));
  }

  safeRender(() => renderFooter(cmsData, pageName));
  safeRender(() => initCountAnimations());
  safeRender(() => initScrollAnimations());
});

function safeRender(fn) {
  try {
    fn();
  } catch (e) {
    console.warn("Rendering section skipped or failed:", e);
  }
}

// ---- NAVIGATION ----
function renderNavigation(data, page) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const isHomePage = page === "index.html" || page === "";

  const links = data.navigation.map(item => {
    let href = item.href;
    if (!isHomePage && href.startsWith('#')) {
      href = 'index.html' + href;
    }
    return `<a href="${href}">${item.label}</a>`;
  }).join('');

  nav.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo-icon">SS</div>
        <span>${data.company.name}</span>
      </a>
      <nav class="nav-links" id="nav-links">
        ${links}
        <a href="index.html#contact" class="btn btn-primary btn-sm nav-cta">Get Started</a>
      </nav>
      <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
}

// ---- HERO ---- (Main Page Only)
function renderHero(data) {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    <div class="hero-bg-grid"></div>
    <div class="hero-orb hero-orb-1"></div>
    <div class="hero-orb hero-orb-2"></div>
    <div class="hero-orb hero-orb-3"></div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          Trusted by ${data.company.clientsSatisfied}+ businesses worldwide
        </div>
        <p class="hero-subtitle">${data.hero.subheadline}</p>
        <h1>${data.hero.headline.replace('Digital Solutions', '<span class="gradient-text">Digital Solutions</span>')}</h1>
        <p class="hero-description">${data.hero.description}</p>
        <div class="hero-actions">
          <a href="${data.hero.ctaPrimary.href}" class="btn btn-primary">${data.hero.ctaPrimary.label} →</a>
          <a href="${data.hero.ctaSecondary.href}" class="btn btn-secondary">${data.hero.ctaSecondary.label}</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="stat-number" data-count="${data.company.experienceYears}">0+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number" data-count="${data.company.projectsCompleted}">0+</div>
            <div class="stat-label">Projects Delivered</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number" data-count="${data.company.clientsSatisfied}">0+</div>
            <div class="stat-label">Happy Clients</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-code-window">
          <div class="code-window-header">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-window-title">techvista.config.ts</span>
          </div>
          <div class="code-window-body">
            <div class="code-line"><span class="code-keyword">const</span> <span class="code-variable">techVista</span> <span class="code-punctuation">=</span> <span class="code-bracket">{</span></div>
            <div class="code-line">&nbsp;&nbsp;<span class="code-string">services</span><span class="code-punctuation">:</span> <span class="code-bracket">[</span><span class="code-string">"app"</span>, <span class="code-string">"web"</span>, <span class="code-string">"server"</span><span class="code-bracket">]</span>,</div>
            <div class="code-line">&nbsp;&nbsp;<span class="code-string">experience</span><span class="code-punctuation">:</span> <span class="code-number">${data.company.experienceYears}</span>,</div>
            <div class="code-line">&nbsp;&nbsp;<span class="code-string">quality</span><span class="code-punctuation">:</span> <span class="code-string">"premium"</span>,</div>
            <div class="code-line"><span class="code-bracket">}</span><span class="code-punctuation">;</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- SERVICES (Home/Grid/Detail) ----
function renderServices(data, summary = false) {
  const section = document.getElementById('services');
  if (!section) return;

  const cards = data.services.map((svc, i) => `
    <div class="service-card reveal reveal-delay-${i + 1}">
      <div class="service-icon">${getIconHTML(svc.icon)}</div>
      <h3>${svc.title}</h3>
      <p>${svc.shortDesc}</p>
      <div class="service-tech-tags">
        ${svc.technologies.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <a href="service-detail.html?id=${svc.id}" class="btn btn-primary btn-sm" style="margin-top:24px;">View Details →</a>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">🚀 EXPERTISE</span>
        <h2 class="section-title">Our Solutions</h2>
        <p class="section-subtitle">We bridge the gap between complex technology and business success.</p>
      </div>
      <div class="services-grid">${cards}</div>
      ${summary ? `<div style="text-align:center; margin-top:40px;"><a href="services.html" class="btn btn-secondary">View All Services</a></div>` : ''}
    </div>
  `;
}

// ---- TECHNOLOGIES ----
function renderTechnologies(data) {
  const section = document.getElementById('technologies');
  if (!section) return;

  const categories = data.technologies.categories.map(cat => `
    <div class="tech-category reveal">
      <h3>${cat.name}</h3>
      <div class="tech-grid">
        ${cat.items.map(item => `
          <div class="tech-item">
            <span class="tech-emoji">${item.icon}</span>
            <span class="tech-name">${item.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">⚙️ STACK</span>
        <h2 class="section-title">Technologies We Use</h2>
        <p class="section-subtitle">We work with best-in-class tools to deliver high-performance results.</p>
      </div>
      <div class="tech-categories">${categories}</div>
    </div>
  `;
}

function renderServicesGrid(data) {
  const container = document.getElementById('services-grid-container');
  if (!container) {
    console.error("Services grid container not found!");
    return;
  }

  const items = data.services.map(svc => `
        <div class="service-detail-card glass-card reveal">
            <div class="row" style="display:flex; gap:40px; align-items:center;">
                <div style="flex:1;">
                    <div class="service-icon" style="font-size:3rem; margin-bottom:20px;">${getIconHTML(svc.icon)}</div>
                    <h2 style="font-size:2.5rem; margin-bottom:16px; line-height:1.2;">${svc.title}</h2>
                    <p style="color:var(--text-secondary); font-size:1.1rem; line-height:1.8; margin-bottom:24px;">${svc.description}</p>
                    <div class="service-tech-tags" style="margin-top:24px;">
                        ${svc.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                <div style="flex:1; background:rgba(255,255,255,0.03); padding:40px; border-radius:24px;">
                    <h4 style="margin-bottom:20px; color:var(--primary-300); font-size:1.3rem;">Key Highlights</h4>
                    <ul class="service-features" style="gap:16px; margin-top:24px;">
                        ${svc.features.map(f => `<li style="font-size:1rem;">${f}</li>`).join('')}
                    </ul>
                    <a href="service-detail.html?id=${svc.id}" class="btn btn-primary" style="margin-top:32px; padding:14px 28px;">Detailed Case Study</a>
                </div>
            </div>
        </div>
    `).join('<div style="height:60px;"></div>');

  container.innerHTML = `
        <div class="container" style="padding:100px 24px;">
            <div class="section-header reveal" style="margin-bottom:80px;">
                <span class="section-badge">DETAILED SERVICES</span>
                <h1 class="section-title" style="font-size:clamp(3rem, 8vw, 5rem); line-height:1.1;">Everything We Build</h1>
                <p class="section-subtitle" style="max-width:800px; margin-left:auto; margin-right:auto;">Professional digital engineering backed by 5+ years of industry experience.</p>
            </div>
            ${items}
        </div>
    `;
}

function renderServiceDetail(data) {
  const container = document.getElementById('service-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || data.services[0].id;
  const svc = data.services.find(s => s.id === id);

  if (!svc) {
    container.innerHTML = "<h1>Service not found</h1>";
    return;
  }

  const process = svc.detailedContent.process.map(p => `
        <div class="process-item reveal">
            <h4>${p.title}</h4>
            <p>${p.desc}</p>
        </div>
    `).join('');

  container.innerHTML = `
        <section class="section" style="padding-top:120px; padding-bottom:80px;">
            <div class="container">
                <div class="service-detail-header">
                    <div class="service-detail-icon reveal">${getIconHTML(svc.icon)}</div>
                    <div class="reveal">
                        <span class="section-badge">SERVICES / ${svc.title.toUpperCase()}</span>
                        <h1 style="font-size:clamp(3rem, 8vw, 5.5rem); line-height:1.1; margin-top:20px;">${svc.title}</h1>
                        <p class="lead" style="font-size:1.4rem; max-width:900px; margin-top:24px;">${svc.detailedContent.intro}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--surface-900); padding:100px 0;">
            <div class="container">
                <div class="service-detail-content-grid">
                    <div class="reveal">
                        <h2 class="section-title" style="font-size:3.2rem; line-height:1.2;">Our Specialized Approach</h2>
                        <p style="color:var(--text-secondary); margin-bottom:32px; font-size:1.1rem; line-height:1.8;">${svc.description}</p>
                        <div class="process-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:32px; margin-top:40px;">
                            ${process}
                        </div>
                    </div>
                    <div class="reveal glass-card" style="padding:40px; border-radius:24px;">
                        <h3 style="margin-bottom:24px; font-size:1.8rem;">Industry Specialties</h3>
                        <ul class="service-features" style="gap:20px; margin-top:24px;">
                            ${svc.detailedContent.specialties.map(s => `<li style="font-size:1.1rem;">${s}</li>`).join('')}
                        </ul>
                        <div style="margin-top:40px;">
                            <h4 style="margin-bottom:16px; font-size:1.3rem;">Technologies Used</h4>
                            <div class="service-tech-tags" style="margin-top:16px;">
                                ${svc.technologies.map(t => `<span class="tech-tag" style="padding:8px 16px;">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; margin-top:80px;">
                   <a href="index.html#contact" class="btn btn-primary btn-lg" style="padding:16px 32px;">Start Your ${svc.title} Project</a>
                </div>
            </div>
        </section>
    `;
}

// ---- PORTFOLIO ----
function renderPortfolio(data, summary = false) {
  const section = document.getElementById('portfolio');
  if (!section) return;

  const projects = data.portfolio.slice(0, summary ? 3 : undefined).map((proj, i) => `
    <div class="project-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="project-image">
        <div class="project-image-placeholder ${proj.category}">${proj.category === 'app' ? '📱' : proj.category === 'web' ? '🌐' : '🖥️'}</div>
      </div>
      <div class="project-body">
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="project-tech">
          ${proj.technologies.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
        </div>
        <a href="project-detail.html?id=${proj.id}" class="view-project-link">View Case Study →</a>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">PORTFOLIO</span>
        <h2 class="section-title">Recent Success Stories</h2>
        <p class="section-subtitle">A showcase of the complex challenges we've conquered for our clients.</p>
      </div>
      <div class="portfolio-grid">${projects}</div>
      ${summary ? `<div style="text-align:center; margin-top:40px;"><a href="portfolio.html" class="btn btn-secondary">View Complete Portfolio</a></div>` : ''}
    </div>
  `;
}

function renderPortfolioGrid(data) {
  const container = document.getElementById('portfolio-grid-container');
  if (!container) return;

  const items = data.portfolio.map(proj => `
        <div class="glass-card reveal" style="margin-bottom:60px;">
            <div style="display:grid; grid-template-columns: 400px 1fr; gap:64px; align-items:center;">
                <div style="height:350px; border-radius:32px; display:flex; align-items:center; justify-content:center; font-size:4.5rem;" class="project-image-placeholder ${proj.category}">
                   ${proj.category === 'app' ? '📱' : proj.category === 'web' ? '🌐' : '🖥️'}
                </div>
                <div>
                    <span style="color:var(--primary-400); font-weight:700; text-transform:uppercase; font-size:0.8rem; letter-spacing:1px;">Case Study — ${proj.year}</span>
                    <h2 style="font-size:3.5rem; margin:14px 0; line-height:1.1;">${proj.title}</h2>
                    <p style="color:var(--text-secondary); margin-bottom:36px; font-size:1.2rem; line-height:1.7; max-width:700px;">${proj.description}</p>
                    <div style="display:flex; flex-wrap:wrap; gap:12px; margin-bottom:44px;">
                        ${proj.technologies.map(t => `<span class="tech-tag" style="padding:10px 20px; font-weight:500;">${t}</span>`).join('')}
                    </div>
                    <a href="project-detail.html?id=${proj.id}" class="btn btn-primary" style="padding:16px 32px;">Examine Case Study</a>
                </div>
            </div>
        </div>
    `).join('');

  container.innerHTML = `
        <div class="container" style="padding:120px 24px;">
            <div class="section-header reveal" style="text-align:center; max-width:900px; margin:0 auto 100px auto;">
                <span class="section-badge">OVER 5 YEARS OF IMPACT</span>
                <h1 style="font-size:clamp(3.5rem, 9vw, 6rem); line-height:1; margin-top:20px;">Engineering Success Stories</h1>
            </div>
            ${items}
        </div>
    `;
}

function renderProjectDetail(data) {
  const container = document.getElementById('project-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || data.portfolio[0].id;
  const project = data.portfolio.find(p => p.id === id);

  if (!project) {
    container.innerHTML = "<div class='container' style='padding:150px; text-align:center;'><h1>Case Study Not Found</h1><a href='portfolio.html' class='btn btn-primary' style='margin-top:24px;'>Back to Portfolio</a></div>";
    return;
  }

  container.innerHTML = `
    <section class="hero" style="min-height:75vh; display:flex; align-items:center;">
        <div class="container">
            <div class="hero-content reveal" style="max-width:1000px;">
                <span class="section-badge" style="margin-bottom:24px; display:inline-block;">${project.category.toUpperCase()} SOLUTIONS</span>
                <h1 style="font-size:clamp(3rem, 10vw, 6.5rem); line-height:0.95; margin:20px 0; font-weight:800;">${project.title}</h1>
                <p class="hero-description" style="font-size:1.5rem; max-width:800px;">${project.description}</p>
                <div class="hero-stats" style="margin-top:64px; justify-content:flex-start; gap:80px; flex-wrap:wrap;">
                     <div><div style="font-weight:700; color:var(--text-primary); font-size:1.5rem;">${project.client}</div><div style="font-size:0.9rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-top:4px;">Client Partner</div></div>
                     <div><div style="font-weight:700; color:var(--text-primary); font-size:1.5rem;">${project.year}</div><div style="font-size:0.9rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-top:4px;">Delivery Year</div></div>
                     <div><div style="font-weight:700; color:var(--text-primary); font-size:1.5rem;">${project.duration}</div><div style="font-size:0.9rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-top:4px;">Project Lifecycle</div></div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" style="background:var(--surface-950); padding:140px 0;">
        <div class="container">
            <div style="display:grid; grid-template-columns: 1.6fr 1fr; gap:120px;">
                <div class="reveal">
                    <div style="margin-bottom:100px;">
                        <span style="color:var(--primary-400); font-weight:700; text-transform:uppercase; letter-spacing:2px; font-size:0.85rem;">01 / THE CHALLENGE</span>
                        <h2 style="margin:24px 0 32px 0; font-size:3.5rem; line-height:1.1;">Strategic Objectives</h2>
                        <p style="font-size:1.3rem; color:var(--text-secondary); line-height:1.8;">${project.challenge}</p>
                    </div>
                    <div style="margin-bottom:100px;">
                        <span style="color:var(--primary-400); font-weight:700; text-transform:uppercase; letter-spacing:2px; font-size:0.85rem;">02 / OUR SOLUTION</span>
                        <h2 style="margin:24px 0 32px 0; font-size:3.5rem; line-height:1.1;">Engineering Excellence</h2>
                        <p style="font-size:1.3rem; color:var(--text-secondary); line-height:1.8;">${project.detailedDescription}</p>
                    </div>
                </div>
                <div class="reveal">
                    <div class="glass-card" style="padding:60px; border-radius:48px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); position:sticky; top:120px;">
                        <h3 style="margin-bottom:40px; font-size:2rem; font-weight:700;">Key Outcomes</h3>
                        <ul class="service-features" style="gap:36px;">
                            ${project.outcomes.map(o => `<li style="font-size:1.2rem; line-height:1.4; font-weight:500;">${o}</li>`).join('')}
                        </ul>
                        
                        <div style="margin-top:80px;">
                            <h4 style="margin-bottom:28px; font-size:1.5rem; color:var(--text-muted);">Tech Ecosystem</h4>
                            <div class="service-tech-tags" style="gap:14px;">
                                ${project.technologies.map(t => `<span class="tech-tag" style="background:rgba(79, 109, 247, 0.1); color:var(--primary-300); border-color:rgba(79, 109, 247, 0.2); padding:12px 24px;">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section" style="background:var(--surface-900); padding:140px 0; border-top:1px solid rgba(255,255,255,0.05);">
        <div class="container" style="text-align:center;">
             <div class="reveal" style="max-width:950px; margin:0 auto;">
                <h2 class="section-title" style="font-size:4rem; line-height:1;">Ready for similar results?</h2>
                <p style="color:var(--text-secondary); margin:40px auto 60px auto; font-size:1.6rem; max-width:800px;">Let's discuss how ${data.company.name} can engineer a similar market-leading success for your next initiative.</p>
                <div style="display:flex; justify-content:center; gap:28px; flex-wrap:wrap;">
                    <a href="index.html#contact" class="btn btn-primary btn-lg" style="padding:20px 48px;">Begin Collaboration</a>
                    <a href="portfolio.html" class="btn btn-outline btn-lg" style="padding:20px 48px;">Explore More Cases</a>
                </div>
             </div>
        </div>
    </section>
  `;

  initScrollAnimations();
}

function renderAboutSection(data) {
  const section = document.getElementById('about');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="reveal">
          <span class="section-badge">ABOUT ${data.company.name.toUpperCase()}</span>
          <h2 class="section-title">We engineer digital futures</h2>
          <p style="font-size:1.1rem; color:var(--text-secondary); line-height:1.8; margin-bottom:24px;">
            With ${data.company.experienceYears}+ years of digital expertise, we build scalable software solutions that drive real-world impact.
          </p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:32px;">
            <div class="stat-mini">
              <span class="stat-number">${data.company.projectsCompleted}+</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat-mini">
              <span class="stat-number">${data.company.clientsSatisfied}+</span>
              <span class="stat-label">Clients</span>
            </div>
          </div>
          <div style="margin-top:40px;">
             <a href="about.html" class="btn btn-outline">Learn Our Full Story</a>
          </div>
        </div>
        <div class="reveal about-experience-card" style="padding:40px; text-align:center;">
             <div class="experience-number">${data.company.experienceYears}+</div>
             <div class="experience-label">Years Experience</div>
             <div class="experience-sub">Delivering Excellence</div>
        </div>
      </div>
    </div>
  `;
}

// ---- ABOUT PAGE ---- (The Full Page)
function renderAboutPage(data) {
  const container = document.getElementById('about-container');
  if (!container) return;

  container.innerHTML = `
        <section class="section">
            <div class="container">
                <div class="about-grid">
                    <div class="reveal">
                        <span class="section-badge">OVER ${data.company.experienceYears}+ YEARS OF IMPACT</span>
                        <h1 class="section-title">The ${data.company.name} Story</h1>
                        <p style="font-size:1.2rem; color:var(--text-secondary); line-height:1.8; margin-bottom:24px;">
                            Founded in ${data.company.founded} with a single vision: to transform high-level technical expertise into accessible, high-ROI digital solutions. 
                        </p>
                        <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:24px;">
                            Our journey began with engineers passionate about clean code and robust systems. Since then, we've scaled into a global team of specialists delivering enterprise-grade mobile apps, websites, and server architectures.
                        </p>
                        <p style="color:var(--text-secondary); line-height:1.7;">
                            ${data.company.description}
                        </p>
                    </div>
                    <div class="reveal about-experience-card" style="padding:80px; text-align:center;">
                         <div class="experience-number">${data.company.experienceYears}+</div>
                         <div class="experience-label">Years of Engineering Excellence</div>
                    </div>
                </div>

                <div style="margin-top:80px;">
                  <div class="section-header reveal">
                    <span class="section-badge">📊 BY THE NUMBERS</span>
                    <h2 class="section-title">Our Impact</h2>
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:24px;">
                    <div class="about-stat-card glass-card reveal">
                      <div class="stat-number" data-count="${data.company.projectsCompleted}">0+</div>
                      <div class="stat-label">Projects Completed</div>
                    </div>
                    <div class="about-stat-card glass-card reveal">
                      <div class="stat-number" data-count="${data.company.clientsSatisfied}">0+</div>
                      <div class="stat-label">Happy Clients</div>
                    </div>
                    <div class="about-stat-card glass-card reveal">
                      <div class="stat-number" data-count="${data.company.experienceYears}">0+</div>
                      <div class="stat-label">Years Experience</div>
                    </div>
                  </div>
                </div>

                <div style="margin-top:100px;">
                  <div class="section-header reveal">
                    <span class="section-badge">👥 TEAM</span>
                    <h2 class="section-title">Meet the Leaders</h2>
                  </div>
                  <div class="team-grid">
                    ${data.team.map(member => `
                      <div class="team-card reveal">
                        <div class="team-avatar"><span>${member.name.split(' ').map(n => n[0]).join('')}</span></div>
                        <h3>${member.name}</h3>
                        <p class="role">${member.role}</p>
                        <p class="bio">${member.bio}</p>
                        <div class="team-social">
                          <a href="${member.social.linkedin}" title="LinkedIn">in</a>
                          <a href="${member.social.github}" title="GitHub">gh</a>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
            </div>
        </section>
    `;

  initScrollAnimations();
  initCountAnimations();
}

// ---- TESTIMONIALS ----
function renderTestimonials(data) {
  const section = document.getElementById('testimonials');
  if (!section) return;

  const cards = data.testimonials.map((t, i) => `
    <div class="testimonial-card reveal reveal-delay-${(i % 2) + 1}">
      <div class="testimonial-quote-icon">"</div>
      <div class="testimonial-stars">${'⭐'.repeat(t.rating)}</div>
      <p class="testimonial-text">${t.quote}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.name.charAt(0)}</div>
        <div class="testimonial-author-info">
          <h4>${t.name}</h4>
          <p>${t.role} at ${t.company}</p>
        </div>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">⭐ TESTIMONIALS</span>
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-subtitle">Don't just take our word for it — hear from the businesses we've helped grow.</p>
      </div>
      <div class="testimonials-slider">${cards}</div>
    </div>
  `;
}

// ---- FAQ ----
function renderFAQ(data) {
  const section = document.getElementById('faq');
  if (!section) return;

  const items = data.faq.map((item, i) => `
    <div class="faq-item reveal" id="faq-item-${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})">
        ${item.question}
        <span class="faq-chevron">▼</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <div class="faq-answer-content">${item.answer}</div>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-badge">❓ FAQ</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know before starting your project with us.</p>
      </div>
      <div class="faq-list">${items}</div>
    </div>
  `;
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-item-${index}`);
  item.classList.toggle('active');
}

// ---- CONTACT ----
function renderContact(data) {
  const section = document.getElementById('contact');
  if (!section) return;

  const cf = data.contactForm;
  const c = data.company;

  const formFields = cf.fields.map(field => {
    if (field.type === 'textarea') {
      return `
        <div class="form-group">
          <label for="form-${field.name}">${field.label}${field.required ? ' <span class="required">*</span>' : ''}</label>
          <textarea class="form-textarea" id="form-${field.name}" name="${field.name}" placeholder="Tell us about your project..." ${field.required ? 'required' : ''}></textarea>
        </div>`;
    } else if (field.type === 'select') {
      return `
        <div class="form-group">
          <label for="form-${field.name}">${field.label}${field.required ? ' <span class="required">*</span>' : ''}</label>
          <select class="form-select" id="form-${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
            <option value="">Select an option</option>
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>
        </div>`;
    } else {
      return `
        <div class="form-group">
          <label for="form-${field.name}">${field.label}${field.required ? ' <span class="required">*</span>' : ''}</label>
          <input type="${field.type}" class="form-input" id="form-${field.name}" name="${field.name}" placeholder="${field.label}" ${field.required ? 'required' : ''}>
        </div>`;
    }
  });

  const firstRow = `<div class="form-row">${formFields[0]}${formFields[1]}</div>`;
  const secondRow = `<div class="form-row">${formFields[2]}${formFields[3]}</div>`;
  const thirdRow = `<div class="form-row">${formFields[4]}${formFields[5]}</div>`;
  const lastField = formFields[6];

  section.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info reveal">
          <span class="section-badge">📬 GET IN TOUCH</span>
          <h2>${cf.heading}</h2>
          <p>${cf.subheading}</p>
          <div class="contact-details">
            <div class="contact-detail">
              <div class="contact-detail-icon">✉️</div>
              <div class="contact-detail-text">
                <h4>Email Us</h4>
                <p>${c.email}</p>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon">📍</div>
              <div class="contact-detail-text">
                <h4>Visit Us</h4>
                <p>${c.address}</p>
              </div>
            </div>
          </div>
          <div class="social-links">
            <a href="${c.socialLinks.linkedin}" class="social-link" title="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="${c.socialLinks.github}" class="social-link" title="GitHub"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <a href="${c.socialLinks.twitter}" class="social-link" title="Twitter/X"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="${c.socialLinks.instagram}" class="social-link" title="Instagram"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.149.261-2.912.558-.788.306-1.457.715-2.122 1.38-.665.665-1.074 1.334-1.38 2.122-.297.763-.501 1.635-.558 2.912-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.261 2.149.558 2.912.306.788.715 1.457 1.38 2.122.665.665 1.334 1.074 2.122 1.38.763.297 1.635.501 2.912.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.149-.261 2.912-.558.788-.306 1.457-.715 2.122-1.38.665-.665 1.074-1.334 1.38-2.122.306-.763.501-1.635.558-2.912.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.261-2.149-.558-2.912-.306-.788-.715-1.457-1.38-2.122-.665-.665-1.334-1.074-2.122-1.38-.763-.297-1.635-.501-2.912-.558-1.28-.058-1.688-.072-4.947-.072z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="${c.socialLinks.facebook}" class="social-link" title="Facebook"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg></a>
            <a href="${c.socialLinks.whatsapp}" class="social-link" title="WhatsApp"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.792 0-.85.449-1.267.608-1.441.159-.174.348-.217.464-.217.115 0 .232.001.332.005.109.004.258-.041.405.31.159.385.546 1.329.593 1.425.047.096.078.208.014.334-.061.128-.093.207-.184.312-.091.105-.191.233-.273.312-.093.09-.188.186-.08.368.108.182.48.791.1.306 1.625 1.529 2.046.216.417.438.225.218.449-.044.673-.312.224-.268.455-.19.673-.045.222.146.405.39.405.39zM12.036 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.011 21.057c-1.64 0-3.264-.44-4.686-1.279l-4.225 1.108 1.127-4.131c-.914-1.545-1.396-3.321-1.396-5.14s.482-3.595 1.396-5.14l-1.127-4.131 4.225 1.108c1.422-.84 3.045-1.279 4.686-1.279 5.031 0 9.123 4.092 9.123 9.123s-4.092 9.123-9.123 9.123z"/></svg></a>
          </div>
        </div>

        <div class="contact-form-wrapper reveal">
          <form class="contact-form" id="contact-form" onsubmit="submitContactForm(event)">
            ${firstRow}
            ${secondRow}
            ${thirdRow}
            ${lastField}
            <div class="form-submit">
              <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:16px;">
                Send Message →
              </button>
            </div>
          </form>
          <div class="form-success" id="form-success">
            <div class="success-icon">✅</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function submitContactForm(e) {
  e.preventDefault();
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').classList.add('show');
}

// ---- FOOTER ----
function renderFooter(data, page) {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="index.html" class="logo">
            <div class="logo-icon">SS</div>
            <span>${data.company.name}</span>
          </a>
          <p style="margin-top:16px;">${data.company.description.substring(0, 120)}...</p>
          <div class="social-links" style="margin-top:20px;">
            <a href="${data.company.socialLinks.linkedin}" class="social-link" title="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="${data.company.socialLinks.github}" class="social-link" title="GitHub"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <a href="${data.company.socialLinks.twitter}" class="social-link" title="Twitter/X"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="${data.company.socialLinks.instagram}" class="social-link" title="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.149.261-2.912.558-.788.306-1.457.715-2.122 1.38-.665.665-1.074 1.334-1.38 2.122-.297.763-.501 1.635-.558 2.912-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.261 2.149.558 2.912.306.788.715 1.457 1.38 2.122.665.665 1.334 1.074 2.122 1.38.763.297 1.635.501 2.912.558 1.28.058 1.688.072 4.947.072z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="${data.company.socialLinks.facebook}" class="social-link" title="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg></a>
            <a href="${data.company.socialLinks.whatsapp}" class="social-link" title="WhatsApp"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.792 0-.85.449-1.267.608-1.441.159-.174.348-.217.464-.217.115 0 .232.001.332.005.109.004.258-.041.405.31.159.385.546 1.329.593 1.425.047.096.078.208.014.334-.061.128-.093.207-.184.312-.091.105-.191.233-.273.312-.093.09-.188.186-.08.368.108.182.48.791.1.306 1.625 1.529 2.046.216.417.438.225.218.449-.044.673-.312.224-.268.455-.19.673-.045.222.146.405.39.405.39zM12.036 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.011 21.057c-1.64 0-3.264-.44-4.686-1.279l-4.225 1.108 1.127-4.131c-.914-1.545-1.396-3.321-1.396-5.14s.482-3.595 1.396-5.14l-1.127-4.131 4.225 1.108c1.422-.84 3.045-1.279 4.686-1.279 5.031 0 9.123 4.092 9.123 9.123s-4.092 9.123-9.123 9.123z"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Pages</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            ${data.services.map(s => `<li><a href="service-detail.html?id=${s.id}">${s.title}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:${data.company.email}">${data.company.email}</a></li>
            <li><a href="tel:${data.company.phone}">${data.company.phone}</a></li>
          </ul>
          <div style="margin-top:20px;">
            <h4>Legal</h4>
            <ul style="margin-top:12px;">
              ${data.footer.quickLinks.map(link => `<li><a href="${link.href}">${link.label}</a></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>${data.footer.copyright}</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// SHARED UTILITIES (Scroll, Menu, etc.)
// ============================================

function loadData() {
  const stored = localStorage.getItem('sai_softwares_cms_data');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { }
  }
  return window.CMS_DATA;
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Utility to render either an emoji or an image as an icon
 * @param {string} icon - The icon string (emoji or path)
 * @returns {string} HTML string
 */
function getIconHTML(icon) {
  if (!icon) return '';
  if (icon.includes('.') || icon.startsWith('data:') || icon.startsWith('images/')) {
    return `<img src="${icon}" class="icon-img" alt="Icon">`;
  }
  return icon;
}

function initHeaderScroll() {
  const header = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initCountAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, parseInt(entry.target.dataset.count));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCount(el, target) {
  const duration = 2000;
  const start = Date.now();
  function update() {
    const progress = Math.min((Date.now() - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))) + '+';
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function startParticleEffect() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  function init() {
    resize();
    particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3
    }));
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX; p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 109, 247, ${p.opacity})`; ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  init(); animate();
}

/**
 * Renders floating UI elements like WhatsApp and CMS Admin button
 */
function renderFloatingUI(data) {
  // WhatsApp Button
  if (!document.getElementById('whatsapp-fab')) {
    // Clean phone number: remove non-digits
    const waPhone = data.company.phone.replace(/\D/g, '');
    const waLink = `https://wa.me/${waPhone}`;

    const waBtn = document.createElement('a');
    waBtn.id = 'whatsapp-fab';
    waBtn.className = 'whatsapp-fab';
    waBtn.href = waLink;
    waBtn.target = '_blank';
    waBtn.title = 'Contact us on WhatsApp';
    waBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.941-.708-1.792 0-.85.449-1.267.608-1.441.159-.174.348-.217.464-.217.115 0 .232.001.332.005.109.004.258-.041.405.31.159.385.546 1.329.593 1.425.047.096.078.208.014.334-.061.128-.093.207-.184.312-.091.105-.191.233-.273.312-.093.09-.188.186-.08.368.108.182.48.791.1.306 1.625 1.529 2.046.216.417.438.225.218.449-.044.673-.312.224-.268.455-.19.673-.045.222.146.405.39.405.39zM12.036 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.011 21.057c-1.64 0-3.264-.44-4.686-1.279l-4.225 1.108 1.127-4.131c-.914-1.545-1.396-3.321-1.396-5.14s.482-3.595 1.396-5.14l-1.127-4.131 4.225 1.108c1.422-.84 3.045-1.279 4.686-1.279 5.031 0 9.123 4.092 9.123 9.123s-4.092 9.123-9.123 9.123z"/>
      </svg>
    `;
    document.body.appendChild(waBtn);
  }

  // Admin CMS FAB
  if (!document.getElementById('admin-fab') && !window.location.pathname.includes('admin.html')) {
    const adminBtn = document.createElement('a');
    adminBtn.id = 'admin-fab';
    adminBtn.className = 'admin-fab';
    adminBtn.href = 'admin.html';
    adminBtn.title = 'Open CMS Panel';
    adminBtn.innerHTML = '⚙️';
    document.body.appendChild(adminBtn);
  }
}
