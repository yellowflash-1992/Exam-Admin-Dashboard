import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RegistrationChart from "@/components/dashboard/RegistrationChart";
import {
  Users,
  Building2,
  UserCog,
  FileCheck,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="opacity-60 mt-1">
          Welcome back, Administrator.
        </p>
      </div>

      <div
        className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
      "
      >
        <StatCard
          title="Candidates"
          value="12,430"
          icon={Users}
        />

        <StatCard
          title="Centres"
          value="148"
          icon={Building2}
          color="bg-blue-500"
        />

        <StatCard
          title="Officials"
          value="512"
          icon={UserCog}
          color="bg-green-500"
        />

        <StatCard
          title="Results"
          value="9,820"
          icon={FileCheck}
          color="bg-purple-500"
        />
      </div>


      <div
  className="
  grid
  gap-6
  lg:grid-cols-2
"
>
  <QuickActions />

  <div
    className="
    bg-[var(--card)]
    border
    border-[var(--border)]
    rounded-2xl
    p-6
  "
  >
    <RecentActivity />
  </div>

  <RegistrationChart />
</div>




    </div>
  );
}