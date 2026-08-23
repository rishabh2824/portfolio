"use client";

import { EXPERIENCE } from "@/data/constants";
import ExperienceTimeline from "./experience-timeline";
import { SectionHeader } from "./section-header";

/**
 * Experience section. The id stays "experience" because the Spline keyboard's
 * GSAP ScrollTrigger keys off it. We use a plain <section> here (not the
 * animated SectionWrapper) so its scroll-linked scale/opacity doesn't fight the
 * timeline's own scroll-measured growing beam.
 */
const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative z-10 flex min-h-[120vh] flex-col items-center justify-center py-20"
    >
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="My professional journey."
          className="mb-12 md:mb-20 mt-0"
        />
      </div>
      <ExperienceTimeline experiences={EXPERIENCE} />
    </section>
  );
};

export default ExperienceSection;
