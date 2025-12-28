import "@/app/globals.css";
import * as React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
            <body className='bg-red-300 flex flex-col'>
                <div className="min-h-screen ">
                    <div className="flex justify-center ">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
