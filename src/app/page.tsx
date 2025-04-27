"use client";
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
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const geistSans = Space_Grotesk({
  subsets: ["latin"],
});

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  
  if(user.userId) {
    return router.replace("/:d:/app");
  }

  return <>Loading...</>;
}
