// pages/api/logs.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const logs = await prisma.sensorData.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return Response.json(logs);
  } catch (err) {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
