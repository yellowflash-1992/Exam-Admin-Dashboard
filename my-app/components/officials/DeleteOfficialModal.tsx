"use client";

import { AlertTriangle, X } from "lucide-react";

import type { Official } from "@/lib/types/official";

type Props = {
  official: Official | null;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function DeleteOfficialModal({
  official,
  onClose,
  onDelete,
}: Props) {
  if (!official) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Delete Official
              </h2>

              <p className="text-sm opacity-50">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {official.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm opacity-50">
            The official will be removed from the examination
            officials list.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border)] p-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm transition hover:bg-[var(--muted)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(official.id)}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
          >
            Delete Official
          </button>
        </div>
      </div>
    </div>
  );
}