"use client";

import { SKILLS } from "@/data/keyboard-skills";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

/**
 * Tech-stack section.
 *
 * The skills live in the interactive 3D keyboard's keycaps, so this is just a
 * header and the section is tall (the keyboard scrubs through it on scroll).
 * The keycap labels themselves are pure WebGL/Spline geometry — invisible to
 * screen readers, crawlers, and anyone with JS/WebGL disabled — so the same
 * list is duplicated here as sr-only text.
 */
const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="w-full h-screen md:h-[150dvh] pointer-events-none"
    >
      <SectionHeader
        id="skills"
        title="Tech Stack"
        desc="(hint: press a key)"
      />
      <ul className="sr-only">
        {Object.values(SKILLS).map((skill) => (
          <li key={skill.name}>{skill.label}</li>
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default SkillsSection;
