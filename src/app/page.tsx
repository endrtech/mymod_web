import Head from "next/head";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { Geist, Space_Grotesk } from "next/font/google";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  Link,
  Loader2,
  MailCheck,
  TextCursorInput,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDiscordUser } from "@/app/actions/getDiscordUser"; 

const geistSans = Space_Grotesk({
  subsets: ["latin"],
});

export default async function Home() {
  const user = auth();
  const router = useRouter();
  const discordData = await getDiscordUser();
  
  if(user.userId && discordData.id) {
    return redirect("/:d:/app");
  } else if(user.userId && !discordData.id) {
    return redirect("/connect-discord");
  }

  return <>Loading...</>;
}
