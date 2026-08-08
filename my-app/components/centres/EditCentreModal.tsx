"use client";

import { X } from "lucide-react";
import { useState } from "react";

import type { Centre } from "@/lib/types/centre";

type Props = {
  centre: Centre | null;
  onClose: () => void;
  onSave: (centre: Centre) => void;
};

export default function EditCentreModal({ centre, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Centre | null>(centre);

  if (!centre || !formData) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;
    if (!formData.state.trim()) return;
    if (!formData.address.trim()) return;
    if (formData.capacity <= 0) return;

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div>
            <h2 className="text-lg font-semibold">Edit Centre</h2>

            <p className="text-sm opacity-60">
              Update examination centre details
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Centre Name</label>

              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">State</label>

                <input
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Capacity</label>

                <input
                  type="number"
                  min="1"
                  value={formData.capacity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">Address</label>

              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">Status</label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Centre["status"],
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
              type="submit"
              className="rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
