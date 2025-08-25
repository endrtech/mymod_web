"use client";
import Image from "next/image";
import { geistSans } from "../../portal/fonts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingFlow() {
  return (
    <>
      <motion.div
        className="absolute bg-[url('https://i.imgur.com/Msh1L4n.png')] bg-contain bg-right bg-no-repeat w-full h-screen overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute z-10 w-full h-screen bg-gradient-to-r from-black to-transparent">
        <div className="flex flex-col items-start justify-center h-screen px-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/mymod_emblem.svg"
              width={100}
              height={100}
              alt="MYMOD"
            />
          </motion.div>
          <motion.h1
            className={`${geistSans.className} text-4xl text-white font-bold`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Cases are where its at.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium max-w-[60%]`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Cases are what power MYMOD. Create, modify, add comments, and
            perform multiple punishments at once using Cases. And, with plugins,
            you can extend the functionality of Cases even further (coming
            soon).
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href={"/onboarding/overview"}>
              <Button variant="outline">
                Head back <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
