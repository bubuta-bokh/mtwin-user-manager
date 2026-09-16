'use client'

import {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface ToolbarContextValue {
    title: string;
    setTitle: (title: string) => void;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export function ToolbarProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState("");

    return (
        <ToolbarContext.Provider value={{ title, setTitle }}>
            {children}
        </ToolbarContext.Provider>
    );
}

export function useToolbarTitle( title: string) {
    const ctx = useContext(ToolbarContext);

    if (!ctx) {
        throw new Error("useToolbarTitle must be used within a ToolbarProvider");
    }

    useEffect(() => {
        ctx.setTitle(title);
    }, [title]);
}

export function useToolbarContext() {
    const ctx = useContext(ToolbarContext);

    if (!ctx) {
        throw new Error("useToolbarContext must be used within a ToolbarProvider");
    }

    return ctx;
}