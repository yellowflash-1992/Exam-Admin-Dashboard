"use client";

export default function MapCard() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 h-[420px]">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          Nigeria Exam Overview
        </h2>

        <span className="text-sm text-cyan-400">
          WAEC & JAMB Analytics
        </span>
      </div>

      {/* Map Container */}
      <div className="relative h-[330px] rounded-2xl bg-[#071028] overflow-hidden flex items-center justify-center">

        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5" />

        {/* Real Nigeria SVG */}
<svg
  viewBox="0 0 512 512"
  className="w-[85%] h-[85%]"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Real Nigeria-like outline */}
  <path
    d="M217 35
       L298 45
       L355 82
       L398 142
       L420 215
       L409 290
       L380 350
       L344 415
       L292 470
       L220 485
       L158 460
       L110 420
       L82 360
       L70 300
       L74 220
       L110 160
       L150 110
       L217 35Z"
    fill="#123B5D"
    stroke="#22D3EE"
    strokeWidth="8"
    className="transition-all duration-300 hover:fill-cyan-500"
  />

  {/* Lagos */}
  <circle
    cx="170"
    cy="385"
    r="7"
    fill="#22D3EE"
    className="animate-pulse"
  />

  {/* Abuja */}
  <circle
    cx="245"
    cy="255"
    r="7"
    fill="#3B82F6"
    className="animate-pulse"
  />

  {/* Kano */}
  <circle
    cx="285"
    cy="130"
    r="7"
    fill="#06B6D4"
    className="animate-pulse"
  />

  {/* Port Harcourt */}
  <circle
    cx="210"
    cy="420"
    r="7"
    fill="#38BDF8"
    className="animate-pulse"
  />
</svg>

      </div>
    </div>
  );
}