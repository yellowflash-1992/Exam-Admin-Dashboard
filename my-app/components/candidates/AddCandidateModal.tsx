"use client";

import type { Candidate } from "@/lib/types/candidate";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (candidate: Candidate) => void;
};

export default function AddCandidateModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState<Candidate>({
    id: 0,
    name: "",
    exam: "",
    state: "",
    center: "",
    score: 0,
    status: "Pending",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    exam: "",
    state: "",
    center: "",
    score: "",
  });

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      exam: "",
      state: "",
      center: "",
      score: 0,
      status: "Pending",
    });

    setErrors({
      firstName: "",
      lastName: "",
      exam: "",
      state: "",
      center: "",
      score: "",
    });

    setFirstName("");
    setLastName("");
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      firstName: "",
      lastName: "",
      exam: "",
      state: "",
      center: "",
      score: "",
    };

    if (!firstName.trim()) newErrors.firstName = "First name is required.";

    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.exam.trim()) newErrors.exam = "Exam is required.";

    if (!formData.state.trim()) newErrors.state = "State is required.";

    if (!formData.center.trim()) newErrors.center = "Center is required.";

    if (
      formData.status !== "Pending" &&
      (formData.score < 0 || formData.score > 100)
    ) {
      newErrors.score = "Score must be between 0 and 100.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onAdd({
      ...formData,
      id: Date.now(),
      name: `${firstName} ${lastName}`.trim(),
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-(--border)` bg-[var(--card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-(--border)` px-4 py-2">
          <h2 className="text-xl font-semibold">Add Candidate</h2>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2 p-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">First Name</label>
                <input
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Last Name</label>
                <input
                  placeholder="e.g. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">Exam</label>
                <input
                  placeholder="e.g. WAEC"
                  value={formData.exam}
                  onChange={(e) =>
                    setFormData({ ...formData, exam: e.target.value })
                  }
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.exam && (
                  <p className="text-xs text-red-500">{errors.exam}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">State</label>
                <input
                  placeholder="e.g. Kaduna"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.state && (
                  <p className="text-xs text-red-500">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option>Passed</option>
                  <option>Failed</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Score</label>
                <input
                  type="number"
                  placeholder="0 - 100"
                  value={formData.score}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      score: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-(--border)` bg-[var(--card)]
        px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                />

                {errors.score && (
                  <p className="text-xm text-red-500">{errors.score}</p>
                )}
              </div>
            </div>

            {/* Row 4 */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Center</label>
              <textarea
                rows={3}
                placeholder="e.g. Government College Kaduna"
                value={formData.center}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    center: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-(--border)` bg-[var(--card)] px-4 resize-none
  outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />

              {errors.center && (
                <p className="text-xs text-red-500">{errors.center}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-(--border)` p-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-(--border)` px-3 py-2 hover:bg-[var(--muted)] text-sm transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-3 py-2 font-semibold text-black hover:bg-cyan-400 text-sm transition"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
