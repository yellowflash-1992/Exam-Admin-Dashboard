"use client";

import { X } from "lucide-react";
import type { Centre } from "@/lib/types/centre";

type Props = {
  centre: Centre | null;
  onClose: () => void;
};

export default function CentreModal({
  centre,
  onClose,
}: Props) {
  if (!centre) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div>
            <h2 className="text-lg font-semibold">
              Centre Details
            </h2>

            <p className="text-sm opacity-50">
              View examination centre information
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

        <div className="space-y-4 p-4">
          <div>
            <p className="text-xs opacity-50">Centre Name</p>
            <p className="font-medium">{centre.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs opacity-50">State</p>
              <p>{centre.state}</p>
            </div>

            <div>
              <p className="text-xs opacity-50">Capacity</p>
              <p>{centre.capacity}</p>
            </div>
          </div>

          <div>
            <p className="text-xs opacity-50">Address</p>
            <p>{centre.address}</p>
          </div>

          <div>
            <p className="text-xs opacity-50">Status</p>
            <p
              className={
                centre.status === "Active"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {centre.status}
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