import AnimatedBackground from "@/components/animated-background";
import ExperienceSection from "@/components/sections/experience";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import SkillsSection from "@/components/sections/skills";

function MainPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="pointer-events-none bg-slate-100 dark:bg-transparent [&_:is(a,button,h1,h2,h3,h4,h5,h6,p,select,span,svg,input,textarea,label,img,[role=button])]:pointer-events-auto">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
    </>
  );
}

export default MainPage;
