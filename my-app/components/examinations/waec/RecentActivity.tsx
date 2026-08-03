"use client";

import { dashboardData } from "../../data/dashboard";

const statusColor = {
  success: "bg-emerald-400",

  warning: "bg-amber-400",

  info: "bg-cyan-400",
} as const;

type ActivityCardProps = {
  activity: typeof dashboardData.activity;
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
        {dashboardData.activity.map((item) => {
          const dotColor = statusColor[item.type];

          return (
            <div key={item.id} className="relative flex items-start gap-4">
              {/* Timeline Dot */}

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

                {item.id !== dashboardData.activity.length && (
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
              {/* Content */}

              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>

                <p className="text-sm text-slate-400">{item.location}</p>
              </div>

              {/* Time */}

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

// export default function RecentActivityCard() {
//   const activities = [
//     { text: "New WAEC registration: Lagos center", time: "2m ago" },
//     { text: "JAMB score uploaded: Abuja batch", time: "10m ago" },
//     { text: "Exam center approved: Kano", time: "1h ago" },
//     { text: "System update completed", time: "3h ago" },
//   ];

//   return (
//     <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 h-[360px]">

//       <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

//       <div className="space-y-4 overflow-y-auto h-[280px] pr-2">
//         {activities.map((a, i) => (
//           <div
//             key={i}
//             className="flex justify-between items-start border-b border-white/5 pb-2"
//           >
//             <p className="text-sm">{a.text}</p>
//             <span className="text-xs opacity-60">{a.time}</span>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }
