"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectDetails } from "@/data/project-details";
import projects, { type Project, type ProjectId } from "@/data/projects";
import { useDocumentHidden, useInViewport } from "@/hooks/use-in-viewport";
import { cn } from "@/utils/utils";
import BorderGlow from "../ui/border-glow";
import { FloatingDock } from "../ui/floating-dock";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { ScrollArea } from "../ui/scroll-area";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

// Pinwheel bento placement: two WIDE tiles (3/5 cols) on a diagonal, two narrow
// tiles (2/5 cols) on the other — all one row tall, so equal heights.
const BENTO: { id: ProjectId; className: string }[] = [
  {
    id: "solarRacing",
    className: "md:col-start-1 md:col-span-5 md:row-start-1",
  },
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
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<ProjectDetails | null>(null);

  // The modal body — SlideShow (embla), the skill icon sets, Button,
  // Typography — is what makes data/projects.tsx heavy, and none of it is
  // needed until a visitor actually opens a project. Fetch it once, on first
  // open, rather than pulling it in for everyone via a module-scope import.
  useEffect(() => {
    if (!open || details) return;
    let cancelled = false;
    import("@/data/project-details").then((mod) => {
      if (!cancelled) setDetails(mod.default[project.id] ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [open, details, project.id]);

  const tileRef = useRef<HTMLDivElement>(null);
  // The Ken Burns pan/zoom promotes the tile to its own compositor layer for
  // as long as it's running, so it's only worth paying for while the tile is
  // actually on screen *and* the tab is visible — an off-screen or
  // backgrounded tile gains nothing from animating. Both checks share a
  // single IntersectionObserver / visibilitychange listener across every
  // tile instead of each tile creating its own.
  const isInViewport = useInViewport(tileRef);
  const isDocumentHidden = useDocumentHidden();
  const kenburnsRunning = isInViewport && !isDocumentHidden;

  return (
    <div ref={tileRef} className="contents">
      <ResponsiveDialog open={open} onOpenChange={setOpen}>
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
              className={cn(
                "animate-kenburns object-cover transition-transform duration-500 group-hover:scale-105",
                kenburnsRunning && "kenburns-running",
              )}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 z-30 flex flex-col items-start justify-end p-6">
              <div className="text-lg font-medium text-left">
                {project.title}
              </div>
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
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1" type="always">
            <div className="px-8 py-8">
              {details ? (
                <>
                  {/* Tech stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10"
                  >
                    {details.skills.frontend?.length > 0 && (
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                          {details.skillsLabel ?? "Frontend"}
                        </span>
                        <FloatingDock items={details.skills.frontend} />
                      </div>
                    )}
                    {details.skills.backend?.length > 0 && (
                      <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                          Backend
                        </span>
                        <FloatingDock items={details.skills.backend} />
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
                    {details.content(project)}
                  </motion.div>
                </>
              ) : (
                <div className="py-16 text-center text-sm text-muted-foreground font-mono">
                  Loading…
                </div>
              )}
            </div>
          </ScrollArea>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
