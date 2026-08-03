import { getDashboardData } from "@/components/services/dashboard";
import StatCard from "@/components/dashboard/StatCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import TrackingCard from "@/components/dashboard/TrackingCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import ActiveUsersCard from "@/components/dashboard/ActiveUserCard";
import NigeriaMap from "@/components/dashboard/NigeriaMap";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function JambPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-4 w-full px-4 overflow-x-hidden">
      {/* 🔵 ROW 1: Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Candidates"
          value="1.2M"
          change="+12%"
          icon="users"
          color="#2563EB"
        />

        <StatCard
          title="Centers"
          value="2,847"
          change="+5%"
          icon="building"
          color="#06B6D4"
        />

        <StatCard
          title="Exams"
          value="156"
          change="+8%"
          icon="exam"
          color="#8B5CF6"
        />

        <StatCard
          title="Pass Rate"
          value="78%"
          change="+3%"
          icon="award"
          color="#10B981"
        />
      </div>

      {/* 🟣 ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <WelcomeCard />
        </div>

        <div className="lg:col-span-3">
          <TrackingCard tracking={dashboard.tracking} />
        </div>

        <div className="lg:col-span-4">
          <PerformanceCard performance={dashboard.performance} />
        </div>
      </div>

      {/* 🟢 ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <NigeriaMap />
        </div>

        <div className="lg:col-span-4">
          <ActiveUsersCard activeUsers={dashboard.activeUsers} />
        </div>
      </div>

      {/* 🟣 ROW 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <PerformanceChart performanceChart={dashboard.performanceChart} />
        </div>

        <div className="lg:col-span-4">
          <RecentActivity activity={dashboard.activity} />
        </div>
      </div>
    </div>
  );
}
