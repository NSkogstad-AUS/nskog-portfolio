export type RepoCardContributor = {
  login: string;
  avatar: string;
  profileUrl: string;
};

export type RepoCardData = {
  name: string;
  fullName: string;
  stars: number;
  description: string | null;
  contributors: RepoCardContributor[];
  footerMetricValue?: number;
  footerMetricLabel?: string;
  footerMetricIcon?: string;
  hideFooterAvatars?: boolean;
};

export type ProjectLink = { label: string; href: string; icon?: string };

export type ProjectEntry = {
  slug: string;
  owner: string;
  repo: string;
  title: string;
  summary: string;
  customDescription: string;
  context: string;
  approach: string;
  fallback: RepoCardData;
  images?: ProjectImage[];
  tags: string[];
  timeline: string;
  role: string;
  stack: string[];
  highlights: string[];
  learnings: string[];
  links: ProjectLink[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: "aden-hive",
    owner: "aden-hive",
    repo: "hive",
    title: "Hive",
    summary: "Outcome-driven agent framework for building, running, and evolving autonomous AI worker systems.",
    customDescription:
      "Outcome-driven agent framework from Aden for building adaptive multi-agent systems with human-in-the-loop controls.",
    context:
      "Hive is an open-source framework from Aden for teams that need AI agents to run real business processes, not just toy demos. The product centers on describing an outcome in natural language, then letting a queen agent generate and coordinate a swarm of worker agents around that goal.",
    approach:
      "The framework combines goal-driven graph generation, parallel execution, human-in-the-loop nodes, browser tooling, and real-time observability so agents can be deployed with stronger guardrails. It is designed to capture failures, evolve the graph, and redeploy, which makes the system feel much closer to an adaptive production runtime than a static chain of prompts.",
    fallback: {
      name: "hive",
      fullName: "aden-hive/hive",
      stars: 9600,
      description:
        "Outcome-driven agent framework from Aden for building adaptive multi-agent systems with human-in-the-loop controls.",
      contributors: [],
      footerMetricValue: 183,
      footerMetricLabel: "Contributors",
      footerMetricIcon: "people",
      hideFooterAvatars: true,
    },
    tags: ["AI", "YC Startup", "Agentic AI", "Open Source"],
    timeline: "2026",
    role: "Open Source Contributor",
    stack: ["Python", "TypeScript", "Multi-Agent Systems", "MCP", "LiteLLM"],
    highlights: [
      "Goal-driven generation: lets users describe outcomes in natural language and turns them into agent graphs plus connection code.",
      "Adaptive runtime: captures failures, recalibrates against objectives, and evolves the agent graph over time.",
      "Operational guardrails: includes human-in-the-loop intervention, browser use, credential management, and live observability for production-style workflows.",
    ],
    learnings: [
      "Agent platforms become more useful when they optimize for outcomes and control loops instead of only prompt orchestration.",
      "Human-in-the-loop tooling is a product feature, not just a safety add-on, when agents touch real workflows.",
      "A strong open-source distribution model can make a complex AI runtime easier to evaluate, trust, and adopt.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/aden-hive/hive", icon: "github" },
    ],
  },
  {
    slug: "lyra-airtable-clone",
    owner: "NSkogstad-AUS",
    repo: "nskog-lyra-airtable_clone",
    title: "Airtable Clone",
    summary:
      "Airtable-style data platform with Google auth, saved grid views, and virtualized performance up to 1,000,000 records.",
    customDescription:
      "Full-stack Airtable clone with Google authentication, movable tables, saved grid views, and fast large-record performance.",
    context:
      "Built as a product-style Airtable clone focused on making the tables page feel complete rather than shipping a shallow UI copy. The main challenge was getting spreadsheet-like interactions, per-user data isolation, and large-table performance to work together cleanly.",
    approach:
      "I used a T3 stack with Next.js, tRPC, Drizzle, PostgreSQL, NextAuth, TanStack Table, TanStack Virtual, and dnd-kit to recreate the main Airtable workflow. Search, filtering, sorting, and view state are pushed into the backend so large datasets stay responsive, while Google login, per-user bases, multiple grids, inline edits, and draggable tables keep the product feeling close to a real multi-user tool.",
    fallback: {
      name: "nskog-lyra-airtable_clone",
      fullName: "NSkogstad-AUS/nskog-lyra-airtable_clone",
      stars: 0,
      description:
        "Full-stack Airtable clone with Google authentication, saved grid views, and virtualized large-table performance.",
      contributors: [],
    },
    images: [
      {
        src: "/assets/sh-air1-x.png",
        alt: "Airtable clone login screen",
        caption: "Google-authenticated entry flow for the Airtable clone.",
      },
      {
        src: "/assets/sh-air2-x.png",
        alt: "Airtable clone grid views interface",
        caption: "Multiple grid views with sortable, hideable fields and saved table configuration.",
      },
      {
        src: "/assets/sh-air3-x.png",
        alt: "Airtable clone tables workspace",
        caption: "Tables workspace with search, filtering, sorting, and large-record performance.",
      },
    ],
    tags: ["next.js", "tRPC", "postgresSQL", "drizzle", "tanstack", "next-auth"],
    timeline: "2026",
    role: "Full-stack Engineer",
    stack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "NextAuth",
      "TanStack Table",
      "TanStack Virtual",
      "dnd-kit",
      "Tailwind CSS",
    ],
    highlights: [
      "Large-scale tables: supports fast interaction across up to 1,000,000 records with virtualized scrolling and backend-driven queries.",
      "Saved grid workflows: lets users create multiple grids, rename them, hide/show fields, sort columns, filter records, and search through table data.",
      "Real product plumbing: includes Google authentication, user-specific data, inline editing, movable tables, and working backend services behind the tables page.",
    ],
    learnings: [
      "Database-level search, filtering, and sorting matter once record counts get large; doing this client-side falls over quickly.",
      "Spreadsheet-like products feel simple only when keyboard movement, inline edits, and drag interactions stay predictable together.",
      "Per-user data boundaries and saved view configuration are core product features, not just backend details, in tools like Airtable.",
    ],
    links: [
      { label: "Live Site", href: "https://nskog-lyra-airtable-clone.vercel.app", icon: "box-arrow-up-right" },
      {
        label: "GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/nskog-lyra-airtable_clone",
        icon: "github",
      },
    ],
  },
  {
    slug: "ai-security-gateway",
    owner: "NSkogstad-AUS",
    repo: "nskog-ai-security-gateway",
    title: "AI Security Gateway",
    summary:
      "Security gateway for AI agents that validates tool calls, enforces policy, logs events, and exposes an operations console.",
    customDescription:
      "TypeScript AI security gateway with Fastify interception APIs, OPA policy support, append-only event logging, and a Next.js console.",
    context:
      "Built to make AI-agent tool usage auditable instead of opaque. The gateway sits in front of tool calls, validates arguments, applies policy decisions, and keeps a traceable event history for approvals, denials, and executions.",
    approach:
      "I structured it as a pnpm monorepo with a Fastify gateway, Next.js console, shared schemas, connector registry, policy engines, Postgres event log, and Splunk exporter. The operations console surfaces queues, timelines, policy traces, connector inventory, and live event trends so security decisions can be reviewed after the fact.",
    fallback: {
      name: "nskog-ai-security-gateway",
      fullName: "NSkogstad-AUS/nskog-ai-security-gateway",
      stars: 0,
      description:
        "Security gateway for AI agents with tool-call validation, OPA policy enforcement, event logging, and an operations console.",
      contributors: [],
    },
    tags: ["AI security", "fastify", "next.js", "OPA", "postgresSQL", "splunk"],
    timeline: "2026",
    role: "Full-stack Engineer",
    stack: [
      "TypeScript",
      "Fastify",
      "Next.js",
      "PostgreSQL",
      "Open Policy Agent",
      "Splunk HEC",
      "pnpm",
    ],
    highlights: [
      "Intercepts AI-agent tool calls, validates arguments with shared schemas, and returns structured allow, deny, or approval-required decisions.",
      "Records each decision phase in an append-only event log so approvals, policy evaluations, denials, and executions can be traced by correlation ID.",
      "Includes a console for queue review, policy trace inspection, connector inventory, KPI cards, timelines, and live event streaming.",
    ],
    learnings: [
      "AI guardrails are easier to trust when every policy decision has a durable trace and a human-readable reason path.",
      "Connector schemas and risk tiers make security controls more maintainable than hard-coding rules per tool call.",
      "A lightweight operations console can turn an enforcement layer into something teams can actually inspect and operate.",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/nskog-ai-security-gateway",
        icon: "github",
      },
    ],
  },
  {
    slug: "nskog-weave",
    owner: "NSkogstad-AUS",
    repo: "nskog-weave",
    title: "Weave",
    summary:
      "AI-powered canvas workspace for simplifying, sorting, ordering, and explaining messy information.",
    customDescription:
      "Interactive AI canvas that helps turn scattered data into clearer, sorted, ordered, and explained outputs.",
    context:
      "Built around the idea that data cleanup and sensemaking should happen in a usable workspace, not only through a prompt box. The project uses AI to help simplify, sort, order, and explain information while keeping the work visible on a canvas.",
    approach:
      "I focused the product around an interactive canvas so users can arrange information spatially, ask AI to clarify or restructure it, and keep the transformed outputs close to the source material. The goal is a workflow that feels more like shaping data than sending one-off chat requests.",
    fallback: {
      name: "nskog-weave",
      fullName: "NSkogstad-AUS/nskog-weave",
      stars: 0,
      description:
        "AI canvas workspace for simplifying, sorting, ordering, and explaining messy information.",
      contributors: [],
    },
    tags: ["AI", "canvas", "data tooling", "workflow", "productivity"],
    timeline: "2026",
    role: "Full-stack Engineer",
    stack: ["AI", "Interactive Canvas", "Data Workflows", "TypeScript"],
    highlights: [
      "Uses AI to simplify, sort, order, and explain information from a more visual workspace.",
      "Centers the workflow on a usable canvas so source data and transformed outputs can stay visible together.",
      "Explores a more structured alternative to prompt-only data sensemaking for messy information.",
    ],
    learnings: [
      "Canvas-based interfaces work best when AI output remains anchored to visible source material.",
      "Data simplification tools need clear ordering and explanation affordances, not just generated summaries.",
      "A visual workflow can make AI transformations easier to review than a linear chat transcript.",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/nskog-weave",
        icon: "github",
      },
    ],
  },
  {
    slug: "blackline-forensics",
    owner: "NSkogstad-AUS",
    repo: "Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
    title: "Blackline Forensics",
    summary: "Deepfake detection portal built with FastAPI + PyTorch for a client brief.",
    customDescription: "A machine learning deep-fake website developed in a team of 5 for a client",
    context:
      "Built with a small team to give investigators a place to upload suspect media and get authenticity scores. I owned the backend scaffolding, wired the model runner, and paired with the front-end to surface inference results cleanly.",
    approach:
      "Prototyped an ingestion API in FastAPI, packaged the model runtime with Docker, and stitched in a signed S3 flow plus PostgreSQL audit trail so we could safely persist artifacts. The web front-end was kept intentionally simple so the team could focus on reliability and handoff docs.",
    fallback: {
      name: "Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
      fullName: "NSkogstad-AUS/Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
      stars: 1,
      description: "Weighs the soul of incoming HTTP requests to stop AI crawlers",
      contributors: [],
    },
    images: [
      {
        src: "/assets/sh-blackline.png",
        alt: "Blackline Forensics interface preview",
      },
    ],
    tags: ["fastAPI", "postgresSQL", "AWS integration", "pytorch", "docker", "ML"],
    timeline: "2024",
    role: "Full-stack & ML Engineer",
    stack: ["FastAPI", "PyTorch", "PostgreSQL", "AWS S3", "Docker", "React"],
    highlights: [
      "Hooked a FastAPI ingestion endpoint to a PyTorch model runner with pre/post-processing to keep detection scores stable.",
      "Added an audit trail with Postgres plus signed S3 asset storage so client uploads stayed isolated and traceable.",
      "Packaged the dev stack with docker-compose and a short handoff guide so the rest of the team could iterate faster.",
    ],
    learnings: [
      "Balancing GPU-heavy inference with predictable API latency by shaping payload sizes and timeouts.",
      "Keeping ML-heavy repos maintainable with typed Pydantic schemas and background task runners.",
      "Small UX touches (job states, retry affordances) make even technical dashboards feel trustworthy to non-engineers.",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/Blackline-AI-Forensic-Tool-for-Detecting-Deepfake-and-Synthetic-Media",
        icon: "github",
      },
    ],
  },
  {
    slug: "voxel-renderer",
    owner: "NSkogstad-AUS",
    repo: "cpp-voxel-renderer",
    title: "Voxel Renderer",
    summary: "GPU-accelerated voxel renderer experimenting with chunk meshing, lighting, and height-map terrain.",
    customDescription: "Small OpenGL playground that renders voxel chunks and a simple height-map terrain",
    context:
      "A personal sandbox to learn modern OpenGL beyond tutorials. I wanted a playful scene with chunked terrain, a responsive camera, and quick knobs to test different lighting setups.",
    approach:
      "Built a chunked world with greedy meshing to cut down draw calls, wired a free-look camera, and exposed toggles for wireframes, normals, and sky gradients. A tiny height-map generator seeds the scene so I can focus on rendering tricks instead of worldbuilding.",
    fallback: {
      name: "cpp-voxel-renderer",
      fullName: "NSkogstad-AUS/cpp-voxel-renderer",
      stars: 1,
      description: "GPU-accelerated voxel renderer with playful lighting experiments and shader tricks",
      contributors: [],
    },
    images: [
      {
        src: "/assets/sh-voxelRenderer.png",
        alt: "Voxel renderer screenshot",
      },
    ],
    tags: ["c++", "openGL", "GLFW", "GLM", "GLSL", "voxels", "rendering", "engine"],
    timeline: "2024",
    role: "Developer  ",
    stack: ["C++17", "OpenGL", "GLFW", "GLM", "GLSL"],
    highlights: [
      "Implemented greedy meshing per chunk to collapse thousands of voxel faces into tight vertex buffers.",
      "Built a camera + input system with smooth damping to feel closer to a game engine than a demo.",
      "Added shader hot-reload hooks to quickly iterate on lighting without restarting the app.",
    ],
    learnings: [
      "Profiling early is critical—GPU capture tools exposed silly state changes that were tanking the frame rate.",
      "Math libraries (GLM) remove friction; it let me focus on rendering ideas instead of vector bookkeeping.",
      "Simple debug UIs make graphics tinkering sustainable; flipping wireframes on/off saved hours.",
    ],
    links: [
      {
        label: "GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/cpp-voxel-renderer",
        icon: "github",
      },
    ],
  },
  {
    slug: "nskog-portfolio",
    owner: "NSkogstad-AUS",
    repo: "nskog-portfolio",
    title: "Personal Portfolio",
    summary: "Card-first Next.js portfolio with GitHub activity, theme toggles, and little product UI experiments.",
    customDescription:
      "A personal portfolio for personal/professional purposes, outlining experience, education, and a personal blog",
    context:
      "This site is my playground for shipping polished UI quickly. I wanted one place that could flex between showcasing work, dropping notes, and experimenting with motion + theming.",
    approach:
      "Leaned on a card grid to keep content scannable, piped in GitHub data for recent commits, and built a theme/accent system that persists to localStorage. MapLibre drives the location card, while custom panels cover experience, education, and contact flows.",
    fallback: {
      name: "nskog-portfolio",
      fullName: "NSkogstad-AUS/nskog-portfolio",
      stars: 1,
      description:
        "A personal portfolio for personal/professional purposes, outlining experience, education, and a personal blog",
      contributors: [],
    },
    tags: ["next.js", "react", "typescript", "javascript", "node.js", "tailwind"],
    timeline: "2025",
    role: "Designer & Engineer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "MapLibre"],
    highlights: [
      "Built GitHub-backed repo and commit cards with graceful fallbacks so the page stays fast without API calls.",
      "Theme + accent palette persists locally and syncs across cards for a cohesive feel.",
      "Status bar, map card, and bouncing photo stack keep the page playful without sacrificing clarity.",
    ],
    learnings: [
      "Strong defaults matter; writing fallbacks first made the API integrations safer.",
      "Little animations (view transitions, bounce cards) go a long way in making static content feel alive.",
      "Documenting layout tokens early meant later sections stayed consistent without rewrites.",
    ],
    links: [
      { label: "Live Site", href: "https://nskog-portfolio.vercel.app/", icon: "box-arrow-up-right" },
      { label: "GitHub Repo", href: "https://github.com/NSkogstad-AUS/nskog-portfolio", icon: "github" },
    ],
  },
  {
    slug: "noval-ai-website",
    owner: "NSkogstad-AUS",
    repo: "nskog-saas-novalai",
    title: "Noval AI Website",
    summary: "AI-themed marketing site for Noval AI built in React/Node with a private GitHub repo.",
    customDescription:
      "Modern, AI-themed website for Noval AI with product messaging, feature highlights, and contact flow.",
    context:
      "Built to give Noval AI a sleek, credible front door for businesses and individuals exploring AI tooling. The focus was on clear messaging, confident visuals, and quick scanning of capabilities.",
    approach:
      "Mapped out the hero, feature bands, and CTA flow, then built a front-end-only React site with reusable sections and a responsive layout. Subtle motion and glow accents keep the page feeling futuristic without burying the copy.",
    fallback: {
      name: "nskog-saas-novalai",
      fullName: "NSkogstad-AUS/nskog-saas-novalai",
      stars: 1,
      description:
        "Modern, AI-themed website for Noval AI with product messaging, feature highlights, and contact flow.",
      contributors: [],
    },
    images: [
      {
        src: "/assets/sh-nv1-home.png",
        alt: "Noval AI homepage hero section",
      },
      {
        src: "/assets/sh-nv2-explore.png",
        alt: "Noval AI feature exploration section",
      },
      {
        src: "/assets/sh-nv3-contact.png",
        alt: "Noval AI contact section",
      },
    ],
    tags: ["react", "node.js", "typescript", "frontend", "freelance", "AI"],
    timeline: "2024",
    role: "Front-end Engineer",
    stack: ["React", "Node.js", "TypeScript"],
    highlights: [
      "Designed a hero + feature narrative that makes the AI offering easy to scan for new visitors.",
      "Built modular sections so new offerings and case studies can be dropped in quickly.",
      "Focused on polish with gradients, glow accents, and restrained motion for a high-tech feel.",
    ],
    learnings: [
      "AI products benefit from clear, concrete outcomes more than generic buzzwords.",
      "Keeping visuals bold but minimal helps enterprise buyers focus on the message.",
      "Reusable section patterns speed up iteration when marketing copy shifts.",
    ],
    links: [
      {
        label: "Private GitHub Repo",
        href: "https://github.com/NSkogstad-AUS/nskog-saas-novalai",
        icon: "github",
      },
    ],
  },
  {
    slug: "ps4-dashboard",
    owner: "NSkogstad-AUS",
    repo: "nskog-react-ps4website",
    title: "Playstation 4 Dashboard Website",
    summary: "A React recreation of the PS4 home screen with animated tiles and controller-like navigation.",
    customDescription:
      "A website that has the look and functionality of the Playstation 4 home screen. Made for fun.",
    context:
      "Built as a nostalgia project to practice motion design. I wanted the page to feel like flipping through console tiles with depth, glow, and smooth focus states.",
    approach:
      "Modeled the tile rail, quick actions, and details drawer. Added keyboard navigation to mimic controller input, layered gradients for the hero background, and kept the codebase lean with Vite + TypeScript.",
    fallback: {
      name: "nskog-react-ps4website",
      fullName: "NSkogstad-AUS/nskog-react-ps4website",
      stars: 1,
      description: "A website that has the look and functionality of the Playstation 4 home screen. Made for fun.",
      contributors: [],
    },
    tags: ["vite", "react", "typescript", "tailwind"],
    timeline: "2023",
    role: "Front-end Engineer",
    stack: ["React", "TypeScript", "Vite", "Tailwind"],
    highlights: [
      "Recreated the PS4 tile rail with focus rings, parallax, and quick-info cards.",
      "Keyboard navigation mimics a controller D-pad, keeping interactions snappy.",
      "Lean asset pipeline with Vite keeps reload times low while tweaking animations.",
    ],
    learnings: [
      "Console UIs rely on strong focus states; reinforcing them with color + scale helps accessibility too.",
      "Framing motion early (durations, easing) avoids a patchwork feel later.",
      "Even playful clones benefit from predictable state machines to avoid weird focus traps.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/NSkogstad-AUS/nskog-react-ps4website", icon: "github" },
    ],
  },
  {
    slug: "rust-rtp-gui",
    owner: "NSkogstad-AUS",
    repo: "urt_gui_app",
    title: "Rust RTP Video GUI",
    summary: "Desktop GUI that glues gstreamer RTP playback with a tidy control panel for robotics streams.",
    customDescription:
      "Rust eframe/egui desktop app with label and buttons to view Mac camera, play RTP H.264 stream, and update label from UDP notifs.",
    context:
      "Quickly view RTP H.264 camera feeds and monitor stream health with a single binary that ops teammates could run without wrestling with CLI flags.",
    approach:
      "Used eframe/egui for a native-feeling panel, wired gstreamer pipeline controls, and added small UDP listeners to surface stream events. Everything ships as one Rust binary so setup is painless.",
    fallback: {
      name: "urt_gui_app",
      fullName: "NSkogstad-AUS/urt_gui_app",
      stars: 1,
      description:
        "Rust eframe/egui desktop app with label and buttons to view Mac camera, play RTP H.264 stream, and update label from UDP notifs.",
      contributors: [],
    },
    tags: ["rust", "egui", "gstreamer", "rtp", "sockets", "communication"],
    timeline: "2024",
    role: "Systems Engineer",
    stack: ["Rust", "eframe/egui", "gstreamer", "RTP", "UDP"],
    highlights: [
      "Wrapped gstreamer pipeline start/stop in a safe UI so teammates could restart streams quickly.",
      "Built a tiny UDP listener to surface stream events directly in the panel.",
      "Bundled everything into a single binary for macOS so no one had to juggle dependencies.",
    ],
    learnings: [
      "GStreamer pipelines are brittle without guardrails—reset paths and surface errors fast.",
      "Rust's type system kept the UI and pipeline state in sync, preventing awkward edge cases.",
      "Small ergonomics (auto-reconnect, inline status) matter a ton for robotics operators.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/NSkogstad-AUS/urt_gui_app", icon: "github" },
    ],
  },
  {
    slug: "collaborative-doc-editor",
    owner: "NSkogstad-AUS",
    repo: "nskog-realtimeDocEditor",
    title: "Collaborative Document Editor",
    summary: "Real-time rich-text editor powered by websockets, shareable links, and Quill.",
    customDescription:
      "Collaborative rich-text editor using Node.js, Socket.io, MongoDB, React and Quill, syncing document edits in real time for multiple users.",
    context:
      "A playground to understand collaborative editing and websocket plumbing. The goal: give multiple people a doc link and keep edits in sync without collisions.",
    approach:
      "Node + Socket.io broker changes, MongoDB persists docs, and the React/Quill front-end broadcasts and applies updates in real time. Each doc lives in its own room so traffic stays scoped.",
    fallback: {
      name: "nskog-realtimeDocEditor",
      fullName: "NSkogstad-AUS/nskog-realtimeDocEditor",
      stars: 1,
      description:
        "Collaborative rich-text editor using Node.js, Socket.io, MongoDB, React and Quill, syncing document edits in real time for multiple users..",
      contributors: [],
    },
    tags: ["react", "socket.IO", "quill", "UUID", "node.js", "mongoDB"],
    timeline: "2024",
    role: "Full-stack Developer",
    stack: ["React", "Node.js", "Socket.io", "MongoDB", "Quill"],
    highlights: [
      "Implemented per-document rooms so updates only broadcast to collaborators on the same doc.",
      "Auto-saves to MongoDB on idle, keeping edits safe without spamming writes.",
      "Added connection + presence indicators so users know when friends join or drop.",
    ],
    learnings: [
      "Operational transform concepts help reason about conflicts even in a lightweight clone.",
      "Websocket backpressure matters—rate limiting bursts kept the server stable.",
      "Clear presence signals reduce anxiety; people trust the tool more when they can see who is editing.",
    ],
    links: [
      { label: "GitHub Repo", href: "https://github.com/NSkogstad-AUS/nskog-realtimeDocEditor", icon: "github" },
    ],
  },
];

export const findProject = (slug?: string) => {
  if (!slug) return undefined;
  return projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
};
