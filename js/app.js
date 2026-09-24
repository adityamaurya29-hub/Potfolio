/**
 * Aditya Kumar - Futuristic 3D Portfolio Main Application Controller
 * Handles dynamic content population, 3D card tilt physics, typing animation,
 * interactive category filters, resume generation/download, sound synthesis, and scroll transitions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA not found. Check data.js import.");
    return;
  }

  // 1. Initialize Custom Neon Cursor
  initCustomCursor();

  // 2. Initialize Audio Controls
  initAudioControls();

  // 3. Populate Hero Stats
  populateHeroStats(data.profile.aboutDetailed.quickStats);

  // 4. Hero Subtitles Typing Effect
  initTypingEffect(data.profile.subtitles);

  // 4b. Hero Name Cyber Scramble Animation
  initNameAnimation();

  // 5. Render About Me Section
  renderAbout(data.profile.aboutDetailed);

  // 6. Render Education Timeline
  renderEducation(data.education);

  // 7. Render Technical Skills Matrix (All 13 Skills with 3D Cards)
  renderSkills(data.skills);
  initSkillsFilter(data.skills);

  // 8. Render Featured Projects (5 Projects)
  renderProjects(data.projects);

  // 9. Render Certifications
  renderCertifications(data.certifications);

  // 10. Render Learning Journey Roadmap (7 Milestones)
  renderLearningJourney(data.learningJourney);

  // 11. Render Academic Deck ("My Academic Journey" - 9 Subjects)
  renderAcademicDeck(data.academicSubjects);
  initAcademicFilters(data.academicSubjects);

  // 12. Render Achievements
  renderAchievements(data.achievements);

  // 13. Initialize Resume Download Handlers
  initResumeActions();

  // 14. 3D Card Tilt & Holographic Avatar Interactions
  init3DTilt();
  initHeroHologram();

  // 15. Scroll Spy & Reveal Observer
  initScrollAnimations();

  // 16. Mobile Menu Toggle
  initMobileMenu();

  // 17. Contact Form Submission Toast
  initContactForm();

  // 18. Laptop Workstation Screen Controls
  initLaptopControls();

  // 19. Bind Sound Effects to Interactive Elements
  bindInteractiveSounds();
});

/* ==========================================================================
   1. CUSTOM NEON CURSOR
   ========================================================================== */
function initCustomCursor() {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const outline = document.createElement("div");
  outline.className = "cursor-outline";

  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover expansion on clickable elements
  const updateHoverTargets = () => {
    const interactables = document.querySelectorAll("a, button, .skill-card-3d, .project-card, .cert-card, .filter-tab, .terminal-chip, .academic-card, .journey-card");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1.6)";
        outline.style.borderColor = "var(--neon-cyan)";
        outline.style.backgroundColor = "rgba(0, 240, 255, 0.08)";
      });
      el.addEventListener("mouseleave", () => {
        outline.style.transform = "translate(-50%, -50%) scale(1)";
        outline.style.borderColor = "rgba(0, 240, 255, 0.45)";
        outline.style.backgroundColor = "transparent";
      });
    });
  };
  setTimeout(updateHoverTargets, 500);
}

/* ==========================================================================
   2. AUDIO CONTROLS
   ========================================================================== */
function initAudioControls() {
  const audioBtn = document.getElementById("audio-toggle");
  if (!audioBtn) return;

  audioBtn.addEventListener("click", () => {
    if (!window.CyberAudio) return;
    const muted = window.CyberAudio.toggleMute();
    if (muted) {
      audioBtn.classList.remove("sound-on");
      audioBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      audioBtn.setAttribute("title", "Sound Muted (Click to enable)");
      showToast("Audio muted.", "info");
    } else {
      audioBtn.classList.add("sound-on");
      audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      audioBtn.setAttribute("title", "Sound Active (Click to mute)");
      showToast("Cyber Audio Synthesizer Active!", "success");
    }
  });
}

