"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";

const data = [
  { month: "Jan", candidates: 1200 },
  { month: "Feb", candidates: 1800 },
  { month: "Mar", candidates: 2300 },
  { month: "Apr", candidates: 2600 },
  { month: "May", candidates: 3100 },
  { month: "Jun", candidates: 4200 },
];

export default function RegistrationChart() {
  return (
    <Card hover className="mt-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Candidate Registration Trend</h2>

        <p className="text-sm opacity-60">First half of the year</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.15}
            />

            <XAxis dataKey="month" axisLine={false} tickLine={false} />

            <YAxis axisLine={false} tickLine={false} />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="candidates"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{
                fill: "#06b6d4",
                strokeWidth: 3,
                r: 5,
              }}
              activeDot={{
                r: 8,
                fill: "#22d3ee",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
