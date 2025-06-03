"use client"

import { useEffect, useRef, useState } from "react"
import { permanentRedirect, usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Howl } from 'howler'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

const ROWS = 18;
const COLS = 36;
const DOT_SIZE = 10; // px

// Generate a random phase offset for each dot for sporadic animation
const phaseOffsets = Array.from({ length: ROWS * COLS }, () => Math.random() * Math.PI * 2);

export default function BetaWelcome() {
    const [phase, setPhase] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        const hasDoneInitialSetup = window.localStorage.getItem("hasDoneInitialSetuo");
        if(hasDoneInitialSetup === "true") {
            return permanentRedirect("/");
        }
    }, [])

    useEffect(() => {
        if (hasConsent) {
            // Initialize Howler sound
            soundRef.current = new Howl({
                src: ['/welcome.mp3'],
                loop: true,
                volume: 0.5,
                autoplay: true,
                onplay: () => {
                    console.log('Audio started playing');
                },
                onload: () => {
                    console.log('Audio loaded');
                },
                onloaderror: (id, error) => {
                    console.error('Error loading audio:', error);
                }
            });

            // Cleanup on unmount
            return () => {
                if (soundRef.current) {
                    soundRef.current.stop();
                }
            };
        }
    }, [hasConsent]);

    // Handle mute toggle
    const toggleMute = () => {
        if (soundRef.current) {
            const newMuteState = !isMuted;
            soundRef.current.mute(newMuteState);
            setIsMuted(newMuteState);
            console.log('Mute state:', newMuteState);
        }
    };

    const setBetaLSVariable = () => {
        window.localStorage.setItem("betaEnabled", "true");
        return permanentRedirect("/beta");
    }

    return (
        <>
        <div className="absolute bg-transparent z-[20] top-0 left-0 w-full h-8 dragRegion">&nbsp;</div>
            <Dialog open={!hasConsent} onOpenChange={() => { }}>
                <DialogContent className="noDragRegion sm:max-w-[425px] dark text-white">
                    <DialogHeader>
                        <DialogTitle>Before we begin...</DialogTitle>
                        <DialogDescription>
                            This experience includes background music that will play automatically.
                            You can mute it using the button in the bottom right corner.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setHasConsent(true)}
                            className="w-full"
                        >
                            Let's go!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {hasConsent && (
                <div className="dark text-white bg-[url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN281b3J6OTBnZ25xcmZ4dHlxb3Q1dnBvenpmaGh0YnlkdnR1bTdvciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8w61HSu6xQjoa2NzKN/giphy.gif')] bg-cover bg-center bg-no-repeat w-full h-screen">
                    {/* Glowing Text */}
                    < motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 1.8,
                            delay: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8 noDragRegion"
                    >
                        <h1 className="text-5xl font-bold text-white text-center tracking-tight pt-12">
                            <span className="relative inline-block">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="block"
                                >
                                    The world's most
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="block"
                                >
                                    advanced Discord moderation app.
                                </motion.span>
                                <motion.span
                                    className="absolute inset-0 blur-xl"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.5, scale: 1 }}
                                    transition={{ duration: 2, delay: 1 }}
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                            </span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{
                                duration: 2,
                                delay: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative flex items-center"
                        >
                            <span className="text-center">Let's get started. Click the button below to login.</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{
                                duration: 2,
                                delay: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative flex items-center"
                        >
                            <Button variant="outline" onClick={() => { window.localStorage.setItem("hasDoneInitialSetup", "true"); permanentRedirect("/") }}>
                                Get started
                            </Button>
                        </motion.div>

                        {/* Mute Toggle Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="fixed bottom-4 right-4 z-[30]"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="bg-white/50 hover:bg-white/70 text-black"
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div >
            )
            }
        </>
    )
}