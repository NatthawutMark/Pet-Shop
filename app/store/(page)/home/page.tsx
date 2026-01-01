'use client';
import { SidebarProvider, Sidebars } from "@/components/layout/SidebarCustom";
import { Divide, Menu } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from "@/Meterials";
// ในคอมโพเนนต์อื่น
import { useSidebar } from '@/components/layout/SidebarCustom'; // ต้อง export ด้วย
import { count } from "console";
import { MastStatus } from '@/Services'



function Home() {
    const [data, setData] = useState(null);
    const [idMaster, setIdMaster] = useState('');


    useEffect(() => {
        // โค้ดส่วนนี้จะรันบน Browser เท่านั้น
        const curUser = localStorage.getItem('currentUser');
        console.log('curUser Home:', JSON.parse(curUser));
    }, []);

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
        <div className="flex flex-col p-5 w-screen">

            {/* HERO (ไม่นับ header) */}
            <section className="w-screen -mx-5 bg-[#fff2fc] h-[420px] md:h-[520px] flex items-center">
                <div className="mx-auto max-w-7xl w-full px-8">
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        {/* ซ้าย: ข้อความ */}
                        <div className="space-y-5">
                            <h1 className="font-[var(--font-display)] text-grey font-extrabold leading-tight text-4xl md:text-6xl">
                                อาหารเม็ดสุนัขโตและลูกสุนัข
                            </h1>


                            <p className="text-black/90 text-base md:text-lg max-w-xl">
                                ยังไม่รู้จะใส่อะไรคิดไม่ออก
                            </p>
                        </div>

                        {/* ขวา: รูปใหญ่ */}
                        <div className="relative w-full h-[220px] md:h-[360px]">
                            <Image
                                src="/Picture/Pellet food/DogBan.png" // <- เปลี่ยนเป็นรูปของคุณ
                                alt="Hero"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* เว้นระยะก่อนสินค้าสักนิด */}
            <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {/* Card เดิมของคุณ */}
            </div>

            {/*-------------------------------------------------------------------------------------------------------------*/}

            {/* ✅ ตรงนี้ทำเป็น grid แล้วใส่ Card หลายใบเอง */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">

                {/* -------- Card ใบที่ 1 --------- */}
                <Card className="w-[260px] overflow-hidden rounded-2xl flex flex-col">
                    <CardHeader className="p-0">
                        <div className="relative w-full aspect-[4/3]">
                            <Image src="/Picture/Pellet food/PetDigree00.jpg" alt="" fill className="object-cover" />

                        </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-2 flex-1">


                        <CardTitle className="text-base font-bold leading-tight">
                            เพดดิกรี® โปร อาหารเม็ดสุนัข High Protein สำหรับหมาพันธุ์ทอยและพันธุ์เล็ก 8 กก.
                        </CardTitle>
                        {/*
                        <CardDescription>รายละเอียดใบที่ 1</CardDescription>
                        <p className="text-sm leading-relaxed">
                            สูตรไฮโปรตีน สำหรับสุนัขโตพันธุ์ทอยและเล็ก มีโปรตีนสูง 28% และมีกรดอะมิโนจำเป็น ช่วยเสริมความแข็งแรงและให้พลังงานแก่พวกเค้า
                        </p>
                        */}
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-between pt-0">
                        <p className="text-lg font-bold">ราคา: 850</p>
                        <Button className="rounded-xl px-4">Add</Button>
                    </CardFooter>
                </Card>

                {/* -------- Card ใบที่ 2 -------- */}
                <Card className="w-[260px] overflow-hidden rounded-2xl flex flex-col">
                    <CardHeader className="p-0">
                        <div className="relative w-full aspect-[4/3]">
                            <Image src="/Picture/Pellet food/PetDigree02.jpg" alt="" fill className="object-cover" />
                        </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-2 flex-1">
                        <CardTitle className="text-base font-bold leading-tight">
                            เพดดิกรี® โปร อาหารเม็ดสุนัข High Protein สำหรับลูกสุนัขทุกสายพันธุ์ 1.3 กก.
                        </CardTitle>
                        {/*
                        <CardDescription>รายละเอียด</CardDescription>
                        <p className="text-sm leading-relaxed">
                            สำหรับสุนัขโต พันธุ์ปั๊ก อายุ 10 เดือนขึ้นไป ...
                        </p>
                        */}
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-between pt-0">
                        <p className="text-lg font-bold">ราคา: 850</p>
                        <Button className="rounded-xl px-4">Add</Button>
                    </CardFooter>
                </Card>


                {/* -------- Card ใบที่ 3  -------- */}
                <Card className="w-[260px] overflow-hidden rounded-2xl flex flex-col">
                    <CardHeader className="p-0">
                        <div className="relative w-full aspect-[4/3]">
                            <Image src="/Picture/Pellet food/PetDigree03.jpg" alt="" fill className="object-cover" />

                        </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-2 flex-1">
                        <CardTitle className="text-base font-bold leading-tight">
                            เพดดิกรี® โปร อาหารเม็ดสุนัข High Protein สำหรับสุนัขโตพันธุ์กลางและใหญ่ 3 กก.
                        </CardTitle>
                        {/*
                        <CardDescription>รายละเอียดใบที่ 2</CardDescription>
                        <p className="text-sm leading-relaxed">
                            คำอธิบายใบที่ 3...
                        </p>
                        */}
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-between pt-0">
                        <p className="text-lg font-bold">ราคา: 850</p>
                        <Button className="rounded-xl px-4">Add</Button>
                    </CardFooter>
                </Card>


                {/* -------- Card ใบที่ 4  -------- */}
                <Card className="w-[260px] overflow-hidden rounded-2xl flex flex-col">
                    <CardHeader className="p-0">
                        <div className="relative w-full aspect-[4/3]">
                            <Image src="/Picture/Pellet food/PetDigree04.jpg" alt="" fill className="object-cover" />

                        </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-2 flex-1">
                        <CardTitle className="text-base font-bold leading-tight">
                            เพดดิกรี® อาหารเม็ด สุนัขโต 1+ ปี ชนิดเม็ด รสตับและผัก 3 กก.
                        </CardTitle>
                        {/*
                        <CardDescription>รายละเอียดใบที่ 2</CardDescription>
                        <p className="text-sm leading-relaxed">
                            สำหรับเพดดิกรี ทุกอย่างที่เราทำเราทำด้วยความรักที่มีต่อน้องหมา เราพัฒนาสูตรอาหารสุนัขเพดดิกรี® ร่วมกับผู้เชี่ยวชาญจากสถาบันวอลแธม
                        </p>
                        */}
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-between pt-0">
                        <p className="text-lg font-bold">ราคา: 850</p>
                        <Button className="rounded-xl px-4">Add</Button>
                    </CardFooter>
                </Card>


                {/* -------- Card ใบที่ 5  -------- */}
                <Card className="w-[260px] overflow-hidden rounded-2xl flex flex-col">
                    <CardHeader className="p-0">
                        <div className="relative w-full aspect-[4/3]">
                            <Image src="/Picture/Pellet food/PetDigree05.jpg" alt="" fill className="object-cover" />

                        </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-2 flex-1">
                        <CardTitle className="text-base font-bold leading-tight">
                            พดดิกรี® อาหารเม็ดสุนัข สูตรหมาพันธุ์ทอยและพันธุ์เล็ก รสเนื้อวัว แกะ และผัก8 กก./1.3 กก.
                        </CardTitle>
                        {/*
                        <CardDescription>รายละเอียดใบที่ 2</CardDescription>
                        <p className="text-sm leading-relaxed">
                            สำหรับเพดดิกรี ทุกอย่างที่เราทำเราทำด้วยความรักที่มีต่อน้องหมา เราพัฒนาสูตรอาหารสุนัขเพดดิกรี® ร่วมกับผู้เชี่ยวชาญจากสถาบันวอลแธม
                        </p>
                        */}
                    </CardContent>

                    <CardFooter className="mt-auto flex items-center justify-between pt-0">
                        <p className="text-lg font-bold">ราคา: 850</p>
                        <Button className="rounded-xl px-4">Add</Button>
                    </CardFooter>
                </Card>


            </div>
        </div>
    );
}

export default Home;