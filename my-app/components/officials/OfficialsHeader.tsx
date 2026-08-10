"use client";

import { Plus } from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function OfficialsHeader({ onAdd }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Officials</h1>

        <p className="mt-1 text-sm opacity-60">
          Manage examination officials and their details
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-500
          px-4
          py-2
          text-sm
          font-semibold
          text-black
          transition
          hover:bg-cyan-400
        "
      >
        <Plus size={18} />
        Add Official
      </button>
    </div>
  );
}