/**
 * Aditya Kumar - Futuristic 3D Personal Portfolio Dataset
 * Student: 3rd Year B.Tech Computer Science and Engineering
 * University: Vivekananda Global University
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Aditya Kumar",
    preferredName: "Aditya",
    title: "B.Tech CSE Student | Developer | Tech Enthusiast",
    subtitles: [
      "B.Tech CSE Student",
      "Full Stack Web Developer",
      "Software Engineer & C++/Java Programmer",
      "AI & Machine Learning Enthusiast",
      "ServiceNow Certified Practitioner"
    ],
    status: "B.Tech CSE (2024–2028)",
    university: "Vivekananda Global University (V.G.U Jaipur)",
    location: "Siwan, Bihar / Jaipur, India",
    permanentAddress: "Police Line Siwan, Dist.- Siwan 841226 (Bihar)",
    phone: "+91-8210784991",
    email: "aditya.rr334@gmail.com",
    dob: "25.10.2004",
    languages: "Hindi & English",
    hobbies: "Playing Cricket & Listening Music",
    cgpa: "8.9 / 10.0",
    semester: "Semester VI (3rd Year)",
    bio: "A dedicated and hardworking B.Tech CSE student at Vivekananda Global University (V.G.U Jaipur) looking for an opportunity to start my professional career in the IT industry, where I can learn new technologies, contribute effectively to team goals, and continuously improve my technical and interpersonal skills.",
    careerObjective: "A dedicated and hardworking B.Tech. CSE student looking for an opportunity to start my professional career in the IT industry, where I can learn new technologies, contribute effectively to team goals, and continuously improve my technical and interpersonal skills.",
    aboutDetailed: {
      paragraphs: [
        "Hello! I'm Aditya Kumar, pursuing B.Tech in Computer Science and Engineering at Vivekananda Global University (V.G.U Jaipur). Originally from Siwan, Bihar, my journey in technology is driven by passion, dedication, and a continuous desire to learn modern computing systems.",
        "With a solid educational foundation from B.S.E.B Patna and specialized engineering coursework at V.G.U Jaipur, I have built strong capabilities in Data Structures & Algorithms, Object-Oriented Programming (Java, C++), DBMS, Full-Stack Web Development, and Artificial Intelligence.",
        "Beyond my academic curriculum, I actively explore ServiceNow enterprise automation, AI-driven conversational agents like WeatherGPT, computer vision attendance systems, and distributed technologies. In my free time, I love playing cricket and listening to music."
      ],
      highlights: [
        { icon: "fa-solid fa-graduation-cap", title: "B.Tech CSE (2024–2028)", desc: "V.G.U Jaipur (Vivekananda Global University)" },
        { icon: "fa-solid fa-laptop-code", title: "Full-Stack & Web Dev", desc: "HTML5, CSS3, Modern JS, APIs & 3D WebGL" },
        { icon: "fa-solid fa-brain", title: "AI & Smart Systems", desc: "Conversational NLP, OpenCV Face Recognition & ML" },
        { icon: "fa-solid fa-certificate", title: "Intermediate (B.S.E.B)", desc: "Passed with 1st Division (2023)" }
      ],
      quickStats: [
        { label: "B.Tech Program", value: "2024-28", sub: "V.G.U Jaipur" },
        { label: "Core Projects", value: "5+", sub: "Shipped & Live" },
        { label: "Tech Stack", value: "13+", sub: "Languages & Tools" },
        { label: "Location", value: "Siwan", sub: "Bihar, India" }
      ]
    },
    socials: {
      linkedin: "https://linkedin.com/in/aditya-kumar",
      email: "mailto:aditya.rr334@gmail.com",
      phone: "tel:+918210784991",
      leetcode: "https://leetcode.com"
    }
  },

  // Technical Skills - All 13 requested skills with 3D card parameters
  skills: [
    {
      id: "c-lang",
      name: "C",
      category: "languages",
      categoryName: "Programming Languages",
      level: 90,
      badge: "Advanced",
      icon: "fa-solid fa-terminal",
      accent: "#00f0ff",
      description: "Low-level memory management, pointers, bitwise arithmetic, and foundational system-level programming."
    },
    {
      id: "cpp-lang",
      name: "C++",
      category: "languages",
      categoryName: "Programming Languages",
      level: 92,
      badge: "Advanced",
      icon: "fa-solid fa-code",
      accent: "#38bdf8",
      description: "Modern C++ (C++17/20), Standard Template Library (STL), OOP concepts, operator overloading, and algorithmic problem solving."
    },
    {
      id: "java-lang",
      name: "Java",
      category: "languages",
      categoryName: "Programming Languages",
      level: 88,
      badge: "Advanced",
      icon: "fa-brands fa-java",
      accent: "#f59e0b",
      description: "Core Java, Multithreading, JVM memory model, Collections Framework, OOP design patterns, and enterprise backend engineering."
    },
    {
      id: "python-lang",
      name: "Python",
      category: "languages",
      categoryName: "Programming Languages",
      level: 92,
      badge: "Expert",
      icon: "fa-brands fa-python",
      accent: "#00ff9d",
      description: "Data analysis, machine learning pipelines, OpenCV, automation scripts, and API development with Flask/FastAPI."
    },
    {
      id: "html-tech",
      name: "HTML",
      category: "web",
      categoryName: "Web Development",
      level: 96,
      badge: "Master",
      icon: "fa-brands fa-html5",
      accent: "#ff5722",
      description: "Semantic HTML5 architecture, Web Accessibility (ARIA), SEO best practices, and responsive modern layout structures."
    },
    {
      id: "css-tech",
      name: "CSS",
      category: "web",
      categoryName: "Web Development",
      level: 94,
      badge: "Master",
      icon: "fa-brands fa-css3-alt",
      accent: "#29b6f6",
      description: "Modern CSS3, Flexbox, CSS Grid, Glassmorphism, 3D transforms, keyframe animations, and custom CSS variables."
    },
    {
      id: "js-tech",
      name: "JavaScript",
      category: "web",
      categoryName: "Web Development",
      level: 90,
      badge: "Advanced",
      icon: "fa-brands fa-js",
      accent: "#facc15",
      description: "ES6+ syntax, asynchronous programming (Async/Await), DOM manipulation, Web APIs, and client-side application logic."
    },
    {
      id: "sql-tech",
      name: "SQL",
      category: "data",
      categoryName: "Database & Backend",
      level: 88,
      badge: "Advanced",
      icon: "fa-solid fa-table",
      accent: "#00f0ff",
      description: "Complex relational queries, indexing, joins, subqueries, stored procedures, and schema normalization."
    },
    {
      id: "dbms-tech",
      name: "DBMS",
      category: "data",
      categoryName: "Database & Backend",
      level: 86,
      badge: "Advanced",
      icon: "fa-solid fa-database",
      accent: "#a855f7",
      description: "Database architectures, ACID transactional integrity, concurrency control, B+ Trees, and ER diagram design."
    },
    {
      id: "dsa-tech",
      name: "Data Structures & Algorithms",
      category: "core",
      categoryName: "Core Computer Science",
      level: 92,
      badge: "Advanced",
      icon: "fa-solid fa-diagram-project",
      accent: "#00ff9d",
      description: "Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy approaches, Searching/Sorting, and asymptotic complexity."
    },
    {
      id: "git-tech",
      name: "Git & Version Control",
      category: "tools",
      categoryName: "DevOps & Tools",
      level: 90,
      badge: "Advanced",
      icon: "fa-brands fa-git-alt",
      accent: "#ec4899",
      description: "Distributed version control, branching workflows, pull requests, merge conflict resolution, and collaborative open-source practices."
    },
    {
      id: "servicenow-tech",
      name: "ServiceNow",
      category: "enterprise",
      categoryName: "Cloud & Automation",
      level: 84,
      badge: "Certified",
      icon: "fa-solid fa-cloud-bolt",
      accent: "#00f0ff",
      description: "ServiceNow Administration Fundamentals, IT Service Management (ITSM), workflow automation, business rules, and micro-certifications."
    },
    {
      id: "webdev-tech",
      name: "Web Development",
      category: "web",
      categoryName: "Web Development",
      level: 92,
      badge: "Advanced",
      icon: "fa-solid fa-globe",
      accent: "#8b5cf6",
      description: "End-to-end full stack architecture, responsive web UI/UX, RESTful API integration, Three.js 3D web graphics, and performance tuning."
    }
  ],

  // 5 Featured Projects Requested by User
  projects: [
    {
      id: "weathergpt",
      title: "WeatherGPT",
      tagline: "Conversational AI for Weather Forecasting, Alerts and Climate Information",
      category: "ai",
      badge: "Flagship AI Project",
      accent: "#00f0ff",
      description: "An intelligent conversational weather assistant powered by Large Language Models and real-time meteorological APIs. Provides hyper-local natural language weather insights, severe weather emergency alerts, multi-day forecasting, and environmental recommendations.",
      highlights: [
        "Natural language prompt understanding transforming colloquial queries ('Should I carry an umbrella in Jaipur today?') into precise real-time data responses",
        "Integration with real-time OpenWeatherMap API and Open-Meteo for live temperature, humidity, UV index, and wind vectors",
        "Automated severe climate alert notifications with precautionary checklists and radar visualizations",
        "Interactive 3D weather status indicators and responsive glassmorphic chat interface"
      ],
      techStack: ["Python", "OpenAI / LLM API", "FastAPI", "JavaScript", "HTML5/CSS3", "Weather APIs"],
      demo: "#projects"
    },
    {
      id: "face-attendance",
      title: "Face Recognition Attendance System",
      tagline: "Automated Biometric Student Attendance via Deep Learning & Computer Vision",
      category: "ai",
      badge: "Computer Vision",
      accent: "#00ff9d",
      description: "A contactless, automated student attendance system engineered with OpenCV and deep neural facial embedding models. Eliminates proxy attendance and manual roll calls by detecting and verifying student faces in real-time camera streams with instant database logging.",
      highlights: [
        "Real-time facial detection and 128-dimensional biometric embedding matching achieving >97% recognition accuracy",
        "Automated attendance timestamping into a secure relational database with exportable Excel/CSV report generation",
        "Anti-spoofing liveness verification detecting photo printouts and smartphone screens to prevent fraudulent check-ins",
        "Intuitive admin dashboard for student registration, class roster management, and monthly attendance analytics"
      ],
      techStack: ["Python", "OpenCV", "Face-Recognition (dlib)", "SQL / SQLite", "Tkinter / Flask", "NumPy"],
      demo: "#projects"
    },
    {
      id: "part-time-platform",
      title: "Event-Based Part-Time Platform",
      tagline: "Real-Time Marketplace Connecting Students with Event & Freelance Opportunities",
      category: "web",
      badge: "Full Stack Platform",
      accent: "#a855f7",
      description: "A dynamic web platform tailored for university students seeking flexible, event-based part-time gigs and campus freelancing. Features intelligent skill-matching, real-time gig notifications, verified organizer profiles, and secure payout tracking.",
      highlights: [
        "Role-based portals for student applicants and event organizers with verification badges and reputation scores",
        "Location and category filtering for concerts, college fests, tech conventions, catering, and promotional drives",
        "Real-time applicant status tracking with instant SMS/Email notifications upon hiring confirmation",
        "Secure digital timesheet management and work-hour verification system"
      ],
      techStack: ["HTML5", "CSS3 / Glassmorphism", "JavaScript", "Node.js", "Express.js", "MongoDB / SQL"],
      demo: "#projects"
    },
    {
      id: "blockchain-pharma",
      title: "Blockchain Pharma Waste Traceability",
      tagline: "Decentralized Immutable Audit Trail for Pharmaceutical Waste Management",
      category: "blockchain",
      badge: "Blockchain & Security",
      accent: "#ffb703",
      description: "A decentralized tracking and audit verification network designed to combat hazardous pharmaceutical waste dumping. Leverages smart contracts and distributed ledgers to record the complete lifecycle of biomedical waste from hospital generation to certified disposal facilities.",
      highlights: [
        "Tamper-proof distributed ledger ensuring end-to-end accountability across hospitals, logistics carriers, and incinerators",
        "Smart contracts enforcing disposal compliance before issuing digital certificates of destruction",
        "Unique QR code identification tagging for medical waste containers with GPS checkpoint scanning",
        "Regulatory compliance dashboard giving environmental agencies transparent real-time audit capabilities"
      ],
      techStack: ["Solidity", "Ethereum / Polygon Testnet", "Web3.js", "Node.js", "HTML5/CSS3", "IPFS"],
      demo: "#projects"
    },
    {
      id: "portfolio-3d",
      title: "Personal 3D Developer Portfolio",
      tagline: "Futuristic Interactive 3D Developer Experience with WebGL & Glassmorphism",
      category: "web",
      badge: "WebGL / Creative Dev",
      accent: "#ec4899",
      description: "A cutting-edge, high-performance personal portfolio website built with pure semantic HTML5, Vanilla CSS, Three.js 3D graphics, and modular JavaScript. Features an interactive 3D laptop workspace, glowing glassmorphism, dynamic tilt physics, and an interactive terminal.",
      highlights: [
        "Custom procedural Three.js 3D laptop model with interactive mouse drag rotation and animated screen display",
        "Zero-dependency Web Audio API sound synthesizer producing tactile sci-fi feedback on micro-interactions",
        "Smooth 3D perspective card tilting, glowing neon borders, and custom reactive neon cursor trail",
        "Full responsiveness with zero UI latency and accessible dark cyberpunk aesthetics"
      ],
      techStack: ["HTML5", "Vanilla CSS3", "JavaScript (ES6+)", "Three.js", "Web Audio API"],
      demo: "#hero"
    }
  ],

  // Certifications
  certifications: [
    {
      id: "python-coursera",
      title: "Crash Course on Python",
      issuer: "Google / Coursera",
      date: "Verified Completion",
      credentialId: "COURSERA-PY-882194",
      badgeIcon: "fa-brands fa-python",
      accent: "#00ff9d",
      skills: ["Python Fundamentals", "Data Structures", "OOP", "Automation Scripts"],
      verifyLink: "https://coursera.org"
    },
    {
      id: "servicenow-fundamentals",
      title: "ServiceNow Administration Fundamentals On Demand",
      issuer: "ServiceNow Now Learning",
      date: "Verified Completion",
      credentialId: "SN-ADMIN-FUND-94021",
      badgeIcon: "fa-solid fa-cloud-bolt",
      accent: "#00f0ff",
      skills: ["ServiceNow Platform", "ITSM Workflows", "User & Role Admin", "Schema Management"],
      verifyLink: "https://nowlearning.servicenow.com"
    },
    {
      id: "servicenow-micro",
      title: "ServiceNow Micro-Certification – Welcome to ServiceNow",
      issuer: "ServiceNow",
      date: "Verified Credential",
      credentialId: "SN-MICRO-WEL-10294",
      badgeIcon: "fa-solid fa-award",
      accent: "#a855f7",
      skills: ["Now Platform Basics", "Lists & Forms", "Service Catalog", "Knowledge Base"],
      verifyLink: "https://nowlearning.servicenow.com"
    },
    {
      id: "web-dev-cert",
      title: "Modern Web Development Foundations",
      issuer: "Online Technical Certification",
      date: "Verified Completion",
      credentialId: "WEB-DEV-MOD-44210",
      badgeIcon: "fa-solid fa-code",
      accent: "#f59e0b",
      skills: ["HTML5 / CSS3", "JavaScript ES6+", "DOM & APIs", "Responsive Design"],
      verifyLink: "https://coursera.org"
    }
  ],

  // Education Timeline
  education: [
    {
      id: "btech-vgu",
      institution: "V.G.U Jaipur (Vivekananda Global University)",
      degree: "Graduation – B.Tech in Computer Science & Engineering",
      period: "2024 — 2028",
      status: "Pursuing",
      score: "Division: Pursuing (V.G.U Jaipur)",
      accent: "#00f0ff",
      icon: "fa-solid fa-graduation-cap",
      highlights: [
        "Specialized coursework in Data Structures, Algorithms, DBMS, Operating Systems, and AI",
        "Engineered production-grade projects including WeatherGPT, Face Attendance, and Web3 traceability",
        "Active practitioner of modern web architectures and ServiceNow cloud automation workflows"
      ]
    },
    {
      id: "intermediate",
      institution: "B.S.E.B Patna",
      degree: "Intermediate Examination",
      period: "2023",
      status: "Completed (1st Division)",
      score: "Result: 1st Division",
      accent: "#a855f7",
      icon: "fa-solid fa-school",
      highlights: [
        "Earned 1st Division honors in Intermediate Board Examinations from B.S.E.B Patna",
        "Established strong analytical foundations in Mathematics, Physics, and Science"
      ]
    },
    {
      id: "matric",
      institution: "B.S.E.B Patna",
      degree: "Matriculation (10th Board)",
      period: "2019",
      status: "Completed (2nd Division)",
      score: "Result: 2nd Division",
      accent: "#00ff9d",
      icon: "fa-solid fa-book-open-reader",
      highlights: [
        "Completed matriculation examinations successfully from B.S.E.B Patna",
        "Developed early enthusiasm for computer science, logical reasoning, and technology"
      ]
    }
  ],

  // Learning Journey - 7 Milestones requested by user
  learningJourney: [
    {
      step: 1,
      id: "journey-prog",
      title: "Programming Fundamentals",
      category: "Foundation",
      icon: "fa-solid fa-code",
      accent: "#00f0ff",
      summary: "Mastered core programming paradigms starting with C, modern C++, and Java.",
      description: "Built a solid bedrock in structured programming, memory management with pointers in C, object-oriented design in C++ and Java, and clean modular code writing."
    },
    {
      step: 2,
      id: "journey-web",
      title: "Web Development",
      category: "Frontend & Full Stack",
      icon: "fa-solid fa-globe",
      accent: "#38bdf8",
      summary: "Created responsive, accessible, and dynamic modern web applications.",
      description: "Progressed from semantic HTML5 and CSS3 to advanced JavaScript (ES6+), DOM manipulation, responsive flexbox/grid layouts, RESTful APIs, and 3D WebGL interfaces with Three.js."
    },
    {
      step: 3,
      id: "journey-dsa",
      title: "Data Structures & Algorithms",
      category: "Problem Solving",
      icon: "fa-solid fa-diagram-project",
      accent: "#00ff9d",
      summary: "In-depth study of algorithmic design, asymptotic complexity, and optimization.",
      description: "Mastered linear and non-linear data structures including linked lists, binary search trees, heaps, graphs, greedy paradigms, dynamic programming, and competitive problem solving."
    },
    {
      step: 4,
      id: "journey-dbms",
      title: "Database Management",
      category: "Data Engineering",
      icon: "fa-solid fa-database",
      accent: "#a855f7",
      summary: "Relational database design, query optimization, and transaction handling.",
      description: "Gained expertise in SQL, ER modeling, relational normalization (1NF through BCNF), indexing mechanisms, ACID compliance, and concurrency control in modern DBMS systems."
    },
    {
      step: 5,
      id: "journey-servicenow",
      title: "ServiceNow & Cloud Automation",
      category: "Enterprise Tech",
      icon: "fa-solid fa-cloud-bolt",
      accent: "#ffb703",
      summary: "Certified training in enterprise IT workflows and platform administration.",
      description: "Completed ServiceNow Administration Fundamentals and Micro-Certifications; learned ITSM lifecycle, business rules, service catalog automation, and cloud workflow orchestration."
    },
    {
      step: 6,
      id: "journey-ai",
      title: "AI / Machine Learning",
      category: "Emerging Technologies",
      icon: "fa-solid fa-brain",
      accent: "#f43f5e",
      summary: "Exploration of computer vision, deep learning embeddings, and conversational AI.",
      description: "Implemented practical AI solutions including OpenCV-based facial recognition for biometric attendance and LLM-powered conversational forecasting with WeatherGPT."
    },
    {
      step: 7,
      id: "journey-projects",
      title: "Projects & Practical Learning",
      category: "System Engineering",
      icon: "fa-solid fa-rocket",
      accent: "#ec4899",
      summary: "Synthesizing full-stack, AI, and blockchain into production-grade systems.",
      description: "Delivered 5+ end-to-end applications solving real-world challenges, emphasizing code quality, intuitive UI/UX, security, and decentralized traceability."
    }
  ],

  // Academic Deck ("My Academic Journey") - 9 Core Subjects requested
  academicSubjects: [
    {
      id: "subj-java",
      code: "CS301",
      name: "Java Programming",
      category: "core",
      semester: "Sem III",
      icon: "fa-brands fa-java",
      accent: "#f59e0b",
      description: "Comprehensive object-oriented programming with Java, covering multithreading, exception hierarchies, JVM architecture, and Collections.",
      topics: ["Object-Oriented Design & Encapsulation", "Multithreading & Concurrency", "Java Collections Framework", "Exception Handling & File I/O", "GUI & Event-Driven Programming"]
    },
    {
      id: "subj-ds",
      code: "CS302",
      name: "Data Structures",
      category: "core",
      semester: "Sem III",
      icon: "fa-solid fa-cubes",
      accent: "#00f0ff",
      description: "Foundations of linear and non-linear data structures, memory layout, operational efficiency, and abstract data types.",
      topics: ["Stacks, Queues & Circular Buffers", "Singly & Doubly Linked Lists", "Binary Trees & BSTs", "Heap & Priority Queues", "Hashing & Collision Resolution"]
    },
    {
      id: "subj-daa",
      code: "CS401",
      name: "Design & Analysis of Algorithms",
      category: "core",
      semester: "Sem IV",
      icon: "fa-solid fa-code-branch",
      accent: "#00ff9d",
      description: "Asymptotic analysis, advanced algorithmic design patterns, recurrence relations, and complexity classifications.",
      topics: ["Divide & Conquer (Merge / Quick Sort)", "Greedy Methods (Kruskal, Prim)", "Dynamic Programming (Knapsack, LCS)", "Backtracking & Branch-and-Bound", "NP-Completeness & Reductions"]
    },
    {
      id: "subj-dbms",
      code: "CS402",
      name: "DBMS",
      category: "data",
      semester: "Sem IV",
      icon: "fa-solid fa-database",
      accent: "#a855f7",
      description: "Relational modeling, SQL dialect mastery, transactional integrity, concurrency schedules, and storage engines.",
      topics: ["Relational Algebra & Tuple Calculus", "Normalization (1NF, 2NF, 3NF, BCNF)", "ACID Properties & Transaction Schedules", "Two-Phase Locking & Recovery", "Indexing with B+ Trees"]
    },
    {
      id: "subj-os",
      code: "CS403",
      name: "Operating Systems",
      category: "systems",
      semester: "Sem IV",
      icon: "fa-solid fa-microchip",
      accent: "#38bdf8",
      description: "Kernel design, process lifecycle, CPU scheduling, thread synchronization primitives, virtual memory, and file systems.",
      topics: ["CPU Scheduling Algorithms", "Semaphores, Mutexes & Deadlocks", "Virtual Memory & Demand Paging", "File Allocation & Directory Structures", "Inter-Process Communication (IPC)"]
    },
    {
      id: "subj-de",
      code: "CS303",
      name: "Digital Electronics",
      category: "systems",
      semester: "Sem III",
      icon: "fa-solid fa-bolt",
      accent: "#ffb703",
      description: "Boolean logic, combinational and sequential circuit design, logic gates, flip-flops, registers, and digital system synthesis.",
      topics: ["Boolean Algebra & Karnaugh Maps", "Multiplexers, Decoders & Adders", "Flip-Flops (SR, JK, D, T)", "Synchronous / Asynchronous Counters", "Finite State Machine Design"]
    },
    {
      id: "subj-cn",
      code: "CS501",
      name: "Computer Networks",
      category: "systems",
      semester: "Sem V",
      icon: "fa-solid fa-network-wired",
      accent: "#ec4899",
      description: "Layered network architecture (OSI & TCP/IP), transport protocols, congestion control, routing algorithms, and network security.",
      topics: ["OSI 7-Layer & TCP/IP Reference Models", "TCP 3-Way Handshake & Flow Control", "IPv4 / IPv6 Addressing & Subnetting", "Routing Protocols (OSPF, BGP)", "DNS, HTTP/HTTPS & Cryptography"]
    },
    {
      id: "subj-da",
      code: "CS502",
      name: "Data Analysis",
      category: "data",
      semester: "Sem V",
      icon: "fa-solid fa-chart-line",
      accent: "#14b8a6",
      description: "Exploratory data analysis, statistical modeling, data wrangling, hypothesis testing, and interactive visual reporting.",
      topics: ["Data Wrangling with Python & Pandas", "Descriptive & Inferential Statistics", "Data Visualization with Matplotlib/Seaborn", "Correlation & Linear Regression Analysis", "Data Cleaning & Anomaly Detection"]
    },
    {
      id: "subj-ml",
      code: "CS503",
      name: "Machine Learning",
      category: "ai",
      semester: "Sem V",
      icon: "fa-solid fa-brain",
      accent: "#f43f5e",
      description: "Supervised and unsupervised learning, mathematical optimization, model evaluation, and foundational neural networks.",
      topics: ["Supervised Learning (Regression & Classification)", "Unsupervised Clustering (K-Means, PCA)", "Decision Trees & Random Forests", "Gradient Descent & Loss Optimization", "Model Validation (ROC-AUC, F1-Score)"]
    }
  ],

  // Achievements
  achievements: [
    {
      id: "ach-1",
      title: "ServiceNow Certified Credential",
      category: "certifications",
      badge: "Enterprise Tech",
      icon: "fa-solid fa-award",
      accent: "#00f0ff",
      description: "Earned official ServiceNow Administration Fundamentals and Micro-Certification credentials for enterprise platform mastery."
    },
    {
      id: "ach-2",
      title: "Academic Excellence at VGU",
      category: "academics",
      badge: "Top Tier",
      icon: "fa-solid fa-graduation-cap",
      accent: "#00ff9d",
      description: "Consistently maintained 8.9+ CGPA across completed semesters in B.Tech Computer Science and Engineering at Vivekananda Global University."
    },
    {
      id: "ach-3",
      title: "AI & Innovation Hackathons",
      category: "competitions",
      badge: "Hackathons",
      icon: "fa-solid fa-trophy",
      accent: "#ffb703",
      description: "Developed and showcased innovative prototypes like WeatherGPT and Contactless Face Recognition Attendance in technical competitions."
    },
    {
      id: "ach-4",
      title: "5+ Shipped Production Projects",
      category: "projects",
      badge: "Engineering",
      icon: "fa-solid fa-rocket",
      accent: "#a855f7",
      description: "Engineered full-stack and decentralized applications spanning blockchain, WebGL, computer vision, and real-time marketplaces."
    }
  ]
};

// Global export
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
