import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from 'next/server'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper สำหรับ error response
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status })
}

// Helper สำหรับ success response
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}