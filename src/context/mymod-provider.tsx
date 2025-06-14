"use client"
import React from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/query-client";

export default function MYMODProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {process.env.NEXT_PUBLIC_DEV_MODE === "true" && (
                <ReactQueryDevtools />
            )}
        </QueryClientProvider>
    )
}