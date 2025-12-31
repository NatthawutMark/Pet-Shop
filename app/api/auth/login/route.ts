import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

// Login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, isAdmin } = body
        var res: any = null;

        if (isAdmin == 1) {
            const checkUser = await prisma.uSER_AUTHEN.findFirst({
                where: {
                    USERNAME: username,
                    PASSWORD: password
                },
                select: {
                    USERNAME: true,
                    EMPLOYEE: {
                        select: {
                            FIRST_NAME: true,
                            LAST_NAME: true,
                            ADDRESS: true,
                            TEL: true
                        },
                    }
                },
            });

            if (checkUser && checkUser != null) {

                res =
                {
                    Username: checkUser.USERNAME,
                    ...checkUser.EMPLOYEE[0]
                }

                return response({
                    results: res,
                    status: true
                }, HttpStatusCode.Ok)
            }
            else {
                return response({
                    results: `Username หรือ Password ไม่ถูกต้อง`,
                    status: false
                }, HttpStatusCode.Ok)
            }

        } else {
            const checkUser = await prisma.uSER_AUTHEN.findFirst({
                where: {
                    USERNAME: username,
                    PASSWORD: password
                },
                select: {
                    USERNAME: true,
                    CUSTOMER: {
                        select: {
                            FIRST_NAME: true,
                            LAST_NAME: true,
                            ADDRESS: true,
                            TEL: true
                        },
                    }
                },
            });

            if (checkUser && checkUser != null) {

                res =
                {
                    Username: checkUser.USERNAME,
                    ...checkUser.CUSTOMER[0]
                }

                return response({
                    results: res,
                    status: true
                }, HttpStatusCode.Ok)
            }
            else {
                return response({
                    results: `Username หรือ Password ไม่ถูกต้อง`,
                    status: false
                }, HttpStatusCode.Ok)
            }
        }
    } catch (error) {
        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}