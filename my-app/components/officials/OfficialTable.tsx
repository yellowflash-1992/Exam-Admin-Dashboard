"use client";

import { Edit, Eye, Trash2 } from "lucide-react";

import type { Official } from "@/lib/types/official";

type Props = {
  officials: Official[];
  onView: (official: Official) => void;
  onEdit: (official: Official) => void;
  onDelete: (official: Official) => void;
};

export default function OfficialTable({
  officials,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-left">
            <th className="px-4 py-3">Official</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {officials.map((official) => (
            <tr
              key={official.id}
              className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{official.name}</p>

                  <p className="text-xs opacity-50">
                    {official.email}
                  </p>
                </div>
              </td>

              <td className="px-4 py-3">
                {official.role}
              </td>

              <td className="px-4 py-3">
                {official.state}
              </td>

              <td className="px-4 py-3">
                {official.phone}
              </td>

              <td className="px-4 py-3">
                <span
                  className={
                    official.status === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {official.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onView(official)}
                    className="rounded-lg p-2 hover:bg-[var(--muted)]"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(official)}
                    className="rounded-lg p-2 hover:bg-[var(--muted)]"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(official)}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}