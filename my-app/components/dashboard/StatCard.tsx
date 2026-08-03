"use client";

import { Award, Building2, FileCheck, TrendingUp, Users } from "lucide-react";

const icons = {
  users: Users,
  building: Building2,
  exam: FileCheck,
  award: Award,
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: keyof typeof icons;
  color: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: StatCardProps) {
  const Icon = icons[icon];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3">
      <div className="flex justify-between">
        <div>
          <p>{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>

        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="text-white" size={22} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-emerald-400">
        <TrendingUp size={16} />
        <span>{change}</span>
      </div>
    </div>
  );
}
