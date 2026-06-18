"use client";

import * as React from "react";

/**
 * Single source of truth for "how much eye-candy should we run?".
 *
 * Cheap device-capability signals so heavy effects (the Spline 3D scene, the
 * particle canvas) can be scaled down or skipped on constrained devices instead
 * of running full-tilt everywhere.
 */
export type PerfProfile = {
  /** Drop the WebGL 3D scene entirely (show a static fallback). */
  disable3D: boolean;
  /** How many background particles to render. */
  particleCount: number;
  /** Pixel-ratio ceiling for any canvas/WebGL renderer. */
  maxDpr: number;
  /** True once detection has run on the client (avoids SSR/CSR mismatch). */
  ready: boolean;
};

/**
 * Data Saver — an explicit, reliable signal that the user wants to conserve.
 *
 * We deliberately do NOT use `navigator.hardwareConcurrency` / `deviceMemory`
 * here: browsers clamp them unpredictably (the same capable machine has been
 * observed reporting 12, 8, and 2 cores across sessions), so gating the 3D
 * scene on them dropped it for plenty of perfectly capable devices. Capability
 * is too noisy to decide whether the headline feature renders.
 */
function detectSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData ?? false
  );
}

export function usePerfProfile(): PerfProfile {
  const [state, setState] = React.useState({
    isMobile: false,
    saveData: false,
    ready: false,
  });

  React.useEffect(() => {
    const mobileMq = matchMedia("(max-width: 768px)");

    const update = () =>
      setState({
        isMobile: mobileMq.matches,
        saveData: detectSaveData(),
        ready: true,
      });

    update();
    mobileMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
    };
  }, []);

  const { isMobile, saveData, ready } = state;

  return React.useMemo<PerfProfile>(() => {
    // Only an explicit Data Saver request drops the 3D scene; viewport size just
    // scales quality down, it never removes the scene.
    const disable3D = saveData;
    const particleCount = isMobile ? 30 : 100;
    const maxDpr = isMobile ? 1.5 : 2;
    return { disable3D, particleCount, maxDpr, ready };
  }, [isMobile, saveData, ready]);
}
