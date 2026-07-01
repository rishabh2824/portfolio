"use client";

import * as React from "react";

/**
 * Single source of truth for "how much eye-candy should we run?".
 *
 * Cheap device-capability signals so heavy effects (the Spline 3D scene, the
 * particle canvas) can be scaled down on constrained devices instead of running
 * full-tilt everywhere.
 */
export type PerfProfile = {
  /** How many background particles to render. */
  particleCount: number;
  /** Pixel-ratio ceiling for any canvas/WebGL renderer. */
  maxDpr: number;
  /** True once detection has run on the client (avoids SSR/CSR mismatch). */
  ready: boolean;
};

export function usePerfProfile(): PerfProfile {
  const [state, setState] = React.useState({
    isMobile: false,
    ready: false,
  });

  React.useEffect(() => {
    const mobileMq = matchMedia("(max-width: 768px)");

    const update = () =>
      setState({
        isMobile: mobileMq.matches,
        ready: true,
      });

    update();
    mobileMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
    };
  }, []);

  const { isMobile, ready } = state;

  return React.useMemo<PerfProfile>(() => {
    // Viewport size scales quality down on small screens.
    const particleCount = isMobile ? 30 : 100;
    const maxDpr = isMobile ? 1.5 : 2;
    return { particleCount, maxDpr, ready };
  }, [isMobile, ready]);
}
