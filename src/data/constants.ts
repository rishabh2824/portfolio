export enum SkillNames {
  JS = "js",
  TS = "ts",
  REACT = "react",
  NEXTJS = "nextjs",
  TAILWIND = "tailwindcss",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  GITHUB = "github",
  LINUX = "linux",
  DOCKER = "docker",
  AWS = "aws",
  // --- Added for the 3D keyboard keycap refresh ---
  THREEJS = "threejs",
  TANSTACK = "tanstack",
  MYSQL = "mysql",
  DJANGO = "django",
  FASTAPI = "fastapi",
  // "postgre" is a second live keycap object on the board (distinct from
  // "postgres") — mirrored to the same PostgreSQL content per confirmation
  // that the Spline layout is final.
  POSTGRES_ALT = "postgre",
  // --- Added for the experience section (not 3D keyboard keycaps) ---
  PYTHON = "python",
  VITE = "vite",
  FRAMER_MOTION = "motion",
  BIOME = "biome",
  TURSO = "turso",
  DIGITALOCEAN = "digitalocean",
  NETLIFY = "netlify",
  QUALTRICS = "qualtrics",
  MATPLOTLIB = "matplotlib",
  SCIKITLEARN = "scikit",
  PYTORCH = "pytorch",
  TENSORFLOW = "tensorflow",
  JUPYTER = "jupyter",
  AZURE = "azure",
  ELASTICSEARCH = "elasticsearch",
  LOGSTASH = "logstash",
  POWERBI = "powerbi",
}

export type Skill = {
  name: string;
  label: string;
  shortDescription: string;
  icon: string;
};

