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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
              src="/mymod_intelligence.png"
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
            MYMOD Intelligence. Moderation supercharged.
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MYMOD Intelligence is the AI platform designed to help you use MYMOD
            faster.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white grid grid-cols-3 gap-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="bg-black">
              <CardHeader>
                <CardTitle className="text-xl">
                  Find info about your members.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You can ask whos in your server, or get an automated summary
                  of a specific member.
                </CardDescription>
                <br />
                <Image
                  src={"/mymod_intelligence_onboarding/appendix_1.svg"}
                  width={300}
                  height={300}
                  alt="Appendix 1"
                />
              </CardContent>
            </Card>
            <Card className="bg-black">
              <CardHeader>
                <CardTitle className="text-xl">
                  Get an overview over a members cases.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You can ask for information on what cases a user has, or about
                  a specific one.
                </CardDescription>
                <br />
                <Image
                  src={"/mymod_intelligence_onboarding/appendix_2.png"}
                  width={400}
                  height={400}
                  alt="Appendix 2"
                />
              </CardContent>
            </Card>
            <Card className="bg-black">
              <CardHeader>
                <CardTitle className="text-xl">
                  Moderate a user with just a prompt.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You can ask MYMOD Intelligence to easily punish a user.
                  Currently, you can only warn users. Soon, you&apos;ll be able
                  to use all moderation actions, and also use MYMOD Intelligence
                  via Discord.
                </CardDescription>
                <br />
                <Image
                  src={"/mymod_intelligence_onboarding/appendix_3.png"}
                  width={400}
                  height={400}
                  alt="Appendix 3"
                />
              </CardContent>
            </Card>
          </motion.div>
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
          <motion.h1
            className={`${geistSans.className} text-sm text-white font-normal max-w-1/3`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MYMOD Intelligence is an early access, free feature, and may become
            a Premium feature in the future. This feature is enabled by default,
            and can be disabled in Settings.
          </motion.h1>
        </div>
      </div>
    </>
  );
}
