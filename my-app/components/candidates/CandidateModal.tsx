"use client";

import type { Candidate } from "@/lib/types/candidate";
import { X } from "lucide-react";

type Props = {
  candidate: Candidate | null;
  onClose: () => void;
};

export default function CandidateModal({
  candidate,
  onClose,
}: Props) {

  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-xl rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl">

        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">

          <h2 className="text-xl font-semibold">
            Candidate Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <Info label="Name" value={candidate.name} />
          <Info label="Exam" value={candidate.exam} />
          <Info label="State" value={candidate.state} />
          <Info label="Center" value={candidate.center} />
          <Info label="Score" value={`${candidate.score}%`} />
          <Info label="Status" value={candidate.status} />

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-[var(--border)] pb-3">

      <span className="opacity-60">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>

    </div>
  );
}