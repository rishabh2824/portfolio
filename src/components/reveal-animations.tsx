"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/utils/utils";

interface BlurIntProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  // Lets a caller hold the element in its "hidden" state (e.g. while a
  // full-screen preloader still masks it) instead of always animating in on
  // mount, without unmounting it — so the markup stays in the SSR'd HTML.
  animate?: "hidden" | "visible";
}
export const BlurIn = ({
  children,
  className,
  variant,
  delay = 0,
  duration = 1,
  animate = "visible",
}: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate={animate}
      transition={{ duration, delay }}
      variants={combinedVariants}
      className={cn(
        className,
        // "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
      )}
    >
      {children}
    </motion.div>
  );
};

interface BoxRevealProps {
  children: React.JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
  // Lets a caller drive the reveal directly off external state (e.g. a
  // preloader's `isLoading`) instead of the default scroll-triggered
  // `whileInView` — needed for content that's already on-screen at mount,
  // where waiting on an IntersectionObserver crossing is unreliable.
  animate?: "hidden" | "visible";
}
export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration,
  delay,
  once = true,
  animate,
}: BoxRevealProps) => {
  const effectiveDuration = duration ?? 0.5;
  const effectiveDelay = delay;
  const triggerProps =
    animate !== undefined
      ? { animate }
      : { whileInView: "visible" as const, viewport: { once } };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        {...triggerProps}
        transition={{ duration: effectiveDuration, delay: effectiveDelay }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        {...triggerProps}
        transition={{
          duration: effectiveDuration,
          ease: "easeIn",
          delay: effectiveDelay,
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ? boxColor : "#ffffff00",
        }}
      />
    </div>
  );
};
