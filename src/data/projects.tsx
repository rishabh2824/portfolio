// The full set of valid project ids, shared with project-details.tsx (whose
// PROJECT_DETAILS is typed Record<ProjectId, ProjectDetails>) and the bento
// grid in sections/projects.tsx. Adding a project here without a matching
// PROJECT_DETAILS entry is now a compile error instead of a modal silently
// stuck on "Loading…".
export type ProjectId =
  | "solarRacing"
  | "aihorizon"
  | "iris"
  | "wisconsincaselab";

// Tile metadata only — title, category, src, and the links shown in the
// dialog's sticky header. Kept deliberately light (no icon sets, no
// SlideShow/embla) since this loads eagerly for every visitor via
// sections/projects.tsx. The modal body (skills + write-up) lives in
// project-details.tsx and is fetched on first open — see BentoTile.
export type Project = {
  id: ProjectId;
  category: string;
  title: string;
  src: string;
  live: string;
  github?: string;
  showSource?: boolean;
};

const projects: Project[] = [
  {
    id: "solarRacing",
    category: "Race car",
    title: "Badger Solar car 02",
    src: "/assets/projects-screenshots/solarRacing/landing.png",
    live: "https://badgersolarracing.org/",
    github: "https://github.com/badgerloop-software",
    showSource: false,
  },
  {
    id: "aihorizon",
    category: "Company Website",
    title: "ai-horizon.io",
    src: "/assets/projects-screenshots/aihorizon/landing.png",
    live: "https://ai-horizon.io/",
  },
  {
    id: "iris",
    category: "Project Management Platform",
    title: "Iris",
    src: "/assets/projects-screenshots/iris/landing.png",
    live: "https://thebookingdesk.com/",
  },
  {
    id: "wisconsincaselab",
    category: "Interactive Case Studies",
    title: "WisconsinCaseLab",
    src: "/assets/projects-screenshots/wisconsincaselab/1.png",
    live: "https://wisconsincaselab.com/",
    github: "https://github.com/rishabh2824/CaseLab",
  },
];

export default projects;
