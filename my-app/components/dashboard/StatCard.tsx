import { LucideIcon } from "lucide-react";
import Card from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-cyan-500",
}: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-60">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div
          className={`
            ${color}
            w-14
            h-14
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