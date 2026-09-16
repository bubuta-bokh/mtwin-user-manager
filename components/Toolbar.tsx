'use client'

import { useState, useRef, useEffect } from "react";
import { useToolbarContext } from "@/components/ToolbarContext";
import { SessionUser } from "@/lib/session";

interface ToolbarProps {
    user: SessionUser | null;
}

export default function Toolbar({ user }: ToolbarProps) {
    const { title } = useToolbarContext();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
        });

        if (res.ok) {
            window.location.href = "/login";
        } else {
            console.error("Logout failed");
        }
    }

    return (
        <header className="h-14 bg-blue-500 text-white shadow-sm flex items-center px-4 relative">
            <div className="flex-1"></div>
            <h1 className="text-lg font-semibold text-center flex-1 truncate">{title}</h1>

            <div className="flex-1 flex justify-end" ref={menuRef}>
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setOpen((op) => !op)}
                            className="flex items-center gap-2 text-sm text-white hover:text-blue-100"
                        >
                            <span className="text-right leading-tight">
                                <span className="block truncate max-w-40">{user.fullUserName}</span>
                                <span className="block text-xs text-blue-100">{user.office} / {user.department}</span>
                            </span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {
                            open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-50">
                                    <a href="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Изменить пароль</a>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Выйти</button>
                                </div>
                            )
                        }

                    </div>
                ) : (<a href="/login" className="text-blue-600 hover:underline">Войти</a>)}

            </div>

        </header>
    );

}
