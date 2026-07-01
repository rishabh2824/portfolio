"use client";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

/**
 * Tech-stack section.
 *
 * The skills live in the interactive 3D keyboard's keycaps, so this is just a
 * header and the section is tall (the keyboard scrubs through it on scroll).
 */
const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="w-full h-screen md:h-[150dvh] pointer-events-none"
    >
      <SectionHeader id="skills" title="Tech Stack" desc="(hint: press a key)" />
    </SectionWrapper>
  );
};

export default SkillsSection;