function bindInteractiveSounds() {
  if (!window.CyberAudio) return;
  const elements = document.querySelectorAll(".nav-link, .btn-primary, .btn-secondary, .filter-tab, .project-btn, .terminal-chip, .btn-resume-download, .laptop-mode-pill");
  elements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      window.CyberAudio.playHover();
    });
    el.addEventListener("click", () => {
      window.CyberAudio.playClick();
    });
  });
}

/* ==========================================================================
   3. HERO STATS
   ========================================================================== */
function populateHeroStats(stats) {
  const row = document.getElementById("hero-stats-container");
  if (!row || !stats) return;

  row.innerHTML = stats.map(st => `
    <div class="hero-stat-box">
      <div class="stat-val">${st.value}</div>
      <div class="stat-lbl">${st.sub}</div>
    </div>
  `).join("");
}

/* ==========================================================================
   4. TYPING EFFECT
   ========================================================================== */
function initTypingEffect(words) {
  const el = document.getElementById("typing-text");
  if (!el || !words || !words.length) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause on complete phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }
  type();
}

/* ==========================================================================
   4b. HERO NAME CYBER DECODE ANIMATION
   ========================================================================== */
function initNameAnimation() {
  const nameEl = document.getElementById("hero-name");
  if (!nameEl) return;

  const targetText = nameEl.getAttribute("data-text") || "ADITYA KUMAR";
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@&/$*<>[]";
  let interval = null;

  function runScramble() {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      nameEl.innerText = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) {
            return targetText[index];
          }
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2.2;
    }, 35);
  }

  setTimeout(runScramble, 400);

  nameEl.addEventListener("mouseenter", () => {
    runScramble();
    if (window.CyberAudio) window.CyberAudio.playHover();
  });
}

/* ==========================================================================
   5. ABOUT ME SECTION
   ========================================================================== */
