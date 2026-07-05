"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { Briefcase } from "lucide-react";
import { type Experience, SKILLS, type SkillNames } from "@/data/constants";
import { cn } from "@/utils/utils";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

/**
 * Scroll-driven experience timeline. A central beam grows from nothing as the
 * section scrolls through the viewport (the Aceternity "scroll beam" technique:
 * useScroll + a height useTransform). The beam's front tracks the viewport
 * centre, and each company node springs in exactly when the beam reaches it —
 * so the line grows, a node pops, the line grows on to the next, and so on.
 * Built on the project's existing motion + Tailwind stack — no extra deps.
 */
const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  // Each node's centre as a fraction of the container height. The beam reaches
  // a node when scrollYProgress passes its fraction (beamHeight = progress *
  // height), which is what drives the sequenced node reveals.
  const [thresholds, setThresholds] = useState<number[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const rows = rowsRef.current;
    if (!container || !rows) return;
    const measure = () => {
      const cRect = container.getBoundingClientRect();
      setHeight(cRect.height);
      setThresholds(
        Array.from(rows.children).map((row) => {
          const r = (row as HTMLElement).getBoundingClientRect();
          const center = r.top - cRect.top + r.height / 2;
          return cRect.height > 0 ? center / cRect.height : 0;
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [experiences.length]);

  // Map scroll so the beam's front — and therefore each row's ignite/reveal —
  // sits just BELOW the viewport centre (~60% down). A row lights up slightly
  // below the middle, so as you scroll a little further the card rises and
  // settles into the vertical centre instead of appearing already near the top.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[90rem] px-4">
      {/* Growing beam only — no static rail. Bright fuchsia→purple with a soft
          glow so it reads against the dark-blue background. Centered on desktop,
          left rail on mobile. */}
      <motion.div
        style={{ height: beamHeight, opacity: beamOpacity }}
        className="absolute left-6 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-400 via-purple-500 to-transparent shadow-[0_0_6px_rgba(232,121,249,0.9),0_0_14px_rgba(217,70,239,0.65),0_0_28px_rgba(168,85,247,0.45)] md:left-1/2"
      />

      <div ref={rowsRef} className="flex flex-col gap-16 md:gap-24">
        {experiences.map((exp, index) => (
          <TimelineRow
            key={exp.id}
            experience={exp}
            index={index}
            scrollYProgress={scrollYProgress}
            threshold={thresholds[index] ?? 1}
          />
        ))}
      </div>
    </div>
  );
};

const TimelineRow = ({
  experience,
  index,
  scrollYProgress,
  threshold,
}: {
  experience: Experience;
  index: number;
  scrollYProgress: MotionValue<number>;
  threshold: number;
}) => {
  // Even rows: card on the left half (desktop). Odd rows: card on the right.
  const cardOnRight = index % 2 === 1;

  // Single source of truth for the row: reveal the node AND the card together
  // the instant the beam's front passes this row. One latch drives both, so
  // they can never drift apart. `threshold` = this row's node centre / height,
  // and `beamHeight = scrollYProgress * height`, so `scrollYProgress >= threshold`
  // is exactly "the beam has reached this node".
  const [revealed, setRevealed] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= threshold) setRevealed(true);
  });
  // Catch the already-past case (deep-link / refresh mid-page, or the real
  // threshold arriving after first measure) when no scroll change is firing.
  useEffect(() => {
    if (scrollYProgress.get() >= threshold) setRevealed(true);
  }, [threshold, scrollYProgress]);

  return (
    <div
      className={cn(
        "relative flex items-center",
        cardOnRight ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <ExperienceNode experience={experience} revealed={revealed} />

      {/* Card half — shifted outward: small gap to the screen edge, larger gap
          to the centre line / node. */}
      <div
        className={cn(
          "ml-16 w-full md:ml-0 md:w-1/2",
          cardOnRight ? "md:pl-16 md:pr-6" : "md:pl-6 md:pr-16",
        )}
      >
        <ExperienceGlassCard
          experience={experience}
          fromRight={cardOnRight}
          revealed={revealed}
        />
      </div>

      {/* Empty half keeps the card on one side of the centered line (desktop) */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

const ExperienceNode = ({
  experience,
  revealed,
}: {
  experience: Experience;
  revealed: boolean;
}) => {
  const isCurrent = experience.endDate.toLowerCase() === "present";

  return (
    // Outer wrapper owns the centering transform; the inner motion element owns
    // the scale/opacity pop, so motion's transform doesn't clobber the centering.
    <div className="absolute left-6 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
      <motion.div
        initial={false}
        animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.7 }}
        className="relative"
      >
        {isCurrent && revealed && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-purple-500/40"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-black/10! bg-white shadow-lg md:h-14 md:w-14">
          {experience.logo ? (
            // Real company logos sit on a white chip with object-contain so their
            // varied shapes / transparent backgrounds (and dark wordmarks) read
            // cleanly without cropping. Plain <img> avoids next/image SVG config.
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <Briefcase className="h-6 w-6 text-muted-foreground" aria-hidden />
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceGlassCard = ({
  experience,
  fromRight,
  revealed,
}: {
  experience: Experience;
  fromRight: boolean;
  revealed: boolean;
}) => {
  return (
    // Reveals together with its node (shared `revealed` latch). A 70ms delay lets
    // the node ignite a hair first, then the card blooms out from it — reads as
    // "together" but with a premium cause→effect.
    <motion.div
      initial={false}
      animate={
        revealed
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : { opacity: 0, y: 24, x: fromRight ? 24 : -24, scale: 0.98 }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: revealed ? 0.07 : 0 }}
      className="rounded-xl border border-white/15! bg-white/[0.06] px-6 py-5 shadow-xl backdrop-blur-2xl"
    >
      {/* Single-column stack: title, company + date, bullets, then pills */}
      <h3 className="text-xl font-bold leading-tight tracking-tight text-white/90">
        {experience.title}
      </h3>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-sm font-medium text-white/60">
          {experience.company}
        </span>
        <span className="whitespace-nowrap rounded-full border border-white/10! bg-slate-900/40 px-2.5 py-0.5 font-mono text-[11px] text-white/60">
          {experience.startDate} - {experience.endDate}
        </span>
      </div>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">
        {experience.description.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.skills.map((skillName) => {
          const skill = SKILLS[skillName as SkillNames];
          if (!skill) return null;
          return (
            <span
              key={skillName}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10! bg-slate-900/40 px-2.5 py-0.5 text-xs font-normal text-white/80"
            >
              <img
                src={skill.icon}
                alt={skill.label}
                className="h-3.5 w-3.5 object-contain"
              />
              {skill.label}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
