"use client";

// import { dashboardData } from "../data/dashboard";
import type { TrackingData } from "@/lib/types/ExaminationDashboard";
import { ArrowRight, MapPinned, Users } from "lucide-react";

const icons = {
  centre: MapPinned,
  users: Users,
};

type TrackingCardProps = {
  tracking: TrackingData;
};

export default function TrackingCard({ tracking }: TrackingCardProps) {
  return (
    <div
      className="
        h-[300px]
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        flex
        flex-col
        "
    >
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <div className="flex justify-between items-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 ">
            Tracking
          </div>

          <div
            className="
        flex
        items-center
        gap-2
        rounded-full
        bg-emerald-500/10
        px-3
        py-1
        "
          >
            <span
              className="
            w-2
            h-2
            rounded-full
            bg-emerald-400
            animate-pulse
            "
            />

            <span className="text-xs">Live</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-1 text-center">Nationwide</h2>
        </div>
      </div>

      <div
        className="
flex-1
flex
flex-col
justify-center
items-center
px-5
py-3
"
      >
        {/* <Activity
    size={32}
    className="text-cyan-400 mb-3"
    /> */}

        <h1 className="text-4xl font-bold">{tracking.progress}%</h1>

        <p className="mt-1 text-xs text-slate-400">Examination Progress</p>
      </div>

      <div
        className="
border-t
border-[var(--border)]
px-5
py-4
space-y-3
"
      >
        {tracking.metrics.map((item) => {
          const Icon = icons[item.icon];

          return (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {<Icon size={16} className="text-cyan-400" />}

                <span className="text-sm">{item.label}</span>
              </div>

              <span className="font-semibold">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      <button
        className="
  group
  self-start
  rounded-xl
  border
  border-[var(--border)]
  bg-white/5
  hover:bg-cyan-500
  hover:text-slate-950
  px-4
  py-0.5 ml-2
  flex
  items-center
  overflow-hidden
  transition-all
  duration-300
  "
      >
        <span className="whitespace-nowrap font-medium">View</span>

        <span
          className="
      max-w-0
      overflow-hidden
      whitespace-nowrap
      opacity-0
      transition-all
      duration-300
      group-hover:max-w-40
      group-hover:opacity-100
      "
        >
          <span className="ml-2">Live Tracking</span>
        </span>

        <ArrowRight
          size={16}
          className="
      ml-0
      opacity-0
      transition-all
      duration-300
      group-hover:ml-2
      group-hover:opacity-100
      group-hover:translate-x-1
      "
        />
      </button>
    </div>
  );
}
