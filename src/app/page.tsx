"use client";

import SmoothScroll from "@/components/smooth-scroll";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main className="pointer-events-none bg-slate-100 dark:bg-transparent [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_h4]:pointer-events-auto [&_h5]:pointer-events-auto [&_h6]:pointer-events-auto [&_input]:pointer-events-auto [&_label]:pointer-events-auto [&_p]:pointer-events-auto [&_select]:pointer-events-auto [&_span]:pointer-events-auto [&_svg]:pointer-events-auto [&_textarea]:pointer-events-auto [&_[role=button]]:pointer-events-auto">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}

export default MainPage;
