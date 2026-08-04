import {
  AlertCircle,
  Building2,
  FileWarning,
  UserCheck,
} from "lucide-react";
import Card from "../ui/Card";

const alerts = [
  {
    title: "Officials awaiting approval",
    detail: "24 officials need your review",
    icon: UserCheck,
  },
  {
    title: "Centres with incomplete information",
    detail: "12 centres require attention",
    icon: Building2,
  },
  {
    title: "Results pending verification",
    detail: "340 results are awaiting verification",
    icon: FileWarning,
  },
  {
    title: "WAEC registration deadline",
    detail: "Registration closes in 6 days",
    icon: AlertCircle,
  },
];

export default function AttentionRequired() {
  return (
    <Card hover className="py-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Attention Required
        </h2>

        <p className="text-sm opacity-60 mt-1">
          Items that may need your attention
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.title}
              className="
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                border
                border-[var(--border)]
              "
            >
              <div
                className="
                  w-10
                  h-10
                  shrink-0
                  rounded-lg
                  bg-yellow-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon
                  size={18}
                  className="text-yellow-400"
                />
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {alert.title}
                </p>

                <p className="text-xs opacity-60 truncate">
                  {alert.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}