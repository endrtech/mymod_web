"use client"
import "./globals.css";
import {useAuth} from "@clerk/nextjs";
import {permanentRedirect} from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LoginForm } from "@/components/beta/login-form";
import Silk from "@/components/application/login-bkg";
import {useEffect} from "react";

export default function Main() {
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
        return permanentRedirect("/portal");
    }
  }, [userId]);

  return (
    <div className="bg-muted flex h-screen flex-col items-center justify-center gap-6">
      <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}

      />
      <div className="absolute flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-4 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md">
            <Avatar
              className="size-10"
            >
              <AvatarImage
                src={"/mymod_emblem.svg"}
                alt="MYMOD"
              />
            </Avatar>
          </div>
          MYMOD
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
