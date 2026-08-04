"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Brush,
} from "recharts";
import Card from "../ui/Card";

const data = [
  { month: "Jan", candidates: 1200 },
  { month: "Feb", candidates: 1800 },
  { month: "Mar", candidates: 2300 },
  { month: "Apr", candidates: 2600 },
  { month: "May", candidates: 3100 },
  { month: "Jun", candidates: 4200 },
  { month: "Jul", candidates: 3900 },
  { month: "Aug", candidates: 4500 },
  { month: "Sep", candidates: 4800 },
  { month: "Oct", candidates: 4300 },
  { month: "Nov", candidates: 5100 },
  { month: "Dec", candidates: 5600 },
];

export default function RegistrationChart() {
  return (
    <Card hover>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Candidate Registration Trend
        </h2>

        <p className="text-sm opacity-60">
          Full-year registration activity
        </p>
      </div>

      <div className="h-80 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 25,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.15}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString()} candidates`,
                "Registrations",
              ]}
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

            <Brush
              dataKey="month"
              height={30}
              stroke="#06b6d4"
              travellerWidth={10}
              startIndex={0}
              endIndex={11}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}