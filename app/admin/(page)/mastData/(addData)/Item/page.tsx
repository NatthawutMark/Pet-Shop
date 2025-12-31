'use client'
import * as react from 'react'
import { useState, useEffect } from 'react'
import { Label } from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from 'next/navigation';
import { Button, Card, CardContent, CardFooter, CardHeader, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/Meterials';
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const formItemSchema = z.object({
    itemCode: z.string().min(1, 'กรุณากรอกรหัสสินค้า'),
    itemName: z.string().min(1, 'กรุณาใส่ชื่อสินค้า')
});

export default function mainPage() {
    const [title, setTitle] = useState('เพิ่มข้อมูล')
    const [id, setId] = useState(null)
    const param = useSearchParams()
    const paramId = param.get('id')

    useEffect(() => {
        if (paramId) {
            setTitle('แก้ไขข้อมูล');
        }
    }, [paramId])

    const formItem = useForm<z.infer<typeof formItemSchema>>({
        resolver: zodResolver(formItemSchema),
        defaultValues: {
            itemCode: '',
            itemName: '',
        }
    });

    async function saveItem(values: z.infer<typeof formItemSchema>) {

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
                                                        <Input type='text' placeholder='รหัสสินค้า' />
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
                                                        <Input type='text' placeholder='ชื่อสินค้า' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className='justify-end'>
                                <Button type='submit'>
                                    click me
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
