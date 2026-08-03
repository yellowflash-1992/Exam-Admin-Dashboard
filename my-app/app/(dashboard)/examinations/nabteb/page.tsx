import ActiveUsersCard from "@/components/examinations/waec/ActiveUserCard";
import NigeriaMap from "@/components/examinations/waec/NigeriaMap";
import PerformanceCard from "@/components/examinations/waec/PerformanceCard";
import PerformanceChart from "@/components/examinations/waec/PerformanceChart";
import RecentActivity from "@/components/examinations/waec/RecentActivity";
import StatCard from "@/components/examinations/waec/StatCard";
import TrackingCard from "@/components/examinations/waec/TrackingCard";
import WelcomeCard from "@/components/examinations/waec/WelcomeCard";
import { getDashboardData } from "@/components/services/dashboard";

export default async function NabtebPage() {
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
