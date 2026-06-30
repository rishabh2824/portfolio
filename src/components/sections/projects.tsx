"use client";
import Image from "next/image";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import projects, { Project } from "@/data/projects";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import BorderGlow from "../ui/border-glow";
import { cn } from "@/lib/utils";

// Pinwheel bento placement: two WIDE tiles (3/5 cols) on a diagonal, two narrow
// tiles (2/5 cols) on the other — all one row tall, so equal heights.
const BENTO: { id: string; className: string }[] = [
  { id: "solarRacing", className: "md:col-start-1 md:col-span-5 md:row-start-1" },
  { id: "aihorizon", className: "md:col-start-6 md:col-span-4 md:row-start-1" },
  {
    id: "iris",
    className: "md:col-start-1 md:col-span-4 md:row-start-2",
  },
  {
    id: "wisconsincaselab",
    className: "md:col-start-5 md:col-span-5 md:row-start-2",
  },
];

const ProjectsSection = () => {
  const byId = new Map(projects.map((p) => [p.id, p]));
  return (
    <SectionWrapper id="projects" className="max-w-6xl mx-auto pb-24 md:pb-32">
      <SectionHeader id="projects" title="Projects" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-9 md:grid-rows-2 md:h-[42rem]">
        {BENTO.map(({ id, className }) => {
          const project = byId.get(id);
          if (!project) return null;
          return <BentoTile key={id} project={project} className={className} />;
        })}
      </div>
    </SectionWrapper>
  );
};

const BentoTile = ({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) => {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger
        className={cn(
          "group h-64 w-full bg-transparent transition-transform duration-300 ease-out hover:-translate-y-1.5 md:h-full",
          className,
        )}
      >
        <BorderGlow
          className="h-full w-full text-left"
          borderRadius={12}
          backgroundColor="hsl(var(--card))"
          glowColor="190 95 70"
          colors={["#22d3ee", "#38bdf8", "#818cf8"]}
          glowRadius={40}
          glowIntensity={0.9}
          edgeSensitivity={32}
          coneSpread={25}
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="animate-kenburns object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 z-30 flex flex-col items-start justify-end p-6">
            <div className="text-lg font-medium text-left">{project.title}</div>
            <div className="mt-1 w-fit rounded-lg bg-primary px-2 text-xs text-primary-foreground">
              {project.category}
            </div>
          </div>
        </BorderGlow>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent className="md:max-w-4xl md:h-[85vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
        {/* Sticky header */}
        <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <ResponsiveDialogTitle className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                {project.title}
              </ResponsiveDialogTitle>
              <ResponsiveDialogDescription className="sr-only">
                {project.category} project details.
              </ResponsiveDialogDescription>
              <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
                {project.category}
              </span>
            </div>
            <div className="shrink-0 flex items-center gap-4">
              {project.github && project.showSource !== false && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Source
                </Link>
              )}
              <Link href={project.live} target="_blank">
                <button className="group flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors">
                  Visit
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1" type="always" data-lenis-prevent>
          <div className="px-8 py-8">
            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10"
            >
              {project.skills.frontend?.length > 0 && (
                <div className="flex flex-col items-center md:items-start gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {project.skillsLabel ?? "Frontend"}
                  </span>
                  <FloatingDock items={project.skills.frontend} />
                </div>
              )}
              {project.skills.backend?.length > 0 && (
                <div className="flex flex-col items-center md:items-start gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    Backend
                  </span>
                  <FloatingDock items={project.skills.backend} />
                </div>
              )}
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

            {/* Project content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.content}
            </motion.div>
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ProjectsSection;
