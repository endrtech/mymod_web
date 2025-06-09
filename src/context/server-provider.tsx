"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface ServerContextType {
    currentServerId: string | null;
    setCurrentServerId: (id: string | null) => void;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

interface ServerProviderProps {
    children: ReactNode;
}

export function ServerProvider({ children }: ServerProviderProps) {
    const [currentServerId, setCurrentServerIdState] = useState<string | null>(
        null
    );
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("currentServerId");
        setCurrentServerIdState(stored);
        setIsLoaded(true);
    }, []);

    // Update localStorage when state changes
    const setCurrentServerId = (id: string | null) => {
        setCurrentServerIdState(id);
        if (id === null) {
            localStorage.removeItem("currentServerId");
        } else {
            localStorage.setItem("currentServerId", id);
        }
    };

    // Don't render until we've loaded from localStorage
    if (!isLoaded) {
        return null;
    }

    return (
        <ServerContext.Provider value={{ currentServerId, setCurrentServerId }}>
            {children}
        </ServerContext.Provider>
    );
}

export function useServer() {
    const context = useContext(ServerContext);
    if (context === undefined) {
        throw new Error("useServer must be used within a ServerProvider");
    }
    return context;
}