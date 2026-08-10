"use client";

import { useMemo } from "react";
import {
  BarChart3,
  Building2,
  FileCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";

import { useCandidateStore } from "@/lib/stores/candidateStore";
import { useCentreStore } from "@/lib/stores/centreStore";
import { results } from "@/lib/data/results";

export default function StatisticsPage() {
  const candidates = useCandidateStore(
    (state) => state.candidates,
  );

  const centres = useCentreStore(
    (state) => state.centres,
  );

  const totalCandidates = candidates.length;
  const totalResults = results.length;
  const totalCentres = centres.length;

  const averageScore =
    totalResults > 0
      ? Math.round(
          results.reduce(
            (total, result) => total + result.score,
            0,
          ) / totalResults,
        )
      : 0;

  const verifiedResults = results.filter(
    (result) => result.status === "Verified",
  ).length;

  const passCount = candidates.filter(
    (candidate) => candidate.status === "Passed",
  ).length;

  const passRate =
    totalCandidates > 0
      ? Math.round(
          (passCount / totalCandidates) * 100,
        )
      : 0;

  const examData = useMemo(() => {
    const exams = ["WAEC", "JAMB", "NECO", "NABTEB"];

    return exams.map((exam) => ({
      exam,
      candidates: candidates.filter(
        (candidate) => candidate.exam === exam,
      ).length,
      results: results.filter(
        (result) => result.exam === exam,
      ).length,
    }));
  }, [candidates]);

  const resultStatusData = useMemo(() => {
    return [
      {
        name: "Verified",
        value: results.filter(
          (result) => result.status === "Verified",
        ).length,
      },
      {
        name: "Pending",
        value: results.filter(
          (result) => result.status === "Pending",
        ).length,
      },
      {
        name: "Rejected",
        value: results.filter(
          (result) => result.status === "Rejected",
        ).length,
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statistics"
        description="Analyse examination, candidate, result and centre data"
      />

      {/* Overview */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Candidates"
          value={totalCandidates}
          icon={Users}
          color="text-cyan-400"
        />

        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={TrendingUp}
          color="text-green-400"
        />

        <StatCard
          title="Verified Results"
          value={verifiedResults}
          icon={FileCheck}
          color="text-blue-400"
        />

        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          icon={BarChart3}
          color="text-purple-400"
        />
      </div>

      {/* Examination analysis */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Candidates by Examination
            </h2>

            <p className="text-sm opacity-60">
              Candidate distribution across examination types
            </p>
          </div>

          <div className="h-80 min-w-0">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={examData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  strokeOpacity={0.15}
                />

                <XAxis
                  dataKey="exam"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="candidates"
                  name="Candidates"
                  radius={[6, 6, 0, 0]}
                  fill="#06b6d4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Result Status
            </h2>

            <p className="text-sm opacity-60">
              Current result verification status
            </p>
          </div>

          <div className="h-80 min-w-0">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={resultStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={60}
                  paddingAngle={3}
                >
                  {resultStatusData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          [
                            "#22c55e",
                            "#f59e0b",
                            "#ef4444",
                          ][index]
                        }
                      />
                    ),
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-5 text-xs">
            {resultStatusData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: [
                      "#22c55e",
                      "#f59e0b",
                      "#ef4444",
                    ][index],
                  }}
                />

                <span className="opacity-60">
                  {item.name}
                </span>

                <span className="font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Centre overview */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Centre Overview
            </h2>

            <p className="text-sm opacity-60">
              Current examination centre statistics
            </p>
          </div>

          <Building2
            size={22}
            className="text-blue-400"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatItem
            label="Total Centres"
            value={totalCentres}
          />

          <StatItem
            label="Active Centres"
            value={
              centres.filter(
                (centre) =>
                  centre.status === "Active",
              ).length
            }
          />

          <StatItem
            label="Inactive Centres"
            value={
              centres.filter(
                (centre) =>
                  centre.status === "Inactive",
              ).length
            }
          />
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-60">
          {title}
        </p>

        <Icon size={20} className={color} />
      </div>

      <p className="mt-3 text-3xl font-bold">
        {typeof value === "number"
          ? value.toLocaleString()
          : value}
      </p>
    </Card>
  );
}

function StatItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-[var(--muted)] p-4">
      <p className="text-sm opacity-50">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value.toLocaleString()}
      </p>
    </div>
  );
}