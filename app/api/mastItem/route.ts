import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";

// export async function GET(request: NextRequest) {
//     try {

//         const allData = await prisma.mAST_ITEM.findMany({
//             select: {
//                 ID: true,
//                 ITEM_NAME: true,
//                 IS_ACTIVE: true
//             }
//         });

//         const res = allData.map((res) => {
//             return {
//                 id: res.ID,
//                 name: res.ITEM_NAME,
//                 isActive: res.IS_ACTIVE
//             }
//         })

//         // return Response.success(allStatus, 'Fetched users successfully')
//         return response({
//             results: res,
//             status: true
//         }, HttpStatusCode.Ok)

//     } catch (error) {
//         console.error('Error fetching users:', error)
//         return response('Failed to fetch users')
//     }
// }

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { itemCode, itemName, petType, categories, price, description } = body

        const checkData = await prisma.mAST_ITEM.findFirst({
            where: {
                ITEM_CODE: itemCode
            }
        });

        if (checkData != null) {
            return response({
                results: 'รหัสสินค้ามีอยู่แล้ว กรุณาลองใหม่',
                status: false
            }, HttpStatusCode.Ok)
        }

        const allData = await prisma.mAST_ITEM.create({
            data: {
                ITEM_CODE: itemCode,
                ITEM_NAME: itemName,
                ITEM_CATE_ID: parseInt(categories),
                ITEM_PET_ID: parseInt(petType),
                ITEM_PRICE: parseFloat(price),
                DESCRIPTION: description
            }
        }).then((res) => {
            return { status: true }
        }).catch((error) => {
            return { status: false }
        });

        if (allData.status == true) {
            return response({
                results: 'บันทึกข้อมูลสำเร็จ',
                status: true
            }, HttpStatusCode.Ok)
        } else {
            return response({
                results: 'บันทึกข้อมูลไม่สำเร็จ',
                status: false
            }, HttpStatusCode.Ok)
        }

    } catch (error) {
        console.error('Error fetching users:', error)
        return response({ results: `Failed to fetch users:${error}` })
    }
}
