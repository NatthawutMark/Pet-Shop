'use client'
import * as react from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { Button, Label, Card, CardContent, CardFooter, CardHeader, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/Meterials';
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { MastCategories, MastItem, MastPet, MastStatus } from '@/Services/api';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'

type FormValues = {
    items: {
        value: string;
    }[];
};


export default function mainPage() {
    const router = useRouter();
    const [title, setTitle] = useState('เพิ่มข้อมูล');
    const [id, setId] = useState(null);

    const param = useSearchParams()
    const paramId = param.get('id')

    useEffect(() => {
        if (paramId) {
            setTitle('แก้ไขข้อมูล');
        }
    }, [])

    const { register, control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            items: [{ value: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items'
    });

    async function saveData(values: FormValues) {
        console.log('ข้อมูลที่ส่ง:', values);
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
                MastPet.insertData(values).then((res) => {
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
                <Label className='text-4xl'>ประเภทสัตว์</Label>
            </div>
            <div className='flex flex-row py-5 justify-center max-w-svw'>
                {/* <FormProvider {...formItem}> */}
                <form className='w-1/2' onSubmit={handleSubmit(saveData)}>
                    <Card >
                        <CardHeader className='text-3xl'>{title}</CardHeader>
                        <CardContent className="flex flex-col">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 py-1 items-center">
                                    <input
                                        {...register(`items.${index}.value` as const)}
                                        type="text"
                                        placeholder="ใส่ข้อมูล"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />

                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <DeleteIcon />
                                        </button>
                                    )}

                                    {index === fields.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => append({ value: '' })}
                                            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors text-xl"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className='justify-end'>
                            <Button type='submit' variant='btnGreen'>
                                บันทึก
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
                {/*</FormProvider> */}

                {/* <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                >
                    บันทึก
                </button> */}
            </div>
        </div >
    )
}

