"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", waec: 65, jamb: 58 },
  { month: "Feb", waec: 72, jamb: 64 },
  { month: "Mar", waec: 78, jamb: 70 },
  { month: "Apr", waec: 75, jamb: 73 },
  { month: "May", waec: 82, jamb: 76 },
  { month: "Jun", waec: 88, jamb: 81 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 h-[360px]">
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Exam Performance</h2>
        <p className="text-xs opacity-70">
          WAEC vs JAMB performance trend
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="waec"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="jamb"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}