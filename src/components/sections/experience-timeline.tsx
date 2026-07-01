"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase } from "lucide-react";
import { type Experience, SKILLS, type SkillNames } from "@/data/constants";
import { Badge } from "../ui/badge";
import { cn } from "@/utils/utils";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

/**
 * Scroll-driven experience timeline. A central beam grows as the section
 * scrolls through the viewport (the Aceternity "scroll beam" technique:
 * useScroll + a height useTransform), entries alternate left/right on desktop,
 * and each company node + glass card reveals as it enters view. Built on the
 * project's existing motion + Tailwind stack — no extra dependencies.
 */
const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure the rows wrapper so the beam grows to exactly its height, and keep
  // it in sync if the content reflows (resize, late font load, etc.).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The beam fills as the timeline's top passes ~10% down the viewport and
  // completes when its bottom reaches the middle.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-5xl px-4 md:px-8"
    >
      {/* Base track + growing beam — centered on desktop, left rail on mobile */}
      <div className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2 bg-border md:left-1/2">
        <motion.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"
        />
      </div>

      <div className="flex flex-col gap-16 md:gap-24">
        {experiences.map((exp, index) => (
          <TimelineRow key={exp.id} experience={exp} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineRow = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  // Even rows: card on the left half (desktop). Odd rows: card on the right.
  const cardOnRight = index % 2 === 1;

  return (
    <div
      className={cn(
        "relative flex items-center",
        cardOnRight ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <ExperienceNode experience={experience} />

      {/* Card half */}
      <div className="ml-16 w-full md:ml-0 md:w-1/2 md:px-10">
        <ExperienceGlassCard experience={experience} fromRight={cardOnRight} />
      </div>

      {/* Empty half keeps the card on one side of the centered line (desktop) */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

const ExperienceNode = ({ experience }: { experience: Experience }) => {
  const isCurrent = experience.endDate.toLowerCase() === "present";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
      className="absolute left-6 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
    >
      {isCurrent && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-purple-500/40"
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-background shadow-lg md:h-14 md:w-14">
        {experience.logo ? (
          // Plain <img>: serves the placeholder SVGs without next/image's
          // dangerouslyAllowSVG config, and matches how skill icons render.
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Briefcase className="h-6 w-6 text-muted-foreground" aria-hidden />
        )}
      </div>
    </motion.div>
  );
};

const ExperienceGlassCard = ({
  experience,
  fromRight,
}: {
  experience: Experience;
  fromRight: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, x: fromRight ? 24 : -24 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          {experience.title}
        </h3>
        <span className="text-sm font-medium text-muted-foreground">
          {experience.company}
        </span>
        <Badge
          variant="secondary"
          className="mt-1 w-fit font-mono text-xs font-normal"
        >
          {experience.startDate} - {experience.endDate}
        </Badge>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground">
        {experience.description.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.skills.map((skillName) => {
          const skill = SKILLS[skillName as SkillNames];
          if (!skill) return null;
          return (
            <Badge
              key={skillName}
              variant="outline"
              className="gap-2 border-transparent bg-secondary/30 text-xs font-normal transition-colors hover:bg-secondary/50"
            >
              <img
                src={skill.icon}
                alt={skill.label}
                className="h-3.5 w-3.5 object-contain opacity-80"
              />
              {skill.label}
            </Badge>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
