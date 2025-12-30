import "@/app/globals.css";
import * as React from "react";
import { Layout } from "lucide-react";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar, SidebarProvider, SidebarTrigger, AppSidebar } from '@/Meterials'


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider className="bg-pink-100">
                    <AppSidebar />
                    <SidebarTrigger/>
                    <main className="w-screen">
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    )
}