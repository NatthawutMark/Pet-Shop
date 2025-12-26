import { PrismaClient } from '@/generated/prisma/client'
// import mysql from 'mysql2/promise'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { env } from 'process';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}

const adapter = new PrismaMariaDb({
  connectionLimit: 5,
  database: env.DB_NAME,
  host: env.DB_HOST,
  password: env.DB_PASSWORD,
  user: env.DB_USER,
});

const prisma = new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;