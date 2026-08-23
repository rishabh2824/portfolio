"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";

const getRandomHeight = () => {
  return `${Math.random() * 100}vh`;
};

const NyanCat = () => {
  const [divs, setDivs] = useState<
    {
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "n" || isInputFocused()) return;
      setDivs((prev) => [...prev, { id: (Math.random() * 100000).toFixed() }]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const removeDiv = (id: string) => {
    setDivs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="fixed left-0 top-0 w-screen h-screen overflow-hidden z-[-1]">
      {divs.map((div) => (
        <AnimatedDiv
          key={div.id}
          id={div.id}
          onCompleted={() => removeDiv(div.id)}
        />
      ))}
    </div>
  );
};

const AnimatedDiv = ({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted: () => void;
}) => {
  const randY = getRandomHeight();

  return (
    <motion.div
      key={id}
      initial={{ x: "-20vw", y: randY }}
      animate={{ x: "100vw", y: randY }}
      transition={{ duration: 5, ease: "linear" }}
      onAnimationComplete={onCompleted}
    >
      <img
        src="/assets/nyan-cat.gif"
        className={cn("fixed z-10 h-40 w-auto")}
        alt="Nyan Cat"
      />
    </motion.div>
  );
};

export default NyanCat;
