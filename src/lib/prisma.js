import { PrismaClient } from '@prisma/client';

let prisma;

if (typeof window === 'undefined') {
  // ในฝั่ง server ให้ใช้ singleton เพื่อป้องกันสร้างหลาย client ใน dev
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // Prisma ไม่สามารถใช้ในฝั่ง client ได้
  throw new Error('Prisma should not be used in the browser');
}

export { prisma };
