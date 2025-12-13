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
  tags: string[];
  timeline: string;
  role: string;
  stack: string[];
  highlights: string[];
  learnings: string[];
  links: ProjectLink[];
};

export const projects: ProjectEntry[] = [
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
    tags: ["c++", "openGL", "GLFW", "GLM", "GLSL", "voxels", "rendering", "engine"],
    timeline: "2024",
    role: "Graphics tinkerer",
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
      name: "nskog-portfolio",
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
      "Built for the Unimelb Rover Team to quickly view RTP H.264 camera feeds and monitor stream health. I wanted a single binary that ops teammates could run without wrestling with CLI flags.",
    approach:
      "Used eframe/egui for a native-feeling panel, wired gstreamer pipeline controls, and added small UDP listeners to surface stream events. Everything ships as one Rust binary so setup is painless.",
    fallback: {
      name: "nskog-portfolio",
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
      name: "nskog-portfolio",
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

export const findProject = (slug: string) =>
  projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
