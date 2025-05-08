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
            Let&apos;s add a server.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            To use MYMOD, our connector bot needs to be added to a server. Add
            MYMOD to one now.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {process.env.NEXT_PUBLIC_DEV_MODE === "true" ? (
              <Link
                href={
                  "https://discord.com/oauth2/authorize?client_id=1156892648712454214&permissions=1634705730726&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fonboarding%2Fserver-connected&integration_type=0&scope=bot+identify"
                }
              >
                <Button variant="outline">
                  Connect a server <ChevronRight />
                </Button>
              </Link>
            ) : (
              <Link
                href={
                  "https://discord.com/oauth2/authorize?client_id=1156892648712454214&permissions=1634705730726&response_type=code&redirect_uri=https%3A%2F%2Fmymod.endr.tech%2Fonboarding%2Fserver-connected&integration_type=0&scope=bot+identify"
                }
              >
                <Button variant="outline">
                  Connect a server <ChevronRight />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
