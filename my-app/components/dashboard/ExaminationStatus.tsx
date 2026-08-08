import {
  CalendarDays,
  CheckCircle2,
  PlayCircle,
  Clock3,
} from "lucide-react";
import Card from "../ui/Card";

const examinations = [
  {
    name: "WAEC",
    status: "Registration Open",
    description: "Candidate registration is currently open",
    dateLabel: "Registration closes",
    date: "30 April 2026",
    candidates: "12,430 candidates",
    centres: "148 centres",
    icon: CalendarDays,
    statusIcon: Clock3,
    statusColor: "text-cyan-400",
    statusBackground: "bg-cyan-500/10",
  },
  {
    name: "JAMB",
    status: "Ongoing",
    description: "Examination is currently in progress",
    dateLabel: "Examination period",
    date: "15 May – 20 June 2026",
    candidates: "8,240 candidates",
    centres: "96 centres",
    icon: PlayCircle,
    statusIcon: PlayCircle,
    statusColor: "text-amber-400",
    statusBackground: "bg-amber-500/10",
  },
  {
    name: "NECO",
    status: "Upcoming",
    description: "Examination cycle has not started",
    dateLabel: "Examination starts",
    date: "10 July 2026",
    candidates: "6,820 candidates",
    centres: "82 centres",
    icon: CalendarDays,
    statusIcon: CalendarDays,
    statusColor: "text-blue-400",
    statusBackground: "bg-blue-500/10",
  },
  {
    name: "NABTEB",
    status: "Completed",
    description: "Examination cycle has been completed",
    dateLabel: "Completed",
    date: "18 March 2026",
    candidates: "5,640 candidates",
    centres: "64 centres",
    icon: CheckCircle2,
    statusIcon: CheckCircle2,
    statusColor: "text-green-400",
    statusBackground: "bg-green-500/10",
  },
];

export default function ExaminationStatus() {
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
          const ExamIcon = exam.icon;
          const StatusIcon = exam.statusIcon;

          return (
            <div
              key={exam.name}
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
              {/* Exam icon */}
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
                  className={exam.statusColor}
                />
              </div>

              {/* Information */}
              <div className="min-w-0 flex-1">
                {/* Exam + status */}
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
                      ${exam.statusColor}
                      ${exam.statusBackground}
                    `}
                  >
                    <StatusIcon size={12} />
                    {exam.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs opacity-50 mt-1">
                  {exam.description}
                </p>

                {/* Date */}
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

                {/* Metrics */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs opacity-60">
                  <span>{exam.candidates}</span>
                  <span>{exam.centres}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}