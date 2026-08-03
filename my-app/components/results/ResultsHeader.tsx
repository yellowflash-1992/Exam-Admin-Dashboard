"use client";

import { Plus } from "lucide-react";

type ResultsHeaderProps = {
  onAdd: () => void;
};

export default function ResultsHeader({
  onAdd,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold">
          Results
        </h1>

        <p className="text-sm text-slate-400">
          Manage examination results across all examination bodies.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-cyan-500
        px-4
        py-2
        font-medium
        text-slate-950
        hover:bg-cyan-400
        transition
        "
      >
        <Plus size={18} />

        Add Result
      </button>

    </div>
  );
}