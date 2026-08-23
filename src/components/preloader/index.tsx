"use client";
import gsap from "gsap";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loader from "./loader";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
};
const preloaderContext = createContext<PreloaderContextType | undefined>(
  undefined,
);

type PreloaderProps = {
  children: ReactNode;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
const LOADING_TIME = 2.5;
function Preloader({ children }: PreloaderProps) {
  const pathname = usePathname();
  // Skip the loading splash for the résumé route
  const skip = pathname?.startsWith("/resume");

  const [isLoading, setIsLoading] = useState(!skip);
  const [loadingPercent, setLoadingPercent] = useState(skip ? 100 : 0);
  const loadingTween = useRef<gsap.core.Tween>(null);

  // The splash exists only to mask the Spline 3D scene loading; the scene calls
  // bypassLoading() once it's ready so we don't sit behind the loader longer
  // than needed.
  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
  };

  const loadingPercentRef = useRef<{ value: number }>({ value: 0 });
  useEffect(() => {
    if (skip) return;
    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "slow(0.7,0.7,false)",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });
    return () => {
      loadingTween.current?.kill();
    };
  }, [skip]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
