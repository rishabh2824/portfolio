"use client";

import { useEffect, useState, type ComponentType } from "react";

interface UseLazyClientComponentOptions {
  /** Skip loading entirely (e.g. prefers-reduced-motion gating a pure-motion scene). */
  skip?: boolean;
  /** Defer the import itself until the browser is idle instead of firing immediately. */
  idle?: boolean;
  /** requestIdleCallback timeout / setTimeout fallback delay, in ms. */
  idleTimeout?: number;
}

/**
 * Fetches a component via a dynamic `import()` inside an effect and mounts it
 * once loaded. A plain `import()` call here (as opposed to `next/dynamic` or
 * `React.lazy` at module scope) is opaque to Next's build-time static
 * analysis, so the chunk fetch is deferred along with the mount — it doesn't
 * get emitted as an eager <script> tag in the initial HTML. Optionally defers
 * the fetch itself until requestIdleCallback fires, for chunks heavy enough
 * that they shouldn't compete with first paint.
 */
export function useLazyClientComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  {
    skip = false,
    idle = false,
    idleTimeout = 1500,
  }: UseLazyClientComponentOptions = {},
) {
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    if (skip) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const trigger = () => {
      importFn().then((mod) => {
        if (!cancelled) setComponent(() => mod.default);
      });
    };

    if (!idle) {
      trigger();
    } else if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(trigger, { timeout: idleTimeout });
    } else {
      timeoutId = setTimeout(trigger, 200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [skip, idle, idleTimeout, importFn]);

  return Component;
}
