import * as React from "react";

// `window.matchMedia` isn't available during SSR, so this falls back to
// `false` there — the client's first render then re-derives the real value
// synchronously (below) instead of waiting a tick, which is what let
// desktop visitors mount the wrong (mobile) branch on first paint.
function getMatches(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(() => getMatches(query));

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = window.matchMedia(query);
    // Re-sync in case `query` changed since the initializer above ran (that
    // initializer only fires once, on mount).
    setValue(result.matches);
    result.addEventListener("change", onChange);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
