"use client"

import getCurrentGuild from "@/app/actions/getCurrentGuild";
import { getDiscordUser } from "@/app/actions/getDiscordUser";
import { getGuildMember } from "@/app/actions/getGuildMember";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { useServerStore } from "@/store/server-store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDiscordData } from "@/queries/users";

export default function AIPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("chatMessages") || "[]");
        }
        return [];
    });

    const { data: discordData, isLoading: isDiscordLoading } = useQuery(getDiscordData());
    const serverId = useServerStore((state) => state.currentServerId);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isDiscordLoading || !serverId) {
        return (
            <div className="w-[70vw] h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    const sendMessage = async (text: string) => {
        const newMessages = [...messages, { role: "user", content: text }];
        setMessages(newMessages);
        setIsTyping(true); // show typing indicator

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...newMessages],
                    server: serverId,
                    user: discordData?.id
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            const data = await res.json();
            const reply = data;
            if (reply) setMessages([...newMessages, reply]);
        } catch (error) {
            console.error('Error sending message:', error);
            // You might want to show an error toast here
        } finally {
            setIsTyping(false); // hide typing indicator
        }
    };

    const sendInitialPrompt = async () => {
        setMessages([]); // clear messages
        setIsTyping(true); // show typing indicator

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [{ role: "system", content: `Ignore all previous messages and conversation history and context. You are MYMOD Intelligence, a helpful assistant for MYMOD. You are able to help with general Discord moderation enquiries, and also utilise tools/functions to provide more rich answers and context. Please understand the question literally, and do not assume what they are asking. Use the conversation history and context to provide your answer. Limit all responses to under 500 characters. Please repond with 'Hey there! How can I help you with your server today?' after this prompt.` }],
                    server: serverId,
                    user: discordData?.id
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to send initial prompt');
            }

            const data = await res.json();
            const reply = data;
            if (reply) setMessages([reply]);
        } catch (error) {
            console.error('Error sending initial prompt:', error);
            // You might want to show an error toast here
        } finally {
            setIsTyping(false); // hide typing indicator
        }
    };

    return (
        <div className="w-[70vw] h-screen" onLoad={sendInitialPrompt} suppressHydrationWarning>
            <div className="p-4 -mt-16">
                <div className="absolute inset-0 beta-chat-gradient-bg h-32 z-0" />
                <div className="mt-24 flex flex-col items-left gap-1 py-4">
                    <div className="flex flex-row items-center gap-2 justify-between">
                        <Image src="/mymod_emblem.svg" alt="MYMOD" width={60} height={60} />
                    </div>
                    <h1 className="font-semibold text-xl text-foreground">How can I help you today?</h1>
                </div>
            </div>
            <div className="h-[70%] overflow-y-auto p-2">
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
            <ChatInput onSend={sendMessage} />
            <span className="text-xs font-medium text-muted-foreground">MYMOD Intelligence is in beta, and it's knowledge is limited. Currently, you are able to obtain information about all members, a specific member, their cases, or you can warn users via the AI model.</span>
        </div>
    )
}