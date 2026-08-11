"use client";

import type { ActiveUsersData } from "@/lib/types/ExaminationDashboard";
import {
  Activity,
  ArrowUpRight,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

const icons = {
  today: UserCheck,
  week: Users,
  month: UserPlus,
};

type ActiveUsersCardProps = {
  activeUsers: ActiveUsersData;
};

export default function ActiveUsersCard({ activeUsers }: ActiveUsersCardProps) {
  return (
    <div className="h-full flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Live Activity
          </p>

          <h2 className="text-2xl font-bold mt-1">Active Candidates</h2>
        </div>

        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
          <Users className="text-cyan-400" size={24} />
        </div>
      </div>

      {/* Total */}
      <div className="mt-3">
        <p className="text-5xl font-bold">
          {activeUsers.total.toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2 text-green-400">
          <ArrowUpRight size={18} />

          <span className="font-medium">
            {activeUsers.growth} from last month
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-3" />

      {/* Stats */}
      <div className="space-y-3">
        {activeUsers.stats.map((item) => {
          const Icon = icons[item.icon];

          return (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-cyan-400" />

                <div>
                  <p className="font-medium">{item.label}</p>

                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>

              <span className="font-semibold">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Extra space is now useful */}
      <div className="flex-1 flex items-center py-4">
        <div className="w-full rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={17} className="text-cyan-400" />

            <p className="text-sm font-semibold">Current Activity</p>

            <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Candidates online</span>

              <span className="font-medium">
                {activeUsers.total.toLocaleString()}
              </span>
            </div>

            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-400"
                style={{
                  width: `${Math.min(activeUsers.total / 200, 100)}%`,
                }}
              />
            </div>

            <p className="text-xs text-slate-500">
              Candidate activity is being monitored nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <button
        className="
          pt-4
          text-cyan-400
          font-medium
          hover:text-cyan-300
          transition
          text-left
        "
      >
        View Candidate Analytics →
      </button>
    </div>
  );
}
