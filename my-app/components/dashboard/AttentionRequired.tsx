"use client";

import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  UserCheck,
  UserCog,
} from "lucide-react";
import Card from "../ui/Card";
import { useCandidateStore } from "@/lib/stores/candidateStore";
import { useCentreStore } from "@/lib/stores/centreStore";
import { useOfficialStore } from "@/lib/stores/officialStore";
import { results } from "@/lib/data/results";

const attentionPresentation = {
  candidates: {
    icon: UserCheck,
    color: "text-amber-400",
    background: "bg-amber-500/10",
  },

  results: {
    icon: FileWarning,
    color: "text-red-400",
    background: "bg-red-500/10",
  },

  centres: {
    icon: AlertTriangle,
    color: "text-orange-400",
    background: "bg-orange-500/10",
  },

  officials: {
    icon: UserCog,
    color: "text-blue-400",
    background: "bg-blue-500/10",
  },
};

export default function AttentionRequired() {
  const candidates = useCandidateStore(
    (state) => state.candidates,
  );

  const centres = useCentreStore(
    (state) => state.centres,
  );

  const officials = useOfficialStore(
    (state) => state.officials,
  );

  const pendingCandidates = candidates.filter(
    (candidate) => candidate.status === "Pending",
  );

  const pendingResults = results.filter(
    (result) => result.status === "Pending",
  );

  const inactiveCentres = centres.filter(
    (centre) => centre.status === "Inactive",
  );

  const inactiveOfficials = officials.filter(
    (official) => official.status === "Inactive",
  );

  const attentionItems = [
    ...(pendingCandidates.length > 0
      ? [
          {
            title: `${pendingCandidates.length} candidates awaiting verification`,
            description:
              "Candidate records require verification",
            ...attentionPresentation.candidates,
          },
        ]
      : []),

    ...(pendingResults.length > 0
      ? [
          {
            title: `${pendingResults.length} results require review`,
            description:
              "Results are awaiting verification",
            ...attentionPresentation.results,
          },
        ]
      : []),

    ...(inactiveCentres.length > 0
      ? [
          {
            title: `${inactiveCentres.length} inactive centres`,
            description:
              "Examination centres are currently inactive",
            ...attentionPresentation.centres,
          },
        ]
      : []),

    ...(inactiveOfficials.length > 0
      ? [
          {
            title: `${inactiveOfficials.length} inactive officials`,
            description:
              "Officials are currently marked inactive",
            ...attentionPresentation.officials,
          },
        ]
      : []),
  ];

  return (
    <Card hover className="h-[400px] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Attention Required
          </h2>

          <p className="text-sm opacity-60">
            Items that may require your action
          </p>
        </div>

        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
          <AlertTriangle
            size={18}
            className="text-red-400"
          />
        </div>
      </div>

      <div className="dashboard-scroll flex-1 min-h-0 overflow-y-auto pr-2 space-y-2 mt-4">
        {attentionItems.length > 0 ? (
          attentionItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className="
                  w-full
                  flex
                  items-center
                  gap-4
                  p-3
                  rounded-xl
                  text-left
                  border
                  border-transparent
                  hover:border-[var(--border)]
                  hover:bg-[var(--muted)]
                  transition-all
                  duration-200
                "
              >
                <div
                  className={`
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${item.background}
                    ${item.color}
                  `}
                >
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">
                    {item.title}
                  </p>

                  <p className="text-xs opacity-50 mt-1">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex items-center gap-3 p-4">
            <CheckCircle2
              size={18}
              className="text-green-400"
            />

            <div>
              <p className="text-sm font-medium">
                Everything looks good
              </p>

              <p className="text-xs opacity-50">
                No urgent issues detected
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}