"use client";

import StatCard from "@/components/dashboard/StatCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import TrackingCard from "@/components/dashboard/TrackingCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import ActiveUsersCard from "@/components/dashboard/ActiveUserCard";
import NigeriaMap from "@/components/dashboard/NigeriaMap";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function WaecPage() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1.7fr] gap-4">
        <WelcomeCard />
        <TrackingCard />
        <PerformanceCard />
      </div>

      {/* 🟢 ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Map (takes 2 columns) */}
        <div className="lg:col-span-2">
          <NigeriaMap />
        </div>

        {/* Active Users (takes 1 column) */}
        <ActiveUsersCard />
      </div>

      {/* 🟣 ROW 4 */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

  <div className="lg:col-span-2">
    <PerformanceChart />
  </div>

  <RecentActivity />

</div>

    </div>
  );
}