import { PrismaClient } from '@/generated/prisma/client'
// import mysql from 'mysql2/promise'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { env } from 'process';
import fs from "fs";
import path from "path";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

const adapter = new PrismaMariaDb({
    connectionLimit: 20000,
    database: env.DB_NAME,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    connectTimeout: 15000,
    ssl: true,
});

const prisma = new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;