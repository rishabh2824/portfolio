"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/utils/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const SectionWrapper = ({
  id,
  className,
  children,
  style,
  ...props
}: SectionWrapperProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // scale was dropped: animating it on a full-viewport element forces the
  // compositor to re-raster on every scroll tick instead of just
  // re-compositing, and this wrapper runs concurrently with GSAP
  // ScrollTrigger, the particle canvas, and the WebGL scene. Opacity alone
  // is compositor-only and keeps the fade.
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      style={{ ...style, position: style?.position ?? "relative" }}
      {...props}
    >
      <motion.div style={{ opacity }} className="w-full h-full">
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
