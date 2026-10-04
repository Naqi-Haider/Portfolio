export const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'neurohaven',
    title: "NeuroHaven: Doctor Dashboard for an Alzheimer's Care Platform",
    shortTitle: "NeuroHaven Dashboard",
    label: 'Final-year project · Team',
    tags: ['Full-stack'],
    featured: true, // Spans 2 cols on desktop AND tablet with horizontal layout
    wide: false,
    tagline: 'Clinician-facing dashboard bridging patient app and automated telemetry.',
    techStackPreview: ['Next.js', 'TypeScript', 'Supabase'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Socket.IO', 'Zustand', 'Recharts'],
    cover: '/images/projects/nr-thumbnail.webp', // Card thumbnail in grid
    drawerImage: '/NeuroHavenLP.webp', // Original default landing page
    coverAlt: 'NeuroHaven Clinical Dashboard Overview',
    description: "NeuroHaven is a team-built platform connecting Alzheimer's patients, caregivers, and clinicians. I built the web side: the Doctor Dashboard bridging the Flutter patient app and clinicians (integrating with a Python backend), and the Admin panel.",
    bullets: [
      "Real-time doctor-patient chat, calling, distress-alert system, and chat export (CSV/TXT).",
      "Cognitive scoring engine (streak-adjusted 0–100 scale) with four color-coded risk tiers.",
      "Weekly adherence grids and live behavioral trend graphs.",
      "Admin panel for platform moderation, support tickets, and doctor-patient assignment/reassignment."
    ],
    gallery: [
      { id: 0, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Landing Page', caption: "Landing page: early-stage Alzheimer's companion platform", image: '/NeuroHavenLP.webp' },
      { id: 1, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Clinical Overview', caption: 'Clinical overview: active care pathways, cohort metrics, and cognitive trend telemetry', image: '/neurohaven-ss/1st.webp' },
      { id: 2, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Alerts Centre', caption: 'Alerts centre: distress alerts by severity', image: '/neurohaven-ss/2nd.webp?v=2' },
      { id: 3, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Patient Directory', caption: 'Patient directory: cohort monitoring, risk indexes, and recency', image: '/neurohaven-ss/3rd.webp' },
      { id: 4, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Patient Profile & Scoring', caption: 'Patient profile and scoring: longitudinal history and activity ledger', image: '/neurohaven-ss/4th.webp' },
      { id: 5, group: 'doctor', groupLabel: 'Doctor Dashboard', title: 'Doctor-Patient Chat', caption: 'Doctor-patient chat: real-time clinical channel and telemetry snapshot', image: '/neurohaven-ss/5th.webp' },
      { id: 6, group: 'admin', groupLabel: 'Admin Console', title: 'Admin Console', caption: 'Systems console: clinician credentials and patient directory management', image: '/neurohaven-ss/6th.webp' },
      { id: 7, group: 'admin', groupLabel: 'Admin Console', title: 'Support Tickets', caption: 'Help desk: support tickets, bug triage, and account resolution', image: '/neurohaven-ss/7th.webp' },
      { id: 8, group: 'admin', groupLabel: 'Admin Console', title: 'Clinical Audits', caption: 'Clinical audits: case records, feedback, and doctor-patient assignment', image: '/neurohaven-ss/8th.webp' }
    ],
    galleryOptions: { hideThumbnails: false, hideCounts: false },
    links: {
      github: 'https://github.com/Naqi-Haider/NeuroHaven-Doc-Module',
      githubLabel: 'Source Code'
    }
  },
  {
    id: 2,
    slug: 'cogdrift',
    title: 'CogDrift: Clinician-Gated Anomaly Monitoring Engine',
    shortTitle: 'CogDrift Engine',
    label: 'Open source · Research prototype',
    tags: ['Full-stack'],
    featured: false,
    wide: false,
    tagline: 'Flags unusual patterns in cognitive-game data for clinician review.',
    techStackPreview: ['FastAPI', 'Python', 'scikit-learn'],
    technologies: ['FastAPI', 'Python', 'scikit-learn', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    cover: '/images/projects/cogdrift.webp',
    coverAlt: 'CogDrift Clinician Monitoring Interface',
    description: "A standalone service spun out of NeuroHaven. Two detectors run on each patient's own history: a rolling 30-day z-score trend detector and an Isolation Forest over the 10-game score vector, both with persistence rules to avoid single-day noise. Flags go to a clinician review queue, and only clinician-confirmed flags produce a caregiver message, which is content-filtered server-side to block medication or dosage instructions.",
    bullets: [
      "JWT-based RBAC with caregiver access scoped to their own patients, enforced at the endpoint and covered by tests.",
      "Dual-mode event dispatch (in-process or RabbitMQ).",
      "Deployed on Vercel, Back4App (Docker), and Neon PostgreSQL.",
      "Evaluated on a synthetic dataset with documented limitations."
    ],
    gallery: [
      { id: 1, group: 'clinician', groupLabel: 'Clinician Portal', title: 'Clinician Portal', caption: 'Clinician workflow queue: pending signals & 30-day rolling baseline trajectory chart', image: '/cg-ss/cg1.webp' },
      { id: 2, group: 'caregiver', groupLabel: 'Caregiver Portal', title: 'Caregiver Portal', caption: 'Authorized caregiver feed: human-in-the-loop verified guidance notes and patient scope', image: '/cg-ss/cg2.webp' }
    ],
    galleryOptions: { hideThumbnails: true, hideCounts: true },
    links: {
      github: 'https://github.com/Naqi-Haider/cogdrift',
      githubLabel: 'Source Code',
      live: 'https://cogdrift-theta.vercel.app/',
      liveLabel: 'Live Demo'
    }
  },
  {
    id: 3,
    slug: 'free-gift-cart-drawer',
    title: 'Tiered Free Gift Cart Drawer',
    shortTitle: 'Tiered Gift Cart',
    label: 'Shopify Feature',
    tags: ['Shopify'],
    featured: false,
    wide: false,
    tagline: 'Unlocks milestone gifts with live spend progress.',
    techStackPreview: ['Liquid', 'JavaScript', 'Cart API'],
    technologies: ['Liquid', 'JavaScript', 'Cart API', 'Automatic Discounts', 'Theme Editor Settings'],
    cover: '/images/projects/shopify-cart.webp?v=2',
    coverFallback: 'https://img.youtube.com/vi/rRrfYAfhp3k/maxresdefault.jpg',
    coverAlt: 'Tiered Free Gift Cart Drawer Demo',
    description: 'A custom cart drawer feature built on Dawn that rewards customers with free gifts at two spend thresholds. At $60, a free gift (gloves) is added automatically, and at $100 a second one (a beanie). Both are backed by Buy X Get Y automatic discounts in the Shopify admin. The merchant can choose any product as the gift for each tier and change the threshold amounts from the theme editor, with no code changes.',
    bullets: [
      'A progress bar with tier markers and a live "Add $X more to unlock…" message.',
      'Free Gift badges with the original price struck through.',
      'A "You saved with free gifts" line once gifts are applied.',
      'Safe reverting: if the cart drops below a threshold, the gift is removed automatically and a loader shows while the cart updates.'
    ],
    videoUrl: 'https://youtu.be/rRrfYAfhp3k',
    links: {}
  },
  {
    id: 4,
    slug: 'linked-product-swatches',
    title: 'Linked Product Swatches (Cross-Product Switching)',
    shortTitle: 'Linked Swatches',
    label: 'Shopify Feature',
    tags: ['Shopify'],
    featured: false,
    wide: false,
    tagline: 'Switch between related products without full page reload.',
    techStackPreview: ['Liquid', 'JavaScript', 'Metafields'],
    technologies: ['Liquid', 'JavaScript', 'Metafields', 'Section Rendering API'],
    cover: '/images/projects/shopify-swatches.webp',
    coverFallback: 'https://img.youtube.com/vi/_3M6osuuCQs/maxresdefault.jpg',
    coverAlt: 'Linked Product Swatches Demo',
    description: 'A custom swatch selector for products that are listed separately but belong together, such as the same shirt in brown, blue, red, and yellow. Related products are connected through a "Linked products" metafield (list of products) on each product. On a product page, the swatches show the other linked products. Clicking one fetches that product\'s template with the Section Rendering API and swaps in its media, title, price, and details, with no full page refresh and the URL updating to the new product.',
    bullets: [],
    videoUrl: 'https://youtu.be/_3M6osuuCQs',
    links: {}
  },
  {
    id: 5,
    slug: 'voluspa-product-page',
    title: 'Voluspa Product Page Recreation',
    shortTitle: 'Voluspa Recreation',
    label: 'Shopify Template',
    tags: ['Shopify'],
    featured: false,
    wide: false,
    tagline: 'Luxury brand product page rebuilt as editable Dawn template.',
    techStackPreview: ['Liquid', 'HTML/CSS', 'Custom Sections'],
    technologies: ['Liquid', 'HTML/CSS', 'JavaScript', 'Custom Sections'],
    cover: '/images/projects/shopify-voluspa.webp',
    coverFallback: 'https://img.youtube.com/vi/rXeda9wYzV8/maxresdefault.jpg',
    coverAlt: 'Voluspa Product Page Recreation',
    description: 'A recreation of the Voluspa product page inside a Dawn theme, built to practice turning a real-world design into editable theme sections and blocks. It covers the layout, responsive styling, and a custom related-products section made just for this template. The merchant adds products from the theme editor, and the section is styled to match the original\'s related-products layout.',
    bullets: [],
    videoUrl: 'https://youtu.be/rXeda9wYzV8',
    videoCaption: 'Based on the Voluspa product page as it appeared in September 2026',
    links: {}
  },
  {
    id: 6,
    slug: 'typing-sprint',
    title: 'Typing Sprint Game',
    shortTitle: 'Typing Sprint',
    label: 'Full-stack App',
    tags: ['Game', 'Full-stack'],
    featured: false,
    wide: false,
    tagline: 'Real-time typing test with live WPM metrics and leaderboard.',
    techStackPreview: ['React', 'Node.js', 'MongoDB'],
    technologies: ['React', 'CSS', 'Node.js', 'Express', 'MongoDB'],
    cover: '/images/projects/ts-thumbnail.webp', // Card thumbnail in grid
    drawerImage: '/images/projects/typing-sprint.webp', // Original full image in drawer
    coverAlt: 'Typing Sprint Game Gameplay',
    description: 'Interactive utility to test and improve typing speed and accuracy, featuring live typing metrics (WPM/accuracy), database-backed leaderboard systems, and clean game state transitions.',
    bullets: [],
    links: {
      github: 'https://github.com/Naqi-Haider/TypingSprint',
      githubLabel: 'Source Code',
      live: 'https://typing-sprint.netlify.app',
      liveLabel: 'Live Demo'
    }
  },
  {
    id: 7,
    slug: 'lms',
    title: 'Learning Management System (LMS)',
    shortTitle: 'LMS Platform',
    label: 'Role-based LMS',
    tags: ['Full-stack'],
    featured: false,
    wide: true, // Spans 2 cols on desktop with horizontal layout, collapses to 1 col on tablet
    tagline: 'Multi-role admin, instructor, and student educational portal.',
    techStackPreview: ['React', 'Node.js', 'MongoDB'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    cover: '/images/projects/lms.webp',
    coverAlt: 'Learning Management System Dashboard',
    description: 'A multi-role admin, instructor, and student role-based simplified LMS system featuring course enrollment, assignment progression tracking, and comprehensive educational management attributes.',
    bullets: [],
    links: {
      github: 'https://github.com/Naqi-Haider/LMS',
      githubLabel: 'Source Code',
      live: 'https://learningmanagementsystem-naqi.netlify.app/',
      liveLabel: 'Live Demo'
    }
  }
];
