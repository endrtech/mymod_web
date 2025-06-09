"use client"

import { useEffect, useRef, useState } from "react"
import { permanentRedirect } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
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
import StarBorder from "@/components/beta/star-border";
import Iridescence from "@/components/beta/welcome-bkg";

export default function BetaWelcome() {
    const [isMuted, setIsMuted] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [nextStep, setNextStep] = useState(false);
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        if (hasConsent) {
            // Initialize Howler sound
            soundRef.current = new Howl({
                src: ['/welcome.mp3'],
                loop: true,
                volume: 0.1,
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
                <DialogContent className="text-white sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Let&apos;s do this.</DialogTitle>
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
                <div className="text-black bg-cover bg-center bg-no-repeat w-full h-screen">
                   <Iridescence />
                    {
                        !nextStep && (
                            <>
                                {/* Glowing Text */}
                                < motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        duration: 1.8,
                                        delay: 0.5,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="absolute z-[5] inset-0 flex flex-col items-center justify-center gap-8"
                                >
                                    <h1 className="text-5xl font-bold text-black text-center tracking-tight pt-12">
                                        <span className="relative inline-block">
                                            <motion.span
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.8 }}
                                                className="block"
                                            >
                                                The biggest
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.8 }}
                                                className="block"
                                            >
                                                redesign ever.
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
                                        <Button variant="secondary" onClick={() => setNextStep(true)}>
                                            Get started
                                        </Button>
                                    </motion.div>

                                    {/* Blurred Image */}
                                    <motion.div
                                        initial={{ opacity: 0, filter: 'blur(20px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 2,
                                            delay: 1.2,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="relative w-[1000px] h-[650px]"
                                    >
                                        <Image
                                            src="/modui-2-beta-header.png"
                                            alt="ModUI 2.0 Beta"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </motion.div>
                            </>
                        )
                    }

                    {
                        nextStep && (
                            < motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 1.8,
                                    delay: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute z-[5] inset-0 flex flex-col items-center justify-center gap-8"
                            >
                                <h1 className="text-7xl font-bold text-black text-center tracking-tight">
                                    <span className="relative inline-block">
                                        <motion.span
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                            className="block"
                                        >
                                            Introducing
                                        </motion.span>
                                        <motion.span
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                            className="block"
                                        >
                                            modUI 2.
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
                                    <span className="text-center">modUI 2 brings the best out of MYMOD, with an all new UI design, designed to be desktop first, with an all new desktop app.<br />To opt-in to the beta, click the button below. Note: modUI 2 will only apply to this browser, or the desktop app, depending on which one you're using.</span>
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
                                    <Button variant="secondary" onClick={setBetaLSVariable}>
                                        Go to modUI 2 Beta
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )
                    }

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
                </div >
            )
            }
        </>
    )
}