"use client";

import type { Candidate } from "@/lib/types/candidate";
import { X, TriangleAlert } from "lucide-react";

type Props = {
  candidate: Candidate | null;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function DeleteCandidateModal({
  candidate,
  onClose,
  onDelete,
}: Props) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-2xl bg-[var(--card)] border border-[var(--border)]">

        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-red-400" />

            <h2 className="text-lg font-semibold">
              Delete Candidate
            </h2>

          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>

        </div>

        <div className="p-6">

          <p className="opacity-70">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}{candidate.name}
            </span>
            ?
          </p>

        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-[var(--border)]">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-[var(--border)]"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onDelete(candidate.id);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}