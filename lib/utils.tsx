import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Helper สำหรับ success response
export function response(data: any, status: number = 200) {
    return NextResponse.json(data, { status })
}