import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";

export async function GET(request: NextRequest) {
    try {

        const allData = await prisma.mAST_PET.findMany({
            select: {
                ID: true,
                NAME: true,
                IS_ACTIVE:true
            }
        });

        const res = allData.map((res) => {
            return {
                id: res.ID,
                name: res.NAME,
                isActive:res.IS_ACTIVE
            }
        })

        // return Response.success(allStatus, 'Fetched users successfully')
        return response({
            results: res,
            status: true
        }, HttpStatusCode.Ok)

    } catch (error) {
        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();

        const _trans = await prisma.$transaction(async (px) => {

            const saveData = await px.mAST_PET.createMany({
                data: req.items
                    .filter(p => p.value && typeof p.value === 'string')
                    .map((p) => ({
                        NAME: p.value
                    })),
                skipDuplicates: true,
            });

            return { status: true }
        }).then((res) => {
            if (res.status == true) {
                return {
                    results: 'บันทึกสำเร็จ',
                    status: true
                }
            } else {
                return {
                    results: 'บันทึกไม่สำเร็จ',
                    status: false
                }
            }
        }).catch((error) => {
            return {
                results: error,
                status: false
            }
        })

        // return Response.success(allStatus, 'Fetched users successfully')
        return response({
            results: _trans.results,
            status: _trans.status
        }, HttpStatusCode.Ok)

    } catch (error) {
        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}
