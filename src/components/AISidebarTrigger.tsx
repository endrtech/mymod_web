"use client"
import { Sparkle } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export const AISidebarTrigger = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className="bg-black text-white rounded-full p-2 shadow-xl border-2 border-zinc-900 relative w-12 h-12 flex items-center justify-center"
        >
            <Sparkle size={20} />
        </button>
    );
}