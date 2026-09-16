import "./globals.css";
import {getSessionUser} from '@/lib/session';
import AppShell from "@/components/AppShell";
import App from "next/app";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getSessionUser();
  return (
    <html
      lang="en">
      <body className="min-h-screen bg-gray-100">
        <AppShell user={currentUser}>{children}</AppShell>
      </body>
    </html>
  );
}
