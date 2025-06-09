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
import Beams from "@/components/beta/beams";
import {useTheme} from "next-themes";
import {Toaster} from "@/components/ui/sonner";
import {toast} from "sonner";

export default function BetaWelcome() {
    const [isMuted, setIsMuted] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const soundRef = useRef<Howl | null>(null);
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);

    const { setTheme } = useTheme();

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
                            Let&apos;s go!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {hasConsent && (
                <div className="dark text-white bg-black bg-cover bg-center bg-no-repeat w-full h-screen">
                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                        <Beams
                            beamWidth={2}
                            beamHeight={15}
                            beamNumber={12}
                            lightColor="#ffffff"
                            speed={2}
                            noiseIntensity={1.75}
                            scale={0.2}
                            rotation={25}
                        />
                    </div>
                    {/* Glowing Text */}
                    {stepOne && (
                        < motion.div
                            initial={{opacity: 0, scale: 0.8, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
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
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2, duration: 0.8}}
                                    className="block"
                                >
                                    The world&apos;s most
                                </motion.span>
                                <motion.span
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4, duration: 0.8}}
                                    className="block"
                                >
                                    advanced Discord moderation app.
                                </motion.span>
                                <motion.span
                                    className="absolute inset-0 blur-xl"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 0.5, scale: 1}}
                                    transition={{duration: 2, delay: 1}}
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                            </span>
                            </h1>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center"
                            >
                                <span className="text-center">Let&apos;s get started. Click the button below to login.</span>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center"
                            >
                                <Button variant="outline" onClick={() => {
                                    setStepOne(false);
                                    setStepTwo(true);
                                }}>
                                    Get started
                                </Button>
                            </motion.div>

                            {/* Mute Toggle Button */}
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 1}}
                                className="fixed bottom-4 right-4 z-[30]"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="bg-white/50 hover:bg-white/70 text-black"
                                >
                                    {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                    {stepTwo && (
                        <motion.div
                            initial={{opacity: 0, scale: 0.8, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            transition={{
                                duration: 1.8,
                                delay: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-8 noDragRegion"
                            >
                            <h1 className="text-5xl font-bold text-white text-left tracking-tight pt-12">
                            <span className="relative inline-block">
                                <motion.span
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2, duration: 0.8}}
                                    className="block"
                                >
                                    Light or dark?
                                </motion.span>
                            </span>
                            </h1>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center"
                            >
                                <span className="text-center">Set a theme for MYMOD. The desktop app utilises modUI 2 by default, and it cannot be switched.</span>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center gap-4 p-20"
                            >
                                <div onClick={() => { setTheme("light"); toast.success("Light mode enabled."); setStepTwo(false); setStepThree(true) }} className="cursor-pointer flex flex-col items-start justify-start rounded-sm bg-foreground text-background border-1 border-muted shadow-md">
                                    <img src="/desktop-white.png" width="100%" className="rounded-t-sm" />
                                    <span className="text-center font-semibold w-full py-4">Light mode</span>
                                </div>
                                <div onClick={() => { setTheme("dark"); toast.success("Dark mode enabled."); setStepTwo(false); setStepThree(true) }} className="cursor-pointer flex flex-col items-start justify-start rounded-sm bg-background border-1 shadow-md border-muted">
                                    <img src="/desktop-dark.png" width="100%" className="rounded-t-sm" />
                                    <span className="text-center font-semibold w-full py-6">Dark mode</span>
                                </div>
                            </motion.div>

                            {/* Mute Toggle Button */}
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 1}}
                                className="fixed bottom-4 right-4 z-[30]"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="bg-white/50 hover:bg-white/70 text-black"
                                >
                                    {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                    {stepThree && (
                        < motion.div
                            initial={{opacity: 0, scale: 0.8, y: 20}}
                            animate={{opacity: 1, scale: 1, y: 0}}
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
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2, duration: 0.8}}
                                    className="block"
                                >
                                    You&apos;re all set.
                                </motion.span>
                                <motion.span
                                    className="absolute inset-0 blur-xl"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 0.5, scale: 1}}
                                    transition={{duration: 2, delay: 1}}
                                    style={{
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                            </span>
                            </h1>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center"
                            >
                                <span className="text-center">Setup is all done. Click the button below to login to MYMOD.</span>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, filter: 'blur(20px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 2,
                                    delay: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative flex items-center"
                            >
                                <Button variant="outline" onClick={() => {
                                    setStepThree(false);
                                    window.localStorage.setItem("hasDoneInitialSetup", "true")
                                    permanentRedirect("/");
                                }}>
                                    Login to MYMOD
                                </Button>
                            </motion.div>

                            {/* Mute Toggle Button */}
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 1}}
                                className="fixed bottom-4 right-4 z-[30]"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="bg-white/50 hover:bg-white/70 text-black"
                                >
                                    {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )
            }
            <Toaster className="dark" />
        </>
    )
}