// The ~9 keyboard-only keycap entries live in a separate module
// (keyboard-skills.ts) so the eagerly-bundled experience timeline — which
// imports only EXPERIENCE_SKILLS from this file — never pulls them in.
export const EXPERIENCE_SKILLS: Partial<Record<SkillNames, Skill>> = {
  [SkillNames.JS]: {
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    icon: "/assets/skills/js.svg",
  },
  [SkillNames.TS]: {
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    icon: "/assets/skills/ts.svg",
  },
  [SkillNames.REACT]: {
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    icon: "/assets/skills/react.svg",
  },
  [SkillNames.TAILWIND]: {
    name: "tailwindcss",
    label: "Tailwind",
    shortDescription: "utility classes hitting different fr fr 🌪️🔥",
    icon: "/assets/skills/tailwindcss.svg",
  },
  [SkillNames.NODEJS]: {
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    icon: "/assets/skills/nodejs.svg",
  },
  [SkillNames.EXPRESS]: {
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    icon: "/assets/skills/express.svg",
  },
  [SkillNames.POSTGRES]: {
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    icon: "/assets/skills/postgresql.svg",
  },
  [SkillNames.MONGODB]: {
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    icon: "/assets/skills/mongodb.svg",
  },
  [SkillNames.GIT]: {
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    icon: "/assets/skills/git.svg",
  },
  [SkillNames.GITHUB]: {
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    icon: "/assets/skills/github.svg",
  },
  [SkillNames.LINUX]: {
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    icon: "/assets/skills/linux.svg",
  },
  // --- Experience-section skills (colored devicon icons) ---
  [SkillNames.PYTHON]: {
    name: "python",
    label: "Python",
    shortDescription: "whitespace enforcement as a lifestyle, iykyk 🐍✨",
    icon: "/assets/skills/python.svg",
  },
  [SkillNames.VITE]: {
    name: "vite",
    label: "Vite",
    shortDescription: "dev server so fast it hits different fr 🌩️⚡",
    icon: "/assets/skills/vitejs.svg",
  },
  [SkillNames.FRAMER_MOTION]: {
    name: "motion",
    label: "Framer Motion",
    shortDescription: "making divs do the most, respectfully 💃🎞️",
    icon: "/assets/skills/framermotion.svg",
  },
  [SkillNames.BIOME]: {
    name: "biome",
    label: "Biome",
    shortDescription: "lint and format said 'we one person now' 🌿💯",
    icon: "/assets/skills/biome.svg",
  },
  [SkillNames.DIGITALOCEAN]: {
    name: "digitalocean",
    label: "DigitalOcean",
    shortDescription: "droplets on droplets, deploy and dip 🌊💧",
    icon: "/assets/skills/digitalocean.svg",
  },
  [SkillNames.NETLIFY]: {
    name: "netlify",
    label: "Netlify",
    shortDescription: "git push and it's live, no cap 🚀🟩",
    icon: "/assets/skills/netlify.svg",
  },
  [SkillNames.MATPLOTLIB]: {
    name: "matplotlib",
    label: "Matplotlib",
    shortDescription: "turning arrays into art, deadass 📊🎨",
    icon: "/assets/skills/matplotlib.svg",
  },
  [SkillNames.SCIKITLEARN]: {
    name: "scikit",
    label: "scikit-learn",
    shortDescription: "fit, predict, flex — the ML starter pack 🤖📈",
    icon: "/assets/skills/scikitlearn.svg",
  },
  [SkillNames.PYTORCH]: {
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "gradients descending, vibes ascending 🔥🧠",
    icon: "/assets/skills/pytorch.svg",
  },
  [SkillNames.TENSORFLOW]: {
    name: "tensorflow",
    label: "TensorFlow",
    shortDescription: "tensors flowing like it's nobody's business 🌊🧮",
    icon: "/assets/skills/tensorflow.svg",
  },
  [SkillNames.JUPYTER]: {
    name: "jupyter",
    label: "Jupyter",
    shortDescription: "running cells out of order like a menace 📓🔀",
    icon: "/assets/skills/jupyter.svg",
  },
  [SkillNames.AZURE]: {
    name: "azure",
    label: "Azure",
    shortDescription: "the cloud that lives in the enterprise, period ☁️🟦",
    icon: "/assets/skills/azure.svg",
  },
  [SkillNames.ELASTICSEARCH]: {
    name: "elasticsearch",
    label: "Elasticsearch",
    shortDescription: "finding your logs faster than you lost them 🔎⚡",
    icon: "/assets/skills/elasticsearch.svg",
  },
  [SkillNames.LOGSTASH]: {
    name: "logstash",
    label: "Logstash",
    shortDescription: "the pipeline plumber for your data, fr 🚰📦",
    icon: "/assets/skills/logstash.svg",
  },
  // --- Experience-section skills (local SVGs — no colored CDN icon available) ---
  [SkillNames.TURSO]: {
    name: "turso",
    label: "Turso",
    shortDescription: "edge databases living rent free 🐢⚡",
    icon: "/assets/skills/turso.png",
  },
  [SkillNames.QUALTRICS]: {
    name: "qualtrics",
    label: "Qualtrics",
    shortDescription: "surveys with a whole PhD behind them 📋🧪",
    icon: "/assets/skills/qualtrics.png",
  },
  [SkillNames.POWERBI]: {
    name: "powerbi",
    label: "Power BI",
    shortDescription: "dashboards that make execs go 'ooooh' 📊💼",
    icon: "/assets/skills/powerbi.png",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  logo?: string;
  description: string[];
  skills: SkillNames[];
};

// Company logos live in /assets/logos; skill pills resolve against
// EXPERIENCE_SKILLS above.
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Sep 2025",
    endDate: "Present",
    title: "Research Assistant",
    company: "Wisconsin School of Business",
    logo: "/assets/logos/wisconsin.png",
    description: [
      "Engineered a Python web service embedded directly in the Qualtrics survey flow for a visual/spatial reasoning study: after observing which shape properties (color, sides, patterns) scored above a pass threshold, 100+ participants wrote natural-language prompts instructing an LLM agent to select shapes on their behalf.",
      "Built a low-latency Python, LLM, and JavaScript pipeline connecting the agent to the survey, translating each prompt into shape selections and scoring them against the passing criteria to measure how well participants had learned and communicated the pattern.",
      "Designed a platform for 30+ PhD students to generate synthetic survey responses from LLMs conditioned on demographic profiles, letting them pilot-test questionnaires before fielding them to real participants. Reduced time and costs spent on questionnaire testing by up to 60%.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.JS,
      SkillNames.REACT,
      SkillNames.VITE,
      SkillNames.TAILWIND,
      SkillNames.TURSO,
      SkillNames.QUALTRICS,
      SkillNames.DIGITALOCEAN,
      SkillNames.NETLIFY,
      SkillNames.GIT,
      SkillNames.GITHUB,
    ],
  },
  {
    id: 2,
    startDate: "May 2025",
    endDate: "Aug 2025",
    title: "Frontend Developer Intern",
    company: "ai-horizon.io",
    logo: "/assets/logos/horizon.png",
    description: [
      "Collaborated with other interns to design and develop the company website with 50+ UI pages and 20+ custom animations.",
      "Integrated backend APIs to build dynamic blog and news pages, and developed an admin panel for real-time content management.",
      "Integrated an AI chat bot to instantly answer visitor questions about the company's products and services, offering 24/7 support and improving engagement. Built using the MERN stack.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.TAILWIND,
      SkillNames.FRAMER_MOTION,
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.MONGODB,
      SkillNames.BIOME,
      SkillNames.GIT,
      SkillNames.GITHUB,
    ],
  },
  {
    id: 3,
    startDate: "Jan 2025",
    endDate: "May 2025",
    title: "Teaching Assistant",
    company: "Wisconsin School of Business",
    logo: "/assets/logos/wisconsin.png",
    description: [
      "Prepared and graded lecture materials, assignments, projects and exams for 60+ students in INFO SYS 423 under Professor Qinglai He. Held weekly office hours.",
      "Led discussion sections introducing the end-to-end ML cycle — dataset cleaning, feature selection, model selection, hyperparameter tuning, and evaluation — through real life case studies, and filled in for delivering lectures.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.MATPLOTLIB,
      SkillNames.SCIKITLEARN,
      SkillNames.PYTORCH,
      SkillNames.JUPYTER,
    ],
  },
  {
    id: 4,
    startDate: "May 2024",
    endDate: "Aug 2024",
    title: "Machine Learning Intern",
    company: "Reliance Jio",
    logo: "/assets/logos/jio.png",
    description: [
      "Deployed a random forest regression model to predict available battery backup runtime for data centers statewide, helping operations teams anticipate how long a site could stay powered through a grid outage. Achieved an average prediction error of 12 minutes.",
      "Processed daily updated operations data, using VIF analysis to remove multicollinear features and pruning to prevent overfitting on the constantly refreshed dataset, tuned via grid search CV.",
      "Presented an improved, proactive maintenance schedule to stakeholders for sites flagged with low predicted battery backup runtime, replacing reactive fixes and reducing system downtime by 15%.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.MATPLOTLIB,
      SkillNames.SCIKITLEARN,
      SkillNames.PYTORCH,
      SkillNames.TENSORFLOW,
      SkillNames.POSTGRES,
      SkillNames.AZURE,
    ],
  },
  {
    id: 5,
    startDate: "May 2023",
    endDate: "Aug 2023",
    title: "Data and Networks Intern",
    company: "NTT DATA",
    logo: "/assets/logos/ntt.png",
    description: [
      "Implemented Python scripts to configure and test new updates to a network setup supporting over 300 devices in a virtual environment.",
      "Deployed the ELK stack to efficiently process VM log data through Logstash and perform in-depth analysis of the data using Elasticsearch.",
      "Presented findings and suggested improvements through a dynamic Power BI dashboard and achieved 20% improvements to network speed.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.ELASTICSEARCH,
      SkillNames.LOGSTASH,
      SkillNames.POWERBI,
      SkillNames.LINUX,
      SkillNames.GIT,
    ],
  },
];
