"use client";

import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { dashboardData } from "../../data/dashboard";

type PerformanceCardProps = {
  performance: typeof dashboardData.performance;
};

export default function PerformanceCard({ performance }: PerformanceCardProps) {
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
          <span className="text-xs uppercase tracking-widest text-slate-400">
            Performance
          </span>

          <div
            className="
            flex
            items-center
            gap-1
            rounded-full
            bg-cyan-500/10
            px-3
            py-1
            "
          >
            <TrendingUp size={14} className="text-cyan-400" />

            <span className="text-xs text-cyan-400">+2.8%</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-2 text-center">System Health</h2>
      </div>

      <div
        className="
flex-1
flex
flex-col
justify-center
items-center
"
      >
        <p className="text-4xl font-bold">{performance.health}</p>

        <p className="text-2xl font-semibold text-cyan-400">
          {performance.score}%
        </p>

        <p className="text-xs text-slate-400 mt-1">Overall Performance</p>
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
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-emerald-400" />
            Server Uptime
          </span>

          <span className="font-medium">{performance.uptime}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} className="text-emerald-400" />
            Attendance
          </span>

          <span className="font-medium">{performance.attendance}</span>
        </div>
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
  py-3 ml-14 -mt-1
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
          <span className="ml-2">Analytics</span>
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

// "use client";

// import {
//   TrendingUp,
//   Award,
//   CheckCircle2,
// } from "lucide-react";

// export default function PerformanceCard() {
//   return (
//     <div
//       className="bg-[var(--card)]
//       border border-[var(--border)]
//       rounded-3xl
//       p-6
//       flex flex-col
//       justify-between"
//     >
//       {/* Header */}
//       <div>
//         <p className="text-xs uppercase tracking-wider text-slate-400">
//           Performance
//         </p>

//         <h2 className="text-2xl font-bold mt-2">
//           Success Rate
//         </h2>

//         <p className="text-sm text-slate-400 mt-1">
//           National examination performance
//         </p>
//       </div>

//       {/* Main Score */}
//       <div className="my-6">

//         <div className="flex items-end gap-3">

//           <h1 className="text-5xl font-bold text-green-400">
//             78%
//           </h1>

//           <span className="flex items-center gap-1 text-green-400 font-medium mb-2">

//             <TrendingUp size={16} />

//             +3.2%

//           </span>

//         </div>

//         <p className="text-sm text-slate-400 mt-2">
//           Compared with previous examination
//         </p>

//       </div>

//       {/* Progress */}
//       <div className="space-y-2">

//         <div className="flex justify-between text-sm">

//           <span className="text-slate-400">
//             Overall Performance
//           </span>

//           <span className="font-semibold">
//             78%
//           </span>

//         </div>

//         <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

//           <div
//             className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-green-400"
//             style={{ width: "78%" }}
//           />

//         </div>

//       </div>

//       {/* Bottom Stats */}
//       <div className="grid grid-cols-2 gap-4 mt-6">

//         <div className="rounded-2xl bg-[var(--muted)] p-4">

//           <Award
//             size={18}
//             className="text-yellow-400 mb-2"
//           />

//           <p className="text-xl font-bold">
//             A+
//           </p>

//           <p className="text-xs text-slate-400">
//             Best State Grade
//           </p>

//         </div>

//         <div className="rounded-2xl bg-[var(--muted)] p-4">

//           <CheckCircle2
//             size={18}
//             className="text-green-400 mb-2"
//           />

//           <p className="text-xl font-bold">
//             942K
//           </p>

//           <p className="text-xs text-slate-400">
//             Successful Candidates
//           </p>

//         </div>

//       </div>
//     </div>
//   );
// }
