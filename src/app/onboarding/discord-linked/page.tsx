"use client";
import Image from "next/image";
import { geistSans } from "../../:d:/app/server/[serverId]/fonts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";

export default function OnboardingFlow() {
  const [nextStep, setNextStep] = useState("#");
  const [ctaClicked, setCtaClicked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const user = await getDiscordUser();
      const getServers = await getUserGuilds(user?.id);
      if (getServers?.length === 0) {
        setNextStep("/onboarding/connect-server");
      } else {
        setNextStep("/onboarding/overview");
      }
    };
    getData();
  }, []);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src="/endr_check.png" width={100} height={100} alt="MYMOD" />
          </motion.div>
          <motion.h1
            className={`${geistSans.className} text-4xl text-white font-bold`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            All systems go.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your account is now linked. Let&apos;s continue on.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href={nextStep}>
              <Button variant="outline">
                Continue <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
