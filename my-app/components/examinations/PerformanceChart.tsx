"use client";

import type { PerformanceChartItem } from "@/lib/types/ExaminationDashboard";
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

type PerformanceChartProps = {
  examination: string;
  performanceChart: PerformanceChartItem[];
};

export default function PerformanceChart({
  examination,
  performanceChart,
}: PerformanceChartProps) {
  return (
    <div className="bg-(--card) border border-[var(--border)] rounded-2xl p-5 h-90">
      <div className="mb-4">
        <div>
          <h2 className="text-xl font-bold">{examination} Performance</h2>

          <p className="text-sm text-slate-400">
            {examination} performance trend
          </p>
        </div>
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
            dataKey="performance"
            name={examination}
            stroke="#06b6d4"
            animationDuration={1200}
            strokeWidth={3}
            activeDot={{ r: 7 }}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#06b6d4",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
