"use client";

import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { useActivityStore } from "@/lib/stores/activityStore";
import {
  FileCheck,
  Building2,
  Users,
  UserCog,
  UserX,
} from "lucide-react";

const activityPresentation = {
  users: {
    icon: Users,
    color: "text-cyan-400",
    background: "bg-cyan-500/10",
  },

  userCog: {
    icon: UserCog,
    color: "text-blue-400",
    background: "bg-blue-500/10",
  },

  userX: {
    icon: UserX,
    color: "text-red-400",
    background: "bg-red-500/10",
  },

  building: {
    icon: Building2,
    color: "text-purple-400",
    background: "bg-purple-500/10",
  },

  fileCheck: {
    icon: FileCheck,
    color: "text-cyan-400",
    background: "bg-cyan-500/10",
  },
};

function formatElapsed(timestamp: number) {
  const diff = Math.max(0, Date.now() - timestamp);

  if (diff < 60 * 1000) {
    return "Just now";
  }

  const mins = Math.floor(diff / (60 * 1000));

  if (mins < 60) {
    return `${mins}m ago`;
  }

  const hours = Math.floor(mins / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ago`;
}

export default function RecentActivity() {
  const activities = useActivityStore(
    (state) => state.activities,
  );

  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card hover className="py-3">
      <h2 className="text-lg font-semibold mb-4">
        Recent Activity
      </h2>

      <div className="dashboard-scroll max-h-[270px] overflow-y-auto pr-2 space-y-2">
        {activities.map((activity) => {
          const presentation =
            activityPresentation[activity.icon as keyof typeof activityPresentation];

          const Icon = presentation?.icon ?? Users;

          return (
            <div
              key={activity.id}
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
                  ${presentation?.background ?? "bg-cyan-500/10"}
                  ${presentation?.color ?? "text-cyan-400"}
                `}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {activity.title}
                </p>

                <p className="text-sm opacity-50">
                  {formatElapsed(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}