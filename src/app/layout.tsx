"use client";

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";

// Force dynamic rendering for the root layout
export const dynamic = 'force-dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <Script src="/print.js" strategy="beforeInteractive" />
            </body>
        </html>
    );
}
