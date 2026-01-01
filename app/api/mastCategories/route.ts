import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { response } from "@/lib/utils";
import { HttpStatusCode } from "axios";

export async function GET(request: NextRequest) {
    try {

        const allData = await prisma.mAST_CATEGORIES.findMany({
            select: {
                ID: true,
                NAME: true,
                IS_ACTIVE: true
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
