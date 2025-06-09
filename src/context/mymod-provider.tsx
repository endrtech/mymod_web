"use client"
import React, {useEffect} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function MYMODProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NEXT_PUBLIC_DEV_MODE === "true" && (
                <ReactQueryDevtools />
            )}
        </QueryClientProvider>
    )
}