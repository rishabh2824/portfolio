"use client";

import { useEffect } from "react";

/**
 * Pauses a render loop (rAF canvas, WebGL scene) while the tab is hidden —
 * no point burning frames/battery drawing to something nobody can see.
 */
export function usePauseOnHidden(onHidden: () => void, onVisible: () => void) {
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) onHidden();
      else onVisible();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [onHidden, onVisible]);
}
