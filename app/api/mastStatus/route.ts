import { NextRequest, NextResponse } from 'next/server'
import { errorResponse, successResponse } from '@/lib/utils'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const allStatus = await prisma.mAST_STATUS.findMany({});

        return successResponse({
            data: allStatus,
        }, 200);

    } catch (error) {
        console.error('Error fetching users:', error)
        return errorResponse('Failed to fetch users Fuck')
    }
}
