"use client";

import { useEffect } from "react";

import AttentionRequired from "@/components/dashboard/AttentionRequired";
import ExaminationStatus from "@/components/dashboard/ExaminationStatus";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RegistrationChart from "@/components/dashboard/RegistrationChart";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import { results } from "@/lib/data/results";
import { useCandidateStore } from "@/lib/stores/candidateStore";
import { useCentreStore } from "@/lib/stores/centreStore";
import { useOfficialStore } from "@/lib/stores/officialStore";
import { Building2, FileCheck, UserCog, Users } from "lucide-react";

export default function DashboardPage() {
  const loadCandidates = useCandidateStore((state) => state.loadCandidates);
  const loadCentres = useCentreStore((state) => state.loadCentres);

  useEffect(() => {
    void loadCandidates();
    void loadCentres();
  }, [loadCandidates, loadCentres]);

  const candidates = useCandidateStore((state) => state.candidates);

  const centres = useCentreStore((state) => state.centres);

  const officials = useOfficialStore((state) => state.officials);

  const totalCandidates = candidates.length;

  const totalCentres = centres.length;

  const totalOfficials = officials.length;

  const activeCentres = centres.filter(
    (centre) => centre.status === "Active",
  ).length;

  const activeOfficials = officials.filter(
    (official) => official.status === "Active",
  ).length;

  const totalResults = results.length;

  const verifiedResults = results.filter(
    (result) => result.status === "Verified",
  ).length;

  const processedPercentage =
    totalResults > 0 ? Math.round((verifiedResults / totalResults) * 100) : 0;

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
          value={totalCandidates}
          icon={Users}
          // trend="↑ 8.4%"
          description="vs last month"
        />

        <StatCard
          title="Centres"
          value={totalCentres}
          icon={Building2}
          color="bg-blue-500"
          trend={`+${activeCentres}`}
          description="active"
        />

        <StatCard
          title="Officials"
          value={totalOfficials}
          icon={UserCog}
          color="bg-green-500"
          trend={`${activeOfficials}`}
          description="active"
        />

        <StatCard
          title="Results"
          value={totalResults}
          icon={FileCheck}
          color="bg-purple-500"
          trend={`${processedPercentage}%`}
          description="verified"
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
