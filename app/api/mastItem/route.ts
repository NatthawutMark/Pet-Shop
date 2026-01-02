import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";

export async function GET(request: NextRequest) {
    try {

        const _trans = await prisma.$transaction(async (px) => {
            const allData = px.mAST_ITEM.findMany({
                // where: condiWhere,
                select: {
                    ID: true,
                    ITEM_CODE: true,
                    ITEM_NAME: true,
                    IS_ACTIVE: true,
                    MAST_CATEGORIES: {
                        select: {
                            NAME: true
                        }
                    },
                    MAST_PET: {
                        select: {
                            NAME: true
                        }
                    },
                    ITEM_PRICE: true,
                    _count: true
                },

            })
            const data = (await allData).map((res) => {
                return {
                    id: res.ID ?? '',
                    itemCode: res.ITEM_CODE ?? '',
                    itemName: res.ITEM_NAME ?? '',
                    isActive: res.IS_ACTIVE ?? '',
                    price: res?.ITEM_PRICE,
                    cateName: res.MAST_CATEGORIES?.NAME ?? '',
                    petName: res.MAST_PET?.NAME ?? ''
                }
            })

            return { data }
        }).then(async (res) => {
            if (res) {
                return {
                    results: res.data,
                    total: res.data.length,
                    status: true
                }
            }
            else {
                return {
                    results: [],
                    total: 0,
                    status: false
                }
            }
        }).catch((error) => {
            return {
                results: `Error Fetch Item: ${error}`,
                total: 0,
                status: false
            }
        })

        // return Response.success(allStatus, 'Fetched users successfully')
        return response({
            results: _trans.results,
            total: _trans.total,
            status: _trans.status
        }, HttpStatusCode.Ok)

    } catch (error) {
        console.error('Error fetching Item:', error)
        return response(`Failed to fetch Item: ${error}`, HttpStatusCode.InternalServerError)
    }
}

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
