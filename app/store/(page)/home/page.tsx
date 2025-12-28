'use client';
import { SidebarProvider, Sidebars } from "@/components/layout/SidebarCustom";
import { Divide, Menu } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Input } from "@/Meterials";
// ในคอมโพเนนต์อื่น
import { useSidebar } from '@/components/layout/SidebarCustom'; // ต้อง export ด้วย
import { count } from "console";
import { MastStatus } from '@/Services'


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
    const [data, setData] = useState(null);
    const [idMaster, setIdMaster] = useState('');

    function getMasterOnClick() {
        if (!idMaster) return '';

        MastStatus.getMastStatusById(idMaster).then((res) => {
            if (res && res.status === true) {
                console.log('Mast Status:', res.results);
                setData(res.results);
            }
        })
    }

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
                        <Input value={idMaster} onChange={(e) => setIdMaster(e.target.value)} placeholder="Please input ID"></Input>
                        <Button onClick={getMasterOnClick} >Click Count</Button>
                        <p>{data?.NAME || ''}</p>
                    </main>
                </ div>
            </div >
        </>

    );
}

export default Home;