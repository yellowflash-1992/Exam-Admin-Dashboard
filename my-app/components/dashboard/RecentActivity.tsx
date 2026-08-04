import {
  FileCheck,
  Building2,
  Users,
  UserCog,
  LucideIcon,
} from "lucide-react";
import Card from "../ui/Card";

type Activity = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  background: string;
};

const activities: Activity[] = [
  {
    title: "WAEC Results Uploaded",
    subtitle: "2 minutes ago",
    icon: FileCheck,
    color: "text-purple-400",
    background: "bg-purple-500/10",
  },
  {
    title: "New Centre Registered",
    subtitle: "18 minutes ago",
    icon: Building2,
    color: "text-blue-400",
    background: "bg-blue-500/10",
  },
  {
    title: "Candidate Added",
    subtitle: "45 minutes ago",
    icon: Users,
    color: "text-cyan-400",
    background: "bg-cyan-500/10",
  },
  {
    title: "Official Account Created",
    subtitle: "1 hour ago",
    icon: UserCog,
    color: "text-green-400",
    background: "bg-green-500/10",
  },
];

export default function RecentActivity() {
  return (
    <Card hover className="py-3">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      <div className="space-y-2">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                transition-all
                duration-200
                hover:bg-[var(--muted)]
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
                  ${activity.background}
                  ${activity.color}
                `}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {activity.title}
                </p>

                <p className="text-sm opacity-50">
                  {activity.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}