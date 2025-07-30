"use client";
import Card from "@/components/cards/card";
import Chart from "@/components/charts/chart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({ temperature: 0, humidity: 0, room_name: ""});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.188:3001/api/ws");

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      newData.receivedAt = new Date().toLocaleString("th-TH"); // เพิ่มเวลาที่รับข้อมูล
      setData(newData);

      if(newData.log){
        getLogs();
      }
    };

    socket.onerror = (e) => console.error("[WebSocket error]", e);

    return () => socket.close();
  }, []);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    try {
      const rs = await axios.get("http://192.168.1.188:3000/api/logs");
      if (rs.status === 200) {
        const logsFormatted = rs.data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleTimeString("th-TH"),
        }));
        setLogs(logsFormatted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 select-none">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center fixed top-4 left-1/2 transform -translate-x-1/2 w-full">
        {data.room_name} Real-time
      </h1>

      <Card data={data} />

      <Chart logs={logs} />
    </main>
  );
}
