'use client'

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, Field, Tabs, TabsList, TabsTrigger, TabsContent, CardDescription, Label, Input, Button, Textarea, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Checkbox } from '@/Meterials'
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, EyeOff, Eye, CircleUser } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

//#region SchemaInput
const LoginSchema = z.object({
    username: z.string().min(1, "กรุณากรอก Username").optional(),
    password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),

});

const RegisterSchema = z.object({
    // email: z.string().min(1, "กรุณากรอกอีเมล").email("รูปแบบอีเมลไม่ถูกต้อง"),
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    address: z.string().min(1, 'กรุณากรอกที่อยู่'),
    tel: z.string().min(1, 'กรุณากรอกเบอร์โทร'),
    username: z.string().min(1, "กรุณากรอก Username").optional(),
    password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"),
    confirmPassword: z.string().min(1, "กรุณากรอก Confirm Password"),

});
//#endregion

function tabsLogin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //#region Use Schema เท่าที่จำเป็น
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    //#endregion

    async function SubmitLogin(values: z.infer<typeof LoginSchema>) {
        setIsLoading(true)
        
        Swal.fire({
            title: 'กำลังโหลด...',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        await new Promise(resolve => setTimeout(resolve, 1500))

        Swal.close();

        await Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ!',
            text: `ยินดีต้อนรับ, ${values.username}`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            router.push('/store/home'); // เปลี่ยนเส้นทางไปยังแดชบอร์ดหลังจากปิดการแจ้งเตือน
        })
        
        setIsLoading(false)
    }
    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(SubmitLogin)}>
                <Card>
                    <CardHeader>
                        <CardTitle>เข้าสู่ระบบ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <CircleUser className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input
                                                placeholder="Username"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        {/* <Button type="submit" variant="btnGreen" >สมัครสมาชิก</Button> */}
                        <Button
                            type="submit"
                            onClick={form.handleSubmit(SubmitLogin)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            disabled={isLoading}
                        >
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider >
    )
}


function tabsRegister() {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            address: "",
            tel: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
    })

    async function submitRegister(value: z.infer<typeof RegisterSchema>) {
        const { firstName, lastName, address, tel, username, password, confirmPassword } = value;

        if (password != confirmPassword)
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: "error",
                text: 'รหัสไม่ตรง กรุณาตรวจสอบความถูกต้อง',
                confirmButtonText: 'ตกลง'
            });
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submitRegister)}>
                <Card>
                    <CardHeader>
                        <CardTitle>สมัครสมาชิก</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ชื่อ</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="กรุณาใส่ชื่อ"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>นามสกุล</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="กรุณากรอกนามสกุล"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ที่อยู่ <span className="text-muted-foreground">(ถ้าไม่มีใส่ '-')</span></FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Textarea
                                                    placeholder="กรุณากรอกที่อยู่"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="tel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>เบอร์โทร <span className="text-muted-foreground">(ถ้าไม่มีใส่ '-')</span></FormLabel>
                                        <FormControl>

                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="กรุณากรอกเบอร์โทร"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>

                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="กรุณากรอก Username"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>

                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="กรุณากรอก Password"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="กรุณากรอก Confirm Password"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant="btnGreen"
                            type="submit"
                            onClick={form.handleSubmit(submitRegister)}
                        >สมัครสมาชิก</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}

export function loginPage() {
    return (
        <div className="flex w-full max-w-[35vw] flex-col gap-6 justify-center py-32">
            <Tabs defaultValue="login">
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    {tabsLogin()}
                </TabsContent>

                <TabsContent value="register">
                    {tabsRegister()}
                </TabsContent>
            </Tabs>
        </div>
    )
}


export default loginPage;
