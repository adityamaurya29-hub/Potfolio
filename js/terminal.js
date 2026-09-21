/**
 * Interactive Sci-Fi Cyber Terminal
 * Provides interactive command-line interface directly within the portfolio.
 */

(function () {
  function initTerminal() {
    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");
    const container = document.querySelector(".terminal-body");
    const chips = document.querySelectorAll(".terminal-chip");

    if (!input || !output) return;

    const COMMANDS = {
      help: () => `
<span class="cmd-cyan">AVAILABLE CYBER COMMANDS:</span>
  <span class="cmd-green">whoami</span>          - Display student profile & university status
  <span class="cmd-green">subjects</span>        - List core B.Tech CSE subjects from academic deck
  <span class="cmd-green">projects</span>        - View featured software & AI engineering projects
  <span class="cmd-green">skills</span>          - Output 13 core technical proficiencies & stack
  <span class="cmd-green">certs</span>           - Display verified Coursera & ServiceNow credentials
  <span class="cmd-green">journey</span>         - Display 7-phase technical learning milestones
  <span class="cmd-green">education</span>       - View academic institutions & Vivekananda Global University records
  <span class="cmd-green">contact</span>         - Retrieve email, phone & LinkedIn coordinates
  <span class="cmd-green">matrix</span>          - Trigger cybernetic data stream simulation
  <span class="cmd-green">clear</span>           - Wipe terminal buffer
      `,

      whoami: () => `
<span class="cmd-purple">STATUS:</span> ACTIVE // B.Tech Computer Science & Engineering (2024–2028)
<span class="cmd-purple">NAME:</span> Aditya Kumar
<span class="cmd-purple">COLLEGE:</span> V.G.U Jaipur (Vivekananda Global University)
<span class="cmd-purple">HOMETOWN:</span> Police Line Siwan, Dist.- Siwan 841226 (Bihar)
<span class="cmd-purple">MOBILE:</span> +91-8210784991
<span class="cmd-purple">EMAIL:</span> aditya.rr334@gmail.com
<span class="cmd-purple">OBJECTIVE:</span> Dedicated B.Tech CSE student seeking IT opportunities to contribute to team goals & learn emerging tech.
      `,

      subjects: () => {
        const d = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.academicSubjects : [];
        let res = `<span class="cmd-cyan">MY ACADEMIC JOURNEY (${d.length} CORE COURSES):</span>\n`;
        d.forEach(s => {
          res += `  <span class="cmd-white">[${s.code}]</span> <span class="cmd-green">${s.name}</span> (${s.semester}) -> <span class="cmd-yellow">${s.category.toUpperCase()}</span>\n`;
        });
        return res;
      },

      projects: () => {
        const p = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.projects : [];
        let res = `<span class="cmd-cyan">FEATURED ENGINEERED PROJECTS (${p.length} SHIPPED):</span>\n`;
        p.forEach(item => {
          res += `  ★ <span class="cmd-green">${item.title}</span> [${item.badge}]
     <span class="cmd-gray">${item.tagline}</span>
     Stack: <span class="cmd-cyan">${item.techStack.join(", ")}</span>\n`;
        });
        return res;
      },

      skills: () => {
        const s = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.skills : [];
        let res = `<span class="cmd-cyan">13 TECHNICAL SKILLS MATRIX:</span>\n`;
        s.forEach(skill => {
          res += `  ▶ <span class="cmd-purple">${skill.name}</span> (${skill.badge} - ${skill.level}%)\n`;
        });
        return res;
      },

      certs: () => {
        const c = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.certifications : [];
        let res = `<span class="cmd-cyan">VERIFIED CREDENTIALS:</span>\n`;
        c.forEach(cert => {
          res += `  ✔ <span class="cmd-green">${cert.title}</span> (${cert.issuer})
     Credential: <span class="cmd-yellow">${cert.credentialId}</span> | ${cert.date}\n`;
        });
        return res;
      },

      journey: () => {
        const j = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.learningJourney : [];
        let res = `<span class="cmd-cyan">TECHNICAL LEARNING MILESTONES:</span>\n`;
        j.forEach(m => {
          res += `  Phase 0${m.step}: <span class="cmd-green">${m.title}</span> [${m.category}]
     ${m.summary}\n`;
        });
        return res;
      },

      education: () => `
<span class="cmd-cyan">EDUCATIONAL QUALIFICATION:</span>
  1. <span class="cmd-green">Graduation (B.Tech CSE)</span> (2024 - 2028)
     V.G.U Jaipur (Vivekananda Global University) | Status: Pursuing
  2. <span class="cmd-green">Intermediate Examination</span> (2023)
     B.S.E.B Patna | Result: 1st Division
  3. <span class="cmd-green">Metric Examination (10th Board)</span> (2019)
     B.S.E.B Patna | Result: 2nd Division
      `,

      contact: () => `
<span class="cmd-cyan">COMMUNICATION CHANNELS:</span>
  Phone:    <a href="tel:+918210784991" class="cmd-link">+91-8210784991</a>
  Email:    <a href="mailto:aditya.rr334@gmail.com" class="cmd-link">aditya.rr334@gmail.com</a>
  LinkedIn: <a href="https://linkedin.com/in/aditya-kumar" target="_blank" class="cmd-link">linkedin.com/in/aditya-kumar</a>
  Address:  Police Line Siwan, Dist.- Siwan 841226 (Bihar)
  College:  V.G.U Jaipur, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan
      `,

      matrix: () => {
        let stream = "";
        for (let i = 0; i < 8; i++) {
          const hex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
          stream += `  <span class="cmd-green">${hex.slice(0, 8)} ${hex.slice(8, 16)} ${hex.slice(16, 24)} ${hex.slice(24)}</span>\n`;
        }
        return `<span class="cmd-green">>>> INITIALIZING QUANTUM NEURAL SYNC STREAM...</span>\n${stream}<span class="cmd-cyan">>>> SYNC COMPLETE. VGU CSE NODE 100% VERIFIED.</span>`;
      },

      clear: () => {
        output.innerHTML = "";
        return null;
      }
    };

    function executeCommand(rawCmd) {
      const trimmed = rawCmd.trim().toLowerCase();
      if (!trimmed) return;

      const line = document.createElement("div");
      line.className = "terminal-line";
      line.innerHTML = `<span class="terminal-prompt">guest@aditya-kumar:~$</span> <span class="terminal-cmd-text">${rawCmd}</span>`;
      output.appendChild(line);

      if (window.CyberAudio) {
        window.CyberAudio.playClick();
      }

      if (COMMANDS[trimmed]) {
        const result = COMMANDS[trimmed]();
        if (result !== null) {
          const resp = document.createElement("pre");
          resp.className = "terminal-response";
          resp.innerHTML = result.trim();
          output.appendChild(resp);
        }
      } else {
        const err = document.createElement("div");
        err.className = "terminal-error";
        err.innerHTML = `command not recognized: '<span class="cmd-red">${trimmed}</span>'. Type <span class="cmd-cyan">'help'</span> for valid commands.`;
        output.appendChild(err);
      }

      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        executeCommand(input.value);
        input.value = "";
      }
    });

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const cmd = chip.getAttribute("data-cmd");
        if (cmd) {
          executeCommand(cmd);
          input.focus();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initTerminal);
})();
