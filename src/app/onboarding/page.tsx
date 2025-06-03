"use client";
import Image from "next/image";
import { geistSans } from "../:d:/app/server/[serverId]/fonts";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getDiscordUser } from "../actions/getDiscordUser";
import { getUserGuilds } from "../actions/getUserGuilds";
import Link from "next/link";

export default function OnboardingFlow() {
  const [nextStep, setNextStep] = useState("#");
  const controls = useAnimation();

  useEffect(() => {
    const getData = async () => {
      const user = await getDiscordUser();
      if (!user?.id) {
        setNextStep("/onboarding/link-discord");
      } else {
        const getServers = await getUserGuilds(user?.id);
        if (getServers?.length === 0) {
          setNextStep("/onboarding/connect-server");
        } else {
          setNextStep("/onboarding/overview");
        }
      }
    };
    getData();

    // Start the button press animation sequence
    const sequence = async () => {
      await controls.start({
        scale: 0.95,
        y: 5,
        transition: { duration: 0.2 }
      });
      await controls.start({
        scale: 1,
        y: 0,
        transition: { duration: 0.2 }
      });
    };
    sequence();
  }, [controls]);

  return (
    <>
      <motion.div
        className="absolute bg-[url('https://i.imgur.com/SktGH2I.png')] bg-cover bg-center w-full h-screen overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute z-10 w-full h-screen bg-gradient-to-r from-black to-transparent">
        <div className="flex flex-col items-start justify-center h-screen px-8 gap-4">
          <motion.div
            className="relative"
            animate={controls}
            initial={{ scale: 1, y: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gray-800 rounded-lg"
              style={{ transform: "translateZ(-10px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="relative bg-black rounded-lg p-4 shadow-lg"
              style={{ transform: "translateZ(0)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/mymod_emblem.svg"
                width={100}
                height={100}
                alt="MYMOD"
                className="relative z-10"
              />
            </motion.div>
          </motion.div>
          <motion.h1
            className={`${geistSans.className} text-4xl text-white font-bold`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to MYMOD.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            The worlds most advanced moderation system for Discord.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href={nextStep}>
              <Button variant="outline">
                Get started <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
