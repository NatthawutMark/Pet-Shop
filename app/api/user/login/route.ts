import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";

// Login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body

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

            const res =
            {
                Username: checkUser.USERNAME,
                ...checkUser.CUSTOMER
            }
            // const currentUser = await cookies();
            // currentUser.set('user', JSON.stringify({
            //     username : res.Username,
            //     firstName: res.FIRST_NAME,
            //     lastName:res.LAST_NAME,
            //     address:res.ADDRESS,
            //     tel:res.TEL
            // }),{
            //     httpOnly:true,
            //     maxAge:  60 * 60 * 24 * 7,
            // });

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


    } catch (error) {
        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}