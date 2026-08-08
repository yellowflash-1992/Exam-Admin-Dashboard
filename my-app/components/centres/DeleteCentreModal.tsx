"use client";

import { AlertTriangle, X } from "lucide-react";
import type { Centre } from "@/lib/types/centre";

type Props = {
  centre: Centre | null;
  onClose: () => void;
  onDelete: (id: number) => void;
};

export default function DeleteCentreModal({
  centre,
  onClose,
  onDelete,
}: Props) {
  if (!centre) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <h2 className="text-lg font-semibold">
            Delete Centre
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <AlertTriangle size={20} />
            </div>

            <div>
              <p className="font-medium">
                Delete {centre.name}?
              </p>

              <p className="text-sm opacity-60">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--border)] p-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(centre.id)}
            className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400"
          >
            Delete Centre
          </button>
        </div>
      </div>
    </div>
  );
}