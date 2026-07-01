"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Lightweight stand-in for the WebGL scene. It occupies the same fixed,
 * full-viewport layer as the real Spline canvas (and sits behind everything,
 * ignoring pointer events) so swapping the scene in causes no layout shift or
 * flash. While it's showing, the preloader splash is masking the page anyway.
 */
function ScenePlaceholder() {
  return <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />;
}

/**
 * The 3D keyboard scene pulls in the Spline runtime, the WebGL canvas, and
 * GSAP + ScrollTrigger — none of which are needed for the hero's first paint.
 * Split it into its own client-only chunk (ssr:false; it's browser-only and
 * gated on device detection, so there's nothing to server-render) and show the
 * placeholder while that chunk streams in.
 */
const Scene = dynamic(() => import("./animated-background-scene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

const AnimatedBackground = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer the heavy chunk *fetch* until the browser is idle, so it doesn't
  // compete with the hero hydrating/painting. This still fires well within the
  // preloader's ~2.5s masking window, so the scene loads behind the splash and
  // the keyboard reveal stays as smooth as before (the scene's onLoad lifts the
  // splash early once it's ready). setTimeout is the fallback where
  // requestIdleCallback is unavailable (Safari).
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const trigger = () => setShouldLoad(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(trigger, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(trigger, 200);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) return <ScenePlaceholder />;
  return <Scene />;
};

export default AnimatedBackground;
