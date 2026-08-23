"use client";

import { File } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { config } from "@/data/config";
import { cn } from "@/utils/utils";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { Button } from "../ui/button";

import SectionWrapper from "../ui/section-wrapper";

const heroSubtextClassName =
  "font-thin text-md text-slate-500 dark:text-zinc-400 cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28",
          )}
        >
          {/*
            Always rendered — including the <h1> — so it's present in the
            server-rendered HTML for LCP. The preloader overlay (fixed,
            z-[99]) already masks it visually; the reveal below is driven by
            `isLoading` via the BlurIn/BoxReveal animate state rather than by
            mounting/unmounting the element. `inert` keeps it out of the tab
            order and unclickable while the splash is covering it, since it
            no longer relies on not existing yet to be non-interactive.
          */}
          <div className="flex flex-col" inert={isLoading}>
            <div>
              <BlurIn delay={0.7} animate={isLoading ? "hidden" : "visible"}>
                <p className={cn("md:self-start mt-4", heroSubtextClassName)}>
                  Hi, I am
                  <br className="md:hidden" />
                </p>
              </BlurIn>

              <BlurIn delay={1} animate={isLoading ? "hidden" : "visible"}>
                <h1
                  className={cn(
                    "-ml-[6px] leading-none text-slate-800 text-left",
                    "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                    "cursor-default text-edge-outline font-display",
                  )}
                >
                  {config.author.split(" ")[0]}
                  <br className="hidden md:block" />
                  {config.author.split(" ")[1]}
                </h1>
              </BlurIn>
              <BlurIn delay={1.2} animate={isLoading ? "hidden" : "visible"}>
                <p
                  className={cn("md:self-start md:mt-4", heroSubtextClassName)}
                >
                  {config.role}
                </p>
              </BlurIn>
            </div>
            <div className="mt-8 flex flex-col gap-3 w-fit">
              <Link href="/resume" className="flex-1">
                <BoxReveal delay={2} width="100%">
                  <Button className="flex items-center gap-2 w-full">
                    <File size={24} />
                    <p>Resume</p>
                  </Button>
                </BoxReveal>
              </Link>
              <div className="md:self-start flex gap-3">
                <div className="flex items-center h-full gap-2">
                  <Link
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant={"outline"} aria-label="GitHub profile">
                      <FaGithub size={24} aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant={"outline"} aria-label="LinkedIn profile">
                      <FaLinkedinIn size={24} aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
