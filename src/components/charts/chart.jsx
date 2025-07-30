"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ logs }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <section className="w-full mx-auto mb-2 sm:mb-10 bg-white dark:bg-gray-800 py-3 pr-3 sm:p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          ค่าอุณหภูมิในห้อง (°C)
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={logs}>
            <XAxis
              dataKey="createdAt"
              stroke="#374151"
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#374151"
              tick={{ fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: 8,
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              name="อุณหภูมิ"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="w-full mx-auto bg-white dark:bg-gray-800 py-3 pr-3 sm:p-6 mb-10 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          ค่าความชื่นในห้อง (%)
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={logs}>
            <XAxis
              dataKey="createdAt"
              stroke="#374151"
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#374151"
              tick={{ fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: 8,
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              name="ความชื่น"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
