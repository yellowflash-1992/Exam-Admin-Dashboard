import { Building2, Plus, Upload, Users } from "lucide-react";
import Card from "../ui/Card";

const actions = [
  {
    title: "Add Candidate",
    icon: Users,
  },
  {
    title: "Upload Results",
    icon: Upload,
  },
  {
    title: "Add Centre",
    icon: Building2,
  },
  {
    title: "Create Exam",
    icon: Plus,
  },
];

export default function QuickActions() {
  return (
    <Card >
      <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="
              flex
              flex-col
              items-center
              justify-center
              gap-3
            ${`card`}
              p-5

              rounded-xl

              border

              border-[var(--border)]

              hover:border-cyan-500

              hover:bg-cyan-500/10
hover:-translate-y-1

              transition-all

              duration-300
            "
            >
              <Icon size={24} className="text-cyan-500" />

              <span className="text-sm font-medium">{action.title}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
