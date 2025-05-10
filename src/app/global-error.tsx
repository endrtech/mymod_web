"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Geist } from "next/font/google";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const geistSans = Geist({
  subsets: ["latin"],
});

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <motion.div
          className="absolute bg-[url('https://i.imgur.com/AqEccZl.png')] bg-cover bg-center w-full h-screen overflow-hidden z-0"
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
                src="/endr_warning.png"
                width={100}
                height={100}
                alt="ENDR"
              />
            </motion.div>
            <motion.h1
              className={`${geistSans.className} text-4xl text-white font-bold`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Uh oh! An error has occured.
            </motion.h1>
            <motion.h1
              className={`${geistSans.className} text-lg text-white font-medium`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Please contact MYMOD Support and give the following error message:{" "}
              {error.message}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Button
                variant="outline"
                onClick={() => reset()}
                className="dark text-white"
              >
                Go back to safety <ChevronRight />
              </Button>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
