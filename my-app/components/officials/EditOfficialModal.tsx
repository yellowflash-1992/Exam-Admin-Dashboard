"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type { Official } from "@/lib/types/official";

type Props = {
  official: Official | null;
  onClose: () => void;
  onSave: (official: Official) => void;
};

export default function EditOfficialModal({
  official,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<Official | null>(
    official,
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    state: "",
  });

  // useEffect(() => {
  //   setFormData(official);

  //   setErrors({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     role: "",
  //     state: "",
  //   });
  // }, [official]);

  if (!official || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      role: "",
      state: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }

    setErrors(newErrors);

    if (
      Object.values(newErrors).some(
        (error) => error !== "",
      )
    ) {
      return;
    }

    onSave(formData);
  };

  const handleClose = () => {
    setFormData(official);

    setErrors({
      name: "",
      email: "",
      phone: "",
      role: "",
      state: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <div>
            <h2 className="text-lg font-semibold">
              Edit Official
            </h2>

            <p className="text-sm opacity-50">
              Update examination official information
            </p>
          </div>

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
              <label className="text-xs font-medium">
                Name
              </label>

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

              {errors.name && (
                <p className="text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">
                  Role
                </label>

                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as Official["role"],
                    })
                  }
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option value="Supervisor">
                    Supervisor
                  </option>
                  <option value="Invigilator">
                    Invigilator
                  </option>
                  <option value="Coordinator">
                    Coordinator
                  </option>
                </select>

                {errors.role && (
                  <p className="text-xs text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">
                  State
                </label>

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

                {errors.state && (
                  <p className="text-xs text-red-500">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">
                Email
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">
                Phone
              </label>

              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              {errors.phone && (
                <p className="text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium">
                Status
              </label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Official["status"],
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}