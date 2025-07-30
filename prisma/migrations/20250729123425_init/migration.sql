-- CreateTable
CREATE TABLE "SensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_name" TEXT NOT NULL,
    "temperature" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
