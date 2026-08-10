"use client";

// import CandidateModal from "./CandidateModal";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Candidate } from "@/lib/types/candidate";

// type Candidate = {
//   id: number;
//   name: string;
//   exam: string;
//   state: string;
//   center: string;
//   status: string;
//   score: number;
// };

type CandidateTableProps = {
  candidates: Candidate[];
  onView: (candidate: Candidate) => void;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
};

export default function CandidateTable({
  candidates,
  onView,
  onEdit,
  onDelete,
}: CandidateTableProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const avatarColors = [
    "bg-cyan-500/15 text-cyan-400",
    "bg-violet-500/15 text-violet-400",
    "bg-emerald-500/15 text-emerald-400",
    "bg-orange-500/15 text-orange-400",
    "bg-pink-500/15 text-pink-400",
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div
        className="
    rounded-2xl
    border border-[var(--border)]
    bg-[var(--card)]
    shadow-sm
    overflow-hidden
  "
      >
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
            <div>
              <h2 className="text-lg font-semibold">Candidates</h2>

              <p className="text-sm opacity-60">
                Manage all registered examination candidates
              </p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--muted)] sticky top-0 z-10">
              <tr className="border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Exam
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  State
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Center
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider opacity-70">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center opacity-60">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => {
                  const initials = getInitials(candidate.name);

                  const color =
                    avatarColors[(candidate.id - 1) % avatarColors.length];

                  return (
                    <tr
                      key={candidate.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--muted)]/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
    w-10 h-10
    rounded-full
    flex items-center justify-center
    font-semibold
    ${color}
  `}
                          >
                            {initials}
                          </div>

                          <div>
                            <p className="font-medium">{candidate.name}</p>

                            <p className="text-xs opacity-60">
                              #{candidate.id.toString().padStart(6, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className="
px-3
py-1
rounded-full
bg-cyan-500/15
text-cyan-400
text-xs
font-medium
"
                        >
                          {candidate.exam}
                        </span>
                      </td>

                      <td className="px-6 py-4">{candidate.state}</td>

                      <td className="px-6 py-4">{candidate.center}</td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            candidate.score >= 70
                              ? "text-green-400 font-semibold"
                              : candidate.score >= 50
                                ? "text-yellow-400 font-semibold"
                                : "text-red-400 font-semibold"
                          }
                        >
                          {candidate.status.toLowerCase() === "pending"
                            ? "--"
                            : `${candidate.score}%`}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={candidate.status} />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => onView(candidate)}
                            className="
  w-9
  h-9
  rounded-lg
  border border-[var(--border)]
  hover:bg-cyan-500/10
  hover:text-cyan-400
  transition-all
  duration-200
  flex
  items-center
  justify-center
  "
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => onEdit(candidate)}
                            className="
    w-9
    h-9
    rounded-lg
    border border-[var(--border)]
    hover:bg-amber-500/10
    hover:text-amber-400
    transition
    flex
    items-center
    justify-center
  "
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(candidate)}
                            className="
  w-9
  h-9
  rounded-lg
  border border-[var(--border)]
  hover:bg-red-500/10
  hover:text-red-400
  transition
  flex
  items-center
  justify-center
"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
