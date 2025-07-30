const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const next = require("next");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocketServer({ server, path: "/api/ws" });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);

        // Broadcast ข้อมูล realtime ไปยัง client ทั้งหมด
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(data));
          }
        });

        // ถ้ามี flag log ให้บันทึกลง DB
        if (data.log === true) {
          await prisma.sensorData.create({
            data: {
              room_name: data.room_name,
              temperature: data.temperature,
              humidity: data.humidity,
            },
          });
          console.log("Data logged to DB");
        }
      } catch (error) {
        console.error("Invalid message", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(3001, () => {
    console.log("Server ready on http://localhost:3001");
  });
});
