"use client";

import * as React from "react";

import type { ToastProps } from "@/components/ui/toast";

// This app only ever shows one toast at a time (the dark-mode Easter egg in
// theme-toggle.tsx), so this is a minimal single-toast store rather than a
// full queue/reducer.
const TOAST_REMOVE_DELAY = 300;

type ToasterToast = ToastProps & {
  id: string;
  description?: React.ReactNode;
};

let count = 0;
let currentToast: ToasterToast | null = null;
let removeTimeout: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<(toast: ToasterToast | null) => void>();

function publish(next: ToasterToast | null) {
  currentToast = next;
  listeners.forEach((listener) => listener(next));
}

function dismiss() {
  if (!currentToast) return;
  publish({ ...currentToast, open: false });
  clearTimeout(removeTimeout);
  removeTimeout = setTimeout(() => publish(null), TOAST_REMOVE_DELAY);
}

type Toast = Omit<ToasterToast, "id" | "open" | "onOpenChange">;

function toast(props: Toast) {
  clearTimeout(removeTimeout);
  publish({
    ...props,
    id: (count++).toString(),
    open: true,
    onOpenChange: (open) => {
      if (!open) dismiss();
    },
  });
}

function useToast() {
  const [state, setState] = React.useState(currentToast);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    toasts: state ? [state] : [],
    toast,
    dismiss,
  };
}

export { toast, useToast };
