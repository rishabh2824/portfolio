"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

// Typed via `typeof import(...)` so there's no static import specifier for
// either module anywhere in this file — only the runtime `import()` calls
// below reference them.
type DialogModule = typeof import("@/components/ui/dialog");
type DrawerModule = typeof import("@/components/ui/drawer");

// Which implementation to show is decided by the media query alone, so only
// that one's module — @radix-ui/react-dialog, or vaul — is ever fetched. The
// previous version imported both at module scope and picked one at runtime,
// so every visitor downloaded both.
type ResolvedModal =
  | { kind: "dialog"; mod: DialogModule }
  | { kind: "drawer"; mod: DrawerModule };

const ResponsiveDialogContext = React.createContext<ResolvedModal | null>(null);

interface ResponsiveDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function ResponsiveDialog({
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  // Initialized synchronously from matchMedia(...).matches (see
  // use-media-query.tsx), so this is already correct on the very first
  // client render — no more mounting the Drawer, then throwing it away for
  // the Dialog once an effect corrects a stale `false` default.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [resolved, setResolved] = React.useState<ResolvedModal | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    if (isDesktop) {
      import("@/components/ui/dialog").then((mod) => {
        if (!cancelled) setResolved({ kind: "dialog", mod });
      });
    } else {
      import("@/components/ui/drawer").then((mod) => {
        if (!cancelled) setResolved({ kind: "drawer", mod });
      });
    }
    return () => {
      cancelled = true;
    };
  }, [isDesktop]);

  if (!resolved) {
    // The chosen chunk hasn't finished loading yet (this starts the instant
    // `isDesktop` resolves, so in practice it's long done before a user
    // could scroll to and click a trigger). Render children un-rooted so the
    // trigger stays visible instead of popping in; it just isn't wired to
    // open anything until the primitive arrives.
    return (
      <ResponsiveDialogContext.Provider value={null}>
        {children}
      </ResponsiveDialogContext.Provider>
    );
  }

  if (resolved.kind === "dialog") {
    const { Dialog } = resolved.mod;
    return (
      <ResponsiveDialogContext.Provider value={resolved}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      </ResponsiveDialogContext.Provider>
    );
  }

  const { Drawer } = resolved.mod;
  return (
    <ResponsiveDialogContext.Provider value={resolved}>
      <Drawer open={open} onOpenChange={onOpenChange}>
        {children}
      </Drawer>
    </ResponsiveDialogContext.Provider>
  );
}

function useResolvedModal() {
  return React.useContext(ResponsiveDialogContext);
}

function ResponsiveDialogTrigger({
  children,
  ...props
}: React.ComponentProps<DialogModule["DialogTrigger"]>) {
  const resolved = useResolvedModal();

  if (!resolved) {
    return (
      <button type="button" {...props}>
        {children}
      </button>
    );
  }

  if (resolved.kind === "dialog") {
    const { DialogTrigger } = resolved.mod;
    return <DialogTrigger {...props}>{children}</DialogTrigger>;
  }

  const { DrawerTrigger } = resolved.mod;
  return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
}

function ResponsiveDialogContent({
  children,
  className,
  ...props
}: React.ComponentProps<DialogModule["DialogContent"]>) {
  const resolved = useResolvedModal();

  if (!resolved) return null;

  if (resolved.kind === "dialog") {
    const { DialogContent } = resolved.mod;
    return (
      <DialogContent className={className} {...props}>
        {children}
      </DialogContent>
    );
  }

  const { DrawerContent } = resolved.mod;
  return (
    <DrawerContent className={className} {...props}>
      <ScrollArea className="max-h-[85vh] px-4 pb-4 overflow-y-auto!">
        {children}
      </ScrollArea>
    </DrawerContent>
  );
}

function ResponsiveDialogTitle({
  children,
  className,
  ...props
}: React.ComponentProps<DialogModule["DialogTitle"]>) {
  const resolved = useResolvedModal();

  if (!resolved) return null;

  if (resolved.kind === "dialog") {
    const { DialogTitle } = resolved.mod;
    return (
      <DialogTitle className={className} {...props}>
        {children}
      </DialogTitle>
    );
  }

  const { DrawerTitle } = resolved.mod;
  return (
    <DrawerTitle className={className} {...props}>
      {children}
    </DrawerTitle>
  );
}

function ResponsiveDialogDescription({
  children,
  className,
  ...props
}: React.ComponentProps<DialogModule["DialogDescription"]>) {
  const resolved = useResolvedModal();

  if (!resolved) return null;

  if (resolved.kind === "dialog") {
    const { DialogDescription } = resolved.mod;
    return (
      <DialogDescription className={className} {...props}>
        {children}
      </DialogDescription>
    );
  }

  const { DrawerDescription } = resolved.mod;
  return (
    <DrawerDescription className={className} {...props}>
      {children}
    </DrawerDescription>
  );
}

export {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
