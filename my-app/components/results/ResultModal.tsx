"use client";

import { X } from "lucide-react";
import type { Result } from "@/lib/types/result";

type Props = {
  result: Result | null;
  onClose: () => void;
};

export default function ResultModal({
  result,
  onClose,
}: Props) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div>
            <h2 className="text-lg font-semibold">
              Result Details
            </h2>

            <p className="text-sm opacity-50">
              View examination result information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <p className="text-xs opacity-50">
              Candidate
            </p>
            <p className="font-medium">
              {result.candidate}
            </p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Examination
            </p>
            <p>{result.exam}</p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Subject
            </p>
            <p>{result.subject}</p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Centre
            </p>
            <p>{result.centre}</p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Score
            </p>
            <p className="font-semibold">
              {result.score}
            </p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Grade
            </p>
            <p className="font-semibold">
              {result.grade}
            </p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Status
            </p>

            <p
              className={
                result.status === "Verified"
                  ? "text-green-400"
                  : result.status === "Pending"
                    ? "text-amber-400"
                    : "text-red-400"
              }
            >
              {result.status}
            </p>
          </div>

          <div>
            <p className="text-xs opacity-50">
              Date
            </p>

            <p>
              {new Date(result.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-[var(--border)] p-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}