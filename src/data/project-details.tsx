import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  SiAstro,
  SiConvex,
  SiDigitalocean,
  SiExpress,
  SiFastapi,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import type { Project, ProjectId } from "./projects";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  icon: ReactNode;
};
// Only the skills actually referenced by a project below — see git history
// for the full icon set if a future project needs one of the others back.
const PROJECT_SKILLS = {
  node: {
    title: "Node.js",
    icon: <SiNodedotjs />,
  },
  mongo: {
    title: "MongoDB",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    icon: <SiExpress />,
  },
  tailwind: {
    title: "Tailwind CSS",
    icon: <SiTailwindcss />,
  },
  astro: {
    title: "Astro",
    icon: <SiAstro />,
  },
  js: {
    title: "JavaScript",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    icon: <SiTypescript />,
  },
  react: {
    title: "React.js",
    icon: <SiReact />,
  },
  framerMotion: {
    title: "Framer Motion",
    icon: <SiFramer />,
  },
  postgres: {
    title: "PostgreSQL",
    icon: <SiPostgresql />,
  },
  fastapi: {
    title: "FastAPI",
    icon: <SiFastapi />,
  },
  digitalocean: {
    title: "DigitalOcean",
    icon: <SiDigitalocean />,
  },
  svelte: {
    title: "Svelte",
    icon: <SiSvelte />,
  },
  convex: {
    title: "Convex",
    icon: <SiConvex />,
  },
};

export type ProjectDetails = {
  skills: { frontend: Skill[]; backend: Skill[] };
  skillsLabel?: string;
  content: (project: Project) => ReactNode;
};

const PROJECT_DETAILS: Record<ProjectId, ProjectDetails> = {
  solarRacing: {
    skillsLabel: "Tech stack",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.astro,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          Badger Solar Racing started its journey with a strong debut, placing
          7th in its first race and earning Rookie of the Year in 2023. After
          months of building Sunburst from the ground up to be lighter, faster,
          and more efficient, we have set our sights on the 2026 American Solar
          Challenge.
        </TypographyP>
        <ProjectsLinks live={project.live} repo={project.github} />
        <TypographyH3 className="my-4 mt-8">My Contributions </TypographyH3>
        <p className="font-mono mb-2">
          Worked with the Race Strategy team to model optimal speed and racing
          lines using Python and Matplotlib based on numerous factors like
          battery backups, system temperatures etc. Iteratively improved designs
          by collaborating with engineering teams. Also assisted the software
          team to develop the clubs website.
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/solarRacing/carousel1.webp`,
            `${BASE_PATH}/solarRacing/carousel2.webp`,
            `${BASE_PATH}/solarRacing/carousel3.webp`,
            `${BASE_PATH}/solarRacing/carousel4.jpg`,
          ]}
        />
      </div>
    ),
  },
  aihorizon: {
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.framerMotion,
      ],
      backend: [
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.node,
      ],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          ai-horizon.io is an AI startup that delivers agentic AI solutions and
          custom AI agents for businesses. During my summer 2025 internship, I
          worked with a team of interns to rebuild the company website from the
          ground up. I focused primarily on the frontend, translating UI designs
          into production-ready interfaces and implementing hundreds of
          optimized animations, while also contributing to system design, SEO,
          and security features.
        </TypographyP>
        <ProjectsLinks live={project.live} repo={project.github} />
        <SlideShow
          images={[
            `${BASE_PATH}/aihorizon/carousel1.webp`,
            `${BASE_PATH}/aihorizon/carousel2.webp`,
            `${BASE_PATH}/aihorizon/carousel3.webp`,
            `${BASE_PATH}/aihorizon/carousel4.webp`,
          ]}
        />
      </div>
    ),
  },
  iris: {
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.digitalocean,
      ],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          Iris is a Jira-style internal project management tool custom built for
          DataCEVA. It integrates seamlessly with their existing client
          database, giving the team client-specific ticket tracking through
          custom Kanban boards. Employees have access to personalized,
          role-specific views, each built for how they actually work. Kanban
          boards are feature-packed, with tickets supporting comments, file
          attachments, and various filtering and sorting methods.
        </TypographyP>
        <SlideShow
          images={[
            `${BASE_PATH}/iris/1.webp`,
            `${BASE_PATH}/iris/2.webp`,
            `${BASE_PATH}/iris/3.webp`,
            `${BASE_PATH}/iris/4.webp`,
          ]}
        />
        <TypographyH3 className="my-4 mt-8">
          Slack-Integrated Ticketing
        </TypographyH3>
        <p className="font-mono mb-2">
          Tickets tag directly into Slack workspaces, and AI-powered automated
          messages and emails keep clients and employees updated without manual
          follow-up.
        </p>
        <TypographyH3 className="my-4 mt-8">Admin Features</TypographyH3>
        <p className="font-mono mb-2 my-8">
          Admins have access to manage various employee and client records,
          along with options to modify Kanban boards. They can also view an
          analytics dashboard to track time spent on projects along with
          employee-level breakdowns, facilitating accurate client billing.
        </p>
      </div>
    ),
  },
  wisconsincaselab: {
    skills: {
      frontend: [PROJECT_SKILLS.svelte, PROJECT_SKILLS.tailwind],
      backend: [PROJECT_SKILLS.convex],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          Wisconsin Case Lab is a platform where professors can create
          interactive case studies for their students within minutes. Filling
          out a simple form sets up LLM agents that students chat with to gather
          case-related information, unlock other personas, and gain access to
          case files.
        </TypographyP>
        <ProjectsLinks live={project.live} repo={project.github} />
        <SlideShow
          images={[
            `${BASE_PATH}/wisconsincaselab/1.webp`,
            `${BASE_PATH}/wisconsincaselab/2.webp`,
            `${BASE_PATH}/wisconsincaselab/3.webp`,
            `${BASE_PATH}/wisconsincaselab/4.webp`,
          ]}
        />
        <TypographyH3 className="my-4 mt-8">Agent Workflows</TypographyH3>
        <p className="font-mono mb-2">
          Once a student has gathered enough evidence, they upload a report with
          their findings or solution and receive automated feedback and
          evaluation.
        </p>
        <TypographyH3 className="my-4 mt-8">Admin Panel</TypographyH3>
        <p className="font-mono mb-2 my-8">
          A dedicated admin panel lets professors manage access, and create or
          update cases.
        </p>
      </div>
    ),
  },
};

export default PROJECT_DETAILS;
