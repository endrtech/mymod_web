"use client"
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import Image from "next/image";
import Squares from "@/components/beta/loading-bkg";
import {useTheme} from "next-themes";

const loadingStages = [
  "Initializing...",
  "Loading resources...",
  "Preparing interface...",
  "Almost ready...",
  "Complete!"
];

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 + 2;

        // Update stage based on progress
        const stageIndex = Math.min(
            Math.floor((newProgress / 100) * loadingStages.length),
            loadingStages.length - 1
        );
        setCurrentStage(stageIndex);

        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}} className="bg-black dark">
          <Squares
              speed={0.5}
              squareSize={40}
              direction='diagonal' // up, down, left, right, diagonal
              borderColor='#9d9d9e'
              hoverFillColor='#222'
          />
          <div
              className="flex flex-row items-center justify-start gap-3 absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-black to-transparent">
            <div className="flex flex-col gap-4 items-start justify-center h-screen w-1/5 px-12">
              <Image
                  src={"/mymod_emblem.svg"} alt={"MYMOD"}
                  width={100} height={150}
              />
              <div className="space-y-2 w-full">
                <Progress value={progress} className="h-3 dark text-white" />
                <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {loadingStages[currentStage]}
            </span>
                  <span className="text-muted-foreground">
              {Math.round(progress)}%
            </span>
                </div>
              </div>
            </div>
          </div>

        </div>
    );
}