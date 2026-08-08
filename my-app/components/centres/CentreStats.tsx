"use client";

import { Building2, CheckCircle2, Users, XCircle } from "lucide-react";
import type { Centre } from "@/lib/types/centre";

type Props = {
  centres: Centre[];
};

export default function CentreStats({ centres }: Props) {
  const totalCentres = centres.length;

  const activeCentres = centres.filter(
    (centre) => centre.status === "Active",
  ).length;

  const inactiveCentres = centres.filter(
    (centre) => centre.status === "Inactive",
  ).length;

  const totalCapacity = centres.reduce(
    (total, centre) => total + centre.capacity,
    0,
  );

  const stats = [
    {
      title: "Total Centres",
      value: totalCentres,
      icon: Building2,
      color: "text-cyan-400",
      background: "bg-cyan-500/10",
    },
    {
      title: "Active Centres",
      value: activeCentres,
      icon: CheckCircle2,
      color: "text-green-400",
      background: "bg-green-500/10",
    },
    {
      title: "Inactive Centres",
      value: inactiveCentres,
      icon: XCircle,
      color: "text-red-400",
      background: "bg-red-500/10",
    },
    {
      title: "Total Capacity",
      value: totalCapacity,
      icon: Users,
      color: "text-purple-400",
      background: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-60">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.background} ${stat.color}`}
              >
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}