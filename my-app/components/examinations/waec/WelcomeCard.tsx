import {
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Users,
BookOpen,
MapPinned,
} from "lucide-react";

export default function WelcomeCard() {
  return (
    <div className="flex flex-col gap-3">

      {/* TOP CARD */}

      <div className="
      relative
      rounded-3xl
      overflow-hidden
      border border-cyan-500/20
      bg-gradient-to-br
      from-[#0F3D56]
      via-[#0B5CAD]
      to-[#112240]
      px-3
  py-3
      ">

        {/* decoration */}

        <div className="absolute -right-10 -top-10 w-20 h-30 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex justify-between">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-2 text-cyan-100">

              <ShieldCheck size={16}/>

              WAEC Administration

            </div>

            <h1 className="mt-3 text-4xl font-bold whitespace-nowrap flex items-center gap-2">
  <span>Good Morning</span>

  <span className="-translate-y-2 inline-block">
    👋
  </span>
</h1>

            <p className="mt-2 text-cyan-100">

              1,203,421 candidates registered
              for the 2026 examination cycle.

            </p>

          </div>

          {/* RIGHT */}

          <div className="text-right">

            <p className="text-5xl font-bold">

              08:42

            </p>

            <p>Friday</p>

            <p className="text-sm">

              Abuja • 28°C

            </p>

          </div>

        </div>

      </div>

      {/* BOTTOM CARD */}

      <div className="
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-md
      p-5
      ">

        Bottom Card Here

      </div>

    </div>
  );
}