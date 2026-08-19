"use client";

import { X } from "lucide-react";
import { useState } from "react";

type Props = { isOpen: boolean; onClose: () => void };
const initialForm = {
  name: "",
  code: "",
  status: "Upcoming",
  date: "",
  description: "",
};

export default function CreateExamModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/examinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(data.error || "Failed to create examination.");
      setForm(initialForm);
      onClose();
      window.location.reload();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to create examination.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <div>
            <h2 className="text-lg font-semibold">Create examination</h2>
            <p className="text-sm opacity-60">
              Add an examination cycle to the system.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400"
                placeholder="WAEC 2026"
              />
            </label>
            <label className="text-sm">
              Code
              <input
                required
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value.toUpperCase() })
                }
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400"
                placeholder="WAEC-2026"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 outline-none focus:border-cyan-400"
              >
                <option>Upcoming</option>
                <option>Registration Open</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </label>
            <label className="text-sm">
              Exam date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400"
              />
            </label>
          </div>
          <label className="block text-sm">
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-1 min-h-24 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400"
              placeholder="Describe this examination cycle"
            />
          </label>
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {saving ? "Creating..." : "Create examination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
