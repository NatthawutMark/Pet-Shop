'use client'
import * as react from 'react'
import { useState, useEffect } from 'react'
// import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Label, Card, CardContent, CardFooter, CardHeader, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/Meterials';
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { MastCategories, MastItem, MastPet, MastStatus } from '@/Services/api';
import Swal from 'sweetalert2';

const formItemSchema = z.object({
    itemCode: z.string().min(1, 'กรุณากรอกรหัสสินค้า'),
    itemName: z.string().min(1, 'กรุณาใส่ชื่อสินค้า'),
    petType: z.string().min(1, 'กรุณาเลือกประเภทสัตว์'),
    categories: z.string().min(1, 'กรุณาเลือกหมวดหมู่'),
    price: z.coerce.number().refine((val) => val >= 0, {
        message: "กรุณาใส่ราคา"
    }),
    description: z.string().nullable()
});

export default function mainPage() {
    const router = useRouter();
    const [title, setTitle] = useState('เพิ่มข้อมูล');
    const [id, setId] = useState(null);
    const [mastPetData, setMastPetData] = useState<[]>([])
    const [mastCategoriesData, setMastCategoriesData] = useState<[]>([])

    const param = useSearchParams()
    const paramId = param.get('id')

    useEffect(() => {
        if (paramId) {
            setTitle('แก้ไขข้อมูล');
        }

        MastPet.getAll().then((petRes) => {
            setMastPetData(petRes.results);
        });

        MastCategories.getAll().then((cateRes) => {
            setMastCategoriesData(cateRes.results)
        });
    }, [])

    const formItem = useForm<z.infer<typeof formItemSchema>>({
        resolver: zodResolver(formItemSchema) as any,
        defaultValues: {
            itemCode: '',
            itemName: '',
            petType: '',
            categories: '',
            price: 0,
            description: ''
        }
    });

    async function saveItem(values: z.infer<typeof formItemSchema>) {
        console.log('values : ', values);
        Swal.fire({
            icon: 'question',
            title: 'แจ้งเตือน',
            text: `กรุณากดตรจสอบความถูกต้องและการกด "ยืนยัน"`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            reverseButtons: true,
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: 'กำลังบันทึกข้อมูล',
                    text: 'กรุณารอสักครู่...',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.isLoading()
                    }
                });

                MastItem.insertItem(values).then(res => {
                    Swal.close();
                    if (res && res.status == true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ',
                            text: `บันทึกข้อมูลสำเร็จ`,
                            confirmButtonText: 'ตกลง',
                            timer: 2000
                        }).then((res) => {
                            router.back();
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: `${res.results}`,
                            confirmButtonText: 'ตกลง'
                        });
                    }
                }).catch(error => {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: `Error : ${error}`,

                    })
                })
            }
        })
    }

    return (
        <div className='flex flex-col px-5 py-5'>
            <div className='w-64 flex flex-col'>
                <Label className='text-4xl'>ข้อมูลสินค้า</Label>
            </div>
            <div className='flex flex-row py-5 justify-center max-w-svw'>
                <FormProvider {...formItem}>
                    <form className='w-1/2' onSubmit={formItem.handleSubmit(saveItem)}>
                        <Card >
                            <CardHeader className='text-3xl'>{title}</CardHeader>
                            <CardContent className="flex flex-col">
                                <div className='flex flex-row'>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='itemCode'
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>รหัสสินค้า</FormLabel>
                                                    <FormControl>
                                                        <Input type='text' placeholder='รหัสสินค้า' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='itemName'
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>ชื่อสินค้า</FormLabel>
                                                    <FormControl>
                                                        <Input type='text' placeholder='ชื่อสินค้า' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row py-2'>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='petType'
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>ประเภทสัตว์</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            value={field.value}  // ต้องมี
                                                            onValueChange={field.onChange}  // ต้องมี

                                                        >
                                                            <SelectTrigger className="min-w-full">
                                                                <SelectValue placeholder="ประเภทสัตว์" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    (mastPetData?.length > 0) ?
                                                                        mastPetData.map((res: any) => (
                                                                            <SelectItem key={res?.id} value={String(res?.id)}>{res?.name}</SelectItem>
                                                                        )) : null
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='categories'
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>หมวดหมู่</FormLabel>
                                                    <FormControl className='w-full'>
                                                        <Select
                                                            value={field.value}  // ต้องมี
                                                            onValueChange={field.onChange}  // ต้องมี
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="หมวดหมู่" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    (mastCategoriesData?.length > 0) ?
                                                                        mastCategoriesData.map((res: any) => (
                                                                            <SelectItem key={res?.id} value={String(res?.id)}>{res?.name}</SelectItem>
                                                                        )) : null
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row py-2'>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='price'
                                            render={({ field }) => (
                                                <FormItem className='w-1/2'>
                                                    <FormLabel>ราคาสินค้า</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='กรุณาใส่ราคา' type='number' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row py-2'>
                                    <div className='flex flex-1 px-2'>
                                        <FormField
                                            control={formItem.control}
                                            name='description'
                                            render={({ field }) => (
                                                <FormItem className='w-full'>
                                                    <FormLabel>รายละเอียดสินค้า</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder='รายละเอียดสินค้า'
                                                            cols={5}
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className='justify-end'>
                                <Button type='submit' variant='btnGreen'>
                                    บันทึก
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </FormProvider>
            </div>
        </div >
    )
}

