"use client";

import NyanCat from "@/components/nyan-cat";
import Particles from "@/components/Particles";
import { usePerfProfile } from "@/hooks/use-perf-profile";

export default function AppOverlays() {
  const { particleCount, maxDpr } = usePerfProfile();

  return (
    <>
      {particleCount > 0 && (
        <Particles
          className="fixed inset-0 -z-10"
          quantity={particleCount}
          maxDpr={maxDpr}
        />
      )}
      <NyanCat />
    </>
  );
}
