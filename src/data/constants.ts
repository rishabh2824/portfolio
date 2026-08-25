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
      "Engineered a Qualtrics-integrated AI agent to execute shape generation and selection tasks from user prompts for 100+ participants.",
      "Built a low-latency Python, LLM, and JavaScript pipeline to translate natural language into geometric actions for performance scoring.",
      "Designed a platform for 30+ PhD students to generate demographic-conditioned LLM survey responses, supporting rapid experimentation. Reduced time and costs spent on questionnaire testing by up to 60%.",
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
      "Collaborated with other interns to design and develop the company website with 50+ responsive UI pages and 20+ custom animations.",
      "Integrated backend APIs to build dynamic blog and news pages, and developed an admin panel for real-time content management.",
      "Integrated an AI chat bot for instant answers and 24/7 support, improving engagement by 23%. Built using the MERN stack.",
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
      "Prepared and graded lecture materials, assignments, projects and exams while clarifying concepts during office hours for 60+ students.",
      "Led weekly discussion sections on end-to-end ML model development, including data cleaning, model selection, feature transformations, hyperparameter tuning, model training and performance evaluations through real life case studies.",
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
      "Deployed a decision tree regression model to predict battery backup duration during power loss for data centers statewide with 91% accuracy.",
      "Processed daily updated operations data and applied data cleaning, grid search CV, VIF analysis and pruning to reduce model complexity.",
      "Presented improved maintenance scheduling and preventive measures for high risk sites to stakeholders, reducing system downtime by 15%.",
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
