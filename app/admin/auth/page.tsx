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
    password: z.string().min(5, "รหัสผ่านต้องมีความยาวอย่างน้อย 5 ตัวอักษร").optional(),
    isAdmin: z.int32()
});
const RegisterSchema = z.object({
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    address: z.string().min(1, 'กรุณากรอกที่อยู่'),
    tel: z.string().min(1, 'กรุณากรอกเบอร์โทร'),
    username: z.string().min(1, "กรุณากรอก Username"),
    password: z.string().min(5, "รหัสผ่านต้องมีความยาวอย่างน้อย 5 ตัวอักษร"),
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

        await User.loginUser(values).then((res) => {
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
                    router.push('/admin');
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

export function loginPage() {

    //#region Login Schema
    const formLogin = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
            isAdmin: 1
        },
    })
    //#endregion

    return (
        <div className="flex w-full max-w-[35vw] flex-col gap-6 justify-center py-48">
            {tabsLogin(formLogin)}
        </div >
    )
}

export default loginPage;
