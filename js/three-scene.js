/**
 * Three.js Futuristic 3D Cyber Scene & Interactive Developer Laptop Workstation
 * Handles:
 * 1. Ambient Cyber Starfield & Floating Holograms (Background Canvas #bg-canvas)
 * 2. Interactive 3D Developer Laptop (Hero Canvas #hero-laptop-canvas) with draggable 3D controls,
 *    dynamic screen canvas texture (live animated code, diagnostics, matrix rain), and glowing lighting.
 */

(function () {
  "use strict";

  // Check WebGL availability
  if (typeof THREE === "undefined") {
    console.warn("Three.js not loaded. Falling back to CSS cyber background.");
    return;
  }

  /* ==========================================================================
     1. AMBIENT BACKGROUND SCENE (Particle Constellation + Floating Polyhedra)
     ========================================================================== */
  const bgCanvas = document.getElementById("bg-canvas");
  if (bgCanvas) {
    const bgScene = new THREE.Scene();
    bgScene.fog = new THREE.FogExp2(0x07090e, 0.0018);

    const bgCamera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    bgCamera.position.z = 80;
    bgCamera.position.y = 10;

    const bgRenderer = new THREE.WebGLRenderer({
      canvas: bgCanvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a2639, 1.5);
    bgScene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.5, 220);
    cyanPointLight.position.set(40, 30, 40);
    bgScene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 2.5, 220);
    purplePointLight.position.set(-40, -20, 20);
    bgScene.add(purplePointLight);

    // Particle Starfield
    const particleCount = 1400;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x00ff9d), // Emerald
      new THREE.Color(0x38bdf8), // Sky Blue
      new THREE.Color(0xffffff)  // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 260;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 220;

      const chosen = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = chosen.r;
      colors[i3 + 1] = chosen.g;
      colors[i3 + 2] = chosen.b;
    }

    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geom, pMaterial);
    bgScene.add(particleSystem);

    // Floating Polyhedra Meshes
    const meshesGroup = new THREE.Group();
    bgScene.add(meshesGroup);

    // Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(11, 1);
    const icoWire = new THREE.WireframeGeometry(icoGeom);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const icosahedron = new THREE.LineSegments(icoWire, icoMat);
    icosahedron.position.set(40, 16, -20);
    meshesGroup.add(icosahedron);

    // Torus Knot
    const torusGeom = new THREE.TorusKnotGeometry(8.5, 2, 80, 16);
    const torusWire = new THREE.WireframeGeometry(torusGeom);
    const torusMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending
    });
    const torusKnot = new THREE.LineSegments(torusWire, torusMat);
    torusKnot.position.set(-42, -15, -25);
    meshesGroup.add(torusKnot);

    // Octahedron
    const octaGeom = new THREE.OctahedronGeometry(9, 1);
    const octaWire = new THREE.WireframeGeometry(octaGeom);
    const octaMat = new THREE.LineBasicMaterial({
      color: 0x00ff9d,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const octahedron = new THREE.LineSegments(octaWire, octaMat);
    octahedron.position.set(44, -32, -15);
    meshesGroup.add(octahedron);

    // Cyber Digital Ground Grid
    const gridHelper = new THREE.GridHelper(260, 40, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -46;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    bgScene.add(gridHelper);

    // Mouse & Scroll Parallax
    let bgMouseX = 0;
    let bgMouseY = 0;
    let bgTargetX = 0;
    let bgTargetY = 0;
    let scrollProgress = 0;

    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;

    window.addEventListener("mousemove", (e) => {
      bgMouseX = (e.clientX - halfW) * 0.04;
      bgMouseY = (e.clientY - halfH) * 0.04;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    window.addEventListener("resize", () => {
      bgCamera.aspect = window.innerWidth / window.innerHeight;
      bgCamera.updateProjectionMatrix();
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    const bgClock = new THREE.Clock();

    function animateBg() {
      requestAnimationFrame(animateBg);
      const elapsed = bgClock.getElapsedTime();

      bgTargetX += (bgMouseX - bgTargetX) * 0.05;
      bgTargetY += (bgMouseY - bgTargetY) * 0.05;

      icosahedron.rotation.x = elapsed * 0.2;
      icosahedron.rotation.y = elapsed * 0.25;

      torusKnot.rotation.x = elapsed * 0.15;
      torusKnot.rotation.y = elapsed * 0.18;

      octahedron.rotation.y = elapsed * 0.2;
      octahedron.rotation.z = elapsed * 0.15;

      particleSystem.rotation.y = elapsed * 0.02 + bgTargetX * 0.008;
      particleSystem.rotation.x = bgTargetY * 0.008;

      gridHelper.position.z = (elapsed * 7) % 13;

      bgCamera.position.x = bgTargetX * 0.6;
      bgCamera.position.y = 10 - bgTargetY * 0.4 - (scrollProgress * 22);
      bgCamera.lookAt(0, -scrollProgress * 15, 0);

      cyanPointLight.intensity = 2.0 + Math.sin(elapsed * 2) * 0.5;
      purplePointLight.intensity = 2.0 + Math.cos(elapsed * 2.2) * 0.5;

      bgRenderer.render(bgScene, bgCamera);
    }
    animateBg();
  }

  /* ==========================================================================
     2. INTERACTIVE 3D DEVELOPER LAPTOP / WORKSTATION
     ========================================================================== */
  function initInteractiveLaptop() {
    const laptopCanvas = document.getElementById("hero-laptop-canvas");
    if (!laptopCanvas) return;

    const container = laptopCanvas.parentElement;
    let width = container.clientWidth || 360;
    let height = container.clientHeight || 340;

    const laptopScene = new THREE.Scene();

    const laptopCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    laptopCamera.position.set(0, 1.8, 6.2);
    laptopCamera.lookAt(0, 0.2, 0);

    const laptopRenderer = new THREE.WebGLRenderer({
      canvas: laptopCanvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    laptopRenderer.setSize(width, height);
    laptopRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    laptopRenderer.shadowMap.enabled = true;
    laptopRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting for Laptop
    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x1a1a2e, 0.9);
    laptopScene.add(hemiLight);

    const laptopCyanLight = new THREE.PointLight(0x00f0ff, 2.8, 15);
    laptopCyanLight.position.set(2, 3, 3);
    laptopScene.add(laptopCyanLight);

    const laptopPurpleLight = new THREE.PointLight(0xa855f7, 2.2, 15);
    laptopPurpleLight.position.set(-2.5, 2, 2);
    laptopScene.add(laptopPurpleLight);

    // Screen dynamic canvas
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const ctx = screenCanvas.getContext("2d");

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    // Laptop Assembly Group
    const laptopGroup = new THREE.Group();
    laptopScene.add(laptopGroup);

    // Base materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.85
    });

    const cyberEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true
    });

    // 1. Laptop Base (Bottom chassis)
    const baseGeom = new THREE.BoxGeometry(3.6, 0.14, 2.4);
    const laptopBase = new THREE.Mesh(baseGeom, bodyMaterial);
    laptopBase.position.y = -0.07;
    laptopGroup.add(laptopBase);

    // Glowing edge under the base
    const baseEdgeGeom = new THREE.BoxGeometry(3.64, 0.15, 2.44);
    const baseEdge = new THREE.Mesh(baseEdgeGeom, cyberEdgeMaterial);
    baseEdge.position.y = -0.07;
    laptopGroup.add(baseEdge);

    // Keyboard Deck Inset
    const kbDeckGeom = new THREE.PlaneGeometry(3.1, 1.4);
    const kbDeckMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.6,
      metalness: 0.4
    });
    const kbDeck = new THREE.Mesh(kbDeckGeom, kbDeckMat);
    kbDeck.rotation.x = -Math.PI / 2;
    kbDeck.position.set(0, 0.005, 0.2);
    laptopGroup.add(kbDeck);

    // Keyboard keys grid procedural texture
    const kbCanvas = document.createElement("canvas");
    kbCanvas.width = 256;
    kbCanvas.height = 128;
    const kbCtx = kbCanvas.getContext("2d");
    kbCtx.fillStyle = "#090d16";
    kbCtx.fillRect(0, 0, 256, 128);
    kbCtx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    kbCtx.lineWidth = 1;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        const x = 8 + c * 17;
        const y = 8 + r * 22;
        kbCtx.strokeRect(x, y, 14, 18);
      }
    }
    // Trackpad
    kbCtx.strokeStyle = "rgba(168, 85, 247, 0.6)";
    kbCtx.strokeRect(88, 105, 80, 18);
    const kbTexture = new THREE.CanvasTexture(kbCanvas);
    const kbKeyMat = new THREE.MeshBasicMaterial({
      map: kbTexture,
      transparent: true
    });
    const kbKeysMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.3), kbKeyMat);
    kbKeysMesh.rotation.x = -Math.PI / 2;
    kbKeysMesh.position.set(0, 0.01, 0.2);
    laptopGroup.add(kbKeysMesh);

    // Trackpad on base
    const trackpadGeom = new THREE.PlaneGeometry(1.1, 0.6);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.2,
      metalness: 0.9
    });
    const trackpad = new THREE.Mesh(trackpadGeom, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.005, 0.85);
    laptopGroup.add(trackpad);

    // Trackpad glowing border
    const tpBorder = new THREE.LineSegments(
      new THREE.EdgesGeometry(trackpadGeom),
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.7 })
    );
    tpBorder.rotation.x = -Math.PI / 2;
    tpBorder.position.set(0, 0.008, 0.85);
    laptopGroup.add(tpBorder);

    // 2. Laptop Lid / Screen Hinge & Display
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, 0.02, -1.18);
    laptopGroup.add(screenHinge);

    // Lid chassis
    const lidGeom = new THREE.BoxGeometry(3.6, 2.35, 0.08);
    const lidBack = new THREE.Mesh(lidGeom, bodyMaterial);
    lidBack.position.set(0, 1.175, -0.04);
    screenHinge.add(lidBack);

    // Back glowing logo (AK / VGU Monogram)
    const logoGeom = new THREE.CircleGeometry(0.24, 32);
    const logoMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const logoMesh = new THREE.Mesh(logoGeom, logoMat);
    logoMesh.position.set(0, 1.2, -0.085);
    logoMesh.rotation.y = Math.PI;
    screenHinge.add(logoMesh);

    // Screen Glass / Display Face
    const screenGeom = new THREE.PlaneGeometry(3.35, 2.1);
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.FrontSide
    });
    const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
    screenMesh.position.set(0, 1.18, 0.005);
    screenHinge.add(screenMesh);

    // Screen glowing bezel border
    const bezelLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(screenGeom),
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 })
    );
    bezelLine.position.set(0, 1.18, 0.008);
    screenHinge.add(bezelLine);

    // Angle the screen comfortably open (~105 degrees)
    screenHinge.rotation.x = THREE.MathUtils.degToRad(-15);

    // Screen light casting back onto keyboard
    const screenPointLight = new THREE.PointLight(0x00f0ff, 1.8, 3.5);
    screenPointLight.position.set(0, 1.0, -0.2);
    laptopGroup.add(screenPointLight);

    // Floating Cyber Halo / Orbiting Holographic Rings around laptop
    const haloRing1 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.RingGeometry(2.4, 2.45, 48)),
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 })
    );
    haloRing1.rotation.x = Math.PI / 2.3;
    laptopGroup.add(haloRing1);

    const haloRing2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.RingGeometry(2.7, 2.75, 48)),
      new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 })
    );
    haloRing2.rotation.x = Math.PI / 2.6;
    haloRing2.rotation.y = 0.3;
    laptopGroup.add(haloRing2);

    // Floating Tech Particles around laptop
    const orbitCount = 28;
    const orbitGeom = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      orbitPos[i * 3] = Math.cos(angle) * radius;
      orbitPos[i * 3 + 1] = (Math.random() - 0.5) * 1.6 + 0.8;
      orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    orbitGeom.setAttribute("position", new THREE.BufferAttribute(orbitPos, 3));
    const orbitPoints = new THREE.Points(
      orbitGeom,
      new THREE.PointsMaterial({
        color: 0x00ff9d,
        size: 0.08,
        transparent: true,
        opacity: 0.8
      })
    );
    laptopGroup.add(orbitPoints);

    // Initial position & tilt
    laptopGroup.position.set(0, -0.4, 0);
    laptopGroup.rotation.y = THREE.MathUtils.degToRad(-25);
    laptopGroup.rotation.x = THREE.MathUtils.degToRad(12);

    // Drag-to-Rotate Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = THREE.MathUtils.degToRad(-25);
    let targetRotX = THREE.MathUtils.degToRad(12);

    const onPointerDown = (e) => {
      isDragging = true;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      prevMouseX = clientX;
      prevMouseY = clientY;
      if (container) container.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotY += deltaX * 0.01;
      targetRotX += deltaY * 0.008;

      // Limit pitch
      targetRotX = Math.max(-0.4, Math.min(0.7, targetRotX));
    };

    const onPointerUp = () => {
      isDragging = false;
      if (container) container.style.cursor = "grab";
    };

    laptopCanvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    laptopCanvas.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Screen Modes
    let screenMode = 0; // 0: Code Mode, 1: Matrix Mode, 2: VGU Diagnostics
    laptopCanvas.addEventListener("click", () => {
      screenMode = (screenMode + 1) % 3;
      if (window.CyberAudio) window.CyberAudio.playClick();
    });

    // Animate Screen Canvas Content
    let codeScroll = 0;
    const codeLines = [
      "// ADITYA KUMAR // VGU CSE 2026",
      "import { Developer } from '@vgu/cse';",
      "const aditya = new Developer({",
      "  name: 'Aditya Kumar',",
      "  status: '3rd Year B.Tech CSE',",
      "  university: 'Vivekananda Global University',",
      "  skills: ['C++', 'Python', 'Java', 'Web3D'],",
      "  projects: ['WeatherGPT', 'FaceAttendance'],",
      "  passion: 'Building scalable systems',",
      "  openToWork: true",
      "});",
      "aditya.initializePortfolio();",
      "// Status: 60 FPS // WebGL Active",
      "// Compiling distributed nodes...",
      "System.out.println('Welcome to my 3D World!');"
    ];

    function drawScreen(time) {
      ctx.fillStyle = "#070c18";
      ctx.fillRect(0, 0, 512, 320);

      // Top Title Bar
      ctx.fillStyle = "#0e172a";
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = "#ff5f56";
      ctx.beginPath();
      ctx.arc(16, 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffbd2e";
      ctx.beginPath();
      ctx.arc(32, 14, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#27c93f";
      ctx.beginPath();
      ctx.arc(48, 14, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#00f0ff";
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.fillText("aditya-kumar@vgu-cse:~ (bash)", 68, 18);

      if (screenMode === 0) {
        // Mode 0: Code Editor
        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px 'JetBrains Mono', monospace";
        for (let i = 0; i < codeLines.length; i++) {
          const y = 52 + i * 18 - (codeScroll % (codeLines.length * 18));
          if (y > 34 && y < 310) {
            const line = codeLines[i];
            if (line.startsWith("//")) ctx.fillStyle = "#64748b";
            else if (line.includes("const") || line.includes("import") || line.includes("new")) ctx.fillStyle = "#a855f7";
            else if (line.includes("Aditya Kumar") || line.includes("Vivekananda")) ctx.fillStyle = "#00ff9d";
            else ctx.fillStyle = "#00f0ff";
            ctx.fillText(line, 16, y);
          }
        }
        codeScroll += 0.4;
      } else if (screenMode === 1) {
        // Mode 1: Cyber Matrix Rain
        ctx.fillStyle = "rgba(0, 255, 157, 0.85)";
        ctx.font = "14px 'JetBrains Mono', monospace";
        for (let col = 0; col < 28; col++) {
          const x = 12 + col * 18;
          const charCode = 65 + Math.floor(Math.sin(time * 3 + col) * 20);
          const y = ((time * 120 + col * 35) % 270) + 40;
          ctx.fillText(String.fromCharCode(charCode), x, y);
        }
        ctx.fillStyle = "#00f0ff";
        ctx.fillText("[MATRIX DATA STREAM // VGU NODE]", 140, 160);
      } else {
        // Mode 2: System Diagnostics
        ctx.fillStyle = "#00f0ff";
        ctx.font = "15px 'Orbitron', sans-serif";
        ctx.fillText("ADITYA KUMAR // SYSTEM HUD", 24, 60);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px 'JetBrains Mono', monospace";
        ctx.fillText("UNIVERSITY: Vivekananda Global University", 24, 95);
        ctx.fillText("PROGRAM: B.Tech Computer Science & Engg", 24, 120);
        ctx.fillText("YEAR / SEM: 3rd Year // Semester VI", 24, 145);
        ctx.fillText("CGPA: 8.9 / 10.0 [Top Tier Standing]", 24, 170);
        ctx.fillText("STATUS: Active // Open for Internships", 24, 195);

        // Progress bar
        ctx.strokeStyle = "#00f0ff";
        ctx.strokeRect(24, 230, 464, 16);
        ctx.fillStyle = "rgba(0, 240, 255, 0.5)";
        const barW = ((Math.sin(time * 2) + 1) / 2) * 460;
        ctx.fillRect(26, 232, barW, 12);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`SYSTEM OPTIMAL: 60 FPS`, 24, 275);
      }

      // Scanline overlay on screen
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let sl = 28; sl < 320; sl += 4) {
        ctx.fillRect(0, sl, 512, 2);
      }

      screenTexture.needsUpdate = true;
    }

    // Resize handler for Laptop Canvas
    const resizeLaptop = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 340;
      laptopCamera.aspect = width / height;
      laptopCamera.updateProjectionMatrix();
      laptopRenderer.setSize(width, height);
    };
    window.addEventListener("resize", resizeLaptop);

    // Animation Loop
    const laptopClock = new THREE.Clock();

    function animateLaptop() {
      requestAnimationFrame(animateLaptop);
      const time = laptopClock.getElapsedTime();

      // Continuous subtle idle float when not dragging
      if (!isDragging) {
        targetRotY += 0.005;
        laptopGroup.position.y = -0.4 + Math.sin(time * 1.6) * 0.08;
      }

      // Smooth lerp rotation
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.08;
      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.08;

      // Orbiting particles & rings
      haloRing1.rotation.z = time * 0.4;
      haloRing2.rotation.z = -time * 0.3;
      orbitPoints.rotation.y = time * 0.5;

      // Update Screen Texture
      drawScreen(time);

      laptopRenderer.render(laptopScene, laptopCamera);
    }
    animateLaptop();
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteractiveLaptop);
  } else {
    initInteractiveLaptop();
  }
})();
