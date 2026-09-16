'use client'

import { usePathname } from "next/navigation";
import Toolbar from "./Toolbar";
import { ToolbarProvider } from "./ToolbarContext";
import { SessionUser } from "@/lib/session";

const NO_TOOLBAR_ROUTES = ['/login', '/change-password','/'];

export default function AppShell({ user, children }: { user: SessionUser | null, children: React.ReactNode }) {
    const pathName = usePathname();
    const hideToolbar = NO_TOOLBAR_ROUTES.includes(pathName);

    if (hideToolbar) return <>{children}</>;

    return <ToolbarProvider>
        <Toolbar user={user}></Toolbar>
        <main>{children}</main>
    </ToolbarProvider>

}
