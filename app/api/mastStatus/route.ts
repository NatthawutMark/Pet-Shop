import { NextRequest, NextResponse } from 'next/server'
import { response } from '@/lib/utils'

import prisma from '@/lib/prisma'
import { HttpStatusCode } from 'axios';

export async function GET(request: NextRequest) {
    try {
        const searchPrams = new URL(request.url).searchParams;
        const id = searchPrams.get('id')?.toString();

        const allStatus = await prisma.mAST_STATUS.findUnique({
            where: {
                ID: parseInt(id!) || undefined
            }
        });

        // return Response.success(allStatus, 'Fetched users successfully')
        return response({
            results: allStatus,
            status: true
        }, HttpStatusCode.Ok)

    } catch (error) {
        console.error('Error fetching users:', error)
        return response('Failed to fetch users')
    }
}
