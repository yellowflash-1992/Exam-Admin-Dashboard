import {
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";
import Card from "../ui/Card";

const examinations = [
  {
    name: "WAEC",
    status: "Active",
    detail: "8,420 candidates",
    icon: PlayCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "NECO",
    status: "Upcoming",
    detail: "Starts Aug 12",
    icon: Clock3,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "JAMB",
    status: "Active",
    detail: "3,120 candidates",
    icon: PlayCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "NABTEB",
    status: "Completed",
    detail: "5,840 candidates",
    icon: CheckCircle2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export default function ExaminationStatus() {
  return (
    <Card hover className="py-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Examination Status
        </h2>

        <p className="text-sm opacity-60 mt-1">
          Current examination activities
        </p>
      </div>

      <div className="space-y-4">
        {examinations.map((exam) => {
          const Icon = exam.icon;

          return (
            <div
              key={exam.name}
              className="
                flex
                items-center
                justify-between
                gap-4
                p-3
                rounded-xl
                border
                border-[var(--border)]
              "
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`
                    w-10
                    h-10
                    shrink-0
                    rounded-lg
                    ${exam.bg}
                    flex
                    items-center
                    justify-center
                  `}
                >
                  <Icon
                    size={18}
                    className={exam.color}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold">
                    {exam.name}
                  </p>

                  <p className="text-xs opacity-60 truncate">
                    {exam.detail}
                  </p>
                </div>
              </div>

              <span
                className={`
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  ${exam.color}
                `}
              >
                {exam.status}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}