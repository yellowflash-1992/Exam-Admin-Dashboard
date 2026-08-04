import {
  FileCheck,
  Building2,
  Users,
  UserCog,
} from "lucide-react";
import Card from "../ui/Card";

const activities = [
  {
    title: "WAEC Results Uploaded",
    subtitle: "2 minutes ago",
    icon: FileCheck,
  },
  {
    title: "New Centre Registered",
    subtitle: "18 minutes ago",
    icon: Building2,
  },
  {
    title: "Candidate Added",
    subtitle: "45 minutes ago",
    icon: Users,
  },
  {
    title: "Official Account Created",
    subtitle: "1 hour ago",
    icon: UserCog,
  },
];

export default function RecentActivity() {
  return (
    <Card hover className="py-3">
      <h2 className="text-lg font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={18}
                  className="text-cyan-500"
                />
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {activity.title}
                </p>

                <p className="text-sm opacity-60">
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