"use client";

import { ArrowUpRight, UserCheck, UserPlus, Users } from "lucide-react";
import { dashboardData } from "../../data/dashboard";

const icons = {
  today: UserCheck,
  week: Users,
  month: UserPlus,
};

type ActiveUsersCardProps = {
  activeUsers: typeof dashboardData.activeUsers;
};

export default function ActiveUsersCard({ activeUsers }: ActiveUsersCardProps) {
  return (
    <div
      className="
  bg-(--card)
  border
  border-[var(--border)]
  rounded-3xl
  p-4
  h-105
  flex
  flex-col
"
    >
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

      <div className="mt-4">
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

      <div className="border-t border-[var(--border)] my-4" />

      {/* Stats */}

      <div className="space-y-5">
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

      {/* Bottom Button */}

      <button
        className="
        mt-auto
        pt-4
        text-cyan-400
        font-medium
        hover:text-cyan-300
        transition"
      >
        View Candidate Analytics →
      </button>
    </div>
  );
}
