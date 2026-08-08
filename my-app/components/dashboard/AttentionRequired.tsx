import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  UserCheck,
} from "lucide-react";
import Card from "../ui/Card";

const attentionItems = [
  {
    title: "24 candidates awaiting verification",
    description: "Candidate records require verification",
    icon: UserCheck,
    color: "text-amber-400",
    background: "bg-amber-500/10",
  },
  {
    title: "12 results require review",
    description: "Uploaded results have validation issues",
    icon: FileWarning,
    color: "text-red-400",
    background: "bg-red-500/10",
  },
  {
    title: "3 centres pending approval",
    description: "New examination centres need approval",
    icon: AlertTriangle,
    color: "text-orange-400",
    background: "bg-orange-500/10",
  },
];

export default function AttentionRequired() {
  return (
    <Card hover className="h-[400px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Attention Required</h2>

          <p className="text-sm opacity-60">
            Items that may require your action
          </p>
        </div>

        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-400" />
        </div>
      </div>

      <div className="dashboard-scroll flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {attentionItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
                w-full
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                text-left
                border
                border-transparent
                hover:border-[var(--border)]
                hover:bg-[var(--muted)]
                transition-all
                duration-200
              "
            >
              <div
                className={`
                  w-11
                  h-11
                  shrink-0
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${item.background}
                  ${item.color}
                `}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{item.title}</p>

                <p className="text-xs opacity-50 mt-1">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[var(--border)] shrink-0">
        <CheckCircle2 size={16} className="text-green-400" />

        <span className="text-xs opacity-60">
          No other urgent issues detected
        </span>
      </div>
    </Card>
  );
}
