import AttentionRequired from "@/components/dashboard/AttentionRequired";
import ExaminationStatus from "@/components/dashboard/ExaminationStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RegistrationChart from "@/components/dashboard/RegistrationChart";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import { Building2, FileCheck, UserCog, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 min-w-0">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="opacity-60 mt-1">Welcome back, Administrator.</p>
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
          trend="↑ 8.4%"
          description="vs last month"
        />

        <StatCard
          title="Centres"
          value="148"
          icon={Building2}
          color="bg-blue-500"
          trend="+6"
          description="this month"
        />

        <StatCard
          title="Officials"
          value="512"
          icon={UserCog}
          color="bg-green-500"
          trend="24"
          description="pending approval"
        />

        <StatCard
          title="Results"
          value="9,820"
          icon={FileCheck}
          color="bg-purple-500"
          trend="79%"
          description="processed"
        />
      </div>

      <div
        className="
  grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
          min-w-0
"
      >
        <QuickActions />

        <Card>
          <RecentActivity />
        </Card>

        <Card>
          <ExaminationStatus />
        </Card>

        <Card>
          <AttentionRequired />
        </Card>

        <Card className="lg:col-span-2">
          <RegistrationChart />
        </Card>


      </div>
    </div>
  );
}
