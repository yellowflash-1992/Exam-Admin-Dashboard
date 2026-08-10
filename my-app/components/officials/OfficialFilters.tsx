"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  status: "All" | "Active" | "Inactive";
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: "All" | "Active" | "Inactive",
  ) => void;
};

export default function OfficialFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search officials..."
          className="
            w-full
            rounded-xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            py-2
            pl-10
            pr-4
            text-sm
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/20
          "
        />
      </div>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value as
              | "All"
              | "Active"
              | "Inactive",
          )
        }
        className="
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          px-4
          py-2
          text-sm
          outline-none
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20
        "
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}