"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

const ROWS = 18;
const COLS = 36;
const DOT_SIZE = 10; // px

// Generate a random phase offset for each dot for sporadic animation
const phaseOffsets = Array.from({ length: ROWS * COLS }, () => Math.random() * Math.PI * 2);

export default function LoadingOverlay() {
  const [phase, setPhase] = useState(0);

  // Animate the phase for breathing (faster)
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setPhase((prev) => prev + 0.18); // even faster
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const prevPath = useRef<string | null>(null)

  // Initial load
  useEffect(() => {
    const runLoader = async () => {
      const done = () => setIsVisible(false)
      const sessionToken = document.cookie.includes("__session");

      if (document.readyState === "complete" && sessionToken) {
        done()
      } else {
        window.addEventListener("load", done)
        return () => window.removeEventListener("load", done)
      }
    }

    runLoader();
  }, [])

  // Show on client-side navigation
  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname
      return
    }

    setIsVisible(true)
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="bg-tranparent h-8 w-full dragRegion absolute top-0 left-0 z-1">&nbsp;</div>
          {/* Halftone breathing dot pattern - full screen */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-2">
            <div
              style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            >
              {[...Array(ROWS)].map((_, row) =>
                [...Array(COLS)].map((_, col) => {
                  const idx = row * COLS + col;
                  // Sine wave for breathing effect, with random phase offset for sporadic movement
                  const wave = Math.sin(
                    (col / COLS) * Math.PI * 2 +
                    (row / ROWS) * Math.PI * 2 +
                    phase + phaseOffsets[idx]
                  );
                  // Dot size modulated by wave
                  const scale = 0.4 + 0.6 * (0.5 + 0.5 * wave); // between 0.4 and 1
                  return (
                    <motion.div
                      key={`${row}-${col}`}
                      className="absolute bg-neutral-900 rounded-full"
                      style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        left: `calc(${col} * (100vw / ${COLS}))`,
                        top: `calc(${row} * (100vh / ${ROWS}))`,
                        scale,
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Blurred black gradient behind logo and text */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-black/80 blur-2xl" />
          </div>

          {/* Centered Logo */}
          <Image
            src="/mymod_emblem.svg"
            alt="Logo"
            width={120}
            height={120}
            className="z-20 animate-pulse"
          />

          {/* Caption */}
          <p className="z-20 mt-4 text-white text-lg font-medium tracking-wide">
            Getting everything ready for you...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}