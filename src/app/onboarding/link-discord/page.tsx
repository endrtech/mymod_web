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
      if (!user?.id) {
        setNextStep(
          process.env.NEXT_PUBLIC_DEV_MODE === "false"
            ? "https://accounts.mymod.endr.tech/user"
            : "https://intent-bunny-32.accounts.dev/user",
        );
      } else {
        const getServers = await getUserGuilds(user?.id);
        if (getServers?.length === 0) {
          setNextStep("/onboarding/connect-server");
        }
      }
    };
    getData();
  }, []);

  const connectDiscord = () => {
    setCtaClicked(true);
    window.open(nextStep, "_blank");
  };

  const checkConnection = async () => {
    const user = await getDiscordUser();
    if (user.id) {
      permanentRedirect("/onboarding/discord-linked");
    } else {
      setCtaClicked(false);
    }
  };

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
            <Image
              src="/endr_exclaimation.png"
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
            Connect your Discord account.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            This allows MYMOD to use your Discord data to power your experience.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {ctaClicked === true ? (
              <Button variant="outline" onClick={() => checkConnection()}>
                Check connection <ChevronRight />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => connectDiscord()}>
                Connect your account <ChevronRight />
              </Button>
            )}
          </motion.div>
          <motion.h1
            className={`${geistSans.className} text-sm text-white font-normal max-w-1/3`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            You will be taken to Discord to connect your account, then to
            Accounts Centre. Once done, come back here to confirm.
          </motion.h1>
        </div>
      </div>
    </>
  );
}
