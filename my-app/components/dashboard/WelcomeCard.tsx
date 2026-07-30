import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

export default function WelcomeCard() {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-2xl
      border border-cyan-500/20
      bg-gradient-to-br
     from-[#0F3D56]
via-[#0B5CAD]
to-[#112240]
      p-7
      min-h-[280px]
      flex
      flex-col
      justify-between
      "
    >
      {/* Decorative circles */}

      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl" />
      <div className="absolute right-10 bottom-0 w-32 h-32 rounded-full bg-cyan-300/10 blur-lg" />

      {/* Top */}

      <div className="relative z-10">

        <div className="flex items-center gap-2 text-cyan-100 text-sm">

          <ShieldCheck size={16} />

          National Examination Board

        </div>

    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1">

    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>

    <span className="text-xs text-emerald-200">
        Live Monitoring Active
    </span>

</div>

        <h1 className="mt-4 text-4xl font-bold leading-tight">
          Welcome Back,
          <br />
          Super Admin 👋
        </h1>

        <p className="mt-4 max-w-md text-cyan-100">
          Monitor candidates, examination centres,
          nationwide performance and system activity
          from one centralized dashboard.
        </p>

      </div>

      {/* Bottom */}

      <div className="relative z-10 flex items-end justify-between">

        <div className="flex gap-3">

  <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">

    <p className="text-xs text-cyan-100">
      Active Exams
    </p>

    <h3 className="text-xl font-bold">
      156
    </h3>

  </div>

  <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">

    <p className="text-xs text-cyan-100">
      Candidates
    </p>

    <h3 className="text-xl font-bold">
      1.2M
    </h3>

  </div>

</div>
        <div className="flex gap-3">

          <button
            className="
            flex items-center gap-2
            rounded-xl
            bg-white
            text-slate-900
            px-3 py-2 text-sm
            font-medium
            hover:scale-105
            transition
            "
          >
            View Reports

            <ArrowRight size={18} />
          </button>

          <button
            className="
            rounded-xl
            border
            border-white/20
            bg-white/10
           px-3 py-2
            backdrop-blur
            hover:bg-white/20
            transition
            "
          >
            <CalendarDays size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}