import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import {
  ArrowUpRight,
  Box,
  Cable,
  Code,
  Component,
  Container,
  Database,
  Flame,
  Layers,
  Network,
  Palette,
  PanelsTopLeft,
  Triangle,
  Workflow,
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
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <Triangle />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <Palette />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <SiNodedotjs />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <Code />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <Database />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <Database />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <Workflow />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <Component />,
  },
  tailwind: {
    title: "Tailwind CSS",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  astro: {
    title: "Astro",
    bg: "black",
    fg: "white",
    icon: <SiAstro />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <Container />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <Flame />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <Cable />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <Layers />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <SiReact />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <PanelsTopLeft />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <Box />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <SiFramer />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <Network />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  skillsLabel?: string;
  showSource?: boolean;
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "solarRacing",
    category: "Race car",
    title: "Badger Solar car 02",
    src: "/assets/projects-screenshots/solarRacing/landing.png",
    screenshots: ["landing.png"],
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
    live: "https://badgersolarracing.org/",
    github: "https://github.com/badgerloop-software",
    showSource: false,
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Badger Solar Racing started its journey with a strong debut,
            placing 7th in its first race and earning Rookie of the Year in
            2023. After months of building Sunburst from the ground up to be
            lighter, faster, and more efficient, we have set our sights on
            the 2026 American Solar Challenge.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">My Contributions </TypographyH3>
          <p className="font-mono mb-2">
            Worked with the Race Strategy team to model optimal speed and racing
              lines using Python and Matplotlib based on numerous factors like battery backups, system temperatures etc.
              Iteratively improved designs by collaborating with engineering teams.
              Also assisted the software team to develop the clubs website.
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
      );
    },
  },
  {
    id: "aihorizon",
    category: "Company Website",
    title: "ai-horizon.io",
    src: "/assets/projects-screenshots/aihorizon/landing.png",
    screenshots: ["carousel1.png", "carousel2.png", "carousel3.png", "carousel4.png"],
    live: "https://ai-horizon.io/",
    skills: {
      frontend: [
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.framerMotion,
      ],
      backend: [PROJECT_SKILLS.mongo, PROJECT_SKILLS.express, PROJECT_SKILLS.node],
    },
    get content(): React.JSX.Element {
      return (
        <div>
          <TypographyP className="font-mono ">
            ai-horizon.io is an AI startup that delivers agentic AI solutions
            and custom AI agents for businesses. During my summer 2025
            internship, I worked with a team of interns to rebuild the company
            website from the ground up. I focused primarily on the frontend,
            translating UI designs into production-ready interfaces and
            implementing hundreds of optimized animations, while also
            contributing to system design, SEO, and security features.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/aihorizon/carousel1.png`,
              `${BASE_PATH}/aihorizon/carousel2.png`,
              `${BASE_PATH}/aihorizon/carousel3.png`,
              `${BASE_PATH}/aihorizon/carousel4.png`,
            ]}
          />
        </div>
      );
    },
  },
  {
    id: "iris",
    category: "Project Management Platform",
    title: "Iris",
    src: "/assets/projects-screenshots/iris/landing.png",
    screenshots: ["1.png"],
    live: "https://thebookingdesk.com/",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [PROJECT_SKILLS.sanity],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            Iris is your ultimate travel consultation hub, designed
            to turn your wanderlust dreams into reality. With a focus on smooth
            and visually captivating animations, navigating the site feels like
            a breeze—it&apos;s almost as if the destinations are calling you.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <p className="font-mono mb-2 mt-8">
            A sleek, modern interface greets you, featuring the latest travel
            tips, deals, and must-visit spots around the globe.
          </p>
          <SlideShow images={[`${BASE_PATH}/iris/landing.png`]} />
          <TypographyH3 className="my-4 mt-8">Blogs</TypographyH3>
          <p className="font-mono mb-2">
            Dive into the curated articles written by travel experts. Whether
            you&apos;re looking for hidden gems or travel hacks, our blog
            section has you covered.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/iris/blogs.png`,
              `${BASE_PATH}/iris/blog.png`,
            ]}
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
            With a stunning 100% score on Lighthouse, Iris
            isn&apos;t just beautiful—it&apos;s built to perform. Whether
            you&apos;re planning your next adventure or just daydreaming, our
            site delivers a top-notch experience that&apos;s both informative
            and enjoyable.
          </p>
        </div>
      );
    },
  },
  {
    id: "wisconsincaselab",
    category: "Interactive Case Studies",
    title: "WisconsinCaseLab",
    src: "/assets/projects-screenshots/wisconsincaselab/1.png",
    screenshots: ["1.png", "2.png", "3.png", "4.png"],
    live: "https://wisconsincaselab.com/",
    github: "https://github.com/rishabh2824/CaseLab",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.next, PROJECT_SKILLS.chakra],
      backend: [PROJECT_SKILLS.supabase],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            WisconsinCaseLab is your go-to spot for sending anonymous messages
            without leaving a trace. Powered by Supabase, it&apos;s all about
            keeping things low-key and secure. Whether you&apos;re sharing
            secrets, giving feedback, or just having some fun, WisconsinCaseLab
            ensures your
            identity stays hidden, while your voice is heard. Say what you want,
            without the worry.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow
            images={[
              `${BASE_PATH}/wisconsincaselab/1.png`,
              `${BASE_PATH}/wisconsincaselab/2.png`,
              `${BASE_PATH}/wisconsincaselab/3.png`,
              `${BASE_PATH}/wisconsincaselab/4.png`,
            ]}
          />
        </div>
      );
    },
  }
];
export default projects;
