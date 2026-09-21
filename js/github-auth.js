/**
 * Aditya Kumar - Futuristic 3D Personal Portfolio
 * GitHub Authentication & Live Repositories Module
 * 
 * Supports:
 * 1. Full GitHub OAuth Flow (Client ID + Client Secret with local Express / PowerShell server)
 * 2. Instant Token & Username Connect (Direct GitHub REST API integration)
 * 3. User Profile HUD (Avatar, bio, followers, stats)
 * 4. Interactive Repositories Showcase (Live search, language indicators, stars, forks, links)
 * 5. Persistent session in localStorage
 */

(function () {
  'use strict';

  // Language color mappings matching GitHub's color palette
  const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Kotlin: '#A97BFF',
    Swift: '#F05138'
  };

  // Bundled Default GitHub Profile for Aditya Kumar
  const DEFAULT_USER = {
    login: 'aditya-kumar-cse',
    name: 'Aditya Kumar',
    avatar_url: 'assets/images/aditya-profile.jpg',
    html_url: 'https://github.com/aditya-kumar-cse',
    bio: '3rd Year B.Tech CSE Student at Vivekananda Global University (V.G.U Jaipur). Full-Stack Developer, AI, Three.js & ServiceNow practitioner.',
    public_repos: 6,
    followers: 15,
    following: 12,
    location: 'Jaipur / Siwan, India',
    company: 'Vivekananda Global University'
  };

  // Bundled Default Repositories for Aditya Kumar
  const DEFAULT_REPOS = [
    {
      id: 101,
      name: 'face-recognition-attendance-system',
      html_url: 'https://github.com/aditya-kumar-cse/face-recognition-attendance-system',
      description: 'Automated facial recognition attendance management system utilizing OpenCV Haar Cascades, LBPH recognizer, and Tkinter GUI with SQLite backend.',
      language: 'Python',
      stargazers_count: 7,
      forks_count: 3,
      topics: ['opencv', 'computer-vision', 'face-recognition', 'python', 'sqlite'],
      homepage: '',
      updated_at: '2026-03-15T10:30:00Z',
      private: false
    },
    {
      id: 102,
      name: 'weather-gpt-conversational-assistant',
      html_url: 'https://github.com/aditya-kumar-cse/weather-gpt-conversational-assistant',
      description: 'Intelligent AI chatbot combining OpenWeatherMap API and OpenAI GPT NLP to deliver predictive weather forecasts and conversational clothing suggestions.',
      language: 'JavaScript',
      stargazers_count: 5,
      forks_count: 2,
      topics: ['ai-chatbot', 'openai-gpt', 'weather-api', 'javascript', 'responsive-design'],
      homepage: '',
      updated_at: '2026-02-28T14:15:00Z',
      private: false
    },
    {
      id: 103,
      name: '3d-cyber-portfolio-workstation',
      html_url: 'https://github.com/aditya-kumar-cse/3d-cyber-portfolio-workstation',
      description: 'Futuristic sci-fi personal developer portfolio featuring Three.js WebGL 3D interactive laptop workstation, cyber audio synthesis, and GitHub telemetry.',
      language: 'JavaScript',
      stargazers_count: 9,
      forks_count: 4,
      topics: ['threejs', 'webgl-3d', 'interactive-portfolio', 'cyberpunk', 'glassmorphism'],
      homepage: '',
      updated_at: '2026-04-10T09:45:00Z',
      private: false
    },
    {
      id: 104,
      name: 'servicenow-automated-request-orchestrator',
      html_url: 'https://github.com/aditya-kumar-cse/servicenow-automated-request-orchestrator',
      description: 'ServiceNow ITSM automation engine integrating GlideRecord business rules, Flow Designer workflows, and custom Scripted REST APIs for enterprise provisioning.',
      language: 'ServiceNow',
      stargazers_count: 4,
      forks_count: 1,
      topics: ['servicenow', 'itsm-automation', 'flow-designer', 'rest-api', 'enterprise'],
      homepage: '',
      updated_at: '2026-01-20T11:00:00Z',
      private: false
    },
    {
      id: 105,
      name: 'enterprise-it-service-hub',
      html_url: 'https://github.com/aditya-kumar-cse/enterprise-it-service-hub',
      description: 'Modern enterprise IT service ticketing portal with role-based routing, real-time SLA metrics dashboard, and automated notification pipeline.',
      language: 'JavaScript',
      stargazers_count: 3,
      forks_count: 1,
      topics: ['it-service-desk', 'dashboard', 'javascript', 'web-app'],
      homepage: '',
      updated_at: '2025-11-14T16:20:00Z',
      private: false
    },
    {
      id: 106,
      name: 'dsa-problem-solving-java',
      html_url: 'https://github.com/aditya-kumar-cse/dsa-problem-solving-java',
      description: 'Comprehensive repository of Data Structures & Algorithms solutions in Java, covering dynamic programming, graphs, trees, and LeetCode problems.',
      language: 'Java',
      stargazers_count: 6,
      forks_count: 2,
      topics: ['data-structures', 'algorithms', 'java', 'leetcode', 'competitive-programming'],
      homepage: '',
      updated_at: '2026-04-01T08:00:00Z',
      private: false
    }
  ];

  // State
  const state = {
    user: DEFAULT_USER,
    repos: DEFAULT_REPOS,
    token: null,
    loading: false,
    filterText: '',
    pageFilterLanguage: 'all',
    config: {
      clientId: localStorage.getItem('gh_client_id') || '',
      clientSecret: localStorage.getItem('gh_client_secret') || '',
      tokenEndpoint: '/api/github/token'
    }
  };

  // Safe initialization that avoids DOMContentLoaded race condition
  function startModule() {
    initGitHubElements();
    initPageShowcaseElements();
    checkOAuthCallback();
    restoreSession();
    renderPageShowcase();
    fetchAdityaPublicData();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startModule);
  } else {
    startModule();
  }

  /**
   * Inject or bind UI elements: Navbar buttons, Login Modal, and Repositories HUD Modal
   */
  function initGitHubElements() {
    const navActions = document.querySelector('.nav-actions');
    let widget = document.getElementById('github-nav-widget');

    // If not in DOM, inject it into Navbar actions
    if (navActions && !widget) {
      widget = document.createElement('div');
      widget.id = 'github-nav-widget';
      widget.className = 'github-nav-widget';
      widget.innerHTML = `
        <button id="github-nav-login-btn" class="github-nav-btn" aria-label="GitHub Profile & Repositories" title="View GitHub Profile & Repositories">
          <i class="fa-brands fa-github"></i>
          <span class="gh-btn-text">GitHub</span>
        </button>
        <div id="github-nav-user-chip" class="github-user-chip hidden" title="Click to view GitHub profile & repositories">
          <img id="github-chip-avatar" src="assets/images/aditya-profile.jpg" alt="Avatar" class="github-chip-avatar">
          <div class="github-chip-meta">
            <span id="github-chip-name" class="github-chip-name">@aditya-kumar-cse</span>
            <span id="github-chip-repos-count" class="github-chip-badge">6 Repos</span>
          </div>
          <i class="fa-solid fa-chevron-down gh-chevron"></i>
        </div>
      `;
      const audioBtn = document.getElementById('audio-toggle');
      if (audioBtn) {
        navActions.insertBefore(widget, audioBtn);
      } else {
        navActions.prepend(widget);
      }
    }

    // Bind event listeners if elements exist
    const loginBtn = document.getElementById('github-nav-login-btn');
    const userChip = document.getElementById('github-nav-user-chip');

    if (loginBtn) {
      loginBtn.onclick = () => {
        if (state.user) {
          openProfileModal();
        } else {
          openLoginModal();
        }
      };
    }

    if (userChip) {
      userChip.onclick = openProfileModal;
    }

    // Create Modals
    createLoginModal();
    createReposModal();
  }

  /**
   * Build Login Modal
   */
  function createLoginModal() {
    if (document.getElementById('github-login-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'github-login-modal';
    modal.className = 'cyber-modal-backdrop hidden';
    modal.innerHTML = `
      <div class="cyber-modal github-modal-box">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <i class="fa-brands fa-github gh-title-icon"></i>
            <div>
              <h3 class="modal-title">GitHub Authentication Node</h3>
              <span class="modal-subtitle">Connect your GitHub profile & display live repositories</span>
            </div>
          </div>
          <button class="modal-close-btn" id="gh-login-modal-close" aria-label="Close modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="oauth">
            <i class="fa-solid fa-shield-halved"></i> GitHub OAuth
          </button>
          <button class="modal-tab-btn" data-tab="direct">
            <i class="fa-solid fa-bolt"></i> Instant Username / Token
          </button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: OAuth App Flow -->
          <div id="gh-tab-oauth" class="tab-panel active">
            <p class="tab-desc">
              Connect via your registered GitHub OAuth Application. The server will securely exchange the OAuth authorization code for an API token.
            </p>

            <form id="gh-oauth-form" class="cyber-form">
              <div class="form-group">
                <label for="gh-client-id" class="form-label">
                  GitHub Client ID <span class="label-hint">(from your GitHub OAuth App)</span>
                </label>
                <input type="text" id="gh-client-id" class="form-input" placeholder="e.g. Ov23li..." value="${state.config.clientId}">
              </div>

              <div class="form-group">
                <label for="gh-client-secret" class="form-label">
                  GitHub Client Secret <span class="label-hint">(stored locally in browser for token exchange)</span>
                </label>
                <input type="password" id="gh-client-secret" class="form-input" placeholder="e.g. 94f86d..." value="${state.config.clientSecret}">
              </div>

              <div class="oauth-help-box">
                <div class="help-title"><i class="fa-solid fa-circle-info"></i> OAuth App Settings:</div>
                <div class="help-item"><strong>Homepage URL:</strong> <code>${window.location.origin}/</code></div>
                <div class="help-item"><strong>Callback URL:</strong> <code>${window.location.origin}/</code></div>
              </div>

              <button type="submit" class="btn-primary gh-action-btn" id="gh-oauth-submit">
                <i class="fa-brands fa-github"></i>
                <span>Authorize & Connect with GitHub</span>
              </button>
            </form>
          </div>

          <!-- TAB 2: Instant Username or Personal Access Token -->
          <div id="gh-tab-direct" class="tab-panel">
            <p class="tab-desc">
              No backend setup needed! Enter your GitHub username or a Personal Access Token to load your public profile and repositories immediately.
            </p>

            <form id="gh-direct-form" class="cyber-form">
              <div class="form-group">
                <label for="gh-username-input" class="form-label">
                  GitHub Username
                </label>
                <div class="input-with-icon">
                  <span class="input-prefix">github.com/</span>
                  <input type="text" id="gh-username-input" class="form-input" placeholder="e.g. aditya-kumar-cse" value="aditya-kumar-cse">
                </div>
              </div>

              <div class="form-group">
                <label for="gh-token-input" class="form-label">
                  Personal Access Token <span class="label-hint">(Optional — for higher API rate limits)</span>
                </label>
                <input type="password" id="gh-token-input" class="form-input" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx">
              </div>

              <button type="submit" class="btn-primary gh-action-btn" id="gh-direct-submit">
                <i class="fa-solid fa-cloud-arrow-down"></i>
                <span>Connect & Fetch Repositories</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Modal Close
    document.getElementById('gh-login-modal-close').addEventListener('click', closeLoginModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLoginModal();
    });

    // Tab switching
    const tabBtns = modal.querySelectorAll('.modal-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        modal.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`gh-tab-${target}`).classList.add('active');
        if (window.CyberAudio) window.CyberAudio.playClick();
      });
    });

    // OAuth Form Submit
    document.getElementById('gh-oauth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const clientId = document.getElementById('gh-client-id').value.trim();
      const clientSecret = document.getElementById('gh-client-secret').value.trim();

      if (!clientId) {
        showToast('Please enter your GitHub Client ID.', 'error');
        return;
      }

      state.config.clientId = clientId;
      state.config.clientSecret = clientSecret;
      localStorage.setItem('gh_client_id', clientId);
      if (clientSecret) localStorage.setItem('gh_client_secret', clientSecret);

      // Save state to recognize return
      const redirectUri = window.location.origin + window.location.pathname;
      const oauthState = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('gh_oauth_state', oauthState);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,repo&state=${oauthState}`;
      
      showToast('Redirecting to GitHub for authorization...', 'info');
      if (window.CyberAudio) window.CyberAudio.playClick();
      
      setTimeout(() => {
        window.location.href = authUrl;
      }, 500);
    });

    // Direct / Token Form Submit
    document.getElementById('gh-direct-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('gh-username-input').value.trim();
      const token = document.getElementById('gh-token-input').value.trim();

      if (!username && !token) {
        showToast('Please provide a GitHub username or token.', 'error');
        return;
      }

      const submitBtn = document.getElementById('gh-direct-submit');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Fetching Profile...';
      submitBtn.disabled = true;

      try {
        await loginWithUsernameOrToken(username, token);
        closeLoginModal();
        openProfileModal();
      } catch (err) {
        showToast(err.message || 'Failed to connect to GitHub.', 'error');
      } finally {
        submitBtn.innerHTML = originalHtml;
        submitBtn.disabled = false;
      }
    });
  }

  /**
   * Build Repositories & Profile HUD Modal
   */
  function createReposModal() {
    if (document.getElementById('github-repos-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'github-repos-modal';
    modal.className = 'cyber-modal-backdrop hidden';
    modal.innerHTML = `
      <div class="cyber-modal github-repos-modal-box">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <i class="fa-brands fa-github gh-title-icon"></i>
            <div>
              <h3 class="modal-title">GitHub Connected Workspace</h3>
              <span class="modal-subtitle">Live repositories & developer telemetry</span>
            </div>
          </div>
          <div class="modal-header-actions">
            <button class="hud-mini-btn btn-disconnect" id="gh-disconnect-btn" title="Log out from GitHub">
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Disconnect
            </button>
            <button class="modal-close-btn" id="gh-repos-modal-close" aria-label="Close modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- User Profile Card -->
        <div class="gh-profile-card" id="gh-profile-header">
          <!-- Injected dynamically -->
        </div>

        <!-- Repositories Controls Bar -->
        <div class="gh-repos-toolbar">
          <div class="gh-search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="gh-repo-search" placeholder="Search repositories by name, language, or topic..." autocomplete="off">
          </div>
          <div class="gh-toolbar-stats">
            <span id="gh-repo-count-badge" class="stats-pill">0 Repositories</span>
            <button id="gh-refresh-btn" class="hud-mini-btn" title="Refresh repositories from GitHub">
              <i class="fa-solid fa-rotate"></i> Refresh
            </button>
          </div>
        </div>

        <!-- Repositories Grid -->
        <div class="gh-repos-grid" id="gh-repos-grid">
          <!-- Injected dynamically -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Modal Close
    document.getElementById('gh-repos-modal-close').addEventListener('click', closeProfileModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProfileModal();
    });

    // Disconnect Button
    document.getElementById('gh-disconnect-btn').addEventListener('click', () => {
      logout();
      closeProfileModal();
    });

    // Refresh Button
    document.getElementById('gh-refresh-btn').addEventListener('click', async () => {
      if (!state.user) return;
      const refreshBtn = document.getElementById('gh-refresh-btn');
      refreshBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i>';
      try {
        await fetchRepos(state.user.login, state.token);
        renderReposGrid();
        showToast('Repositories refreshed from GitHub!', 'success');
      } catch (err) {
        showToast('Failed to refresh repositories.', 'error');
      } finally {
        refreshBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh';
      }
    });

    // Search input
    document.getElementById('gh-repo-search').addEventListener('input', (e) => {
      state.filterText = e.target.value.toLowerCase().trim();
      renderReposGrid();
    });
  }

  /**
   * Check if page was loaded from OAuth redirect callback
   */
  async function checkOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const oauthState = urlParams.get('state');

    if (!code) return;

    // Verify state
    const savedState = localStorage.getItem('gh_oauth_state');
    if (savedState && oauthState && savedState !== oauthState) {
      console.warn('GitHub OAuth state mismatch. Possible CSRF attempt.');
    }
    localStorage.removeItem('gh_oauth_state');

    // Clean URL parameter without reloading
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    showToast('Exchanging GitHub authorization code for token...', 'info');

    try {
      const clientId = state.config.clientId || localStorage.getItem('gh_client_id');
      const clientSecret = state.config.clientSecret || localStorage.getItem('gh_client_secret');

      const response = await fetch(state.config.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code,
          client_id: clientId,
          client_secret: clientSecret
        })
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error_description || data.error);
      }

      const accessToken = data.access_token;
      if (!accessToken) {
        throw new Error('No access token received from server.');
      }

      state.token = accessToken;
      localStorage.setItem('gh_access_token', accessToken);

      // Fetch user profile using access token
      await fetchUserProfile(accessToken);
      await fetchRepos(state.user.login, accessToken);

      updateNavbar();
      showToast(`Welcome @${state.user.login}! GitHub connected successfully.`, 'success');
      if (window.CyberAudio) window.CyberAudio.playSuccess();
      openProfileModal();
    } catch (err) {
      console.error('OAuth exchange error:', err);
      showToast(`OAuth Error: ${err.message}`, 'error');
    }
  }

  /**
   * Restore logged-in state from localStorage
   */
  function restoreSession() {
    const savedUser = localStorage.getItem('gh_user_data');
    const savedRepos = localStorage.getItem('gh_repos_data');
    const savedToken = localStorage.getItem('gh_access_token');

    if (savedUser) {
      try {
        state.user = JSON.parse(savedUser);
        state.token = savedToken;
        if (savedRepos) {
          state.repos = JSON.parse(savedRepos);
        }
        updateNavbar();
      } catch (err) {
        console.error('Error parsing stored GitHub user:', err);
        localStorage.removeItem('gh_user_data');
      }
    }
  }

  /**
   * Log in via direct Username or Personal Access Token
   */
  async function loginWithUsernameOrToken(username, token) {
    let headers = { 'Accept': 'application/vnd.github.v3+json' };
    if (token) {
      headers['Authorization'] = `token ${token}`;
      state.token = token;
      localStorage.setItem('gh_access_token', token);
    }

    // Determine user profile URL
    const url = token && !username 
      ? 'https://api.github.com/user'
      : `https://api.github.com/users/${encodeURIComponent(username)}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      if (res.status === 404) throw new Error('GitHub user not found.');
      if (res.status === 401) throw new Error('Invalid GitHub token or bad credentials.');
      if (res.status === 403) throw new Error('GitHub API rate limit exceeded. Provide a personal access token.');
      throw new Error(`GitHub API error (status ${res.status})`);
    }

    const userData = await res.json();
    state.user = userData;
    localStorage.setItem('gh_user_data', JSON.stringify(userData));

    // Fetch user's public repositories
    await fetchRepos(userData.login, token);

    updateNavbar();
    showToast(`Connected as @${userData.login}!`, 'success');
    if (window.CyberAudio) window.CyberAudio.playSuccess();
  }

  /**
   * Fetch user profile
   */
  async function fetchUserProfile(token) {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${token}`
      }
    });

    if (!res.ok) throw new Error(`Failed to fetch user profile: ${res.status}`);
    const data = await res.json();
    state.user = data;
    localStorage.setItem('gh_user_data', JSON.stringify(data));
    return data;
  }

  /**
   * Fetch repositories
   */
  async function fetchRepos(username, token) {
    let headers = { 'Accept': 'application/vnd.github.v3+json' };
    if (token) headers['Authorization'] = `token ${token}`;

    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;
    const res = await fetch(url, { headers });

    if (!res.ok) throw new Error(`Failed to fetch repos: ${res.status}`);
    const reposData = await res.json();
    state.repos = reposData;
    localStorage.setItem('gh_repos_data', JSON.stringify(reposData));
    return reposData;
  }

  /**
   * Update the Navbar HUD button & user chip
   */
  function updateNavbar() {
    const loginBtn = document.getElementById('github-nav-login-btn');
    const userChip = document.getElementById('github-nav-user-chip');
    const avatar = document.getElementById('github-chip-avatar');
    const name = document.getElementById('github-chip-name');
    const count = document.getElementById('github-chip-repos-count');

    if (!loginBtn || !userChip) return;

    if (state.user) {
      loginBtn.classList.add('hidden');
      userChip.classList.remove('hidden');

      avatar.src = state.user.avatar_url || 'assets/images/aditya-profile.jpg';
      name.textContent = `@${state.user.login}`;
      count.textContent = `${state.user.public_repos || state.repos.length} Repos`;
    } else {
      loginBtn.classList.remove('hidden');
      userChip.classList.add('hidden');
    }
  }

  /**
   * Render User Profile in Modal
   */
  function renderProfileHeader() {
    const header = document.getElementById('gh-profile-header');
    if (!header || !state.user) return;

    const u = state.user;
    header.innerHTML = `
      <div class="gh-profile-main">
        <div class="gh-avatar-wrap">
          <img src="${u.avatar_url}" alt="${u.login}" class="gh-profile-avatar">
          <span class="gh-online-indicator"></span>
        </div>
        <div class="gh-profile-info">
          <div class="gh-name-row">
            <h4 class="gh-display-name">${u.name || u.login}</h4>
            <span class="gh-username">@${u.login}</span>
            <a href="${u.html_url}" target="_blank" rel="noopener noreferrer" class="gh-external-link" title="Open GitHub Profile">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          <p class="gh-bio">${u.bio || 'Passionate developer engineering modern software & web applications.'}</p>
          <div class="gh-meta-tags">
            ${u.location ? `<span class="gh-meta-tag"><i class="fa-solid fa-location-dot"></i> ${u.location}</span>` : ''}
            ${u.company ? `<span class="gh-meta-tag"><i class="fa-solid fa-building"></i> ${u.company}</span>` : ''}
            ${u.blog ? `<a href="${u.blog.startsWith('http') ? u.blog : 'https://' + u.blog}" target="_blank" rel="noopener" class="gh-meta-tag"><i class="fa-solid fa-link"></i> ${u.blog}</a>` : ''}
          </div>
        </div>
      </div>

      <div class="gh-profile-stats">
        <div class="gh-stat-box">
          <span class="gh-stat-num">${u.public_repos || 0}</span>
          <span class="gh-stat-lbl">Public Repos</span>
        </div>
        <div class="gh-stat-box">
          <span class="gh-stat-num">${u.followers || 0}</span>
          <span class="gh-stat-lbl">Followers</span>
        </div>
        <div class="gh-stat-box">
          <span class="gh-stat-num">${u.following || 0}</span>
          <span class="gh-stat-lbl">Following</span>
        </div>
        <div class="gh-stat-box">
          <span class="gh-stat-num">${u.public_gists || 0}</span>
          <span class="gh-stat-lbl">Gists</span>
        </div>
      </div>
    `;
  }

  /**
   * Render Repositories Grid in Modal
   */
  function renderReposGrid() {
    const grid = document.getElementById('gh-repos-grid');
    const badge = document.getElementById('gh-repo-count-badge');
    if (!grid) return;

    let list = state.repos;
    if (state.filterText) {
      list = list.filter(r => {
        const name = (r.name || '').toLowerCase();
        const desc = (r.description || '').toLowerCase();
        const lang = (r.language || '').toLowerCase();
        const topics = (r.topics || []).join(' ').toLowerCase();
        return name.includes(state.filterText) ||
          desc.includes(state.filterText) ||
          lang.includes(state.filterText) ||
          topics.includes(state.filterText);
      });
    }

    if (badge) {
      badge.textContent = `${list.length} ${list.length === 1 ? 'Repository' : 'Repositories'}`;
    }

    if (!list || list.length === 0) {
      grid.innerHTML = `
        <div class="gh-empty-repos">
          <i class="fa-brands fa-github gh-empty-icon"></i>
          <h4>No repositories found</h4>
          <p>${state.filterText ? 'No projects matched your search criteria.' : 'This GitHub account does not have any public repositories yet.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(repo => {
      const langColor = LANGUAGE_COLORS[repo.language] || '#00f0ff';
      const updatedDate = new Date(repo.updated_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <div class="gh-repo-card">
          <div class="gh-repo-header">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo-title">
              <i class="fa-solid fa-book-bookmark"></i>
              <span>${escapeHtml(repo.name)}</span>
            </a>
            <span class="gh-repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
          </div>

          <p class="gh-repo-desc">${escapeHtml(repo.description || 'No description provided for this repository.')}</p>

          ${repo.topics && repo.topics.length > 0 ? `
            <div class="gh-repo-topics">
              ${repo.topics.slice(0, 4).map(t => `<span class="gh-topic-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
          ` : ''}

          <div class="gh-repo-footer">
            <div class="gh-repo-meta">
              ${repo.language ? `
                <span class="gh-repo-lang">
                  <span class="gh-lang-dot" style="background-color: ${langColor};"></span>
                  ${repo.language}
                </span>
              ` : ''}
              <span class="gh-meta-metric" title="Stars">
                <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
              </span>
              <span class="gh-meta-metric" title="Forks">
                <i class="fa-solid fa-code-fork"></i> ${repo.forks_count || 0}
              </span>
            </div>

            <div class="gh-repo-actions">
              ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="gh-link-pill pill-demo" title="Live Demo">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
                </a>
              ` : ''}
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-link-pill" title="View on GitHub">
                <i class="fa-brands fa-github"></i> Code
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Modal Open/Close Controls
   */
  function openLoginModal() {
    const modal = document.getElementById('github-login-modal');
    if (modal) {
      modal.classList.remove('hidden');
      if (window.CyberAudio) window.CyberAudio.playClick();
    }
  }

  function closeLoginModal() {
    const modal = document.getElementById('github-login-modal');
    if (modal) modal.classList.add('hidden');
  }

  function openProfileModal() {
    renderProfileHeader();
    renderReposGrid();
    const modal = document.getElementById('github-repos-modal');
    if (modal) {
      modal.classList.remove('hidden');
      if (window.CyberAudio) window.CyberAudio.playClick();
    }
  }

  function closeProfileModal() {
    const modal = document.getElementById('github-repos-modal');
    if (modal) modal.classList.add('hidden');
  }

  /**
   * Initialize on-page GitHub Showcase controls (search, language filters, modal triggers)
   */
  function initPageShowcaseElements() {
    const connectBtn = document.getElementById('gh-page-connect-btn');
    if (connectBtn) {
      connectBtn.onclick = openLoginModal;
    }

    const searchInput = document.getElementById('gh-page-search');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.pageFilterText = e.target.value.toLowerCase().trim();
        renderPageShowcase();
      };
    }

    const filterPills = document.querySelectorAll('.gh-filter-pill');
    filterPills.forEach(pill => {
      pill.onclick = () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.pageFilterLanguage = pill.dataset.ghFilter || 'all';
        renderPageShowcase();
        if (window.CyberAudio) window.CyberAudio.playClick();
      };
    });
  }

  /**
   * Render the dedicated on-page GitHub & Repositories showcase section
   */
  function renderPageShowcase() {
    const grid = document.getElementById('gh-page-repos-grid');
    if (!grid) return;

    // Update telemetry counters
    const reposCountEl = document.getElementById('gh-page-repos-count');
    const starsCountEl = document.getElementById('gh-page-stars-count');
    const followersCountEl = document.getElementById('gh-page-followers-count');
    const handleEl = document.getElementById('gh-page-handle');
    const avatarEl = document.getElementById('gh-page-avatar');
    const nameEl = document.getElementById('gh-page-name');
    const bioEl = document.getElementById('gh-page-bio');
    const visitBtn = document.getElementById('gh-page-visit-btn');

    const u = state.user || DEFAULT_USER;
    const allRepos = state.repos || DEFAULT_REPOS;

    if (reposCountEl) reposCountEl.textContent = allRepos.length;
    if (followersCountEl) followersCountEl.textContent = `${u.followers || 15}+`;

    // Calculate total stars
    const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    if (starsCountEl) starsCountEl.textContent = `${totalStars > 0 ? totalStars : '24'}+`;

    if (handleEl) {
      handleEl.href = u.html_url || `https://github.com/${u.login}`;
      handleEl.innerHTML = `<i class="fa-brands fa-github"></i> @${u.login}`;
    }

    if (avatarEl && u.avatar_url) avatarEl.src = u.avatar_url;
    if (nameEl && u.name) nameEl.textContent = u.name;
    if (bioEl && u.bio) bioEl.textContent = u.bio;
    if (visitBtn) visitBtn.href = u.html_url || `https://github.com/${u.login}`;

    // Filter repositories
    let filtered = allRepos;
    if (state.pageFilterLanguage && state.pageFilterLanguage !== 'all') {
      const targetLang = state.pageFilterLanguage.toLowerCase();
      filtered = filtered.filter(r => {
        const repoLang = (r.language || '').toLowerCase();
        const topics = (r.topics || []).map(t => t.toLowerCase());
        return repoLang.includes(targetLang) || topics.some(t => t.includes(targetLang));
      });
    }

    if (state.pageFilterText) {
      const q = state.pageFilterText;
      filtered = filtered.filter(r => {
        const name = (r.name || '').toLowerCase();
        const desc = (r.description || '').toLowerCase();
        const lang = (r.language || '').toLowerCase();
        const topics = (r.topics || []).join(' ').toLowerCase();
        return name.includes(q) || desc.includes(q) || lang.includes(q) || topics.includes(q);
      });
    }

    if (!filtered || filtered.length === 0) {
      grid.innerHTML = `
        <div class="gh-empty-repos" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fa-brands fa-github gh-empty-icon" style="font-size: 2.8rem; color: var(--neon-cyan); opacity: 0.7; margin-bottom: 12px; display: block;"></i>
          <h4 style="color: var(--text-bright); margin-bottom: 6px;">No Repositories Found</h4>
          <p>No project repositories matched your current filter criteria.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(repo => {
      const langColor = LANGUAGE_COLORS[repo.language] || '#00f0ff';
      const topicsList = repo.topics || [];

      return `
        <div class="gh-repo-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="gh-repo-header">
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo-title" title="${escapeHtml(repo.name)}">
                <i class="fa-solid fa-book-bookmark"></i>
                <span>${escapeHtml(repo.name)}</span>
              </a>
              <span class="gh-repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
            </div>

            <p class="gh-repo-desc">${escapeHtml(repo.description || 'No description provided.')}</p>

            ${topicsList.length > 0 ? `
              <div class="gh-repo-topics">
                ${topicsList.slice(0, 4).map(t => `<span class="gh-topic-tag">${escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          <div class="gh-repo-footer" style="margin-top: 18px;">
            <div class="gh-repo-meta">
              ${repo.language ? `
                <span class="gh-repo-lang">
                  <span class="gh-lang-dot" style="background-color: ${langColor};"></span>
                  ${repo.language}
                </span>
              ` : ''}
              <span class="gh-meta-metric" title="Stars">
                <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
              </span>
              <span class="gh-meta-metric" title="Forks">
                <i class="fa-solid fa-code-fork"></i> ${repo.forks_count || 0}
              </span>
            </div>

            <div class="gh-repo-actions">
              ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="gh-link-pill pill-demo" title="Live Demo">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
                </a>
              ` : ''}
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-link-pill" title="View Code on GitHub">
                <i class="fa-brands fa-github"></i> Code
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Background live fetch for Aditya Kumar's public GitHub repositories
   */
  async function fetchAdityaPublicData() {
    // Only fetch automatically if no custom authenticated session is active
    if (state.token || (state.user && state.user.login !== 'aditya-kumar-cse')) {
      return;
    }

    try {
      const userRes = await fetch('https://api.github.com/users/aditya-kumar-cse', {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (userRes.ok) {
        const liveUser = await userRes.json();
        state.user = liveUser;
        localStorage.setItem('gh_user_data', JSON.stringify(liveUser));
      }

      const reposRes = await fetch('https://api.github.com/users/aditya-kumar-cse/repos?sort=updated&per_page=100', {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (reposRes.ok) {
        const liveRepos = await reposRes.json();
        if (Array.isArray(liveRepos) && liveRepos.length > 0) {
          state.repos = liveRepos;
          localStorage.setItem('gh_repos_data', JSON.stringify(liveRepos));
        }
      }

      updateNavbar();
      renderPageShowcase();
    } catch (err) {
      // Gracefully continue using DEFAULT_USER and DEFAULT_REPOS if offline or rate limited
      console.log('Using preloaded GitHub data for Aditya Kumar (offline / rate limit safeguard).');
    }
  }

  /**
   * Logout function - resets back to Aditya Kumar's showcase
   */
  function logout() {
    state.user = DEFAULT_USER;
    state.repos = DEFAULT_REPOS;
    state.token = null;
    localStorage.removeItem('gh_user_data');
    localStorage.removeItem('gh_repos_data');
    localStorage.removeItem('gh_access_token');
    updateNavbar();
    renderPageShowcase();
    showToast('Reset to default developer workspace.', 'info');
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  /**
   * Toast helper
   */
  function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
      return;
    }
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'cyber-toast';
    toast.innerHTML = `
      <i class="${type === 'success' ? 'fa-solid fa-circle-check' : type === 'error' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-info'}"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /**
   * HTML escape helper
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose to window for external scripting or debugging
  window.GitHubAuth = {
    openLoginModal,
    openProfileModal,
    renderPageShowcase,
    logout,
    getState: () => state
  };
})();
