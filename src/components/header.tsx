"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/utils/utils";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { config } from "@/data/config";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  return (
    <motion.header
      className={cn(
        "fixed z-[1000] box-border w-full p-[15px] backdrop-blur-md",
      )}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0, // 3.5 for loading, .5 can be added for delay
        duration: 0.8,
      }}
    >
      <div className="relative flex items-center justify-end text-xs font-normal lowercase sm:text-[15px]">
        <Link
          href="/public"
          className="absolute left-0 flex items-center justify-center text-foreground no-underline"
        >
          <Button variant={"link"} className="text-md">
            {config.author}
          </Button>
        </Link>

        <ThemeToggle className="w-6 h-6 hidden md:flex" />
      </div>
    </motion.header>
  );
};

export default Header;
