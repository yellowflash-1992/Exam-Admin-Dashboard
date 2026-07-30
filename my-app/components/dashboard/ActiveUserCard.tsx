"use client";

import {
  Users,
  UserCheck,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";

export default function ActiveUsersCard() {
  return (
    <div
  className="
  bg-[var(--card)]
  border
  border-[var(--border)]
  rounded-3xl
  p-4
  h-[420px]
  flex
  flex-col
">
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Live Activity
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Active Candidates
          </h2>

        </div>

        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">

          <Users
            className="text-cyan-400"
            size={24}
          />

        </div>

      </div>

      {/* Total */}

      <div className="mt-4">

        <p className="text-5xl font-bold">
          48,920
        </p>

        <div className="flex items-center gap-2 mt-2 text-green-400">

          <ArrowUpRight size={18} />

          <span className="font-medium">
            +8.4% from last month
          </span>

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-[var(--border)] my-4" />

      {/* Stats */}

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">

              <UserCheck
                size={18}
                className="text-green-400"
              />

            </div>

            <div>

              <p className="font-medium">
                Today
              </p>

              <p className="text-xs text-slate-400">
                Logged in
              </p>

            </div>

          </div>

          <span className="font-bold">
            3,240
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <Users
                size={18}
                className="text-blue-400"
              />

            </div>

            <div>

              <p className="font-medium">
                This Week
              </p>

              <p className="text-xs text-slate-400">
                Active users
              </p>

            </div>

          </div>

          <span className="font-bold">
            12,300
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">

              <UserPlus
                size={18}
                className="text-purple-400"
              />

            </div>

            <div>

              <p className="font-medium">
                This Month
              </p>

              <p className="text-xs text-slate-400">
                Registered
              </p>

            </div>

          </div>

          <span className="font-bold">
            48,920
          </span>

        </div>

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