'use client';
import { SidebarProvider, Sidebars } from "@/components/layout/SidebarCustom";
import { Divide, Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

// ในคอมโพเนนต์อื่น
import { useSidebar } from '@/components/layout/SidebarCustom'; // ต้อง export ด้วย

const MenuButton = () => {
    const { toggle, isOpen } = useSidebar();

    return (
        <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
            <Menu className="w-6 h-6" />
        </button>
    );
};


function Home() {
    return (

        <>
            <div className="flex flex-col flex-full w-screen">
                <div className="flex items-center gap-4 mb-4">
                    <MenuButton />
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">ทำค้นหา :</span> แมว
                    </p>
                </div>
                < div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black" >
                    <main className="flex min-h-screen w-full min-w-3xl max-w-dvw flex-col items-center py-4 px-4 bg-white dark:bg-black sm:items-start">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                            เข้าใจแล้วววววววว
                        </h1>
                    </main>
                </ div>
            </div >
        </>

    );
}

export default Home;