"use client";

import { useLazyClientComponent } from "@/hooks/use-lazy-client-component";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Lightweight stand-in for the WebGL scene. It occupies the same fixed,
 * full-viewport layer as the real Spline canvas (and sits behind everything,
 * ignoring pointer events) so swapping the scene in causes no layout shift or
 * flash. While it's showing, the preloader splash is masking the page anyway.
 */
function ScenePlaceholder() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />
  );
}

/**
 * The 3D keyboard scene pulls in the Spline runtime, the WebGL canvas, and
 * GSAP + ScrollTrigger (~2MB) — none of which are needed for the hero's first
 * paint. `next/dynamic(() => import(...))` at module scope still gets picked
 * up by Next's build-time analysis and emitted as an eager <script> tag in the
 * initial HTML, so the chunk starts downloading immediately regardless of any
 * runtime gate on *mounting* the component. Calling `import()` itself inside
 * the idle callback (rather than referencing it at module scope) is opaque to
 * that static analysis, so the fetch is deferred along with the mount.
 */
const AnimatedBackground = () => {
  // The scene is pure motion — a WebGL render loop, infinite GSAP tweens, a
  // rotating keyboard — with no informational content, so it's the single
  // largest win available for prefers-reduced-motion: skip fetching and
  // mounting it entirely rather than just disabling its animations.
  const prefersReducedMotion = usePrefersReducedMotion();

  // Defer the heavy chunk *fetch* until the browser is idle, so it doesn't
  // compete with the hero hydrating/painting. This still fires well within the
  // preloader's ~2.5s masking window, so the scene loads behind the splash and
  // the keyboard reveal stays as smooth as before (the scene's onLoad lifts the
  // splash early once it's ready). setTimeout is the fallback where
  // requestIdleCallback is unavailable (Safari).
  const Scene = useLazyClientComponent(
    () => import("./animated-background-scene"),
    { skip: prefersReducedMotion, idle: true },
  );

  if (!Scene) return <ScenePlaceholder />;
  return <Scene />;
};

export default AnimatedBackground;
