"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { config } from "@/data/config";
import { cn } from "@/utils/utils";
import { Button } from "./ui/button";

const Header = () => {
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
        duration: 0.8,
      }}
    >
      <div className="relative flex items-center justify-end text-xs font-normal lowercase sm:text-[15px]">
        <Link
          href="/"
          className="absolute left-0 flex items-center justify-center text-foreground no-underline"
        >
          <Button variant={"link"} className="text-md">
            {config.author}
          </Button>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
