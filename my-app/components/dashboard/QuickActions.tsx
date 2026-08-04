import {
  Building2,
  Plus,
  Upload,
  Users,
  LucideIcon,
} from "lucide-react";
import Card from "../ui/Card";
import { cardSet } from "../ui/CardSet";

type Action = {
  title: string;
  icon: LucideIcon;
  color: string;
  hover: string;
};

const actions: Action[] = [
  {
    title: "Add Candidate",
    icon: Users,
    color: "text-cyan-400",
    hover: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
  },
  {
    title: "Upload Results",
    icon: Upload,
    color: "text-blue-400",
    hover: "hover:border-blue-500/50 hover:bg-blue-500/10",
  },
  {
    title: "Add Centre",
    icon: Building2,
    color: "text-purple-400",
    hover: "hover:border-purple-500/50 hover:bg-purple-500/10",
  },
  {
    title: "Create Exam",
    icon: Plus,
    color: "text-green-400",
    hover: "hover:border-green-500/50 hover:bg-green-500/10",
  },
];

export default function QuickActions() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className={`
                flex
                flex-col
                items-center
                justify-center
                gap-3
                ${cardSet}
                ${action.hover}
              `}
            >
              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-[var(--muted)]
                  ${action.color}
                `}
              >
                <Icon size={24} />
              </div>

              <span className="text-sm font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}