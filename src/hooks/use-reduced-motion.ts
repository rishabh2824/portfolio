"use client";

import * as React from "react";

/**
 * Tracks the `prefers-reduced-motion` media query reactively (mirrors
 * use-perf-profile's matchMedia pattern). Consumers gate animation loops,
 * infinite tweens, and the heavy WebGL scene on this instead of running them
 * unconditionally.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
