import { EXPERIENCE_SKILLS, type Skill, SkillNames } from "@/data/constants";

// Kept in a module separate from constants.ts so these ~9 keycap-only
// entries (each with its own prose description) never ride along into the
// eagerly-bundled experience timeline. Only animated-background-scene.tsx —
// itself lazily loaded behind a requestIdleCallback-hidden import() — pulls
// this file in, via the combined SKILLS map below.
const KEYBOARD_ONLY_SKILLS: Partial<Record<SkillNames, Skill>> = {
  [SkillNames.NEXTJS]: {
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "the drama queen of front-end frameworks, and we stan! 👑📜",
    icon: "/assets/skills/nextjs.svg",
  },
  [SkillNames.DOCKER]: {
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    icon: "/assets/skills/docker.svg",
  },
  [SkillNames.AWS]: {
    name: "aws",
    label: "AWS",
    shortDescription:
      "always extra, making everything more complicated, period! 🌐👨‍💻",
    icon: "/assets/skills/aws.svg",
  },
  // --- 3D keyboard keycap refresh (colored devicon icons unless noted) ---
  [SkillNames.THREEJS]: {
    name: "threejs",
    label: "Three.js",
    shortDescription: "turning divs into universes, no cap 🌌🧊",
    icon: "/assets/skills/threejs.svg",
  },
  [SkillNames.TANSTACK]: {
    name: "tanstack",
    label: "TanStack",
    // No devicon asset exists for TanStack; simple-icons is single-color (black).
    shortDescription:
      "query, table, router — the stack said 'why not all three' 🐨🔥",
    icon: "/assets/skills/tanstack.svg",
  },
  [SkillNames.MYSQL]: {
    name: "mysql",
    label: "MySQL",
    shortDescription:
      "the OG relational database, still not dolphin-brained 🐬🗄️",
    icon: "/assets/skills/mysql.svg",
  },
  [SkillNames.DJANGO]: {
    name: "django",
    label: "Django",
    shortDescription: "batteries included, deadlines optional 🔋🐍",
    icon: "/assets/skills/django.svg",
  },
  [SkillNames.FASTAPI]: {
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "async endpoints go zoom, it's giving speed 🚀🩵",
    icon: "/assets/skills/fastapi.svg",
  },
  [SkillNames.POSTGRES_ALT]: {
    name: "postgre",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    icon: "/assets/skills/postgresql.svg",
  },
};

// Full keycap → skill lookup for the 3D keyboard scene, which resolves
// clicked/hovered object names at runtime and so needs every entry.
export const SKILLS: Record<SkillNames, Skill> = {
  ...EXPERIENCE_SKILLS,
  ...KEYBOARD_ONLY_SKILLS,
} as Record<SkillNames, Skill>;
