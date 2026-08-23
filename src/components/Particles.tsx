"use client";

import { useEffect, useRef } from "react";
import { usePauseOnHidden } from "@/hooks/use-pause-on-hidden";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/utils";

// Precomputed rgba strings bucketed by alpha (2 decimal places) so drawing a
// circle reuses a cached fillStyle string instead of allocating a fresh
// template string every circle, every frame.
const ALPHA_STEPS = 100;
const ALPHA_COLORS = Array.from(
  { length: ALPHA_STEPS + 1 },
  (_, i) => `rgba(255, 255, 255, ${(i / ALPHA_STEPS).toFixed(2)})`,
);
const alphaColor = (alpha: number) =>
  ALPHA_COLORS[Math.round(Math.min(Math.max(alpha, 0), 1) * ALPHA_STEPS)];

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  /** Device-pixel-ratio ceiling — caps fill cost on high-DPI / low-end screens. */
  maxDpr?: number;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  maxDpr = 2,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rafId = useRef<number>(0);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Cap the device-pixel-ratio: a 3x screen otherwise triples the fill cost.
  const dpr =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio, maxDpr)
      : 1;
  // A drifting, magnetism-chasing field of particles is pure motion with no
  // informational content, so it's gated off entirely rather than just
  // throttled — the field still renders once, statically, via initCanvas.
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    if (!prefersReducedMotion) animate();

    // Dragging a window edge can fire resize dozens of times a second; each
    // one wipes and reallocates every circle, so settle on the final size
    // instead of recomputing on every intermediate event.
    const onResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(initCanvas, 150);
    };
    window.addEventListener("resize", onResize);

    // Writes straight into the mouse ref instead of React state — the canvas
    // is already driven by requestAnimationFrame, so there's no reason for a
    // mousemove event (up to ~120/sec on a high-poll mouse) to trigger a
    // React re-render (and re-run this whole effect) on every tick.
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // Re-run whenever the adaptive-performance props change (e.g. crossing
    // the mobile breakpoint) instead of freezing them at mount.
  }, [quantity, staticity, ease, maxDpr, prefersReducedMotion]);

  usePauseOnHidden(
    () => cancelAnimationFrame(rafId.current),
    () => {
      if (!prefersReducedMotion) animate();
    },
  );

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = (event: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = event.clientX - rect.left - w / 2;
      const y = event.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    // Normally starts transparent and fades in via the rAF loop's alpha
    // ramp; with that loop gated off for reduced motion, start at the
    // target alpha directly so the one-shot draw is actually visible.
    const alpha = prefersReducedMotion ? targetAlpha : 0;
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      // Offset the draw position directly instead of a translate()/
      // setTransform() pair per circle — avoids mutating (and immediately
      // resetting) the canvas transform matrix on every single draw call.
      context.current.beginPath();
      context.current.arc(x + translateX, y + translateY, size, 0, 2 * Math.PI);
      context.current.fillStyle = alphaColor(alpha);
      context.current.fill();

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    // Reverse iteration so splice-ing out an out-of-bounds circle below
    // doesn't shift a not-yet-visited element into the current index and
    // cause it to get skipped (which a forward forEach + splice does).
    for (let i = circles.current.length - 1; i >= 0; i--) {
      const circle = circles.current[i];
      // Handle the alpha value — distance to the nearest of the 4 edges,
      // without allocating an array + reduce closure per circle per frame.
      const closestEdge = Math.min(
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      );
      const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1);
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1);
        // create a new circle
        const newCircle = circleParams();
        drawCircle(newCircle);
        // update the circle position
      } else {
        drawCircle(circle, true);
      }
    }
    rafId.current = window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={cn(
        className,
        "dark:bg-gradient-to-tl from-black via-zinc-600/20 to-black",
      )}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
