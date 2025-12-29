'use server'
import { cookies } from "next/headers"

export interface User {
    // กำหนดโครงสร้างข้อมูล User ของคุณ
    username: string;
    firstname: string;
    lastName:string;
    address:string;
    tel:string;
}


export async function getCurrentUser():Promise<User | null> {
    const cookieStore = await cookies();
    const curUser = cookieStore.get("user")?.value;

    if (!curUser) return null;
    return JSON.parse(curUser);
}