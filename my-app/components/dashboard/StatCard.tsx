import { LucideIcon } from "lucide-react";
import Card from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: string;
  description?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-cyan-500",
  trend,
  description,
}: StatCardProps) {
  return (
    <Card hover className="py-2">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm opacity-60">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          {(trend || description) && (
            <div className="flex items-center gap-1.5 mt-3 text-xs">
              {trend && (
                <span className="text-green-400 font-semibold">
                  {trend}
                </span>
              )}

              {description && (
                <span className="opacity-50">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={`
            ${color}
            w-14
            h-14
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            text-white
          `}
        >
          <Icon size={26} />
        </div>
      </div>
    </Card>
  );
}