// components/ChatInput.tsx
"use client"
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className="flex gap-2">
            <input
                className="flex-grow bg-black border border-zinc-800 rounded-full px-3 text-white text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
            />
            <Button
                className="bg-zinc-900 p-4 rounded-full text-white font-medium"
                onClick={handleSend}
                size="icon"
            >
                <Send size={18} />
            </Button>
        </div>
    );
}