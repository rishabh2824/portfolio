"use client";

import * as React from "react";

// One IntersectionObserver instance shared across every caller — an
// observer can watch many elements, so there's no need for one per
// component instance. Created lazily on first use.
let sharedObserver: IntersectionObserver | null = null;
const intersectionCallbacks = new Map<
  Element,
  (isIntersecting: boolean) => void
>();

function getSharedObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        intersectionCallbacks.get(entry.target)?.(entry.isIntersecting);
      }
    });
  }
  return sharedObserver;
}

/** Whether `ref`'s element is currently intersecting the viewport. */
export function useInViewport(ref: React.RefObject<Element | null>): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getSharedObserver();
    intersectionCallbacks.set(el, setIsIntersecting);
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      intersectionCallbacks.delete(el);
    };
  }, [ref]);

  return isIntersecting;
}

// One document-level visibilitychange listener shared across every caller,
// instead of each one adding its own.
const visibilityListeners = new Set<() => void>();
let visibilityListenerAttached = false;

function ensureVisibilityListener() {
  if (visibilityListenerAttached) return;
  visibilityListenerAttached = true;
  document.addEventListener("visibilitychange", () => {
    for (const listener of visibilityListeners) listener();
  });
}

/** Whether the document is currently hidden (tab backgrounded/minimized). */
export function useDocumentHidden(): boolean {
  const [hidden, setHidden] = React.useState(
    () => typeof document !== "undefined" && document.hidden,
  );

  React.useEffect(() => {
    ensureVisibilityListener();
    const listener = () => setHidden(document.hidden);
    visibilityListeners.add(listener);
    return () => {
      visibilityListeners.delete(listener);
    };
  }, []);

  return hidden;
}
