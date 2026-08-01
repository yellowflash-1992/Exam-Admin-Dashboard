"use client";

import {
    Activity,
    ArrowRight
} from "lucide-react";

export default function LiveActivityCard() {

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

           <div className="px-4 py-3 border-b border-[var(--border)]">

    <div className="flex justify-between items-center">

        <span className="text-xs uppercase tracking-widest text-slate-400">

            Live Activity

        </span>

        <div
            className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-xl
            bg-cyan-500/10
            "
        >

            <Activity
                size={18}
                className="text-cyan-400"
            />

        </div>

    </div>

    <h2 className="text-2xl font-bold mt-2">

        Recent Events

    </h2>

</div>

            <div
className="
flex-1
px-4
py-3
space-y-4
"
>

    {/* Item 1 */}

    <div className="flex gap-3">

        <span className="mt-2 w-2 h-2 rounded-full bg-emerald-400"/>

        <div>

            <p className="font-semibold">

                Kano Centre

            </p>

            <p className="text-sm text-slate-400">

                124 candidates checked in

            </p>

            <span className="text-xs text-slate-500 mt-1">

                2 min ago

            </span>

        </div>

    </div>

    {/* Item 2 */}

    <div className="flex gap-3">

        <span className="mt-2 w-2 h-2 rounded-full bg-cyan-400"/>

        <div>

            <p className="font-semibold">

                Lagos Centre

            </p>

            <p className="text-sm text-slate-400">

                Results uploaded

            </p>

            <span className="text-xs text-slate-500 mt-1">

                6 min ago

            </span>

        </div>

    </div>

    {/* Item 3 */}

    <div className="flex gap-3">

        <span className="mt-2 w-2 h-2 rounded-full bg-amber-400"/>

        <div>

            <p className="font-semibold">

                Abuja HQ

            </p>

            <p className="text-sm text-slate-400">

                Supervisor assigned

            </p>

            <span className="text-xs text-slate-500 mt-1">

                12 min ago

            </span>

        </div>

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
  py-0.5 ml-16 
  flex
  items-center
  overflow-hidden
  transition-all
  duration-300
  "
>
    <span className="whitespace-nowrap font-medium">
        View
    </span>

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
        <span className="ml-2">
            Activity
        </span>
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
//   Users,
//   UserCheck,
//   UserPlus,
//   ArrowUpRight,
// } from "lucide-react";

// export default function ActiveUsersCard() {
//   return (
//     <div
//   className="
//   bg-[var(--card)]
//   border
//   border-[var(--border)]
//   rounded-3xl
//   p-4
//   h-[420px]
//   flex
//   flex-col
// ">
//       {/* Header */}

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-xs uppercase tracking-wider text-slate-400">
//             Live Activity
//           </p>

//           <h2 className="text-2xl font-bold mt-1">
//             Active Candidates
//           </h2>

//         </div>

//         <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">

//           <Users
//             className="text-cyan-400"
//             size={24}
//           />

//         </div>

//       </div>

//       {/* Total */}

//       <div className="mt-4">

//         <p className="text-5xl font-bold">
//           48,920
//         </p>

//         <div className="flex items-center gap-2 mt-2 text-green-400">

//           <ArrowUpRight size={18} />

//           <span className="font-medium">
//             +8.4% from last month
//           </span>

//         </div>

//       </div>

//       {/* Divider */}

//       <div className="border-t border-[var(--border)] my-4" />

//       {/* Stats */}

//       <div className="space-y-5">

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">

//               <UserCheck
//                 size={18}
//                 className="text-green-400"
//               />

//             </div>

//             <div>

//               <p className="font-medium">
//                 Today
//               </p>

//               <p className="text-xs text-slate-400">
//                 Logged in
//               </p>

//             </div>

//           </div>

//           <span className="font-bold">
//             3,240
//           </span>

//         </div>

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

//               <Users
//                 size={18}
//                 className="text-blue-400"
//               />

//             </div>

//             <div>

//               <p className="font-medium">
//                 This Week
//               </p>

//               <p className="text-xs text-slate-400">
//                 Active users
//               </p>

//             </div>

//           </div>

//           <span className="font-bold">
//             12,300
//           </span>

//         </div>

//         <div className="flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">

//               <UserPlus
//                 size={18}
//                 className="text-purple-400"
//               />

//             </div>

//             <div>

//               <p className="font-medium">
//                 This Month
//               </p>

//               <p className="text-xs text-slate-400">
//                 Registered
//               </p>

//             </div>

//           </div>

//           <span className="font-bold">
//             48,920
//           </span>

//         </div>

//       </div>

//       {/* Bottom Button */}

//       <button
//         className="
//         mt-auto
//         pt-4
//         text-cyan-400
//         font-medium
//         hover:text-cyan-300
//         transition"
//       >
//         View Candidate Analytics →
//       </button>

//     </div>
//   );
// }