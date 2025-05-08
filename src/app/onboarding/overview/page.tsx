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
              src="/endr_person_think.png"
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
            What can you do in MYMOD?
          </motion.h1>
          <motion.h1
            className={`${geistSans.className} text-lg text-white font-medium`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MYMOD comes with many features out of the box, but we&apos;d like to
            highlight a few.
          </motion.h1>
          <motion.div
            className={`${geistSans.className} dark text-white grid grid-cols-4 gap-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-purple-800 to-background border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">
                  Get help, wherever you need it.
                </CardTitle>
                <CardAction>
                  <Badge variant="secondary">EARLY ACCESS</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  MYMOD comes with ENDR Intelligence, a powerful AI platform
                  designed to help your work in MYMOD easier.
                </CardDescription>
                <br />
                <Link href={"/onboarding/about-mymod-intelligence"}>
                  <Button variant="outline">
                    Learn more <ChevronRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-800 to-background border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">
                  Keep track of every punishment.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  MYMOD uses Cases to create and action punishments and
                  moderation actions against users in your server. Add comments,
                  or have multiple actions all done at the same time with ease.
                </CardDescription>
                <br />
                <Link href={"/onboarding/about-cases"}>
                  <Button variant="outline">
                    Learn more <ChevronRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-800 to-background border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">
                  Manage everything about your server.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  MYMOD has built-in server management, allowing you to update
                  almost anything about your server. Soon, you&apos;ll be able
                  to do the same with your members.
                </CardDescription>
                <br />
                <Link href={"/onboarding/server-management"}>
                  <Button variant="outline">
                    Learn more <ChevronRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-800 to-background border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">
                  An extensive plugin platform.
                </CardTitle>
                <CardAction>
                  <Badge variant="secondary">COMING SOON</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  MYMOD is designed to be modular at its core, meaning you can
                  build plugins that work with existing bots or tools that feed
                  into your MYMOD Dashboard.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className={`${geistSans.className} dark text-white cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href={"/onboarding/finish"}>
              <Button variant="outline">
                Finish <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
