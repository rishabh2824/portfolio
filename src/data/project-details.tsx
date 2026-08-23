import {
  ArrowUpRight,
  Network,
  Palette,
  PanelsTopLeft,
  Triangle,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  SiAstro,
  SiExpress,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import type { Project, ProjectId } from "./projects";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
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
  next: {
    title: "Next.js",
    icon: <Triangle />,
  },
  chakra: {
    title: "Chakra UI",
    icon: <Palette />,
  },
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
  sanity: {
    title: "Sanity",
    icon: <PanelsTopLeft />,
  },
  framerMotion: {
    title: "Framer Motion",
    icon: <SiFramer />,
  },
  supabase: {
    title: "Supabase",
    icon: <Network />,
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
            `${BASE_PATH}/solarRacing/carousel1.png`,
            `${BASE_PATH}/solarRacing/carousel2.png`,
            `${BASE_PATH}/solarRacing/carousel3.png`,
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
            `${BASE_PATH}/aihorizon/carousel1.png`,
            `${BASE_PATH}/aihorizon/carousel2.png`,
            `${BASE_PATH}/aihorizon/carousel3.png`,
            `${BASE_PATH}/aihorizon/carousel4.png`,
          ]}
        />
      </div>
    ),
  },
  iris: {
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.sanity],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          Iris is your ultimate travel consultation hub, designed to turn your
          wanderlust dreams into reality. With a focus on smooth and visually
          captivating animations, navigating the site feels like a
          breeze—it&apos;s almost as if the destinations are calling you.
        </TypographyP>
        <ProjectsLinks live={project.live} repo={project.github} />
        <p className="font-mono mb-2 mt-8">
          A sleek, modern interface greets you, featuring the latest travel
          tips, deals, and must-visit spots around the globe.
        </p>
        <SlideShow images={[`${BASE_PATH}/iris/landing.png`]} />
        <TypographyH3 className="my-4 mt-8">Blogs</TypographyH3>
        <p className="font-mono mb-2">
          Dive into the curated articles written by travel experts. Whether
          you&apos;re looking for hidden gems or travel hacks, our blog section
          has you covered.
        </p>
        <SlideShow
          images={[`${BASE_PATH}/iris/blogs.png`, `${BASE_PATH}/iris/blog.png`]}
        />
        <TypographyH3 className="my-4 mt-8">Sanity CMS</TypographyH3>

        <p className="font-mono mb-2">
          Keeping everything fresh and up-to-date, I&apos;ve integrated Sanity
          CMS to manage all the content with ease, ensuring you always get the
          latest and greatest information.
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/iris/cms-1.png`,
            `${BASE_PATH}/iris/cms-2.png`,
          ]}
        />
        <p className="font-mono mb-2 my-8">
          With a stunning 100% score on Lighthouse, Iris isn&apos;t just
          beautiful—it&apos;s built to perform. Whether you&apos;re planning
          your next adventure or just daydreaming, our site delivers a top-notch
          experience that&apos;s both informative and enjoyable.
        </p>
      </div>
    ),
  },
  wisconsincaselab: {
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra],
      backend: [PROJECT_SKILLS.supabase],
    },
    content: (project) => (
      <div>
        <TypographyP className="font-mono ">
          WisconsinCaseLab is your go-to spot for sending anonymous messages
          without leaving a trace. Powered by Supabase, it&apos;s all about
          keeping things low-key and secure. Whether you&apos;re sharing
          secrets, giving feedback, or just having some fun, WisconsinCaseLab
          ensures your identity stays hidden, while your voice is heard. Say
          what you want, without the worry.
        </TypographyP>
        <ProjectsLinks live={project.live} repo={project.github} />
        <SlideShow
          images={[
            `${BASE_PATH}/wisconsincaselab/1.png`,
            `${BASE_PATH}/wisconsincaselab/2.png`,
            `${BASE_PATH}/wisconsincaselab/3.png`,
            `${BASE_PATH}/wisconsincaselab/4.png`,
          ]}
        />
      </div>
    ),
  },
};

export default PROJECT_DETAILS;
