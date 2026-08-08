"use client";

import { useUIStore } from "@/lib/stores/uiStore";
import { Building2, LucideIcon, Plus, Upload, Users } from "lucide-react";
import Card from "../ui/Card";
import { cardSet } from "../ui/CardSet";

type Action = {
  title: string;
  icon: LucideIcon;
  color: string;
  hover: string;
  onClick?: () => void;
};

export default function QuickActions() {
  const openAddCandidate = useUIStore((state) => state.openAddCandidate);

  const openAddCentre = useUIStore((state) => state.openAddCentre);

   const openCreateExam = useUIStore(
    (state) => state.openCreateExam
  );

  const openUploadResults = useUIStore(
    (state) => state.openUploadResults
  );

  const actions: Action[] = [
    {
      title: "Add Candidate",
      icon: Users,
      color: "text-cyan-400",
      hover: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
      onClick: openAddCandidate,
    },

    {
      title: "Upload Results",
      icon: Upload,
      color: "text-blue-400",
      hover: "hover:border-blue-500/50 hover:bg-blue-500/10",
      onClick: openUploadResults,
    },

    {
      title: "Add Centre",
      icon: Building2,
      color: "text-purple-400",
      hover: "hover:border-purple-500/50 hover:bg-purple-500/10",
      onClick: openAddCentre,
    },

    {
      title: "Create Exam",
      icon: Plus,
      color: "text-green-400",
      hover: "hover:border-green-500/50 hover:bg-green-500/10",
      onClick: openCreateExam,
    },
  ];

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className={`
                flex
                flex-col
                items-center
                justify-center
                gap-3
                ${cardSet}
                ${action.hover}
              `}
            >
              <div
                className={`
                  w-12
                  h-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-[var(--muted)]
                  ${action.color}
                `}
              >
                <Icon size={24} />
              </div>

              <span className="text-sm font-medium">{action.title}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
