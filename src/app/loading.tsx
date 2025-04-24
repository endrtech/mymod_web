"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingOverlay() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const prevPath = useRef<string | null>(null)

  // Initial load
  useEffect(() => {
    const done = () => setIsVisible(false)

    if (document.readyState === "complete") {
      done()
    } else {
      window.addEventListener("load", done)
      return () => window.removeEventListener("load", done)
    }
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
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Animated top blur gradient */}
          <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-0">
            <div className="w-full h-full animate-gradient-blur rounded-b-3xl blur-3xl opacity-80" />
          </div>

          {/* Centered Logo */}
          <Image
            src="/mymod_emblem.svg"
            alt="Logo"
            width={120}
            height={120}
            className="z-10 animate-pulse"
          />

          {/* Caption */}
          <p className="z-10 mt-4 text-white text-lg font-medium tracking-wide">
            Getting everything ready for you...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}