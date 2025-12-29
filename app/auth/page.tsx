'use client'

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, Field, Tabs, TabsList, TabsTrigger, TabsContent, Input, Button, Textarea, FormField, FormItem, FormLabel, FormControl, FormMessage, Checkbox } from '@/Meterials'
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, EyeOff, Eye, CircleUser } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";
import { User } from "@/Services/api";
//#region SchemaInput
const LoginSchema = z.object({
    username: z.string().min(1, "กรุณากรอก Username").optional(),
    password: z.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร").optional(),

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

function tabsLogin(formLogin: UseFormReturn<z.infer<typeof LoginSchema>>) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


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

        await User.login(values).then((res) => {
            Swal.close();
            if (res && res.status == true) {

                localStorage.setItem('currentUser', JSON.stringify(res.results));
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'เข้าสู่ระบบสำเร็จ',
                    showConfirmButton: true,
                    timer: 2000
                }).then((resPage) => {
                    router.push('/store/home');
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: res.results,
                    showConfirmButton: true,
                    timer: 2000
                })
            }
        })

        setIsLoading(false)
    }
    return (
        <FormProvider {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(SubmitLogin)}>
                <Card>
                    <CardHeader>
                        <CardTitle>เข้าสู่ระบบ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <FormField
                            control={formLogin.control}
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
                            control={formLogin.control}
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
                            onClick={formLogin.handleSubmit(SubmitLogin)}
                            variant="btnGreen"
                            className="w-full"
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

function tabsRegister(formRegister: UseFormReturn<z.infer<typeof RegisterSchema>>) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)

    async function submitRegister(value: z.infer<typeof RegisterSchema>) {
        const { firstName, lastName, address, tel, username, password, confirmPassword } = value;

        if (password != confirmPassword) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                icon: "error",
                text: 'รหัสไม่ตรง กรุณาตรวจสอบความถูกต้อง',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        Swal.fire({
            icon: 'question',
            title: 'ตรวจสอบความถูกต้อง',
            text: `กรุณากดตรจสอบความถูกต้องการกด "ยืนยัน"`,
            confirmButtonText: 'ยืนยัน',
            showCancelButton: true,
            reverseButtons: true
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    title: `กำลังโหลด...`,
                    text: `กำลังบันทึกข้อมูล...`,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                User.createUserCus(value).then((resApi) => {
                    Swal.close();
                    if (resApi && resApi.status == true) {
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: `บันทึกข้อมูลสำเร็จ`,
                            timer: 3000,
                            icon: 'success',
                            showConfirmButton: false
                        }).then((repage) => {
                            router.refresh();
                        });
                        formRegister.reset();
                        return;
                    }
                    else {
                        Swal.fire({
                            title: 'เกิดข้อผิดพลาด',
                            text: `${resApi.results}`,
                            timer: 3000,
                            icon: 'error',
                            showConfirmButton: false
                        })
                        return;
                    }
                });
            }

        });
    }

    return (
        <FormProvider {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(submitRegister)}>
                <Card>
                    <CardHeader>
                        <CardTitle>สมัครสมาชิก</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                                control={formRegister.control}
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
                            onClick={formRegister.handleSubmit(submitRegister)}
                        >สมัครสมาชิก</Button>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}

export function loginPage() {

    //#region Login Schema
    const formLogin = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    //#endregion

    //#region Register Schema
    const formRegister = useForm<z.infer<typeof RegisterSchema>>({
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
    //#endregion

    const handleTabChange = (value: string) => {
        console.log('value change', value);

        if (value == 'login') { formRegister.reset() }
        if (value == 'register') { formLogin.reset() }
    }

    return (
        <div className="flex w-full max-w-[35vw] flex-col gap-6 justify-center py-32">
            <Tabs defaultValue="login" onValueChange={handleTabChange}>
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    {tabsLogin(formLogin)}
                </TabsContent>

                <TabsContent value="register">
                    {tabsRegister(formRegister)}
                </TabsContent>
            </Tabs>
        </div >
    )
}

export default loginPage;
