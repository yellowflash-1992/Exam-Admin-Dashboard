"use client";

import {
  CalendarDays,
  CheckCircle2,
  PlayCircle,
  Clock3,
} from "lucide-react";
import Card from "../ui/Card";

import { examinations } from "@/lib/data/examinations";
import { useCandidateStore } from "@/lib/stores/candidateStore";

const examinationPresentation = {
  WAEC: {
    icon: CalendarDays,
    statusIcon: Clock3,
    statusColor: "text-cyan-400",
    statusBackground: "bg-cyan-500/10",
  },

  JAMB: {
    icon: PlayCircle,
    statusIcon: PlayCircle,
    statusColor: "text-amber-400",
    statusBackground: "bg-amber-500/10",
  },

  NECO: {
    icon: CalendarDays,
    statusIcon: CalendarDays,
    statusColor: "text-blue-400",
    statusBackground: "bg-blue-500/10",
  },

  NABTEB: {
    icon: CheckCircle2,
    statusIcon: CheckCircle2,
    statusColor: "text-green-400",
    statusBackground: "bg-green-500/10",
  },
};

export default function ExaminationStatus() {
  const candidates = useCandidateStore(
    (state) => state.candidates,
  );


  return (
    <Card hover className="h-[400px] flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Examination Status
        </h2>

        <p className="text-sm opacity-60">
          Current status of examination cycles
        </p>
      </div>

      <div className="dashboard-scroll flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {examinations.map((exam) => {
  const presentation =
    examinationPresentation[exam.name];

  const ExamIcon = presentation.icon;
  const StatusIcon = presentation.statusIcon;

  const candidateCount = candidates.filter(
    (candidate) =>
      candidate.exam === exam.name,
  ).length;

  return (
    <div
      key={exam.id}
      className="
        flex
        items-start
        gap-4
        p-3
        rounded-xl
        border
        border-transparent
        hover:border-[var(--border)]
        hover:bg-[var(--muted)]
        transition-all
        duration-200
      "
    >
      <div
        className="
          w-11
          h-11
          shrink-0
          rounded-xl
          bg-[var(--muted)]
          flex
          items-center
          justify-center
        "
      >
        <ExamIcon
          size={19}
          className={presentation.statusColor}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold">
            {exam.name}
          </p>

          <span
            className={`
              inline-flex
              items-center
              gap-1
              px-2
              py-1
              rounded-full
              text-[11px]
              font-medium
              ${presentation.statusColor}
              ${presentation.statusBackground}
            `}
          >
            <StatusIcon size={12} />
            {exam.status}
          </span>
        </div>

        <p className="text-xs opacity-50 mt-1">
          {exam.description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <CalendarDays
            size={13}
            className="opacity-50 shrink-0"
          />

          <span className="text-xs">
            <span className="opacity-50">
              {exam.dateLabel}:
            </span>{" "}
            <span className="font-medium">
              {exam.date}
            </span>
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs opacity-60">
          <span>
            {candidateCount}{" "}
            {candidateCount === 1
              ? "candidate"
              : "candidates"}
          </span>

          <span>
            Centre count unavailable
          </span>
        </div>
      </div>
    </div>
  );
})}
      </div>
    </Card>
  );
}