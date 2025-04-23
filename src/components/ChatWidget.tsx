// components/ChatWidget.tsx
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Image from "next/image";
import { Sparkle, X } from "lucide-react";
import { useRef } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getGuildMember } from "@/app/actions/getGuildMember";

export default function ChatWidget({ serverId, userId }: { serverId: string, userId: string }) {
    const [discordData, setDiscordData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { toggleSidebar } = useSidebar();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("chatMessages") || "[]");
        }
        return [];
    });

    useEffect(() => {
        const getDiscordUserData = async () => {
            const discordData = await getGuildMember(serverId, userId);
            setDiscordData(discordData);
        }
        getDiscordUserData();
        localStorage.setItem("chatMessages", JSON.stringify(messages));
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text: string) => {
        const newMessages = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setIsTyping(true); // show typing indicator

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: "system", content: "You are a helpful assistant." }, ...newMessages],
                server: serverId,
                user: userId
            }),
        });

        const data = await res.json();
        const reply = data;
        if (reply) setMessages([...newMessages, reply]);

        setIsTyping(false); // hide typing indicator
    };

    const sendInitialPrompt = async () => {
        setMessages([]); // clear messages
        setIsTyping(true); // show typing indicator

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: "system", content: `Ignore all previous messages and conversation history and context. You are MYMOD Intelligence, a helpful assistant for MYMOD. You are able to help with general Discord moderation enquiries, and also utilise tools/functions to provide more rich answers and context. Please understand the question literally, and do not assume what they are asking. Use the conversation history and context to provide your answer. Limit all responses to under 500 characters. Please repond with 'Hey there! How can I help you with your server today?' after this prompt.` }],
                server: serverId,
                user: userId
            }),
        });

        const data = await res.json();
        const reply = data;
        if (reply) setMessages([reply]);

        setIsTyping(false); // hide typing indicator
    };

    return (
        <>
            <Sidebar onLoad={() => sendInitialPrompt()} style={{
                "--sidebar-width": "25%",
            } as React.CSSProperties} side="right" variant="floating" collapsible="offcanvas" className="-p-2 h-auto z-[999] p-0 m-2 dark bg-black border-1 border-zinc-900 shadow-xl rounded-2xl">
                <SidebarHeader className="p-0 bg-black rounded-t-xl border-none">
                    <div className="p-4 backdrop-blur-xl rounded-t-xl bg-gradient-to-b from-black/90 to-transparent text-white font-semibold mb-24">
                        <div className="absolute inset-0 chat-gradient-bg z-0" />
                        <div className="flex flex-col items-left gap-1 py-4 shadow-xl">
                            <div className="flex flex-row items-center gap-2 justify-between">
                                <Image src="/mymod_emblem.svg" alt="MYMOD" width={60} height={60} />
                                <Button variant="ghost" size="icon" className="text-white z-[5]" onClick={toggleSidebar}>
                                    <X size={20} />
                                </Button>
                            </div>
                            <h1 className="font-semibold text-xl text-white">How can I help you today?</h1>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent className="flex-1 overflow-y-auto px-4 py-2 -mt-24 max-h-full bg-black">
                    <MessageList messages={messages} />
                    {isTyping && (
                        <div className="mr-auto mt-2">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </SidebarContent>
                <SidebarFooter className="p-4 border-t border-zinc-900 bg-black rounded-b-xl">
                    <ChatInput onSend={sendMessage} />
                    <span className="text-xs font-medium text-zinc-400">MYMOD Intelligence is in beta, and it's knowledge is limited. Currently, you are able to obtain information about all members, a specific member, their cases, or you can warn users via the AI model.</span>
                </SidebarFooter>
                <SidebarRail className="rounded-l-2xl" />
            </Sidebar>
        </>
    );
}

/**
 * <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="mb-2 bg-[#1a1a1a] text-white rounded-2xl w-[360px] max-h-[600px] flex flex-col shadow-2xl "
                        >
                            <div className="relative bg-black text-white rounded-2xl w-[360px] max-h-[600px] flex flex-col shadow-2xl overflow-hidden border-1 border-zinc-900">
                                <div className="relative z-10">

                                    <div className="p-4 backdrop-blur-xl rounded-t-2xl bg-gradient-to-b from-black/90 to-transparent text-white font-semibold mb-24">
                                        <div className="absolute inset-0 chat-gradient-bg z-0" />
                                        <div className="flex flex-col items-left gap-1 py-4">
                                            <Image src="/mymod_emblem.svg" alt="MYMOD" width={60} height={60} />
                                            <h1 className="font-semibold text-xl text-white">How can I help you today?</h1>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto px-4 py-2 -mt-24 max-h-[400px]">
                                        <MessageList messages={messages} />
                                        {isTyping && (
                                            <div className="mr-auto mt-2">
                                                <div className="typing-dots">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className="p-4 border-t border-zinc-900">
                                        <ChatInput onSend={sendMessage} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="bg-black text-white rounded-full p-4 shadow-xl border-2 border-zinc-900 relative w-12 h-12 flex items-center justify-center"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="x"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute"
                            >
                                <X size={20} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sparkle"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute"
                            >
                                <Sparkle size={20} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>
 */

/**
 * 
 */