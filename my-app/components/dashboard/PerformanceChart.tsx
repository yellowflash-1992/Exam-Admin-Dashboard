"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardData } from "../data/dashboard";

// const data = [
//   { month: "Jan", waec: 65, jamb: 58 },
//   { month: "Feb", waec: 72, jamb: 64 },
//   { month: "Mar", waec: 78, jamb: 70 },
//   { month: "Apr", waec: 75, jamb: 73 },
//   { month: "May", waec: 82, jamb: 76 },
//   { month: "Jun", waec: 88, jamb: 81 },
// ];

type PerformanceChartProps = {
  performanceChart: typeof dashboardData.performanceChart;
};

export default function PerformanceChart({
  performanceChart,
}: PerformanceChartProps) {
  return (
    <div className="bg-(--card) border border-[var(--border)] rounded-2xl p-5 h-90">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Exam Performance</h2>
        <p className="text-xs opacity-70">WAEC vs JAMB performance trend</p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={performanceChart}
          margin={{
            top: 10,
            right: 20,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#cbd5e1",
            }}
          />

          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="waec"
            stroke="#06b6d4"
            animationDuration={1200}
            strokeWidth={3}
            activeDot={{
              r: 7,
            }}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#06b6d4",
            }}
          />

          <Line
            type="monotone"
            dataKey="jamb"
            stroke="#3b82f6"
            animationDuration={1200}
            strokeWidth={3}
            activeDot={{
              r: 7,
            }}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#3b82f6",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
