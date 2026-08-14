import ActiveUsersCard from "@/components/examinations/ActiveUserCard";
import NigeriaMap from "@/components/examinations/NigeriaMap";
import PerformanceCard from "@/components/examinations/PerformanceCard";
import PerformanceChart from "@/components/examinations/PerformanceChart";
import RecentActivity from "@/components/examinations/RecentActivity";
import StatCard from "@/components/examinations/StatCard";
import TrackingCard from "@/components/examinations/TrackingCard";
import WelcomeCard from "@/components/examinations/WelcomeCard";
import { getDashboardData } from "@/components/services/dashboard";
import { examinations } from "@/lib/data/examinations";

export default async function WaecPage() {
  const dashboard = await getDashboardData("WAEC");

  const examination = examinations.find((exam) => exam.name === "WAEC");

  if (!examination) {
    throw new Error("WAEC examination configuration not found");
  }

  return (
    <div className="space-y-4 w-full px-4 overflow-x-hidden">
      {/* 🔵 ROW 1: Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Candidates"
          value={dashboard.stats.candidates.toLocaleString()}
          change="+5%"
          icon="users"
          color="#06B6D4"
        />

        <StatCard
          title="Centres"
          value={dashboard.stats.centres.toLocaleString()}
          change="+5%"
          icon="building"
          color="#8B5CF6"
        />

        <StatCard
          title="Exams"
          value={dashboard.stats.exams.toLocaleString()}
          change="+8%"
          icon="exam"
          color="#8B5CF6"
        />

        <StatCard
          title="Pass Rate"
          value={`${dashboard.stats.passRate}%`}
          change="+3%"
          icon="award"
          color="#10B981"
        />
      </div>

      {/* 🟣 ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <WelcomeCard examination={examination} candidates={1203421} />
        </div>

        <div className="lg:col-span-3">
          <TrackingCard tracking={dashboard.tracking} />
        </div>

        <div className="lg:col-span-4">
          <PerformanceCard performance={dashboard.performance} />
        </div>
      </div>

      {/* 🟢 ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-8 md:h-[530px]">
          <NigeriaMap examination={examination.name} mapData={dashboard.map} />
        </div>

        <div className="lg:col-span-4 md:h-[530px]">
          <ActiveUsersCard activeUsers={dashboard.activeUsers} />
        </div>
      </div>

      {/* 🟣 ROW 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <PerformanceChart
            examination={examination.name}
            performanceChart={dashboard.performanceChart}
          />
        </div>

        <div className="lg:col-span-4">
          <RecentActivity activity={dashboard.activity} />
        </div>
      </div>
    </div>
  );
}
