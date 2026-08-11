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
    <div className="space-y-6">
      {/* TOP CARD */}
      <div
        className="
          relative
          rounded-3xl
          overflow-hidden
          border border-cyan-500/20
          bg-gradient-to-br
          from-[#0F3D56]
          via-[#0B5CAD]
          to-[#112240]
          px-3
          py-6
        "
      >
        {/* Decoration */}
        <div className="absolute -right-10 -top-10 w-20 h-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex justify-between gap-4">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-cyan-100">
              <ShieldCheck size={16} />

              <span>{examination.name} Administration</span>
            </div>

            <h1 className="mt-4 text-4xl font-bold whitespace-nowrap flex items-center gap-2">
              Good Morning
            </h1>

            <p className="mt-5 text-cyan-100">
              {candidates.toLocaleString()} candidates registered for the{" "}
              {examination.name} examination cycle.
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-right shrink-0">
            <p className="text-5xl font-bold">08:42</p>

            <p>Friday</p>

            <p className="text-sm">Abuja • 28°C</p>
          </div>
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-md
          mt-
          p-5
        "
      >
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-cyan-400" />

          <div>
            <p className="text-sm font-semibold">{examination.status}</p>

            <p className="text-xs opacity-50">
              {examination.dateLabel}: {examination.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
