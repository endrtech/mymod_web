"use client";
import Image from "next/image";
import { geistSans } from "../../portal/fonts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserGuilds } from "@/app/actions/getUserGuilds";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PassportCard from "@/components/OnboardingPassportCard";

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
        <div className="flex flex-row items-center justify-start h-screen px-8 gap-4">
          <div className="flex flex-col items-start justify-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/endr_check.png"
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
              Look at you!
            </motion.h1>
            <motion.h1
              className={`${geistSans.className} text-lg text-white font-medium max-w-[60%]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              You&apos;re officially part of the MYMOD family. If you ever need
              more help, check out our Help Centre, or ask MYMOD Intelligence.
            </motion.h1>
            <motion.div
              className={`${geistSans.className} dark text-white cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Link href={"/:d:/app"}>
                <Button variant="outline">
                  Go to MYMOD <ChevronRight />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className={`${geistSans.className} dark text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <PassportCard />
          </motion.div>
        </div>
      </div>
    </>
  );
}
