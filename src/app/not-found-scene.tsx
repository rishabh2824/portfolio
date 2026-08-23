"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { useLazyClientComponent } from "@/hooks/use-lazy-client-component";

// `_not-found` is a route Next can reach from *any* page (every route falls
// back to it via the implicit not-found boundary), so anything this
// component references unconditionally during render — including a
// `React.lazy()` used inside `<Suspense>`, since that still registers a
// client-reference/preload entry in the RSC payload — gets swept into the
// shared chunks preloaded on every route, not just the 404 page. A top-level
// `import Spline from "@splinetool/react-spline"` (or a lazy() one rendered
// inside Suspense) was shipping the ~2MB Spline/three.js runtime everywhere.
// Fetching it via a plain `import()` inside a client-only effect, gated on
// state, keeps it out of the render tree Next inspects at build/SSR time.
type SplineProps = {
  scene: string;
  style?: CSSProperties;
  className?: string;
};

const NotFoundScene = () => {
  const Spline = useLazyClientComponent<SplineProps>(
    () => import("@splinetool/react-spline"),
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      {Spline && (
        <Spline
          scene="/assets/404.spline"
          style={{ height: "100dvh" }}
          className="absolute inset-0"
        />
      )}
      {/* Renders unconditionally — the scene is decorative, so a slow
          connection or a failed/blocked chunk load should never leave a
          visitor looking at a blank page with no way back. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-6xl font-bold text-foreground md:text-8xl">404</h1>
        <p className="max-w-sm text-balance text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="pointer-events-auto mt-2 gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundScene;
