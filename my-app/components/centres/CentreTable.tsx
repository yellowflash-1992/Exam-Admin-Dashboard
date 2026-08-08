"use client";

import type { Centre } from "@/lib/types/centre";
import { Edit, Eye, Trash2 } from "lucide-react";

type Props = {
  centres: Centre[];
  onView: (centre: Centre) => void;
  onEdit: (centre: Centre) => void;
  onDelete: (centre: Centre) => void;
};

export default function CentreTable({
  centres,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--muted)]">
          <tr>
            <th className="px-4 py-3 text-left">Centre</th>
            <th className="px-4 py-3 text-left">State</th>
            <th className="px-4 py-3 text-left">Capacity</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {centres.map((centre) => (
            <tr
              key={centre.id}
              className="border-t border-[var(--border)] hover:bg-[var(--muted)]"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{centre.name}</p>
                  <p className="text-xs opacity-50">{centre.address}</p>
                </div>
              </td>

              <td className="px-4 py-3">{centre.state}</td>

              <td className="px-4 py-3">{centre.capacity}</td>

              <td className="px-4 py-3">
                <span
                  className={
                    centre.status === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {centre.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onView(centre)}
                    className="rounded-lg p-2 hover:bg-[var(--muted)]"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(centre)}
                    className="rounded-lg p-2 hover:bg-[var(--muted)]"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(centre)}
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