function renderAbout(aboutData) {
  const container = document.getElementById("about-highlights-container");
  if (!container || !aboutData) return;

  container.innerHTML = aboutData.highlights.map((item, idx) => `
    <div class="focus-card reveal reveal-delay-${idx + 1}">
      <div class="focus-icon-box">
        <i class="${item.icon}"></i>
      </div>
      <div>
        <h4 class="focus-card-title">${item.title}</h4>
        <p class="focus-card-desc">${item.desc}</p>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   6. EDUCATION TIMELINE
   ========================================================================== */
function renderEducation(eduList) {
  const container = document.getElementById("timeline-container");
  if (!container || !eduList) return;

  container.innerHTML = eduList.map((edu, idx) => `
    <div class="timeline-item reveal reveal-delay-${idx + 1}" style="--t-accent: ${edu.accent};">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <h3 class="timeline-degree">${edu.degree}</h3>
          <span class="timeline-score">${edu.score}</span>
        </div>
        <div class="timeline-meta">
          <span><i class="fa-solid fa-university"></i> ${edu.institution}</span>
          <span><i class="fa-regular fa-calendar"></i> ${edu.period}</span>
          <span><i class="fa-solid fa-circle-check"></i> ${edu.status}</span>
        </div>
        <ul class="timeline-highlights">
          ${edu.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   7. TECHNICAL SKILLS MATRIX (ALL 13 SKILLS WITH 3D CARDS)
   ========================================================================== */
function renderSkills(skills) {
  const grid = document.getElementById("skills-grid");
  if (!grid || !skills) return;

  grid.innerHTML = skills.map((s, idx) => `
    <div class="skill-card-3d reveal reveal-delay-${(idx % 3) + 1}" 
         data-skill-category="${s.category}"
         style="--skill-accent: ${s.accent}; --skill-glow: ${s.accent}55;">
      <div>
        <div class="skill-card-top">
          <div class="skill-icon-wrap">
            <i class="${s.icon}"></i>
          </div>
          <span class="skill-badge">${s.badge}</span>
        </div>
        <h3 class="skill-name">${s.name}</h3>
        <p class="skill-desc">${s.description}</p>
      </div>

      <div class="skill-meter-wrap">
        <div class="skill-meter-head">
          <span>Proficiency</span>
          <span>${s.level}%</span>
        </div>
        <div class="skill-meter-bar">
          <div class="skill-meter-fill" style="width: ${s.level}%;"></div>
        </div>
      </div>
    </div>
  `).join("");
}

function initSkillsFilter(skills) {
  const tabs = document.querySelectorAll("#skills-filter-tabs .filter-tab");
  const grid = document.getElementById("skills-grid");
  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-skill-filter");
      if (window.CyberAudio) window.CyberAudio.playFilter();

      const cards = grid.querySelectorAll(".skill-card-3d");
      cards.forEach(card => {
        const cat = card.getAttribute("data-skill-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          card.classList.add("active");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   8. FEATURED PROJECTS DECK (5 PROJECTS)
   ========================================================================== */
function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  if (!grid || !projects) return;

  grid.innerHTML = projects.map((p, idx) => `
    <div class="project-card reveal reveal-delay-${(idx % 3) + 1} hologram-sheen"
         style="--p-accent: ${p.accent}; --p-glow: ${p.accent}55;">
      <div class="project-header-banner">
        <div class="project-mesh-bg" style="background: linear-gradient(135deg, ${p.accent}33, rgba(13,17,26,0.9));"></div>
        <div class="project-banner-overlay"></div>
        <span class="project-badge">${p.badge}</span>
      </div>

      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <div class="project-tagline">${p.tagline}</div>
        <p class="project-desc">${p.description}</p>

        <div class="project-topics-head" style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); text-transform: uppercase; margin-bottom: 8px;">Key Engineering Highlights:</div>
        <ul class="project-highlights">
          ${p.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>

        <div class="project-tech">
          ${p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>

        <div class="project-actions">
          <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary" style="width: 100%; justify-content: center;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   9. CERTIFICATIONS & BADGES
   ========================================================================== */
function renderCertifications(certs) {
  const grid = document.getElementById("certs-grid");
  if (!grid || !certs) return;

  grid.innerHTML = certs.map((c, idx) => `
    <div class="cert-card reveal reveal-delay-${(idx % 2) + 1} hologram-sheen"
         style="--c-accent: ${c.accent}; --c-glow: ${c.accent}55;">
      <div>
        <div class="cert-top">
          <div class="cert-icon-wrap">
            <i class="${c.badgeIcon}"></i>
          </div>
          <div class="cert-meta">
            <span class="cert-issuer">${c.issuer}</span>
            <span class="cert-date">${c.date}</span>
          </div>
        </div>

        <h3 class="cert-title">${c.title}</h3>

        <div class="cert-skills">
          ${c.skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join("")}
        </div>
      </div>

      <div class="cert-footer">
        <span class="cert-id">${c.credentialId}</span>
        <a href="${c.verifyLink}" target="_blank" rel="noopener noreferrer" class="cert-verify-link">
          Verify <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   10. LEARNING JOURNEY ROADMAP
   ========================================================================== */
function renderLearningJourney(journey) {
  const container = document.getElementById("journey-roadmap-container");
  if (!container || !journey) return;

  container.innerHTML = journey.map((item, idx) => `
    <div class="journey-item reveal reveal-delay-${(idx % 2) + 1}" style="--journey-accent: ${item.accent};">
      <div class="journey-node"></div>
      <div class="journey-card">
        <div class="journey-step-num">PHASE 0${item.step} // ${item.category.toUpperCase()}</div>
        <div class="journey-card-top">
          <div class="journey-icon">
            <i class="${item.icon}"></i>
          </div>
          <h3 class="journey-title">${item.title}</h3>
        </div>
        <div class="journey-summary">${item.summary}</div>
        <p class="journey-desc">${item.description}</p>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   11. ACADEMIC DECK ("MY ACADEMIC JOURNEY" - 9 CORE SUBJECTS)
   ========================================================================== */
function renderAcademicDeck(subjects) {
  const grid = document.getElementById("academic-deck-grid");
  if (!grid || !subjects) return;

  grid.innerHTML = subjects.map((sub, idx) => `
    <div class="academic-card reveal reveal-delay-${(idx % 3) + 1}" 
         data-academic-category="${sub.category}"
         style="--card-accent: ${sub.accent}; --card-glow: ${sub.accent}55;">
      <div>
        <div class="academic-card-top">
          <div class="academic-icon-box">
            <i class="${sub.icon}"></i>
          </div>
          <span class="academic-code-badge">${sub.code}</span>
        </div>

        <div class="academic-sem-badge">${sub.semester} Curriculum</div>
        <h3 class="academic-name">${sub.name}</h3>
        <p class="academic-desc">${sub.description}</p>

        <div class="academic-topics-head">Covered Core Concepts:</div>
        <div class="academic-topics-list">
          ${sub.topics.map(t => `<span class="academic-topic-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

function initAcademicFilters(subjects) {
  const tabs = document.querySelectorAll("#academic-filter-tabs .filter-tab");
  const grid = document.getElementById("academic-deck-grid");
  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-academic-filter");
      if (window.CyberAudio) window.CyberAudio.playFilter();

      const cards = grid.querySelectorAll(".academic-card");
      cards.forEach(card => {
        const cat = card.getAttribute("data-academic-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          card.classList.add("active");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   12. ACHIEVEMENTS SECTION
   ========================================================================== */
function renderAchievements(achievements) {
  const grid = document.getElementById("achievements-grid");
  if (!grid || !achievements) return;

  grid.innerHTML = achievements.map((ach, idx) => `
    <div class="achievement-card reveal reveal-delay-${idx + 1}" style="--ach-accent: ${ach.accent};">
      <div class="ach-header">
        <div class="ach-icon-box">
          <i class="${ach.icon}"></i>
        </div>
        <span class="ach-badge">${ach.badge}</span>
      </div>
      <h3 class="ach-title">${ach.title}</h3>
      <p class="ach-desc">${ach.description}</p>
    </div>
  `).join("");
}

/* ==========================================================================
   13. RESUME ACTIONS (DOWNLOAD / PRINT GENERATOR)
   ========================================================================== */
function initResumeActions() {
  const topBtn = document.getElementById("download-resume-btn-top");
  const bottomBtn = document.getElementById("download-resume-btn-bottom");
  const heroResumeBtn = document.getElementById("hero-resume-cta");

  const triggerDownload = (e) => {
    if (e) e.preventDefault();
    if (window.CyberAudio) window.CyberAudio.playSuccess();

    showToast("Generating official printable resume document...", "info");

    // Open clean, formatted resume document for printing or saving as PDF
    const resumeWindow = window.open("", "_blank");
    if (!resumeWindow) {
      alert("Please allow popups to download/print Aditya Kumar's Resume.");
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aditya Kumar - Resume (B.Tech CSE - Vivekananda Global University)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; background: #ffffff; padding: 40px; line-height: 1.6; }
    .resume-container { max-width: 800px; margin: 0 auto; border: 1px solid #cbd5e1; padding: 36px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 18px; margin-bottom: 20px; }
    h1 { font-size: 28px; color: #0f172a; margin-bottom: 4px; letter-spacing: 0.5px; }
    .subtitle { font-size: 15px; font-weight: 600; color: #0284c7; margin-bottom: 6px; }
    .contact { font-size: 13px; color: #475569; line-height: 1.6; }
    .section-title { font-size: 16px; font-weight: 700; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin: 18px 0 10px; }
    .item { margin-bottom: 10px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; color: #0f172a; }
    .item-sub { font-size: 13px; color: #475569; margin-bottom: 4px; }
    .item-desc { font-size: 13px; color: #334155; }
    table.edu-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
    table.edu-table th, table.edu-table td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
    table.edu-table th { background: #f1f5f9; color: #0f172a; font-weight: 600; }
    ul { padding-left: 20px; font-size: 13px; color: #334155; }
    li { margin-bottom: 4px; }
    .skills-block { font-size: 13px; color: #334155; line-height: 1.8; }
    .personal-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 6px; }
    .personal-table td { padding: 4px 8px; vertical-align: top; }
    .personal-table td.label { font-weight: 600; color: #0f172a; width: 160px; }
    .print-bar { text-align: center; margin-bottom: 20px; }
    .btn-print { background: #0284c7; color: #ffffff; border: none; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; }
    @media print {
      .print-bar { display: none; }
      body { padding: 0; }
      .resume-container { border: none; box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <div class="resume-container">
    <div class="header">
      <h1>ADITYA KUMAR</h1>
      <div class="subtitle">B.Tech in Computer Science and Engineering • V.G.U Jaipur (2024–2028)</div>
      <div class="contact">
        <strong>Mob. No.:</strong> +91-8210784991 &nbsp;|&nbsp; <strong>Email-id:</strong> aditya.rr334@gmail.com<br>
        <strong>Permanent Address:</strong> Police Line Siwan, Dist.- Siwan 841226 (Bihar)
      </div>
    </div>

    <div class="section-title">Career Objective</div>
    <p class="item-desc">A dedicated and hardworking B.Tech. CSE graduate looking for an opportunity to start my professional career in the IT industry, where I can learn new technologies, contribute effectively to team goals, and continuously improve my technical and interpersonal skills.</p>

    <div class="section-title">Educational Qualification</div>
    <table class="edu-table">
      <thead>
        <tr>
          <th>Exam</th>
          <th>Board / College</th>
          <th>Year</th>
          <th>Div.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Graduation (B.Tech CSE)</strong></td>
          <td>V.G.U Jaipur (Vivekananda Global University)</td>
          <td>2024 – 2028</td>
          <td>Pursuing</td>
        </tr>
        <tr>
          <td><strong>Intermediate</strong></td>
          <td>B.S.E.B Patna</td>
          <td>2023</td>
          <td>1st Div.</td>
        </tr>
        <tr>
          <td><strong>Metric (10th)</strong></td>
          <td>B.S.E.B Patna</td>
          <td>2019</td>
          <td>2nd Div.</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">Personal Information</div>
    <table class="personal-table">
      <tr><td class="label">Name:</td><td>Aditya Kumar</td></tr>
      <tr><td class="label">Father's Name:</td><td>Ajay Kumar Bhagat</td></tr>
      <tr><td class="label">Date of Birth:</td><td>25.10.2004</td></tr>
      <tr><td class="label">Sex:</td><td>Male</td></tr>
      <tr><td class="label">Nationality:</td><td>Indian</td></tr>
      <tr><td class="label">Religion:</td><td>Hindu</td></tr>
      <tr><td class="label">Marital Status:</td><td>Single</td></tr>
      <tr><td class="label">Hobbies:</td><td>Playing Cricket &amp; Listening Music</td></tr>
      <tr><td class="label">Language Known:</td><td>Hindi &amp; English</td></tr>
      <tr><td class="label">Permanent Address:</td><td>Police Line Siwan, Dist.- Siwan 841226 (Bihar)</td></tr>
    </table>

    <div class="section-title">Technical Skills</div>
    <div class="skills-block">
      <strong>Programming:</strong> C, C++, Java, Python, JavaScript (ES6+), SQL<br>
      <strong>Web Development:</strong> HTML5, CSS3, DOM APIs, Responsive UI/UX, Three.js 3D Web<br>
      <strong>Core Computer Science:</strong> Data Structures & Algorithms, Database Management (DBMS), Operating Systems, Computer Networks<br>
      <strong>Tools & Platforms:</strong> ServiceNow Administration, Git & GitHub, OpenCV, RESTful APIs
    </div>

    <div class="section-title">Key Projects</div>
    <div class="item">
      <div class="item-header">
        <span>WeatherGPT – Conversational AI Meteorological Assistant</span>
        <span>Python, LLM, FastAPI, APIs</span>
      </div>
      <div class="item-desc">Engineered an intelligent conversational weather assistant utilizing real-time meteorological APIs and LLMs for natural language alerts and forecasting.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Face Recognition Based Student Attendance System</span>
        <span>Python, OpenCV, dlib, SQL</span>
      </div>
      <div class="item-desc">Built an automated biometric attendance scanner with anti-spoofing liveness verification and real-time database logging.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Event-Based Part-Time Opportunities Platform</span>
        <span>HTML5, CSS3, JavaScript, Node.js</span>
      </div>
      <div class="item-desc">Engineered a campus marketplace connecting university students with flexible event gigs and freelance projects.</div>
    </div>
    <div class="item">
      <div class="item-header">
        <span>Blockchain-Based Pharmaceutical Waste Traceability</span>
        <span>Solidity, Ethereum, Web3.js</span>
      </div>
      <div class="item-desc">Designed an immutable audit trail using smart contracts for verified biomedical hazardous waste disposal.</div>
    </div>

    <div class="section-title">Certifications</div>
    <ul>
      <li><strong>Crash Course on Python</strong> – Google / Coursera (Credential ID: DMZXA6E2LRYA)</li>
      <li><strong>ServiceNow Administration Fundamentals On Demand</strong> – ServiceNow</li>
      <li><strong>ServiceNow Micro-Certification – Welcome to ServiceNow</strong></li>
      <li><strong>Modern Web Development Foundations</strong></li>
    </ul>
  </div>
</body>
</html>
    `;

    resumeWindow.document.write(htmlContent);
    resumeWindow.document.close();
  };

  if (topBtn) topBtn.addEventListener("click", triggerDownload);
  if (bottomBtn) bottomBtn.addEventListener("click", triggerDownload);
  if (heroResumeBtn) heroResumeBtn.addEventListener("click", triggerDownload);
}

/* ==========================================================================
   14. 3D CARD TILT ON MOUSEMOVE
   ========================================================================== */
function init3DTilt() {
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll(
    ".project-card, .skill-card-3d, .academic-card, .cert-card, .achievement-card, .resume-3d-card"
  );

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* ==========================================================================
   14B. HERO HOLOGRAPHIC 3D CUT-OUT INTERACTION (60FPS LERP PARALLAX)
   ========================================================================== */
function initHeroHologram() {
  const avatarWrapper = document.getElementById("hero-avatar-wrapper");
  const cutoutContainer = document.getElementById("hero-avatar-frame");
  const particlesContainer = document.getElementById("holo-particles-field");
  const heroSection = document.getElementById("hero");

  if (!avatarWrapper || !cutoutContainer) return;

  // 1. Populate Floating Cyber Particles around Cut-Out
  if (particlesContainer && particlesContainer.children.length === 0) {
    const particleCount = 14;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "holo-particle";
      const size = Math.random() * 3 + 2.5; // 2.5px - 5.5px
      const left = Math.random() * 92 + 4; // 4% - 96%
      const bottom = Math.random() * 70 + 5; // 5% - 75%
      const duration = Math.random() * 2.5 + 3.5; // 3.5s - 6s
      const delay = Math.random() * 3.5; // 0s - 3.5s
      const isPurple = Math.random() > 0.55;

      p.style.width = `${size.toFixed(1)}px`;
      p.style.height = `${size.toFixed(1)}px`;
      p.style.left = `${left.toFixed(1)}%`;
      p.style.bottom = `${bottom.toFixed(1)}%`;
      p.style.animationDuration = `${duration.toFixed(2)}s`;
      p.style.animationDelay = `${delay.toFixed(2)}s`;

      if (isPurple) {
        p.style.background = "var(--neon-purple)";
        p.style.boxShadow = "0 0 8px var(--neon-purple), 0 0 14px var(--neon-cyan)";
      }

      particlesContainer.appendChild(p);
    }
  }

  // If reduced motion is requested or touch device without fine pointer, keep static
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  // 2. Smooth Lerp 3D Parallax & Cursor-Facing Tilt
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let targetTranslateZ = 0;
  let currentTranslateZ = 0;
  let isHovered = false;
  let isHeroHovered = false;
  let animationFrameId = null;

  const LERP_FACTOR = 0.08;

  function updateHoloTransform() {
    currentRotateX += (targetRotateX - currentRotateX) * LERP_FACTOR;
    currentRotateY += (targetRotateY - currentRotateY) * LERP_FACTOR;
    currentTranslateZ += (targetTranslateZ - currentTranslateZ) * LERP_FACTOR;

    // Apply smooth 3D tilt to stage
    cutoutContainer.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(3)}deg) rotateY(${currentRotateY.toFixed(3)}deg) translateZ(${currentTranslateZ.toFixed(2)}px)`;

    // Keep loop active while there is noticeable motion or hover
    const diff = Math.abs(targetRotateX - currentRotateX) + Math.abs(targetRotateY - currentRotateY) + Math.abs(targetTranslateZ - currentTranslateZ);
    if (diff > 0.01 || isHovered || isHeroHovered) {
      animationFrameId = requestAnimationFrame(updateHoloTransform);
    } else {
      animationFrameId = null;
    }
  }

  function triggerUpdate() {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(updateHoloTransform);
    }
  }

  // Track mouse across the hero visual container
  const heroVisual = document.querySelector(".hero-visual") || heroSection;

  if (heroVisual) {
    heroVisual.addEventListener("mousemove", (e) => {
      isHeroHovered = true;
      const rect = cutoutContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance relative to photo center
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.4);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.4);

      // Clamp tilt for elegant subtlety (max ~10 degrees)
      const clampedX = Math.max(-1, Math.min(1, deltaX));
      const clampedY = Math.max(-1, Math.min(1, deltaY));

      const tiltPower = isHovered ? 12 : 7.5;
      targetRotateX = -clampedY * tiltPower;
      targetRotateY = clampedX * tiltPower;

      triggerUpdate();
    });

    heroVisual.addEventListener("mouseleave", () => {
      isHeroHovered = false;
      if (!isHovered) {
        targetRotateX = 0;
        targetRotateY = 0;
        targetTranslateZ = 0;
        triggerUpdate();
      }
    });
  }

  // Enhanced Depth & Aura on direct photo hover
  avatarWrapper.addEventListener("mouseenter", () => {
    isHovered = true;
    targetTranslateZ = 14;
    triggerUpdate();
  });

  avatarWrapper.addEventListener("mouseleave", () => {
    isHovered = false;
    targetTranslateZ = 0;
    if (!isHeroHovered) {
      targetRotateX = 0;
      targetRotateY = 0;
    }
    triggerUpdate();
  });
}

/* ==========================================================================
   15. SCROLL REVEAL & NAVIGATION HIGHLIGHT
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active Link Spy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   16. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("nav-menu");
  const backdrop = document.getElementById("nav-backdrop");
  const links = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    menu.classList.add("open");
    if (backdrop) backdrop.classList.add("open");
    document.body.classList.add("nav-open");
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toggleBtn.setAttribute("aria-expanded", "true");
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
    if (window.CyberAudio) window.CyberAudio.playClick();
  });

  if (backdrop) {
    backdrop.addEventListener("click", () => {
      closeMenu();
      if (window.CyberAudio) window.CyberAudio.playClick();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
    }
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

/* ==========================================================================
   17. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const origText = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting Signal...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Transmission Confirmed!';
      btn.style.background = "linear-gradient(135deg, #00ff9d, #10b981)";
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      showToast("Transmission received! Aditya will respond shortly.", "success");
      form.reset();

      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = "";
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

/* ==========================================================================
   18. LAPTOP WORKSTATION SCREEN CONTROLS
   ========================================================================== */
function initLaptopControls() {
  const modeBtn = document.getElementById("screen-mode-btn");
  const modeName = document.getElementById("screen-mode-name");
  if (!modeBtn || !modeName) return;

  const modes = ["Code Stream", "Matrix Rain", "System HUD"];
  let curIdx = 0;

  modeBtn.addEventListener("click", () => {
    curIdx = (curIdx + 1) % modes.length;
    modeName.textContent = modes[curIdx];
    if (window.CyberAudio) window.CyberAudio.playClick();
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "cyber-toast";
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
