import React from "react";

export default function Card({ data }) {
    const minDegree = -60;
    const maxDegree = 60;

    const tempDegree = Math.min(Math.max(data.temperature, 0), 100) * (maxDegree - minDegree) / 100 + minDegree;
    const humidityDegree = Math.min(Math.max(data.humidity, 0), 100) * (maxDegree - minDegree) / 100 + minDegree;

  return (
    <div className="bg-white shadow-sm my-2 dark:bg-gray-900 p-6 rounded-xl max-w-xl mx-auto">

      <div className="flex justify-around gap-8">
        {/* Temperature Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-16">
            {/* ครึ่งวงกลม */}
            <svg viewBox="0 0 100 50" className="w-32 h-16">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e5e7eb" // gray-200
                strokeWidth="8"
              />
            </svg>
            {/* เข็ม */}
            <div
              className="absolute bottom-0 left-1/2 w-1.5 h-20 bg-red-500 origin-bottom rounded ease-in-out duration-500 transition-all"
              style={{ transform: `rotate(${tempDegree}deg)` }}
            />
          </div>
          <p className="mt-2 text-red-600 font-semibold text-xl">
            {data.temperature}°C
          </p>
          <p className="text-gray-600 dark:text-gray-400">อุณหภูมิ</p>
        </div>

        {/* Humidity Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-16">
            <svg viewBox="0 0 100 50" className="w-32 h-16">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
            </svg>
            <div
              className="absolute bottom-0 left-1/2 w-1.5 h-20 bg-blue-500 origin-bottom rounded ease-in-out duration-500 transition-all"
              style={{ transform: `rotate(${humidityDegree}deg)` }}
            />
          </div>
          <p className="mt-2 text-blue-600 font-semibold text-xl">
            {data.humidity}%
          </p>
          <p className="text-gray-600 dark:text-gray-400">ความชื้น</p>
        </div>
      </div>

      <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        เวลา : {data.receivedAt || "-"}
      </p>
    </div>
  );
}
