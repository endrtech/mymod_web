"use client"
import { RefreshCw } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const RefreshApplicationNav = () => {
    const router = useRouter();
    return (
        <Button onClick={() => router.refresh()} variant="outline" size="icon" className="dark text-white">
            <RefreshCw />
        </Button>
    )
}