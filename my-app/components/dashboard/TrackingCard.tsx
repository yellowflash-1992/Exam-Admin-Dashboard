"use client";

import { Activity, ArrowUpRight, Clock } from "lucide-react";

export default function TrackingCard() {
  return (
    <div className="bg-[var(--card)]
      border border-[var(--border)]
      rounded-3xl
      p-6
      flex flex-col
      justify-between">

      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-400">
          Live Tracking
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Exam Activity
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Real-time monitoring of national examinations
        </p>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center my-8">

        <div className="relative w-32 h-32">

          <svg
            className="absolute inset-0 rotate-[-90deg]"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#1e293b"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#22d3ee"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="314"
              strokeDashoffset="63"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-3xl font-bold">
              80%
            </span>

            <span className="text-xs text-slate-400">
              Active
            </span>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="space-y-4">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2 text-sm">

            <Activity
              size={16}
              className="text-cyan-400"
            />

            Registrations

          </div>

          <span className="font-semibold">
            1,284
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2 text-sm">

            <Clock
              size={16}
              className="text-amber-400"
            />

            Exams Running

          </div>

          <span className="font-semibold">
            18
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2 text-sm">

            <ArrowUpRight
              size={16}
              className="text-green-400"
            />

            Completion

          </div>

          <span className="text-green-400 font-semibold">
            +12%
          </span>

        </div>

      </div>

      {/* Button */}
      <button
        className="mt-6
        w-full
        rounded-xl
        bg-cyan-500
        hover:bg-cyan-400
        py-3
        font-semibold
        transition"
      >
        View Live Tracking
      </button>

    </div>
  );
}