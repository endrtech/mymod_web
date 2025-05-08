"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const PassportCard = () => {
  const { user } = useUser();

  return (
    <div className="relative group w-[350px] h-[500px] mx-auto">
      {/* Animated Gradient Border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 rounded-xl p-[2px] z-0 pointer-events-none bg-[conic-gradient(from_180deg_at_center,_#0090F7,_#BA62FC,_#F2416B,_#F55600,_#0090F7)] mix-blend-screen animate-spin-slow"
      >
        {/* Inner mask to make border effect */}
        <div className="w-full h-full rounded-xl bg-transparent" />
      </motion.div>

      {/* Main Card */}
      <div className="relative z-10 w-full h-full rounded-xl bg-zinc-900 text-white p-6 shadow-2xl">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Welcome traveller!</h2>
          <p className="text-zinc-400 text-sm">MYMOD</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-zinc-400">Name</p>
            <p className="text-lg">{user?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Email</p>
            <p className="text-lg">{user?.emailAddresses[0].emailAddress}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Member since</p>
            <p className="text-lg">
              {moment(user?.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
        </div>

        {/* Stamp logo */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 1 }}
          className="absolute bottom-6 right-6 w-24 h-24"
        >
          <Image
            src="/mymod_emblem.svg"
            alt="Stamp"
            width={96}
            height={96}
            className="opacity-80"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PassportCard;
