"use client";

import type { ExaminationActivity } from "@/lib/types/ExaminationDashboard";

const statusColor = {
  success: "bg-emerald-400",

  warning: "bg-amber-400",

  info: "bg-cyan-400",
} as const;

type ActivityCardProps = {
  activity: ExaminationActivity[];
};

export default function RecentActivity({ activity }: ActivityCardProps) {
  return (
    <div
      className="
        h-full
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        flex
        flex-col
        "
    >
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Activity
            </p>

            <h2 className="text-xl font-bold mt-1">Recent Events</h2>
          </div>

          <span
            className="
        rounded-full
        bg-cyan-500/10
        px-3
        py-1
        text-xs
        text-cyan-400
        "
          >
            Live Feed
          </span>
        </div>
      </div>

      <div
        className="
flex-1
overflow-y-auto
px-5
py-4
space-y-4
"
      >
        {activity.map((item, index) => {
          const dotColor = statusColor[item.type];

          return (
            <div key={item.id} className="relative flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div
                  className={`
            h-2.5
            w-2.5
            rounded-full
            ${dotColor}
            z-10
          `}
                />

                {index !== activity.length - 1 && (
                  <div
                    className="
              absolute
              top-3
              w-px
              h-16
              bg-[var(--border)]
            "
                  />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>

                <p className="text-sm text-slate-400">{item.location}</p>
              </div>

              <span
                className="
          text-xs
          text-slate-500
          whitespace-nowrap
        "
              >
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
