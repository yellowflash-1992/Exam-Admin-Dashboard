import { CalendarDays, ShieldCheck } from "lucide-react";

import type { Examination } from "@/lib/types/examination";

type WelcomeCardProps = {
  examination: Examination;
  candidates?: number;
};

export default function WelcomeCard({
  examination,
  candidates = 0,
}: WelcomeCardProps) {
  return (
    <div className="md:h-[300px] md:space-y-5">
      {/* TOP CARD */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-cyan-500/20
          bg-gradient-to-br
          from-[#0F3D56]
          via-[#0B5CAD]
          to-[#112240]
          px-4
          py-3
          sm:px-5
          z-10
    grid
    grid-cols-[1fr_auto]
    gap-x-4
    gap-y-3
    md:flex
    md:items-start
    md:justify-between
        "
      >
        {/* Decoration */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-start
            md:justify-between
            md:gap-4
          "
        >
          {/* LEFT */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm text-cyan-100">
              <ShieldCheck size={16} className="shrink-0" />

              <span>{examination.name} Administration</span>
            </div>

            <h1
              className="
                mt-1.5
                text-3xl
                font-bold
                leading-tight
                sm:text-4xl
              "
            >
              Good Morning
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-5 text-cyan-100 sm:text-base">
              {candidates.toLocaleString()} candidates registered for the{" "}
              {examination.name} examination cycle.
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              shrink-0
              text-left
              md:text-right
            "
          >
            <p className="text-4xl font-bold sm:text-5xl">08:42</p>

            <p className="mt-1 text-sm">Friday</p>

            <p className="mt-1 text-xs text-cyan-100 sm:text-sm">
              Abuja • 28°C
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-4
          backdrop-blur-md
          sm:px-5
          sm:py-3
          hidden
          md:block
        "
      >
        <div className="flex items-start gap-3">
          <CalendarDays size={18} className="mt-0.5 shrink-0 text-cyan-400" />

          <div className="min-w-0">
            <p className="text-sm font-semibold">{examination.status}</p>

            <p className="mt-1 text-xs leading-5 opacity-50">
              {examination.dateLabel}: {examination.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
