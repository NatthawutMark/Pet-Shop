import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";
import { CUSTOMER } from "@/generated/prisma/client";

// Register
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, address, tel, username, password } = body

        const findUsername = await prisma.uSER_AUTHEN.findFirst({
            where: {
                USERNAME: username,
            }
        });

        if (findUsername && findUsername != null) {
            return response({
                results: `มี Username: "${username}" ในระบบ. กรุณาใช้ Username อื่น`,
                message: `Username Duplicate`,
                status: false
            }, HttpStatusCode.Ok)
        }


        const createData = await prisma.$transaction(async (prisma) => {
            const createUserAuthen = await prisma.uSER_AUTHEN.create({
                data: {
                    USERNAME: username,
                    PASSWORD: password,
                    CREATE_AT: new Date(),
                    CREATE_BY: firstName,
                    UPDATE_AT: new Date(),
                    UPDATE_BY: firstName
                },
            });

            const createCustomer = await prisma.cUSTOMER.create({
                data: {
                    FIRST_NAME: firstName,
                    LAST_NAME: lastName,
                    ADDRESS: address,
                    TEL: tel,
                    USER_ID: createUserAuthen.ID,
                }
            })

            return { createCustomer, createUserAuthen }
        });

        // if (createData.status == true) {
            return response({
                results: { ...createData },
                message: 'บันทึกข้อมูลสำเร็จ',
                status: true
            }, HttpStatusCode.Ok)
        // }
        // else {
        //     return response({
        //         results: null,
        //         message: 'เกิดข้อผิดพลาดบันทึกข้อมูล',
        //         status: false
        //     }, HttpStatusCode.InternalServerError)
        // }

        // return Response.success(allStatus, 'Fetched users successfully')

    } catch (error) {

        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}