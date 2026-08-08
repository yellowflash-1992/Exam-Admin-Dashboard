"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type { Centre } from "@/lib/types/centre";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (centre: Centre) => void;
};

export default function AddCentreModal({
  isOpen,
  onClose,
  onAdd,
}: Props) {  

  const [formData, setFormData] = useState<Omit<Centre, "id">>({
    name: "",
    state: "",
    address: "",
    capacity: 0,
    status: "Active",
  });

  const [errors, setErrors] = useState({
    name: "",
    state: "",
    address: "",
    capacity: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      state: "",
      address: "",
      capacity: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Centre name is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (formData.capacity <= 0) {
      newErrors.capacity = "Capacity must be greater than 0.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onAdd({
  ...formData,
  id: Date.now(),
});

    setFormData({
      name: "",
      state: "",
      address: "",
      capacity: 0,
      status: "Active",
    });

    setErrors({
      name: "",
      state: "",
      address: "",
      capacity: "",
    });

    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      state: "",
      address: "",
      capacity: 0,
      status: "Active",
    });

    setErrors({
      name: "",
      state: "",
      address: "",
      capacity: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h2 className="text-xl font-semibold">Add Centre</h2>

          <button
            type="button"
            onClick={handleClose}
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
                placeholder="e.g. Government College Kaduna"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">State</label>

                <input
                  placeholder="e.g. Kaduna"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      state: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.state && (
                  <p className="text-xs text-red-500">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Capacity</label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 500"
                  value={formData.capacity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.capacity && (
                  <p className="text-xs text-red-500">{errors.capacity}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">Address</label>

              <textarea
                rows={3}
                placeholder="e.g. Independence Way, Kaduna"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
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
              onClick={handleClose}
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm transition hover:bg-[var(--muted)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              Add Centre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
